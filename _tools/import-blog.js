'use strict';
/* Importa el blog real de vaeldegines.com vía WP REST API y prepara los datos
   para el nuevo diseño. Las imágenes se descargan a assets/img/blog/.        */

const fs = require('fs');
const path = require('path');
const posts = require('C:/Users/iotegi/AppData/Local/Temp/opencode/vael-blog/posts.json');
const categories = require('C:/Users/iotegi/AppData/Local/Temp/opencode/vael-blog/categories.json');

const ROOT = 'D:/hezuradar/Vael/web-nueva';
const DATA_DIR = path.join(ROOT, '_tools', 'data');
const IMG_DIR = path.join(ROOT, 'assets', 'img', 'blog');
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(IMG_DIR, { recursive: true });
fs.copyFileSync('C:/Users/iotegi/AppData/Local/Temp/opencode/vael-blog/posts.json', path.join(DATA_DIR, 'posts.json'));

const catById = Object.fromEntries(categories.map(c => [c.id, c.name]));
const knownSlugs = new Set(posts.map(p => p.slug));

const filterOf = (names) => {
  const s = names.join(' ').toLowerCase();
  if (/libro|formaci/.test(s)) return 'formacion';
  if (/ukelele|viol/.test(s)) return 'instrumentos';
  if (/mader|material/.test(s)) return 'maderas';
  if (/herramienta|cnc|luthier/.test(s)) return 'lutheria';
  if (/guitarra/.test(s)) return 'guitarras';
  return 'lutheria';
};

const labelOf = (names) => {
  const s = names.join(' ').toLowerCase();
  if (/libro|formaci/.test(s)) return 'Libros y formación';
  if (/ukelele|viol/.test(s)) return 'Instrumentos';
  if (/mader|material/.test(s)) return 'Maderas y materiales';
  if (/herramienta|cnc/.test(s)) return 'Herramientas';
  if (/luthier/.test(s)) return 'Luthería';
  if (/guitarra/.test(s)) return 'Guitarras artesanales';
  return names[0] || 'Luthería';
};

function entities(s) {
  return s
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#8217;|&#039;/gi, "'")
    .replace(/&hellip;/gi, '…')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripTags(s) {
  return entities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function slugify(s) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function formatDate(iso) {
  const months = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
  const d = new Date(iso);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function bestImageUrl(tag) {
  const srcset = tag.match(/srcset="([^"]+)"/);
  if (srcset) {
    const urls = srcset[1].split(',').map(x => x.trim().split(/\s+/)[0]);
    const original = urls.find(u => !/-\d+x\d+\.(jpg|jpeg|png|webp)$/i.test(u));
    if (original) return original;
    return urls[urls.length - 1];
  }
  const src = tag.match(/src="([^"]+)"/);
  return src ? src[1] : '';
}

function extensionOf(url) {
  const m = url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i);
  return m ? m[1].toLowerCase() : 'jpg';
}

function mapLink(href) {
  if (!href) return '#';
  const clean = href.replace(/\/$/, '');
  if (/^https?:\/\/vaeldegines\.com$/i.test(clean)) return 'index.html';
  const slugMatch = clean.match(/^https?:\/\/vaeldegines\.com\/([^/?#]+)/i);
  if (slugMatch) {
    const slug = decodeURIComponent(slugMatch[1]);
    if (knownSlugs.has(slug)) return `blog-${slug}.html`;
    const pages = {
      'guitarras-personalizadas': 'guitarras.html',
      'guitarra-personalizada': 'contacto.html',
      'guitarra-personalizada ': 'contacto.html',
      'instrumentos-de-folclore': 'instrumentos.html',
      'alguna-pregunta-aqui-el-formulario-de-contacto': 'contacto.html',
      'mentoria': 'mentoria.html',
      'blog': 'blog.html',
      'tienda': 'tienda.html',
      'la-cabana-del-luthier-temporada-1-2': 'podcast.html',
      'la-cabana-del-luthier-temporada-2': 'podcast.html',
      'la-cabana-del-luthier-temporada-2-2': 'podcast.html',
      'category': 'blog.html'
    };
    if (pages[slug]) return pages[slug];
  }
  return clean;
}

async function download(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
    return path.relative(ROOT, dest).replace(/\\/g, '/');
  }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return path.relative(ROOT, dest).replace(/\\/g, '/');
}

function convertContent(raw, slug, images) {
  let c = raw;

  // Bloques que no aportan al artículo
  c = c.replace(/<ul class="wp-block-social-links[\s\S]*?<\/ul>/gi, '');
  c = c.replace(/<ul class="wp-block-latest-posts[\s\S]*?<\/ul>/gi, '');
  c = c.replace(/<div class="wp-block-buttons[\s\S]*?<\/a>[\s\S]*?<\/div>\s*<\/div>/gi,
    '<p class="prose-cta"><a href="contacto.html">Encarga tu guitarra →</a></p>');
  c = c.replace(/<script[\s\S]*?<\/script>/gi, '');
  c = c.replace(/<style[\s\S]*?<\/style>/gi, '');
  c = c.replace(/<svg[\s\S]*?<\/svg>/gi, '');
  c = c.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  // Título H1: se muestra fuera del cuerpo
  c = c.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');

  // Imágenes: descargar y sustituir por rutas locales
  const imgTags = c.match(/<img\b[^>]*>/gi) || [];
  const localByUrl = new Map();
  imgTags.forEach((tag, i) => {
    const url = bestImageUrl(tag);
    if (!url || localByUrl.has(url)) return;
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1] || '';
    const file = `${slug}-${i + 1}.${extensionOf(url)}`;
    images.push({ url, file, alt });
    localByUrl.set(url, `assets/img/blog/${file}`);
  });

  c = c.replace(/<img\b[^>]*>/gi, (tag) => {
    const url = bestImageUrl(tag);
    const local = localByUrl.get(url);
    if (!local) return '';
    const alt = entities((tag.match(/alt="([^"]*)"/) || [])[1] || '').replace(/"/g, '&quot;');
    return `<img src="${local}" alt="${alt}" loading="lazy">`;
  });

  // Figuras: simplificar y asegurar figcaption
  c = c.replace(/<figure\b[^>]*>/gi, '<figure>');
  c = c.replace(/<\/figure>/gi, '</figure>');

  // Enlaces: mapear internos y marcar externos
  c = c.replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (m, href, inner) => {
    const target = mapLink(href);
    const external = /^https?:/i.test(target);
    const attrs = external ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${target.replace(/&/g, '&amp;')}"${attrs}>${stripTags(inner)}</a>`;
  });

  // Limpiar etiquetas permitidas y descartar el resto (div, section, spans…)
  const allowed = /^<\/?(p|h2|h3|h4|ul|ol|li|blockquote|figure|figcaption|strong|em|a|br|hr|img)\b/i;
  const keepAttrs = /^<(a|img)\b/i;
  c = c.split(/(<[^>]+>)/).map(part => {
    if (!part.startsWith('<')) return entities(part);
    if (!allowed.test(part)) return '';
    if (keepAttrs.test(part)) return part; // ya sanitizados arriba
    return part.replace(/\s+[^>]*?(?=>)/, '').replace(/\s*\/?>/, '>');
  }).join('');

  c = c
    .replace(/<p[^>]*>\s*<\/p>/g, '')
    .replace(/<(strong|em|h2|h3|h4|a)>\s*<\/\1>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // IDs para el índice
  let n = 0;
  c = c.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, level, text) => {
    n++;
    return `<h${level} id="sec-${n}">${text}</h${level}>`;
  });

  return c;
}

(async () => {
  const articles = [];
  const images = [];

  posts.forEach((p, idx) => {
    const raw = p.content.rendered;
    const h1 = (raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1];
    const title = stripTags(h1 || p.title.rendered);
    const excerptRaw = stripTags(p.excerpt.rendered).replace(new RegExp('^' + title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '').trim();
    const excerpt = excerptRaw.slice(0, 180).replace(/\s+\S*$/, '') + '…';
    const names = p.categories.map(id => catById[id]).filter(Boolean);
    const fm = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0];
    if (fm && fm.source_url) {
      images.push({ url: fm.source_url, file: `${p.slug}-portada.${extensionOf(fm.source_url)}`, alt: title, featured: true });
    }
    articles.push({
      id: p.id,
      slug: p.slug,
      file: `blog-${p.slug}.html`,
      title,
      wpTitle: stripTags(p.title.rendered),
      excerpt: (/^[a-záéíóúñü]/.test(stripTags(excerptRaw.slice(0, 180))) ? `${title}: ` : '') + stripTags(excerptRaw.slice(0, 180)) + (excerptRaw.length > 180 ? '…' : ''),
      date: formatDate(p.date),
      iso: p.date,
      filter: filterOf(names),
      label: labelOf(names),
      categories: names,
      image: fm ? `assets/img/blog/${p.slug}-portada.${extensionOf(fm.source_url)}` : 'assets/img/workshop-1.jpg',
      link: p.link,
      content: convertContent(raw, p.slug, images),
      order: idx
    });
  });

  // Unificar imágenes repetidas en distintos artículos bajo un mismo archivo
  const canonicalByUrl = new Map();
  images.forEach((im) => {
    if (!canonicalByUrl.has(im.url)) canonicalByUrl.set(im.url, im.file);
    im.alias = im.file;
    im.file = canonicalByUrl.get(im.url);
  });

  // Descargar imágenes (únicas)
  const unique = new Map();
  images.forEach(im => { if (!unique.has(im.url)) unique.set(im.url, im); });
  let downloaded = 0;
  for (const im of unique.values()) {
    try {
      const local = await download(im.url, path.join(IMG_DIR, im.file));
      articles.forEach(a => {
        a.content = a.content.split(`assets/img/blog/${im.file}`).join(local);
        if (im.alias && im.alias !== im.file) {
          a.content = a.content.split(`assets/img/blog/${im.alias}`).join(local);
        }
        if (a.image.endsWith(im.file) || (im.alias && a.image.endsWith(im.alias))) a.image = local;
      });
      downloaded++;
    } catch (e) {
      console.error('ERROR:', e.message);
      // Si falla la portada, usar una imagen local existente
      articles.forEach(a => {
        if (a.image.endsWith(im.file)) a.image = 'assets/img/workshop-1.jpg';
        a.content = a.content.split(`assets/img/blog/${im.file}`).join('assets/img/workshop-1.jpg');
      });
    }
  }

  // Las imágenes repetidas en varios artículos pueden tener distintos nombres
  // de archivo; unificar todas las referencias al archivo canónico.
  images.forEach((im) => {
    if (im.alias && im.alias !== im.file) {
      articles.forEach((a) => {
        a.content = a.content.split(`assets/img/blog/${im.alias}`).join(`assets/img/blog/${im.file}`);
        if (a.image.endsWith(im.alias)) a.image = `assets/img/blog/${im.file}`;
      });
    }
  });

  // Corregir rutas de portada calculadas antes de la descarga
  articles.forEach(a => {
    const fm = posts.find(p => p.slug === a.slug)._embedded?.['wp:featuredmedia']?.[0];
    if (fm && !fs.existsSync(path.join(ROOT, a.image))) {
      a.image = 'assets/img/workshop-1.jpg';
    }
  });

  const out = `'use strict';\n/* Blog importado de https://vaeldegines.com/blog/ — ${articles.length} artículos */\nmodule.exports = ${JSON.stringify(articles, null, 2)};\n`;
  fs.writeFileSync(path.join(DATA_DIR, 'blog.js'), out, 'utf8');

  console.log(`Artículos: ${articles.length}`);
  console.log(`Imágenes descargadas: ${downloaded} / ${unique.size}`);
  console.log('\nFiltros:', Object.entries(articles.reduce((a, x) => { a[x.filter] = (a[x.filter]||0)+1; return a; }, {})));
})();
