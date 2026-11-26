'use strict';
const { SITE, icons } = require('../layout');

module.exports = `
<section class="page-header-simple">
  <div class="container">
    <p class="eyebrow eyebrow--center">Información legal</p>
    <h1 class="h2">Aviso legal, privacidad<br><em>y condiciones.</em></h1>
    <p>Transparencia sobre quién está detrás de este sitio, cómo se tratan los datos y qué condiciones se aplican a los encargos.</p>
  </div>
</section>

<section class="section">
  <div class="container legal-layout">
    <nav class="legal-nav" aria-label="Índice legal">
      <a href="#aviso">Aviso legal</a>
      <a href="#privacidad">Privacidad</a>
      <a href="#cookies">Cookies</a>
      <a href="#devoluciones">Devoluciones y garantía</a>
    </nav>

    <div>
      <section class="legal-section" id="aviso">
        <h2>Aviso legal</h2>
        <p>Este sitio web es una página informativa del taller artesanal <strong>Vael de Ginés</strong>, dedicado a la construcción de guitarras personalizadas e instrumentos de folclore.</p>
        <h3>Titular</h3>
        <ul>
          <li>Titular: Ginés Martínez · Vael de Ginés</li>
          <li>Actividad: luthería artesanal</li>
          <li>Domicilio profesional: Los Alcázares, Murcia (España)</li>
          <li>Correo electrónico: ${SITE.email}</li>
          <li>Teléfono: ${SITE.phone}</li>
        </ul>
        <h3>Objeto</h3>
        <p>La web tiene carácter informativo y comercial: presenta el taller, los instrumentos, el proceso de encargo, la mentoría y el podcast. La información publicada puede actualizarse sin previo aviso.</p>
        <h3>Propiedad intelectual</h3>
        <p>Los textos, fotografías, diseños, logotipos y demás contenidos de este sitio pertenecen a su titular o se utilizan con autorización. No se permite su reproducción, distribución o transformación sin consentimiento expreso.</p>
        <h3>Responsabilidad</h3>
        <p>El titular no se responsabiliza de los daños derivados de un uso indebido del sitio ni de las interrupciones ajenas a su control. Los enlaces a sitios externos se ofrecen como referencia y no implican responsabilidad sobre sus contenidos.</p>
        <h3>Legislación aplicable</h3>
        <p>La relación entre el titular y el usuario se rige por la legislación española. Para cualquier controversia serán competentes los juzgados y tribunales que correspondan conforme a derecho.</p>
      </section>

      <section class="legal-section" id="privacidad">
        <h2>Política de privacidad</h2>
        <p>Esta política explica qué datos se recogen a través de este sitio, con qué finalidad y qué derechos tienes sobre ellos.</p>
        <h3>Responsable del tratamiento</h3>
        <p>Ginés Martínez · Vael de Ginés, con domicilio profesional en Los Alcázares (Murcia) y correo de contacto ${SITE.email}.</p>
        <h3>Datos que se recogen</h3>
        <p>A través del formulario de contacto se pueden recoger los siguientes datos: nombre, correo electrónico, teléfono (opcional), motivo de la consulta y el contenido del mensaje. No se solicitan datos especialmente protegidos.</p>
        <h3>Finalidad y base jurídica</h3>
        <p>Los datos se utilizan exclusivamente para responder a la consulta, preparar un presupuesto o gestionar la relación derivada del encargo. La base jurídica es el consentimiento del interesado y, en su caso, la ejecución de un contrato.</p>
        <h3>Conservación</h3>
        <p>Los datos se conservan durante el tiempo necesario para atender la consulta y, si existe encargo, durante los plazos legales aplicables. Después se eliminan o se anonimizan.</p>
        <h3>Destinatarios</h3>
        <p>No se ceden datos a terceros salvo obligación legal o necesidad imprescindible para prestar el servicio (por ejemplo, transporte del instrumento), en cuyo caso se informará al cliente.</p>
        <h3>Derechos</h3>
        <p>Puedes solicitar el acceso, la rectificación, la supresión, la limitación, la portabilidad o la oposición al tratamiento escribiendo a ${SITE.email}. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
        <h3>Newsletter</h3>
        <p>Si te suscribes a la newsletter, el correo se utilizará únicamente para enviar novedades del taller. Puedes darte de baja en cualquier momento desde el enlace incluido en cada envío.</p>
      </section>

      <section class="legal-section" id="cookies">
        <h2>Política de cookies</h2>
        <p>Este sitio utiliza únicamente cookies y almacenamiento técnico necesario para su funcionamiento. No se utilizan cookies publicitarias ni de perfilado sin consentimiento.</p>
        <h3>Qué son las cookies</h3>
        <p>Son pequeños archivos que se almacenan en tu dispositivo al visitar una web y que permiten recordar información sobre la navegación.</p>
        <h3>Cookies utilizadas</h3>
        <ul>
          <li><strong>Técnicas:</strong> necesarias para el funcionamiento básico del sitio.</li>
          <li><strong>Preferencias:</strong> recuerdan decisiones como el consentimiento de cookies.</li>
          <li><strong>De terceros:</strong> los mapas incrustados de Google Maps pueden establecer sus propias cookies. Puedes consultar su política en google.com.</li>
        </ul>
        <h3>Cómo desactivarlas</h3>
        <p>Puedes borrar o bloquear las cookies desde la configuración de tu navegador. Si las desactivas, algunas funciones del sitio —como el mapa— pueden no mostrarse correctamente.</p>
      </section>

      <section class="legal-section" id="devoluciones">
        <h2>Devoluciones y garantía</h2>
        <p>Los instrumentos de este taller se construyen por encargo y se ajustan a las características acordadas con cada cliente. Por ese motivo, las condiciones de devolución y garantía se explican por escrito antes de formalizar el encargo.</p>
        <h3>Instrumentos por encargo</h3>
        <p>Al tratarse de bienes confeccionados conforme a especificaciones del consumidor, se aplica la excepción al derecho de desistimiento prevista en la normativa de consumo. El cliente recibe toda la información antes de confirmar el proyecto.</p>
        <h3>Garantía</h3>
        <p>Todos los instrumentos cuentan con garantía frente a defectos de fabricación conforme a la legislación vigente. La garantía no cubre el desgaste natural, los daños por golpes, las variaciones de humedad mal controladas ni las intervenciones realizadas por terceros.</p>
        <h3>Productos y materiales</h3>
        <p>Los productos disponibles —maderas, libros y otros materiales— se rigen por la normativa general de consumo. Para cualquier incidencia, contacta con el taller indicando el número de pedido.</p>
        <h3>Cómo ejercer una reclamación</h3>
        <p>Escribe a ${SITE.email} explicando el caso y adjuntando, si es posible, fotografías y el justificante de compra. Se responderá en el menor plazo posible y se buscará una solución acordada.</p>
        <h3>Resolución de conflictos</h3>
        <p>Como consumidor puedes acudir a las juntas arbitrales de consumo o a los organismos de resolución alternativa de litigios competentes en España.</p>
      </section>

      <p class="text-muted" style="font-size:12px;line-height:1.7">Última actualización: noviembre de 2026. Este texto es una base informativa y debe revisarse con asesoramiento legal antes de su publicación definitiva.</p>
      <p style="margin-top:22px"><a class="link-arrow" href="contacto.html">Contactar con el taller ${icons.arrow}</a></p>
    </div>
  </div>
</section>
`;
