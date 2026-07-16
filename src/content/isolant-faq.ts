import type { FAQItem } from '@/components/FAQAccordion';

export const isolantFAQ: FAQItem[] = [
  {
    question: 'Comment calculer la quantité d’isolant ?',
    answer:
      "Prenez la surface à isoler en m², ajoutez une marge de perte d'environ 5 % pour les découpes, puis divisez par la surface couverte par un rouleau ou un paquet (indiquée sur l'emballage). Pour 60 m² de combles avec des rouleaux de 6 m² et 5 % de marge : 63 ÷ 6 ≈ 11 rouleaux.",
  },
  {
    question: 'Faut-il poser l’isolant en une ou deux couches ?',
    answer:
      "Pour atteindre les résistances thermiques exigées en combles, on pose souvent deux couches croisées : la première entre solives, la seconde perpendiculaire pour supprimer les ponts thermiques. Dans ce cas, la surface à couvrir double. Le calculateur raisonne par surface : indiquez la surface totale réellement à couvrir (une ou deux couches).",
  },
  {
    question: 'Quelle surface couvre un rouleau d’isolant ?',
    answer:
      "Cela dépend du produit et de l'épaisseur : un rouleau de laine peut couvrir de quelques m² à une dizaine de m² selon sa longueur et sa largeur. La valeur exacte est sur l'emballage. Saisissez-la dans le calculateur pour obtenir le nombre de rouleaux et la surface totale.",
  },
  {
    question: 'Quelle résistance thermique (R) viser ?',
    answer:
      "La résistance thermique R dépend de la paroi et des exigences réglementaires ou des aides. Les combles demandent des valeurs de R élevées, les murs et les sols des valeurs moindres. Le R conditionne l'épaisseur d'isolant, pas directement le nombre de rouleaux au m² : vérifiez l'épaisseur nécessaire pour atteindre le R visé avant de commander.",
  },
  {
    question: 'Le calcul vaut-il pour les panneaux et la laine soufflée ?',
    answer:
      "Pour les rouleaux et les panneaux, oui : on divise la surface (avec marge) par la contenance d'un conditionnement. Pour la laine soufflée en vrac, le calcul est différent : on raisonne en sacs par m² selon l'épaisseur et la densité visées, valeurs données par le fabricant. Utilisez alors le calculateur de consommation de matériaux.",
  },
  {
    question: 'Quelle épaisseur d’isolant pour un R donné ?',
    answer:
      "L'épaisseur se déduit de la formule e = λ × R, où λ est la conductivité de l'isolant (W/m·K) et R la résistance visée (m²·K/W). Avec une laine de λ = 0,038 pour viser R = 7 en combles perdus : 0,038 × 7 ≈ 0,27 m, soit 27 cm. Plus l'isolant est performant (λ faible), plus l'épaisseur pour un même R est réduite. Le calculateur affiche l'épaisseur conseillée selon la paroi et le λ saisi.",
  },
  {
    question: 'Quelle résistance thermique R viser selon la paroi ?',
    answer:
      "Les seuils courants (aides et RE) sont : R ≥ 7 en combles perdus, R ≥ 6 en combles aménagés et rampants, R ≥ 4,5 en toiture-terrasse, R ≥ 3,7 pour les murs et R ≥ 3 pour un plancher bas. Ce sont des minimums : viser au-dessus améliore le confort et les économies. Choisissez la paroi dans le calculateur pour afficher le R cible et l'épaisseur associée.",
  },
  {
    question: 'L’isolation des combles est-elle éligible à MaPrimeRénov’ ?',
    answer:
      "Depuis 2020, l'isolation des combles perdus n'est plus financée « par geste » isolé par MaPrimeRénov' : elle n'est éligible que dans le cadre d'un Parcours accompagné (rénovation d'ampleur). Les CEE (certificats d'économie d'énergie) restent en revanche mobilisables. Vérifiez les conditions en vigueur et le recours à un artisan RGE avant de chiffrer le reste à charge.",
  },
];
