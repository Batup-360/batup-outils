/**
 * BTP pricing math — copied from Batup's shared/pricing.ts (PR-F, 2026-05-22).
 * These functions never change (set by accounting reality), so duplicating
 * them avoids coupling this static site to the SaaS repo.
 */

/**
 * Calcule le taux horaire à facturer à partir d'un coût horaire et d'une
 * marge nette cible (% sur prix de vente).
 *
 * Formule : taux = coût / (1 - marge/100).
 */
export function calculateBillableHourlyRate(hourlyCost: number, marginRate: number): number {
  if (marginRate >= 100) return hourlyCost;
  if (!Number.isFinite(hourlyCost) || hourlyCost <= 0) return 0;
  return hourlyCost / (1 - marginRate / 100);
}

/**
 * Seuil "limite" = 14,5 % de marge nette (≈ 17 % de markup historique).
 * En dessous, un aléa (SAV, remise, retard de paiement) peut basculer le
 * chantier en perte.
 */
export const VERDICT_LIMIT_MARGIN_PCT = 14.5;

export type VerdictKind = 'rentable' | 'limite' | 'perte';

export function computeVerdict(
  marginPct: number,
  prixEstime: number,
  coutsDirects: number
): VerdictKind {
  if (coutsDirects > prixEstime) return 'perte';
  if (marginPct < VERDICT_LIMIT_MARGIN_PCT) return 'limite';
  return 'rentable';
}
