'use strict';
const { icons, ctaBand } = require('../layout');

const episodes = [
  { n: '01', title: 'Juan Busquiel', desc: 'Un encuentro con el luthier Juan Busquiel: oficio, trayectoria y visión de la construcción artesanal.' },
  { n: '02', title: 'Clavijas y clavijeros de guitarra', desc: 'Todo lo que conviene saber sobre el mecanismo que sostiene la afinación del instrumento.' },
  { n: '03', title: 'Juliana Hernández', desc: 'Descubriendo la maestría de Juliana Hernández en «La Cabaña del Luthier».' },
  { n: '04', title: 'Leonardo Navarro', desc: 'El luthier canario nos habla de su trabajo, su taller y su manera de entender el oficio.' },
  { n: '05', title: 'Luis Guerrero y la Spanish School of Lutherie', desc: 'Un capítulo especial para celebrar los días internacionales de la artesanía.' },
  { n: '06', title: 'Ciprés cartagenero', desc: 'Exploramos los misterios del Tetraclinis articulata, una madera ligada a nuestra tierra.' },
  { n: '07', title: '¿Cómo se fabrican las cuerdas de guitarra?', desc: 'Con IMS Strings, entramos en el proceso de fabricación de las cuerdas que dan voz al instrumento.' },
  { n: '08', title: 'Pedro Izquierdo y el timple', desc: 'Nos sumergimos en el universo del timple canario de la mano de Pedro Izquierdo.' },
  { n: '09', title: '¿Quién fue Antonio de Torres?', desc: 'El legado del maestro almeriense que transformó la guitarra española para siempre.' },
  { n: '10', title: 'Ginés Marín, maestro y amigo', desc: 'Una conversación sobre el oficio, la amistad y la transmisión del conocimiento.' }
];

module.exports = `
<section class="podcast-hero">
  <div class="container podcast-hero__grid">
    <div class="reveal">
      <p class="eyebrow">Podcast · Vael de Ginés</p>
      <h1>La cabaña<br><em style="font-style:italic;color:var(--brass-light)">del luthier.</em></h1>
      <p>Conversaciones sobre luthería, artesanía y música. Un espacio para escuchar a quienes construyen, reparan y piensan los instrumentos desde dentro del taller.</p>
      <div class="podcast-platforms">
        <a class="btn btn--light btn--sm" href="https://www.youtube.com/watch?v=W8ileM09_CI" target="_blank" rel="noopener">Ver en YouTube ${icons.arrow}</a>
        <a class="btn btn--ghost-light btn--sm" href="https://www.ivoox.com/" target="_blank" rel="noopener">Escuchar en iVoox</a>
      </div>
    </div>
    <div class="podcast-cover reveal" data-delay="1">
      <img src="assets/img/podcast-cover.png" alt="Portada del podcast La cabaña del luthier" width="600" height="600">
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="split__body reveal">
      <p class="eyebrow">Sobre el podcast</p>
      <h2 class="h2">El oficio también<br><em>se escucha.</em></h2>
      <p class="lead">La cabaña del luthier nace con la idea de abrir el taller y compartir conversaciones con luthiers, músicos y artesanos.</p>
      <p class="text-muted">En cada episodio hablamos de maderas, técnicas, herramientas, historia del instrumento y de la vida alrededor de un oficio que se transmite de persona a persona. Sin prisa y sin guion cerrado.</p>
      <p class="text-muted">Puedes escucharlo mientras trabajas en el taller, vas en coche o preparas la siguiente pieza. Si tienes una propuesta o te gustaría participar, escríbeme.</p>
      <p style="margin-top:28px"><a class="link-arrow" href="contacto.html">Proponer un episodio ${icons.arrow}</a></p>
    </div>
    <div class="split__media reveal" data-delay="1">
      <div class="split__frame">
        <img src="assets/img/workshop-1.jpg" alt="Ginés Martínez trabajando en el taller mientras graba el podcast" loading="lazy">
      </div>
      <p class="split__caption">Grabado en el taller · Los Alcázares</p>
    </div>
  </div>
</section>

<section class="section section--cream">
  <div class="container">
    <div class="section-head">
      <div class="section-head__body">
        <p class="eyebrow">Episodios</p>
        <h2 class="h2">Conversaciones<br><em>de taller.</em></h2>
      </div>
      <a class="link-arrow" href="https://www.youtube.com/watch?v=W8ileM09_CI" target="_blank" rel="noopener">Ver en YouTube ${icons.arrow}</a>
    </div>
    <div class="episode-list">
      ${episodes.map((e) => `
      <article class="episode reveal">
        <span class="episode__num">${e.n}</span>
        <div>
          <h3>${e.title}</h3>
          <p>${e.desc}</p>
        </div>
        <a class="episode__play" href="https://www.youtube.com/watch?v=W8ileM09_CI" target="_blank" rel="noopener" aria-label="Escuchar ${e.title}">${icons.play}</a>
      </article>`).join('')}
    </div>
  </div>
</section>

${ctaBand({
  title: '¿Tienes una historia<br><em>que contar?</em>',
  text: 'Si eres luthier, músico o artesano y crees que tu trabajo merece una conversación, escríbeme. El podcast también se construye con las propuestas de quien escucha.',
  primary: `<a class="btn btn--light" href="contacto.html">Proponer un episodio ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="mentoria.html">Conocer la mentoría</a>`,
  image: 'assets/img/workshop-3.jpg'
})}
`;
