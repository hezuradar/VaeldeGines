/* Acceso al repositorio de GitHub desde el panel (igual que en la web de HezurAdar).
   El catálogo (_tools/data/catalogo.json) y las fotos (assets/img/catalogo/) son archivos del repositorio:
   cada cambio es un commit, y el flujo «Publicar web» regenera la web y la sube a GitHub Pages.
   El token se guarda en Firestore (adminConfig/github), legible solo por los administradores. */

export const REPO = { owner: 'hezuradar', repo: 'VaeldeGines', branch: 'main' };
export const CATALOG_PATH = '_tools/data/catalogo.json';
export const TESTIMONIOS_PATH = '_tools/data/testimonios.json';
export const BLOG_PATH = '_tools/data/blog-posts.json';
export const PHOTO_DIR = 'assets/img/catalogo';
export const BLOG_PHOTO_DIR = 'assets/img/blog';
const API = `https://api.github.com/repos/${REPO.owner}/${REPO.repo}`;
const RAW = `https://raw.githubusercontent.com/${REPO.owner}/${REPO.repo}/${REPO.branch}`;

let token = null;

export const setToken = (value) => { token = value; };
export const hasToken = () => Boolean(token);

const encodePath = (path) => path.split('/').map(encodeURIComponent).join('/');

/** Texto UTF-8 ↔ base64 (la API de contenidos de GitHub trabaja en base64). */
export function toBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function fromBase64(base64) {
  const binary = atob(base64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

export class GitHubError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

async function api(path, options = {}) {
  if (!token) throw new GitHubError(401, 'Falta conectar el panel con GitHub.');
  // Sin «/» final cuando se pide el propio repositorio: GitHub responde 404 a «/repos/dueño/repo/».
  const res = await fetch(path ? `${API}/${path}` : API, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  if (res.status === 404 && options.allow404) return null;
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new GitHubError(res.status, detail.message || `GitHub respondió ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

const NO_WRITE = 'El token puede leer pero no escribir. En GitHub, edita el token y pon «Contents» en «Read and write».';

/**
 * Comprueba que el token puede escribir en el repositorio.
 * repo.permissions refleja el papel del usuario, no el del token, así que además se intenta
 * guardar el catálogo con una versión (sha) inventada: con permiso de escritura GitHub responde
 * 409 (conflicto) sin guardar nada; sin permiso responde 403.
 */
export async function checkAccess() {
  const repo = await api('');
  if (!repo.permissions || !repo.permissions.push) throw new GitHubError(403, NO_WRITE);
  try {
    await putFile(CATALOG_PATH, btoa('comprobacion'), 'Comprobación de permisos (no se guarda)', '0'.repeat(40));
  } catch (error) {
    if (error.status === 409 || error.status === 422) return true;
    if (error.status === 403) throw new GitHubError(403, NO_WRITE);
    throw error;
  }
  return true;
}

/** Lee un archivo de texto del repositorio: { content, sha } o null si no existe. */
export async function readText(path) {
  const data = await api(`contents/${encodePath(path)}?ref=${REPO.branch}`, { allow404: true });
  return data ? { content: fromBase64(data.content), sha: data.sha } : null;
}

// Último commit hecho desde el panel: su publicación es la que hay que seguir en la barra de estado.
let lastCommit = null;
export const getLastCommit = () => lastCommit;
const remember = (result) => {
  if (result && result.commit && result.commit.sha) lastCommit = result.commit.sha;
  return result;
};

/** Crea o sustituye un archivo (contenido ya en base64). */
export async function putFile(path, base64, message, sha) {
  return remember(await api(`contents/${encodePath(path)}`, {
    method: 'PUT',
    body: JSON.stringify({ message, content: base64, branch: REPO.branch, ...(sha ? { sha } : {}) })
  }));
}

/** Borra un archivo si existe. */
export async function deleteFile(path, message) {
  const data = await api(`contents/${encodePath(path)}?ref=${REPO.branch}`, { allow404: true });
  if (!data) return;
  remember(await api(`contents/${encodePath(path)}`, {
    method: 'DELETE',
    body: JSON.stringify({ message, sha: data.sha, branch: REPO.branch })
  }));
}

/** Ejecución del flujo de publicación: la del commit indicado o, sin commit, la última. */
export async function publishRun(commitSha) {
  const filter = commitSha ? `&head_sha=${commitSha}` : '';
  const data = await api(`actions/workflows/publicar.yml/runs?per_page=1${filter}`, { allow404: true });
  return data && data.workflow_runs && data.workflow_runs[0] ? data.workflow_runs[0] : null;
}

/** URL para ver una foto del repositorio aunque la web aún no se haya regenerado. */
export const rawUrl = (path) => `${RAW}/${encodePath(path)}`;
