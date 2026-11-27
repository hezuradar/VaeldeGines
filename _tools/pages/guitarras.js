'use strict';
const { contactUrl, icons, pageHero, guitarCard, ctaBand } = require('../layout');
const { guitarrasDeAutor, enLetras, capitalizar } = require('../data/catalog');
const nGuitarras = guitarrasDeAutor.length;
const tarjetasColeccion = (descOf) => guitarrasDeAutor.map((p, i) => guitarCard({
  num: String(i + 1).padStart(2, '0'), name: p.name, tag: p.lema, desc: descOf(p),
  img: p.image, alt: `Guitarra ${p.name} de Vael de Ginés`, slug: p.slug
})).join('\n');

module.exports = `
${pageHero({
  eyebrow: 'Guitarras personalizadas',
  title: 'Tu esencia es única,<br><em>tu guitarra también.</em>',
  text: 'Construyo guitarras artesanales concebidas alrededor de tu forma de sentir, interpretar y entender la música. Cada instrumento es una creación única, desarrollada contigo y construida sin renunciar a ningún detalle.',
  actions: `<a class="btn" href="${contactUrl('Guitarra personalizada')}">Diseñemos tu guitarra ${icons.arrow}</a><a class="link-arrow" href="#coleccion">Descubre la colección ${icons.arrow}</a>`,
  image: 'assets/img/guitar-paloma.jpg',
  alt: 'Guitarra Paloma construida a mano por Vael de Ginés',
  caption: 'Paloma · Colección de autor',
  portrait: true
})}

<nav class="subnav" data-subnav aria-label="Secciones de guitarras">
  <div class="container subnav__inner">
    <a href="#filosofia">Filosofía</a>
    <a href="#coleccion">Colección de autor</a>
    <a href="#niveles">Niveles y encargo</a>
    <a href="#proceso">Proceso</a>
    <a href="#contacto">Contacto</a>
  </div>
</nav>

<section class="section" id="filosofia">
  <div class="container split">
    <div class="split__body reveal">
      <p class="eyebrow">Filosofía de creación</p>
      <h2 class="h2">Una guitarra que <em>nace de ti.</em></h2>
      <p class="lead">No existen dos músicos iguales. Tampoco debería haber dos guitarras que cuenten exactamente la misma historia.</p>
      <p class="text-muted">Cada proyecto comienza con una conversación en la que conozco tu forma de tocar, tus preferencias y lo que buscas en un instrumento. A partir de ahí, damos forma a una guitarra que reúne tus necesidades musicales y tu personalidad.</p>
      <p class="text-muted">El resultado no es una guitarra a la que tengas que adaptarte: es un instrumento pensado para ti, para tus manos y para tu manera de hacer música.</p>
      <p style="margin-top:28px"><a class="link-arrow" href="${contactUrl('Guitarra personalizada')}">Cuéntame tu proyecto ${icons.arrow}</a></p>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/craft-hands.jpg" alt="Manos del luthier trabajando la tapa de una guitarra" loading="lazy">
      </div>
      <p class="split__caption">Cada decisión constructiva tiene un propósito</p>
    </div>
  </div>
</section>

<section class="section section--tight section--cream">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Cuatro principios</p>
        <h2 class="h2">El instrumento se piensa,<br><em>se siente y se construye.</em></h2>
      </div>
    </div>
    <div class="feature-list">
      <div class="feature reveal">
        <span class="feature__num">01 / Personalidad</span>
        <h3>Una guitarra con identidad propia</h3>
        <p>Escucho cómo entiendes la música, qué buscas en un instrumento y qué necesitas para sentirte cómodo tocando. Esa información se convierte en decisiones de diseño y construcción.</p>
      </div>
      <div class="feature reveal" data-delay="1">
        <span class="feature__num">02 / Diseño</span>
        <h3>Cada detalle tiene un propósito</h3>
        <p>Proporciones, distribución de elementos internos, escala y geometría del mástil se estudian para conseguir comodidad, respuesta y rendimiento acústico. La ornamentación aporta carácter y hace única cada pieza.</p>
      </div>
      <div class="feature reveal" data-delay="2">
        <span class="feature__num">03 / Materiales</span>
        <h3>La materia también define el instrumento</h3>
        <p>Abeto, cedro, palosanto, ciprés, ébano. Maderas seleccionadas y estacionadas durante años, valorando densidad, veta, elasticidad y comportamiento antes de decidir cómo aprovechar cada pieza.</p>
      </div>
      <div class="feature reveal" data-delay="3">
        <span class="feature__num">04 / Artesanía</span>
        <h3>El conocimiento que transforma la materia</h3>
        <p>Técnicas tradicionales, trabajo manual y herramientas de precisión. La tecnología se incorpora cuando mejora el resultado, nunca como sustituto del criterio del luthier.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="coleccion">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Vael de Ginés · Guitarras de autor</p>
        <h2 class="h2">${nGuitarras === 1 ? 'Una obra maestra<br><em>esculpida a mano.</em>' : `${capitalizar(enLetras(nGuitarras, 'f'))} obras maestras<br><em>esculpidas a mano.</em>`}</h2>
        <p class="text-muted measure">Instrumentos de alma profunda que encarnan la excelencia del luthier y la herencia de maderas nobles seleccionadas pacientemente durante décadas.</p>
      </div>
      <a class="link-arrow" href="tienda.html">Consultar disponibilidad ${icons.arrow}</a>
    </div>
    <div class="collection-grid">
      ${tarjetasColeccion((p) => p.resumen)}
    </div>
  </div>
</section>

<section class="section section--cream" id="niveles">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Niveles y encargo</p>
        <h2 class="h2">Encuentra tu <em>colección.</em></h2>
        <p class="text-muted mx-auto measure">Cuatro caminos para encargar una guitarra, desde la esencia del timbre tradicional hasta la co-creación absoluta. Todos los instrumentos se construyen por encargo y se ajustan contigo.</p>
      </div>
    </div>
    <div class="tier-grid">
      <div class="tier reveal">
        <span class="tier__kicker">Colección</span>
        <h3>Esencia</h3>
        <p>La pureza del timbre tradicional para el intérprete riguroso.</p>
        <ul><li>Abeto alemán macizo</li><li>Aros de palosanto de la India</li><li>Barniz natural a la gomalaca</li></ul>
        <div class="tier__price">Desde 3.500 €<small>Precio orientativo · IVA incl.</small></div>
      </div>
      <div class="tier reveal" data-delay="1">
        <span class="tier__kicker">Colección</span>
        <h3>Masterpiece</h3>
        <p>La cumbre del detalle acústico, esculpida individualmente.</p>
        <ul><li>Palosanto de Madagascar</li><li>Incrustaciones de nácar natural</li><li>Varetaje acústico personalizado</li></ul>
        <div class="tier__price">Desde 6.200 €<small>Precio orientativo · IVA incl.</small></div>
      </div>
      <div class="tier tier--featured reveal" data-delay="2">
        <span class="tier__kicker">Edición limitada</span>
        <h3>Legado</h3>
        <p>Maderas de reserva histórica curadas durante más de 40 años.</p>
        <ul><li>Ciprés centenario excepcional</li><li>Pala tallada a mano</li><li>Estuche de cuero premium cosido</li></ul>
        <div class="tier__price">Desde 9.800 €<small>Precio orientativo · IVA incl.</small></div>
      </div>
      <div class="tier reveal" data-delay="3">
        <span class="tier__kicker">A medida</span>
        <h3>Black Label</h3>
        <p>Co-creación absoluta: cada variable acústica, ergonómica y estética.</p>
        <ul><li>Madera exótica de reserva privada</li><li>Ergonomía de mástil a medida</li><li>Certificación exclusiva de autor</li></ul>
        <div class="tier__price">A consultar<small>Proyecto personalizado</small></div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="proceso">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">El arte de la luthería</p>
        <h2 class="h2">El valor de una guitarra<br><em>hecha a mano.</em></h2>
        <p class="text-muted measure">Cada instrumento representa un viaje sin atajos hacia la perfección acústica. Seleccionamos individualmente cada madera para asegurar que cada creación posea un alma sonora irrepetible.</p>
      </div>
    </div>
    <div class="process">
      <div class="process__media reveal">
        <img src="assets/img/workshop-2.jpg" alt="Ginés Martínez trabajando la madera en el taller" loading="lazy">
      </div>
      <div class="process__list reveal" data-delay="1">
        <div class="process__step"><span class="process__num">01</span><div><h3>Selección de materiales</h3><p>Búsqueda rigurosa de maderas nobles con excelentes coeficientes de resonancia, estabilidad orgánica y belleza natural.</p></div></div>
        <div class="process__step"><span class="process__num">02</span><div><h3>Diseño y elaboración</h3><p>Cálculo preciso del varetaje interno y espesores milimétricos adaptados para maximizar la proyección acústica deseada.</p></div></div>
        <div class="process__step"><span class="process__num">03</span><div><h3>Construcción artesanal</h3><p>Ensamblado tradicional sobre solera española, respetando las tensiones naturales para una perfecta durabilidad.</p></div></div>
        <div class="process__step"><span class="process__num">04</span><div><h3>Ajuste y acabado</h3><p>Acabado a mano con goma laca o aceite de alta protección. Calibrado de precisión para una pulsación cómoda y entonación perfecta.</p></div></div>
        <div class="process__step"><span class="process__num">05</span><div><h3>Entrega y puesta a punto</h3><p>Revisión final, ajuste de acción y entrega del instrumento con su documentación y recomendaciones de cuidado.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--warm">
  <div class="container quote-block reveal">
    <span class="quote-block__mark">“</span>
    <blockquote>Una guitarra personalizada no debería obligarte a adaptarte a ella; debería estar pensada para ti.</blockquote>
    <cite>Ginés Martínez · Luthier</cite>
  </div>
</section>

<div id="contacto">
${ctaBand({
  title: 'Diseñemos <em>tu guitarra.</em>',
  text: 'La primera conversación no tiene coste ni compromiso. Hablamos de tu forma de tocar, de las maderas que te atraen y del sonido que buscas. A partir de ahí, trazamos el proyecto.',
  primary: `<a class="btn btn--light" href="${contactUrl('Guitarra personalizada')}">Iniciar mi proyecto ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="tienda.html">Ver catálogo</a>`
})}
</div>
`;
