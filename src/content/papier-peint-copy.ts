export const papierPeintCopy = {
  seo: {
    title: "Calculateur de papier peint (rouleaux) | Batup",
    description:
      "Calculez le nombre de rouleaux de papier peint : dimensions, hauteur sous plafond, raccord du motif. Outil gratuit.",
    canonicalPath: '/calculateur-papier-peint',
  },
  webApplication: {
    name: 'Calculateur de papier peint (rouleaux)',
    description:
      "Calculateur gratuit qui détermine le nombre de rouleaux de papier peint nécessaires pour tapisser une pièce, à partir de ses dimensions, de la hauteur sous plafond et des caractéristiques du rouleau (largeur, longueur, raccord de motif).",
  },
  hero: {
    h1: 'Calculateur de papier peint',
    lede: "Combien de rouleaux pour tapisser votre pièce ? Entrez les dimensions, la hauteur sous plafond et le raccord du motif, et obtenez le nombre de rouleaux à acheter. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Chiffrez vos chantiers de décoration avec Batup',
    subtitle:
      'Métrés, quantités et devis dans un seul outil pensé pour les artisans du bâtiment. Vos surfaces deviennent des devis en quelques minutes.',
  },
  methodology: {
    title: 'Comment calculer le nombre de rouleaux',
    intro:
      "On raisonne en « lés » : les bandes verticales de papier. Le calcul enchaîne trois étapes à partir du périmètre de la pièce et de la hauteur sous plafond.",
    blocks: [
      {
        heading: '1. Nombre de lés = périmètre ÷ largeur du rouleau',
        body: "On divise le périmètre de la pièce par la largeur d'un rouleau (souvent 0,53 m) et on arrondit au supérieur. Pour une pièce de 14 m de périmètre avec des rouleaux de 0,53 m, il faut 27 lés. On ne déduit pas les portes et fenêtres : cette marge compense les pertes et les ajustements.",
      },
      {
        heading: '2. Lés par rouleau = longueur du rouleau ÷ hauteur',
        body: "On divise la longueur du rouleau (souvent 10 m) par la hauteur sous plafond, et on arrondit à l'inférieur (on ne peut pas utiliser une chute trop courte). Pour un rouleau de 10 m et une hauteur de 2,50 m, on tire 4 lés par rouleau.",
      },
      {
        heading: '3. Le raccord de motif consomme du papier',
        body: "Si le papier a un motif à raccorder, chaque lé doit être coupé plus long pour aligner le dessin : on ajoute la hauteur de raccord à la hauteur de la pièce. Un raccord important réduit le nombre de lés par rouleau et augmente donc le nombre de rouleaux. Le calculateur en tient compte.",
      },
      {
        heading: '4. Nombre de rouleaux et marge',
        body: "Nombre de rouleaux = lés nécessaires ÷ lés par rouleau, arrondi au supérieur. Prévoyez toujours un rouleau supplémentaire de la même référence et du même bain de teinte : indispensable pour les retouches et impossible à retrouver à l'identique plus tard.",
      },
    ],
  },
};
