/**
 * Pré-remplissage app → outil (mode embed uniquement) — parsing pur des
 * query params de l'URL d'embed (`/embed/<slug>?surface=34&tva=10…`).
 * Contrat v1 (FIGÉ) : voir docs/embed.md, section « Pré-remplissage ».
 *
 * Séparé du hook React (`useEmbedPrefill` dans embed-context.tsx) pour être
 * testable en environnement node pur, sans DOM.
 */

export interface PrefillBounds {
  min?: number;
  max?: number;
}

/**
 * Extrait un nombre d'une query string. Retourne `undefined` si le paramètre
 * est absent, vide, non numérique (NaN / Infinity) ou hors bornes — l'appelant
 * conserve alors sa valeur par défaut. La virgule décimale française est
 * acceptée (`?surface=12,5`).
 */
export function parsePrefillParam(
  search: string,
  name: string,
  opts?: PrefillBounds,
): number | undefined {
  const raw = new URLSearchParams(search).get(name);
  if (raw === null || raw.trim() === '') return undefined;
  const num = parseFloat(raw.trim().replace(',', '.'));
  if (!Number.isFinite(num)) return undefined;
  if (opts?.min !== undefined && num < opts.min) return undefined;
  if (opts?.max !== undefined && num > opts.max) return undefined;
  return num;
}
