'use strict';

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
  instagram: 'https://www.instagram.com/vaeldegines/'
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
          <button class="view-switch-btn" type="button" data-view="mobile">Ver versión móvil</button>
        </div>
      </div>
    </div>
  </footer>`;
}

function page({ title, description, active = '', body, bodyClass = '' }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <!-- AUTO-REDIRECT-MOBILE -->
  <script>
  (function () {
    try {
      if (localStorage.getItem('vdg-view') === 'desktop') return;
      var ua = navigator.userAgent || '';
      var mobile = (navigator.userAgentData && navigator.userAgentData.mobile === true) ||
        /Android|iPhone|iPod|Windows Phone|Mobile|Silk|BlackBerry|Opera Mini/i.test(ua) ||
        (/iPad|Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
      if (!mobile) return;
      var page = location.pathname.split('/').pop() || 'index.html';
      if (!/\.html$/.test(page)) page = 'index.html';
      location.replace('m/' + page);
    } catch (e) {}
  })();
  </script>
  <!-- /AUTO-REDIRECT-MOBILE -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="theme-color" content="#f8f4ec">
  <link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
  <noscript><style>.reveal { opacity: 1 !important; transform: none !important; }</style></noscript>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${header(active)}
<main id="contenido">
${body}
</main>
${footer()}
<script src="assets/js/main.js" defer></script>
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

function guitarCard({ num, name, tag, desc, img, alt, href }) {
  const slugs = {
    'Paloma': 'paloma', 'Golden Whale': 'golden-whale', 'Freya': 'freya',
    'Camino': 'camino', 'Jaguar': 'jaguar', 'Venus': 'venus'
  };
  const target = href || `producto-${slugs[name] || 'paloma'}.html`;
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

function postCard({ category, title, excerpt, img, alt, href = 'articulo.html', date = '12 nov 2026', read = '6 min' }) {
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

module.exports = { SITE, icons, header, footer, page, pageHero, ctaBand, guitarCard, postCard };
