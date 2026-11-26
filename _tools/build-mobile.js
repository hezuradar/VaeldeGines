'use strict';
/* Genera la versión móvil en m/. Cada página mantiene sus enlaces internos
   dentro de m/ y carga los mismos assets con rutas relativas ajustadas.      */

const fs = require('fs');
const path = require('path');

const ROOT = 'D:/hezuradar/Vael/web-nueva';
const OUT = path.join(ROOT, 'm');
fs.mkdirSync(OUT, { recursive: true });
fs.cpSync(path.join(ROOT, 'assets'), path.join(OUT, 'assets'), { recursive: true });

function extractMedia(css, query) {
  const marker = `@media ${query} {`;
  const i = css.indexOf(marker);
  if (i < 0) return '';
  const start = css.indexOf('{', i);
  let depth = 0;
  for (let j = start; j < css.length; j++) {
    if (css[j] === '{') depth++;
    else if (css[j] === '}') {
      depth--;
      if (depth === 0) return css.slice(start + 1, j);
    }
  }
  return '';
}

const css = fs.readFileSync(path.join(ROOT, 'assets', 'css', 'styles.css'), 'utf8');
const shell = `
/* Versión móvil dedicada: se aplica siempre, independientemente del ancho */
html { background: #2b241d; }
body { max-width: 520px; margin: 0 auto; background: var(--paper); }
.site-header, .nav, .scroll-progress {
  left: max(0px, calc(50% - 260px));
  right: auto;
  width: min(100%, 520px);
}
.view-switch-btn--fixed { left: auto; bottom: calc(72px + env(safe-area-inset-bottom, 0px)); }
body { padding-bottom: calc(58px + env(safe-area-inset-bottom, 0px)); }
.site-footer { padding-bottom: 4rem; }

.mobile-tabbar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: fixed;
  left: max(0px, calc(50% - 260px));
  right: auto;
  width: min(100%, 520px);
  bottom: 0;
  z-index: 1100;
  background: rgba(36,26,19,.97);
  backdrop-filter: blur(14px);
  border-top: 1px solid rgba(248,244,236,.16);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.mobile-tabbar a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .2rem;
  min-height: 58px;
  padding: .35rem .15rem;
  font-size: .55rem;
  font-weight: 700;
  letter-spacing: .07em;
  text-transform: uppercase;
  color: rgba(248,244,236,.6);
  transition: color .3s;
}
.mobile-tabbar a:hover,
.mobile-tabbar a.is-current { color: var(--brass-light); }
.mobile-tabbar .tab-icon { font-family: var(--serif); font-size: 1.35rem; line-height: 1; font-weight: 500; }
`;

const productCards = `
/* Tarjetas de producto: imagen e información claramente asociadas */
.product-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
.product-card {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 14px;
  padding: 12px;
  background: var(--cream);
  border: 1px solid var(--line);
  align-items: start;
}
.product-card__media { aspect-ratio: 1 / 1; }
.product-card__media img { object-fit: cover; }
.product-card__body { padding-top: 0; min-width: 0; }
.product-card__cat { display: block; font-size: 8px; letter-spacing: .16em; text-transform: uppercase; color: var(--brass); }
.product-card h3 { margin-top: 5px; font-size: 1.18rem; line-height: 1.15; }
.product-card p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 6px;
  font-size: 11.5px;
  line-height: 1.5;
}
.product-card__price { margin-top: 9px; gap: 8px; }
.product-card__price strong { font-size: 15px; }
.product-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 11px;
  padding-bottom: 3px;
  border-bottom: 1px solid var(--brass);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--walnut);
}
.product-card__cta svg { width: 12px; height: 12px; }
`;

const mobileCss = shell +
  extractMedia(css, '(max-width: 1024px)') +
  extractMedia(css, '(max-width: 780px)') +
  extractMedia(css, '(max-width: 520px)') +
  productCards;

fs.writeFileSync(path.join(OUT, 'mobile.css'), mobileCss, 'utf8');

const files = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

const tabItems = [
  ['index.html', 'index.html', '⌂', 'Inicio'],
  ['guitarras.html', 'guitarras.html', '♪', 'Guitarras'],
  ['tienda.html', 'tienda.html', '▦', 'Tienda'],
  ['blog.html', 'blog.html', '✎', 'Blog'],
  ['contacto.html', 'contacto.html', '✉', 'Contacto']
];

function tabbarFor(file) {
  const current = file === 'index.html' ? 'index.html'
    : /^blog-|^articulo/.test(file) || file === 'blog.html' ? 'blog.html'
    : /^producto-|^producto\.html/.test(file) ? (file === 'producto-mentoria.html' ? '' : 'tienda.html')
    : file;
  return `
<nav class="mobile-tabbar" aria-label="Navegación rápida móvil">
  ${tabItems.map(([target, key, icon, label]) => `<a href="${target}"${key === current ? ' class="is-current" aria-current="page"' : ''}><span class="tab-icon" aria-hidden="true">${icon}</span>${label}</a>`).join('')}
</nav>`;
}

files.forEach((file) => {
  let html = fs.readFileSync(path.join(ROOT, file), 'utf8');

  // Quitar el redirect automático (solo debe estar en la versión escritorio)
  html = html.replace(/<!-- AUTO-REDIRECT-MOBILE -->[\s\S]*?<!-- \/AUTO-REDIRECT-MOBILE -->/, '');

  // La versión móvil es autocontenida: mantiene las mismas rutas relativas
  // y dispone de su propia copia de assets dentro de m/.

  // Añadir la hoja móvil y el control de cambio de versión
  html = html.replace(
    '<link rel="stylesheet" href="assets/css/styles.css">',
    '<link rel="stylesheet" href="assets/css/styles.css">\n  <link rel="stylesheet" href="mobile.css">'
  );
  html = html.replace(
    '</body>',
    `  <a class="view-switch-btn view-switch-btn--fixed" href="../${file}" data-view="desktop">Versión escritorio</a>\n${tabbarFor(file)}\n</body>`
  );

  fs.writeFileSync(path.join(OUT, file), html, 'utf8');
});

console.log(`Versión móvil generada: ${files.length} páginas en ${OUT}`);
