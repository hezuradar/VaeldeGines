/* Fotos del catálogo: compresión en el navegador y subida como archivos al repositorio (assets/img/catalogo/).
   Mientras se edita, las fotos nuevas quedan «pendientes» en memoria (pending:<id>) y solo se suben al guardar. */
import { putFile, deleteFile, rawUrl, PHOTO_DIR } from './github.js';

const MAX_SIDES = [1600, 1280, 1024];
const QUALITIES = [0.82, 0.72, 0.6, 0.5];
const MAX_BASE64 = 900000;
const MAX_INPUT_BYTES = 25 * 1024 * 1024;
const SITE_IMAGE = /^assets\/img\/[\w\-/]+\.(?:jpe?g|png|webp)$/i;
const PENDING = /^pending:(\d+)$/;
const EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg' };

const pending = new Map();
let nextId = 1;

export const isPhotoRef = (ref) => SITE_IMAGE.test(ref) || PENDING.test(ref);
export const isPending = (ref) => PENDING.test(ref);
export const isCatalogPhoto = (ref) => String(ref).startsWith(`${PHOTO_DIR}/`);

function toBlob(canvas, type, quality) {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

/** Reduce la foto a WebP (o JPEG si el navegador no sabe generar WebP), como máximo 1600 px. */
async function compressImage(file) {
  if (!file.type.startsWith('image/')) throw new Error('El archivo no es una imagen.');
  if (file.size > MAX_INPUT_BYTES) throw new Error('La imagen supera 25 MB.');
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  try {
    for (const side of MAX_SIDES) {
      const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      for (const quality of QUALITIES) {
        const webp = await toBlob(canvas, 'image/webp', quality);
        const blob = webp && webp.type === 'image/webp' ? webp : await toBlob(canvas, 'image/jpeg', quality);
        const data = await blobToBase64(blob);
        if (data.length < MAX_BASE64) return { data, mime: blob.type };
      }
    }
  } finally {
    bitmap.close();
  }
  throw new Error('No se ha podido reducir la imagen lo suficiente.');
}

/** Prepara una foto nueva (comprimida) y devuelve su referencia provisional pending:<n>. */
export async function addPendingPhoto(file) {
  const photo = await compressImage(file);
  const ref = `pending:${nextId}`;
  nextId += 1;
  pending.set(ref, photo);
  return ref;
}

/** URL que se puede mostrar en un <img> para cualquier referencia de foto. */
export function photoUrl(ref) {
  if (pending.has(ref)) {
    const { mime, data } = pending.get(ref);
    return `data:${mime};base64,${data}`;
  }
  if (isCatalogPhoto(ref)) return rawUrl(ref);   // recién subida: aún puede no estar en la web
  return SITE_IMAGE.test(ref) ? `../${ref}` : '';
}

/** Sube al repositorio las fotos pendientes de una galería y devuelve la galería con rutas definitivas. */
export async function commitPhotos(slug, gallery) {
  const stamp = Date.now().toString(36);
  const result = [];
  for (const [i, ref] of gallery.entries()) {
    if (!pending.has(ref)) { result.push(ref); continue; }
    const { data, mime } = pending.get(ref);
    const path = `${PHOTO_DIR}/${slug}-${stamp}-${i + 1}.${EXT[mime] || 'webp'}`;
    await putFile(path, data, `Panel: foto de ${slug}`);
    pending.delete(ref);
    result.push(path);
  }
  return result;
}

/** Olvida las fotos pendientes (al cancelar la edición). */
export function discardPending(refs) {
  refs.filter((r) => pending.has(r)).forEach((r) => pending.delete(r));
}

/** Borra del repositorio fotos subidas desde el panel que ya no se usan. Las demás de la web no se tocan. */
export async function deleteCatalogPhotos(paths, slug) {
  for (const path of paths.filter(isCatalogPhoto)) {
    await deleteFile(path, `Panel: borra foto de ${slug}`);
  }
}
