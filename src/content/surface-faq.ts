import type { FAQItem } from '@/components/FAQAccordion';

export const surfaceFAQ: FAQItem[] = [
  {
    question: 'Comment calculer une surface en m² ?',
    answer:
      "Pour un rectangle, multipliez la longueur par la largeur, en mètres : 5 m × 4 m = 20 m². Pour un triangle, base × hauteur ÷ 2 ; pour un disque, π × rayon². Pour une surface complexe, découpez-la en formes simples et additionnez. Le calculateur ci-dessus permet d'ajouter autant de zones que nécessaire et affiche le total.",
  },
  {
    question: 'Comment calculer la surface d’une pièce en L ou irrégulière ?',
    answer:
      "Découpez la pièce en plusieurs rectangles, calculez l'aire de chacun, puis additionnez. Une pièce en L se divise en deux rectangles ; une niche ou un renfoncement s'ajoute ou se retranche. Le calculateur gère ce cas directement : ajoutez une zone par rectangle et il fait la somme automatiquement.",
  },
  {
    question: 'Quelle différence entre surface au sol et surface habitable ?',
    answer:
      "La surface au sol est l'aire mesurée à l'intérieur des murs, sans exclusion. La surface habitable (loi Boutin) retire en plus les murs, cloisons, marches, gaines et embrasures, ainsi que les parties dont la hauteur sous plafond est inférieure à 1,80 m, et exclut combles non aménagés, caves, garages, balcons et terrasses. Ce calculateur donne la surface brute au sol, pas un mesurage légal.",
  },
  {
    question: 'Quelle différence entre surface habitable (Boutin) et surface Carrez ?',
    answer:
      "Les deux ne comptent que les surfaces d'au moins 1,80 m de hauteur sous plafond. La loi Carrez sert à la vente en copropriété et inclut vérandas et combles non aménagés ≥ 1,80 m ; la loi Boutin sert à la location et les exclut. La Carrez est donc généralement supérieure ou égale à la Boutin pour un même bien. Les lots de moins de 8 m² ne sont pas comptés en Carrez.",
  },
  {
    question: 'La hauteur sous plafond compte-t-elle dans la surface ?',
    answer:
      "Oui : pour les surfaces habitable (Boutin) et Carrez, seules les parties d'au moins 1,80 m de hauteur sous plafond sont comptabilisées. Les zones plus basses (sous pente, sous escalier) sont exclues. Ce calculateur mesure la surface géométrique au sol sans appliquer cette règle : pour un mesurage réglementaire, faites appel à un diagnostiqueur.",
  },
  {
    question: 'Comment calculer la surface d’un mur à peindre ?',
    answer:
      "Multipliez la longueur du mur par sa hauteur : un mur de 4 m sur 2,5 m fait 10 m². Déduisez les ouvertures (une porte ≈ 1,9 m², une fenêtre ≈ 1,5 m²). Pour toute la pièce, additionnez les murs, puis ajoutez 5 à 10 % de marge de perte. Utilisez ensuite le calculateur de peinture pour convertir la surface en litres.",
  },
  {
    question: 'Comment convertir des m² en ares ou en hectares ?',
    answer:
      "1 are = 100 m² et 1 hectare = 10 000 m² (soit 100 ares). Donc 2 500 m² = 25 ares = 0,25 hectare. Ces unités servent surtout pour les terrains. Pour convertir des centimètres en mètres avant le calcul, divisez par 100 : 250 cm = 2,50 m. Gardez toujours toutes vos dimensions dans la même unité.",
  },
  {
    question: 'Puis-je utiliser ce résultat pour une vente ou une location ?',
    answer:
      "Non pour la valeur légale : ce calculateur donne la surface brute au sol, pas une surface Carrez (vente en copropriété) ni Boutin (location), qui exigent de déduire les murs et les zones sous 1,80 m. Pour un acte de vente ou un bail, un mesurage par un professionnel est nécessaire. L'outil reste parfait pour chiffrer un chantier, un revêtement ou une quantité de matériaux.",
  },
];
