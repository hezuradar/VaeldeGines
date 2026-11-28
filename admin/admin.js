/* Panel del taller (mismo sistema que la web de HezurAdar):
   - Inicio de sesión con Firebase Authentication; solo los administradores de firestore.rules.
   - El token de GitHub se guarda una vez en Firestore (adminConfig/github), legible solo por ellos.
   - El catálogo y las fotos son archivos del repositorio; cada cambio es un commit y la web
     se regenera y publica sola en GitHub Pages (flujo «Publicar web»). */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
import { setToken, checkAccess, readText, putFile, toBase64, CATALOG_PATH, GitHubError } from './github.js';
import { photoUrl, deleteCatalogPhotos } from './fotos.js';
import { initEditor, openEditor, formatPrice } from './editor.js';
import { initPublish, refreshPublish } from './publicar.js';
import { initTestimonios, refreshTestimonios } from './testimonios.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const tokenDoc = doc(db, 'adminConfig', 'github');

const CAT_NAME = { guitarras: 'Guitarras', folclore: 'Folclore', maderas: 'Maderas', formacion: 'Formación' };
const sections = ['login', 'denied', 'connect', 'catalog', 'opiniones'];
const $ = (id) => document.getElementById(id);

let items = [];
let filterCat = 'all';
let pendingDelete = null;

/* ---------- Utilidades ---------- */

function show(id) {
  sections.forEach((s) => { $(s).hidden = s !== id; });
  if ($('admNav')) {
    $('admNav').hidden = id !== 'catalog' && id !== 'opiniones';
    $('admNav').querySelectorAll('[data-section]').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.section === id);
    });
  }
}

function setStatus(message, type = 'info') {
  $('status').textContent = message;
  $('status').dataset.type = type;
}

function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  children.forEach((c) => node.append(c));
  return node;
}

function friendlyError(error) {
  if (error instanceof GitHubError) {
    if (error.status === 401) return 'GitHub no acepta el token (puede haber caducado). Vuelve a conectarlo.';
    if (error.status === 403) return 'El token de GitHub puede leer pero no guardar. En GitHub (Settings → Developer settings → Fine-grained tokens), edita el token y pon «Contents» en «Read and write».';
    if (error.status === 409) return 'Alguien ha cambiado el catálogo a la vez. Recarga la página y vuelve a intentarlo.';
    return `GitHub: ${error.message}`;
  }
  const code = error && error.code ? error.code : '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) return 'Correo o contraseña incorrectos.';
  if (code.includes('too-many-requests')) return 'Demasiados intentos. Espera unos minutos.';
  if (code.includes('permission-denied')) return 'No tienes permiso para esta acción.';
  if (code.includes('unavailable') || code.includes('network')) return 'Sin conexión. Inténtalo de nuevo.';
  return (error && error.message) || 'Ha ocurrido un error inesperado. Inténtalo de nuevo.';
}

/* ---------- Sesión ---------- */

onAuthStateChanged(auth, async (user) => {
  $('session').hidden = !user;
  setToken(null);
  if (!user) { show('login'); setStatus(''); return; }
  $('sessionEmail').textContent = user.email;
  try {
    const snap = await getDoc(tokenDoc);
    if (!snap.exists()) { show('connect'); return; }
    setToken(snap.data().token);
    show('catalog');
    await loadCatalog();
  } catch (error) {
    if (String(error.code || '').includes('permission-denied')) {
      $('deniedUid').textContent = user.uid;
      show('denied');
      return;
    }
    if (error instanceof GitHubError && error.status === 401) { show('connect'); }
    setStatus(friendlyError(error), 'error');
  }
});

$('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('loginEmail').value.trim();
  const password = $('loginPassword').value;
  if (!email || !password) { setStatus('Escribe tu correo y tu contraseña.', 'error'); return; }
  setStatus('Entrando…');
  try {
    await signInWithEmailAndPassword(auth, email, password);
    $('loginPassword').value = '';
    setStatus('');
  } catch (error) {
    setStatus(friendlyError(error), 'error');
  }
});

$('forgot').addEventListener('click', async () => {
  const email = $('loginEmail').value.trim();
  if (!email) { setStatus('Escribe primero tu correo y vuelve a pulsar.', 'error'); return; }
  try {
    await sendPasswordResetEmail(auth, email);
    setStatus('Si el correo existe, recibirás un enlace para cambiar la contraseña.', 'ok');
  } catch (error) {
    setStatus(friendlyError(error), 'error');
  }
});

$('logout').addEventListener('click', () => signOut(auth));
$('changeToken').addEventListener('click', () => show('connect'));
$('admNav').querySelectorAll('[data-section]').forEach((b) => {
  b.addEventListener('click', () => {
    show(b.dataset.section);
    if (b.dataset.section === 'opiniones') {
      refreshTestimonios().catch((error) => setStatus(friendlyError(error), 'error'));
    }
  });
});

/* ---------- Conexión con GitHub ---------- */

$('connectForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const token = $('ghToken').value.trim();
  if (!token) { setStatus('Pega el token de GitHub.', 'error'); return; }
  setStatus('Comprobando el token con GitHub…');
  try {
    setToken(token);
    await checkAccess();
    await setDoc(tokenDoc, { token, updatedAt: serverTimestamp(), updatedBy: auth.currentUser.email });
    $('ghToken').value = '';
    setStatus('Panel conectado con GitHub.', 'ok');
    show('catalog');
    await loadCatalog();
  } catch (error) {
    setToken(null);
    setStatus(friendlyError(error), 'error');
  }
});

/* ---------- Catálogo (archivo del repositorio) ---------- */

async function loadCatalog() {
  setStatus('Cargando catálogo…');
  const file = await readText(CATALOG_PATH);
  items = (file ? JSON.parse(file.content) : []).sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  setStatus('');
  render();
  refreshPublish().catch(() => { /* el estado de publicación es informativo */ });
}

/** Aplica un cambio sobre la versión más reciente del catálogo y lo guarda como commit. */
async function updateCatalog(change, message) {
  const file = await readText(CATALOG_PATH);
  const latest = file ? JSON.parse(file.content) : [];
  const next = change(latest).sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0));
  await putFile(CATALOG_PATH, toBase64(`${JSON.stringify(next, null, 1)}\n`), message, file ? file.sha : undefined);
  items = next;
}

async function savePiece(piece) {
  const exists = items.some((p) => p.slug === piece.slug);
  await updateCatalog(
    (list) => (list.some((p) => p.slug === piece.slug)
      ? list.map((p) => (p.slug === piece.slug ? piece : p))
      : [...list, piece]),
    `Panel: ${exists ? 'edita' : 'añade'} ${piece.name}`
  );
}

function render() {
  const term = $('search').value.trim().toLowerCase();
  const visible = items
    .filter((p) => filterCat === 'all' || p.cat === filterCat)
    .filter((p) => !term || `${p.name} ${p.slug} ${p.label}`.toLowerCase().includes(term));
  $('count').textContent = String(items.length);
  $('countPublished').textContent = String(items.filter((p) => p.publicado).length);
  $('empty').hidden = items.length > 0;
  const newTile = el('button', { type: 'button', className: 'adm-tile adm-tile--new' }, [
    el('span', { className: 'adm-tile__plus', textContent: '+', ariaHidden: 'true' }),
    el('strong', { textContent: 'Nueva pieza' }),
    el('span', { textContent: 'Fotos, precio y descripción' })
  ]);
  newTile.addEventListener('click', () => openEditor(null));
  $('grid').replaceChildren(newTile, ...visible.map(card));
}

function card(p) {
  const img = el('img', { alt: '', loading: 'lazy', width: 400, height: 300, src: photoUrl((p.gallery || [])[0] || p.image) });
  const photos = (p.gallery || []).length;

  const toggle = el('input', { type: 'checkbox', checked: Boolean(p.publicado), ariaLabel: `Mostrar ${p.name} en la web` });
  toggle.addEventListener('change', () => setPublished(p, toggle));
  const sw = el('label', { className: 'adm-switch adm-switch--sm' }, [toggle, el('span', { className: 'adm-switch__track', ariaHidden: 'true' }), p.publicado ? 'Visible' : 'Oculta']);

  const edit = el('button', { type: 'button', className: 'adm-btn adm-btn--sm', textContent: 'Editar' });
  edit.addEventListener('click', () => openEditor(p));
  const remove = el('button', { type: 'button', className: 'adm-btn adm-btn--sm adm-btn--danger-ghost', textContent: 'Borrar' });
  remove.addEventListener('click', () => requestDelete(p));

  return el('article', { className: `adm-tile${p.publicado ? '' : ' is-draft'}` }, [
    el('figure', { className: 'adm-tile__media' }, [
      img,
      el('span', { className: 'adm-tile__cat', textContent: CAT_NAME[p.cat] || p.cat }),
      el('span', { className: 'adm-tile__photos', textContent: `${photos} foto${photos === 1 ? '' : 's'}` }),
      ...(p.cat === 'guitarras' && p.portada !== false && p.publicado
        ? [el('span', { className: 'adm-tile__home', textContent: 'En portada' })] : [])
    ]),
    el('div', { className: 'adm-tile__body' }, [
      ...(p.cat === 'guitarras' && p.lema ? [el('p', { className: 'adm-tile__lema', textContent: p.lema })] : []),
      el('h3', { textContent: p.name }),
      el('p', { className: 'adm-tile__price', textContent: p.priceLabel || formatPrice(p.price) }),
      el('p', { className: 'adm-muted adm-tile__meta', textContent: `${p.disponibilidad === 'inmediata' ? 'Entrega inmediata' : 'Por encargo'} · Orden ${p.orden ?? 0}` })
    ]),
    el('footer', { className: 'adm-tile__foot' }, [sw, el('span', { className: 'adm-spacer' }), remove, edit])
  ]);
}

async function setPublished(p, toggle) {
  toggle.disabled = true;
  try {
    const publicado = toggle.checked;
    await updateCatalog(
      (list) => list.map((x) => (x.slug === p.slug ? { ...x, publicado, actualizado: new Date().toISOString() } : x)),
      `Panel: ${publicado ? 'muestra' : 'oculta'} ${p.name}`
    );
    setStatus(`«${p.name}» ${publicado ? 'visible' : 'oculta'}. La web se actualizará en 2 o 3 minutos.`, 'ok');
    render();
    refreshPublish().catch(() => {});
  } catch (error) {
    toggle.checked = !toggle.checked;
    toggle.disabled = false;
    setStatus(friendlyError(error), 'error');
  }
}

$('search').addEventListener('input', render);
$('new').addEventListener('click', () => openEditor(null));
document.querySelectorAll('.adm-chip').forEach((chip) => chip.addEventListener('click', () => {
  filterCat = chip.dataset.cat;
  document.querySelectorAll('.adm-chip').forEach((c) => c.classList.toggle('is-active', c === chip));
  render();
}));

/* ---------- Borrado ---------- */

function requestDelete(p) {
  pendingDelete = p;
  $('confirmName').textContent = p.name;
  $('confirm').showModal();
}

$('confirm').addEventListener('close', async () => {
  const p = pendingDelete;
  pendingDelete = null;
  if ($('confirm').returnValue !== 'ok' || !p) return;
  setStatus(`Borrando «${p.name}»…`);
  try {
    await updateCatalog((list) => list.filter((x) => x.slug !== p.slug), `Panel: borra ${p.name}`);
    await deleteCatalogPhotos(p.gallery || [], p.slug).catch(() => {});
    if ($('editor').open) $('editor').close();
    setStatus(`«${p.name}» borrada. La web se actualizará en 2 o 3 minutos.`, 'ok');
    render();
    refreshPublish().catch(() => {});
  } catch (error) {
    setStatus(friendlyError(error), 'error');
  }
});

/* ---------- Editor y publicación ---------- */

initEditor({
  getItems: () => items,
  savePiece,
  friendlyError,
  requestDelete,
  onSaved: (message) => { setStatus(message, 'ok'); render(); refreshPublish().catch(() => {}); }
});

initPublish();

initTestimonios({
  friendlyError,
  setStatus,
  onSaved: (message) => { setStatus(message, 'ok'); refreshPublish().catch(() => {}); }
});
