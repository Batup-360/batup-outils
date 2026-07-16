/**
 * Pente de toiture — conversions entre pourcentage, degrés et dimensions.
 * La pente en % = (dénivelé / base horizontale) × 100.
 * L'angle en degrés = arctan(dénivelé / base).
 */

/** Pente en % à partir du dénivelé (hauteur) et de la base horizontale. */
export function pentePourcent(hauteur: number, base: number): number {
  if (!Number.isFinite(hauteur) || !Number.isFinite(base) || base <= 0 || hauteur < 0) return 0;
  return (hauteur / base) * 100;
}

/** Angle en degrés à partir du dénivelé et de la base horizontale. */
export function angleDegres(hauteur: number, base: number): number {
  if (!Number.isFinite(hauteur) || !Number.isFinite(base) || base <= 0 || hauteur < 0) return 0;
  return (Math.atan(hauteur / base) * 180) / Math.PI;
}

/** Longueur du rampant (pente réelle) = hypoténuse base/hauteur. */
export function longueurRampant(hauteur: number, base: number): number {
  if (!Number.isFinite(hauteur) || !Number.isFinite(base) || base < 0 || hauteur < 0) return 0;
  return Math.hypot(base, hauteur);
}

/** Convertit une pente en % vers un angle en degrés. */
export function pourcentVersDegres(pourcent: number): number {
  if (!Number.isFinite(pourcent) || pourcent < 0) return 0;
  return (Math.atan(pourcent / 100) * 180) / Math.PI;
}

/** Convertit un angle en degrés vers une pente en %. */
export function degresVersPourcent(degres: number): number {
  if (!Number.isFinite(degres) || degres < 0 || degres >= 90) return 0;
  return Math.tan((degres * Math.PI) / 180) * 100;
}
