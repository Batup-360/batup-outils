/**
 * Métré papier peint — nombre de rouleaux pour tapisser une pièce.
 * Un « lé » est une bande verticale de papier. On calcule combien de lés
 * couvrent le périmètre, combien de lés tient un rouleau, puis le nombre
 * de rouleaux.
 */

export interface PapierPeintResult {
  surfaceM2: number;
  lesNecessaires: number;
  lesParRouleau: number;
  rouleaux: number;
}

const EMPTY: PapierPeintResult = { surfaceM2: 0, lesNecessaires: 0, lesParRouleau: 0, rouleaux: 0 };

/** Marge de coupe par lé (5 cm en haut + 5 cm en bas), à ajouter à la hauteur. */
export const MARGE_COUPE_M = 0.1;

/**
 * @param perimetreM        périmètre de la pièce (m)
 * @param hauteurM          hauteur sous plafond (m)
 * @param largeurRouleauM   largeur d'un rouleau (m), typiquement 0,53
 * @param longueurRouleauM  longueur d'un rouleau (m), typiquement 10
 * @param raccordCm         hauteur de raccord du motif (cm), 0 si sans raccord
 */
export function calculePapierPeint(
  perimetreM: number,
  hauteurM: number,
  largeurRouleauM = 0.53,
  longueurRouleauM = 10.05,
  raccordCm = 0,
): PapierPeintResult {
  if (
    ![perimetreM, hauteurM, largeurRouleauM, longueurRouleauM].every((n) => Number.isFinite(n) && n > 0)
  ) {
    return EMPTY;
  }
  const raccord = Number.isFinite(raccordCm) && raccordCm > 0 ? raccordCm / 100 : 0;
  // Chaque lé est coupé un peu plus long : hauteur + marge de coupe + raccord.
  const hauteurLe = hauteurM + MARGE_COUPE_M + raccord;

  const lesNecessaires = Math.ceil(perimetreM / largeurRouleauM);
  const lesParRouleau = Math.floor(longueurRouleauM / hauteurLe);
  const rouleaux = lesParRouleau > 0 ? Math.ceil(lesNecessaires / lesParRouleau) : 0;

  return {
    surfaceM2: perimetreM * hauteurM,
    lesNecessaires,
    lesParRouleau,
    rouleaux,
  };
}
