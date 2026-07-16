import type { FAQItem } from '@/components/FAQAccordion';

export const parpaingsFAQ: FAQItem[] = [
  {
    question: 'Combien de parpaings au m² ?',
    answer:
      "Avec un parpaing standard de 20×50 cm (face vue), il faut 10 blocs par m² de mur, car chaque bloc couvre 0,10 m². Un bloc de 25×50 cm en demande 8 par m², un bloc de 20×40 cm environ 12,5 par m². Le calculateur applique le ratio du format que vous choisissez.",
  },
  {
    question: 'Comment calculer le nombre de parpaings d’un mur ?',
    answer:
      "Multipliez la longueur du mur par sa hauteur pour obtenir la surface en m², puis multipliez par le nombre de blocs au m² correspondant à votre format, et ajoutez une marge de 5 % pour les coupes et la casse. Pour un mur de 20 m² en blocs standards : 20 × 10 = 200 blocs, soit environ 210 avec la marge.",
  },
  {
    question: 'Combien de mortier pour monter des parpaings ?',
    answer:
      "Comptez environ 25 à 30 kg de mortier par m² de mur en pose classique, davantage pour des blocs plus épais ou des joints plus larges. Pour connaître le ciment, le sable et l'eau nécessaires, utilisez le calculateur de mortier en indiquant la surface de joints et l'épaisseur.",
  },
  {
    question: 'Faut-il déduire les ouvertures du calcul ?',
    answer:
      "Pour un chiffrage précis, vous pouvez déduire la surface des portes et fenêtres du total. En pratique, beaucoup de maçons gardent la surface pleine comme marge de sécurité pour les coupes autour des ouvertures et la casse. Si vous déduisez, conservez au moins 5 % de marge sur le résultat.",
  },
  {
    question: 'Quelle épaisseur de parpaing choisir ?',
    answer:
      "Le parpaing de 20 cm d'épaisseur est le standard pour les murs porteurs et les murs de façade. Le 15 cm convient pour des murs de refend ou de clôture, le 10 cm pour des cloisons. L'épaisseur ne change pas le nombre de blocs au m² (qui dépend de la face vue), mais influe sur le volume de mortier et le coût.",
  },
  {
    question: 'Combien de sacs de ciment pour monter un mur en parpaings ?',
    answer:
      "Pour un mortier de montage dosé à 300 kg/m³, il faut environ 1 sac de 35 kg de ciment pour 30 à 35 parpaings posés, mélangé à du sable (dosage 1 volume de ciment pour 3 à 4 de sable). Le volume de joints dépend de l'épaisseur du bloc. Le calculateur de mortier détaille le ciment, le sable et l'eau selon votre surface de joints.",
  },
  {
    question: 'Parpaing ou brique : que choisir ?',
    answer:
      "Le parpaing est plus économique et rapide à monter, mais faiblement isolant : il impose une isolation rapportée. La brique (notamment monomur) offre une meilleure inertie et isolation thermique, pour un coût matériau plus élevé. Le choix dépend du budget, de la réglementation thermique visée et de l'isolation prévue. Comparez le coût global, pose et isolation comprises.",
  },
  {
    question: 'Combien coûte un mur en parpaings au m² ?',
    answer:
      "Fourni-posé, un mur en parpaings se situe souvent autour de 40 à 90 € HT/m² selon la région, l'épaisseur du bloc, les fondations et l'accès au chantier, hors enduit et isolation. Le seul matériau (blocs + mortier) représente une part minoritaire ; la main-d'œuvre pèse lourd. Utilisez le calculateur de prix de chantier pour un chiffrage complet.",
  },
];
