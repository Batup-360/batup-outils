import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import {
  Activity,
  Award,
  ArrowRight,
  Blocks,
  Box,
  Calculator,
  CheckSquare,
  Clock,
  CloudRain,
  Coins,
  Euro,
  FileCheck2,
  FileText,
  Footprints,
  Gauge,
  Grid2x2,
  Grid3x3,
  Grip,
  HardHat,
  Layers,
  LayoutGrid,
  PaintBucket,
  Percent,
  RectangleVertical,
  Receipt,
  Rows3,
  Ruler,
  Scale,
  Scroll,
  Search,
  ShieldCheck,
  Sparkles,
  SquareStack,
  Stamp,
  Sun,
  Thermometer,
  Triangle,
  TrendingUp,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import { PublicNav } from '@/components/PublicNav';
import { TopBanner } from '@/components/TopBanner';
import { PublicFooter } from '@/components/PublicFooter';
import { SEOHead } from '@/lib/seo-head';
import { siteOrigin } from '@/lib/urls';
import { METIERS } from '@/lib/salaires-metiers-btp';
import { REGIONS } from '@/lib/grille-salaires-btp';

type ToolType = 'Calculateur' | 'Simulateur' | 'Générateur' | 'Vérificateur' | 'Comparateur' | 'Fiche';

/** Insensible aux accents + à la casse (les artisans tapent « beton », « macon »). */
const deburr = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
type Theme = 'Pricing & marge' | 'Paie & RH' | 'Fiscal & légal' | 'Trésorerie & marchés' | 'Assurances & aides' | 'Métré & quantités';

interface Tool {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  type: ToolType;
  theme: Theme;
  popularity: number;
  /** Synonymes / vocabulaire réel cachés, pris en compte par la recherche. */
  keywords?: string;
}

// Mots-clés cachés par outil (vocabulaire métier, abréviations, sigles) pour
// améliorer le rappel de la recherche sans alourdir les descriptions visibles.
const KEYWORDS: Record<string, string> = {
  '/calculateur-taux-horaire-btp': 'tjm taux journalier deboursé débours déboursé sec coût horaire facturé prix de revient heure main d\'oeuvre',
  '/calculateur-prix-chantier-btp': 'devis chiffrage estimation prix de vente ht déboursé budget chantier',
  '/calculateur-marge-nette-coefficient-btp': 'coefficient marge brute k coeff multiplicateur taux de marge markup',
  '/calculateur-revision-prix-index-bt': 'bt01 index insee actualisation révision ccag marché public formule',
  '/calculateur-heures-supplementaires-btp': 'hsup heures sup majoration 25 50 panier trajet grand déplacement',
  '/calculateur-cout-salarie-btp': 'coût employeur charges patronales salaire chargé cibtp brut net coût main d\'oeuvre',
  '/calculateur-jours-intemperies-cibtp': 'intempéries chômage intempéries caisse congés arrêt météo gel',
  '/calculateur-prime-anciennete-ccn-batiment': 'ancienneté prime ccn ouvrier etam barème années fidélité',
  '/calculateur-tva-autoliquidation-btp': 'autoliquidation sous-traitance 283 nonies preneur donneur ordre mention',
  '/generateur-mention-tva-facture-btp': 'mention tva taux réduit 10 5.5 20 franchise facture',
  '/calculateur-charges-sociales-artisan-btp': 'urssaf cotisations tns micro auto-entrepreneur acre indépendant csg',
  '/comparateur-statut-juridique-artisan-btp': 'micro ei eurl sarl sasu forme juridique création statut',
  '/verificateur-mentions-obligatoires-facture-devis-btp': 'mentions légales facture devis conformité siret médiateur pénalités',
  '/calculateur-situation-travaux': 'acompte avancement facturation situation mensuelle décompte marché',
  '/calculateur-dgd-decompte-general-definitif': 'décompte général définitif solde marché réception dgd',
  '/calculateur-retenue-de-garantie': 'retenue garantie 5% caution bancaire libération loi 1799',
  '/simulateur-decennale-btp': 'assurance décennale responsabilité garantie prix tarif décennale',
  '/simulateur-rc-pro-btp': 'responsabilité civile professionnelle assurance rc pro tarif',
  '/calculateur-roi-certification-rge': 'rge reconnu garant environnement qualibat certification aides maprimerénov',
  '/calculateur-beton': 'béton dosage sacs ciment dalle fondation semelle poteau volume m3 gâchée',
  '/calculateur-tva': 'tva ht ttc conversion taux calcul',
  '/calculateur-surface': 'surface m2 carrez boutin superficie pièce plan',
  '/calculateur-volume': 'volume m3 cubage contenance litres',
  '/calculateur-escalier': 'escalier marches giron hauteur blondel limon nez de marche',
  '/calculateur-mortier': 'mortier ciment sable dosage gâchée joints maçonnerie',
  '/calculateur-chape': 'chape mortier sacs épaisseur ragréage liquide',
  '/calculateur-pente-toiture': 'pente toiture degré pourcentage inclinaison rampant toit',
  '/calculateur-papier-peint': 'papier peint rouleaux lés tapisserie tapissier',
  '/generateur-attestation-tva': 'attestation tva taux réduit cerfa mention certification bofip',
  '/calculateur-parpaings': 'parpaing bloc béton agglo aggloméré mur maçonnerie',
  '/calculateur-briques': 'brique creuse pleine monomur parement mur',
  '/calculateur-placo': 'placo ba13 plaque plâtre cloison doublage rails montants ba18',
  '/calculateur-carrelage': 'carrelage carreaux colle joint faïence m2 grès',
  '/calculateur-parquet': 'parquet lames stratifié contrecollé massif sous-couche sol lvt',
  '/calculateur-terrasse': 'terrasse lames bois composite lambourdes plots vis',
  '/calculateur-isolant': 'isolant isolation laine de verre rouleaux résistance thermique r combles ite',
  '/calculateur-peinture': 'peinture litres pots couches rendement m2 murs',
  '/calculateur-consommation-materiaux': 'consommation matériaux kg m2 colle enduit primaire ragréage',
  '/calculateur-tuiles': 'tuiles toiture couverture mécanique plate canal m2 liteaux',
  '/calculateur-gravier-sable': 'gravier sable tout-venant granulats tonnes tonnage m3 big bag remblai',
  '/calculateur-enduit-facade': 'enduit façade ravalement crépi monocouche gobetis kg sacs',
  '/grille-salaires-minima-batiment': 'grille salaire minima convention collective coefficient idcc 1596 1597 2609 2420 ouvrier etam cadre smic rémunération',
  '/salaires-metiers-btp': 'salaire métier combien gagne rémunération fiche paie net brut',
};

const TOOLS: Tool[] = [
  {
    href: '/calculateur-taux-horaire-btp',
    icon: <Clock className="h-6 w-6" />,
    title: 'Calculateur de taux horaire BTP',
    description: "Combien dois-je facturer l'heure pour couvrir mes charges et dégager une vraie marge ?",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 10,
  },
  {
    href: '/calculateur-prix-chantier-btp',
    icon: <FileText className="h-6 w-6" />,
    title: 'Calculateur de prix de chantier',
    description: 'Quel prix de vente HT viser pour un chantier rentable, sans surprise sur la marge ?',
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 9,
  },
  {
    href: '/calculateur-marge-nette-coefficient-btp',
    icon: <Percent className="h-6 w-6" />,
    title: 'Marge nette et coefficient',
    description: "Convertissez en un clic un coefficient en marge nette (ou l'inverse), avec le prix de vente correspondant.",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 8,
  },
  {
    href: '/calculateur-revision-prix-index-bt',
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'Révision de prix Index BT',
    description: "Formule CCAG-Travaux. Vérifiez votre clause de révision de prix en 30 secondes.",
    type: 'Calculateur',
    theme: 'Pricing & marge',
    popularity: 5,
  },
  {
    href: '/calculateur-heures-supplementaires-btp',
    icon: <Calculator className="h-6 w-6" />,
    title: 'Heures sup BTP + paniers',
    description: 'Heures supplémentaires 25 % / 50 %, paniers, indemnités de trajet, grand déplacement. Convention collective bâtiment.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 9,
  },
  {
    href: '/calculateur-cout-salarie-btp',
    icon: <Users className="h-6 w-6" />,
    title: 'Coût salarié employeur BTP',
    description: 'Du brut au coût total employeur : charges patronales, CIBTP, coût horaire chargé pour vos devis.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 8,
  },
  {
    href: '/calculateur-jours-intemperies-cibtp',
    icon: <CloudRain className="h-6 w-6" />,
    title: "Jours d'intempéries CIBTP",
    description: "Indemnisation 75 % du salaire, carence 1 h, plafond 55 j par an. Calcul en un clic pour votre dossier CIBTP.",
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 6,
  },
  {
    href: '/calculateur-prime-anciennete-ccn-batiment',
    icon: <Award className="h-6 w-6" />,
    title: "Prime d'ancienneté CCN bâtiment",
    description: "Barème national 2 à 15 % selon les années dans l'entreprise. Prime mensuelle, annuelle et coût employeur chargé.",
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 5,
  },
  {
    href: '/calculateur-tva-autoliquidation-btp',
    icon: <Receipt className="h-6 w-6" />,
    title: 'TVA autoliquidation sous-traitance',
    description: 'Suis-je en autoliquidation ? Quelle mention exacte mettre sur la facture ? Article 283-2 nonies du CGI.',
    type: 'Vérificateur',
    theme: 'Fiscal & légal',
    popularity: 7,
  },
  {
    href: '/generateur-mention-tva-facture-btp',
    icon: <FileCheck2 className="h-6 w-6" />,
    title: 'Générateur de mention TVA',
    description: 'TVA 20 %, 10 %, 5,5 %, autoliquidation, franchise. La bonne mention selon votre client et vos travaux.',
    type: 'Générateur',
    theme: 'Fiscal & légal',
    popularity: 7,
  },
  {
    href: '/calculateur-charges-sociales-artisan-btp',
    icon: <Wallet className="h-6 w-6" />,
    title: 'Charges sociales artisan BTP',
    description: 'Cotisations URSSAF, retraite, CSG-CRDS selon votre statut (micro, EI, EURL, SARL, SAS). Barème 2026.',
    type: 'Calculateur',
    theme: 'Fiscal & légal',
    popularity: 8,
  },
  {
    href: '/comparateur-statut-juridique-artisan-btp',
    icon: <Scale className="h-6 w-6" />,
    title: 'Comparateur de statut juridique',
    description: 'Micro, EI, EURL, SARL ou SAS pour votre activité BTP ? Wizard en 4 questions avec recommandation.',
    type: 'Comparateur',
    theme: 'Fiscal & légal',
    popularity: 6,
  },
  {
    href: '/verificateur-mentions-obligatoires-facture-devis-btp',
    icon: <CheckSquare className="h-6 w-6" />,
    title: 'Vérificateur mentions obligatoires',
    description: "Checklist conformité facture et devis BTP : SIRET, décennale, médiateur, pénalités. Qu'avez-vous oublié ?",
    type: 'Vérificateur',
    theme: 'Fiscal & légal',
    popularity: 5,
  },
  {
    href: '/calculateur-situation-travaux',
    icon: <Activity className="h-6 w-6" />,
    title: 'Situation de travaux (acompte)',
    description: "Avancement multiplié par le marché, moins déjà facturé, moins retenue. Votre situation mensuelle en un clin d'œil.",
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 7,
  },
  {
    href: '/calculateur-dgd-decompte-general-definitif',
    icon: <Sparkles className="h-6 w-6" />,
    title: 'DGD, décompte général définitif',
    description: 'Marché initial, avenants, révisions, pénalités, retenue. Le solde final pour la trésorerie de fin de chantier.',
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 5,
  },
  {
    href: '/calculateur-retenue-de-garantie',
    icon: <Coins className="h-6 w-6" />,
    title: 'Retenue de garantie 5 %',
    description: 'Montant retenu, date de libération, alternative caution bancaire. Loi 71-584.',
    type: 'Calculateur',
    theme: 'Trésorerie & marchés',
    popularity: 6,
  },
  {
    href: '/simulateur-decennale-btp',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Simulateur garantie décennale',
    description: "Fourchette de prix estimée pour votre métier, ancienneté et chiffre d'affaires. 10 corps de métier.",
    type: 'Simulateur',
    theme: 'Assurances & aides',
    popularity: 8,
  },
  {
    href: '/simulateur-rc-pro-btp',
    icon: <HardHat className="h-6 w-6" />,
    title: 'Simulateur RC Pro BTP',
    description: 'Estimation de votre cotisation Responsabilité Civile Professionnelle. Pack possible avec décennale.',
    type: 'Simulateur',
    theme: 'Assurances & aides',
    popularity: 6,
  },
  {
    href: '/calculateur-roi-certification-rge',
    icon: <Sun className="h-6 w-6" />,
    title: 'ROI certification RGE',
    description: 'Coût audit et temps formation comparés au revenu MaPrimeRénov. Le label RGE est-il rentable pour vous ?',
    type: 'Calculateur',
    theme: 'Assurances & aides',
    popularity: 5,
  },
  {
    href: '/calculateur-beton',
    icon: <Layers className="h-6 w-6" />,
    title: 'Calculateur de béton',
    description: 'Volume de votre dalle ou semelle et dosage exact : ciment (sacs), sable, gravier, eau. Dosage 250 / 350 / 400 kg/m³.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 9,
  },
  {
    href: '/calculateur-tva',
    icon: <Euro className="h-6 w-6" />,
    title: 'Calculateur de TVA (HT ↔ TTC)',
    description: 'Convertissez HT en TTC et TTC en HT en un clic, avec les taux du bâtiment : 20 %, 10 %, 5,5 %, 2,1 %.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 8,
  },
  {
    href: '/calculateur-surface',
    icon: <Ruler className="h-6 w-6" />,
    title: 'Calculateur de surface',
    description: 'Additionnez plusieurs zones (rectangle, triangle, cercle) pour la surface totale en m² : sols, murs, pièces.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 8,
  },
  {
    href: '/calculateur-volume',
    icon: <Box className="h-6 w-6" />,
    title: 'Calculateur de volume',
    description: 'Volume en m³ et en litres : béton, terrassement, déblais, cuve. Formes pavé et cylindre.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 7,
  },
  {
    href: '/calculateur-escalier',
    icon: <Footprints className="h-6 w-6" />,
    title: "Calculateur d'escalier",
    description: 'Nombre de marches, hauteur, giron et reculement selon la loi de Blondel. Vérification du confort en un clic.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 6,
  },
  {
    href: '/calculateur-mortier',
    icon: <Blocks className="h-6 w-6" />,
    title: 'Calculateur de mortier',
    description: 'Volume et dosage : ciment (sacs), sable, eau, pour un enduit, un montage ou un scellement. Dosage 300 / 350 / 400 kg/m³.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 6,
  },
  {
    href: '/calculateur-chape',
    icon: <SquareStack className="h-6 w-6" />,
    title: 'Calculateur de chape',
    description: 'Volume de chape et matériaux (ciment, sable, eau) selon la surface et l’épaisseur. Dosage 350 kg/m³.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-pente-toiture',
    icon: <Triangle className="h-6 w-6" />,
    title: 'Calculateur de pente de toiture',
    description: 'Conversion pente en % , en degrés et en cm/m, plus la longueur du rampant. Dans les deux sens.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-papier-peint',
    icon: <Scroll className="h-6 w-6" />,
    title: 'Calculateur de papier peint',
    description: 'Nombre de rouleaux selon les dimensions de la pièce, la hauteur sous plafond et le raccord du motif.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/generateur-attestation-tva',
    icon: <Stamp className="h-6 w-6" />,
    title: "Générateur d'attestation TVA",
    description: 'Attestation TVA simplifiée à taux réduit (10 % ou 5,5 %) à faire signer par le client. Prête à copier.',
    type: 'Générateur',
    theme: 'Fiscal & légal',
    popularity: 6,
  },
  {
    href: '/calculateur-parpaings',
    icon: <Grid2x2 className="h-6 w-6" />,
    title: 'Calculateur de parpaings',
    description: 'Nombre de blocs pour monter un mur selon les dimensions, le format de bloc et la marge de perte.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 6,
  },
  {
    href: '/calculateur-briques',
    icon: <Grid3x3 className="h-6 w-6" />,
    title: 'Calculateur de briques',
    description: 'Nombre de briques nécessaires pour un mur ou un parement selon le type de brique et les dimensions.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 4,
  },
  {
    href: '/calculateur-placo',
    icon: <RectangleVertical className="h-6 w-6" />,
    title: 'Calculateur de placo',
    description: 'Nombre de plaques de plâtre (BA13) pour vos murs et plafonds, avec estimation des vis.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-carrelage',
    icon: <LayoutGrid className="h-6 w-6" />,
    title: 'Calculateur de carrelage',
    description: 'Nombre de carreaux et surface à acheter selon la taille du carreau et la marge de perte.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-parquet',
    icon: <Rows3 className="h-6 w-6" />,
    title: 'Calculateur de parquet',
    description: 'Nombre de paquets et surface à acheter pour un parquet ou un sol stratifié, marge incluse.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 4,
  },
  {
    href: '/calculateur-terrasse',
    icon: <Grip className="h-6 w-6" />,
    title: 'Calculateur de terrasse',
    description: 'Nombre de lames de terrasse (bois ou composite) et surface à acheter selon les dimensions des lames.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-isolant',
    icon: <Thermometer className="h-6 w-6" />,
    title: "Calculateur d'isolant",
    description: 'Nombre de rouleaux ou panneaux et surface à isoler pour vos murs, combles ou sol.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 4,
  },
  {
    href: '/calculateur-peinture',
    icon: <PaintBucket className="h-6 w-6" />,
    title: 'Calculateur de peinture',
    description: 'Litres de peinture et nombre de pots selon la surface, le nombre de couches et le rendement.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/calculateur-consommation-materiaux',
    icon: <Gauge className="h-6 w-6" />,
    title: 'Consommation de matériaux',
    description: 'Quantité totale (kg, litres, sacs) d’un matériau selon la surface et la consommation au m².',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 3,
  },
  {
    href: '/calculateur-tuiles',
    icon: <Layers className="h-6 w-6" />,
    title: 'Calculateur de tuiles',
    description: 'Combien de tuiles pour votre toiture selon le type (mécanique, plate, canal) et la surface des pans ?',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 6,
  },
  {
    href: '/calculateur-gravier-sable',
    icon: <Box className="h-6 w-6" />,
    title: 'Gravier et sable (tonnage)',
    description: 'Convertissez surface et épaisseur en volume (m³) puis en tonnes de gravier, sable ou tout-venant.',
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 6,
  },
  {
    href: '/calculateur-enduit-facade',
    icon: <RectangleVertical className="h-6 w-6" />,
    title: "Calculateur d'enduit de façade",
    description: "Quantité d'enduit (kg et sacs de 25 kg) selon la surface et le type : monocouche, gobetis, corps d'enduit.",
    type: 'Calculateur',
    theme: 'Métré & quantités',
    popularity: 5,
  },
  {
    href: '/grille-salaires-minima-batiment',
    icon: <Coins className="h-6 w-6" />,
    title: 'Grille des salaires minima BTP',
    description: 'Salaires minima conventionnels 2026 : ouvriers, ETAM et cadres, par niveau et coefficient. Datés et sourcés.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 8,
  },
  {
    href: '/salaires-metiers-btp',
    icon: <Users className="h-6 w-6" />,
    title: 'Salaires par métier du BTP',
    description: 'Combien gagne un maçon, grutier, couvreur, menuisier… ? Salaire net, brut estimé et niveau conventionnel.',
    type: 'Calculateur',
    theme: 'Paie & RH',
    popularity: 8,
  },
];

// Fiches salaires (métiers + régions) : cherchables mais hors grille par défaut
// (n'apparaissent que sur une recherche, pour ne pas noyer les 42 outils).
const FICHES: Tool[] = [
  ...METIERS.map((m): Tool => ({
    href: `/salaire-${m.slug}`,
    icon: <HardHat className="h-6 w-6" />,
    title: `Salaire ${m.label.toLowerCase()}`,
    description: `Salaire net débutant, brut estimé et niveau conventionnel — ${m.label.toLowerCase()} dans le BTP.`,
    type: 'Fiche',
    theme: 'Paie & RH',
    popularity: 0,
    keywords: 'salaire net brut rémunération paie combien gagne fiche métier débutant confirmé',
  })),
  ...REGIONS.map((r): Tool => ({
    href: `/grille-salaires-minima-batiment/${r.key}`,
    icon: <Coins className="h-6 w-6" />,
    title: `Grille salaires BTP ${r.label}`,
    description: `Minima conventionnels ouvriers, ETAM et cadres du bâtiment en ${r.label}.`,
    type: 'Fiche',
    theme: 'Paie & RH',
    popularity: 0,
    keywords: 'grille salaire minima convention collective coefficient idcc ouvrier etam cadre région',
  })),
];

const ALL_TYPES: ToolType[] = ['Calculateur', 'Simulateur', 'Générateur', 'Vérificateur', 'Comparateur'];
const ALL_THEMES: Theme[] = ['Pricing & marge', 'Paie & RH', 'Fiscal & légal', 'Trésorerie & marchés', 'Assurances & aides', 'Métré & quantités'];

const TYPE_STYLES: Record<ToolType, { bg: string; text: string }> = {
  Calculateur: { bg: 'bg-brand-50', text: 'text-brand-700' },
  Simulateur: { bg: 'bg-sky-50', text: 'text-sky-700' },
  Générateur: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  Vérificateur: { bg: 'bg-amber-50', text: 'text-amber-700' },
  Comparateur: { bg: 'bg-rose-50', text: 'text-rose-700' },
  Fiche: { bg: 'bg-violet-50', text: 'text-violet-700' },
};

type SortKey = 'popular' | 'alpha';

export default function Home() {
  const base = siteOrigin();
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme | 'Tous'>('Tous');
  const [activeType, setActiveType] = useState<ToolType | 'Tous'>('Tous');
  const [sort, setSort] = useState<SortKey>('popular');

  const themeCounts = useMemo(() => {
    const counts: Record<string, number> = { Tous: TOOLS.length };
    for (const t of ALL_THEMES) counts[t] = TOOLS.filter((x) => x.theme === t).length;
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = deburr(query.trim());
    // Les fiches salaires n'entrent dans l'index que sur une recherche active.
    const base = q ? [...TOOLS, ...FICHES] : TOOLS;
    let list = base.filter((t) => {
      if (activeTheme !== 'Tous' && t.theme !== activeTheme) return false;
      if (activeType !== 'Tous' && t.type !== activeType) return false;
      if (q && !deburr(`${t.title} ${t.description} ${t.type} ${t.theme} ${KEYWORDS[t.href] ?? ''} ${t.keywords ?? ''}`).includes(q)) return false;
      return true;
    });
    if (sort === 'popular') list = list.slice().sort((a, b) => b.popularity - a.popularity);
    else list = list.slice().sort((a, b) => a.title.localeCompare(b.title, 'fr'));
    return list;
  }, [query, activeTheme, activeType, sort]);

  const resetFilters = () => {
    setQuery('');
    setActiveTheme('Tous');
    setActiveType('Tous');
  };

  const hasFilters = query.trim() !== '' || activeTheme !== 'Tous' || activeType !== 'Tous';

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: '#f5f5ff' }}>
      <SEOHead
        title="Outils BTP gratuits 2026 : 42 calculateurs | Batup"
        description="42 calculateurs gratuits pour artisans et PME du BTP : devis, taux horaire, marge, TVA, béton, métré, paie, charges, salaires, décennale. Sans inscription."
        canonicalUrl={`${base}/`}
      />
      <TopBanner />
      <PublicNav />
      <main className="flex-1">

        <section className="bg-gradient-to-b from-[#f5f5ff] via-white to-white pt-20 pb-12 sm:pt-24 sm:pb-14">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <span className="mb-5 inline-block rounded-full bg-brand-600/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 sm:text-sm">
              Ressources gratuites
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              Tous nos outils BTP gratuits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Pricing, paie, fiscalité, trésorerie, assurances. Les calculs critiques d'une entreprise BTP, dans un outil dédié pour chacun.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Gratuit
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Sans installation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Résultat par mail
              </span>
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-white py-8 sm:py-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un outil (taux horaire, marge, TVA...)"
                  className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    aria-label="Effacer la recherche"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Trier par</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-9 rounded-full border border-gray-200 bg-white px-3 text-sm font-medium text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="popular">Les plus utilisés</option>
                  <option value="alpha">Ordre alphabétique</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Thématique</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={activeTheme === 'Tous'}
                  onClick={() => setActiveTheme('Tous')}
                  label="Tous"
                  count={themeCounts.Tous}
                />
                {ALL_THEMES.map((t) => (
                  <FilterChip
                    key={t}
                    active={activeTheme === t}
                    onClick={() => setActiveTheme(t)}
                    label={t}
                    count={themeCounts[t]}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">Type d'outil</p>
              <div className="flex flex-wrap gap-2">
                <FilterChip
                  active={activeType === 'Tous'}
                  onClick={() => setActiveType('Tous')}
                  label="Tous"
                />
                {ALL_TYPES.map((t) => (
                  <FilterChip
                    key={t}
                    active={activeType === t}
                    onClick={() => setActiveType(t)}
                    label={t}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{filtered.length}</span> outil{filtered.length > 1 ? 's' : ''} sur {TOOLS.length}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-700"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-white pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {filtered.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            ) : (
              <div className="mx-auto max-w-md py-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <p className="text-base font-semibold text-gray-900">Aucun outil ne correspond</p>
                <p className="mt-2 text-sm text-gray-600">
                  Essayez d'autres mots clés ou réinitialisez les filtres pour voir tous les outils.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
                >
                  Voir tous les outils
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors'
          : 'inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-brand-500/50 hover:text-brand-700'
      }
    >
      {label}
      {typeof count === 'number' && (
        <span className={active ? 'text-white/70' : 'text-gray-400'}>{count}</span>
      )}
    </button>
  );
}

function ToolCard({ href, icon, title, description, type, theme }: Tool) {
  const styles = TYPE_STYLES[type];
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-lg"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
          {icon}
        </div>
        <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${styles.bg} ${styles.text}`}>
          {type}
        </span>
      </div>
      <h3 className="text-base font-bold text-gray-900 sm:text-lg">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
          {theme}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 transition-all group-hover:gap-2">
          Ouvrir
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
