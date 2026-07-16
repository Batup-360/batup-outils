import type { FAQItem } from '@/components/FAQAccordion';

export const placoFAQ: FAQItem[] = [
  {
    question: 'Quelle surface fait une plaque de BA13 ?',
    answer:
      "Une plaque de plâtre BA13 standard mesure 2,50 × 1,20 m, soit 3 m². Il existe aussi des formats de 2,60 m (3,12 m²) et de 3,00 m (3,6 m²), utiles pour limiter les joints sur les grandes hauteurs. Le calculateur permet de choisir le format et calcule le nombre de plaques en conséquence.",
  },
  {
    question: 'Comment calculer le nombre de plaques de placo ?',
    answer:
      "Divisez la surface totale à couvrir (murs et plafonds) par la surface d'une plaque, puis arrondissez au supérieur et ajoutez environ 10 % pour les découpes. Pour 40 m² à couvrir avec des plaques de 3 m² : 40 ÷ 3 ≈ 14 plaques, soit environ 15 à 16 avec la marge.",
  },
  {
    question: 'Combien de vis par plaque de placo ?',
    answer:
      "Comptez environ 25 vis par plaque pour une fixation sur ossature métallique aux entraxes courants (vissage tous les 30 cm sur les montants). Le calculateur affiche une estimation du nombre de vis à partir du nombre de plaques. Prévoyez toujours une boîte d'avance.",
  },
  {
    question: 'Pourquoi prévoir 10 % de perte sur le placo ?',
    answer:
      "Parce que les découpes autour des portes, fenêtres, prises et angles génèrent beaucoup de chutes souvent inutilisables. Une marge de 10 % évite les allers-retours au dépôt en cours de chantier. Sur une pièce très découpée ou avec des rampants, on peut monter jusqu'à 15 %.",
  },
  {
    question: 'Quels accessoires prévoir en plus des plaques ?',
    answer:
      "Pour une cloison ou un doublage sur ossature : des rails (au sol et au plafond), des montants verticaux (entraxe 60 cm en général), des vis, des bandes à joint et de l'enduit, et souvent un isolant. Le nombre de plaques n'est qu'une partie du métré ; pensez à chiffrer l'ossature et les finitions.",
  },
  {
    question: 'Combien de bande et d’enduit à joint pour le placo ?',
    answer:
      "Comptez environ 2 mètres linéaires de bande à joint par m² de plaque posée (joints entre plaques et angles), et de l'ordre de 0,4 à 0,5 kg d'enduit à joint par m² pour les trois passes. Un rouleau de bande fait souvent 150 m. Le calculateur estime ces quantités à partir de la surface pour ne pas les oublier au moment de commander.",
  },
  {
    question: 'Quel entraxe pour les montants et les rails ?',
    answer:
      "Les montants verticaux se posent à un entraxe de 60 cm en standard, ramené à 40 cm pour une cloison de grande hauteur, un carrelage mural lourd ou une meilleure rigidité. Les rails horizontaux ferment la cloison en haut et en bas. Cet entraxe conditionne le nombre de montants et le vissage (une plaque de 1,20 m couvre alors 3 montants).",
  },
  {
    question: 'Quel type de plaque choisir : hydrofuge, phonique ou feu ?',
    answer:
      "La plaque standard (grise) convient aux pièces sèches. En pièce humide (salle de bains, cuisine), on utilise la plaque hydrofuge (verte). Pour l'isolation acoustique, la plaque phonique (bleue) ; contre le feu, la plaque à âme renforcée (rose), exigée par exemple autour d'un conduit ou en local technique. Le format et donc le calcul du nombre de plaques restent identiques.",
  },
];
