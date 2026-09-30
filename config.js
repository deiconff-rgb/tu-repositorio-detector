// ===== Configuración única (la usan index.html y resultados.html) =====
const CONFIG = {
  owner:  "deiconff-rgb",
  repo:   "tu-repositorio-detector",
  branch: "main",
  // Déjalo vacío: el token se pega una vez en la página y queda guardado en tu navegador.
  // (Ver README: si lo escribes aquí en un repo público, GitHub lo revoca automáticamente.)
  tokenIntegrado: ""
};

function getToken() {
  return CONFIG.tokenIntegrado || localStorage.getItem('gh_token') || '';
}
