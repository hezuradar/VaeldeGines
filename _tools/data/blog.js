'use strict';
/* Artículos del blog. La fuente editable es blog-posts.json (la gestiona el panel /admin).
   Si no existe, se usa la copia original importada de WordPress.
   Los textos visibles se escapan; el HTML del cuerpo se conserva (lo escribe el panel). */

const fs = require('fs');
const path = require('path');

const SOURCE = path.join(__dirname, 'blog-posts.json');
const FALLBACK = path.join(__dirname, 'blog-original.json');

const decode = (s) => String(s ?? '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&#039;|&apos;/g, "'");

const escapeText = (s) => decode(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

function load() {
  const file = fs.existsSync(SOURCE) ? SOURCE : FALLBACK;
  let raw = [];
  try {
    raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    console.warn('Aviso: blog-posts.json no es válido; se usan los artículos originales.');
    raw = JSON.parse(fs.readFileSync(FALLBACK, 'utf8'));
  }
  if (!Array.isArray(raw)) raw = [];
  return raw.filter((a) => a && a.slug && /^[a-z0-9_-]{1,80}$/.test(a.slug)).map((a) => {
    const iso = /^\d{4}-\d{2}-\d{2}/.test(a.iso || '') ? a.iso : `${a.iso || '2026-01-01'}T00:00:00`;
    const content = String(a.content || '');
    const excerpt = escapeText(a.excerpt || content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 180));
    return {
      id: a.id || a.slug,
      slug: a.slug,
      file: `blog-${a.slug}.html`,
      title: escapeText(a.title || a.slug),
      wpTitle: escapeText(a.title || a.slug),
      excerpt,
      date: a.date || iso.slice(0, 10),
      iso,
      filter: a.filter || 'lutheria',
      label: escapeText(a.label || 'Artículo'),
      categories: (a.categories || [a.label || 'Blog']).map(escapeText),
      image: /^assets\/img\/[\w\-/]+\.(?:jpe?g|png|webp)$/i.test(a.image || '') ? a.image : 'assets/img/workshop-1.jpg',
      link: a.link || '',
      content,
      order: Number(a.order) || 0
    };
  }).filter((a) => a.publicado !== false);
}

module.exports = load();
