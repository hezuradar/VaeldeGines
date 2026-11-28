/* Opiniones de la portada: alta, modificación y borrado en _tools/data/testimonios.json.
   Igual que el catálogo: el archivo vive en el repositorio y cada cambio es un commit. */
import { readText, putFile, toBase64, TESTIMONIOS_PATH } from './github.js';

const $ = (id) => document.getElementById(id);
let ctx = null;
let items = [];
let sha = null;
let currentId = null;

const el = (tag, props = {}, children = []) => {
  const node = Object.assign(document.createElement(tag), props);
  children.forEach((c) => node.append(c));
  return node;
};

const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50) || 'opinion';

function render() {
  $('opinionesCount').textContent = String(items.length);
  $('opinionesEmpty').hidden = items.length > 0;
  const nodes = items.map((t, i) => {
    const quote = el('blockquote', { textContent: t.texto });
    const author = el('p', { className: 'adm-opinion__author' }, [
      el('strong', { textContent: t.autor }),
      ...(t.cargo ? [el('span', { textContent: t.cargo })] : [])
    ]);
    const edit = el('button', { type: 'button', className: 'adm-btn adm-btn--ghost', textContent: 'Editar' });
    edit.addEventListener('click', () => open(t));
    const remove = el('button', { type: 'button', className: 'adm-btn adm-btn--danger-ghost', textContent: 'Borrar' });
    remove.addEventListener('click', () => del(t, i));
    return el('article', { className: `adm-opinion${t.activo === false ? ' is-hidden' : ''}` }, [
      el('div', { className: 'adm-opinion__num', textContent: String(i + 1).padStart(2, '0') }),
      quote, author,
      el('div', { className: 'adm-opinion__actions' }, [edit, remove]),
      ...(t.activo === false ? [el('span', { className: 'adm-opinion__flag', textContent: 'Oculta' })] : [])
    ]);
  });
  $('opinionesList').replaceChildren(...nodes);
}

export async function refreshTestimonios() {
  const file = await readText(TESTIMONIOS_PATH);
  sha = file ? file.sha : null;
  items = file ? (JSON.parse(file.content) || []) : [];
  render();
}

function open(item) {
  currentId = item ? item.id : null;
  $('opinionEditorEyebrow').textContent = item ? 'Editar opinión' : 'Nueva opinión';
  $('opinionEditorTitle').textContent = item ? item.autor : 'Opinión';
  $('op-texto').value = item ? item.texto : '';
  $('op-autor').value = item ? item.autor : '';
  $('op-cargo').value = item ? (item.cargo || '') : '';
  $('op-activo').checked = item ? item.activo !== false : true;
  $('op-delete').hidden = !item;
  $('opinionError').textContent = '';
  $('opinionEditor').showModal();
  $('op-texto').focus();
}

async function save(e) {
  e.preventDefault();
  const texto = $('op-texto').value.trim();
  const autor = $('op-autor').value.trim();
  if (!texto || !autor) { $('opinionError').textContent = 'Escribe el texto y el nombre.'; return; }
  const data = {
    id: currentId || slugify(autor),
    texto: texto.slice(0, 600),
    autor: autor.slice(0, 80),
    cargo: $('op-cargo').value.trim().slice(0, 100),
    activo: $('op-activo').checked
  };
  const next = items.filter((t) => t.id !== data.id);
  const index = currentId ? items.findIndex((t) => t.id === currentId) : -1;
  next.splice(index >= 0 ? index : next.length, 0, data);
  try {
    const file = await readText(TESTIMONIOS_PATH);
    await putFile(TESTIMONIOS_PATH,
      toBase64(`${JSON.stringify(next, null, 1)}\n`),
      `Panel: ${currentId ? 'edita' : 'añade'} opinión de ${data.autor}`,
      file ? file.sha : null);
    items = next;
    $('opinionEditor').close();
    ctx.onSaved(`«${data.autor}» guardada. La web se actualizará en 2 o 3 minutos.`);
    render();
  } catch (error) {
    $('opinionError').textContent = ctx.friendlyError(error);
  }
}

async function del(item, index) {
  if (!window.confirm(`¿Borrar la opinión de ${item.autor}?`)) return;
  try {
    const file = await readText(TESTIMONIOS_PATH);
    const next = items.filter((t) => t.id !== item.id);
    await putFile(TESTIMONIOS_PATH,
      toBase64(`${JSON.stringify(next, null, 1)}\n`),
      `Panel: borra opinión de ${item.autor}`,
      file ? file.sha : null);
    items = next;
    ctx.onSaved(`Opinión de «${item.autor}» borrada. La web se actualizará en 2 o 3 minutos.`);
    render();
  } catch (error) {
    ctx.setStatus(ctx.friendlyError(error), 'error');
  }
}

export function initTestimonios(context) {
  ctx = context;
  $('nuevaOpinion').addEventListener('click', () => open(null));
  $('opinionForm').addEventListener('submit', save);
  $('op-delete').addEventListener('click', () => {
    const item = items.find((t) => t.id === currentId);
    if (item) del(item, items.indexOf(item));
  });
  $('opinionEditor').querySelectorAll('[data-close]').forEach((b) => {
    b.addEventListener('click', () => $('opinionEditor').close());
  });
}
