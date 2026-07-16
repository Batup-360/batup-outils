export const carrelageCopy = {
  seo: {
    title: "Calculateur de carrelage : carreaux et m² | Batup",
    description:
      "Calculez le nombre de carreaux et la surface à acheter selon la taille du carreau et la perte. Calculateur gratuit.",
    canonicalPath: '/calculateur-carrelage',
  },
  webApplication: {
    name: 'Calculateur de carrelage',
    description:
      "Calculateur gratuit qui détermine le nombre de carreaux et la surface à acheter pour carreler un sol ou un mur, à partir de la surface, des dimensions du carreau et d'une marge de perte.",
  },
  hero: {
    h1: 'Calculateur de carrelage',
    lede: "Combien de carreaux pour votre sol ou votre mur ? Entrez la surface et les dimensions du carreau, choisissez la marge de perte, et obtenez le nombre exact. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Chiffrez vos chantiers de carrelage avec Batup',
    subtitle:
      'Métrés, quantités et devis dans un seul outil pensé pour le BTP. Vos surfaces deviennent des lignes de devis en un clic.',
  },
  methodology: {
    title: 'Comment calculer le carrelage',
    intro:
      "On part de la surface à carreler et de la taille du carreau, puis on ajoute une marge de perte adaptée au type de pose.",
    blocks: [
      {
        heading: '1. Nombre de carreaux au m²',
        body: "Il se déduit de la taille du carreau : un carreau de 60×60 cm couvre 0,36 m², soit environ 2,78 carreaux par m². Un carreau de 20×20 cm en demande 25 par m². Le calculateur calcule ce ratio à partir des dimensions saisies.",
      },
      {
        heading: '2. Surface × ratio × marge',
        body: "On multiplie la surface à carreler par le nombre de carreaux au m², puis on ajoute la marge de perte. Pour 20 m² en carreaux de 60×60 : 20 × 2,78 ≈ 56 carreaux, portés à environ 62 avec 10 % de perte.",
      },
      {
        heading: '3. La marge dépend de la pose',
        body: "Comptez 5 % pour une pose droite simple, 10 % pour une pose en diagonale ou une pièce avec beaucoup de découpes, jusqu'à 15 % pour un motif à raccorder ou de grands formats fragiles. Achetez tous les carreaux dans le même bain pour éviter les différences de teinte.",
      },
    ],
  },
};
