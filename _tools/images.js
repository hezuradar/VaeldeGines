'use strict';
/* Sustituye cada <img> local por su versión WebP optimizada (ver
   optimize-images.py): añade srcset, sizes, width/height reales,
   carga diferida y decodificación asíncrona.                         */

const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, 'data', 'images.json');
const DEFAULT_SIZES = '(max-width: 780px) 100vw, 50vw';

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.warn('Aviso: falta _tools/data/images.json. Ejecuta antes python _tools/optimize-images.py');
    return {};
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

const manifest = loadManifest();

const getAttr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? m[1] : null;
};

const setAttr = (tag, name, value) => (getAttr(tag, name) !== null
  ? tag.replace(new RegExp(`(\\s${name}=")[^"]*(")`), `$1${value}$2`)
  : tag.replace(/^<img/, `<img ${name}="${value}"`));

function optimizeTag(tag) {
  const entry = manifest[getAttr(tag, 'src')];
  if (!entry) return tag;

  let out = setAttr(tag, 'src', entry.lg);
  out = setAttr(out, 'width', String(entry.w));
  out = setAttr(out, 'height', String(entry.h));
  if (entry.sm) {
    out = setAttr(out, 'srcset', `${entry.sm} ${entry.smw}w, ${entry.lg} ${entry.w}w`);
    if (getAttr(out, 'sizes') === null) out = setAttr(out, 'sizes', DEFAULT_SIZES);
  }
  const full = getAttr(out, 'data-full');
  if (full && manifest[full]) out = setAttr(out, 'data-full', manifest[full].lg);
  const eager = getAttr(out, 'fetchpriority') === 'high';
  if (!eager && getAttr(out, 'loading') === null) out = setAttr(out, 'loading', 'lazy');
  if (getAttr(out, 'decoding') === null) out = setAttr(out, 'decoding', 'async');
  return out;
}

/** @param {string} html @returns {string} */
function optimizeImages(html) {
  return html.replace(/<img\b[^>]*>/g, optimizeTag);
}

module.exports = { optimizeImages };
