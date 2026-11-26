# Vael de Ginés — Nueva web

Rediseño completo del sitio del luthier **Vael de Ginés** (Ginés Martínez), construido en `D:\hezuradar\Vael\web-nueva`.

La web original (`web-estatica`) **no se ha modificado**. Todo el diseño nuevo está en esta carpeta.

## Cómo verla

Abre `index.html` en el navegador. No necesita servidor ni instalación: es HTML, CSS y JavaScript puro.

Para verla como en un servidor local, desde esta carpeta:

```powershell
python -m http.server 8000
```

y visita `http://localhost:8000`.

## Estructura

```
web-nueva/
├── index.html            Inicio
├── guitarras.html        Guitarras personalizadas + colección de autor
├── instrumentos.html     Instrumentos de folclore + FAQ
├── luthier.html          El taller, el proceso y reconocimientos
├── tienda.html           Catálogo con filtros y ordenación
├── producto.html         Ficha de Paloma (acceso directo)
├── producto-<slug>.html  Una ficha por cada producto del catálogo (11)
├── blog.html             Blog con filtros (27 artículos reales)
├── blog-<slug>.html      Una página por cada artículo del blog (27)
├── articulo.html         Acceso directo al artículo destacado
├── mentoria.html         Sesiones de mentoría y precios
├── podcast.html          La cabaña del luthier
├── contacto.html         Formulario de contacto + mapa
├── legal.html            Aviso legal, privacidad, cookies y devoluciones
├── m/                    Versión móvil dedicada (50 páginas + assets propios)
├── assets/
│   ├── css/styles.css    Sistema de diseño completo
│   ├── js/main.js        Menú móvil, filtros, pestañas, galería, formularios…
│   └── img/              Imágenes reales del taller (blog/ → fotos de los artículos)
└── _tools/               Código fuente de las plantillas y datos del blog
```

## Diseño

- **Estilo:** editorial de atelier — papel crema, nogal oscuro, latón dorado, tipografía serif para titulares y sans para texto.
- **Navegación:** cabecera superior fija y oscura con menú horizontal plano (sin desplegables), subrayado dorado en la sección activa, botón «Encargos» y menú desplegable en móvil. Inspirada en la web de Mariano Conde. Barra fina de progreso de lectura.
- **Categorías:** guitarras, instrumentos de folclore, maderas, libros/formación, mentoría y podcast, accesibles desde el menú, el catálogo y el pie de página.
- **Contenido:** textos en español extraídos de la web original y reorganizados para mayor claridad. Datos de contacto reales: `luthier@vaeldegines.com`, `+34 609 302 713`, Los Alcázares (Murcia).
- **Imágenes:** fotografías reales copiadas de `web-estatica/wp-content/uploads`, renombradas y optimizadas para esta estructura.
- **Blog completo:** 27 artículos descargados de `https://vaeldegines.com/blog/` mediante la API REST de WordPress, con sus textos íntegros y 76 fotografías. Cada artículo tiene su propia página (`blog-<slug>.html`) con la foto principal de fondo detrás del título, índice, navegación entre artículos, relacionados y enlace a la fuente original.
- **Versión móvil automática:** al abrir cualquier página en un teléfono o tableta, se redirige a `m/<página>`, una versión móvil dedicada y autocontenida. Se puede forzar la versión escritorio desde el botón «Versión escritorio» y volver a la móvil desde el pie de página. La elección se guarda en `localStorage`. La versión móvil incluye una barra inferior fija de navegación rápida (Inicio, Guitarras, Tienda, Blog, Contacto).
- **Responsive:** además, la versión escritorio sigue adaptándose a tabletas y móviles mediante media queries.
- **Catálogo:** 11 productos con ficha propia (`producto-<slug>.html`), cada uno con sus fotografías reales, especificaciones, pestañas informativas y productos relacionados. Las fotos adicionales se descargan de la biblioteca de medios de Vael de Ginés.

## Responsive

- **Escritorio (>1024 px):** cabecera completa, megamenús, rejillas de 2–4 columnas.
- **Tableta (781–1024 px):** menú hamburguesa, rejillas de 2 columnas, apilado de bloques.
- **Móvil (≤780 px, ≤520 px):** una columna, botones a ancho completo, galería con miniaturas horizontales, formularios y filtros adaptados.
- Accesibilidad: enlace de salto, estados de foco, etiquetas ARIA, textos alternativos, `prefers-reduced-motion` y contenido visible sin JavaScript.

## Cómo regenerar las páginas

Las páginas HTML se generan desde plantillas para mantener cabecera, pie y componentes coherentes. Tras editar un archivo en `_tools/pages/` o en `_tools/layout.js`:

```powershell
node _tools/import-blog.js      # solo si quieres volver a descargar el blog
node _tools/import-products.js  # solo si quieres volver a descargar las fotos del catálogo
node _tools/build.js
node _tools/build-mobile.js   # regenera la carpeta m/ tras cada build
```

Esto reescribe las 50 páginas HTML de la raíz y sus 50 equivalentes móviles en `m/`. Los datos limpios están en `_tools/data/` y las imágenes en `assets/img/`.

## Notas antes de publicar

- Los formularios son **demostraciones estáticas** (`data-demo`): validan y muestran un mensaje, pero no envían nada. Conéctalos a tu servicio de correo o backend.
- El mapa usa Google Maps incrustado; la dirección exacta del taller se ha dejado «al confirmar la cita». Sustitúyela si quieres mostrarla públicamente.
- Los textos legales son una base informativa: revísalos con asesoramiento legal antes de publicar.
- Los precios del catálogo son orientativos, como en la web original. Confirma los vigentes antes de publicar.
