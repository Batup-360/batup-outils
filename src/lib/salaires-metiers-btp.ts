/**
 * Salaires par métier du BTP — pages programmatiques « salaire <métier> ».
 *
 * ⚠️ Le seul chiffre affirmé est le salaire NET de début de carrière, transcrit
 * d'une source datée et citée (jamais inventé). Le reste est dérivé et étiqueté
 * comme estimation (brut ≈ net / 0,78 ; évolution avec l'expérience).
 *
 * Le niveau conventionnel indiqué est la classification TYPIQUE du métier dans la
 * convention des ouvriers du bâtiment (repère standard, pas une règle absolue) ;
 * le montant conventionnel exact se lit dans la grille des salaires (outil dédié).
 *
 * Ajouter un métier = ajouter une entrée à METIERS avec un debutantNet SOURCÉ.
 */

export interface MetierSalaire {
  slug: string;
  label: string;
  /** Article nominatif pour « combien gagne … » : "un", "une". */
  article: string;
  famille: 'Gros œuvre' | 'Second œuvre' | 'Encadrement & études';
  /** Salaire net mensuel de début de carrière (€), transcrit de la source. */
  debutantNet: number;
  /** Classification conventionnelle typique (bâtiment). */
  niveauConventionnel: string;
  /** Ce qui fait varier la rémunération. */
  facteurs: string;
}

/** Source des salaires nets de début de carrière. À revérifier périodiquement. */
export const METIER_SOURCE = {
  label: 'Baromètre Costructor — Salaire BTP 2026 (net, 1ère embauche)',
  url: 'https://costructor.co/blog/salaire-btp/',
  annee: '2026',
};

/** Passage net → brut (charges salariales ~22 % non-cadre). Estimation. */
export const NET_TO_BRUT = 1 / 0.78;
/** Majoration indicative pour un profil confirmé (5-10 ans). Estimation. */
export const CONFIRME_FACTEUR = 1.3;

export const METIERS: MetierSalaire[] = [
  {
    slug: 'macon',
    label: 'Maçon',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1715,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 230)',
    facteurs: "Qualification (CAP/BP), autonomie sur le chantier, région et taille de l'entreprise.",
  },
  {
    slug: 'grutier',
    label: 'Grutier',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 2230,
    niveauConventionnel: 'Niveau III (coeff. 210)',
    facteurs: 'Habilitations CACES (grue à tour, mobile), rareté du profil, type de chantier.',
  },
  {
    slug: 'coffreur-bancheur',
    label: 'Coffreur-bancheur',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1695,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 230)',
    facteurs: 'Maîtrise du coffrage/banches, cadence, grands chantiers de gros œuvre.',
  },
  {
    slug: 'charpentier',
    label: 'Charpentier',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1650,
    niveauConventionnel: 'Niveau III (coeff. 210 à 230)',
    facteurs: 'Bois/traditionnel ou industriel, travail en hauteur, expérience.',
  },
  {
    slug: 'couvreur',
    label: 'Couvreur',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1750,
    niveauConventionnel: 'Niveau III (coeff. 210 à 230)',
    facteurs: 'Zinguerie, travail en hauteur, pénibilité, région.',
  },
  {
    slug: 'menuisier',
    label: 'Menuisier',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1765,
    niveauConventionnel: 'Niveau III (coeff. 210)',
    facteurs: 'Pose ou fabrication (atelier), bois/alu/PVC, technicité.',
  },
  {
    slug: 'carreleur',
    label: 'Carreleur',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1865,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Finitions, grands formats, chantiers haut de gamme.',
  },
  {
    slug: 'peintre-en-batiment',
    label: 'Peintre en bâtiment',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1785,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Finitions décoratives, ravalement, rendement.',
  },
  {
    slug: 'electricien',
    label: 'Électricien du bâtiment',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1630,
    niveauConventionnel: 'Niveau III (coeff. 210)',
    facteurs: 'Habilitations électriques, tertiaire/industriel, domotique.',
  },
  {
    slug: 'soudeur',
    label: 'Soudeur',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1695,
    niveauConventionnel: 'Niveau III (coeff. 210)',
    facteurs: 'Procédés et licences de soudure, contrôle qualité, secteur.',
  },
];

export function getMetier(slug: string | undefined): MetierSalaire | undefined {
  return METIERS.find((m) => m.slug === slug);
}
