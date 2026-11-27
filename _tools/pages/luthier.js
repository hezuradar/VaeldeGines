'use strict';
const { contactUrl, icons, pageHero, ctaBand } = require('../layout');

module.exports = `
${pageHero({
  eyebrow: 'El taller · Los Alcázares, Murcia',
  title: 'El oficio detrás<br><em>del instrumento.</em>',
  text: 'Soy Ginés Martínez, luthier artesanal y creador de Vael de Ginés. En mi taller construyo guitarras personalizadas e instrumentos de folclore, combinando el conocimiento del oficio, la selección de materiales y el trabajo manual.',
  actions: `<a class="btn" href="${contactUrl('Visita al taller')}">Visitar el taller ${icons.arrow}</a><a class="link-arrow" href="#proceso">Conocer el proceso ${icons.arrow}</a>`,
  image: 'assets/img/luthier-portrait.jpg',
  alt: 'Ginés Martínez, luthier artesanal de Vael de Ginés',
  caption: 'Ginés Martínez · Luthier',
  portrait: true
})}

<section class="section">
  <div class="container split split--media-right">
    <div class="split__body reveal">
      <p class="eyebrow">Una vida junto a la madera</p>
      <h2 class="h2">Cada instrumento tiene<br><em>una historia que contar.</em></h2>
      <p class="lead">Vael de Ginés nace en Los Alcázares, un pueblo costero del Mar Menor, del deseo de construir instrumentos con identidad propia y de mantener vivo un oficio que se aprende con las manos.</p>
      <p class="text-muted">Como luthier artesanal, entiendo cada instrumento como un proyecto único. Desde las guitarras diseñadas junto a cada músico hasta la construcción de instrumentos tradicionales, mi trabajo busca unir calidad artesanal, personalidad y respeto por la cultura musical.</p>
      <p class="text-muted">El taller es un espacio de conversación, pruebas y decisiones compartidas. Allí se eligen las maderas, se trazan los planos, se ajusta la acción y se escucha por primera vez el instrumento terminado.</p>
      <div class="split__signature">
        <img src="assets/img/luthier-portrait.jpg" alt="Retrato de Ginés Martínez" loading="lazy">
        <div><strong>Ginés Martínez</strong><span>Luthier · Vael de Ginés</span></div>
      </div>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/workshop-3.jpg" alt="Ginés Martínez trabajando en el banco del taller" loading="lazy">
      </div>
      <p class="split__caption">El taller · Los Alcázares, Murcia</p>
    </div>
  </div>
</section>

<section class="section section--warm">
  <div class="container quote-block reveal">
    <span class="quote-block__mark">“</span>
    <blockquote>La artesanía está en cada decisión, en el silencio del taller y en el respeto absoluto al alma de la madera.</blockquote>
    <cite>Ginés Martínez · Luthier</cite>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Cómo trabajo</p>
        <h2 class="h2">Tres cosas que no<br><em>negocio nunca.</em></h2>
      </div>
    </div>
    <div class="feature-list feature-list--3">
      <div class="feature reveal">
        <span class="feature__num">01 / Conocimiento</span>
        <h3>El oficio, primero</h3>
        <p>Conocer la madera, la acústica y el comportamiento de cada material permite tomar decisiones con criterio. La técnica está al servicio del instrumento, no al revés.</p>
      </div>
      <div class="feature reveal" data-delay="1">
        <span class="feature__num">02 / Materiales</span>
        <h3>Maderas con historia</h3>
        <p>Selecciono y estaciono las maderas durante años. Su densidad, veta y elasticidad determinan cómo se aprovecha cada pieza y qué voz puede llegar a tener.</p>
      </div>
      <div class="feature reveal" data-delay="2">
        <span class="feature__num">03 / Personas</span>
        <h3>Cada músico, un proyecto</h3>
        <p>Escucho antes de construir. La conversación con quien va a tocar el instrumento es tan importante como el diseño o la elección de la madera.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream" id="proceso">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">El proceso artesanal</p>
        <h2 class="h2">Del primer boceto<br><em>a la primera nota.</em></h2>
        <p class="text-muted measure">Un camino sin atajos, en el que cada fase tiene un propósito y cada decisión deja huella en el resultado final.</p>
      </div>
    </div>
    <div class="process">
      <div class="process__media reveal">
        <img src="assets/img/workshop-1.jpg" alt="Cepillando una pieza de madera en el taller" loading="lazy">
      </div>
      <div class="process__list reveal" data-delay="1">
        <div class="process__step"><span class="process__num">01</span><div><h3>Conversación</h3><p>Conozco tu forma de tocar, tu repertorio, tus preferencias estéticas y lo que necesitas sentir con el instrumento.</p></div></div>
        <div class="process__step"><span class="process__num">02</span><div><h3>Diseño</h3><p>Definimos proporciones, maderas, ergonomía y detalles ornamentales. Trazamos el proyecto antes de tocar la madera.</p></div></div>
        <div class="process__step"><span class="process__num">03</span><div><h3>Selección</h3><p>Elegimos las piezas de madera que mejor responden al proyecto, valorando veta, densidad y estabilidad.</p></div></div>
        <div class="process__step"><span class="process__num">04</span><div><h3>Construcción</h3><p>Ensamblado a mano, ajuste de la arquitectura interna, barnizado y curado. El tiempo del taller no se acelera.</p></div></div>
        <div class="process__step"><span class="process__num">05</span><div><h3>Entrega</h3><p>Puesta a punto, comprobación de acción y entonación, y entrega con las recomendaciones de cuidado del instrumento.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Dentro del taller</p>
        <h2 class="h2">Donde nace<br><em>cada instrumento.</em></h2>
      </div>
    </div>
    <div class="gallery-strip">
      <figure class="reveal">
        <img src="assets/img/workshop-2.jpg" alt="Ginés Martínez cepillando madera en el taller" loading="lazy">
        <figcaption>El banco de trabajo</figcaption>
      </figure>
      <figure class="reveal" data-delay="1">
        <img src="assets/img/craft-hands.jpg" alt="Manos del luthier revisando una tapa de guitarra" loading="lazy">
        <figcaption>Precisión y paciencia</figcaption>
      </figure>
      <figure class="reveal" data-delay="2">
        <img src="assets/img/craft-plane.jpg" alt="Cepillo de mano trabajando la madera" loading="lazy">
        <figcaption>Herramientas tradicionales</figcaption>
      </figure>
    </div>
  </div>
</section>

<section class="section section--cream" id="reconocimientos">
  <div class="container split">
    <div class="split__media reveal">
      <div class="split__frame">
        <img src="assets/img/homofaber.webp" alt="Sello Homo Faber" loading="lazy" style="object-fit:contain;background:var(--cream);padding:40px">
      </div>
    </div>
    <div class="split__body reveal" data-delay="1">
      <p class="eyebrow">Reconocimientos</p>
      <h2 class="h2">La confianza se construye<br><em>con hechos.</em></h2>
      <p class="lead">Formar parte de Homo Faber, recibir el Premio Emprendimiento y el reconocimiento de España Artesana son hitos que comparten un mismo origen: el trabajo bien hecho.</p>
      <div class="credentials credentials--stack">
        <div class="credential">
          <img src="assets/img/homofaber.webp" alt="" loading="lazy">
          <div><strong>Homo Faber · Member</strong><span>Fundación Michelangelo · España</span></div>
        </div>
        <div class="credential">
          ${icons.diamond}
          <div><strong>Premio Emprendimiento</strong><span>Reconocimiento al oficio artesano</span></div>
        </div>
        <div class="credential">
          ${icons.check}
          <div><strong>España Artesana</strong><span>Artesanía de autor</span></div>
        </div>
      </div>
      <p style="margin-top:30px"><a class="link-arrow" href="https://www.homofaber.com/es/discover/gines-martinez-102ray" target="_blank" rel="noopener">Ver perfil en Homo Faber ${icons.arrow}</a></p>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Ven al taller,<br><em>hablemos sin prisa.</em>',
  text: 'Puedes visitarme con cita previa en Los Alcázares (Murcia). Verás las maderas, conocerás el proceso y podremos hablar de tu próximo instrumento con calma.',
  primary: `<a class="btn btn--light" href="${contactUrl('Visita al taller')}">Pedir cita ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="podcast.html">Escuchar el podcast</a>`,
  image: 'assets/img/workshop-1.jpg'
})}
`;
