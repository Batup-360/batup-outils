import type { FAQItem } from '@/components/FAQAccordion';

export const terrasseFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le nombre de lames de terrasse ?',
    answer:
      "Calculez la surface couverte par une lame (longueur × largeur), ajoutez une marge de perte à la surface de la terrasse, puis divisez l'une par l'autre. Pour une terrasse de 20 m² avec des lames de 0,56 m² et 10 % de marge : 22 ÷ 0,56 ≈ 40 lames.",
  },
  {
    question: 'Quelle marge de perte pour une terrasse ?',
    answer:
      "Comptez environ 10 % pour une pose droite, jusqu'à 15 % pour une pose en diagonale ou une terrasse de forme complexe. Cette marge couvre les coupes de rive, les ajustements et la casse. Les lames coupées en about sont rarement réutilisables entières.",
  },
  {
    question: 'Combien de lambourdes pour une terrasse ?',
    answer:
      "Les lambourdes se posent généralement tous les 40 à 50 cm, perpendiculairement aux lames (entraxe plus serré pour le composite et pour une pose en diagonale). Le nombre dépend donc de la largeur de la terrasse et de l'entraxe retenu. Prévoyez aussi les plots ou la structure de support, et les fixations (vis ou clips).",
  },
  {
    question: 'Bois ou composite : le calcul change-t-il ?',
    answer:
      "La méthode est la même : surface de la terrasse avec marge ÷ surface d'une lame. Seules les dimensions des lames et l'entraxe des lambourdes diffèrent (le composite demande souvent un entraxe plus serré). Saisissez les dimensions réelles de vos lames dans le calculateur.",
  },
  {
    question: 'Faut-il prévoir un espace entre les lames ?',
    answer:
      "Oui, un jeu de dilatation de quelques millimètres entre les lames est nécessaire, surtout pour le bois et le composite qui travaillent avec l'humidité et la chaleur. Ce jeu est faible et le calcul par surface de lame reste une bonne estimation ; référez-vous aux préconisations du fabricant pour l'espacement exact.",
  },
  {
    question: 'Combien de lambourdes au m² pour une terrasse ?',
    answer:
      "Avec un entraxe de 45 cm (courant pour le bois), on compte environ 2,2 mètres linéaires de lambourdes par m² de terrasse. En composite, l'entraxe se resserre souvent à 40 voire 30 cm, ce qui augmente le linéaire. Le calculateur estime ce métré ; ajustez selon l'entraxe préconisé par le fabricant de vos lames.",
  },
  {
    question: 'Combien de vis pour une terrasse en bois ?',
    answer:
      "En vissage traditionnel (2 vis par croisement lame/lambourde), comptez de l'ordre de 35 vis inox par m². Le chiffre monte avec un entraxe serré ou des lames étroites. Pour une pose composite par clips, prévoyez plutôt les clips du fabricant (environ 20 par m²) plus les vis de fixation des clips.",
  },
  {
    question: 'Combien de plots pour une terrasse sur plots ?',
    answer:
      "Le DTU 51-4 impose au minimum 4 plots par m² ; en pratique on retient souvent 4 à 5 plots par m² selon le poids supporté et l'entraxe des lambourdes. Sur sol meuble ou pour une forte charge, densifiez le calepinage. Les plots réglables absorbent les défauts de pente et assurent l'évacuation de l'eau.",
  },
];
