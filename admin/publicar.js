/* Estado de la publicación: cada cambio guardado desde el panel es un commit y el flujo de GitHub
   «Publicar web» regenera la web y la sube a GitHub Pages. Aquí solo se muestra cómo va. */
import { lastPublishRun } from './github.js';

const REFRESH_MS = 20 * 1000;
const $ = (id) => document.getElementById(id);
let timer = null;

const fecha = (iso) => new Date(iso).toLocaleString('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });

function paint(state, title, info, link) {
  $('publishBar').dataset.state = state;
  $('publishTitle').textContent = title;
  $('publishInfo').textContent = info;
  $('publishLink').hidden = !link;
  if (link) $('publishLink').href = link;
}

/** Consulta la última ejecución del flujo y actualiza la barra; mientras publica, vuelve a mirar cada 20 s. */
export async function refreshPublish() {
  clearTimeout(timer);
  let run;
  try {
    run = await lastPublishRun();
  } catch {
    paint('changes', 'No se puede consultar el estado de la publicación', 'Los cambios se guardan igualmente; la web se actualizará sola.', null);
    return;
  }
  if (!run) {
    paint('changes', 'La web todavía no se ha publicado', 'Se publicará sola al guardar el primer cambio.', null);
    return;
  }
  if (run.status !== 'completed') {
    paint('pending', 'Publicando la web…', `Empezó el ${fecha(run.created_at)}. Suele tardar 2 o 3 minutos.`, run.html_url);
    timer = setTimeout(() => refreshPublish().catch(() => {}), REFRESH_MS);
    return;
  }
  if (run.conclusion === 'success') {
    paint('ok', 'La web está al día', `Última publicación: ${fecha(run.updated_at)}.`, null);
  } else {
    paint('error', 'La última publicación ha fallado', `Fue el ${fecha(run.updated_at)}. Los datos están guardados; avisa para revisarlo.`, run.html_url);
  }
}

export function initPublish() {
  $('publishRefresh').addEventListener('click', () => refreshPublish().catch(() => {}));
}
