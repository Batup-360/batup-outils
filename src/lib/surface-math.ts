/**
 * Aires de formes simples pour le calcul de surface (m²).
 * Toutes les dimensions sont en mètres.
 */

export type FormeSurface = 'rectangle' | 'triangle' | 'cercle';

/** Rectangle : longueur × largeur. */
export function aireRectangle(longueur: number, largeur: number): number {
  if (![longueur, largeur].every((n) => Number.isFinite(n) && n > 0)) return 0;
  return longueur * largeur;
}

/** Triangle : base × hauteur / 2. */
export function aireTriangle(base: number, hauteur: number): number {
  if (![base, hauteur].every((n) => Number.isFinite(n) && n > 0)) return 0;
  return (base * hauteur) / 2;
}

/** Disque à partir du diamètre : π × (d/2)². */
export function aireCercle(diametre: number): number {
  if (!Number.isFinite(diametre) || diametre <= 0) return 0;
  const r = diametre / 2;
  return Math.PI * r * r;
}

/** Aire d'une forme selon deux dimensions (b = seconde dimension, ignorée pour le cercle). */
export function aireForme(forme: FormeSurface, a: number, b: number): number {
  switch (forme) {
    case 'rectangle':
      return aireRectangle(a, b);
    case 'triangle':
      return aireTriangle(a, b);
    case 'cercle':
      return aireCercle(a);
    default:
      return 0;
  }
}
