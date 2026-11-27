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

module.exports = { buildHtaccess };
