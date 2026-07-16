/**
 * Volumes de formes simples (m³). Dimensions en mètres.
 * 1 m³ = 1000 litres.
 */

export type FormeVolume = 'pave' | 'cylindre';

export const LITRES_PAR_M3 = 1000;

/** Pavé droit (boîte) : longueur × largeur × hauteur. */
export function volumePave(longueur: number, largeur: number, hauteur: number): number {
  if (![longueur, largeur, hauteur].every((n) => Number.isFinite(n) && n > 0)) return 0;
  return longueur * largeur * hauteur;
}

/** Cylindre à partir du diamètre : π × (d/2)² × hauteur. */
export function volumeCylindre(diametre: number, hauteur: number): number {
  if (![diametre, hauteur].every((n) => Number.isFinite(n) && n > 0)) return 0;
  const r = diametre / 2;
  return Math.PI * r * r * hauteur;
}

export function volumeForme(forme: FormeVolume, a: number, b: number, c: number): number {
  switch (forme) {
    case 'pave':
      return volumePave(a, b, c);
    case 'cylindre':
      return volumeCylindre(a, b);
    default:
      return 0;
  }
}
