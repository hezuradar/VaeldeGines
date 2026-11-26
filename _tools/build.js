'use strict';

const fs = require('fs');
const path = require('path');
const { page } = require('./layout');
const articlePage = require('./pages/article');
const productPage = require('./pages/producto');
const articles = require('./data/blog');
const products = require('./data/products');

const root = path.join(__dirname, '..');

const pages = [
  {
    file: 'index.html',
    active: '',
    title: 'Vael de Ginés · Guitarras artesanales e instrumentos de folclore',
    description: 'Luthería artesanal en Los Alcázares (Murcia). Guitarras personalizadas, instrumentos de folclore y mentoría con Ginés Martínez.',
    body: require('./pages/home')
  },
  {
    file: 'guitarras.html',
    active: 'guitarras',
    title: 'Guitarras personalizadas · Vael de Ginés',
    description: 'Guitarras de autor construidas a mano y diseñadas junto a cada músico. Colección Paloma, Golden Whale, Freya, Camino, Jaguar y Venus.',
    body: require('./pages/guitarras')
  },
  {
    file: 'instrumentos.html',
    active: 'instrumentos',
    title: 'Instrumentos de folclore · Vael de Ginés',
    description: 'Guitarro murciano, laúd, bandurria y guitarra mayor. Instrumentos tradicionales construidos artesanalmente en Murcia.',
    body: require('./pages/instrumentos')
  },
  {
    file: 'luthier.html',
    active: 'taller',
    title: 'El taller y el luthier · Vael de Ginés',
    description: 'Conoce a Ginés Martínez, luthier artesanal en Los Alcázares (Murcia), su proceso de trabajo y sus reconocimientos.',
    body: require('./pages/luthier')
  },
  {
    file: 'tienda.html',
    active: 'tienda',
    title: 'Catálogo de instrumentos y maderas · Vael de Ginés',
    description: 'Catálogo del taller: guitarras de autor, instrumentos de folclore, maderas seleccionadas, libros y mentoría.',
    body: require('./pages/tienda')
  },
  {
    file: 'producto.html',
    active: 'guitarras',
    title: 'Paloma · Guitarra de autor · Vael de Ginés',
    description: 'Guitarra Paloma: abeto alemán, palosanto de Madagascar y goma laca a muñequilla. Construida por encargo en Los Alcázares.',
    body: () => productPage(products.find((p) => p.slug === 'paloma'))
  },
  {
    file: 'blog.html',
    active: 'blog',
    title: 'Blog · Cuaderno del taller · Vael de Ginés',
    description: 'Artículos sobre maderas, luthería, guitarras artesanales y cuidados del instrumento.',
    body: require('./pages/blog')
  },
  {
    file: 'articulo.html',
    active: 'blog',
    title: articles.find((a) => a.slug === 'guitarra-clasica-vs-flamenca-luthier').title + ' · Vael de Ginés',
    description: 'Diferencias entre guitarra clásica y flamenca de luthier: propósito musical, maderas, construcción, acción y sonido.',
    body: () => articlePage(articles.find((a) => a.slug === 'guitarra-clasica-vs-flamenca-luthier'))
  },
  {
    file: 'mentoria.html',
    active: 'mentoria',
    title: 'Mentoría y consultoría · Vael de Ginés',
    description: 'Sesiones de mentoría 1:1 sobre luthería, artesanía y negocio. 45 € por sesión o 400 € el pack de diez.',
    body: require('./pages/mentoria')
  },
  {
    file: 'podcast.html',
    active: 'podcast',
    title: 'La cabaña del luthier · Podcast · Vael de Ginés',
    description: 'Conversaciones sobre luthería, artesanía y música con luthiers, músicos y artesanos.',
    body: require('./pages/podcast')
  },
  {
    file: 'contacto.html',
    active: 'contacto',
    title: 'Contacto · Vael de Ginés',
    description: 'Escríbeme para hablar de tu guitarra personalizada, un instrumento de folclore o una visita al taller en Los Alcázares.',
    body: require('./pages/contacto')
  },
  {
    file: 'legal.html',
    active: 'legal',
    title: 'Aviso legal, privacidad y cookies · Vael de Ginés',
    description: 'Información legal, política de privacidad, cookies y condiciones de devolución y garantía de Vael de Ginés.',
    body: require('./pages/legal')
  }
];

let written = 0;

pages.forEach(({ file, active, title, description, body }) => {
  const html = page({ title, description, active, body: typeof body === 'function' ? body() : body });
  fs.writeFileSync(path.join(root, file), html, 'utf8');
  written++;
  console.log(`✓ ${file}`);
});

articles.forEach((a) => {
  const html = page({
    title: `${a.title} · Vael de Ginés`,
    description: a.excerpt,
    active: 'blog',
    body: articlePage(a)
  });
  fs.writeFileSync(path.join(root, a.file), html, 'utf8');
  written++;
  console.log(`✓ ${a.file}`);
});

products.forEach((p) => {
  const html = page({
    title: `${p.name} · ${p.label} · Vael de Ginés`,
    description: p.desc,
    active: p.slug === 'mentoria' ? 'mentoria' : (p.cat === 'guitarras' ? 'guitarras' : 'tienda'),
    body: productPage(p)
  });
  const file = `producto-${p.slug}.html`;
  fs.writeFileSync(path.join(root, file), html, 'utf8');
  written++;
  console.log(`✓ ${file}`);
});

console.log(`\n${written} páginas generadas en ${root}`);
