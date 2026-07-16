import type { FAQItem } from '@/components/FAQAccordion';

export const volumeFAQ: FAQItem[] = [
  {
    question: 'Comment calculer un volume en m³ ?',
    answer:
      "Pour une forme rectangulaire (pavé), multipliez la longueur par la largeur par la hauteur, en mètres : 3 m × 2 m × 0,5 m = 3 m³. Pour un cylindre, la formule est π × rayon² × hauteur. Le calculateur ci-dessus gère les deux formes et affiche le résultat en m³ et en litres.",
  },
  {
    question: 'Combien de litres dans 1 m³ ?',
    answer:
      "1 m³ = 1 000 litres. Donc 0,5 m³ = 500 litres et 2,5 m³ = 2 500 litres. Cette conversion est utile pour estimer la capacité d'une cuve, d'un récupérateur d'eau de pluie ou d'un bassin. Le calculateur donne directement le volume dans les deux unités.",
  },
  {
    question: 'Comment calculer un volume de terrassement ?',
    answer:
      "Multipliez la surface de la fouille par sa profondeur : une tranchée de 20 m de long, 0,6 m de large et 0,8 m de profondeur fait 20 × 0,6 × 0,8 = 9,6 m³. Attention au foisonnement : la terre excavée gonfle de 20 à 40 % selon le sol. Pour évacuer 9,6 m³ en place, prévoyez environ 12 m³ de bennes.",
  },
  {
    question: 'Comment calculer le volume d’un poteau ou d’un pieu rond ?',
    answer:
      "Utilisez la formule du cylindre : π × rayon² × hauteur. Pour un pieu de 30 cm de diamètre (rayon 0,15 m) et 3 m de profondeur : π × 0,15² × 3 ≈ 0,21 m³. Sélectionnez la forme « cylindre » dans le calculateur et saisissez le diamètre et la hauteur.",
  },
  {
    question: 'Quel volume de béton pour remplir un volume donné ?',
    answer:
      "Le volume de béton est égal au volume à remplir : un coffrage de 0,3 m³ demande 0,3 m³ de béton, plus une marge de 5 à 10 % pour les pertes. Pour connaître ensuite les quantités de ciment, de sable et de gravier, utilisez le calculateur de béton dédié, qui applique le dosage à ce volume.",
  },
  {
    question: 'Comment estimer la capacité d’une cuve cylindrique ?',
    answer:
      "Calculez son volume avec la formule du cylindre, puis convertissez en litres (× 1 000). Une cuve de 1,2 m de diamètre et 2 m de haut a un volume de π × 0,6² × 2 ≈ 2,26 m³, soit environ 2 260 litres. Pensez à retirer la garde d'air en partie haute si vous cherchez la capacité utile réelle.",
  },
];
