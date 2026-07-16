/**
 * Conversions TVA : HT ↔ TTC pour un taux donné (en %).
 * Taux courants dans le bâtiment : 20 % (neuf), 10 % (rénovation logement),
 * 5,5 % (rénovation énergétique), 2,1 % (cas particuliers).
 */

/** Montant de TVA à partir d'un HT. */
export function tvaFromHT(ht: number, tauxPct: number): number {
  if (!Number.isFinite(ht) || ht <= 0) return 0;
  return ht * (tauxPct / 100);
}

/** HT → TTC. */
export function htToTtc(ht: number, tauxPct: number): number {
  if (!Number.isFinite(ht) || ht <= 0) return 0;
  return ht * (1 + tauxPct / 100);
}

/** TTC → HT. */
export function ttcToHt(ttc: number, tauxPct: number): number {
  if (!Number.isFinite(ttc) || ttc <= 0) return 0;
  return ttc / (1 + tauxPct / 100);
}
