/**
 * SEO manifest — single source of truth for every public tool route.
 *
 * Imports each tool's copy + FAQ content and flattens it into one array that is
 * safe to consume from BOTH the Node/tsx prerender script and React components.
 *
 * IMPORTANT: keep this file free of any browser/React/DOM imports so it stays
 * importable from `scripts/prerender.ts` under plain tsx.
 */

// Pricing & marge
import { tauxHoraireCopy } from '@/content/taux-horaire-copy';
import { tauxHoraireFAQ } from '@/content/taux-horaire-faq';
import { prixChantierCopy } from '@/content/prix-chantier-copy';
import { prixChantierFAQ } from '@/content/prix-chantier-faq';
import { margeNetteCopy } from '@/content/marge-nette-copy';
import { margeNetteFAQ } from '@/content/marge-nette-faq';
import { revisionPrixIndexBTCopy } from '@/content/revision-prix-index-bt-copy';
import { revisionPrixIndexBTFAQ } from '@/content/revision-prix-index-bt-faq';

// Paie & RH
import { heuresSupCopy } from '@/content/heures-sup-copy';
import { heuresSupFAQ } from '@/content/heures-sup-faq';
import { coutSalarieCopy } from '@/content/cout-salarie-copy';
import { coutSalarieFAQ } from '@/content/cout-salarie-faq';
import { intemperiesCibtpCopy } from '@/content/intemperies-cibtp-copy';
import { intemperiesCibtpFAQ } from '@/content/intemperies-cibtp-faq';
import { primeAncienneteCopy } from '@/content/prime-anciennete-copy';
import { primeAncienneteFAQ } from '@/content/prime-anciennete-faq';

// Fiscal & légal
import { tvaAutoliquidationCopy } from '@/content/tva-autoliquidation-copy';
import { tvaAutoliquidationFAQ } from '@/content/tva-autoliquidation-faq';
import { mentionTvaCopy } from '@/content/mention-tva-copy';
import { mentionTvaFAQ } from '@/content/mention-tva-faq';
import { chargesSocialesCopy } from '@/content/charges-sociales-copy';
import { chargesSocialesFAQ } from '@/content/charges-sociales-faq';
import { statutJuridiqueCopy } from '@/content/statut-juridique-copy';
import { statutJuridiqueFAQ } from '@/content/statut-juridique-faq';
import { mentionsObligatoiresCopy } from '@/content/mentions-obligatoires-copy';
import { mentionsObligatoiresFAQ } from '@/content/mentions-obligatoires-faq';

// Cash, marchés & assurances
import { situationTravauxCopy } from '@/content/situation-travaux-copy';
import { situationTravauxFAQ } from '@/content/situation-travaux-faq';
import { dgdCopy } from '@/content/dgd-copy';
import { dgdFAQ } from '@/content/dgd-faq';
import { retenueGarantieCopy } from '@/content/retenue-garantie-copy';
import { retenueGarantieFAQ } from '@/content/retenue-garantie-faq';
import { decennaleCopy } from '@/content/decennale-copy';
import { decennaleFAQ } from '@/content/decennale-faq';
import { rcProCopy } from '@/content/rc-pro-copy';
import { rcProFAQ } from '@/content/rc-pro-faq';
import { roiRgeCopy } from '@/content/roi-rge-copy';
import { roiRgeFAQ } from '@/content/roi-rge-faq';

// Métré & quantités
import { betonCopy } from '@/content/beton-copy';
import { betonFAQ } from '@/content/beton-faq';
import { tvaCopy } from '@/content/tva-copy';
import { tvaFAQ } from '@/content/tva-faq';
import { surfaceCopy } from '@/content/surface-copy';
import { surfaceFAQ } from '@/content/surface-faq';
import { volumeCopy } from '@/content/volume-copy';
import { volumeFAQ } from '@/content/volume-faq';
import { escalierCopy } from '@/content/escalier-copy';
import { escalierFAQ } from '@/content/escalier-faq';
import { mortierCopy } from '@/content/mortier-copy';
import { mortierFAQ } from '@/content/mortier-faq';
import { chapeCopy } from '@/content/chape-copy';
import { chapeFAQ } from '@/content/chape-faq';
import { penteToitureCopy } from '@/content/pente-toiture-copy';
import { penteToitureFAQ } from '@/content/pente-toiture-faq';
import { papierPeintCopy } from '@/content/papier-peint-copy';
import { papierPeintFAQ } from '@/content/papier-peint-faq';
import { attestationTvaCopy } from '@/content/attestation-tva-copy';
import { attestationTvaFAQ } from '@/content/attestation-tva-faq';
import { parpaingsCopy } from '@/content/parpaings-copy';
import { parpaingsFAQ } from '@/content/parpaings-faq';
import { briquesCopy } from '@/content/briques-copy';
import { briquesFAQ } from '@/content/briques-faq';
import { placoCopy } from '@/content/placo-copy';
import { placoFAQ } from '@/content/placo-faq';
import { carrelageCopy } from '@/content/carrelage-copy';
import { carrelageFAQ } from '@/content/carrelage-faq';
import { parquetCopy } from '@/content/parquet-copy';
import { parquetFAQ } from '@/content/parquet-faq';
import { terrasseCopy } from '@/content/terrasse-copy';
import { terrasseFAQ } from '@/content/terrasse-faq';
import { isolantCopy } from '@/content/isolant-copy';
import { isolantFAQ } from '@/content/isolant-faq';
import { peintureCopy } from '@/content/peinture-copy';
import { peintureFAQ } from '@/content/peinture-faq';
import { consommationCopy } from '@/content/consommation-copy';
import { consommationFAQ } from '@/content/consommation-faq';
import { tuilesCopy } from '@/content/tuiles-copy';
import { tuilesFAQ } from '@/content/tuiles-faq';
import { gravierSableCopy } from '@/content/gravier-sable-copy';
import { gravierSableFAQ } from '@/content/gravier-sable-faq';
import { enduitFacadeCopy } from '@/content/enduit-facade-copy';
import { enduitFacadeFAQ } from '@/content/enduit-facade-faq';
import { grilleSalairesCopy } from '@/content/grille-salaires-copy';
import { grilleSalairesFAQ } from '@/content/grille-salaires-faq';

export interface SeoFaqItem {
  question: string;
  answer: string;
}

export interface SeoMethodologyBlock {
  heading: string;
  body: string;
}

export interface SeoMethodology {
  title: string;
  intro?: string;
  blocks: SeoMethodologyBlock[];
}

export interface SeoRoute {
  path: string;
  title: string;
  description: string;
  webApplicationName: string;
  webApplicationDescription: string;
  /** Short human label used in breadcrumbs + the internal-link hub. */
  breadcrumbName: string;
  h1: string;
  lede: string;
  methodology: SeoMethodology;
  faq: SeoFaqItem[];
}

type ToolCopy = {
  seo: { title: string; description: string; canonicalPath: string };
  webApplication: { name: string; description: string };
  hero: { h1: string; lede: string };
  methodology: SeoMethodology;
};

function toRoute(copy: ToolCopy, faq: SeoFaqItem[], breadcrumbName: string): SeoRoute {
  return {
    path: copy.seo.canonicalPath,
    title: copy.seo.title,
    description: copy.seo.description,
    webApplicationName: copy.webApplication.name,
    webApplicationDescription: copy.webApplication.description,
    breadcrumbName,
    h1: copy.hero.h1,
    lede: copy.hero.lede,
    methodology: copy.methodology,
    faq,
  };
}

export const SEO_ROUTES: SeoRoute[] = [
  // Pricing & marge
  toRoute(tauxHoraireCopy, tauxHoraireFAQ, 'Calculateur de taux horaire BTP'),
  toRoute(prixChantierCopy, prixChantierFAQ, 'Calculateur de prix de chantier BTP'),
  toRoute(margeNetteCopy, margeNetteFAQ, 'Calculateur de marge nette et coefficient BTP'),
  toRoute(
    revisionPrixIndexBTCopy,
    revisionPrixIndexBTFAQ,
    'Calculateur de révision de prix BTP (Index BT)'
  ),

  // Paie & RH
  toRoute(heuresSupCopy, heuresSupFAQ, 'Calculateur heures supplémentaires BTP'),
  toRoute(coutSalarieCopy, coutSalarieFAQ, 'Calculateur coût salarié employeur BTP'),
  toRoute(intemperiesCibtpCopy, intemperiesCibtpFAQ, "Calculateur jours d'intempéries CIBTP"),
  toRoute(
    primeAncienneteCopy,
    primeAncienneteFAQ,
    "Calculateur prime d'ancienneté CCN bâtiment"
  ),

  // Fiscal & légal
  toRoute(tvaAutoliquidationCopy, tvaAutoliquidationFAQ, 'Calculateur TVA autoliquidation BTP'),
  toRoute(mentionTvaCopy, mentionTvaFAQ, 'Générateur de mention TVA facture BTP'),
  toRoute(
    chargesSocialesCopy,
    chargesSocialesFAQ,
    'Calculateur charges sociales artisan BTP'
  ),
  toRoute(
    statutJuridiqueCopy,
    statutJuridiqueFAQ,
    'Comparateur statut juridique artisan BTP'
  ),
  toRoute(
    mentionsObligatoiresCopy,
    mentionsObligatoiresFAQ,
    'Vérificateur mentions obligatoires facture & devis BTP'
  ),

  // Cash, marchés & assurances
  toRoute(situationTravauxCopy, situationTravauxFAQ, 'Calculateur de situation de travaux'),
  toRoute(dgdCopy, dgdFAQ, 'Calculateur DGD (décompte général définitif)'),
  toRoute(retenueGarantieCopy, retenueGarantieFAQ, 'Calculateur de retenue de garantie'),
  toRoute(decennaleCopy, decennaleFAQ, 'Simulateur garantie décennale BTP'),
  toRoute(rcProCopy, rcProFAQ, 'Simulateur RC Pro BTP'),
  toRoute(roiRgeCopy, roiRgeFAQ, 'Calculateur ROI certification RGE'),

  // Métré & quantités
  toRoute(betonCopy, betonFAQ, 'Calculateur de béton'),
  toRoute(tvaCopy, tvaFAQ, 'Calculateur de TVA (HT ↔ TTC)'),
  toRoute(surfaceCopy, surfaceFAQ, 'Calculateur de surface (m²)'),
  toRoute(volumeCopy, volumeFAQ, 'Calculateur de volume (m³)'),
  toRoute(escalierCopy, escalierFAQ, "Calculateur d'escalier"),
  toRoute(mortierCopy, mortierFAQ, 'Calculateur de mortier'),
  toRoute(chapeCopy, chapeFAQ, 'Calculateur de chape'),
  toRoute(penteToitureCopy, penteToitureFAQ, 'Calculateur de pente de toiture'),
  toRoute(papierPeintCopy, papierPeintFAQ, 'Calculateur de papier peint'),
  toRoute(attestationTvaCopy, attestationTvaFAQ, "Générateur d'attestation TVA"),
  toRoute(parpaingsCopy, parpaingsFAQ, 'Calculateur de parpaings'),
  toRoute(briquesCopy, briquesFAQ, 'Calculateur de briques'),
  toRoute(placoCopy, placoFAQ, 'Calculateur de plaques de placo'),
  toRoute(carrelageCopy, carrelageFAQ, 'Calculateur de carrelage'),
  toRoute(parquetCopy, parquetFAQ, 'Calculateur de parquet'),
  toRoute(terrasseCopy, terrasseFAQ, 'Calculateur de terrasse'),
  toRoute(isolantCopy, isolantFAQ, "Calculateur d'isolant"),
  toRoute(peintureCopy, peintureFAQ, 'Calculateur de peinture'),
  toRoute(consommationCopy, consommationFAQ, 'Calculateur de consommation de matériaux'),
  toRoute(tuilesCopy, tuilesFAQ, 'Calculateur de tuiles'),
  toRoute(gravierSableCopy, gravierSableFAQ, 'Calculateur de gravier et sable'),
  toRoute(enduitFacadeCopy, enduitFacadeFAQ, "Calculateur d'enduit de façade"),
  toRoute(grilleSalairesCopy, grilleSalairesFAQ, 'Grille des salaires minima du bâtiment'),
];

/** Quick lookup by route path. */
export const SEO_ROUTE_BY_PATH: Record<string, SeoRoute> = Object.fromEntries(
  SEO_ROUTES.map((r) => [r.path, r])
);

/**
 * Curated map of slug → related slugs. Each tool surfaces 3–4 contextually
 * relevant siblings to deepen internal linking and keep users on-site.
 */
export const RELATED_TOOLS: Record<string, string[]> = {
  '/calculateur-taux-horaire-btp': [
    '/calculateur-prix-chantier-btp',
    '/calculateur-marge-nette-coefficient-btp',
    '/calculateur-cout-salarie-btp',
  ],
  '/calculateur-prix-chantier-btp': [
    '/calculateur-marge-nette-coefficient-btp',
    '/calculateur-taux-horaire-btp',
    '/calculateur-situation-travaux',
  ],
  '/calculateur-marge-nette-coefficient-btp': [
    '/calculateur-prix-chantier-btp',
    '/calculateur-taux-horaire-btp',
    '/calculateur-cout-salarie-btp',
  ],
  '/calculateur-revision-prix-index-bt': [
    '/calculateur-situation-travaux',
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-heures-supplementaires-btp': [
    '/calculateur-cout-salarie-btp',
    '/calculateur-jours-intemperies-cibtp',
    '/calculateur-prime-anciennete-ccn-batiment',
  ],
  '/calculateur-cout-salarie-btp': [
    '/grille-salaires-minima-batiment',
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-prime-anciennete-ccn-batiment',
    '/calculateur-taux-horaire-btp',
  ],
  '/calculateur-jours-intemperies-cibtp': [
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-cout-salarie-btp',
    '/calculateur-prime-anciennete-ccn-batiment',
  ],
  '/calculateur-prime-anciennete-ccn-batiment': [
    '/grille-salaires-minima-batiment',
    '/calculateur-cout-salarie-btp',
    '/calculateur-heures-supplementaires-btp',
    '/calculateur-jours-intemperies-cibtp',
  ],
  '/calculateur-tva-autoliquidation-btp': [
    '/generateur-mention-tva-facture-btp',
    '/verificateur-mentions-obligatoires-facture-devis-btp',
    '/calculateur-charges-sociales-artisan-btp',
  ],
  '/generateur-mention-tva-facture-btp': [
    '/calculateur-tva-autoliquidation-btp',
    '/verificateur-mentions-obligatoires-facture-devis-btp',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-charges-sociales-artisan-btp': [
    '/comparateur-statut-juridique-artisan-btp',
    '/calculateur-cout-salarie-btp',
    '/grille-salaires-minima-batiment',
  ],
  '/comparateur-statut-juridique-artisan-btp': [
    '/calculateur-charges-sociales-artisan-btp',
    '/calculateur-cout-salarie-btp',
    '/simulateur-decennale-btp',
  ],
  '/verificateur-mentions-obligatoires-facture-devis-btp': [
    '/generateur-mention-tva-facture-btp',
    '/calculateur-tva-autoliquidation-btp',
    '/simulateur-decennale-btp',
  ],
  '/calculateur-situation-travaux': [
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-retenue-de-garantie',
    '/calculateur-revision-prix-index-bt',
  ],
  '/calculateur-dgd-decompte-general-definitif': [
    '/calculateur-situation-travaux',
    '/calculateur-retenue-de-garantie',
    '/calculateur-revision-prix-index-bt',
  ],
  '/calculateur-retenue-de-garantie': [
    '/calculateur-situation-travaux',
    '/calculateur-dgd-decompte-general-definitif',
    '/calculateur-prix-chantier-btp',
  ],
  '/simulateur-decennale-btp': [
    '/simulateur-rc-pro-btp',
    '/calculateur-roi-certification-rge',
    '/comparateur-statut-juridique-artisan-btp',
  ],
  '/simulateur-rc-pro-btp': [
    '/simulateur-decennale-btp',
    '/calculateur-roi-certification-rge',
    '/comparateur-statut-juridique-artisan-btp',
  ],
  '/calculateur-roi-certification-rge': [
    '/simulateur-decennale-btp',
    '/simulateur-rc-pro-btp',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-beton': [
    '/calculateur-volume',
    '/calculateur-surface',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-tva': [
    '/calculateur-tva-autoliquidation-btp',
    '/generateur-mention-tva-facture-btp',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-surface': [
    '/calculateur-volume',
    '/calculateur-beton',
    '/calculateur-prix-chantier-btp',
  ],
  '/calculateur-volume': [
    '/calculateur-beton',
    '/calculateur-surface',
    '/calculateur-escalier',
  ],
  '/calculateur-escalier': [
    '/calculateur-surface',
    '/calculateur-volume',
    '/calculateur-beton',
  ],
  '/calculateur-mortier': [
    '/calculateur-beton',
    '/calculateur-chape',
    '/calculateur-surface',
  ],
  '/calculateur-chape': [
    '/calculateur-mortier',
    '/calculateur-beton',
    '/calculateur-surface',
  ],
  '/calculateur-pente-toiture': [
    '/calculateur-surface',
    '/calculateur-volume',
    '/calculateur-beton',
  ],
  '/calculateur-papier-peint': [
    '/calculateur-surface',
    '/calculateur-mortier',
    '/calculateur-chape',
  ],
  '/generateur-attestation-tva': [
    '/generateur-mention-tva-facture-btp',
    '/calculateur-tva',
    '/calculateur-tva-autoliquidation-btp',
  ],
  '/calculateur-parpaings': [
    '/calculateur-briques',
    '/calculateur-mortier',
    '/calculateur-surface',
  ],
  '/calculateur-briques': [
    '/calculateur-parpaings',
    '/calculateur-mortier',
    '/calculateur-surface',
  ],
  '/calculateur-placo': [
    '/calculateur-surface',
    '/calculateur-peinture',
    '/calculateur-isolant',
  ],
  '/calculateur-carrelage': [
    '/calculateur-surface',
    '/calculateur-consommation-materiaux',
    '/calculateur-parquet',
  ],
  '/calculateur-parquet': [
    '/calculateur-surface',
    '/calculateur-carrelage',
    '/calculateur-terrasse',
  ],
  '/calculateur-terrasse': [
    '/calculateur-surface',
    '/calculateur-parquet',
    '/calculateur-beton',
  ],
  '/calculateur-isolant': [
    '/calculateur-placo',
    '/calculateur-surface',
    '/calculateur-consommation-materiaux',
  ],
  '/calculateur-peinture': [
    '/calculateur-surface',
    '/calculateur-placo',
    '/calculateur-papier-peint',
  ],
  '/calculateur-consommation-materiaux': [
    '/calculateur-carrelage',
    '/calculateur-surface',
    '/calculateur-peinture',
  ],
  '/calculateur-tuiles': [
    '/calculateur-pente-toiture',
    '/calculateur-surface',
    '/calculateur-isolant',
  ],
  '/calculateur-gravier-sable': [
    '/calculateur-volume',
    '/calculateur-beton',
    '/calculateur-terrasse',
  ],
  '/calculateur-enduit-facade': [
    '/calculateur-mortier',
    '/calculateur-surface',
    '/calculateur-peinture',
  ],
  '/grille-salaires-minima-batiment': [
    '/calculateur-cout-salarie-btp',
    '/calculateur-prime-anciennete-ccn-batiment',
    '/calculateur-heures-supplementaires-btp',
  ],
};

/**
 * Catégories des outils (mêmes thèmes que la grille de l'accueil). Sert au
 * prérendu de l'accueil et du hub de liens internes : un vrai lien par outil,
 * groupé par thème, lisible sans JavaScript.
 */
export const TOOL_CATEGORIES: { label: string; paths: string[] }[] = [
  {
    label: 'Pricing & marge',
    paths: [
      '/calculateur-taux-horaire-btp',
      '/calculateur-prix-chantier-btp',
      '/calculateur-marge-nette-coefficient-btp',
      '/calculateur-revision-prix-index-bt',
    ],
  },
  {
    label: 'Paie & RH',
    paths: [
      '/calculateur-heures-supplementaires-btp',
      '/calculateur-cout-salarie-btp',
      '/calculateur-jours-intemperies-cibtp',
      '/calculateur-prime-anciennete-ccn-batiment',
      '/grille-salaires-minima-batiment',
    ],
  },
  {
    label: 'Fiscal & légal',
    paths: [
      '/calculateur-tva',
      '/calculateur-tva-autoliquidation-btp',
      '/generateur-mention-tva-facture-btp',
      '/generateur-attestation-tva',
      '/calculateur-charges-sociales-artisan-btp',
      '/comparateur-statut-juridique-artisan-btp',
      '/verificateur-mentions-obligatoires-facture-devis-btp',
    ],
  },
  {
    label: 'Trésorerie & marchés',
    paths: [
      '/calculateur-situation-travaux',
      '/calculateur-dgd-decompte-general-definitif',
      '/calculateur-retenue-de-garantie',
    ],
  },
  {
    label: 'Assurances & aides',
    paths: [
      '/simulateur-decennale-btp',
      '/simulateur-rc-pro-btp',
      '/calculateur-roi-certification-rge',
    ],
  },
  {
    label: 'Métré & quantités',
    paths: [
      '/calculateur-beton',
      '/calculateur-surface',
      '/calculateur-volume',
      '/calculateur-escalier',
      '/calculateur-mortier',
      '/calculateur-chape',
      '/calculateur-pente-toiture',
      '/calculateur-papier-peint',
      '/calculateur-parpaings',
      '/calculateur-briques',
      '/calculateur-placo',
      '/calculateur-carrelage',
      '/calculateur-parquet',
      '/calculateur-terrasse',
      '/calculateur-isolant',
      '/calculateur-peinture',
      '/calculateur-consommation-materiaux',
      '/calculateur-tuiles',
      '/calculateur-gravier-sable',
      '/calculateur-enduit-facade',
    ],
  },
];

export interface BlogLink {
  href: string;
  label: string;
}

const WWW = 'https://www.batup.fr';
const BLOG_RENTABILITE: BlogLink = {
  href: `${WWW}/blog/calcul-rentabilite-chantier`,
  label: 'Calcul de rentabilité d’un chantier : la méthode pas à pas',
};
const BLOG_TVA: BlogLink[] = [
  {
    href: `${WWW}/blog/mention-tva-5-5-apres-suppression-cerfa-2026`,
    label: 'Mention TVA 5,5 % sur devis en 2026 : le texte exact après la suppression du Cerfa',
  },
  {
    href: `${WWW}/blog/tva-5-5-renovation-energetique-5-pieges-requalification`,
    label: 'TVA 5,5 % en rénovation énergétique : 5 pièges qui font requalifier le taux',
  },
];
const BLOG_OBLIGATIONS: BlogLink = {
  href: `${WWW}/blog/obligations-legales-avant-premier-chantier-btp`,
  label: 'Obligations légales de l’artisan BTP avant son premier chantier',
};
const BLOG_RECRUTEMENT: BlogLink = {
  href: `${WWW}/blog/recrutement-couvreur-charpentier-2026-solutions`,
  label: 'Recruter un couvreur ou un charpentier en 2026 : les solutions',
};
const LOGICIEL_DEVIS_FACTURE: BlogLink = {
  href: `${WWW}/logiciel-devis-facture-batiment`,
  label: 'Logiciel de devis et facture pour le bâtiment Batup',
};

/** Articles et pages de www.batup.fr à lire après l'outil (liens dans le HTML prérendu et dans l'appli). */
export const BLOG_LINKS: Record<string, BlogLink[]> = {
  '/calculateur-retenue-de-garantie': [
    {
      href: `${WWW}/blog/retenue-garantie-btp-recuperer-5-pourcent`,
      label: 'Retenue de garantie BTP : comment récupérer vos 5 %',
    },
  ],
  '/calculateur-marge-nette-coefficient-btp': [BLOG_RENTABILITE],
  '/calculateur-prix-chantier-btp': [BLOG_RENTABILITE],
  '/calculateur-taux-horaire-btp': [BLOG_RENTABILITE],
  '/generateur-attestation-tva': BLOG_TVA,
  '/generateur-mention-tva-facture-btp': BLOG_TVA,
  '/calculateur-tva-autoliquidation-btp': BLOG_TVA,
  '/comparateur-statut-juridique-artisan-btp': [BLOG_OBLIGATIONS],
  '/simulateur-decennale-btp': [BLOG_OBLIGATIONS],
  '/simulateur-rc-pro-btp': [BLOG_OBLIGATIONS],
  '/calculateur-charges-sociales-artisan-btp': [BLOG_OBLIGATIONS],
  '/salaire-couvreur': [BLOG_RECRUTEMENT],
  '/salaire-charpentier': [BLOG_RECRUTEMENT],
  '/calculateur-cout-salarie-btp': [BLOG_RECRUTEMENT],
  '/calculateur-jours-intemperies-cibtp': [
    {
      href: `${WWW}/blog/carte-btp-cibtp-2026-obligation-cout-sanction`,
      label: 'Carte BTP et CIBTP en 2026 : obligation, coût et sanctions',
    },
  ],
  '/verificateur-mentions-obligatoires-facture-devis-btp': [LOGICIEL_DEVIS_FACTURE],
  '/calculateur-situation-travaux': [LOGICIEL_DEVIS_FACTURE],
};
