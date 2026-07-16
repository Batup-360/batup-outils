import type { FAQItem } from '@/components/FAQAccordion';

export const papierPeintFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le nombre de rouleaux de papier peint ?',
    answer:
      "Divisez le périmètre de la pièce par la largeur d'un rouleau (0,53 m en standard) pour obtenir le nombre de lés, puis divisez la longueur du rouleau (10 m) par la hauteur sous plafond pour savoir combien de lés tient un rouleau. Le nombre de rouleaux est le rapport des deux, arrondi au supérieur. Le calculateur enchaîne ces étapes automatiquement.",
  },
  {
    question: 'Quelles sont les dimensions d’un rouleau de papier peint ?',
    answer:
      "Le format standard européen est de 0,53 m de large sur 10 m de long, soit environ 5,3 m² par rouleau. Il existe aussi des rouleaux larges de 1,06 m et des formats intissés parfois plus longs. Vérifiez toujours les dimensions sur l'étiquette : le calculateur permet de saisir la largeur et la longueur réelles de vos rouleaux.",
  },
  {
    question: 'Qu’est-ce que le raccord d’un papier peint ?',
    answer:
      "Le raccord est la hauteur nécessaire pour aligner le motif d'un lé à l'autre. Un papier « sans raccord » se pose sans contrainte d'alignement. Un raccord droit ou sauté oblige à décaler chaque lé, donc à couper plus long et à jeter des chutes. Plus le raccord est grand, plus il faut de rouleaux : indiquez-le dans le calculateur pour un résultat juste.",
  },
  {
    question: 'Faut-il déduire les portes et fenêtres du calcul ?',
    answer:
      "En pratique, non : on calcule sur le périmètre complet sans déduire les ouvertures. Cette apparente sur-quantité sert de marge pour les pertes, les coupes autour des ouvertures et les ajustements de motif. Pour une pièce avec de très grandes baies, vous pouvez retirer un ou deux lés, mais gardez toujours de la marge.",
  },
  {
    question: 'Combien de rouleaux pour une pièce de 12 m² ?',
    answer:
      "Tout dépend du périmètre et de la hauteur, pas de la surface au sol. Une pièce de 12 m² (par exemple 4 × 3 m) a un périmètre de 14 m ; avec 2,50 m sous plafond et des rouleaux standards sans raccord, il faut environ 7 rouleaux. Entrez vos dimensions exactes dans le calculateur pour le nombre précis.",
  },
  {
    question: 'Pourquoi acheter un rouleau supplémentaire ?',
    answer:
      "Parce qu'il est très difficile de retrouver plus tard un papier du même bain de teinte. Les rouleaux d'un même lot partagent une teinte homogène ; un lot ultérieur peut présenter une légère différence de couleur, visible sur un mur. Un rouleau d'avance de la même référence et du même bain vous garantit des retouches invisibles en cas de dégât.",
  },
];
