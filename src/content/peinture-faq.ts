import type { FAQItem } from '@/components/FAQAccordion';

export const peintureFAQ: FAQItem[] = [
  {
    question: 'Comment calculer la quantité de peinture ?',
    answer:
      "Multipliez la surface à peindre par le nombre de couches, puis divisez par le rendement de la peinture (m² couverts par litre, indiqué sur le pot). Pour 30 m² en 2 couches avec un rendement de 10 m²/L : 30 × 2 ÷ 10 = 6 litres. Le calculateur convertit aussi le résultat en nombre de pots.",
  },
  {
    question: 'Combien de m² couvre 1 litre de peinture ?',
    answer:
      "En général autour de 10 m² par litre et par couche pour une peinture murale classique, mais cela varie de 6 à 12 m²/L selon le produit, le support et la couleur. Un mur poreux, une reprise ou une teinte très couvrante réduisent le rendement. Utilisez la valeur indiquée sur votre pot pour un calcul juste.",
  },
  {
    question: 'Combien de couches de peinture prévoir ?',
    answer:
      "Deux couches sont la règle pour un rendu couvrant et uniforme sur la plupart des supports. Une seule couche peut suffire pour un simple rafraîchissement dans la même teinte. Un changement de couleur important, un support neuf ou une teinte foncée peuvent demander une sous-couche plus deux couches de finition.",
  },
  {
    question: 'Faut-il une sous-couche en plus de la peinture ?',
    answer:
      "Sur un support neuf (plâtre, enduit), très absorbant, taché ou de couleur très différente, une sous-couche (primaire d'accrochage ou d'impression) améliore l'accroche, uniformise l'absorption et réduit le nombre de couches de finition. Calculez-la séparément avec la même méthode, à partir de son rendement propre.",
  },
  {
    question: 'Comment estimer la peinture pour une pièce entière ?',
    answer:
      "Additionnez la surface des murs (périmètre × hauteur) et, si vous le peignez, celle du plafond (surface au sol). Vous pouvez déduire les grandes ouvertures. Saisissez ce total dans le calculateur avec le nombre de couches et le rendement pour obtenir les litres et le nombre de pots.",
  },
];
