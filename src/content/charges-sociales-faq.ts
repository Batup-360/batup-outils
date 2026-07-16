import type { FAQItem } from '@/components/FAQAccordion';

export const chargesSocialesFAQ: FAQItem[] = [
  {
    question: 'Quel est le taux de charges sociales d’un artisan du BTP en 2026 ?',
    answer:
      "En micro-entreprise, un artisan du bâtiment (prestations BIC) paie 21,2 % de cotisations sociales sur le chiffre d'affaires encaissé, plus 0,3 % de contribution à la formation, soit environ 21,5 %. En société ou en entreprise individuelle au réel (statut TNS), les cotisations représentent environ 35 à 45 % du bénéfice, pas du chiffre d'affaires.",
  },
  {
    question: 'Comment calculer les charges sociales d’un auto-entrepreneur BTP ?',
    answer:
      "Multipliez le chiffre d'affaires encaissé par 21,2 % (prestations artisanales BIC). Pour 40 000 € de CA : 8 480 € de cotisations, plus 120 € de formation (0,3 %). En micro, les cotisations sont proportionnelles au CA, même sans bénéfice : c'est simple mais on ne déduit ni charges ni matériaux. Le calculateur ci-dessus le fait selon votre statut.",
  },
  {
    question: 'Micro-entreprise ou société : quel statut paie le moins de charges dans le BTP ?',
    answer:
      "Cela dépend surtout de vos achats de matériaux. En micro, vous cotisez sur tout le CA sans rien déduire : pénalisant si vous achetez beaucoup de fournitures. En EURL/SARL au réel, vous cotisez sur le bénéfice après déduction des charges et matériaux, souvent plus avantageux pour un BTP à forte matière. Comparez les deux avec le calculateur avant de choisir.",
  },
  {
    question: 'Comment fonctionne l’ACRE pour un artisan en 2026 ?',
    answer:
      "L'ACRE réduit les cotisations la première année (12 mois). Depuis le décret du 6 février 2026, l'exonération est de 25 % pour les entreprises créées à partir du 1er juillet 2026 (contre 50 % auparavant). Pour un micro-artisan BTP, le taux passe alors de 21,2 % à 15,9 %. La demande se fait dans les 45 jours suivant la création, sous conditions (demandeur d'emploi, jeune, RSA…).",
  },
  {
    question: 'Qu’est-ce que la CSG-CRDS pour un travailleur indépendant ?',
    answer:
      "La CSG-CRDS est une contribution incluse dans les cotisations sociales de l'indépendant. En micro-entreprise, elle est déjà comprise dans le taux global de 21,2 %. Pour un TNS au réel, elle s'ajoute aux cotisations maladie, retraite et allocations familiales et représente une part significative du total. Elle finance la protection sociale et n'ouvre pas de droits propres.",
  },
  {
    question: 'Quel chiffre d’affaires pour se verser un SMIC net en tant qu’artisan ?',
    answer:
      "En micro-artisan BTP, comptez qu'après 21,5 % de cotisations et vos frais (matériaux, véhicule, assurances), il faut environ 2 à 2,5 fois le net souhaité en chiffre d'affaires. Pour un SMIC net (~1 400 €/mois), visez souvent 2 800 à 3 500 € de CA mensuel selon vos charges. Le calculateur donne le net après cotisations ; ajoutez vos frais professionnels pour le net réel.",
  },
  {
    question: 'Peut-on déduire ses charges professionnelles en micro-entreprise BTP ?',
    answer:
      "Non. En micro-entreprise, on ne déduit aucune charge réelle : ni matériaux, ni véhicule, ni sous-traitance. Un abattement forfaitaire est appliqué pour l'impôt, mais les cotisations portent sur tout le chiffre d'affaires. C'est le point faible du régime pour le BTP, gros consommateur de fournitures : au-delà d'un certain volume d'achats, la société au réel devient plus avantageuse.",
  },
  {
    question: 'Quelle est la contribution à la formation professionnelle d’un artisan ?',
    answer:
      "En micro-entreprise, la contribution à la formation professionnelle (CFP) de l'artisan est de 0,3 % du chiffre d'affaires, prélevée avec les cotisations sociales. Elle ouvre des droits à la formation professionnelle. Pour un TNS au réel, elle prend la forme d'un forfait annuel. Le calculateur l'intègre au total des charges.",
  },
];
