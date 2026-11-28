'use strict';
const { contactUrl, waLink, icons, ctaBand } = require('../layout');
const products = require('../data/catalog');

const relatedOf = (p) => [
  ...products.filter((x) => x.slug !== p.slug && x.cat === p.cat),
  ...products.filter((x) => x.slug !== p.slug && x.cat !== p.cat)
].slice(0, 3);

const INTEREST_BY_CAT = { guitarras: 'Guitarra personalizada', folclore: 'Instrumento de folclore', maderas: 'Maderas' };
const interestOf = (p) => (p.slug === 'mentoria' ? 'Mentoría' : INTEREST_BY_CAT[p.cat] || 'Otra consulta');

const fileOf = (p) => `producto-${p.slug}.html`;

const mentoriaOptions = `
      <div class="product__options" aria-label="Modalidades de mentoría">
        <div class="product-option">
          <span class="product-option__tag">Sesión individual</span>
          <h3>Una sesión</h3>
          <div class="product-option__price">45 € <small>IVA incl.</small></div>
          <p>Una hora de consultoría 1:1 por videoconferencia para resolver dudas o revisar un proyecto concreto.</p>
          <ul>
            <li>Duración: 1 hora</li>
            <li>Grabación opcional</li>
            <li>Resumen de conclusiones</li>
          </ul>
          <a class="btn btn--outline btn--block" href="${contactUrl('Mentoría', 'Una sesión de mentoría')}">Solicitar una hora ${icons.arrow}</a>
        </div>
        <div class="product-option product-option--featured">
          <span class="product-option__tag">Acompañamiento</span>
          <h3>Pack 10 sesiones</h3>
          <div class="product-option__price">400 € <small>IVA incl.</small></div>
          <p>Diez sesiones de una hora con apoyo para desarrollar tu plan de negocio y minimizar riesgos.</p>
          <ul>
            <li>10 sesiones de 1 hora</li>
            <li>Plan de negocio con mi apoyo</li>
            <li>Estudio y minimización de riesgos</li>
          </ul>
          <a class="btn btn--light btn--block" href="${contactUrl('Mentoría', 'Pack de 10 sesiones')}">Solicitar el pack ${icons.arrow}</a>
        </div>
      </div>`;

module.exports = function productPage(p) {
  const isMentoria = p.slug === 'mentoria';
  const related = relatedOf(p);
  const thumbs = p.gallery.map((src, i) => `
        <button class="gallery__thumb${i === 0 ? ' is-active' : ''}" type="button" aria-label="Ver imagen ${i + 1}">
          <img src="${src}" alt="${p.name} — imagen ${i + 1}" data-full="${src}" loading="lazy">
        </button>`).join('');

  return `
<div class="container">
  <nav class="breadcrumbs" aria-label="Ruta de navegación">
    <a href="index.html">Inicio</a><span>/</span>
    <a href="tienda.html">Tienda</a><span>/</span>
    <span aria-current="page">${p.name}</span>
  </nav>
</div>

<section class="section section--tight section--after-crumbs">
  <div class="container product">
    <div class="gallery${p.gallery.length === 1 ? ' gallery--single' : ''}" data-gallery>
      <div class="gallery__thumbs">${thumbs}
      </div>
      <div class="gallery__main">
        ${p.novedad ? '<span class="product-badge">Novedad</span>' : ''}
        <span class="guitar-card__tag">${p.label}</span>
        <img src="${p.gallery[0]}" alt="${p.name} de Vael de Ginés" width="690" height="863">
      </div>
    </div>

    <div class="product__info reveal" data-delay="1">
      <span class="product__collection">${p.label}</span>
      <h1 class="product__title">${p.name}</h1>
      <p class="product__subtitle">${p.subtitle}</p>
      ${isMentoria ? mentoriaOptions : `
      <div class="product__price">
        <strong>${p.priceLabel}</strong>
        <span>IVA incluido · Por encargo</span>
      </div>`}
      ${isMentoria ? '' : `
      <p class="product__desc">${p.desc}</p>
      <dl class="product__specs">
        ${p.specs.map(([k, v]) => `<div class="product__spec"><dt>${k}</dt><dd>${v}</dd></div>`).join('\n')}
      </dl>`}
      ${isMentoria ? '' : `
      <div class="product__actions">
        <a class="btn btn--block" href="${contactUrl(interestOf(p), p.name)}">Solicitar ${p.name} ${icons.arrow}</a>
        <a class="btn btn--outline btn--block" href="${waLink(`Hola, me interesa ${p.name} (${p.label}). ¿Podemos hablar?`)}" target="_blank" rel="noopener">Preguntar por WhatsApp</a>
      </div>
      <p class="product__note">${icons.clock}<span>Construcción y disponibilidad por encargo. Te confirmaré plazos y condiciones antes de iniciar el proyecto.</span></p>`}
    </div>
  </div>

  <div class="container">
    <div class="tabs" data-tabs>
      <div class="tabs__nav" role="tablist" aria-label="Información del producto">
        <button class="tabs__btn is-active" type="button" role="tab" aria-selected="true" data-tab="tab-desc">Descripción</button>
        <button class="tabs__btn" type="button" role="tab" aria-selected="false" data-tab="tab-specs">${isMentoria ? 'Qué incluye' : 'Detalles y materiales'}</button>
        <button class="tabs__btn" type="button" role="tab" aria-selected="false" data-tab="tab-proceso">Proceso y plazos</button>
        ${isMentoria ? '' : '<button class="tabs__btn" type="button" role="tab" aria-selected="false" data-tab="tab-envio">Entrega y garantía</button>'}
      </div>

      <div class="tabs__panel is-active" id="tab-desc" role="tabpanel">
        <p>${isMentoria ? 'Las sesiones de mentoría y consultoría tienen una duración de una hora y se realizan por videoconferencia. Puedes contratar una sesión suelta para una consulta concreta o el pack de diez sesiones para un acompañamiento continuado.' : p.desc}</p>
        <p>${isMentoria ? 'Todas las sesiones pueden grabarse y, si lo deseas, te enviaré una copia del vídeo. Con el pack de diez sesiones podrás desarrollar con mi apoyo un plan de negocio y estudiar cómo minimizar los riesgos.' : `${p.subtitle} Cada pieza que sale del taller se trabaja de forma artesanal y se ajusta a las necesidades concretas de quien la va a utilizar.`}</p>
        ${isMentoria ? `
        <h3>Dos formas de trabajar juntos</h3>
        <p>Puedes contratar una sesión suelta cuando necesitas una respuesta concreta, o el pack de diez sesiones cuando quieres un acompañamiento continuado con plan de negocio.</p>` : `
        <h3>Una pieza pensada para ti</h3>
        <p>Puedes consultar las posibilidades de personalización, materiales y acabados. La conversación inicial sirve para ajustar el proyecto a tu forma de tocar y a tus necesidades.</p>`}
      </div>

      <div class="tabs__panel" id="tab-specs" role="tabpanel">
        ${isMentoria ? `
        <div class="incluye-grid">
          <div class="incluye-block">
            <h4>Una sesión · 45 €</h4>
            <ul>
              <li>Una sesión de 1 hora por videoconferencia.</li>
              <li>Consultoría 1:1 sobre luthería, artesanía o negocio.</li>
              <li>Grabación de la sesión, si la solicitas.</li>
              <li>Resumen de conclusiones y siguientes pasos.</li>
            </ul>
          </div>
          <div class="incluye-block">
            <h4>Pack 10 sesiones · 400 €</h4>
            <ul>
              <li>Diez sesiones de 1 hora por videoconferencia.</li>
              <li>Desarrollo de un plan de negocio con mi apoyo.</li>
              <li>Estudio y minimización de riesgos del proyecto.</li>
              <li>Seguimiento y resolución de dudas entre sesiones.</li>
            </ul>
          </div>
        </div>` : `<ul>${p.specs.map(([k, v]) => `<li>${k}: ${v}.</li>`).join('\n')}</ul>`}
      </div>

      <div class="tabs__panel" id="tab-proceso" role="tabpanel">
        ${isMentoria ? `
        <p>El primer paso es escribirme y contarme en qué punto estás, qué quieres conseguir y qué dudas tienes. Con esa información concretamos la modalidad, la agenda y el alcance de la sesión o del pack.</p>
        <p>Las sesiones se realizan por videoconferencia en el horario acordado. El pack de diez sesiones se distribuye a lo largo del acompañamiento según tu ritmo y tus necesidades.</p>
        <h3>Qué conviene preparar</h3>
        <ul>
          <li>Tu nivel y experiencia en luthería o artesanía.</li>
          <li>El proyecto o la duda concreta que quieres trabajar.</li>
          <li>Referencias, maderas o herramientas que estés valorando.</li>
          <li>Si vas a emprender, tu idea de negocio y tus objetivos.</li>
        </ul>` : `
        <p>El proyecto comienza con una conversación para definir las características, los materiales y los acabados. Después se seleccionan las piezas adecuadas y se planifica la construcción en el taller.</p>
        <p>Los plazos dependen del tipo de pieza, de su complejidad y de la planificación del taller. Siempre se confirman antes de iniciar el encargo.</p>
        <h3>Qué necesito saber de ti</h3>
        <ul>
          <li>El uso que vas a darle y tu experiencia.</li>
          <li>Referencias de sonido, materiales o acabados que te gusten.</li>
          <li>Tus preferencias ergonómicas y estéticas.</li>
          <li>El presupuesto y el plazo que tienes en mente.</li>
        </ul>`}
      </div>

      ${isMentoria ? '' : `
      <div class="tabs__panel" id="tab-envio" role="tabpanel">
        <p>La entrega se coordina contigo: puedes recoger la pieza en el taller de Los Alcázares (Murcia) o recibirla mediante envío asegurado a tu domicilio.</p>
        <p>Todas las piezas salen del taller con una revisión final. Las condiciones de garantía y mantenimiento se explican por escrito antes de la entrega.</p>
      </div>`}
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Del catálogo</p>
        <h2 class="h2">Otras piezas del <em>taller.</em></h2>
      </div>
      <a class="link-arrow" href="tienda.html">Ver todo el catálogo ${icons.arrow}</a>
    </div>
    <div class="product-grid">
      ${related.map((r) => `
      <article class="product-card">
        <a class="product-card__media" href="${fileOf(r)}" aria-label="Ver ${r.name}">
          <img src="${r.image}" alt="${r.name}" loading="lazy">
        </a>
        <div class="product-card__body">
          <span class="product-card__cat">${r.label}</span>
          <h3><a href="${fileOf(r)}">${r.name}</a></h3>
          <p>${r.desc}</p>
          <div class="product-card__price"><strong>${r.priceLabel}</strong><span>${r.cat === 'formacion' || r.cat === 'maderas' ? 'Disponible' : 'Por encargo'}</span></div>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: `¿Es ${p.name} <em>lo que buscas?</em>`,
  text: 'Si esta pieza encaja con lo que tienes en mente, escríbeme y concretamos los detalles. Si tienes otra idea, también podemos diseñarla desde cero.',
  primary: `<a class="btn btn--light" href="${contactUrl(interestOf(p), p.name)}">Solicitar información ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="tienda.html">Seguir explorando</a>`,
  image: p.image
})}
`;
};
