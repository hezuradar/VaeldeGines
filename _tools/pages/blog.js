'use strict';
const { icons, postCard, ctaBand, readTime } = require('../layout');
const articles = require('../data/blog');

const featured = articles[0];
const counts = articles.reduce((acc, a) => { acc[a.filter] = (acc[a.filter] || 0) + 1; return acc; }, {});
const filters = [
  ['all', 'Todos', articles.length],
  ['maderas', 'Maderas', counts.maderas || 0],
  ['guitarras', 'Guitarras', counts.guitarras || 0],
  ['lutheria', 'Luthería', counts.lutheria || 0],
  ['instrumentos', 'Instrumentos', counts.instrumentos || 0],
  ['formacion', 'Formación', counts.formacion || 0]
].filter((f) => f[2] > 0);

module.exports = `
<section class="page-header-simple">
  <div class="container">
    <p class="eyebrow eyebrow--center">Cuaderno del taller</p>
    <h1 class="h2">Historias, maderas<br><em>y oficio.</em></h1>
    <p>Explora el mundo de la luthería, la construcción de guitarras de autor y todo lo relacionado con el arte de crear instrumentos únicos. ${articles.length} artículos del taller.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <a class="featured-post reveal" href="${featured.file}">
      <div class="featured-post__media">
        <img src="${featured.image}" alt="${featured.title}" loading="lazy">
      </div>
      <div class="featured-post__body">
        <p class="eyebrow">Artículo destacado</p>
        <h2>${featured.title}</h2>
        <p>${featured.excerpt}</p>
        <div class="article__meta" style="margin-top:22px">
          <span>${featured.label}</span><span class="dot"></span><span>${featured.date}</span>
        </div>
        <p style="margin-top:24px"><span class="link-arrow">Leer el artículo ${icons.arrow}</span></p>
      </div>
    </a>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Todos los artículos</p>
        <h2 class="h2">Aprende sobre <em>el oficio.</em></h2>
      </div>
      <div class="chip-row" data-blog-filters>
        ${filters.map((f, i) => `<button class="chip${i === 0 ? ' is-active' : ''}" type="button" data-blog-filter="${f[0]}">${f[1]} <span class="text-muted">(${f[2]})</span></button>`).join('\n')}
      </div>
    </div>
    <div class="post-grid">
      ${articles.map((a) => `
      <div data-post="${a.filter}">
        ${postCard({ category: a.label, title: a.title, excerpt: a.excerpt, img: a.image, alt: a.title, href: a.file, read: readTime(a.content) + ' min' })}
      </div>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: '¿Tienes una duda <em>sobre tu instrumento?</em>',
  text: 'Si estás eligiendo una guitarra, una madera o necesitas orientación sobre el cuidado de tu instrumento, escríbeme. Te responderé personalmente.',
  primary: `<a class="btn btn--light" href="contacto.html">Preguntar al luthier ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="podcast.html">Escuchar el podcast</a>`,
  image: 'assets/img/craft-hands.jpg'
})}
`;
