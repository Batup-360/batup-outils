/**
 * Helpers partagés pour les calculateurs de quantités « métré » :
 * carrelage, parquet, placo, parpaings, briques, isolant, peinture,
 * terrasse, consommation de matériaux.
 *
 * Toutes les surfaces sont en m². La perte est un pourcentage (coupes,
 * casse, chutes) ajouté à la surface avant le calcul.
 */

/** Surface majorée de la perte (%). */
export function surfaceAvecPerte(surfaceM2: number, pertePct: number): number {
  if (!Number.isFinite(surfaceM2) || surfaceM2 <= 0) return 0;
  const perte = Number.isFinite(pertePct) && pertePct > 0 ? pertePct : 0;
  return surfaceM2 * (1 + perte / 100);
}

/** Nombre d'unités (carreaux, blocs, plaques…) arrondi au supérieur. */
export function unitesParSurface(surfaceM2: number, unitesParM2: number, pertePct = 0): number {
  const s = surfaceAvecPerte(surfaceM2, pertePct);
  if (s <= 0 || !Number.isFinite(unitesParM2) || unitesParM2 <= 0) return 0;
  return Math.ceil(s * unitesParM2);
}

/** Nombre de paquets / rouleaux couvrant la surface, arrondi au supérieur. */
export function paquetsNecessaires(surfaceM2: number, surfaceParPaquet: number, pertePct = 0): number {
  const s = surfaceAvecPerte(surfaceM2, pertePct);
  if (s <= 0 || !Number.isFinite(surfaceParPaquet) || surfaceParPaquet <= 0) return 0;
  return Math.ceil(s / surfaceParPaquet);
}

/** Quantité continue (kg, L…) = surface × taux au m² (non arrondie). */
export function quantiteParSurface(surfaceM2: number, tauxParM2: number, pertePct = 0): number {
  const s = surfaceAvecPerte(surfaceM2, pertePct);
  if (s <= 0 || !Number.isFinite(tauxParM2) || tauxParM2 <= 0) return 0;
  return s * tauxParM2;
}

/** Litres de peinture = surface × nombre de couches / rendement (m²/L). */
export function peintureLitres(
  surfaceM2: number,
  nombreCouches: number,
  rendementM2ParL: number,
  pertePct = 0,
): number {
  const s = surfaceAvecPerte(surfaceM2, pertePct);
  if (s <= 0 || !Number.isFinite(nombreCouches) || nombreCouches <= 0) return 0;
  if (!Number.isFinite(rendementM2ParL) || rendementM2ParL <= 0) return 0;
  return (s * nombreCouches) / rendementM2ParL;
}

/** Unités par m² à partir d'une taille de carreau/lame en cm (L × l). */
export function unitesParM2DepuisCm(longueurCm: number, largeurCm: number): number {
  if (![longueurCm, largeurCm].every((n) => Number.isFinite(n) && n > 0)) return 0;
  const aireM2 = (longueurCm / 100) * (largeurCm / 100);
  return aireM2 > 0 ? 1 / aireM2 : 0;
}
