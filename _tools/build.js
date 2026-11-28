'use strict';
/* Genera todas las páginas del sitio, más sitemap.xml, robots.txt, .htaccess
   y 404.html. Una sola versión responsive: no hay copia móvil separada.     */

const fs = require('fs');
const path = require('path');
const { page, SITE, absUrl } = require('./layout');
const articlePage = require('./pages/article');
const productPage = require('./pages/producto');
const articles = require('./data/blog');
const products = require('./data/catalog');
const { CATEGORIES } = products;
const { optimizeImages } = require('./images');
const { buildHtaccess, buildRedirectStubs } = require('./redirects');

// Ruta en la que se sirve la web: «/» con dominio propio, «/VaeldeGines/» en hezuradar.github.io.
const SITE_BASE = `${(process.env.SITE_BASE || '').replace(/\/+$/, '')}/`;

const root = path.join(__dirname, '..');
const BUILD_DATE = new Date().toISOString().slice(0, 10);
const MAX_DESCRIPTION = 158;
const MAX_TITLE = 65;

/* ---------- Datos estructurados (schema.org) ---------- */

const business = {
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#taller`,
  name: SITE.name,
  description: 'Luthería artesanal: guitarras personalizadas e instrumentos de folclore construidos a mano.',
  url: `${SITE.url}/`,
  logo: `${SITE.url}/assets/img/logo.png`,
  image: `${SITE.url}/${SITE.defaultImage}`,
  telephone: SITE.phone.replace(/\s/g, ''),
  email: SITE.email,
  priceRange: '€€€',
  address: { '@type': 'PostalAddress', addressLocality: 'Los Alcázares', addressRegion: 'Murcia', addressCountry: 'ES' },
  areaServed: 'ES',
  founder: { '@type': 'Person', name: 'Ginés Martínez', jobTitle: 'Luthier' },
  sameAs: [SITE.instagram, SITE.facebook]
};

const website = { '@type': 'WebSite', '@id': `${SITE.url}/#web`, name: SITE.name, url: `${SITE.url}/`, inLanguage: 'es-ES', publisher: { '@id': business['@id'] } };

const breadcrumb = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, file], i) => ({ '@type': 'ListItem', position: i + 1, name, item: absUrl(file) }))
});

const AVAILABILITY = { guitarras: 'MadeToOrder', folclore: 'MadeToOrder', formacion: 'InStock' };

function productSchema(p) {
  const availability = AVAILABILITY[p.cat];
  return {
    '@type': 'Product',
    name: p.name,
    description: `${p.subtitle} ${p.desc}`,
    image: p.gallery.map((src) => `${SITE.url}/${src}`),
    brand: { '@type': 'Brand', name: SITE.name },
    category: p.label,
    offers: {
      '@type': 'Offer',
      url: absUrl(`producto-${p.slug}.html`),
      priceCurrency: 'EUR',
      price: p.price,
      ...(availability ? { availability: `https://schema.org/${availability}` } : {}),
      seller: { '@id': business['@id'] }
    }
  };
}

function articleSchema(a) {
  return {
    '@type': 'BlogPosting',
    headline: a.title,
    description: describe(a.excerpt),
    image: `${SITE.url}/${a.image}`,
    datePublished: a.iso,
    inLanguage: 'es-ES',
    mainEntityOfPage: absUrl(a.file),
    author: { '@type': 'Person', name: 'Ginés Martínez' },
    publisher: { '@id': business['@id'] }
  };
}

/* ---------- Textos SEO ---------- */

/** Recorta un extracto de WordPress a una meta description limpia. */
function describe(text) {
  const clean = text.replace(/\s*[…]+$|\.{3}$/, '').replace(/\s+/g, ' ').trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > 90) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '')}…`;
}

const titleFor = (name) => (`${name} · ${SITE.name}`.length <= MAX_TITLE ? `${name} · ${SITE.name}` : name);

/* ---------- Páginas ---------- */

const productFile = (p) => `producto-${p.slug}.html`;

const pages = [
  { file: 'index.html', active: '', title: 'Vael de Ginés · Guitarras artesanales e instrumentos de folclore', description: 'Luthería artesanal en Los Alcázares (Murcia). Guitarras personalizadas, instrumentos de folclore y mentoría con Ginés Martínez.', body: require('./pages/home'), jsonLd: [business, website], priority: '1.0' },
  { file: 'guitarras.html', active: 'guitarras', title: 'Guitarras personalizadas · Vael de Ginés', description: 'Guitarras de autor construidas a mano y diseñadas junto a cada músico. Colección Paloma, Golden Whale, Freya, Camino, Jaguar y Venus.', body: require('./pages/guitarras'), priority: '0.9' },
  { file: 'instrumentos.html', active: 'instrumentos', title: 'Instrumentos de folclore · Vael de Ginés', description: 'Guitarro murciano, laúd, bandurria y guitarra mayor. Instrumentos tradicionales construidos artesanalmente en Murcia.', body: require('./pages/instrumentos'), priority: '0.9' },
  { file: 'luthier.html', active: 'taller', title: 'El taller y el luthier · Vael de Ginés', description: 'Conoce a Ginés Martínez, luthier artesanal en Los Alcázares (Murcia), su proceso de trabajo y sus reconocimientos.', body: require('./pages/luthier'), jsonLd: [business], priority: '0.8' },
  { file: 'tienda.html', active: 'tienda', title: 'Catálogo de instrumentos y maderas · Vael de Ginés', description: 'Catálogo del taller: guitarras de autor, instrumentos de folclore, maderas seleccionadas, libros y mentoría.', body: require('./pages/tienda'), priority: '0.8' },
  { file: 'blog.html', active: 'blog', title: 'Blog · Cuaderno del taller · Vael de Ginés', description: 'Artículos sobre maderas, luthería, guitarras artesanales y cuidados del instrumento, escritos desde el taller de Vael de Ginés.', body: require('./pages/blog'), priority: '0.7' },
  { file: 'mentoria.html', active: 'mentoria', title: 'Mentoría y consultoría · Vael de Ginés', description: 'Sesiones de mentoría 1:1 sobre luthería, artesanía y negocio. 45 € por sesión o 400 € el pack de diez.', body: require('./pages/mentoria'), priority: '0.7' },
  { file: 'podcast.html', active: 'podcast', title: 'La cabaña del luthier · Podcast · Vael de Ginés', description: 'Podcast de Vael de Ginés: conversaciones sobre luthería, artesanía y música con luthiers, músicos y artesanos.', body: require('./pages/podcast'), priority: '0.6' },
  { file: 'contacto.html', active: 'contacto', title: 'Contacto · Vael de Ginés', description: 'Escríbeme para hablar de tu guitarra personalizada, un instrumento de folclore o una visita al taller en Los Alcázares.', body: require('./pages/contacto'), jsonLd: [business], priority: '0.8' },
  { file: 'legal.html', active: 'legal', title: 'Aviso legal, privacidad y cookies · Vael de Ginés', description: 'Información legal, política de privacidad, cookies y condiciones de devolución y garantía de Vael de Ginés.', body: require('./pages/legal'), priority: '0.2' },
  { file: '404.html', active: '', title: 'Página no encontrada · Vael de Ginés', description: 'La página que buscas no existe o ha cambiado de dirección.', body: require('./pages/404'), noindex: true, baseHref: SITE_BASE, sitemap: false },

  ...articles.map((a) => ({
    file: a.file, active: 'blog', title: titleFor(a.title), description: describe(a.excerpt),
    body: articlePage(a), image: a.image, type: 'article', lastmod: a.iso.slice(0, 10), priority: '0.6',
    jsonLd: [articleSchema(a), breadcrumb([['Inicio', 'index.html'], ['Blog', 'blog.html'], [a.title, a.file]])]
  })),

  ...products.map((p) => ({
    file: productFile(p),
    active: p.slug === 'mentoria' ? 'mentoria' : (p.cat === 'guitarras' ? 'guitarras' : 'tienda'),
    title: titleFor(`${p.name} · ${p.label}`), description: describe(`${p.name}: ${p.desc} ${p.subtitle}`),
    body: productPage(p), image: p.image, type: 'product', priority: '0.8',
    waText: `Hola, me interesa ${p.name} (${p.label}). ¿Podemos hablar?`,
    jsonLd: [productSchema(p), breadcrumb([['Inicio', 'index.html'], ['Tienda', 'tienda.html'], [p.name, productFile(p)]])]
  }))
];

/* ---------- Escritura ---------- */

const write = (file, content) => fs.writeFileSync(path.join(root, file), content, 'utf8');

/** Configuración pública de Firebase (solo inicio de sesión del panel y su token de GitHub). */
function writeAdminFiles() {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'firebase-config.json'), 'utf8'));
  write('admin/firebase-config.js', `// Generado por _tools/build.js. Configuración pública (no es secreta).\nexport const firebaseConfig = ${JSON.stringify(config, null, 2)};\n`);
  fs.rmSync(path.join(root, 'admin', 'catalogo-inicial.json'), { force: true });
}

/**
 * Panel: añade ?v=<huella> a sus módulos y estilos al publicar. GitHub Pages guarda los archivos
 * en caché 10 minutos; sin versión, el navegador podía mezclar un módulo nuevo con otro antiguo
 * y el panel no arrancaba. Solo se hace en la copia que se publica (no en el repositorio).
 */
function versionAdminAssets() {
  const dir = path.join(root, 'admin');
  const files = fs.readdirSync(dir).filter((f) => /\.(js|css)$/.test(f)).sort();
  const hash = require('crypto').createHash('sha1');
  files.forEach((f) => hash.update(fs.readFileSync(path.join(dir, f))));
  const v = hash.digest('hex').slice(0, 10);
  files.filter((f) => f.endsWith('.js')).forEach((f) => {
    const file = path.join(dir, f);
    const code = fs.readFileSync(file, 'utf8').replace(/(from\s+'\.\/[\w-]+\.js)'/g, `$1?v=${v}'`);
    fs.writeFileSync(file, code, 'utf8');
  });
  const htmlFile = path.join(dir, 'index.html');
  const html = fs.readFileSync(htmlFile, 'utf8')
    .replace('src="admin.js"', `src="admin.js?v=${v}"`)
    .replace('href="admin.css"', `href="admin.css?v=${v}"`);
  fs.writeFileSync(htmlFile, html, 'utf8');
}

/** GitHub Pages no lee .htaccess: las URL antiguas se resuelven con páginas que redirigen. */
function writeRedirectStubs() {
  buildRedirectStubs(articles, pages.map((p) => p.file)).forEach(({ file, html }) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    write(file, html);
  });
}

pages.forEach((entry) => {
  const body = typeof entry.body === 'function' ? entry.body() : entry.body;
  write(entry.file, optimizeImages(page({ ...entry, body })));
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.filter((p) => p.sitemap !== false).map((p) => `  <url><loc>${absUrl(p.file)}</loc><lastmod>${p.lastmod || BUILD_DATE}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /_tools/\nDisallow: /admin/\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
write('.htaccess', buildHtaccess(articles));
write('firebase.json', `${JSON.stringify({ firestore: { rules: 'firestore.rules' } }, null, 2)}\n`);
writeAdminFiles();
// Solo al publicar en GitHub Pages (en local no hacen falta y llenarían el repositorio de carpetas).
if (process.env.GENERAR_REDIRECCIONES === '1') {
  writeRedirectStubs();
  versionAdminAssets();
}

// Páginas retiradas: duplicaban contenido. En GitHub Pages se sustituyen por redirecciones (writeRedirectStubs).
if (process.env.GENERAR_REDIRECCIONES !== '1') {
  ['articulo.html', 'producto.html'].forEach((f) => fs.rmSync(path.join(root, f), { force: true }));
}

// Fichas de piezas borradas o despublicadas en el panel: se eliminan para que no queden páginas huérfanas.
const productFiles = new Set(products.map(productFile));
fs.readdirSync(root)
  .filter((f) => /^producto-[a-z0-9-]+\.html$/.test(f) && !productFiles.has(f))
  .forEach((f) => { fs.rmSync(path.join(root, f)); console.log(`Ficha retirada: ${f}`); });

// Artículos borrados desde el panel: se retira su página para no dejar huérfanos.
const blogFiles = new Set(articles.map((a) => a.file));
fs.readdirSync(root)
  .filter((f) => /^blog-[a-z0-9_-]+\.html$/.test(f) && !blogFiles.has(f))
  .forEach((f) => { fs.rmSync(path.join(root, f)); console.log(`Artículo retirado: ${f}`); });

console.log(`${pages.length} páginas + sitemap.xml, robots.txt y .htaccess generados en ${root}`);
