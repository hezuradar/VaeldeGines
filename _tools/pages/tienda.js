'use strict';
const { icons, ctaBand } = require('../layout');
const products = require('../data/catalog');
const { enLetras, capitalizar } = products;
const fileOf = (p) => `producto-${p.slug}.html`;
const countCat = (cat) => products.filter((p) => p.cat === cat).length;
const countDisp = (d) => products.filter((p) => p.disponibilidad === d).length;

module.exports = `
<section class="page-header-simple">
  <div class="container">
    <p class="eyebrow eyebrow--center">Catálogo del taller</p>
    <h1 class="h2">Instrumentos, maderas<br><em>y conocimiento.</em></h1>
    <p>Todo lo que sale del taller se construye, selecciona o comparte con el mismo criterio: hacer las cosas bien y explicarlas con claridad. Los instrumentos se realizan por encargo.</p>
  </div>
</section>

<section class="section" id="catalogo" data-shop>
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Catálogo</p>
        <h2 class="h2">Piezas disponibles<br><em>y por encargo.</em></h2>
        <p class="text-muted measure">Los precios son orientativos y pueden variar según maderas, acabados y configuración. Cada proyecto se presupuesta de forma individual antes de iniciar el trabajo.</p>
      </div>
    </div>

    <div class="shop-layout">
      <aside class="filters" aria-label="Filtrar catálogo">
        <div class="filter-group">
          <h3>Categorías</h3>
          <div class="filter-list">
            <button class="filter-btn is-active" type="button" data-filter="all">Todas las piezas <span>${products.length}</span></button>
            <button class="filter-btn" type="button" data-filter="guitarras">Guitarras <span>${countCat('guitarras')}</span></button>
            <button class="filter-btn" type="button" data-filter="folclore">Folclore <span>${countCat('folclore')}</span></button>
            <button class="filter-btn" type="button" data-filter="maderas">Maderas <span>${countCat('maderas')}</span></button>
            <button class="filter-btn" type="button" data-filter="formacion">Formación <span>${countCat('formacion')}</span></button>
          </div>
        </div>
        <div class="filter-group">
          <h3>Disponibilidad</h3>
          <div class="filter-list">
            <span class="filter-btn" style="cursor:default">Por encargo <span>${countDisp('encargo')}</span></span>
            <span class="filter-btn" style="cursor:default">Entrega inmediata <span>${countDisp('inmediata')}</span></span>
          </div>
        </div>
        <div class="filter-group">
          <h3>¿Necesitas ayuda?</h3>
          <p class="text-muted" style="font-size:12.5px;line-height:1.6">Si no encuentras lo que buscas, cuéntamelo. Puedo construir una pieza a medida o orientarte sobre el instrumento adecuado.</p>
          <p style="margin-top:14px"><a class="link-arrow" href="contacto.html">Hablar con el luthier ${icons.arrow}</a></p>
        </div>
      </aside>

      <div>
        <div class="shop-toolbar">
          <p><strong data-count>${products.length}</strong> piezas · Precios orientativos</p>
          <label class="sr-only" for="sort">Ordenar por</label>
          <select class="select" id="sort" data-sort>
            <option value="name">Nombre A–Z</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
        <div class="product-grid">
          ${products.map((p) => `
          <article class="product-card" data-category="${p.cat}" data-price="${p.price}" data-name="${p.name}">
            <a class="product-card__media" href="${fileOf(p)}" aria-label="Ver ${p.name}">
              ${p.novedad ? '<span class="product-badge product-badge--sm">Novedad</span>' : ''}
              <img src="${p.image}" alt="${p.name}" loading="lazy">
            </a>
            <div class="product-card__body">
              <span class="product-card__cat">${p.label}</span>
              <h3><a href="${fileOf(p)}">${p.name}</a></h3>
              <p>${p.desc}</p>
              <div class="product-card__price"><strong>${p.priceLabel}</strong><span>${p.disponibilidad === 'inmediata' ? 'Disponible' : 'Por encargo'}</span></div>
              <a class="product-card__cta" href="${fileOf(p)}">Ver ficha ${icons.arrow}</a>
            </div>
          </article>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Cómo funciona</p>
        <h2 class="h2">Del interés al <em>instrumento.</em></h2>
      </div>
    </div>
    <div class="feature-list feature-list--3">
      <div class="feature reveal">
        <span class="feature__num">01</span>
        <h3>Escríbeme</h3>
        <p>Cuéntame qué pieza te interesa, para qué la vas a usar y cualquier preferencia que tengas en mente.</p>
      </div>
      <div class="feature reveal" data-delay="1">
        <span class="feature__num">02</span>
        <h3>Concretamos</h3>
        <p>Revisamos características, maderas, acabados, presupuesto y plazo. Te explico todo antes de decidir.</p>
      </div>
      <div class="feature reveal" data-delay="2">
        <span class="feature__num">03</span>
        <h3>Se construye</h3>
        <p>El proyecto entra en la planificación del taller. Te mantengo informado del avance hasta la entrega.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="category-grid">
      <a class="category-card reveal" href="guitarras.html#coleccion">
        <div><span class="category-card__num">01 — ${countCat('guitarras')} ${countCat('guitarras') === 1 ? 'pieza' : 'piezas'}</span><h3>Guitarras de autor</h3><p>${countCat('guitarras') === 1 ? 'Un instrumento único, construido a mano.' : `${capitalizar(enLetras(countCat('guitarras')))} instrumentos únicos, construidos a mano.`}</p></div>
        <div class="category-card__foot">Explorar ${icons.arrow}</div>
      </a>
      <a class="category-card reveal" data-delay="1" href="instrumentos.html#catalogo">
        <div><span class="category-card__num">02 — 7 modelos</span><h3>Instrumentos de folclore</h3><p>Guitarros, laúdes, bandurrias y guitarra mayor.</p></div>
        <div class="category-card__foot">Explorar ${icons.arrow}</div>
      </a>
      <a class="category-card reveal" data-delay="2" href="#catalogo">
        <div><span class="category-card__num">03 — Reserva</span><h3>Maderas</h3><p>Piezas seleccionadas y estacionadas en el taller.</p></div>
        <div class="category-card__foot">Ver disponibles ${icons.arrow}</div>
      </a>
      <a class="category-card reveal" href="luthier.html#proceso">
        <div><span class="category-card__num">04 — Servicios</span><h3>Herramientas y taller</h3><p>Ajustes, mantenimiento y trabajos de luthería.</p></div>
        <div class="category-card__foot">Consultar ${icons.arrow}</div>
      </a>
      <a class="category-card reveal" data-delay="1" href="blog.html">
        <div><span class="category-card__num">05 — Formación</span><h3>Libros y artículos</h3><p>Lecturas y recursos para luthiers y aficionados.</p></div>
        <div class="category-card__foot">Leer ${icons.arrow}</div>
      </a>
      <a class="category-card reveal" data-delay="2" href="mentoria.html">
        <div><span class="category-card__num">06 — 1:1</span><h3>Mentoría</h3><p>Sesiones de consultoría sobre luthería y oficio.</p></div>
        <div class="category-card__foot">Reservar ${icons.arrow}</div>
      </a>
    </div>
  </div>
</section>


${ctaBand({
  title: '¿No encuentras <em>tu pieza?</em>',
  text: 'El catálogo es una selección, no un límite. Si buscas una madera concreta, una variante de instrumento o un proyecto especial, hablemos y estudiamos las posibilidades.',
  primary: `<a class="btn btn--light" href="contacto.html">Hacer una consulta ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="guitarras.html">Ver guitarras</a>`
})}
`;
