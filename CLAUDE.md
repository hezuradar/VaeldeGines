# Pautas de trabajo — Vael de Ginés

Este documento describe **cómo está construida la web ahora**. Cualquier cambio futuro debe respetar esta arquitectura, el diseño actual y el flujo de publicación. (Los cambios de Claude del 27–28/11/2026 son la base de estas pautas.)

---

## 1. Arquitectura: HTML generado, no editado a mano

- Todo el HTML se **genera** con `node _tools/build.js` desde:
  - `_tools/layout.js` → cabecera, pie, barra inferior, `page()`, componentes (`pageHero`, `ctaBand`, `guitarCard`, `postCard`, `waLink`, `contactUrl`).
  - `_tools/pages/*.js` → cuerpo de cada página.
  - `_tools/data/*` → datos (blog, catálogo, imágenes, Firebase).
- **Nunca editar directamente** `index.html`, `tienda.html`, los `blog-*.html`, los `producto-*.html`, `404.html`, `sitemap.xml`, `robots.txt`, `.htaccess` ni `admin/firebase-config.js`: el build los sobrescribe.
- Tras cualquier cambio en plantillas o datos: `node _tools/build.js`.
- Tras añadir/cambiar imágenes: `python _tools/optimize-images.py` y después el build.
- El build en local elimina `articulo.html` y `producto.html` (duplicados redirigidos). No recrearlos.

## 2. Fuente de datos del catálogo (importante)

- La **fuente de verdad del catálogo es `_tools/data/catalogo.json`**, editada por el panel `/admin`.
- `_tools/data/catalog.js` normaliza ese JSON (o usa `products.js` como fallback si no existe), escapa todos los textos con `escapeHtml`, valida rutas de imagen y aplica defaults.
- Los productos pueden tener: `publicado`, `portada` (mostrar en la colección de la portada), `orden`, `disponibilidad`, `lema`, `resumen`, `specs` (`{nombre,valor}`), `gallery` e `image`.
- Las fotos subidas desde el panel se referencian como `foto:<id>` y viven en `assets/img/catalogo/`; `safeImage()` resuelve la ruta.
- **Firestore NO guarda productos**: solo el documento `adminConfig/github` con el token de GitHub del panel. No migrar el catálogo a Firestore.
- Estado actual del repositorio: `catalogo.json` tiene 12 entradas (incluye una pieza de prueba `prueba` creada desde el panel y `libro-guitarra-lutheria` despublicada); el build publica 10 y la colección de portada cuenta 6 guitarras.

## 3. Panel de administración y publicación

- `/admin` son módulos ES: `admin.js`, `editor.js`, `github.js`, `fotos.js`, `publicar.js`, `admin.css`, `firebase-config.js` (generado).
- Login con Firebase Authentication (CDN 10.12.2). Solo entran los UID permitidos en `firestore.rules` (`isAdmin()`).
- El token de GitHub se lee/escribe en Firestore; **nunca se guarda en el código ni en el repositorio**.
- `github.js`: repo `hezuradar/VaeldeGines`, rama `main`, catálogo `_tools/data/catalogo.json`, fotos `assets/img/catalogo/`. Cada guardado es un commit.
- `publicar.js` sigue el estado del workflow «Publicar web» (GitHub Actions). La web se actualiza sola en 2–3 minutos.
- En la publicación se añaden `?v=<hash>` a los módulos del panel para evitar mezclas de caché.
- No cambiar las reglas de Firestore sin publicarlas también en la consola de Firebase.

## 4. Diseño y componentes

- Estilo **editorial de atelier**: papel crema, nogal oscuro, latón dorado, serif (`Cormorant Garamond`) para titulares y sans (`Jost`) para texto.
- Usar siempre los tokens de `:root` (`--paper`, `--ink`, `--brass`, `--serif`, `--sans`, `--container`, `--section`, `--ease`, …). Evitar colores/valores sueltos si existe token.
- Reutilizar componentes y clases existentes: `.container`, `.section` (+ `--tight`, `--cream`, `--warm`, `--dark`, `--line`), `.eyebrow`, `.h2`, `.lead`, `.btn`, `.link-arrow`, `.reveal`, `.section-head`, `.card`s.
- Nuevas secciones: ponerlas en `_tools/pages/*.js`, con `reveal` en los bloques y `data-delay` para escalonar.
- La portada usa `.hero.hero--overlay`: foto de guitarras desenfocada de fondo, texto encima y degradado crema. **No hay etiqueta «Nº 01 Paloma» en el hero**.
- Sello lateral fijo de Homo Faber (`.hf-tab`) y botón flotante de WhatsApp (`.wa-float`) los inyecta `layout.js` en todas las páginas; no duplicarlos en las plantillas.

## 5. Responsive y navegación

- **Una sola web responsive**: NO existe carpeta `m/`, NO hay redirect por dispositivo ni botones de «versión móvil/escritorio». Las URL `m/*` redirigen 301 al mismo HTML.
- Media queries existentes: `1180`, `1024`, `780`, `520`. En móvil (≤780): una columna, botones full-width, fichas de catálogo horizontales compactas.
- Barra inferior móvil (`.mobile-tabbar`) con 5 items: **Inicio, Guitarras, Tienda, Folclore, Contacto**. «Blog» NO está en la barra (sustituido por Folclore). Si cambia la navegación, actualizar `navItems`, `tabItems` en `layout.js` y el `active` en `build.js`.
- Cabecera fija oscura con menú plano, underline dorado en el activo, botón «Encargos», hamburguesa de 2 líneas y barra de progreso de lectura.

## 6. Imágenes

- Las imágenes fuente (jpg/png/webp) se conservan en `assets/img/`. `optimize-images.py` genera `-lg.webp` (máx. 1600 px) y `-sm.webp` (800 px si supera 900 px) y escribe `_tools/data/images.json`.
- En las plantillas se pone siempre la **ruta original** (`assets/img/...`); `images.js` sustituye la etiqueta por `src` WebP + `srcset` + `sizes` + `width`/`height` + `loading="lazy"` + `decoding="async"`. No referenciar `-lg`/`-sm` a mano.
- Toda imagen decorativa lleva `alt=""`; el resto, alt descriptivo en español.
- Las fotos del catálogo subidas por el panel van en `assets/img/catalogo/` y se referencian con `foto:<id>` en `catalogo.json`.

## 7. SEO, datos estructurados y conversiones

- `build.js` genera canónica, Open Graph, Twitter Card, `sitemap.xml`, `robots.txt` y JSON-LD (LocalBusiness, WebSite, Product, BlogPosting, BreadcrumbList). Usar `absUrl()` y `SITE.url`.
- Meta description ≤158 caracteres (`describe()`), título ≤65 (`titleFor()`). Al añadir páginas, completar `title`, `description`, `active`, `body` y, si aplica, `jsonLd`, `image`, `priority`, `lastmod`, `waText`.
- Enlaces al formulario: `contactUrl(interes, asunto)`; `main.js` precarga `?interes=` y `?asunto=`.
- WhatsApp: `waLink(texto)`; el texto por defecto se personaliza por producto con `waText` en `build.js`.
- Idioma español en todo el contenido; datos reales de contacto: `luthier@vaeldegines.com`, `+34 609 302 713`, Los Alcázares (Murcia).

## 8. JavaScript

- Un único `assets/js/main.js` (IIFE, `'use strict'`), helpers `$`/`$$`, `prefersReduced`, `IntersectionObserver`, listeners `passive`. Sin frameworks.
- Funciones existentes: menú móvil, barra de progreso, `reveal`, gráficas circulares de impacto, testimonios, tabs, galería, filtros de tienda/blog, ordenación, formularios, limpieza de `vdg-view`, prellenado de contacto, año, subnav activo, newsletter.
- Mantener degradación graceful: contenido visible sin JS (`noscript` para `.reveal`), valores finales en las gráficas si no hay JS, y comprobación de features.

## 9. Blog y páginas de producto

- 27 artículos en `_tools/data/blog.js` (importados de la API REST de WordPress). Cada `blog-<slug>.html` se genera con foto de fondo en el título, índice, artículos relacionados y enlace a la fuente. No editar a mano.
- Cada producto publicado del catálogo genera `producto-<slug>.html` desde `_tools/pages/producto.js`.
- Excepción actual: **Mentoría** muestra dos opciones (45 € sesión / 400 € pack 10), sin lista de specs ni pestaña «Entrega y garantía».
- Las tarjetas de la colección de autor usan `guitarrasPortada` (flag `portada` del panel); el titular calcula el número con `enLetras()`.

## 10. Redirecciones y publicación

- `_tools/redirects.js` genera las redirecciones 301 de las URL antiguas de WordPress y de `m/` (tanto `.htaccess` como páginas stub para GitHub Pages). GitHub Pages no lee `.htaccess`.
- `SITE_BASE` y `GENERAR_REDIRECCIONES=1` los pone el workflow `publicar.yml`; no hace falta definirlos en local.
- No reintroducir la versión móvil separada ni los antiguos archivos `articulo.html`/`producto.html`.

## 11. Checklist antes de dar por terminado un cambio

1. Editar solo plantillas/datos, nunca HTML generado.
2. Si hay imágenes nuevas: `python _tools/optimize-images.py`.
3. `node _tools/build.js`.
4. Comprobar enlaces e imágenes, consola JS, y vista en escritorio y móvil (mismo HTML).
5. Verificar que no aparece contenido duplicado ni restos de la antigua versión `m/`.
6. Confirmar que el cambio respeta los tokens de diseño, los componentes de `layout.js` y el flujo de publicación por GitHub Actions.
