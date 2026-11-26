'use strict';
const { icons, guitarCard, postCard, ctaBand } = require('../layout');
const articles = require('../data/blog');
const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a]));
const blogTeaser = (slug) => {
  const a = bySlug[slug];
  return postCard({ category: a.label, title: a.title, excerpt: a.excerpt, img: a.image, alt: a.title, href: a.file, read: '6 min' });
};

module.exports = `
<section class="hero">
  <div class="hero__content">
    <p class="eyebrow">Luthier artesanal · Los Alcázares, Murcia</p>
    <h1 class="hero__title">Instrumentos con alma,<br><em>construidos a mano.</em></h1>
    <p class="hero__text">Guitarras personalizadas e instrumentos de folclore. Cada pieza nace de una conversación, de maderas seleccionadas con paciencia y del tiempo que exige el oficio.</p>
    <div class="hero__actions">
      <a class="btn" href="contacto.html">Diseñar mi guitarra ${icons.arrow}</a>
      <a class="link-arrow" href="guitarras.html#coleccion">Ver la colección ${icons.arrow}</a>
    </div>
    <dl class="hero__stats">
      <div class="hero__stat"><dt>10+</dt><dd>Años de oficio</dd></div>
      <div class="hero__stat"><dt>100%</dt><dd>Construcción artesanal</dd></div>
      <div class="hero__stat"><dt>1:1</dt><dd>Cada instrumento, único</dd></div>
    </dl>
  </div>
  <div class="hero__media">
    <img src="assets/img/hero-guitar.jpg" alt="Dos guitarras clásicas artesanales construidas por Vael de Ginés" width="848" height="1131" fetchpriority="high">
    <div class="hero__badge">
      <strong>Nº 01</strong>
      <span>Paloma<br>Colección de autor</span>
    </div>
  </div>
</section>

<div class="trust-strip">
  <div class="container trust-strip__inner">
    <span class="trust-strip__item">${icons.diamond} Maderas seleccionadas y estacionadas</span>
    <span class="trust-strip__item">${icons.check} Construcción enteramente a mano</span>
    <span class="trust-strip__item">${icons.pin} Taller en Los Alcázares, Murcia</span>
    <span class="trust-strip__item">${icons.arrow} Encargos en toda España</span>
  </div>
</div>

<section class="section">
  <div class="container split">
    <div class="split__body reveal">
      <p class="eyebrow">El oficio</p>
      <h2 class="h2">Cada instrumento empieza con <em>una conversación.</em></h2>
      <p class="lead">Soy Ginés Martínez, luthier artesanal en Los Alcázares (Murcia) y creador de Vael de Ginés. En mi taller construyo guitarras personalizadas e instrumentos de folclore combinando el conocimiento del oficio, la selección de materiales y el trabajo manual.</p>
      <p class="text-muted">No existen dos músicos iguales. Por eso cada proyecto comienza escuchando cómo tocas, qué buscas y qué necesitas sentir con el instrumento. A partir de ahí, diseño y construyo una pieza con identidad propia: tuya.</p>
      <div class="split__signature">
        <img src="assets/img/luthier-portrait.jpg" alt="Ginés Martínez, luthier de Vael de Ginés" loading="lazy">
        <div>
          <strong>Ginés Martínez</strong>
          <span>Luthier · Vael de Ginés</span>
        </div>
      </div>
      <p style="margin-top:26px"><a class="link-arrow" href="luthier.html">Conoce el taller ${icons.arrow}</a></p>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/luthier-portrait.jpg" alt="Ginés Martínez sosteniendo una tapa de guitarra en su taller" loading="lazy">
      </div>
      <p class="split__caption">El taller · Los Alcázares, Murcia</p>
    </div>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Dos caminos, un mismo oficio</p>
        <h2 class="h2">¿Qué instrumento tienes <em>en mente?</em></h2>
      </div>
    </div>
    <div class="paths">
      <a class="path-card reveal" href="guitarras.html">
        <span class="path-card__index">01 — Guitarras</span>
        <img src="assets/img/guitar-paloma.jpg" alt="Guitarra Paloma de Vael de Ginés" loading="lazy">
        <h3>Guitarras personalizadas</h3>
        <p>Diseñadas junto a cada músico: maderas, proporciones, ergonomía y ornamentación pensadas para tu forma de tocar.</p>
        <span class="link-arrow">Descubre las guitarras ${icons.arrow}</span>
      </a>
      <a class="path-card reveal" data-delay="1" href="instrumentos.html">
        <span class="path-card__index">02 — Folclore</span>
        <img src="assets/img/folk-player.jpg" alt="Músico tocando un instrumento tradicional construido por Vael de Ginés" loading="lazy">
        <h3>Instrumentos de folclore</h3>
        <p>Guitarros, laúdes y bandurrias construidos con respeto por la tradición y por la música para la que fueron concebidos.</p>
        <span class="link-arrow">Descubre los instrumentos ${icons.arrow}</span>
      </a>
    </div>
  </div>
</section>

<section class="section compromiso" id="compromiso">
  <div class="container compromiso__grid">
    <div class="compromiso__intro reveal">
      <p class="eyebrow">Compromiso con el medio ambiente</p>
      <h2 class="h2">Cada guitarra deja<br><em>una huella positiva.</em></h2>
      <p class="lead">La madera que uso tiene una segunda vida. Colaboro con Tree Nation para compensar la huella de carbono del taller y devolver al planeta parte de lo que recibe de él.</p>
      <p class="text-muted measure">En el bosque de Vael de Ginés ya se han plantado <strong>129 árboles</strong> y se han capturado <strong>14,92 toneladas de CO₂</strong> en proyectos de reforestación en Tanzania, Madagascar y Senegal.</p>
      <a class="btn" href="https://tree-nation.com/es/perfil/impacto/vael-de-gines?code=64f099c2343b7&amp;version=v1&amp;utm_source=widget&amp;utm_medium=referral&amp;utm_campaign=net-zero-website&amp;utm_term=660287" target="_blank" rel="noopener">Ver el bosque en Tree Nation ${icons.arrow}</a>
    </div>

    <div class="compromiso__visual reveal" data-delay="1">
      <img src="assets/img/compromiso.webp" alt="Manos sosteniendo tierra con una planta joven" loading="lazy">
      <div class="compromiso__rings">
        <div class="impact-ring impact-ring--green" data-value="14.92" data-decimals="2" data-percent="75">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="impact-ring__track" cx="60" cy="60" r="52"></circle>
            <circle class="impact-ring__bar" cx="60" cy="60" r="52"></circle>
          </svg>
          <div class="impact-ring__label">
            <strong data-count>0</strong>
            <span>t CO₂ capturado</span>
          </div>
        </div>
        <div class="impact-ring" data-value="129" data-decimals="0" data-percent="65">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle class="impact-ring__track" cx="60" cy="60" r="52"></circle>
            <circle class="impact-ring__bar" cx="60" cy="60" r="52"></circle>
          </svg>
          <div class="impact-ring__label">
            <strong data-count>0</strong>
            <span>árboles plantados</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream" id="coleccion">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Colección de autor</p>
        <h2 class="h2">Seis instrumentos,<br><em>seis historias.</em></h2>
        <p class="text-muted measure">Cada guitarra parte de una idea diferente. La combinación de materiales, el diseño ornamental y las decisiones de construcción dan lugar a instrumentos irrepetibles.</p>
      </div>
      <a class="link-arrow" href="guitarras.html#coleccion">Ver la colección completa ${icons.arrow}</a>
    </div>
    <div class="collection-grid">
      ${guitarCard({ num: '01', name: 'Paloma', tag: 'Serie exclusiva', desc: 'Tono cristalino y respuesta inmediata. Abeto alemán y palosanto de Madagascar.', img: 'assets/img/guitar-paloma.jpg', alt: 'Guitarra Paloma de Vael de Ginés' })}
      ${guitarCard({ num: '02', name: 'Golden Whale', tag: 'Maestría orgánica', desc: 'Proyección armónica y timbre denso. Cedro canadiense, koa hawaiana y pan de oro.', img: 'assets/img/guitar-golden-whale.jpg', alt: 'Guitarra Golden Whale de Vael de Ginés' })}
      ${guitarCard({ num: '03', name: 'Freya', tag: 'Templanza y tempestad', desc: 'Graves majestuosos y nitidez lírica. Pícea de Sitka y cocobolo exótico.', img: 'assets/img/guitar-freya.jpg', alt: 'Guitarra Freya de Vael de Ginés' })}
      ${guitarCard({ num: '04', name: 'Camino', tag: 'Vínculo infinito', desc: 'Equilibrio y timbre orgánico. Abeto de los Alpes y barniz a la goma laca.', img: 'assets/img/guitar-camino.jpg', alt: 'Guitarra Camino de Vael de Ginés' })}
      ${guitarCard({ num: '05', name: 'Jaguar', tag: 'Instinto y ataque', desc: 'Ataque veloz y graves aterciopelados. Nogal español y alma de fibra de carbono.', img: 'assets/img/guitar-jaguar.jpg', alt: 'Guitarra Jaguar de Vael de Ginés' })}
      ${guitarCard({ num: '06', name: 'Venus', tag: 'Belleza celestial', desc: 'Sustain infinito y armónicos etéreos. Arce rizado y roseta con nácar natural.', img: 'assets/img/guitar-venus.jpg', alt: 'Guitarra Venus de Vael de Ginés' })}
    </div>
  </div>
</section>

<section class="section section--dark" id="proceso">
  <div class="container process">
    <div class="process__media reveal">
      <img src="assets/img/workshop-3.jpg" alt="Ginés Martínez trabajando en el taller de luthería" loading="lazy">
    </div>
    <div class="reveal" data-delay="1">
      <p class="eyebrow">El proceso artesanal</p>
      <h2 class="h2" style="margin-bottom:36px">Del primer boceto<br><em>a la primera nota.</em></h2>
      <div class="process__list">
        <div class="process__step"><span class="process__num">01</span><div><h3>Conversación inicial</h3><p>Nos reunimos para comprender tu visión, tu estilo de interpretación y definir la personalidad sonora del instrumento.</p></div></div>
        <div class="process__step"><span class="process__num">02</span><div><h3>Definición</h3><p>Trazamos los planos acústicos y ergonómicos, diseñando la arquitectura interna y las proporciones de la guitarra.</p></div></div>
        <div class="process__step"><span class="process__num">03</span><div><h3>Selección</h3><p>Elegimos maderas nobles envejecidas que ofrezcan la resonancia, estabilidad y estética que el proyecto requiere.</p></div></div>
        <div class="process__step"><span class="process__num">04</span><div><h3>Construcción</h3><p>Ensamblado enteramente a mano en el taller, esculpiendo cada veta con herramientas tradicionales.</p></div></div>
        <div class="process__step"><span class="process__num">05</span><div><h3>Entrega</h3><p>Ajuste de acción definitivo, barnizado orgánico a muñequilla y puesta a punto antes de la entrega.</p></div></div>
      </div>
      <p style="margin-top:34px"><a class="link-arrow link-arrow--light" href="luthier.html#proceso">Conocer el proceso completo ${icons.arrow}</a></p>
    </div>
  </div>
</section>

<section class="section" id="taller">
  <div class="container split">
    <div class="split__media reveal">
      <div class="split__frame">
        <img src="assets/img/workshop-1.jpg" alt="Ginés Martínez cepillando una pieza de madera en el taller" loading="lazy">
      </div>
      <p class="split__caption">El oficio se aprende con las manos</p>
    </div>
    <div class="split__body reveal" data-delay="1">
      <p class="eyebrow">El taller</p>
      <h2 class="h2">La artesanía está en <em>cada decisión.</em></h2>
      <p class="lead">No se trata solo de construir a mano, sino de conocer profundamente el oficio y saber cómo aplicarlo en cada momento.</p>
      <p class="text-muted">Combino técnicas tradicionales, trabajo manual y herramientas de precisión, incorporando la tecnología cuando permite mejorar el resultado. La madera, la acústica y el tiempo marcan el ritmo del taller.</p>
      <div class="credentials">
        <div class="credential">
          <img src="assets/img/homofaber.webp" alt="Sello Homo Faber" loading="lazy">
          <div><strong>Homo Faber</strong><span>Member · España</span></div>
        </div>
        <div class="credential">
          ${icons.diamond}
          <div><strong>Premio Emprendimiento</strong><span>Reconocimiento local</span></div>
        </div>
        <div class="credential">
          ${icons.check}
          <div><strong>España Artesana</strong><span>Artesanía certificada</span></div>
        </div>
      </div>
      <p style="margin-top:30px"><a class="link-arrow" href="luthier.html#reconocimientos">Conoce mi trabajo ${icons.arrow}</a></p>
    </div>
  </div>
</section>

<section class="section section--warm">
  <div class="container quote-block reveal">
    <span class="quote-block__mark">“</span>
    <blockquote>El violonchelo que construyó Vael posee un timbre aterciopelado y una potencia que llena cualquier sala. Su dedicación se siente en cada nota.</blockquote>
    <cite>Beatriz Méndez · Violonchelista de cámara</cite>
  </div>
</section>

<section class="section section--cream" id="blog">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Cuaderno del taller</p>
        <h2 class="h2">Historias, maderas<br><em>y oficio.</em></h2>
      </div>
      <a class="link-arrow" href="blog.html">Ver todos los artículos ${icons.arrow}</a>
    </div>
    <div class="post-grid">
      ${blogTeaser('guitarra-clasica-vs-flamenca-luthier')}
      ${blogTeaser('pau-ferro')}
      ${blogTeaser('cnc-en-la-lutheria')}
    </div>
  </div>
</section>

${ctaBand({
  title: '¿Hablamos de tu <em>próximo instrumento?</em>',
  text: 'Cuéntame qué instrumento tienes en mente, cómo lo vas a utilizar y qué necesitas encontrar en él. Estudiaremos las posibilidades y te facilitaré toda la información para dar el siguiente paso.',
  primary: `<a class="btn btn--light" href="contacto.html">Contactar con el taller ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="guitarras.html">Ver guitarras</a>`
})}
`;
