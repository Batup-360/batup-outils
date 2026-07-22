/**
 * Canal résultat embed — VERSION 1 (contrat FIGÉ, documenté dans docs/embed.md).
 *
 * Quand un calculateur « métré » tourne dans le shell /embed/<slug> (iframe
 * dans l'éditeur de devis de l'app Batup), le bouton « Utiliser dans le
 * devis » émet vers la fenêtre parente un message :
 *
 *   { type: 'batup-embed-result', slug, version: 1, payload: EmbedResultPayload }
 *
 * L'app hôte mappe chaque `lineKey` sur un article de sa bibliothèque et crée
 * les lignes de devis correspondantes. Ne JAMAIS changer la forme de ce
 * message sans incrémenter `version`.
 */

export type EmbedUnit = 'm2' | 'm3' | 'ml' | 'u' | 'kg' | 'L' | 'sac' | 'paquet' | 'h';

export interface EmbedResultLine {
  /** Identifiant stable, ex. 'peinture.litres' — l'hôte le mappe sur un article. */
  lineKey: string;
  /** Libellé d'affichage français, ex. 'Peinture (2 couches)'. */
  label: string;
  /** Quantité, > 0 et finie. */
  qty: number;
  unit: EmbedUnit;
  /** Détail optionnel, ex. 'rendement 10 m²/L, perte 5 %'. */
  hint?: string;
}

export interface EmbedResultPayload {
  lines: EmbedResultLine[];
  /** Entrées du calculateur, pour traçabilité côté hôte. */
  meta?: Record<string, string | number | boolean>;
}

export const EMBED_RESULT_VERSION = 1;

/** Lignes exploitables : quantité finie et strictement positive. */
export function validEmbedLines(lines: EmbedResultLine[]): EmbedResultLine[] {
  return lines.filter((l) => Number.isFinite(l.qty) && l.qty > 0);
}

/**
 * Émet le payload vers la fenêtre parente. Filtre les lignes invalides
 * (qty <= 0 ou non finie) ; no-op s'il ne reste aucune ligne ou si la page
 * n'est pas dans une iframe.
 */
export function emitEmbedResult(slug: string, payload: EmbedResultPayload): void {
  if (typeof window === 'undefined' || window.parent === window) return;
  const lines = validEmbedLines(payload.lines);
  if (lines.length === 0) return;
  window.parent.postMessage(
    { type: 'batup-embed-result', slug, version: EMBED_RESULT_VERSION, payload: { ...payload, lines } },
    '*',
  );
}
