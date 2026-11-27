'use strict';
/* Genera .htaccess (Apache / LiteSpeed): redirecciones 301 desde las URL de
   la antigua web WordPress y de la antigua versión móvil m/, página 404,
   compresión y caché de recursos estáticos.                                 */

const STATIC_REDIRECTS = [
  ['blog(/.*)?', 'blog.html'],
  ['category/.*', 'blog.html'],
  ['tag/.*', 'blog.html'],
  ['author/.*', 'blog.html'],
  ['guitarras-personalizadas/?', 'guitarras.html'],
  ['guitarra-artesanal-murcia/?', 'guitarras.html'],
  ['guitarras-de-luthier-murcia/?', 'guitarras.html'],
  ['instrumentos-de-folclore/?', 'instrumentos.html'],
  ['mentoria/?', 'mentoria.html'],
  ['podcast/?', 'podcast.html'],
  ['la-cabana-del-luthier[^/]*/?', 'podcast.html'],
  ['tienda/?', 'tienda.html'],
  ['carrito/?', 'tienda.html'],
  ['finalizar-compra/?', 'tienda.html'],
  ['producto/.*', 'tienda.html'],
  ['alguna-pregunta-aqui-el-formulario-de-contacto/?', 'contacto.html'],
  ['contacto/?', 'contacto.html'],
  ['aviso-legal/?', 'legal.html#aviso'],
  ['politica-de-privacidad/?', 'legal.html#privacidad'],
  ['politica-de-cookies/?', 'legal.html#cookies'],
  ['reembolso_devoluciones/?', 'legal.html#devoluciones'],
  ['terminos-y-condiciones/?', 'legal.html'],
  ['prueba-inicio/?', ''],
  ['articulo\\.html', 'blog-guitarra-clasica-vs-flamenca-luthier.html'],
  ['producto\\.html', 'producto-paloma.html'],
  ['m/?', ''],
  ['m/(.+)', '$1']
];

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** @param {{slug: string, file: string}[]} articles */
function buildHtaccess(articles) {
  const rules = [
    ...STATIC_REDIRECTS,
    ...articles.map((a) => [`${escapeRegex(a.slug)}/?`, a.file])
  ].map(([from, to]) => `RewriteRule ^${from}$ /${to} [R=301,L,NE]`);

  return `# Generado por _tools/build.js. No editar a mano.
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
RewriteEngine On

# HTTPS y dominio sin www
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\\. [NC]
RewriteRule ^(.*)$ https://vaeldegines.com/$1 [R=301,L,NE]

# /index.html -> /
RewriteCond %{THE_REQUEST} \\s/index\\.html[\\s?]
RewriteRule ^index\\.html$ / [R=301,L]

# Las herramientas de generación no se publican
RewriteRule ^_tools(/|$) - [F,L]

# URL de la antigua web WordPress y de la antigua versión móvil
${rules.join('\n')}
</IfModule>

<IfModule mod_headers.c>
Header always set X-Content-Type-Options "nosniff"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set X-Frame-Options "SAMEORIGIN"
</IfModule>

<IfModule mod_deflate.c>
AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml application/xml text/plain
</IfModule>

<IfModule mod_expires.c>
ExpiresActive On
ExpiresDefault "access plus 1 hour"
ExpiresByType text/html "access plus 0 seconds"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"
ExpiresByType image/webp "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType image/gif "access plus 1 year"
ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
`;
}

/* ---------- GitHub Pages: páginas de redirección ---------- */

// Categorías del antiguo blog de WordPress (vaeldegines.com/category/<nombre>/).
const WP_CATEGORIES = ['cnc', 'guitarra', 'guitarras-artesanales', 'herramientas', 'libros', 'luthier', 'maderas', 'materiales', 'ukelele', 'violin'];

// Mismas equivalencias que STATIC_REDIRECTS, pero como direcciones concretas.
const STUB_DIRS = [
  ['blog', 'blog.html'], ['blog/page/2', 'blog.html'], ['blog/page/3', 'blog.html'],
  ...WP_CATEGORIES.map((c) => [`category/${c}`, 'blog.html']),
  ['guitarras-personalizadas', 'guitarras.html'], ['guitarra-artesanal-murcia', 'guitarras.html'],
  ['guitarras-de-luthier-murcia', 'guitarras.html'], ['instrumentos-de-folclore', 'instrumentos.html'],
  ['mentoria', 'mentoria.html'], ['podcast', 'podcast.html'],
  ['la-cabana-del-luthier-temporada-1-2', 'podcast.html'], ['la-cabana-del-luthier-temporada-2', 'podcast.html'],
  ['la-cabana-del-luthier-temporada-2-2', 'podcast.html'],
  ['tienda', 'tienda.html'], ['carrito', 'tienda.html'], ['finalizar-compra', 'tienda.html'],
  ['alguna-pregunta-aqui-el-formulario-de-contacto', 'contacto.html'], ['contacto', 'contacto.html'],
  ['aviso-legal', 'legal.html#aviso'], ['politica-de-privacidad', 'legal.html#privacidad'],
  ['politica-de-cookies', 'legal.html#cookies'], ['reembolso_devoluciones', 'legal.html#devoluciones'],
  ['terminos-y-condiciones', 'legal.html'], ['prueba-inicio', 'index.html']
];

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Página mínima que redirige al destino (relativo, para funcionar con o sin dominio propio). */
function stubHtml(file, target) {
  const depth = file.split('/').length - 1;
  const url = escapeAttr(`${'../'.repeat(depth)}${target}`);
  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${url}">
<link rel="canonical" href="${escapeAttr(`https://vaeldegines.com/${target}`)}">
<title>Esta página ha cambiado de dirección · Vael de Ginés</title>
<script>location.replace(${JSON.stringify(`${'../'.repeat(depth)}${target}`)});</script>
</head>
<body><p>Esta página ha cambiado de dirección. <a href="${url}">Ir a la nueva página</a>.</p></body>
</html>
`;
}

/**
 * Lista de páginas de redirección para GitHub Pages (que no admite .htaccess).
 * @param {{slug: string, file: string}[]} articles
 * @param {string[]} pageFiles páginas generadas (para la antigua versión móvil m/)
 * @returns {{file: string, html: string}[]}
 */
function buildRedirectStubs(articles, pageFiles) {
  const entries = [
    ...STUB_DIRS.map(([dir, target]) => [`${dir}/index.html`, target]),
    ...articles.map((a) => [`${a.slug}/index.html`, a.file]),
    ['articulo.html', 'blog-guitarra-clasica-vs-flamenca-luthier.html'],
    ['producto.html', 'producto-paloma.html'],
    ['m/index.html', 'index.html'],
    ...pageFiles.filter((f) => f !== '404.html').map((f) => [`m/${f}`, f])
  ];
  return entries.map(([file, target]) => ({ file, html: stubHtml(file, target) }));
}

module.exports = { buildHtaccess, buildRedirectStubs };
