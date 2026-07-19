import type { FAQItem } from '@/components/FAQAccordion';

export const grilleSalairesFAQ: FAQItem[] = [
  {
    question: 'Quel est le salaire minimum d’un ouvrier du bâtiment en 2026 ?',
    answer:
      "En Île-de-France, la grille au 5 février 2026 va de 1 843 € brut/mois (niveau I position 1, coeff. 150) à 2 510 € (niveau IV position 2, coeff. 270), pour 35 h. Comme les premiers coefficients passent sous le SMIC, c'est le SMIC (1 867,02 € au 1er juin 2026) qui s'applique pour les coeff. 150 et 170.",
  },
  {
    question: 'La grille des salaires du bâtiment est-elle nationale ou régionale ?',
    answer:
      "Cela dépend de la catégorie. Les ouvriers et les ETAM ont des grilles négociées région par région : c'est l'accord applicable au lieu du chantier qui compte. Les cadres, eux, ont une grille nationale unique (IDCC 2420). Cet outil couvre l'Île-de-France pour les ouvriers et ETAM, et la grille nationale pour les cadres.",
  },
  {
    question: 'Quelle différence entre IDCC 1596 et 1597 ?',
    answer:
      "L'IDCC 1596 vise les ouvriers des entreprises de bâtiment jusqu'à 10 salariés, l'IDCC 1597 celles de plus de 10 salariés. Les deux conventions sont distinctes, mais en Île-de-France l'accord de salaires du 5 novembre 2025 fixe la même grille pour les deux : mêmes minima quel que soit l'effectif de l'entreprise.",
  },
  {
    question: 'Comment sont classés les ETAM du bâtiment ?',
    answer:
      "Les ETAM (employés, techniciens et agents de maîtrise) sont classés du niveau A au niveau H selon l'autonomie, la technicité et les responsabilités. En Île-de-France (hors Seine-et-Marne), la grille au 5 février 2026 va de 1 843 € brut (A) à 3 357 € (H) pour 35 h. Le niveau A, sous le SMIC, est porté au SMIC.",
  },
  {
    question: 'Quel est le salaire minimum d’un cadre du bâtiment ?',
    answer:
      "La grille nationale des cadres (IDCC 2420, avenant n° 78, au 1er février 2026) va de 2 356 € brut/mois (coefficient 60) à 5 472 € (coefficient 162). Attention : cette grille est en base 39 h (169 h/mois), contre 35 h pour les ouvriers et ETAM — les montants ne se comparent donc pas directement.",
  },
  {
    question: 'Le minimum conventionnel peut-il être inférieur au SMIC ?',
    answer:
      "La grille peut afficher une valeur sous le SMIC, mais aucun salarié ne peut être payé en dessous du SMIC. Dès qu'un minimum conventionnel est inférieur au SMIC en vigueur, c'est le SMIC qui devient le minimum légal. C'est fréquent sur les premiers coefficients ouvriers (150, 170) et le niveau A des ETAM.",
  },
  {
    question: 'Ces salaires sont-ils en brut ou en net ?',
    answer:
      "Les minima conventionnels sont toujours exprimés en brut mensuel. Le net dépend des cotisations salariales (environ 22 % pour un non-cadre, 25 % pour un cadre) et d'éléments propres au salarié (mutuelle, prévoyance, prélèvement à la source). L'outil affiche une estimation de net à titre indicatif seulement.",
  },
  {
    question: 'À quelle fréquence les grilles sont-elles revalorisées ?',
    answer:
      "En général une fois par an, par accord paritaire (NAO), mais à des dates différentes selon la région et la catégorie. Une grille peut donc être à jour dans une région et pas dans une autre. Vérifiez toujours la date d'entrée en vigueur affichée et l'accord de référence avant de l'appliquer à une paie.",
  },
  {
    question: 'Comment télécharger la grille des salaires BTP 2026 en PDF ?',
    answer:
      "Cliquez sur « Télécharger en PDF » en haut de l'outil : la grille de la catégorie (ouvriers, ETAM ou cadres) et de la région sélectionnées s'ouvre dans une vue imprimable que vous pouvez enregistrer en PDF ou imprimer. Le document reprend les coefficients, les minima bruts, la date d'entrée en vigueur et l'accord de référence.",
  },
  {
    question: 'Que signifie le coefficient N3P2 (ou 230) ?',
    answer:
      "N3P2 désigne le niveau III position 2 de la classification des ouvriers du bâtiment, associé au coefficient 230 : un compagnon professionnel très qualifié. La classification va de N1P1 (coeff. 150, ouvrier d'exécution) à N4P2 (coeff. 270, maître ouvrier / chef d'équipe). Le coefficient détermine le minimum conventionnel du poste.",
  },
  {
    question: 'Quelle différence entre la grille des salaires BTP 2025 et 2026 ?',
    answer:
      "La grille est renégociée chaque année par accord paritaire (NAO), avec une revalorisation des minima (souvent +2 à +4 %). La grille 2026 remplace la grille 2025 à sa date d'entrée en vigueur, qui varie selon la région et la catégorie. Appliquez toujours la grille en vigueur à la date de la paie, pas celle de l'année précédente.",
  },
];
