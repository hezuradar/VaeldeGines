'use strict';
const { icons, ctaBand } = require('../layout');

module.exports = `
<section class="podcast-hero">
  <div class="container podcast-hero__grid">
    <div class="reveal">
      <p class="eyebrow">Podcast · Vael de Ginés</p>
      <h1>La cabaña<br><em style="font-style:italic;color:var(--brass-light)">del luthier.</em></h1>
      <p>Conversaciones sobre luthería, artesanía y música. Un espacio para escuchar a quienes construyen, reparan y piensan los instrumentos desde dentro del taller.</p>
      <div class="podcast-platforms">
        <a class="btn btn--light btn--sm" href="https://www.youtube.com/playlist?list=PLQ-vsegxn_5WBKskaEPoBPHoUU3QhfDbS" target="_blank" rel="noopener">Ver en YouTube ${icons.arrow}</a>
        <a class="btn btn--ghost-light btn--sm" href="https://www.ivoox.com/podcast-cabana-del-luthier_sq_f11192727_1.html" target="_blank" rel="noopener">Escuchar en iVoox</a>
      </div>

      <div class="podcast-support">
        <p class="podcast-support__title">💚 Apoya el proyecto</p>
        <p>Si disfrutas del contenido y quieres ayudarme a mantener vivo este proyecto, puedes apoyarlo en Ko-fi:</p>
        <a href="https://ko-fi.com/lacabanadelluthier" target="_blank" rel="noopener">☕ https://ko-fi.com/lacabanadelluthier</a>
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

${ctaBand({
  title: '¿Tienes una historia<br><em>que contar?</em>',
  text: 'Si eres luthier, músico o artesano y crees que tu trabajo merece una conversación, escríbeme. El podcast también se construye con las propuestas de quien escucha.',
  primary: `<a class="btn btn--light" href="contacto.html">Proponer un episodio ${icons.arrow}</a>`,
  secondary: `<a class="btn btn--ghost-light" href="mentoria.html">Conocer la mentoría</a>`,
  image: 'assets/img/workshop-3.jpg'
})}
`;
