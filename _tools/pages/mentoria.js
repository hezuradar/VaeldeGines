'use strict';
const { icons, pageHero, ctaBand } = require('../layout');

module.exports = `
${pageHero({
  eyebrow: 'Mentoría y consultoría',
  title: 'Aprende el oficio<br><em>con quien lo vive.</em>',
  text: '¿Quieres mejorar en el campo de la luthería o la artesanía? ¿No sabes por dónde empezar? ¿Te preguntas si es posible emprender y vivir de ello? Con más de 10 años de experiencia en el sector, pongo todo mi conocimiento a tu servicio.',
  actions: `<a class="btn" href="#reserva">Reservar una sesión ${icons.arrow}</a><a class="link-arrow" href="#sesiones">Ver las modalidades ${icons.arrow}</a>`,
  image: 'assets/img/mentoria.png',
  alt: 'Ginés Martínez explicando la construcción de instrumentos en una demostración',
  caption: 'Mentoría 1:1 · Con Ginés Martínez',
  portrait: false
})}

<section class="section" id="sesiones">
  <div class="container split">
    <div class="split__body reveal">
      <p class="eyebrow">Cómo funciona</p>
      <h2 class="h2">Una hora para resolver<br><em>lo que te bloquea.</em></h2>
      <p class="lead">Las sesiones de mentoría y consultoría tienen una duración de 1 hora y se realizan a través de una plataforma de videoconferencia.</p>
      <p class="text-muted">Todas las sesiones podrán ser grabadas y, si lo deseas, se te enviará una copia del vídeo para que puedas verlo tantas veces como quieras.</p>
      <p class="text-muted">Hablamos de lo que tú necesites: técnicas de construcción, elección de maderas, herramientas, acabados, organización del taller, precios, clientes o cómo enfocar tu proyecto profesional.</p>
      <ul style="margin-top:26px;display:flex;flex-direction:column;gap:12px">
        <li style="display:flex;gap:12px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Sesión individual de 1 hora por videoconferencia</span></li>
        <li style="display:flex;gap:12px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Grabación de la sesión, si la solicitas</span></li>
        <li style="display:flex;gap:12px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Pack de 10 sesiones con plan de negocio</span></li>
        <li style="display:flex;gap:12px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Atención directa, sin intermediarios</span></li>
      </ul>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/workshop-2.jpg" alt="Ginés Martínez en su taller durante una sesión de trabajo" loading="lazy">
      </div>
      <p class="split__caption">Más de 10 años de experiencia en el sector</p>
    </div>
  </div>
</section>

<section class="section section--cream" id="reserva">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Modalidades</p>
        <h2 class="h2">Elige cómo <em>empezar.</em></h2>
        <p class="text-muted mx-auto measure">Precios con impuestos incluidos. Las sesiones se reservan y se abonan antes de la cita, y se coordinan por correo electrónico.</p>
      </div>
    </div>

    <div class="price-grid">
      <div class="price-card reveal">
        <span class="price-card__tag">Sesión individual</span>
        <h3>Una sesión</h3>
        <div class="price-card__amount">45 € <small>IVA incl.</small></div>
        <p>Ideal para resolver una duda concreta, revisar un proyecto o dar el primer paso con criterio.</p>
        <ul>
          <li>Duración: 1 hora</li>
          <li>Videoconferencia 1:1</li>
          <li>Grabación opcional</li>
          <li>Resumen de conclusiones</li>
        </ul>
        <a class="btn btn--outline" href="contacto.html">Reservar sesión ${icons.arrow}</a>
      </div>

      <div class="price-card price-card--featured reveal" data-delay="1">
        <span class="price-card__tag">Acompañamiento</span>
        <h3>Pack 10 sesiones</h3>
        <div class="price-card__amount">400 € <small>IVA incl.</small></div>
        <p>Un acompañamiento completo para desarrollar tu proyecto con apoyo y minimizar los riesgos.</p>
        <ul>
          <li>10 sesiones de 1 hora</li>
          <li>Plan de negocio con mi apoyo</li>
          <li>Estudio y minimización de riesgos</li>
          <li>Seguimiento entre sesiones</li>
        </ul>
        <a class="btn btn--light" href="contacto.html">Reservar el pack ${icons.arrow}</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Para quién es</p>
        <h2 class="h2">Si estás empezando<br><em>o quieres dar un paso más.</em></h2>
      </div>
    </div>
    <div class="feature-list feature-list--3">
      <div class="feature reveal">
        <span class="feature__num">01</span>
        <h3>Luthiers que empiezan</h3>
        <p>Herramientas, primeras guitarras, errores habituales y cómo organizar el aprendizaje sin perder tiempo ni materiales.</p>
      </div>
      <div class="feature reveal" data-delay="1">
        <span class="feature__num">02</span>
        <h3>Artesanos y profesionales</h3>
        <p>Mejorar procesos, afinar la acústica, resolver acabados o incorporar tecnología con criterio en el taller.</p>
      </div>
      <div class="feature reveal" data-delay="2">
        <span class="feature__num">03</span>
        <h3>Proyectos que quieren vivir de esto</h3>
        <p>Precios, clientes, encargos, visibilidad y plan de negocio. La parte que no se aprende en el banco de trabajo.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Preguntas frecuentes</p>
        <h2 class="h2">Antes de <em>reservar.</em></h2>
      </div>
    </div>
    <div class="faq">
      <details class="faq__item">
        <summary>¿Cómo se realiza la sesión?</summary>
        <p>Por videoconferencia, en el horario que acordemos. Te enviaré el enlace de acceso por correo electrónico una vez confirmada la reserva.</p>
      </details>
      <details class="faq__item">
        <summary>¿Puedo grabar la sesión?</summary>
        <p>Sí. Todas las sesiones pueden grabarse y, si lo deseas, te enviaré una copia del vídeo para que puedas consultarlo cuando quieras.</p>
      </details>
      <details class="faq__item">
        <summary>¿Qué incluye el pack de 10 sesiones?</summary>
        <p>Además de las diez horas de consultoría, podrás desarrollar con mi apoyo un plan de negocio y estudiar cómo minimizar los riesgos gracias a mi experiencia en el sector.</p>
      </details>
      <details class="faq__item">
        <summary>¿Necesito tener experiencia previa?</summary>
        <p>No. Las sesiones se adaptan a tu nivel. Puedes empezar desde cero o venir con un proyecto avanzado que necesite revisión.</p>
      </details>
      <details class="faq__item">
        <summary>¿Cómo se paga?</summary>
        <p>Te indicaré las opciones disponibles al confirmar la cita. El importe se abona antes de la sesión.</p>
      </details>
    </div>
  </div>
</section>

${ctaBand({
  title: '¿Empezamos <em>por una conversación?</em>',
  text: 'Cuéntame en qué punto estás, qué te gustaría conseguir y qué dudas tienes. Te responderé personalmente para concretar la sesión.',
  primary: `<a class="btn btn--light" href="contacto.html">Reservar mi mentoría ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="podcast.html">Escuchar el podcast</a>`,
  image: 'assets/img/craft-plane.jpg'
})}
`;
