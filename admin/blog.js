/* Artículos del blog: alta, modificación y borrado en _tools/data/blog-posts.json.
   Editor con texto enriquecido, vista HTML, enlaces e imágenes subidas al repositorio. */
import { readText, putFile, toBase64, BLOG_PATH, BLOG_PHOTO_DIR } from './github.js';
import { addPendingPhoto, photoUrl, commitPhotos, isPending, deleteCatalogPhotos } from './fotos.js';

const $ = (id) => document.getElementById(id);
let ctx = null;
let items = [];
let currentId = null;
let uploadTarget = 'cover';
let htmlMode = false;
let slugTouched = false;
let mediaRefs = [];

const el = (tag, props = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), props);
  children.forEach((c) => node.append(c));
  return node;
};

const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'articulo';

const fecha = (iso) => {
  const d = new Date(iso || '2026-01-01');
  return Number.isNaN(d.getTime()) ? String(iso || '') : d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
};

function render(filter = '') {
  const q = filter.trim().toLowerCase();
  const shown = items.filter((a) => !q || `${a.title} ${a.excerpt} ${a.label}`.toLowerCase().includes(q));
  $('blogCount').textContent = String(items.length);
  $('blogEmpty').hidden = items.length > 0;
  const nodes = shown.map((a) => {
    const media = el('div', { className: 'adm-tile__media' });
    const img = el('img', { src: photoUrl(a.image) || '../assets/img/workshop-1.jpg', alt: '', loading: 'lazy' });
    media.append(img);
    const body = el('div', { className: 'adm-tile__body' }, [
      el('span', { className: 'adm-tile__cat', textContent: `${fecha(a.iso)} · ${a.label || 'Artículo'}` }),
      el('h3', { textContent: a.title }),
      el('p', { textContent: (a.excerpt || '').slice(0, 140) }),
      ...(a.publicado === false ? [el('span', { className: 'adm-tile__home', textContent: 'Oculto' })] : [])
    ]);
    const edit = el('button', { type: 'button', className: 'adm-btn adm-btn--ghost', textContent: 'Editar' });
    edit.addEventListener('click', () => open(a));
    const remove = el('button', { type: 'button', className: 'adm-btn adm-btn--danger-ghost', textContent: 'Borrar' });
    remove.addEventListener('click', () => del(a));
    body.append(el('div', { className: 'adm-opinion__actions' }, [edit, remove]));
    return el('article', { className: 'adm-tile' }, [media, body]);
  });
  $('blogList').replaceChildren(...nodes);
}

export async function refreshBlog() {
  const file = await readText(BLOG_PATH);
  items = file ? (JSON.parse(file.content) || []) : [];
  render($('blogSearch') ? $('blogSearch').value : '');
}

function syncEditor(toHtml = htmlMode) {
  if (toHtml) $('blogHtml').value = $('blogContent').innerHTML;
  else if (!$('blogHtml').hidden) $('blogContent').innerHTML = $('blogHtml').value;
}

function setMode(toHtml) {
  if ($('blogHtml').hidden === !toHtml) return;
  syncEditor(toHtml);
  htmlMode = toHtml;
  $('blogContent').hidden = toHtml;
  $('blogHtml').hidden = !toHtml;
  $('blogEditor').querySelector('.adm-rich__mode').textContent = toHtml ? 'Ver texto' : 'Ver HTML';
}

function exec(cmd) {
  if (htmlMode) { ctx.setStatus('Vuelve a «Ver texto» para usar los botones de formato.', 'error'); return; }
  const editor = $('blogContent');
  editor.focus();
  if (cmd === 'h2' || cmd === 'h3' || cmd === 'blockquote') document.execCommand('formatBlock', false, cmd);
  else if (cmd === 'link') {
    const url = window.prompt('Dirección del enlace (https://…):', 'https://');
    if (url) document.execCommand('createLink', false, url);
  } else if (cmd === 'image') {
    uploadTarget = 'content';
    $('blogFile').click();
  } else document.execCommand(cmd, false, null);
}

function preview() {
  const img = $('blogPreview');
  const src = photoUrl($('blog-image').value.trim()) || $('blog-image').value.trim();
  const ok = /^https?:\/\//.test(src) || src.startsWith('../') || src.startsWith('data:');
  img.hidden = !ok;
  $('blogCoverEmpty').hidden = ok;
  $('blogRemoveCover').hidden = !ok;
  if (ok) img.src = src;
}

function renderMedia() {
  $('blogMedia').replaceChildren(...mediaRefs.map((ref, i) => {
    const button = el('button', { type: 'button', title: 'Insertar imagen en el texto', 'aria-label': `Insertar imagen ${i + 1}` });
    button.append(el('img', { src: photoUrl(ref) || '', alt: '' }));
    button.addEventListener('click', () => {
      const tag = `<img src="${ref}" alt="" loading="lazy">`;
      if (!$('blogHtml').hidden) $('blogHtml').value += tag;
      else {
        $('blogContent').focus();
        document.execCommand('insertHTML', false, tag);
      }
    });
    return button;
  }));
}

function showPreviewDialog() {
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const title = $('blog-title').value.trim() || 'Artículo';
  const label = $('blog-label').value.trim() || 'Artículo';
  const date = $('blog-date').value || '2026-01-01';
  const cover = $('blog-image').value.trim();
  const coverUrl = photoUrl(cover) || cover || '../assets/img/workshop-1.jpg';
  const content = ($('blogHtml').hidden ? $('blogContent').innerHTML : $('blogHtml').value)
    .replace(/src="assets\//g, 'src="../assets/');
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="../assets/css/styles.css"></head><body>
  <section class="article-hero" style="background-image:url('${coverUrl}')">
    <div class="container"><p class="eyebrow">${esc(label)}</p><h1 class="article-hero__title">${esc(title)}</h1>
    <div class="article__meta"><span>Por Ginés Martínez</span><span class="dot"></span><span>${date}</span></div></div>
  </section>
  <section class="section section--tight"><div class="container article-layout"><article><div class="prose">${content}</div></article></div></section>
  </body></html>`;
  $('blogPreviewTitle').textContent = title;
  $('blogPreviewFrame').srcdoc = html;
  $('blogPreviewDialog').showModal();
}

function open(item) {
  currentId = item ? item.id : null;
  slugTouched = Boolean(item);
  const content = item ? (item.content || '') : '';
  mediaRefs = [...content.matchAll(/src="(assets\/img\/[\w\-/]+\.(?:jpe?g|png|webp))"/g)].map((m) => m[1]);
  $('blogEditorEyebrow').textContent = item ? 'Editar artículo' : 'Nuevo artículo';
  $('blogEditorTitle').textContent = item ? item.title : 'Artículo';
  $('blog-title').value = item ? item.title : '';
  $('blog-slug').value = item ? item.slug : '';
  $('blog-label').value = item ? (item.label || '') : '';
  $('blog-date').value = item ? String(item.iso || '2026-01-01').slice(0, 10) : new Date().toISOString().slice(0, 10);
  $('blog-excerpt').value = item ? (item.excerpt || '') : '';
  $('blog-image').value = item ? (item.image || '') : '';
  $('blog-publicado').checked = item ? item.publicado !== false : true;
  $('blogContent').innerHTML = content;
  htmlMode = false;
  $('blogContent').hidden = false;
  $('blogHtml').hidden = true;
  $('blogEditor').querySelector('.adm-rich__mode').textContent = 'Ver HTML';
  $('blog-delete').hidden = !item;
  $('blogError').textContent = '';
  renderMedia();
  preview();
  $('blogEditor').showModal();
  $('blog-title').focus();
}

async function save(e) {
  e.preventDefault();
  const title = $('blog-title').value.trim();
  const slug = $('blog-slug').value.trim();
  const iso = `${$('blog-date').value || '2026-01-01'}T00:00:00`;
  if (!title || !/^[a-z0-9_-]{1,80}$/.test(slug)) {
    $('blogError').textContent = 'Escribe el título y una dirección web válida (minúsculas, números y guiones).';
    return;
  }
  let content = $('blogHtml').hidden ? $('blogContent').innerHTML : $('blogHtml').value;
  if (!content || !content.replace(/<[^>]+>/g, '').trim()) {
    $('blogError').textContent = 'El artículo necesita contenido.';
    return;
  }
  if (!currentId && items.some((a) => a.slug === slug)) {
    $('blogError').textContent = 'Ya existe un artículo con esa dirección web.';
    return;
  }

  try {
    const refs = new Set();
    let image = $('blog-image').value.trim();
    if (isPending(image)) refs.add(image);
    for (const m of content.matchAll(/src="(pending:\d+)"/g)) refs.add(m[1]);
    const paths = await commitPhotos(slug, [...refs], BLOG_PHOTO_DIR);
    const map = Object.fromEntries([...refs].map((r, i) => [r, paths[i]]));
    content = content.replace(/pending:\d+/g, (r) => map[r] || r);
    if (isPending(image)) image = map[image] || image;

    const excerpt = $('blog-excerpt').value.trim()
      || content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180);
    const label = $('blog-label').value.trim() || 'Artículo';
    const data = {
      id: currentId || `blog-${slug}`,
      slug, title, excerpt: excerpt.slice(0, 300),
      date: new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
      iso, label, filter: 'lutheria', categories: [label],
      image: image || 'assets/img/workshop-1.jpg',
      link: (items.find((a) => a.id === currentId) || {}).link || '',
      content, publicado: $('blog-publicado').checked
    };
    const next = items.filter((a) => a.id !== data.id);
    const index = currentId ? items.findIndex((a) => a.id === currentId) : -1;
    next.splice(index >= 0 ? index : 0, 0, data);
    const file = await readText(BLOG_PATH);
    await putFile(BLOG_PATH, toBase64(`${JSON.stringify(next, null, 1)}\n`),
      `Panel: ${currentId ? 'edita' : 'añade'} artículo ${title}`, file ? file.sha : null);
    items = next;
    $('blogEditor').close();
    ctx.onSaved(`«${title}» guardado. La web se actualizará en 2 o 3 minutos.`);
    render($('blogSearch').value);
  } catch (error) {
    $('blogError').textContent = ctx.friendlyError(error);
  }
}

async function del(item) {
  if (!window.confirm(`¿Borrar el artículo «${item.title}»?`)) return;
  try {
    const images = [...(item.content || '').matchAll(/src="(assets\/img\/blog\/[\w\-/]+\.(?:jpe?g|png|webp))"/g)].map((m) => m[1]);
    if (item.image && item.image.startsWith(BLOG_PHOTO_DIR)) images.push(item.image);
    const next = items.filter((a) => a.id !== item.id);
    const file = await readText(BLOG_PATH);
    await putFile(BLOG_PATH, toBase64(`${JSON.stringify(next, null, 1)}\n`),
      `Panel: borra artículo ${item.title}`, file ? file.sha : null);
    await deleteCatalogPhotos(images, item.slug, BLOG_PHOTO_DIR).catch(() => {});
    items = next;
    if ($('blogEditor').open) $('blogEditor').close();
    ctx.onSaved(`Artículo «${item.title}» borrado. La web se actualizará en 2 o 3 minutos.`);
    render($('blogSearch').value);
  } catch (error) {
    ctx.setStatus(ctx.friendlyError(error), 'error');
  }
}

export function initBlog(context) {
  ctx = context;
  $('blog-title').addEventListener('input', () => {
    if (!slugTouched) $('blog-slug').value = slugify($('blog-title').value);
  });
  $('blog-slug').addEventListener('input', () => { slugTouched = true; });
  $('blogRemoveCover').addEventListener('click', () => { $('blog-image').value = ''; preview(); });
  $('blogPreviewBtn').addEventListener('click', showPreviewDialog);
  $('blogPreviewDialog').querySelector('[data-close-preview]').addEventListener('click', () => $('blogPreviewDialog').close());
  $('blogAddMedia').addEventListener('click', () => { uploadTarget = 'content'; $('blogFile').click(); });
  $('nuevoArticulo').addEventListener('click', () => open(null));
  $('blogForm').addEventListener('submit', save);
  $('blog-delete').addEventListener('click', () => {
    const item = items.find((a) => a.id === currentId);
    if (item) del(item);
  });
  $('blogEditor').querySelectorAll('[data-close]').forEach((b) => {
    b.addEventListener('click', () => $('blogEditor').close());
  });
  $('blogEditor').querySelectorAll('[data-cmd]').forEach((b) => {
    b.addEventListener('click', () => exec(b.dataset.cmd));
  });
  $('blogEditor').querySelector('[data-mode]').addEventListener('click', () => setMode($('blogHtml').hidden));
  $('blog-image').addEventListener('input', preview);
  $('blogUploadCover').addEventListener('click', () => { uploadTarget = 'cover'; $('blogFile').click(); });
  $('blogFile').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      const ref = await addPendingPhoto(file);
      if (uploadTarget === 'cover') {
        $('blog-image').value = ref;
        preview();
      } else {
        mediaRefs.push(ref);
        renderMedia();
        const editor = $('blogContent');
        editor.focus();
        document.execCommand('insertHTML', false, `<img src="${ref}" alt="" loading="lazy">`);
      }
    } catch (error) {
      ctx.setStatus(ctx.friendlyError(error), 'error');
    }
  });
  $('blogSearch').addEventListener('input', (e) => render(e.target.value));
}
