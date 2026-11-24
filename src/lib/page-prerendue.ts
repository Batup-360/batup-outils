/**
 * Contenu prérendu au build (scripts/prerender.ts) pour l'URL d'arrivée.
 *
 * React monte avec `createRoot` et remplace ce contenu. Tant que le code de la page
 * n'est pas chargé, on réaffiche ce même contenu au lieu d'un spinner plein écran :
 * le texte reste visible (LCP, pas d'écran blanc ni de saut de mise en page).
 * Capturé dans main.tsx AVANT le montage de React.
 */
let chemin: string | null = null;
let html = '';

export function capturerPagePrerendue(racine: HTMLElement | null): void {
  chemin = window.location.pathname;
  html = racine?.innerHTML.trim() ?? '';
}

/** Le HTML prérendu si `location` est l'URL d'arrivée, sinon une chaîne vide. */
export function htmlPrerendu(location: string): string {
  return location === chemin ? html : '';
}
