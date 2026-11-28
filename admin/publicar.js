/* Estado de la publicación. Cada cambio guardado desde el panel es un commit y el flujo de GitHub
   «Publicar web» regenera la web y la sube a GitHub Pages sin hacer nada más.
   Esta barra sigue sola la publicación del último cambio guardado (preparando → publicando → al día)
   y, mientras el panel está abierto, vuelve a mirar el estado de vez en cuando. */
import { publishRun, getLastCommit } from './github.js';

const FAST_MS = 8 * 1000;      // mientras se publica un cambio
const IDLE_MS = 60 * 1000;     // con la web al día
const $ = (id) => document.getElementById(id);

let timer = null;
let followed = null;           // commit cuya publicación se está siguiendo
let handled = null;            // último commit cuya publicación ya terminó

const fecha = (iso) => new Date(iso).toLocaleString('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

function paint(state, title, info, link) {
  $('publishBar').dataset.state = state;
  $('publishTitle').textContent = title;
  $('publishInfo').textContent = info;
  $('publishLink').hidden = !link;
  if (link) $('publishLink').href = link;
}

function schedule(ms) {
  clearTimeout(timer);
  timer = setTimeout(() => refreshPublish().catch(() => schedule(IDLE_MS)), ms);
}

/** Actualiza la barra. Si acaba de guardarse un cambio, sigue su publicación hasta que termina. */
export async function refreshPublish() {
  clearTimeout(timer);
  const latest = getLastCommit();
  if (latest && latest !== handled) followed = latest;
  const finish = () => { handled = followed || handled; followed = null; };

  let run;
  try {
    run = await publishRun(followed);
  } catch {
    paint('changes', 'No se puede consultar el estado de la publicación', 'Los cambios se guardan igualmente y la web se actualiza sola.', null);
    schedule(IDLE_MS);
    return;
  }

  if (followed && !run) {
    paint('pending', 'Publicando la web…', 'Cambio guardado. Preparando la publicación (2 o 3 minutos).', null);
    schedule(FAST_MS);
    return;
  }
  if (!run) {
    paint('changes', 'La web todavía no se ha publicado', 'Se publicará sola al guardar el primer cambio.', null);
    schedule(IDLE_MS);
    return;
  }
  if (run.status !== 'completed') {
    paint('pending', 'Publicando la web…', `Empezó el ${fecha(run.created_at)}. Los cambios se verán en 2 o 3 minutos.`, run.html_url);
    schedule(FAST_MS);
    return;
  }
  if (run.conclusion === 'success') {
    finish();
    paint('ok', 'La web está al día', `Última publicación: ${fecha(run.updated_at)}. Los cambios ya se ven en la web.`, null);
    schedule(IDLE_MS);
    return;
  }
  if (run.conclusion === 'cancelled') {
    // Llegó otro cambio enseguida: GitHub cancela esta publicación y publica la más reciente,
    // que es la que se sigue a partir de ahora.
    finish();
    paint('pending', 'Publicando la web…', 'Hay un cambio más reciente; se publica ese.', null);
    schedule(FAST_MS);
    return;
  }
  finish();
  paint('error', 'La última publicación ha fallado', `Fue el ${fecha(run.updated_at)}. Los datos están guardados; avisa para revisarlo.`, run.html_url);
  schedule(IDLE_MS);
}

/** Al volver a la pestaña del panel, se actualiza el estado enseguida. */
export function initPublish() {
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) refreshPublish().catch(() => schedule(IDLE_MS));
  });
}
