export const escalierCopy = {
  seo: {
    title: "Calculateur d'escalier (loi de Blondel) | Batup",
    description:
      "Calculez votre escalier : nombre de marches, hauteur, giron et reculement (loi de Blondel). Calculateur gratuit.",
    canonicalPath: '/calculateur-escalier',
  },
  webApplication: {
    name: 'Calculateur d’escalier (loi de Blondel)',
    description:
      "Calculateur d'escalier gratuit qui détermine le nombre de marches, la hauteur de marche, le giron et le reculement d'un escalier droit à partir de la hauteur à monter, et vérifie le confort par la relation de Blondel (2h + g entre 59 et 66 cm).",
  },
  hero: {
    h1: 'Calculateur d’escalier (loi de Blondel)',
    lede: "Combien de marches pour votre escalier ? Quelle hauteur de marche et quel giron pour qu'il soit confortable ? Entrez la hauteur à monter et obtenez le dimensionnement complet, vérifié par la loi de Blondel. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Gérez vos chantiers de menuiserie avec Batup',
    subtitle:
      'Devis, métrés, suivi et facturation dans un seul outil pensé pour les artisans du bâtiment. Concentrez-vous sur la pose, Batup gère l’administratif.',
  },
  methodology: {
    title: 'Comment dimensionner un escalier',
    intro:
      "Un escalier confortable respecte la relation de Blondel, qui lie la hauteur de marche et le giron. Voici la méthode appliquée par le calculateur.",
    blocks: [
      {
        heading: '1. Nombre de marches = hauteur ÷ hauteur de marche',
        body: "On part de la hauteur totale à monter, mesurée de sol fini à sol fini. En visant une hauteur de marche confortable d'environ 17 à 18 cm, on divise la hauteur totale par cette valeur et on arrondit. Pour 2,80 m avec des marches de 17,5 cm : 280 ÷ 17,5 = 16 marches.",
      },
      {
        heading: '2. Hauteur de marche = hauteur ÷ nombre de marches',
        body: "Une fois le nombre de marches arrêté, on recalcule la hauteur exacte de chaque marche pour qu'elles soient toutes identiques : 280 ÷ 16 = 17,5 cm. Une hauteur de marche entre 16 et 18 cm est idéale ; au-delà de 20 cm, l'escalier devient fatigant et moins sûr.",
      },
      {
        heading: '3. Le giron et la loi de Blondel',
        body: "Le giron est la profondeur de la marche (là où on pose le pied). La loi de Blondel impose : 2 × hauteur de marche + giron ≈ 59 à 66 cm, avec une cible autour de 63 cm. À 17,5 cm de hauteur, le giron confortable est donc d'environ 63 − 35 = 28 cm. Si vous connaissez le reculement disponible, le giron en découle : reculement ÷ (nombre de marches − 1).",
      },
      {
        heading: '4. Reculement et échappée',
        body: "Le reculement est la longueur au sol occupée par l'escalier : giron × (nombre de marches − 1). Vérifiez qu'il tient dans la trémie et l'espace disponibles. Pensez aussi à l'échappée : la hauteur libre au-dessus des marches doit être d'au moins 1,90 m pour ne pas se cogner la tête.",
      },
    ],
  },
};
