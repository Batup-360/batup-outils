import type { FAQItem } from '@/components/FAQAccordion';

export const revisionPrixIndexBTFAQ: FAQItem[] = [
  {
    question: 'Quelle est la différence entre actualisation et révision de prix ?',
    answer:
      "L'actualisation est un ajustement unique du prix, appliqué avant le début des travaux lorsque plus de 3 mois séparent la date de l'offre du démarrage. La révision est un ajustement périodique, appliqué en cours d'exécution à chaque situation, via une formule d'index. Les deux ne se cumulent pas sur un même marché public.",
  },
  {
    question: 'Quelle est la formule de révision de prix d’un marché de travaux ?',
    answer:
      "La forme complète est P = P₀ × (a + b × BTₙ/BT₀), où « a » est la partie fixe non révisable et « b » la partie variable, avec a + b = 1. En marché public, la partie fixe est d'au moins 12,5 %. Le calculateur applique par défaut 0,15 de partie fixe et 0,85 de partie variable, une répartition courante et conforme.",
  },
  {
    question: 'Pourquoi une partie fixe de 12,5 % dans la formule ?',
    answer:
      "Pour les marchés publics de plus de 3 mois, la réglementation impose une partie fixe non révisable d'au moins 12,5 % du prix : l'entreprise assume une part du risque, seule la fraction variable suit l'index. Sans partie fixe, la formule se réduirait à P₀ × BTₙ/BT₀ — c'est l'approche courante en marché privé, où la clause est librement négociée.",
  },
  {
    question: 'Qu’est-ce que l’index BT01 et à quoi sert-il ?',
    answer:
      "Le BT01 est l'index national « tous corps d'état » publié chaque mois par l'INSEE : il mesure l'évolution des coûts du bâtiment (matériaux, main-d'œuvre, énergie). Il sert de référence pour réviser un prix de marché. Il existe des index plus ciblés (gros œuvre, second œuvre…) : choisissez celui qui correspond le mieux à la nature de vos travaux.",
  },
  {
    question: 'Qu’est-ce qu’un index provisoire et un index définitif ?',
    answer:
      "L'INSEE publie les index avec environ 2 à 3 mois de décalage. On facture donc d'abord avec un index provisoire (le dernier connu), puis on régularise dès que l'index définitif du mois concerné est publié. Cette régularisation peut donner lieu à un complément ou à une reprise sur la situation suivante. Prévoyez-la dans votre suivi.",
  },
  {
    question: 'La révision de prix est-elle obligatoire dans les marchés publics ?',
    answer:
      "Depuis le décret du 9 mars 2022, une clause de révision est en pratique imposée dans les marchés publics exposés à la volatilité des matières premières, pour protéger les entreprises comme l'acheteur. Une clause de révision ne peut pas être ajoutée par avenant en cours de marché, car cela fausserait la concurrence : elle doit figurer dès le marché initial.",
  },
  {
    question: 'Quel index BT utiliser selon le type de travaux ?',
    answer:
      "Le BT01 couvre tous corps d'état ; pour un lot spécialisé, un index plus précis est souvent plus juste (gros œuvre, second œuvre, corps d'état techniques). L'INSEE fait évoluer sa liste : certains index sont supprimés et d'autres créés (par exemple un index dédié à l'isolation thermique par l'extérieur en 2026). Utilisez l'index prévu par votre marché.",
  },
  {
    question: 'Comment intégrer la révision dans une situation de travaux ?',
    answer:
      "On calcule d'abord le coefficient de révision avec ce calculateur, puis on l'applique au montant de la situation avant retenue et TVA. En marché public, on utilise l'index provisoire, régularisé ensuite. Pour enchaîner situation et révision sur plusieurs chantiers sans erreur, un logiciel de suivi comme Batup automatise le calcul et la régularisation.",
  },
];
