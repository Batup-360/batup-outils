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
  label: 'Baromètres salaires BTP 2026 (Costructor, Batiactu Emploi)',
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
  {
    slug: 'plombier',
    label: 'Plombier',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1500,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Sanitaire/chauffage, dépannage vs neuf, habilitations, mise à son compte.',
  },
  {
    slug: 'chef-de-chantier',
    label: 'Chef de chantier',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 2000,
    niveauConventionnel: 'ETAM (niveaux E à G)',
    facteurs: "Taille des chantiers encadrés, corps d'état, ancienneté, région.",
  },
  {
    slug: 'conducteur-de-travaux',
    label: 'Conducteur de travaux',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 2200,
    niveauConventionnel: 'ETAM supérieur à cadre selon expérience',
    facteurs: "Nombre de chantiers pilotés, budget géré, diplôme, secteur (bâtiment/TP).",
  },
  {
    slug: 'dessinateur-projeteur',
    label: 'Dessinateur-projeteur',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 1600,
    niveauConventionnel: 'ETAM (bureau d\'études)',
    facteurs: 'Logiciels (AutoCAD, Revit/BIM), spécialité (structure, fluides), autonomie.',
  },
  {
    slug: 'plaquiste',
    label: 'Plaquiste',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1500,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Cloisons/doublages, plafonds suspendus, cadence, finitions.',
  },
  {
    slug: 'cordiste',
    label: 'Cordiste',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1700,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 230)',
    facteurs: 'Certification CQP/IRATA, travaux d\'accès difficile, prime de hauteur, danger.',
  },
  {
    slug: 'frigoriste',
    label: 'Frigoriste',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1700,
    niveauConventionnel: 'Niveau III (coeff. 210)',
    facteurs: 'Attestation fluides frigorigènes, froid commercial/industriel, astreintes.',
  },
  {
    slug: 'chauffagiste',
    label: 'Chauffagiste',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1600,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Chauffage/PAC/ENR, dépannage, qualifications RGE, astreintes.',
  },
  {
    slug: 'couvreur-zingueur',
    label: 'Couvreur-zingueur',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1700,
    niveauConventionnel: 'Niveau III (coeff. 210 à 230)',
    facteurs: 'Zinguerie, travail en hauteur, patrimoine, pénibilité.',
  },
  {
    slug: 'etancheur',
    label: 'Étancheur',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1450,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Toiture-terrasse, membranes, travail en hauteur, primes de chantier.',
  },
  {
    slug: 'desamianteur',
    label: 'Désamianteur',
    article: 'un',
    famille: 'Second œuvre',
    debutantNet: 1450,
    niveauConventionnel: 'Niveau I à II (coeff. 150 à 185)',
    facteurs: 'Sous-section 3/4, primes de pénibilité amiante, contraintes réglementaires fortes.',
  },
  {
    slug: 'tailleur-de-pierre',
    label: 'Tailleur de pierre',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1381,
    niveauConventionnel: 'Niveau III (coeff. 210 à 230)',
    facteurs: 'Monuments historiques, restauration du patrimoine, savoir-faire rare.',
  },
  {
    slug: 'canalisateur',
    label: 'Canalisateur',
    article: 'un',
    famille: 'Gros œuvre',
    debutantNet: 1750,
    niveauConventionnel: 'Niveau II à III (coeff. 185 à 210)',
    facteurs: 'Réseaux (eau, assainissement), travaux publics, engins, travail en tranchée.',
  },
  {
    slug: 'metreur',
    label: 'Métreur',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 1660,
    niveauConventionnel: 'ETAM (bureau d\'études)',
    facteurs: 'Chiffrage, logiciels de métré, lecture de plans, corps d\'état.',
  },
  {
    slug: 'geometre-topographe',
    label: 'Géomètre-topographe',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 1800,
    niveauConventionnel: 'ETAM à cadre selon diplôme',
    facteurs: 'Instruments (GPS, station totale, drone), foncier vs chantier, diplôme.',
  },
  {
    slug: 'economiste-de-la-construction',
    label: 'Économiste de la construction',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 2400,
    niveauConventionnel: 'ETAM supérieur à cadre',
    facteurs: 'Chiffrage tous corps d\'état, maîtrise d\'œuvre, BIM, diplôme.',
  },
  {
    slug: 'ingenieur-genie-civil',
    label: 'Ingénieur génie civil',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 2500,
    niveauConventionnel: 'Cadre (position A à C)',
    facteurs: 'Structure/ouvrages d\'art, calcul, école, secteur (BE, entreprise, MOA).',
  },
  {
    slug: 'directeur-de-travaux',
    label: 'Directeur de travaux',
    article: 'un',
    famille: 'Encadrement & études',
    debutantNet: 2770,
    niveauConventionnel: 'Cadre',
    facteurs: 'Nombre de chantiers/conducteurs pilotés, budget, expérience.',
  },
];

export function getMetier(slug: string | undefined): MetierSalaire | undefined {
  return METIERS.find((m) => m.slug === slug);
}

/** FAQ unique par métier (chiffres) — dé-duplique les pages + nourrit le schema
 *  FAQPage et les moteurs de réponse IA avec une « selection seed » propre. */
export function metierAtomicFaq(m: MetierSalaire): { question: string; answer: string } {
  const brut = Math.round((m.debutantNet / 0.78) / 10) * 10;
  const confirme = Math.round((m.debutantNet * CONFIRME_FACTEUR) / 10) * 10;
  const art = m.article.charAt(0).toUpperCase() + m.article.slice(1);
  const lbl = m.label.toLowerCase();
  return {
    question: `Combien gagne ${m.article} ${lbl} en 2026 ?`,
    answer: `${art} ${lbl} débutant gagne environ ${m.debutantNet} € net par mois (~${brut} € brut). Avec l'expérience (profil confirmé, 5 à 10 ans), comptez autour de ${confirme} € net. Classement conventionnel typique : ${m.niveauConventionnel}. Ce qui fait varier la rémunération : ${m.facteurs}`,
  };
}
