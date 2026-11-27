'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/** Huella corta del contenido de un recurso para invalidar la caché del navegador. */
const assetVersion = (rel) => crypto.createHash('sha1')
  .update(fs.readFileSync(path.join(__dirname, '..', rel))).digest('hex').slice(0, 8);
const CSS_VERSION = assetVersion('assets/css/styles.css');
const JS_VERSION = assetVersion('assets/js/main.js');

const SITE = {
  name: 'Vael de Ginés',
  tagline: 'Luthería artesanal · Murcia',
  phone: '+34 609 302 713',
  phoneHref: 'tel:+34609302713',
  email: 'luthier@vaeldegines.com',
  emailHref: 'mailto:luthier@vaeldegines.com',
  address: 'Los Alcázares, Murcia',
  facebook: 'https://www.facebook.com/Vaelluthier',
  youtube: 'https://www.youtube.com/watch?v=W8ileM09_CI',
  instagram: 'https://www.instagram.com/vaeldegines/',
  url: 'https://vaeldegines.com',
  whatsapp: '34609302713',
  homofaber: 'https://www.homofaber.com/en/artisans/gines-martinez-102ray',
  defaultImage: 'assets/img/hero-guitar.jpg'
};

const icons = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12H4M10 6l-6 6 6 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.2-4.2"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14.5 8.5h2.5V5h-2.6C11.8 5 10.5 6.6 10.5 9v2H8v3.5h2.5V21H14v-6.5h2.7l.4-3.5H14V9.2c0-.5.2-.7.5-.7z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3.5 6l8.5 6.5L20.5 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17.5 17.5 0 014.5 5.7 2 2 0 016.5 3.5z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>',
  diamond: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M12 3l9 9-9 9-9-9z"/><path d="M12 7.5l4.5 4.5-4.5 4.5L7.5 12z" opacity=".45"/></svg>',
  instrument: '<svg viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M20 2v15M16 17h8"/><path d="M14 21c-6 2-9 8-9 14 0 7 5 12 11 12h8c6 0 11-5 11-12 0-6-3-12-9-14"/><circle cx="20" cy="35" r="4.5"/><path d="M16 50h8M17 5v43M20 5v43M23 5v43" opacity=".45"/></svg>',
  lute: '<svg viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M20 2v17M16 19h8"/><path d="M20 22c-8 1-12 8-12 16 0 8 5 14 12 14s12-6 12-14c0-8-4-15-12-16z"/><circle cx="20" cy="37" r="4"/><path d="M16 49h8M17 6v42M20 6v42M23 6v42" opacity=".45"/></svg>',
  bandurria: '<svg viewBox="0 0 40 60" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M20 2v20M16 22h8"/><path d="M20 25c-7 0-11 6-11 13 0 7 5 12 11 12s11-5 11-12c0-7-4-13-11-13z"/><circle cx="20" cy="38" r="3.5"/><path d="M16 49h8M17 6v42M20 6v42M23 6v42" opacity=".45"/></svg>'
};

const navItems = [
  ['index.html', 'Inicio', ''],
  ['guitarras.html', 'Guitarras', 'guitarras'],
  ['instrumentos.html', 'Instrumentos', 'instrumentos'],
  ['luthier.html', 'El taller', 'taller'],
  ['mentoria.html', 'Mentoría', 'mentoria'],
  ['podcast.html', 'Podcast', 'podcast'],
  ['blog.html', 'Blog', 'blog'],
  ['tienda.html', 'Tienda', 'tienda'],
  ['contacto.html', 'Contacto', 'contacto']
];

function header(active = '') {
  const links = navItems.map(([href, label, key]) =>
    `<a href="${href}"${key === active ? ' class="is-current" aria-current="page"' : ''}>${label}</a>`
  ).join('');

  return `
  <a class="skip-link" href="#contenido">Saltar al contenido</a>

  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>

  <header class="site-header">
    <div class="container header__inner">
      <a class="brand" href="index.html" aria-label="Vael de Ginés, inicio">
        <img class="brand__logo" src="assets/img/logo.png" alt="Vael de Ginés" width="120" height="60">
        <span class="brand__meta">Los Alcázares · Murcia</span>
      </a>

      <nav class="nav-desktop" aria-label="Navegación principal">${links}</nav>

      <div class="header__actions">
        <a class="icon-btn" href="tienda.html" aria-label="Ver el catálogo">${icons.search}</a>
        <a class="btn btn--sm btn--outline-light" href="contacto.html">Encargos</a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menú">
          <span></span><span></span>
        </button>
      </div>
    </div>

    <nav class="nav" id="menu-principal" aria-label="Navegación móvil">${links}</nav>
  </header>`;
}

function footer() {
  return `
  <footer class="site-footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="index.html" aria-label="Vael de Ginés, inicio">
            <img src="assets/img/logo.png" alt="Vael de Ginés" width="150" height="75" loading="lazy">
          </a>
          <p>Luthería artesanal en Los Alcázares (Murcia). Guitarras personalizadas e instrumentos de folclore construidos a mano, uno a uno.</p>
          <div class="footer__social">
            <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icons.instagram}</a>
            <a href="${SITE.youtube}" target="_blank" rel="noopener" aria-label="YouTube">${icons.youtube}</a>
            <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${icons.facebook}</a>
            <a href="${SITE.emailHref}" aria-label="Correo electrónico">${icons.mail}</a>
          </div>
        </div>

        <div>
          <p class="footer__title">Instrumentos</p>
          <div class="footer__list">
            <a href="guitarras.html">Guitarras personalizadas</a>
            <a href="guitarras.html#coleccion">Colección de autor</a>
            <a href="instrumentos.html">Instrumentos de folclore</a>
            <a href="instrumentos.html#guitarro">Guitarro murciano</a>
            <a href="tienda.html">Catálogo y encargos</a>
          </div>
        </div>

        <div>
          <p class="footer__title">El taller</p>
          <div class="footer__list">
            <a href="luthier.html">Sobre el luthier</a>
            <a href="luthier.html#proceso">Proceso artesanal</a>
            <a href="luthier.html#reconocimientos">Reconocimientos</a>
            <a href="mentoria.html">Mentoría</a>
            <a href="podcast.html">La cabaña del luthier</a>
            <a href="blog.html">Blog</a>
          </div>
        </div>

        <div>
          <p class="footer__title">Contacto</p>
          <div class="footer__contact">
            <a href="${SITE.emailHref}">${icons.mail}<span>${SITE.email}</span></a>
            <a href="${SITE.phoneHref}">${icons.phone}<span>${SITE.phone}</span></a>
            <div>${icons.pin}<span>Los Alcázares, Murcia<br><small class="text-muted">Visitas con cita previa</small></span></div>
          </div>
          <form class="newsletter" novalidate>
            <label class="newsletter__label" for="newsletter-email">Newsletter del taller</label>
            <div class="newsletter__row">
              <input id="newsletter-email" type="email" name="email" placeholder="Tu correo electrónico" required>
              <button type="submit" aria-label="Suscribirme">${icons.arrow}</button>
            </div>
            <small>Novedades, procesos y nuevas piezas. Sin ruido.</small>
          </form>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© <span data-year>2026</span> Vael de Ginés · Luthería artesanal</p>
        <div class="footer__legal">
          <a href="legal.html#aviso">Aviso legal</a>
          <a href="legal.html#privacidad">Privacidad</a>
          <a href="legal.html#cookies">Cookies</a>
          <a href="legal.html#devoluciones">Devoluciones</a>
        </div>
      </div>
    </div>
  </footer>`;
}

const tabItems = [
  ['index.html', 'Inicio', 'home', '<path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h12V9.5"/>'],
  ['guitarras.html', 'Guitarras', 'guitarras', '<path d="M15 3l6 6M18 6l-5.5 5.5"/><path d="M11 10.5c-2-1-4.5-.6-5.6 1.1-.6 1-.5 1.9-1.5 2.5-1.6 1-1.4 3.6.6 5.3 1.7 2 4.3 2.2 5.3.6.6-1 1.5-.9 2.5-1.5 1.7-1.1 2.1-3.6 1.1-5.6"/><circle cx="9.3" cy="14.7" r="1.3"/>'],
  ['tienda.html', 'Tienda', 'tienda', '<rect x="4" y="4" width="6.5" height="6.5"/><rect x="13.5" y="4" width="6.5" height="6.5"/><rect x="4" y="13.5" width="6.5" height="6.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5"/>'],
  ['blog.html', 'Blog', 'blog', '<path d="M5 19.5l1-4L16.5 5a2 2 0 012.8 2.8L8.8 18.3z"/><path d="M14.5 7l2.5 2.5"/>'],
  ['contacto.html', 'Contacto', 'contacto', '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3.5 6l8.5 6.5L20.5 6"/>']
];

function tabbar(active) {
  const current = active === '' ? 'home' : active;
  return `
<nav class="mobile-tabbar" aria-label="Navegación rápida">
  ${tabItems.map(([href, label, key, path]) => `<a href="${href}"${key === current ? ' class="is-current" aria-current="page"' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" aria-hidden="true">${path}</svg>${label}</a>`).join('')}
</nav>`;
}

const escapeAttr = (value) => String(value)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Enlace al formulario de contacto con el interés y el asunto ya rellenados. */
function contactUrl(interes, asunto = '') {
  const params = [['interes', interes], ['asunto', asunto]].filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&amp;');
  return `contacto.html${params ? `?${params}` : ''}`;
}

const absUrl = (file) => `${SITE.url}/${file === 'index.html' ? '' : file}`;

function waLink(text = 'Hola, tengo una consulta sobre un instrumento.') {
  return `https://api.whatsapp.com/send?phone=${SITE.whatsapp}&amp;text=${encodeURIComponent(text)}`;
}

/**
 * Página completa. `file` define la URL canónica; `image` la imagen social;
 * `jsonLd` es un objeto o una lista de objetos schema.org.
 */
function page({ file, title, description, active = '', body, bodyClass = '', image = SITE.defaultImage, type = 'website', jsonLd = [], waText, noindex = false, baseHref = '' }) {
  const url = absUrl(file);
  const imageUrl = `${SITE.url}/${image}`;
  const schemas = (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean);
  const ld = schemas.map((s) => `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...s }).replace(/</g, '\\u003c')}</script>`).join('\n  ');
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  ${baseHref ? `<base href="${baseHref}">` : ''}
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${title}</title>
  <meta name="description" content="${escapeAttr(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
  <meta property="og:type" content="${type}">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:locale" content="es_ES">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${imageUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#241a13">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/img/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css?v=${CSS_VERSION}">
  <noscript><style>.reveal { opacity: 1 !important; transform: none !important; }</style></noscript>
  ${ld}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${header(active)}
<main id="contenido">
${body}
</main>
${footer()}
${tabbar(active)}
<a class="hf-tab" href="${SITE.homofaber}" target="_blank" rel="noopener" aria-label="Recomendado por Homo Faber Guide: ver el perfil de Ginés Martínez (se abre en una pestaña nueva)">
  <span class="hf-tab__label" aria-hidden="true">Recomendado por<strong>Homo Faber Guide</strong></span>
  <img class="hf-tab__seal" src="assets/img/homofaber-sticker.webp" alt="" width="248" height="248" loading="eager">
</a>
<a class="wa-float" href="${waLink(waText)}" target="_blank" rel="noopener" aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.06 8.06 0 0 1-1.24-4.24c0-4.46 3.63-8.09 8.1-8.09 2.16 0 4.2.85 5.73 2.38a8.05 8.05 0 0 1 2.37 5.72c0 4.46-3.63 8.1-8.1 8.1zm4.44-6.06c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.78.95-.14.16-.29.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.29.36-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"/></svg>
</a>
<script src="assets/js/main.js?v=${JS_VERSION}" defer></script>
</body>
</html>
`;
}

/* ---------- Componentes reutilizables ---------- */

function pageHero({ eyebrow, title, text, actions = '', image, alt, caption = '', portrait = false, breadcrumbs = '' }) {
  return `
  ${breadcrumbs ? `<div class="container">${breadcrumbs}</div>` : ''}
  <section class="page-hero">
    <div class="container page-hero__grid">
      <div>
        <p class="eyebrow">${eyebrow}</p>
        <h1 class="page-hero__title">${title}</h1>
        <p class="page-hero__text">${text}</p>
        ${actions ? `<div class="page-hero__actions">${actions}</div>` : ''}
      </div>
      <div class="page-hero__media${portrait ? ' page-hero__media--portrait' : ''}">
        <img src="${image}" alt="${alt}" width="720" height="540">
        ${caption ? `<span class="page-hero__caption">${caption}</span>` : ''}
      </div>
    </div>
  </section>`;
}

function ctaBand({ title, text, primary, secondary, image = 'assets/img/hero-luthier.jpg' }) {
  return `
  <section class="cta-band">
    <div class="cta-band__bg"><img src="${image}" alt="" loading="lazy"></div>
    <div class="container cta-band__inner">
      <div>
        <p class="eyebrow">Hablemos de tu proyecto</p>
        <h2>${title}</h2>
        <p>${text}</p>
      </div>
      <div class="cta-band__actions">
        ${primary}
        ${secondary || ''}
      </div>
    </div>
  </section>`;
}

function guitarCard({ num, name, tag, desc, img, alt, slug, href }) {
  const target = href || `producto-${slug}.html`;
  return `
  <article class="guitar-card reveal">
    <a class="guitar-card__media" href="${target}" aria-label="Ver ${name}">
      <span class="guitar-card__num">Nº ${num}</span>
      <span class="guitar-card__tag">${tag}</span>
      <img src="${img}" alt="${alt}" loading="lazy">
    </a>
    <div class="guitar-card__body">
      <div class="guitar-card__title"><h3><a href="${target}">${name}</a></h3><span>Guitarra de autor</span></div>
      <p class="guitar-card__desc">${desc}</p>
      <a class="guitar-card__link" href="${target}">Descubrir la pieza ${icons.arrow}</a>
    </div>
  </article>`;
}

/** Minutos de lectura estimados a partir del HTML del artículo. */
function readTime(content = '') {
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 190));
}

function postCard({ category, title, excerpt, img, alt, href, read }) {
  return `
  <article class="post-card reveal">
    <a class="post-card__media" href="${href}" aria-label="Leer ${title}">
      <img src="${img}" alt="${alt}" loading="lazy">
    </a>
    <div class="post-card__meta">${category} <span>·</span> <span>${read} de lectura</span></div>
    <h3><a href="${href}">${title}</a></h3>
    <p>${excerpt}</p>
    <a class="link-arrow post-card__link" href="${href}">Leer artículo ${icons.arrow}</a>
  </article>`;
}

module.exports = { SITE, icons, header, footer, page, pageHero, ctaBand, guitarCard, postCard, readTime, waLink, absUrl, contactUrl };
