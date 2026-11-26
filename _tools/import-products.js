'use strict';
/* Catálogo del taller: datos compartidos por la tienda y las fichas de producto.
   Las fotos adicionales se descargan de la biblioteca de medios de vaeldegines.com. */

const fs = require('fs');
const path = require('path');

const ROOT = 'D:/hezuradar/Vael/web-nueva';
const IMG_DIR = path.join(ROOT, 'assets', 'img', 'productos');
fs.mkdirSync(IMG_DIR, { recursive: true });

const products = [
  {
    slug: 'paloma', name: 'Paloma', cat: 'guitarras', label: 'Guitarras de autor',
    price: 6200, priceLabel: 'Desde 6.200 €',
    desc: 'Abeto alemán · Palosanto de Madagascar. Tono cristalino y respuesta inmediata.',
    image: 'assets/img/guitar-paloma.jpg',
    subtitle: 'Inspirada en la sutileza y ligereza del vuelo libre.',
    specs: [['Tapa armónica', 'Abeto alemán selecto'], ['Aros y fondo', 'Palosanto de Madagascar'], ['Diapasón', 'Ébano africano'], ['Escala', '650 mm'], ['Acabado', 'Goma laca a muñequilla']],
    extras: [{ q: 'Paloma', match: '4519' }, { q: 'Paloma', match: '4518' }]
  },
  {
    slug: 'golden-whale', name: 'Golden Whale', cat: 'guitarras', label: 'Guitarras de autor',
    price: 6200, priceLabel: 'Desde 6.200 €',
    desc: 'Cedro canadiense · Koa hawaiana · pan de oro. Proyección armónica colosal.',
    image: 'assets/img/guitar-golden-whale.jpg',
    subtitle: 'Una oda a las profundidades del océano.',
    specs: [['Tapa armónica', 'Cedro rojo canadiense'], ['Aros y fondo', 'Koa hawaiana'], ['Detalles', 'Incrustaciones en pan de oro'], ['Escala', '650 mm'], ['Acabado', 'Goma laca']],
    extras: [{ q: 'Golden Whale', match: '3b1ed147' }, { q: 'Golden Whale', match: '4745' }, { q: 'Golden Whale', match: '4805' }]
  },
  {
    slug: 'freya', name: 'Freya', cat: 'guitarras', label: 'Guitarras de autor',
    price: 6200, priceLabel: 'Desde 6.200 €',
    desc: 'Pícea de Sitka · Cocobolo. Graves majestuosos y nitidez lírica.',
    image: 'assets/img/guitar-freya.jpg',
    subtitle: 'Fuerza y belleza de las tempestades del norte.',
    specs: [['Tapa armónica', 'Pícea de Sitka'], ['Aros y fondo', 'Cocobolo'], ['Diapasón', 'Ébano'], ['Escala', '650 mm'], ['Acabado', 'Goma laca']],
    extras: []
  },
  {
    slug: 'camino', name: 'Camino', cat: 'guitarras', label: 'Guitarras de autor',
    price: 3500, priceLabel: 'Desde 3.500 €',
    desc: 'Abeto de los Alpes · barniz a la goma laca. Equilibrio y timbre orgánico.',
    image: 'assets/img/guitar-camino.jpg',
    subtitle: 'La compañera de viaje de los espíritus errantes.',
    specs: [['Tapa armónica', 'Abeto de los Alpes'], ['Aros y fondo', 'Palosanto'], ['Diapasón', 'Ébano'], ['Escala', '650 mm'], ['Acabado', 'Goma laca a muñequilla']],
    extras: [{ q: 'camino', match: '4986' }]
  },
  {
    slug: 'jaguar', name: 'Jaguar', cat: 'guitarras', label: 'Guitarras de autor',
    price: 9800, priceLabel: 'Desde 9.800 €',
    desc: 'Nogal español · alma de fibra de carbono. Ataque veloz y graves aterciopelados.',
    image: 'assets/img/guitar-jaguar.jpg',
    subtitle: 'Carácter salvaje e imponente, elegante sobre el escenario.',
    specs: [['Tapa armónica', 'Nogal español'], ['Refuerzo interior', 'Fibra de carbono'], ['Diapasón', 'Ébano'], ['Escala', '650 mm'], ['Acabado', 'Barniz orgánico']],
    extras: []
  },
  {
    slug: 'venus', name: 'Venus', cat: 'guitarras', label: 'Guitarras de autor',
    price: 9800, priceLabel: 'Desde 9.800 €',
    desc: 'Arce rizado · roseta con nácar natural. Sustain infinito y armónicos etéreos.',
    image: 'assets/img/guitar-venus.jpg',
    subtitle: 'Armonía y simetría ideal.',
    specs: [['Tapa armónica', 'Abeto seleccionado'], ['Aros y fondo', 'Arce rizado'], ['Roseta', 'Nácar natural'], ['Escala', '650 mm'], ['Acabado', 'Goma laca']],
    extras: []
  },
  {
    slug: 'guitarro-murciano', name: 'Guitarro murciano', cat: 'folclore', label: 'Instrumentos de folclore',
    price: 1800, priceLabel: 'Desde 1.800 €',
    desc: 'Construcción artesanal · bajo encargo. Un instrumento ligado a la tradición murciana.',
    image: 'assets/img/folk-guitarro.jpg',
    subtitle: 'Una seña de identidad de la música tradicional de Murcia.',
    specs: [['Tipo', 'Guitarro murciano'], ['Construcción', 'Artesanal, pieza a pieza'], ['Maderas', 'Selección según el proyecto'], ['Acabados', 'A medida'], ['Plazo', 'Según planificación del taller']],
    extras: [{ q: 'guitarro', match: 'guitarro8' }, { q: 'guitarro', match: 'guitarro7' }]
  },
  {
    slug: 'guitarro-tenor', name: 'Guitarro tenor', cat: 'folclore', label: 'Instrumentos de folclore',
    price: 1600, priceLabel: 'Desde 1.600 €',
    desc: 'Música popular · configuración a medida. Pensado para conjuntos y repertorio tradicional.',
    image: 'assets/img/guitarro-detail.jpg',
    subtitle: 'Una voz propia dentro de la familia de los guitarros.',
    specs: [['Tipo', 'Guitarro tenor'], ['Uso', 'Conjuntos de música popular'], ['Construcción', 'Artesanal'], ['Acabados', 'A medida'], ['Plazo', 'A consultar']],
    extras: [{ q: 'guitarro', match: '114013' }, { q: 'guitarro', match: 'guitarro6' }]
  },
  {
    slug: 'madera-bubinga', name: 'Lámina de Bubinga', cat: 'maderas', label: 'Maderas',
    price: 180, priceLabel: 'Desde 180 €',
    desc: 'Pommele figurada · estacionada en el taller. Pieza seleccionada para luthería.',
    image: 'assets/img/wood-bubinga.jpg',
    subtitle: 'Fuerza, belleza y alma africana en cada veta.',
    specs: [['Madera', 'Bubinga'], ['Figura', 'Pommele figurada'], ['Estado', 'Estacionada en taller'], ['Uso', 'Fondos, aros y diapasones'], ['Disponibilidad', 'Unidades limitadas']],
    extras: [{ q: 'bubinga', match: 'pommele' }, { q: 'bubinga', match: 'tablon' }]
  },
  {
    slug: 'libro-guitarra-lutheria', name: 'La guitarra en la luthería', cat: 'formacion', label: 'Libros y formación',
    price: 39, priceLabel: '39 €',
    desc: 'Libro de referencia · tapa dura. Lectura esencial para luthiers y aficionados.',
    image: 'assets/img/blog-libro.jpg',
    subtitle: 'Una mirada al oficio desde la página.',
    specs: [['Formato', 'Tapa dura'], ['Idioma', 'Español'], ['Tema', 'Construcción y luthería'], ['Estado', 'Disponible'], ['Envío', 'A toda España']],
    extras: [{ q: 'Libro-La-Guitarra', match: 'libro' }]
  },
  {
    slug: 'mentoria', name: 'Mentoría 1:1', cat: 'formacion', label: 'Mentoría',
    price: 45, priceLabel: '45 € / sesión',
    desc: 'Una hora de consultoría con el luthier. Pack de 10 sesiones: 400 €.',
    image: 'assets/img/craft-hands.jpg',
    subtitle: 'Aprende el oficio con quien lo vive.',
    specs: [['Duración', '1 hora'], ['Formato', 'Videoconferencia'], ['Grabación', 'Opcional'], ['Pack 10 sesiones', '400 €'], ['Reserva', 'Por correo']],
    extras: []
  }
];

async function findMedia(q, match) {
  const url = `https://vaeldegines.com/wp-json/wp/v2/media?search=${encodeURIComponent(q)}&per_page=20&_fields=slug,source_url,alt_text,media_details`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const items = await res.json();
  const item = items.find((i) => (i.slug + ' ' + (i.alt_text || '')).toLowerCase().includes(match.toLowerCase()));
  if (!item) return null;
  const sizes = item.media_details && item.media_details.sizes;
  return (sizes && sizes.large && sizes.large.source_url) || item.source_url;
}

function ext(url) {
  const m = url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i);
  return m ? m[1].toLowerCase() : 'jpg';
}

(async () => {
  for (const p of products) {
    p.gallery = [p.image];
    let n = 1;
    for (const extra of p.extras) {
      const url = await findMedia(extra.q, extra.match);
      if (!url) continue;
      const file = `${p.slug}-${n}.${ext(url)}`;
      const dest = path.join(IMG_DIR, file);
      if (!fs.existsSync(dest)) {
        const res = await fetch(url);
        if (!res.ok) { console.error('Error', url, res.status); continue; }
        fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      }
      p.gallery.push(`assets/img/productos/${file}`);
      n++;
    }
  }

  // Quitar campos auxiliares
  products.forEach((p) => delete p.extras);

  const out = `'use strict';\n/* Catálogo del taller · ${products.length} productos */\nmodule.exports = ${JSON.stringify(products, null, 2)};\n`;
  fs.writeFileSync(path.join(ROOT, '_tools', 'data', 'products.js'), out, 'utf8');
  console.log(`Productos: ${products.length}`);
  products.forEach(p => console.log(`- ${p.slug}: ${p.gallery.length} foto(s)`));
})();
