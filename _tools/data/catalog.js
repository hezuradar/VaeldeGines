'use strict';
/* Catálogo que usa el build.
   - Si existe catalogo.json (el que edita el panel /admin directamente en el repositorio), manda.
   - Si no, se usa products.js, el catálogo original.
   Todos los textos se escapan aquí porque las plantillas los insertan en HTML. */

const fs = require('fs');
const path = require('path');

const FIRESTORE_DUMP = path.join(__dirname, 'catalogo.json');
const IMAGE_PATH = /^assets\/img\/[\w\-/]+\.(?:jpe?g|png|webp)$/i;

const CATEGORIES = {
  guitarras: { label: 'Guitarras de autor', disponibilidad: 'encargo' },
  folclore: { label: 'Instrumentos de folclore', disponibilidad: 'encargo' },
  maderas: { label: 'Maderas', disponibilidad: 'inmediata' },
  formacion: { label: 'Libros y formación', disponibilidad: 'inmediata' }
};

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const UPLOADED = /^foto:([A-Za-z0-9]{20})$/;
const UPLOAD_DIR = path.join(__dirname, '..', '..', 'assets', 'img', 'catalogo');

/** Ruta pública de una foto: las del panel (foto:<id>) se descargan a assets/img/catalogo/. */
function safeImage(src) {
  const value = String(src || '');
  const uploaded = value.match(UPLOADED);
  if (uploaded) {
    const ext = ['webp', 'jpg'].find((e) => fs.existsSync(path.join(UPLOAD_DIR, `${uploaded[1]}.${e}`)));
    return ext ? `assets/img/catalogo/${uploaded[1]}.${ext}` : 'assets/img/logo.png';
  }
  return IMAGE_PATH.test(value) ? value : 'assets/img/logo.png';
}

// Textos originales de la colección de autor: se usan si la pieza aún no los tiene en Firestore.
const ORIGINAL = Object.fromEntries(require('./products').map((p) => [p.slug, p]));

/** Normaliza un instrumento (de products.js o de Firestore) al formato de las plantillas. */
function normalize(raw, index) {
  const cat = CATEGORIES[raw.cat] ? raw.cat : 'guitarras';
  const fallback = ORIGINAL[raw.slug] || {};
  const specs = (raw.specs || []).map((s) => (Array.isArray(s) ? s : [s.nombre, s.valor]));
  const gallery = (raw.gallery && raw.gallery.length ? raw.gallery : [raw.image]).map(safeImage);
  return {
    slug: String(raw.slug),
    name: escapeHtml(raw.name),
    cat,
    label: escapeHtml(raw.label || CATEGORIES[cat].label),
    price: Number(raw.price) || 0,
    priceLabel: escapeHtml(raw.priceLabel),
    desc: escapeHtml(raw.desc),
    subtitle: escapeHtml(raw.subtitle),
    lema: escapeHtml(raw.lema || fallback.lema || CATEGORIES[cat].label),
    resumen: escapeHtml(raw.resumen || fallback.resumen || raw.desc),
    image: safeImage(raw.image || gallery[0]),
    specs: specs.filter(([k, v]) => k && v).map(([k, v]) => [escapeHtml(k), escapeHtml(v)]),
    gallery,
    disponibilidad: raw.disponibilidad === 'inmediata' ? 'inmediata' : (raw.disponibilidad || CATEGORIES[cat].disponibilidad),
    orden: Number.isFinite(Number(raw.orden)) ? Number(raw.orden) : index,
    publicado: raw.publicado !== false,
    portada: raw.portada !== false,   // colección de autor de la portada (sin dato: sí)
    novedad: raw.novedad === true     // distintivo «Novedad» en la ficha
  };
}

function load() {
  const fromFirestore = fs.existsSync(FIRESTORE_DUMP);
  const source = fromFirestore
    ? JSON.parse(fs.readFileSync(FIRESTORE_DUMP, 'utf8'))
    : require('./products');
  return source
    .filter((p) => p && /^[a-z0-9-]{1,60}$/.test(p.slug))
    .map(normalize)
    .filter((p) => p.publicado)
    .sort((a, b) => a.orden - b.orden);
}

const UNIDADES = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
  'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];

/**
 * Número en letras para los titulares («seis», «una», «doce»). Hasta 20 en letras; a partir de ahí, cifra.
 * @param {number} n
 * @param {'m'|'f'} genero
 */
function enLetras(n, genero = 'm') {
  if (n === 1) return genero === 'f' ? 'una' : 'un';
  return n >= 0 && n <= 20 ? UNIDADES[n] : String(n);
}

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

const catalog = load();

module.exports = catalog;
module.exports.CATEGORIES = CATEGORIES;
module.exports.enLetras = enLetras;
module.exports.capitalizar = capitalizar;
/** Guitarras de la colección de autor: las piezas publicadas de la categoría «guitarras», por orden. */
module.exports.guitarrasDeAutor = catalog.filter((p) => p.cat === 'guitarras');
/** Las que además tienen marcado «Mostrar en la portada» en el panel: son las que cuenta el titular de la portada. */
module.exports.guitarrasPortada = module.exports.guitarrasDeAutor.filter((p) => p.portada);
