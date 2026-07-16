import type { FAQItem } from '@/components/FAQAccordion';

export const consommationFAQ: FAQItem[] = [
  {
    question: 'Comment estimer la quantité de matériau nécessaire ?',
    answer:
      "Multipliez la surface à traiter par la consommation au m² indiquée par le fabricant, puis ajoutez une marge de perte. Pour 40 m² d'un produit à 2 kg/m² avec 10 % de marge : 40 × 2 × 1,10 = 88 kg. Le calculateur donne le total dans l'unité choisie (kg, litres ou sacs).",
  },
  {
    question: 'Quelles sont les consommations courantes au m² ?',
    answer:
      "À titre indicatif : mortier-colle carrelage 3 à 4 kg/m² en simple encollage, 6 à 8 kg/m² en double encollage (grands formats). Enduit de lissage environ 1 à 1,5 kg/m² et par millimètre d'épaisseur. Primaire d'accrochage 0,1 à 0,3 L/m². Ragréage autonivelant environ 1,5 kg/m² par millimètre. Vérifiez toujours la fiche technique de votre produit : ces valeurs varient selon le support et la méthode.",
  },
  {
    question: 'Où trouver la consommation au m² d’un produit ?',
    answer:
      "Sur l'emballage ou la fiche technique du produit, généralement exprimée en kg/m² ou L/m², parfois pour une épaisseur donnée. Elle peut être fournie sous forme de fourchette selon le support et la technique de pose. Prenez la valeur haute pour un support irrégulier ou poreux.",
  },
  {
    question: 'Pourquoi ajouter une marge de perte ?',
    answer:
      "Parce que la consommation réelle dépasse souvent la valeur théorique : irrégularités du support, surépaisseurs locales, pertes au malaxage et en fond de seau. Une marge de 5 à 10 % évite de manquer de produit en cours d'application, ce qui est particulièrement gênant pour les colles et enduits qui doivent être posés en continu.",
  },
  {
    question: 'À quels produits ce calculateur s’applique-t-il ?',
    answer:
      "À tout matériau dont la consommation est exprimée au m² : mortier-colle, colle à carrelage, enduit de façade ou de lissage, primaire d'accrochage, résine, imperméabilisant, laine soufflée en sacs, etc. Il suffit d'indiquer la surface, la consommation au m² et l'unité. Pour le béton, le mortier ou la peinture, des calculateurs dédiés existent.",
  },
  {
    question: 'Comment convertir la quantité en nombre de sacs ou de seaux ?',
    answer:
      "Une fois la quantité totale connue (par exemple en kg), divisez-la par le conditionnement du produit (poids d'un sac ou d'un seau) et arrondissez au supérieur. Pour 165 kg de mortier-colle en sacs de 25 kg : 165 ÷ 25 = 6,6, soit 7 sacs. Choisissez l'unité « sacs » dans le calculateur pour raisonner directement en conditionnements.",
  },
];
