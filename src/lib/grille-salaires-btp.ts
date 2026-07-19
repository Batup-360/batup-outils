/**
 * Grilles de salaires minima conventionnels du Bâtiment.
 *
 * ⚠️ DONNÉES LÉGALES — CHAQUE MONTANT EST TRANSCRIT D'UN ACCORD DATÉ ET SOURCÉ.
 * Ne jamais saisir un chiffre « de mémoire ». Ajouter une région = ajouter une
 * entrée à REGIONS avec ses grilles ouvriers/ETAM réelles. C'est le fichier que
 * la tâche planifiée de maintenance revérifie.
 *
 * Sources de vérité : Légifrance (accords étendus par IDCC) et
 * code.travail.gouv.fr, recoupées via juristique.org / legisocial.fr.
 *
 * Structure :
 *   - Ouvriers (IDCC 1596 ≤10 & 1597 >10) et ETAM (IDCC 2609) : RÉGIONAL.
 *   - Cadres (IDCC 2420) : NATIONAL (CADRES_NATIONAL, partagé par toutes les régions).
 * Une page programmatique est générée par région présente dans REGIONS
 * (query « grille salaires minima bâtiment » × région).
 */

/** SMIC mensuel brut base 35 h (151,67 h). Plancher légal. À MAJ à chaque revalorisation. */
export const SMIC_MENSUEL_35H = 1867.02;
export const SMIC_DATE = '1er juin 2026';

export type CategorieKey = 'ouvriers' | 'etam' | 'cadres';

export interface GrilleLigne {
  label: string;
  coefficient?: number;
  /** Salaire minimum conventionnel brut mensuel, à la base horaire de la grille. */
  brutMensuel: number;
}

export interface CategorieGrille {
  idcc: string[];
  /** Heures mensuelles de référence (151,67 h = 35 h ; 169 h = 39 h). */
  baseHeuresMois: number;
  baseLabel: string;
  dateEffet: string;
  accord: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Plancher SMIC applicable (grilles base 35 h). */
  smicPlancher: boolean;
  note?: string;
  lignes: GrilleLigne[];
}

export interface Region {
  key: string;
  label: string;
  /** Absent tant que l'accord régional n'a pas été transcrit et vérifié. */
  ouvriers?: CategorieGrille;
  etam?: CategorieGrille;
}

// ─── Île-de-France ───────────────────────────────────────────────────────────
const OUVRIERS_IDF: CategorieGrille = {
  idcc: ['1596', '1597'],
  baseHeuresMois: 151.67,
  baseLabel: '35 h/semaine (151,67 h/mois)',
  dateEffet: '5 février 2026',
  accord: 'Accord régional IDF du 5 novembre 2025 (grille identique ≤ 10 et > 10 salariés)',
  sourceLabel: 'Légifrance — ouvriers bâtiment IDF (IDCC 1596 / 1597)',
  sourceUrl: 'https://www.legifrance.gouv.fr/',
  smicPlancher: true,
  note: 'Grille commune aux 8 départements franciliens (75, 77, 78, 91, 92, 93, 94, 95).',
  lignes: [
    { label: "Niveau I - Ouvrier d'exécution position 1", coefficient: 150, brutMensuel: 1843 },
    { label: "Niveau I - Ouvrier d'exécution position 2", coefficient: 170, brutMensuel: 1855 },
    { label: 'Niveau II - Ouvrier professionnel', coefficient: 185, brutMensuel: 1899 },
    { label: 'Niveau III - Compagnon professionnel position 1', coefficient: 210, brutMensuel: 2038 },
    { label: 'Niveau III - Compagnon professionnel position 2', coefficient: 230, brutMensuel: 2164 },
    { label: "Niveau IV - Maître ouvrier / chef d'équipe position 1", coefficient: 250, brutMensuel: 2292 },
    { label: "Niveau IV - Maître ouvrier / chef d'équipe position 2", coefficient: 270, brutMensuel: 2510 },
  ],
};

const ETAM_IDF: CategorieGrille = {
  idcc: ['2609'],
  baseHeuresMois: 151.67,
  baseLabel: '35 h/semaine (151,67 h/mois)',
  dateEffet: '5 février 2026',
  accord: 'Accord régional IDF du 5 novembre 2025',
  sourceLabel: 'Légifrance — ETAM bâtiment IDF (IDCC 2609)',
  sourceUrl: 'https://www.legifrance.gouv.fr/',
  smicPlancher: true,
  note: "Grille IDF hors Seine-et-Marne (77), qui relève d'un accord distinct.",
  lignes: [
    { label: 'Niveau A', brutMensuel: 1843 },
    { label: 'Niveau B', brutMensuel: 1932 },
    { label: 'Niveau C', brutMensuel: 2057 },
    { label: 'Niveau D', brutMensuel: 2239 },
    { label: 'Niveau E', brutMensuel: 2407 },
    { label: 'Niveau F', brutMensuel: 2841 },
    { label: 'Niveau G', brutMensuel: 3119 },
    { label: 'Niveau H', brutMensuel: 3357 },
  ],
};

// ─── Auvergne-Rhône-Alpes ────────────────────────────────────────────────────
// Ouvriers ARA : accord conclu (14 janvier 2026) mais grille chiffrée non encore
// transcrite depuis le texte officiel (BOCC/Légifrance). Ajoutée dès vérification.
const ETAM_ARA: CategorieGrille = {
  idcc: ['2609'],
  baseHeuresMois: 151.67,
  baseLabel: '35 h/semaine (151,67 h/mois)',
  dateEffet: '1er janvier 2026',
  accord: 'Accord régional Auvergne-Rhône-Alpes du 14 janvier 2026 (+ 2,03 %)',
  sourceLabel: 'Légifrance — ETAM bâtiment Auvergne-Rhône-Alpes (IDCC 2609)',
  sourceUrl: 'https://www.legifrance.gouv.fr/',
  smicPlancher: true,
  lignes: [
    { label: 'Niveau A', brutMensuel: 1834 },
    { label: 'Niveau B', brutMensuel: 1884 },
    { label: 'Niveau C', brutMensuel: 1994.18 },
    { label: 'Niveau D', brutMensuel: 2130.73 },
    { label: 'Niveau E', brutMensuel: 2377.33 },
    { label: 'Niveau F', brutMensuel: 2723.69 },
    { label: 'Niveau G', brutMensuel: 2993.52 },
    { label: 'Niveau H', brutMensuel: 3341.81 },
  ],
};

// ─── Cadres — grille NATIONALE (partagée) ────────────────────────────────────
export const CADRES_NATIONAL: CategorieGrille = {
  idcc: ['2420'],
  baseHeuresMois: 169,
  baseLabel: '39 h/semaine (169 h/mois)',
  dateEffet: '1er février 2026',
  accord: 'Avenant n° 78 du 19 janvier 2026 (CCN cadres du bâtiment)',
  sourceLabel: 'Légifrance — CCN cadres bâtiment (IDCC 2420)',
  sourceUrl: 'https://www.legifrance.gouv.fr/',
  smicPlancher: false,
  lignes: [
    { label: 'Coefficient 60', coefficient: 60, brutMensuel: 2356 },
    { label: 'Coefficient 65', coefficient: 65, brutMensuel: 2553 },
    { label: 'Coefficient 70', coefficient: 70, brutMensuel: 2740 },
    { label: 'Coefficient 75', coefficient: 75, brutMensuel: 2853 },
    { label: 'Coefficient 80', coefficient: 80, brutMensuel: 3036 },
    { label: 'Coefficient 85', coefficient: 85, brutMensuel: 3197 },
    { label: 'Coefficient 90', coefficient: 90, brutMensuel: 3353 },
    { label: 'Coefficient 95', coefficient: 95, brutMensuel: 3504 },
    { label: 'Coefficient 100', coefficient: 100, brutMensuel: 3622 },
    { label: 'Coefficient 103', coefficient: 103, brutMensuel: 3693 },
    { label: 'Coefficient 108', coefficient: 108, brutMensuel: 3827 },
    { label: 'Coefficient 120', coefficient: 120, brutMensuel: 4145 },
    { label: 'Coefficient 130', coefficient: 130, brutMensuel: 4411 },
    { label: 'Coefficient 162', coefficient: 162, brutMensuel: 5472 },
  ],
};

export const REGIONS: Region[] = [
  { key: 'ile-de-france', label: 'Île-de-France', ouvriers: OUVRIERS_IDF, etam: ETAM_IDF },
  { key: 'auvergne-rhone-alpes', label: 'Auvergne-Rhône-Alpes', etam: ETAM_ARA },
];

export const DEFAULT_REGION_KEY = 'ile-de-france';

export function getRegion(key: string | undefined): Region {
  return REGIONS.find((r) => r.key === key) ?? REGIONS[0];
}

export function categorieGrille(region: Region, categorie: CategorieKey): CategorieGrille | undefined {
  if (categorie === 'cadres') return CADRES_NATIONAL;
  return categorie === 'ouvriers' ? region.ouvriers : region.etam;
}

/** Minimum légal réellement applicable = max(conventionnel, SMIC) sur base 35 h. */
export function minimumApplicable(grille: CategorieGrille, ligne: GrilleLigne): {
  montant: number;
  smicApplique: boolean;
} {
  if (grille.smicPlancher && ligne.brutMensuel < SMIC_MENSUEL_35H) {
    return { montant: SMIC_MENSUEL_35H, smicApplique: true };
  }
  return { montant: ligne.brutMensuel, smicApplique: false };
}
