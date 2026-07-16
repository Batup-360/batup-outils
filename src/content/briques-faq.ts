import type { FAQItem } from '@/components/FAQAccordion';

export const briquesFAQ: FAQItem[] = [
  {
    question: 'Combien de briques au m² ?',
    answer:
      "Cela dépend du format. Une brique de parement demande environ 50 briques par m², une brique pleine classique de 22×10,5 cm environ 65 par m², une brique creuse de grand format (50×20 cm) une dizaine par m². Vérifiez toujours les dimensions et le mode de pose annoncés par le fabricant : le calculateur applique le ratio du type sélectionné.",
  },
  {
    question: 'Comment calculer le nombre de briques d’un mur ?',
    answer:
      "Multipliez la longueur du mur par sa hauteur pour obtenir la surface en m², puis multipliez par le nombre de briques au m² du format choisi, et ajoutez 5 % de marge pour les coupes et la casse. Pour 25 m² de parement à 50 briques/m² : 25 × 50 = 1 250 briques, soit environ 1 313 avec la marge.",
  },
  {
    question: 'Quelle différence entre brique de parement et brique de structure ?',
    answer:
      "La brique de parement est une brique de façade, posée pour l'aspect esthétique, souvent en applique devant un mur porteur. La brique de structure (pleine ou creuse) constitue le mur lui-même. Leurs formats et donc leurs quantités au m² sont très différents : distinguez bien les deux avant de calculer.",
  },
  {
    question: 'Faut-il tenir compte des joints dans le calcul ?',
    answer:
      "Oui, indirectement : le nombre de briques au m² annoncé par les fabricants intègre déjà l'épaisseur de joint standard. Si vous posez avec des joints plus larges, le nombre de briques au m² diminue légèrement ; avec des joints très fins (collage), il augmente. Utilisez le ratio correspondant à votre type de pose.",
  },
  {
    question: 'Combien de mortier ou de colle pour poser des briques ?',
    answer:
      "Pour une pose au mortier, comptez de l'ordre de 25 à 40 kg de mortier par m² selon le format et l'épaisseur des joints. Pour une pose collée (briques rectifiées), la consommation de colle est bien plus faible et indiquée par le fabricant. Utilisez le calculateur de mortier pour le dosage détaillé.",
  },
  {
    question: 'Combien de briques monomur au m² ?',
    answer:
      "La brique monomur (terre cuite de 30 à 37,5 cm d'épaisseur) est un bloc de grand format : on en compte généralement une dizaine par m² de mur, valeur exacte donnée par le fabricant selon le format. Elle se pose souvent à joint mince (mortier-colle), ce qui réduit fortement la consommation de mortier par rapport à une pose traditionnelle.",
  },
  {
    question: 'Brique ou parpaing pour la performance thermique ?',
    answer:
      "À épaisseur égale, la terre cuite isole mieux que le parpaing béton et offre une meilleure inertie. La brique monomur peut suffire sans isolation rapportée dans certains cas, là où le parpaing l'exige presque toujours. Le parpaing reste moins cher au m². Le bon choix dépend du budget global, isolation comprise, et de la réglementation visée.",
  },
  {
    question: 'Combien coûte un mur en briques au m² ?',
    answer:
      "Fourni-posé, un mur en briques se situe souvent au-dessus du parpaing, de l'ordre de 60 à 120 € HT/m² selon le type de brique (parement, creuse, monomur), la région et la complexité, hors enduit. La brique monomur, plus technique, se situe dans le haut de la fourchette. Utilisez le calculateur de prix de chantier pour un devis complet.",
  },
];
