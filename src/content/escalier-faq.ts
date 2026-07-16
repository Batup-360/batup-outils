import type { FAQItem } from '@/components/FAQAccordion';

export const escalierFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le nombre de marches d’un escalier ?',
    answer:
      "Divisez la hauteur totale à monter (de sol fini à sol fini) par la hauteur de marche visée, autour de 17 à 18 cm, puis arrondissez au nombre entier le plus proche. Pour une hauteur de 2,80 m et des marches de 17,5 cm : 280 ÷ 17,5 = 16 marches. On recalcule ensuite la hauteur exacte : 280 ÷ 16 = 17,5 cm par marche.",
  },
  {
    question: 'Qu’est-ce que la loi de Blondel ?',
    answer:
      "C'est la règle de confort d'un escalier : 2 × hauteur de marche + giron doit être compris entre 59 et 66 cm, idéalement autour de 63 cm. Elle traduit le pas humain sur un plan incliné. Un escalier qui respecte Blondel est confortable et sûr ; en dehors de cette plage, il est soit trop raide, soit trop étiré.",
  },
  {
    question: 'Quelle est la bonne hauteur de marche ?',
    answer:
      "Entre 16 et 18 cm pour un escalier intérieur confortable, avec un idéal autour de 17 cm. En dessous de 16 cm l'escalier s'allonge inutilement ; au-dessus de 18 cm il devient fatigant, et au-delà de 20 cm il est inconfortable et peu sûr. Toutes les marches d'une même volée doivent avoir strictement la même hauteur.",
  },
  {
    question: 'Qu’est-ce que le giron d’une marche ?',
    answer:
      "Le giron est la profondeur utile de la marche, mesurée horizontalement d'un nez de marche au suivant : c'est là où on pose le pied. Il se déduit de la loi de Blondel (giron ≈ 63 − 2 × hauteur de marche) ou du reculement disponible divisé par le nombre de girons. Un giron confortable se situe généralement entre 25 et 32 cm.",
  },
  {
    question: 'Combien de place au sol prend un escalier ?',
    answer:
      "C'est le reculement : giron × (nombre de marches − 1). Pour 16 marches et un giron de 28 cm : 28 × 15 = 420 cm, soit 4,20 m de longueur au sol pour un escalier droit. Si l'espace est limité, un escalier tournant (quart ou demi-tournant) réduit l'emprise, au prix d'un calcul plus complexe.",
  },
  {
    question: 'Qu’est-ce que l’échappée d’un escalier ?',
    answer:
      "L'échappée est la hauteur libre mesurée verticalement au-dessus du nez des marches, sous le plafond ou la trémie. Elle doit être d'au moins 1,90 m (2 m recommandé) pour circuler sans se baisser ni se cogner la tête. C'est un point à vérifier en plus du dimensionnement des marches, surtout quand la trémie est courte.",
  },
];
