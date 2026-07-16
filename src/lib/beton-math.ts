/**
 * Métré béton — volume d'un ouvrage rectangulaire et dosage des matériaux.
 *
 * Les quantités sont des ESTIMATIONS pour un béton courant de chantier.
 * Densités moyennes retenues (sable/gravier) et rapport eau/ciment ≈ 0,5.
 * Pour un béton structurel, se référer à l'étude béton de l'ouvrage.
 */

/** Masse volumique d'un béton courant (kg/m³). */
export const DENSITE_BETON_KG_PAR_M3 = 2400;
/** Rapport eau/ciment courant pour un béton ouvrable. */
export const RATIO_EAU_CIMENT = 0.5;
/** Part de sable dans le granulat total (sable + gravier). */
export const FRACTION_SABLE = 0.44;

export interface BetonMateriaux {
  volumeM3: number;
  cimentKg: number;
  sacs35: number;
  sacs25: number;
  sableKg: number;
  gravierKg: number;
  eauL: number;
}

/**
 * Volume de béton d'un ouvrage rectangulaire (dalle, semelle, longrine).
 * Longueur et largeur en mètres, épaisseur en centimètres → m³.
 */
export function volumeBeton(longueurM: number, largeurM: number, epaisseurCm: number): number {
  if (![longueurM, largeurM, epaisseurCm].every((n) => Number.isFinite(n) && n > 0)) return 0;
  return longueurM * largeurM * (epaisseurCm / 100);
}

/**
 * Matériaux nécessaires pour un volume de béton donné, à un dosage ciment
 * exprimé en kg/m³ (250 fondation légère, 350 dalle courante, 400 structurel).
 */
export function dosageBeton(volumeM3: number, dosageCimentKgParM3: number): BetonMateriaux {
  const v = Number.isFinite(volumeM3) && volumeM3 > 0 ? volumeM3 : 0;
  const dosage = Number.isFinite(dosageCimentKgParM3) && dosageCimentKgParM3 > 0 ? dosageCimentKgParM3 : 0;
  const cimentKg = v * dosage;
  const eauL = cimentKg * RATIO_EAU_CIMENT;
  // Le granulat (sable + gravier) complète la masse volumique du béton, une
  // fois retirés le ciment et l'eau : il DIMINUE quand le dosage ciment augmente.
  const granulatKg = Math.max(0, v * DENSITE_BETON_KG_PAR_M3 - cimentKg - eauL);
  return {
    volumeM3: v,
    cimentKg,
    sacs35: cimentKg > 0 ? Math.ceil(cimentKg / 35) : 0,
    sacs25: cimentKg > 0 ? Math.ceil(cimentKg / 25) : 0,
    sableKg: granulatKg * FRACTION_SABLE,
    gravierKg: granulatKg * (1 - FRACTION_SABLE),
    eauL,
  };
}
