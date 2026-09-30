// Utilidades de interfaz compartidas: iconos, avisos y confirmación
const icons = () => window.lucide && lucide.createIcons();

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
