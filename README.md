# Vael de Ginés — Nueva web

Antes de hacer cambios, leer **`CLAUDE.md`**: contiene las pautas de arquitectura, diseño, datos, panel y publicación que debe seguir cualquier modificación.

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
├── producto-<slug>.html  Una ficha por cada producto del catálogo (11)
├── blog.html             Blog con filtros (27 artículos reales)
├── blog-<slug>.html      Una página por cada artículo del blog (27)
├── mentoria.html         Sesiones de mentoría y precios
├── podcast.html          La cabaña del luthier
├── contacto.html         Formulario de contacto + mapa
├── legal.html            Aviso legal, privacidad, cookies y devoluciones
├── 404.html              Página de error con el personaje animado
├── sitemap.xml, robots.txt, .htaccess   SEO, redirecciones 301 y caché (generados)
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
- **Una sola web para todos los dispositivos:** el mismo HTML se adapta al ancho de pantalla con media queries. No hay versión móvil separada ni redirecciones, así que no hay contenido duplicado. En móvil (≤780 px) aparece una barra inferior fija (Inicio, Guitarras, Tienda, Blog, Contacto), el titular del inicio va antes que la foto y el catálogo usa tarjetas compactas. Las URL antiguas `m/<página>` redirigen con 301 a `<página>`.
- **SEO:** cada página tiene URL canónica, Open Graph, meta description limpia y datos estructurados (LocalBusiness, WebSite, Product, BlogPosting, BreadcrumbList). `sitemap.xml`, `robots.txt` y `.htaccess` se generan en el build; `.htaccess` incluye las redirecciones 301 desde todas las URL de la antigua web WordPress.
- **Rendimiento:** imágenes en WebP con `srcset` (800 px para móvil, hasta 1600 px para escritorio), `width`/`height` reales, carga diferida y versión en la URL de CSS/JS para poder cachearlos un mes.
- **Conversión:** los botones de producto, mentoría, folclore y podcast abren el formulario de contacto con el interés y el asunto ya rellenados; las fichas ofrecen además «Preguntar por WhatsApp» con el nombre de la pieza.
- **Catálogo:** 11 productos con ficha propia (`producto-<slug>.html`), cada uno con sus fotografías reales, especificaciones, pestañas informativas y productos relacionados. Las fotos adicionales se descargan de la biblioteca de medios de Vael de Ginés.

## Responsive

- **Escritorio (>1024 px):** cabecera completa, megamenús, rejillas de 2–4 columnas.
- **Tableta (781–1024 px):** menú hamburguesa, rejillas de 2 columnas, apilado de bloques.
- **Móvil (≤780 px, ≤520 px):** una columna, botones a ancho completo, galería con miniaturas horizontales, formularios y filtros adaptados.
- Accesibilidad: enlace de salto, estados de foco, etiquetas ARIA, textos alternativos, `prefers-reduced-motion` y contenido visible sin JavaScript.

## Cómo regenerar las páginas

Las páginas HTML se generan desde plantillas para mantener cabecera, pie y componentes coherentes. Tras editar un archivo en `_tools/pages/` o en `_tools/layout.js`:

```powershell
node _tools/import-blog.js         # solo si quieres volver a descargar el blog
node _tools/import-products.js     # solo si quieres volver a descargar las fotos del catálogo
python _tools/optimize-images.py   # tras añadir o cambiar imágenes en assets/img
node _tools/build.js
```

Esto reescribe las 49 páginas HTML, `sitemap.xml`, `robots.txt` y `.htaccess`. Los datos limpios están en `_tools/data/` y las imágenes en `assets/img/`.

## Notas antes de publicar

- Sube todo menos `_tools/` (el `.htaccess` ya bloquea su acceso). Las redirecciones requieren Apache o LiteSpeed, lo habitual en hostings de WordPress.
- Las imágenes originales (jpg/png) se conservan como fuente y para las vistas previas sociales; las páginas cargan las versiones `-lg.webp` / `-sm.webp`.

- Los formularios son **demostraciones estáticas** (`data-demo`): validan y muestran un mensaje, pero no envían nada. Conéctalos a tu servicio de correo o backend.
- El mapa usa Google Maps incrustado; la dirección exacta del taller se ha dejado «al confirmar la cita». Sustitúyela si quieres mostrarla públicamente.
- Los textos legales son una base informativa: revísalos con asesoramiento legal antes de publicar.
- Los precios del catálogo son orientativos, como en la web original. Confirma los vigentes antes de publicar.

## Panel del taller (mismo sistema que la web de HezurAdar)

El catálogo de la tienda se gestiona desde **`/admin/`**. No hay base de datos para los productos: **el catálogo es el archivo `_tools/data/catalogo.json` y las fotos están en `assets/img/catalogo/`, dentro de este repositorio**.

- **Entrar:** con el usuario de Firebase Authentication (proyecto `vael-de-gines`, cuenta `vaeldeginesweb@gmail.com`). Solo entran los UID de `isAdmin()` en `firestore.rules`.
- **Token de GitHub:** la primera vez el panel pide un *fine-grained token* con acceso solo a `hezuradar/VaeldeGines` y permisos **Contents: Read and write** y **Actions: Read-only**. Se guarda en Firestore (`adminConfig/github`), legible solo por los administradores, y vale para cualquier dispositivo.
- **Guardar = publicar:** cada alta, cambio o borrado es un commit en `main`. El flujo **Publicar web** (`.github/workflows/publicar.yml`) optimiza las fotos, genera la web y la sube a **GitHub Pages** en 2 o 3 minutos. El panel muestra el estado.
- **Firestore** solo guarda el token del panel. Las reglas están en `firestore.rules`; si se cambian, hay que volver a publicarlas en la consola de Firebase → Firestore → Reglas.
- **Redirecciones:** GitHub Pages no lee `.htaccess`, así que al publicar se generan páginas de redirección para las URL antiguas de WordPress y de `m/` (variable `GENERAR_REDIRECCIONES=1`).
- **Todo es gratis:** GitHub Pages y Actions (repositorio público) y Firebase en el plan Spark.
