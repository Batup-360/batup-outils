import type { FAQItem } from '@/components/FAQAccordion';

export const chapeFAQ: FAQItem[] = [
  {
    question: 'Quelle épaisseur pour une chape ?',
    answer:
      "Une chape traditionnelle fait généralement 4 à 6 cm d'épaisseur, 5 cm étant la valeur courante. En dessous de 4 cm, elle risque de fissurer ou de sonner creux ; au-dessus de 6 cm, elle est inutilement lourde et longue à sécher. Sur un plancher chauffant, l'épaisseur d'enrobage minimale au-dessus des tubes est généralement de 3 à 5 cm selon le système.",
  },
  {
    question: 'Quel dosage de ciment pour une chape ?',
    answer:
      "Une chape se dose autour de 350 kg de ciment par m³, soit un mortier maigre de ciment et de sable. À ce dosage, comptez environ 10 sacs de ciment de 35 kg par m³ de chape. Le calculateur ci-dessus vous donne le ciment, le sable et l'eau à partir de la surface et de l'épaisseur.",
  },
  {
    question: 'Combien de sacs de ciment pour une chape de 30 m² ?',
    answer:
      "Pour 30 m² sur 5 cm, le volume est de 1,5 m³. À 350 kg/m³, cela représente environ 525 kg de ciment, soit à peu près 15 sacs de 35 kg, avec environ 2 175 kg de sable. Ajustez selon l'épaisseur réelle : le calculateur recalcule tout automatiquement.",
  },
  {
    question: 'Combien de temps sèche une chape avant de carreler ?',
    answer:
      "Comptez environ une semaine de séchage par centimètre d'épaisseur pour une chape ciment traditionnelle, soit à peu près 3 à 4 semaines pour 5 cm avant de poser du carrelage, et davantage pour un parquet ou un sol souple plus sensibles à l'humidité. Une chape fluide anhydrite sèche différemment ; suivez les préconisations du fabricant et vérifiez le taux d'humidité résiduelle.",
  },
  {
    question: 'Quelle différence entre une chape et une dalle ?',
    answer:
      "La dalle est un ouvrage en béton (avec gravier), souvent porteur, coulé sur un hérisson ou un vide sanitaire. La chape est un mortier (sans gravier) étalé par-dessus pour dresser et niveler le sol avant le revêtement. On coule d'abord la dalle béton, puis on réalise la chape de finition. Pour la dalle, utilisez le calculateur de béton.",
  },
  {
    question: 'Faut-il une chape désolidarisée ou adhérente ?',
    answer:
      "Une chape adhérente est coulée directement sur le support et y adhère : elle convient sur une dalle saine et propre. Une chape désolidarisée est coulée sur un film ou un isolant (cas d'un plancher chauffant ou d'une isolation phonique) et n'adhère pas au support : elle doit alors être plus épaisse et souvent armée d'un treillis. Le choix dépend du support et de la destination de la pièce.",
  },
];
