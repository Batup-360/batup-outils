/**
 * Dimensionnement d'escalier droit par la relation de Blondel :
 *   2 × hauteur de marche + giron ≈ 59 à 66 cm (cible ≈ 63 cm).
 * Un escalier confortable respecte cette plage et garde une hauteur de
 * marche ≤ 20 cm.
 */

export const BLONDEL_MIN = 59;
export const BLONDEL_MAX = 66;
export const BLONDEL_CIBLE = 63;
export const HAUTEUR_MARCHE_MAX = 20;

export interface EscalierResult {
  nombreMarches: number;
  hauteurMarcheCm: number;
  gironCm: number;
  blondelCm: number;
  reculementTotalCm: number;
  confortable: boolean;
}

const EMPTY: EscalierResult = {
  nombreMarches: 0,
  hauteurMarcheCm: 0,
  gironCm: 0,
  blondelCm: 0,
  reculementTotalCm: 0,
  confortable: false,
};

/**
 * @param hauteurTotaleCm   hauteur à monter, de sol fini à sol fini (cm)
 * @param hauteurMarcheSouhaiteeCm  hauteur de marche visée (défaut 17,5 cm)
 * @param reculementDisponibleCm    emprise au sol dispo ; si > 0 le giron en
 *                                  découle, sinon le giron vient de Blondel.
 */
export function calculeEscalier(
  hauteurTotaleCm: number,
  hauteurMarcheSouhaiteeCm = 17.5,
  reculementDisponibleCm = 0
): EscalierResult {
  if (!Number.isFinite(hauteurTotaleCm) || hauteurTotaleCm <= 0) return EMPTY;

  const cible =
    Number.isFinite(hauteurMarcheSouhaiteeCm) && hauteurMarcheSouhaiteeCm > 0
      ? hauteurMarcheSouhaiteeCm
      : 17.5;

  const nombreMarches = Math.max(1, Math.round(hauteurTotaleCm / cible));
  const hauteurMarcheCm = hauteurTotaleCm / nombreMarches;
  const nbGirons = Math.max(1, nombreMarches - 1);

  const gironCm =
    Number.isFinite(reculementDisponibleCm) && reculementDisponibleCm > 0
      ? reculementDisponibleCm / nbGirons
      : BLONDEL_CIBLE - 2 * hauteurMarcheCm;

  const blondelCm = 2 * hauteurMarcheCm + gironCm;

  return {
    nombreMarches,
    hauteurMarcheCm,
    gironCm,
    blondelCm,
    reculementTotalCm: gironCm * nbGirons,
    confortable:
      blondelCm >= BLONDEL_MIN && blondelCm <= BLONDEL_MAX && hauteurMarcheCm <= HAUTEUR_MARCHE_MAX,
  };
}
