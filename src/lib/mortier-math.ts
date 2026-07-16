/**
 * Métré mortier — volume et dosage (ciment + sable + eau, sans gravier).
 * Sert au montage de maçonnerie, aux enduits et aux chapes.
 *
 * Quantités ESTIMATIVES pour un mortier de chantier courant.
 */

/** Sable sec, kg par m³ de mortier (plus de sable qu'un béton, pas de gravier). */
export const SABLE_KG_PAR_M3_MORTIER = 1450;
/** Rapport eau/ciment courant. */
export const RATIO_EAU_CIMENT_MORTIER = 0.5;

export interface MortierMateriaux {
  volumeM3: number;
  cimentKg: number;
  sacs35: number;
  sacs25: number;
  sableKg: number;
  eauL: number;
}

/** Volume de mortier pour une surface (m²) et une épaisseur (cm) → m³. */
export function volumeMortier(surfaceM2: number, epaisseurCm: number): number {
  if (![surfaceM2, epaisseurCm].every((n) => Number.isFinite(n) && n > 0)) return 0;
  return surfaceM2 * (epaisseurCm / 100);
}

/**
 * Matériaux pour un volume de mortier à un dosage ciment (kg/m³) :
 * 300 enduit, 350 montage courant, 400 scellement / chape maigre.
 */
export function dosageMortier(volumeM3: number, dosageCimentKgParM3: number): MortierMateriaux {
  const v = Number.isFinite(volumeM3) && volumeM3 > 0 ? volumeM3 : 0;
  const dosage = Number.isFinite(dosageCimentKgParM3) && dosageCimentKgParM3 > 0 ? dosageCimentKgParM3 : 0;
  const cimentKg = v * dosage;
  return {
    volumeM3: v,
    cimentKg,
    sacs35: cimentKg > 0 ? Math.ceil(cimentKg / 35) : 0,
    sacs25: cimentKg > 0 ? Math.ceil(cimentKg / 25) : 0,
    sableKg: v * SABLE_KG_PAR_M3_MORTIER,
    eauL: cimentKg * RATIO_EAU_CIMENT_MORTIER,
  };
}
