/* Editor de piezas: datos, especificaciones y gestor de fotos.
   Al guardar: sube las fotos nuevas al repositorio, actualiza el catálogo (vía ctx.savePiece)
   y borra del repositorio las fotos del panel que se hayan quitado. */
import {
  addPendingPhoto, photoUrl, commitPhotos, discardPending, deleteCatalogPhotos, isPhotoRef, isCatalogPhoto
} from './fotos.js';

const SLUG = /^[a-z0-9-]{1,60}$/;
const MAX_PHOTOS = 12;
const CAT_LABEL = { guitarras: 'Guitarras de autor', folclore: 'Instrumentos de folclore', maderas: 'Maderas', formacion: 'Libros y formación' };

const $ = (id) => document.getElementById(id);
const field = (name) => $(`f-${name}`);

let ctx = null;       // { getItems, savePiece, requestDelete, friendlyError, onSaved }
let current = null;   // pieza que se edita (null si es nueva)
let gallery = [];     // referencias de fotos en el orden actual
let original = [];    // fotos al abrir el editor
let saved = false;
let preparing = 0;

function el(tag, props = {}, children = []) {
  const node = Object.assign(document.createElement(tag), props);
  children.forEach((c) => node.append(c));
  return node;
}

export const formatPrice = (n) => `${Number(n).toLocaleString('es-ES')} €`;

const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

/* ---------- Fotos ---------- */

function moveTo(from, to) {
  if (to < 0 || to >= gallery.length) return;
  const next = [...gallery];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  gallery = next;
  renderPhotos();
}

function photoItem(ref, index) {
  const img = el('img', { alt: `Foto ${index + 1}`, width: 160, height: 160, src: photoUrl(ref) });
  const actions = el('div', { className: 'adm-photo__actions' });
  const button = (label, title, onClick, disabled = false) => {
    const b = el('button', { type: 'button', textContent: label, title, ariaLabel: title, disabled });
    b.addEventListener('click', onClick);
    actions.append(b);
  };
  button('★', 'Hacer principal', () => moveTo(index, 0), index === 0);
  button('←', 'Mover a la izquierda', () => moveTo(index, index - 1), index === 0);
  button('→', 'Mover a la derecha', () => moveTo(index, index + 1), index === gallery.length - 1);
  button('×', 'Quitar foto', () => { gallery = gallery.filter((_, i) => i !== index); renderPhotos(); });
  const badge = index === 0 ? [el('span', { className: 'adm-photo__main', textContent: 'Principal' })] : [];
  return el('li', { className: 'adm-photo' }, [img, ...badge, actions]);
}

function renderPhotos() {
  const items = gallery.map(photoItem);
  for (let i = 0; i < preparing; i += 1) {
    items.push(el('li', { className: 'adm-photo is-loading' }, [el('span', { textContent: 'Optimizando…' })]));
  }
  $('photoList').replaceChildren(...items);
  $('drop').classList.toggle('is-full', gallery.length >= MAX_PHOTOS);
}

async function addFiles(fileList) {
  const files = [...fileList].filter((f) => f.type.startsWith('image/')).slice(0, MAX_PHOTOS - gallery.length);
  if (!files.length) return;
  $('editorError').textContent = '';
  preparing += files.length;
  renderPhotos();
  for (const file of files) {
    try {
      gallery = [...gallery, await addPendingPhoto(file)];
    } catch (error) {
      $('editorError').textContent = `«${file.name}»: ${error.message || ctx.friendlyError(error)}`;
    } finally {
      preparing -= 1;
      renderPhotos();
    }
  }
}

const drop = $('drop');
$('fileInput').addEventListener('change', (e) => { addFiles(e.target.files); e.target.value = ''; });
['dragenter', 'dragover'].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.add('is-over'); }));
['dragleave', 'drop'].forEach((t) => drop.addEventListener(t, () => drop.classList.remove('is-over')));
drop.addEventListener('drop', (e) => { e.preventDefault(); addFiles(e.dataTransfer.files); });

/* ---------- Especificaciones ---------- */

function specRow(nombre = '', valor = '') {
  const k = el('input', { value: nombre, placeholder: 'Tapa armónica', maxLength: 60, ariaLabel: 'Nombre de la especificación' });
  const v = el('input', { value: valor, placeholder: 'Abeto alemán selecto', maxLength: 120, ariaLabel: 'Valor de la especificación' });
  const remove = el('button', { type: 'button', className: 'adm-icon', textContent: '×', ariaLabel: 'Quitar especificación' });
  const wrap = el('div', { className: 'adm-spec' }, [k, v, remove]);
  remove.addEventListener('click', () => wrap.remove());
  return wrap;
}
$('addSpec').addEventListener('click', () => $('specs').append(specRow()));

/* ---------- Colección de autor (solo guitarras) ---------- */

function toggleAutor() {
  $('autorFields').hidden = field('cat').value !== 'guitarras';
}
field('cat').addEventListener('change', toggleAutor);

/* ---------- Abrir, leer y guardar ---------- */

export function initEditor(context) {
  ctx = context;
}

export function openEditor(item) {
  current = item;
  saved = false;
  preparing = 0;
  const data = item || { cat: 'guitarras', price: 0, disponibilidad: 'encargo', orden: ctx.getItems().length, publicado: true, specs: [], gallery: [] };
  original = [...(data.gallery || [])];
  gallery = [...original];
  $('editorEyebrow').textContent = item ? 'Editar pieza' : 'Nueva pieza';
  $('editorTitle').textContent = item ? item.name : 'Sin nombre';
  ['name', 'slug', 'label', 'price', 'priceLabel', 'subtitle', 'desc', 'orden', 'lema', 'resumen']
    .forEach((k) => { field(k).value = data[k] ?? ''; });
  field('cat').value = data.cat;
  field('disp').value = data.disponibilidad || 'encargo';
  field('publicado').checked = Boolean(data.publicado);
  field('novedad').checked = Boolean(data.novedad);
  field('portada').checked = data.portada !== false;   // sin dato (piezas antiguas): se muestra
  field('slug').disabled = Boolean(item);
  $('slugPreview').textContent = data.slug || '…';
  $('specs').replaceChildren(...(data.specs || []).map((s) => specRow(s.nombre, s.valor)));
  toggleAutor();
  $('delete').hidden = !item;
  $('editorError').textContent = '';
  renderPhotos();
  $('editor').showModal();
  field('name').focus();
}

field('name').addEventListener('input', () => {
  const name = field('name').value;
  $('editorTitle').textContent = name || 'Sin nombre';
  if (!current) {
    field('slug').value = slugify(name);
    $('slugPreview').textContent = field('slug').value || '…';
  }
});
field('slug').addEventListener('input', () => { $('slugPreview').textContent = field('slug').value || '…'; });

function readForm() {
  const name = field('name').value.trim();
  const slug = field('slug').value.trim();
  const cat = field('cat').value;
  const price = Number(field('price').value);
  const specs = [...$('specs').querySelectorAll('.adm-spec')]
    .map((r) => { const [k, v] = r.querySelectorAll('input'); return { nombre: k.value.trim(), valor: v.value.trim() }; })
    .filter((s) => s.nombre && s.valor);

  const errors = [];
  if (!name) errors.push('El nombre es obligatorio.');
  if (!SLUG.test(slug)) errors.push('La dirección web solo admite minúsculas, números y guiones.');
  if (!Number.isFinite(price) || price < 0) errors.push('El precio debe ser un número igual o mayor que 0.');
  if (!gallery.length) errors.push('Añade al menos una foto.');
  if (gallery.some((g) => !isPhotoRef(g))) errors.push('Hay una foto no válida.');
  if (preparing) errors.push('Espera a que terminen de prepararse las fotos.');
  if (!current && ctx.getItems().some((p) => p.slug === slug)) errors.push('Ya existe una pieza con esa dirección web.');

  const data = {
    slug, name, cat,
    label: field('label').value.trim() || CAT_LABEL[cat],
    price,
    priceLabel: field('priceLabel').value.trim() || `Desde ${formatPrice(price)}`,
    desc: field('desc').value.trim(),
    subtitle: field('subtitle').value.trim(),
    specs,
    disponibilidad: field('disp').value,
    orden: Number(field('orden').value) || 0,
    publicado: field('publicado').checked,
    novedad: field('novedad').checked,
    ...(cat === 'guitarras' ? {
      lema: field('lema').value.trim(),
      resumen: field('resumen').value.trim(),
      portada: field('portada').checked
    } : {})
  };
  return { data, errors };
}

$('editorForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const { data, errors } = readForm();
  if (errors.length) { $('editorError').textContent = errors.join(' '); return; }
  $('save').disabled = true;
  $('save').textContent = 'Guardando…';
  try {
    gallery = await commitPhotos(data.slug, gallery);
    const piece = { ...data, image: gallery[0], gallery: [...gallery], actualizado: new Date().toISOString() };
    await ctx.savePiece(piece);
    saved = true;
    const removed = original.filter((r) => isCatalogPhoto(r) && !gallery.includes(r));
    await deleteCatalogPhotos(removed, data.slug).catch(() => { /* quedarían sin usar; no bloquea */ });
    $('editor').close();
    ctx.onSaved(`«${data.name}» guardada. La web se actualizará sola en 2 o 3 minutos.`);
  } catch (error) {
    $('editorError').textContent = ctx.friendlyError(error);
  } finally {
    $('save').disabled = false;
    $('save').textContent = 'Guardar';
  }
});

// Al cerrar sin guardar, se descartan las fotos que aún no se habían subido.
$('editor').addEventListener('close', () => {
  if (!saved) discardPending(gallery);
});

document.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => $('editor').close()));
$('delete').addEventListener('click', () => { if (current) ctx.requestDelete(current); });
