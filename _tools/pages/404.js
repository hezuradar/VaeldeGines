'use strict';
const { icons } = require('../layout');

const shortcuts = [
  ['guitarras.html', 'Guitarras personalizadas', 'Colección de autor y encargos a medida'],
  ['instrumentos.html', 'Instrumentos de folclore', 'Guitarros, laúdes y bandurrias'],
  ['tienda.html', 'Catálogo del taller', 'Instrumentos, maderas y formación'],
  ['blog.html', 'Cuaderno del taller', 'Artículos sobre maderas y oficio']
];

module.exports = `
<section class="error-page">
  <div class="container error-page__grid">
    <figure class="error-page__art">
      <picture>
        <source srcset="assets/img/404/personaje-404-animado.webp" type="image/webp">
        <img src="assets/img/404/personaje-404-animado.gif" width="512" height="512"
             alt="Caricatura de Ginés, el luthier, rompiendo una guitarra a mazazos" fetchpriority="high">
      </picture>
    </figure>

    <div class="error-page__body">
      <p class="eyebrow">Error 404 · Página no encontrada</p>
      <h1 class="h2">Esta pieza no ha<br><em>salido del taller.</em></h1>
      <p>La página que buscas no existe o ha cambiado de sitio con la nueva web. No te preocupes: ninguna guitarra ha sufrido daños de verdad.</p>
      <div class="error-page__actions">
        <a class="btn" href="index.html">Volver al inicio ${icons.arrow}</a>
        <a class="btn btn--outline" href="contacto.html">Escribir al luthier</a>
      </div>

      <nav class="error-page__links" aria-label="Secciones principales">
        ${shortcuts.map(([href, title, text]) => `
        <a href="${href}"><strong>${title}</strong><span>${text}</span>${icons.arrow}</a>`).join('')}
      </nav>
    </div>
  </div>
</section>`;
