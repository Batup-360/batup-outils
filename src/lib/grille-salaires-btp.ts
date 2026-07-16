/**
 * Grilles de salaires minima conventionnels du Bâtiment.
 *
 * ⚠️ DONNÉES LÉGALES — CHAQUE MONTANT EST TRANSCRIT D'UN ACCORD DATÉ ET SOURCÉ.
 * Ne jamais saisir un chiffre « de mémoire ». Mettre à jour à chaque nouvel
 * accord (revalorisations régionales ~annuelles, à des dates différentes).
 * C'est le fichier que la tâche planifiée de maintenance revérifie.
 *
 * Sources de vérité : Légifrance (accords étendus par IDCC) et
 * code.travail.gouv.fr. Les grilles ci-dessous ont été recoupées via
 * juristique.org / legisocial.fr contre l'accord officiel.
 *
 * Périmètre v1 (MVP) :
 *   - Ouvriers Île-de-France (IDCC 1596 ≤10 & 1597 >10, grille identique)
 *   - ETAM Île-de-France (IDCC 2609)
 *   - Cadres — grille NATIONALE (IDCC 2420)
 * Autres régions à ajouter ensuite (même structure).
 */

/** SMIC mensuel brut base 35 h (151,67 h). Référence pour le plancher légal.
 *  À mettre à jour à chaque revalorisation du SMIC. */
export const SMIC_MENSUEL_35H = 1867.02;
export const SMIC_DATE = '1er juin 2026';

export type CategorieKey = 'ouvriers' | 'etam' | 'cadres';

export interface GrilleLigne {
  /** Libellé du poste / niveau. */
  label: string;
  /** Coefficient hiérarchique (absent pour certaines grilles). */
  coefficient?: number;
  /** Salaire minimum conventionnel brut mensuel, à la base horaire de la grille. */
  brutMensuel: number;
}

export interface Grille {
  categorie: CategorieKey;
  categorieLabel: string;
  regionKey: string;
  regionLabel: string;
  idcc: string[];
  /** Heures mensuelles de référence (151,67 h pour 35 h, 169 h pour 39 h). */
  baseHeuresMois: number;
  baseLabel: string;
  /** Date d'entrée en vigueur de la grille. */
  dateEffet: string;
  /** Accord de référence. */
  accord: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Le plancher SMIC s'applique-t-il à cette grille (base 35 h) ? */
  smicPlancher: boolean;
  note?: string;
  lignes: GrilleLigne[];
}

export const GRILLES: Grille[] = [
  {
    categorie: 'ouvriers',
    categorieLabel: 'Ouvriers',
    regionKey: 'ile-de-france',
    regionLabel: 'Île-de-France',
    idcc: ['1596', '1597'],
    baseHeuresMois: 151.67,
    baseLabel: '35 h/semaine (151,67 h/mois)',
    dateEffet: '5 février 2026',
    accord: "Accord régional IDF du 5 novembre 2025 (grille identique pour les entreprises ≤ 10 et > 10 salariés)",
    sourceLabel: 'Légifrance — accords ouvriers bâtiment IDF (IDCC 1596 / 1597)',
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
  },
  {
    categorie: 'etam',
    categorieLabel: 'ETAM',
    regionKey: 'ile-de-france',
    regionLabel: 'Île-de-France',
    idcc: ['2609'],
    baseHeuresMois: 151.67,
    baseLabel: '35 h/semaine (151,67 h/mois)',
    dateEffet: '5 février 2026',
    accord: 'Accord régional IDF du 5 novembre 2025',
    sourceLabel: 'Légifrance — accord ETAM bâtiment IDF (IDCC 2609)',
    sourceUrl: 'https://www.legifrance.gouv.fr/',
    smicPlancher: true,
    note: 'Grille IDF hors Seine-et-Marne (77) : ce département relève d\'un accord distinct.',
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
  },
  {
    categorie: 'cadres',
    categorieLabel: 'Cadres',
    regionKey: 'national',
    regionLabel: 'France entière (grille nationale)',
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
  },
];

/** Minimum légal réellement applicable = max(conventionnel, SMIC) sur les
 *  grilles base 35 h. Renvoie aussi si le SMIC a pris le relais. */
export function minimumApplicable(grille: Grille, ligne: GrilleLigne): {
  montant: number;
  smicApplique: boolean;
} {
  if (grille.smicPlancher && ligne.brutMensuel < SMIC_MENSUEL_35H) {
    return { montant: SMIC_MENSUEL_35H, smicApplique: true };
  }
  return { montant: ligne.brutMensuel, smicApplique: false };
}
