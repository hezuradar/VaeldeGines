'use strict';
const { icons, postCard, ctaBand } = require('../layout');
const articles = require('../data/blog');

const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));

function readTime(content) {
  const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 190));
}

function tocOf(content) {
  return [...content.matchAll(/<h([23]) id="(sec-\d+)">([\s\S]*?)<\/h\1>/g)]
    .map((m) => ({ level: m[1], id: m[2], text: m[3].replace(/<[^>]+>/g, '').trim() }));
}

module.exports = function articlePage(a) {
  const toc = tocOf(a.content);
  const pos = articles.findIndex((x) => x.slug === a.slug);
  const prev = articles[pos - 1];
  const next = articles[pos + 1];
  const related = [
    ...articles.filter((x) => x.slug !== a.slug && x.filter === a.filter),
    ...articles.filter((x) => x.slug !== a.slug && x.filter !== a.filter)
  ].slice(0, 3);

  const breadcrumbs = `
  <nav class="breadcrumbs breadcrumbs--light" aria-label="Ruta de navegación">
    <a href="index.html">Inicio</a><span>/</span>
    <a href="blog.html">Blog</a><span>/</span>
    <span aria-current="page">${a.title}</span>
  </nav>`;

  const tocHtml = toc.length ? `
      <div class="sidebar-card">
        <h3>En este artículo</h3>
        <nav class="toc" aria-label="Índice del artículo">
          ${toc.map((t) => `<a href="#${t.id}"${t.level === '3' ? ' style="padding-left:12px"' : ''}>${t.text}</a>`).join('\n')}
        </nav>
      </div>` : '';

  return `
<section class="article-hero" style="background-image: url('${a.image}')">
  <div class="article-hero__shade" aria-hidden="true"></div>
  <div class="container article-hero__inner">
    ${breadcrumbs}
    <div class="article-hero__body">
      <p class="eyebrow">${a.label}</p>
      <h1 class="article-hero__title">${a.title}</h1>
      <div class="article__meta article__meta--light">
        <span>Por Ginés Martínez</span><span class="dot"></span>
        <span>${a.date}</span><span class="dot"></span>
        <span>${readTime(a.content)} min de lectura</span>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container article-layout">
    <article>
      <div class="prose reveal">
        ${a.content}
      </div>

      <div class="article__footer">
        <div class="chip-row">
          <span class="chip">${a.label}</span>
          ${a.categories.filter((c, i, arr) => arr.indexOf(c) === i).slice(0, 3).map((c) => `<span class="chip">${c}</span>`).join('')}
        </div>
        <div class="author-box">
          <img src="assets/img/luthier-portrait.jpg" alt="Ginés Martínez, luthier" loading="lazy">
          <div>
            <strong>Ginés Martínez</strong>
            <p>Luthier artesanal en Los Alcázares (Murcia). Construye guitarras personalizadas e instrumentos de folclore en Vael de Ginés.</p>
          </div>
        </div>
      </div>

      <nav class="article-nav" aria-label="Artículos anterior y siguiente">
        ${prev ? `<a class="article-nav__link article-nav__link--prev" href="${prev.file}"><span>${icons.arrowLeft} Artículo anterior</span><strong>${prev.title}</strong></a>` : '<span></span>'}
        ${next ? `<a class="article-nav__link article-nav__link--next" href="${next.file}"><span>Artículo siguiente ${icons.arrow}</span><strong>${next.title}</strong></a>` : '<span></span>'}
      </nav>
    </article>

    <aside class="article-sidebar">
      ${tocHtml}
      <div class="sidebar-card sidebar-cta">
        <h3>¿Hablamos del instrumento?</h3>
        <p>Si este artículo te ha dado ideas, cuéntame qué tienes en mente. Estudiaremos el proyecto contigo.</p>
        <a class="btn btn--light btn--sm" href="contacto.html">Hablar con el luthier ${icons.arrow}</a>
      </div>
      <div class="sidebar-card">
        <h3>Artículo original</h3>
        <p style="font-size:12.5px;color:var(--muted);line-height:1.6">Publicado en el blog de Vael de Ginés. <a href="${a.link}" target="_blank" rel="noopener" style="color:var(--walnut);border-bottom:1px solid var(--brass)">Ver fuente original</a>.</p>
      </div>
    </aside>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Sigue leyendo</p>
        <h2 class="h2">Más del <em>cuaderno.</em></h2>
      </div>
      <a class="link-arrow" href="blog.html">Ver todos los artículos ${icons.arrow}</a>
    </div>
    <div class="post-grid">
      ${related.map((r) => postCard({ category: r.label, title: r.title, excerpt: r.excerpt, img: r.image, alt: r.title, href: r.file, date: r.date, read: readTime(r.content) + ' min' })).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: '¿Tienes una duda <em>sobre tu instrumento?</em>',
  text: 'Si estás eligiendo una guitarra, una madera o necesitas orientación sobre el cuidado de tu instrumento, escríbeme. Te responderé personalmente.',
  primary: `<a class="btn btn--light" href="contacto.html">Preguntar al luthier ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="guitarras.html">Ver guitarras</a>`,
  image: 'assets/img/craft-hands.jpg'
})}
`;
};
