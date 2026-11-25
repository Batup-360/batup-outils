/**
 * URL helpers for cross-host navigation.
 *
 * In production this site is served from outils.batup.fr (Cloudflare Pages).
 * Auth + signup live on app.batup.fr — those links are always absolute so
 * cookies/sessions land on the right host.
 */

export const APP_BASE = 'https://app.batup.fr';
export const MARKETING_BASE = 'https://www.batup.fr';

export function isProd(): boolean {
  if (typeof window === 'undefined') return true;
  return window.location.hostname === 'outils.batup.fr';
}

export function siteOrigin(): string {
  if (typeof window === 'undefined') return 'https://outils.batup.fr';
  return isProd() ? 'https://outils.batup.fr' : window.location.origin;
}

/** Seuls paramètres de campagne transmis à l'inscription (liste blanche). */
export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const CLE_UTM = 'batup_utm';
const UTM_LONGUEUR_MAX = 200;

function utmDepuis(lire: (cle: string) => unknown): Record<string, string> {
  const utm: Record<string, string> = {};
  for (const cle of UTM_KEYS) {
    const valeur = lire(cle);
    if (typeof valeur === 'string' && valeur.trim()) utm[cle] = valeur.trim().slice(0, UTM_LONGUEUR_MAX);
  }
  return utm;
}

function utmDeLUrl(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return utmDepuis((cle) => params.get(cle));
}

/**
 * À appeler une fois à l'arrivée : garde les `utm_*` de l'URL en sessionStorage
 * (pas de cookie) pour qu'ils survivent à la navigation dans le site.
 */
export function capturerUtm(): void {
  const utm = utmDeLUrl();
  if (Object.keys(utm).length === 0) return;
  try {
    window.sessionStorage.setItem(CLE_UTM, JSON.stringify(utm));
  } catch {
    /* sessionStorage indisponible : les UTM ne valent que pour cette page */
  }
}

/** UTM de la visite : ceux de l'URL courante, sinon ceux gardés à l'arrivée. */
export function lireUtm(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const utm = utmDeLUrl();
  if (Object.keys(utm).length > 0) return utm;
  try {
    const garde: unknown = JSON.parse(window.sessionStorage.getItem(CLE_UTM) ?? '{}');
    if (!garde || typeof garde !== 'object') return {};
    return utmDepuis((cle) => (garde as Record<string, unknown>)[cle]);
  } catch {
    return {};
  }
}

/**
 * Seul endroit qui construit l'URL d'inscription des CTA. L'hôte est fixe ;
 * `source` (l'outil) reste en tête, suivi des `utm_*` de la visite (d'où vient
 * le visiteur), puis des autres paramètres de l'outil.
 */
export function signupUrl(params?: Record<string, string> | URLSearchParams): string {
  const entree = new URLSearchParams(params);
  const sortie = new URLSearchParams();
  const source = entree.get('source');
  if (source) sortie.set('source', source);
  for (const [cle, valeur] of Object.entries(lireUtm())) sortie.set(cle, valeur);
  for (const [cle, valeur] of entree) {
    if (!sortie.has(cle)) sortie.set(cle, valeur);
  }
  const query = sortie.toString();
  return query ? `${APP_BASE}/signup?${query}` : `${APP_BASE}/signup`;
}
