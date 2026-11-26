'use strict';
const { SITE, icons } = require('../layout');

module.exports = `
<section class="page-header-simple">
  <div class="container">
    <p class="eyebrow eyebrow--center">Contacto</p>
    <h1 class="h2">Hablemos de <em>tu instrumento.</em></h1>
    <p>Cuéntame qué tienes en mente: una guitarra personalizada, un instrumento de folclore, una consulta sobre maderas o una visita al taller. Te responderé personalmente en un plazo de 24–48 h laborables.</p>
  </div>
</section>

<section class="section section--cream section--tight">
  <div class="container">
    <div class="section-head section-head--center">
      <div class="section-head__body">
        <p class="eyebrow eyebrow--center">Antes de escribir</p>
        <h2 class="h2">Tres cosas que <em>ayudan.</em></h2>
      </div>
    </div>
    <div class="feature-list feature-list--3">
      <div class="feature reveal">
        <span class="feature__num">01</span>
        <h3>Cuéntame el uso</h3>
        <p>Si es para concierto, estudio, enseñanza o tradición, cambia el instrumento y cambian las prioridades de construcción.</p>
      </div>
      <div class="feature reveal" data-delay="1">
        <span class="feature__num">02</span>
        <h3>Comparte referencias</h3>
        <p>Sonidos que te gustan, guitarras que has probado, maderas que te atraen. Las referencias ayudan más que los adjetivos.</p>
      </div>
      <div class="feature reveal" data-delay="2">
        <span class="feature__num">03</span>
        <h3>Di el plazo y el presupuesto</h3>
        <p>No hace falta que sea exacto. Saber el marco permite proponer un proyecto realista y ajustar las decisiones desde el principio.</p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container contact-grid">
    <div class="reveal">
      <p class="eyebrow">Escríbeme</p>
      <h2 class="h2" style="margin-bottom:28px">El primer paso es<br><em>contarlo.</em></h2>

      <form class="form" data-demo novalidate>
        <div class="field">
          <label for="nombre">Nombre y apellidos *</label>
          <input id="nombre" name="nombre" type="text" autocomplete="name" placeholder="Tu nombre" required>
        </div>
        <div class="field">
          <label for="email">Correo electrónico *</label>
          <input id="email" name="email" type="email" autocomplete="email" placeholder="tu@correo.com" required>
        </div>
        <div class="field">
          <label for="telefono">Teléfono</label>
          <input id="telefono" name="telefono" type="tel" autocomplete="tel" placeholder="Opcional">
        </div>
        <div class="field">
          <label for="interes">Me interesa</label>
          <select id="interes" name="interes">
            <option value="">Selecciona una opción</option>
            <option>Guitarra personalizada</option>
            <option>Instrumento de folclore</option>
            <option>Maderas</option>
            <option>Mentoría</option>
            <option>Podcast</option>
            <option>Visita al taller</option>
            <option>Otra consulta</option>
          </select>
        </div>
        <div class="field field--full">
          <label for="mensaje">Cuéntame tu proyecto *</label>
          <textarea id="mensaje" name="mensaje" placeholder="Qué instrumento buscas, cómo lo vas a usar, plazos, presupuesto aproximado…" required></textarea>
        </div>
        <div class="field field--full">
          <label class="checkbox" for="privacidad">
            <input id="privacidad" name="privacidad" type="checkbox" required>
            <span>He leído y acepto la <a href="legal.html#privacidad">política de privacidad</a> y el tratamiento de mis datos para responder a esta consulta. *</span>
          </label>
        </div>
        <div class="field--full">
          <button class="btn" type="submit">Enviar consulta ${icons.arrow}</button>
        </div>
        <p class="form__note">* Campos obligatorios. Este formulario es una demostración estática: no envía datos a ningún servidor.</p>
        <div class="form__success" role="status" tabindex="-1"></div>
      </form>
    </div>

    <aside class="contact-card reveal" data-delay="1">
      <h2>El taller</h2>
      <p>Visitas con cita previa. Si vienes a ver maderas o a probar un instrumento, avísame antes para prepararlo.</p>

      <div class="contact-list">
        <a href="${SITE.emailHref}">
          ${icons.mail}
          <span><strong>Correo</strong><span>${SITE.email}</span></span>
        </a>
        <a href="${SITE.phoneHref}">
          ${icons.phone}
          <span><strong>Teléfono</strong><span>${SITE.phone}</span></span>
        </a>
        <div>
          ${icons.pin}
          <span><strong>Taller</strong><span>Los Alcázares, Murcia<br><span class="text-muted" style="font-size:12.5px">Dirección exacta al confirmar la cita</span></span></span>
        </div>
        <div>
          ${icons.clock}
          <span><strong>Horario</strong><span>Lunes a viernes · 9:00–18:00<br><span class="text-muted" style="font-size:12.5px">Sábados, con cita previa</span></span></span>
        </div>
      </div>

      <div class="map-card">
        <div class="map-card__frame">
          <iframe title="Mapa de Los Alcázares, Murcia" src="https://www.google.com/maps?q=Los+Alc%C3%A1zares,+Murcia&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <span class="map-card__badge">El taller · Murcia</span>
        </div>
        <div class="map-card__foot">
          <div class="map-card__place">
            ${icons.pin}
            <span><strong>Los Alcázares</strong><small>Ver ubicación y cómo llegar</small></span>
          </div>
          <a class="map-card__link" href="https://www.google.com/maps/place/Los+Alc%C3%A1zares,+Murcia" target="_blank" rel="noopener">Abrir en Google Maps ${icons.arrow}</a>
        </div>
      </div>

      <div class="footer__social" style="margin-top:26px">
        <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram" style="border-color:var(--line);color:var(--ink-2)">${icons.instagram}</a>
        <a href="${SITE.youtube}" target="_blank" rel="noopener" aria-label="YouTube" style="border-color:var(--line);color:var(--ink-2)">${icons.youtube}</a>
        <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook" style="border-color:var(--line);color:var(--ink-2)">${icons.facebook}</a>
      </div>
    </aside>
  </div>
</section>

`;
