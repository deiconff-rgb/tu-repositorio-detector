// Utilidades de interfaz compartidas: iconos, avisos y confirmación
// Iconos Lucide incrustados (sin depender de ningún CDN): siempre se dibujan
const ICONOS = {
 "scan-search": "<path d=\"M3 7V5a2 2 0 0 1 2-2h2\"/><path d=\"M17 3h2a2 2 0 0 1 2 2v2\"/><path d=\"M21 17v2a2 2 0 0 1-2 2h-2\"/><path d=\"M7 21H5a2 2 0 0 1-2-2v-2\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"m16 16-1.9-1.9\"/>",
 "list-checks": "<path d=\"m3 17 2 2 4-4\"/><path d=\"m3 7 2 2 4-4\"/><path d=\"M13 6h8\"/><path d=\"M13 12h8\"/><path d=\"M13 18h8\"/>",
 "key-round": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\"/><circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/>",
 "chevron-down": "<path d=\"m6 9 6 6 6-6\"/>",
 "plus": "<path d=\"M5 12h14\"/><path d=\"M12 5v14\"/>",
 "play": "<polygon points=\"6 3 20 12 6 21 6 3\"/>",
 "x": "<path d=\"M18 6 6 18\"/><path d=\"m6 6 12 12\"/>",
 "arrow-left": "<path d=\"m12 19-7-7 7-7\"/><path d=\"M19 12H5\"/>",
 "refresh-cw": "<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\"/><path d=\"M21 3v5h-5\"/><path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\"/><path d=\"M8 16H3v5\"/>",
 "trash-2": "<path d=\"M3 6h18\"/><path d=\"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6\"/><path d=\"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2\"/><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"17\"/><line x1=\"14\" x2=\"14\" y1=\"11\" y2=\"17\"/>",
 "circle-check": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/>",
 "circle-alert": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" x2=\"12\" y1=\"8\" y2=\"12\"/><line x1=\"12\" x2=\"12.01\" y1=\"16\" y2=\"16\"/>",
 "info": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 16v-4\"/><path d=\"M12 8h.01\"/>",
 "inbox": "<polyline points=\"22 12 16 12 14 15 10 15 8 12 2 12\"/><path d=\"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z\"/>",
 "loader-circle": "<path d=\"M21 12a9 9 0 1 1-6.219-8.56\"/>"
};

// Reemplaza cada <i data-lucide="nombre" class="..."> por su SVG en línea
function icons() {
  document.querySelectorAll('i[data-lucide]').forEach(el => {
    const interior = ICONOS[el.dataset.lucide];
    if (!interior) return;
    el.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
      'class="shrink-0 ' + (el.getAttribute('class') || '') + '">' + interior + '</svg>';
  });
}
icons();


function toast(msg, tipo = 'info') {
  let box = document.getElementById('toasts');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toasts';
    box.className = 'pointer-events-none fixed inset-x-0 bottom-0 z-50 flex flex-col items-center gap-2 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]';
    document.body.appendChild(box);
  }
  const ic = { ok: 'circle-check', error: 'circle-alert', info: 'info' }[tipo] || 'info';
  const col = { ok: 'text-emerald-300', error: 'text-rose-300', info: 'text-violet-200' }[tipo] || 'text-violet-200';
  const el = document.createElement('div');
  el.setAttribute('role', tipo === 'error' ? 'alert' : 'status');
  el.className = 'pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl bg-violet-950/95 p-4 text-sm text-white shadow-2xl ring-1 ring-white/20 backdrop-blur';
  el.innerHTML = `<i data-lucide="${ic}" class="mt-0.5 h-5 w-5 shrink-0 ${col}"></i><p class="leading-snug"></p>`;
  el.querySelector('p').textContent = msg;
  box.appendChild(el);
  icons();
  setTimeout(() => el.remove(), tipo === 'error' ? 7000 : 4000);
}

function confirmar(msg, ok = 'Confirmar') {
  return new Promise(resolve => {
    const ov = document.createElement('div');
    ov.className = 'fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center';
    ov.innerHTML = `<div role="dialog" aria-modal="true" class="w-full max-w-sm rounded-2xl bg-violet-950 p-5 text-white shadow-2xl ring-1 ring-white/20">
      <p class="text-base leading-snug"></p>
      <div class="mt-5 flex gap-3">
        <button type="button" data-r="0" class="btn-ghost flex-1">Cancelar</button>
        <button type="button" data-r="1" class="btn-danger flex-1"></button>
      </div></div>`;
    ov.querySelector('p').textContent = msg;
    ov.querySelector('[data-r="1"]').textContent = ok;
    const cerrar = v => { document.removeEventListener('keydown', tecla); ov.remove(); resolve(v); };
    const tecla = e => { if (e.key === 'Escape') cerrar(false); };
    ov.addEventListener('click', e => {
      if (e.target === ov) cerrar(false);
      const r = e.target.closest('[data-r]');
      if (r) cerrar(r.dataset.r === '1');
    });
    document.addEventListener('keydown', tecla);
    document.body.appendChild(ov);
    ov.querySelector('[data-r="0"]').focus();
  });
}
