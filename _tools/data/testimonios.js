'use strict';
/* Opiniones de la portada. La fuente es testimonios.json (editado por el panel /admin).
   Los textos se escapan aquí porque las plantillas los insertan en HTML. */

const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, 'testimonios.json');
const CURRENT = [{
  id: 'beatriz-mendez',
  texto: 'El violonchelo que construyó Vael posee un timbre aterciopelado y una potencia que llena cualquier sala. Su dedicación se siente en cada nota.',
  autor: 'Beatriz Méndez',
  cargo: 'Violonchelista de cámara',
  activo: true
}];

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function load() {
  let raw = CURRENT;
  if (fs.existsSync(SOURCE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(SOURCE, 'utf8'));
      if (Array.isArray(parsed)) raw = parsed;
    } catch (error) {
      console.warn('Aviso: testimonios.json no es válido; se usa la opinión original.');
    }
  }
  return raw
    .filter((t) => t && t.texto && t.activo !== false)
    .map((t) => ({
      id: escapeHtml(t.id || t.autor || 'opinion'),
      texto: escapeHtml(t.texto).slice(0, 600),
      autor: escapeHtml(t.autor || 'Cliente de Vael de Ginés').slice(0, 80),
      cargo: escapeHtml(t.cargo || '').slice(0, 100)
    }));
}

module.exports = load();
