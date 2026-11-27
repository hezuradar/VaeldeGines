'use strict';
const { contactUrl, icons, pageHero, ctaBand } = require('../layout');

const instruments = [
  { name: 'Guitarro murciano', desc: 'Un instrumento ligado a la tradición musical murciana, construido artesanalmente y con atención a sus características propias.', icon: icons.instrument },
  { name: 'Guitarro de ocho cuerdas', desc: 'Una variante del guitarro murciano pensada para músicos que buscan las posibilidades de una configuración de ocho cuerdas.', icon: icons.instrument },
  { name: 'Guitarro valenciano', desc: 'Instrumento tradicional de cuerda pulsada cuya construcción atiende a las características propias de su tipología.', icon: icons.lute },
  { name: 'Guitarro tenor', desc: 'Pensado para formar parte de conjuntos y repertorios de música popular, con una identidad propia dentro de la familia.', icon: icons.lute },
  { name: 'Laúd', desc: 'Un instrumento fundamental en numerosas formaciones de música tradicional. Construcción artesanal y cuidado del acabado.', icon: icons.lute },
  { name: 'Bandurria', desc: 'Un instrumento emblemático de la música tradicional, construido con dedicación artesanal y cuidado por los detalles.', icon: icons.bandurria },
  { name: 'Guitarra mayor', desc: 'Un instrumento tradicional que forma parte de la diversidad de nuestra cultura musical, respetando el carácter del modelo.', icon: icons.instrument }
];

module.exports = `
${pageHero({
  eyebrow: 'Instrumentos de folclore',
  title: 'La tradición,<br><em>hecha instrumento.</em>',
  text: 'Construyo artesanalmente instrumentos de cuerda ligados a nuestra tradición musical, respetando su carácter, su historia y la música para la que fueron concebidos.',
  actions: `<a class="btn" href="#catalogo">Explorar instrumentos ${icons.arrow}</a><a class="link-arrow" href="${contactUrl('Instrumento de folclore')}">Consultar mi instrumento ${icons.arrow}</a>`,
  image: 'assets/img/folk-player.jpg',
  alt: 'Músico tocando un instrumento de folclore construido por Vael de Ginés',
  caption: 'Tradición viva · Murcia',
  portrait: true
})}

<section class="section">
  <div class="container split">
    <div class="split__body reveal">
      <p class="eyebrow">El oficio detrás de la tradición</p>
      <h2 class="h2">Instrumentos que mantienen <em>viva la tradición.</em></h2>
      <p class="lead">Cada instrumento tradicional tiene su propia voz, su historia y su lugar en nuestra cultura musical.</p>
      <p class="text-muted">En mi taller construyo instrumentos de cuerda de forma artesanal, con atención a sus características, sus materiales y el trabajo necesario para darles vida. La construcción artesanal se une al interés por conocer, comprender y preservar estos instrumentos.</p>
      <p class="text-muted">Mi trabajo incluye especialmente el guitarro murciano, una familia de instrumentos cuya construcción y tradición merecen seguir transmitiéndose a nuevas generaciones de músicos.</p>
      <p style="margin-top:28px"><a class="link-arrow" href="${contactUrl('Instrumento de folclore')}">Cuéntame qué buscas ${icons.arrow}</a></p>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/guitarro-detail.jpg" alt="Detalle de la caja y los aros de un guitarro murciano" loading="lazy">
      </div>
      <p class="split__caption">Guitarro murciano · Detalle de construcción</p>
    </div>
  </div>
</section>

<section class="section section--cream" id="catalogo">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Catálogo de instrumentos</p>
        <h2 class="h2">Cada instrumento,<br><em>su propia voz.</em></h2>
        <p class="text-muted measure">Explora la familia de instrumentos que construyo en el taller. Si buscas una variante concreta o tienes una necesidad particular, consúltame para comprobar las posibilidades de fabricación.</p>
      </div>
      <a class="link-arrow" href="${contactUrl('Instrumento de folclore')}">Asesoramiento ${icons.arrow}</a>
    </div>
    <div class="instrument-grid" id="guitarro">
      ${instruments.map((it) => `
      <a class="instrument-row reveal" href="contacto.html">
        <span class="instrument-row__icon">${it.icon}</span>
        <div>
          <h3>${it.name}</h3>
          <p>${it.desc}</p>
        </div>
        <span class="instrument-row__link" aria-hidden="true">${icons.arrow}</span>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split split--media-right">
    <div class="split__body reveal">
      <p class="eyebrow">Instrumento destacado</p>
      <h2 class="h2">El guitarro murciano,<br><em>una seña de identidad.</em></h2>
      <p class="lead">Un instrumento de cuerda pulsada con una personalidad sonora inconfundible, ligado a la música tradicional de Murcia.</p>
      <p class="text-muted">Su construcción requiere conocer la tipología, elegir maderas adecuadas y trabajar con paciencia cada una de sus partes. El resultado es un instrumento con carácter, cómodo de tocar y fiel a la tradición para la que fue creado.</p>
      <ul style="margin-top:22px;display:flex;flex-direction:column;gap:10px">
        <li style="display:flex;gap:10px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Construcción artesanal pieza a pieza</span></li>
        <li style="display:flex;gap:10px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Selección de maderas según el proyecto</span></li>
        <li style="display:flex;gap:10px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Asesoramiento sobre configuración y uso</span></li>
        <li style="display:flex;gap:10px;align-items:flex-start"><span style="color:var(--brass);width:16px;flex:none">${icons.check}</span><span class="text-muted">Acabados y ajustes a medida</span></li>
      </ul>
      <p style="margin-top:30px"><a class="btn" href="${contactUrl('Instrumento de folclore', 'Guitarro murciano')}">Consultar el guitarro ${icons.arrow}</a></p>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/folk-guitarro.jpg" alt="Guitarro murciano tenor construido por Vael de Ginés" loading="lazy">
      </div>
      <p class="split__caption">Guitarro murciano tenor · Construcción artesanal</p>
    </div>
  </div>
</section>

<section class="section section--dark" id="proceso">
  <div class="container process">
    <div class="process__media reveal">
      <img src="assets/img/workshop-2.jpg" alt="Ginés Martínez trabajando en el taller" loading="lazy">
    </div>
    <div class="reveal" data-delay="1">
      <p class="eyebrow">Tu instrumento, paso a paso</p>
      <h2 class="h2" style="margin-bottom:36px">Todo comienza con<br><em>una conversación.</em></h2>
      <div class="process__list">
        <div class="process__step"><span class="process__num">01</span><div><h3>Cuéntame qué buscas</h3><p>Explícame qué instrumento necesitas, cómo lo vas a utilizar y si tienes alguna preferencia o requisito particular.</p></div></div>
        <div class="process__step"><span class="process__num">02</span><div><h3>Identificamos el instrumento</h3><p>Revisamos el modelo que mejor se ajusta a tus necesidades y aclaramos sus características, configuración y posibilidades.</p></div></div>
        <div class="process__step"><span class="process__num">03</span><div><h3>Consultamos precio y disponibilidad</h3><p>Te facilitaré la información comercial correspondiente, incluyendo presupuesto y previsión de disponibilidad o fabricación.</p></div></div>
        <div class="process__step"><span class="process__num">04</span><div><h3>Definimos el encargo</h3><p>Una vez aclaradas las características y condiciones, concretamos el proyecto antes de iniciar la fabricación.</p></div></div>
        <div class="process__step"><span class="process__num">05</span><div><h3>Preparamos la entrega</h3><p>Cuando el instrumento esté disponible y acordadas las condiciones, coordinamos los siguientes pasos contigo.</p></div></div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Antes de elegir</p>
        <h2 class="h2">Resolvemos <em>tus dudas.</em></h2>
        <p class="text-muted mx-auto measure">Cada músico tiene sus necesidades. Si estás buscando un instrumento tradicional y necesitas más información, aquí encontrarás respuestas a algunas preguntas habituales.</p>
      </div>
    </div>
    <div class="faq">
      <details class="faq__item">
        <summary>¿Cómo sé qué instrumento es el adecuado para mí?</summary>
        <p>Depende del repertorio que interpretes, del tipo de agrupación en la que participes y de las características que busques. Si tienes dudas entre varios modelos, contacta conmigo y estudiaremos cuál se adapta mejor a tus necesidades.</p>
      </details>
      <details class="faq__item">
        <summary>¿Qué instrumentos puedo encargar?</summary>
        <p>En el catálogo encontrarás los instrumentos de folclore que presento en esta página. Si buscas una variante concreta o tienes una necesidad particular, consúltame para comprobar las posibilidades de fabricación.</p>
      </details>
      <details class="faq__item">
        <summary>¿Cuánto cuesta un instrumento?</summary>
        <p>El precio depende del modelo, sus características y la configuración acordada. Contacta conmigo para conocer el precio vigente del instrumento que te interesa y recibir la información necesaria antes de decidir.</p>
      </details>
      <details class="faq__item">
        <summary>¿Cuánto tiempo tarda la fabricación?</summary>
        <p>El plazo depende del instrumento, de si hay unidades disponibles y de la planificación del taller. Consulta la disponibilidad y la previsión correspondiente antes de formalizar el encargo.</p>
      </details>
      <details class="faq__item">
        <summary>¿Puedo solicitar alguna personalización?</summary>
        <p>Las posibilidades dependen del tipo de instrumento y de las características del proyecto. Cuéntame qué necesitas y valoraremos qué opciones son viables.</p>
      </details>
      <details class="faq__item">
        <summary>¿Cómo se formaliza un encargo?</summary>
        <p>Primero concretaremos el instrumento, sus características, el presupuesto, la disponibilidad o el plazo previsto y las condiciones aplicables. Antes de confirmar, te explicaré toda la información necesaria para que puedas decidir con claridad.</p>
      </details>
      <details class="faq__item">
        <summary>¿Cómo puedo consultar las opciones de entrega?</summary>
        <p>Contacta conmigo para conocer las opciones disponibles según el instrumento, tu ubicación y las condiciones de entrega aplicables.</p>
      </details>
    </div>
  </div>
</section>

${ctaBand({
  title: 'Hablemos de música <em>y tradición.</em>',
  text: 'Cuéntame qué instrumento tienes en mente, cómo lo vas a utilizar y qué necesitas encontrar en él. Estudiaremos las posibilidades y te facilitaré la información necesaria para dar el siguiente paso.',
  primary: `<a class="btn btn--light" href="${contactUrl('Instrumento de folclore')}">Consultar mi instrumento ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="tienda.html">Ver catálogo</a>`,
  image: 'assets/img/folk-guitarro.jpg'
})}
`;
