export const surfaceCopy = {
  seo: {
    title: "Calculateur de surface en m² gratuit | Batup",
    description:
      "Calculez une surface en m² : sols, murs, pièces, plusieurs zones (rectangle, triangle, cercle). Calculateur gratuit.",
    canonicalPath: '/calculateur-surface',
  },
  webApplication: {
    name: 'Calculateur de surface (m²)',
    description:
      "Calculateur de surface gratuit qui additionne l'aire de plusieurs zones (rectangle, triangle, disque) pour obtenir une surface totale en m², utile pour chiffrer sols, murs, peinture, carrelage ou revêtements.",
  },
  hero: {
    h1: 'Calculateur de surface en m²',
    lede: "Additionnez plusieurs zones pour obtenir la surface totale d'un sol, d'un mur ou d'une pièce. Rectangle, triangle, cercle : ajoutez autant de formes que nécessaire. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Du métré au devis, sans ressaisie',
    subtitle:
      'Reprenez vos surfaces directement dans vos devis Batup, appliquez vos prix au m² et éditez un document propre en quelques minutes. Le métré alimente le chiffrage.',
  },
  methodology: {
    title: 'Comment calculer une surface au m²',
    intro:
      "Une surface se décompose en formes simples dont on additionne les aires. Voici les formules utilisées par le calculateur, avec toutes les dimensions en mètres.",
    blocks: [
      {
        heading: '1. Rectangle : longueur × largeur',
        body: "La forme la plus courante pour un sol ou un mur. Une pièce de 4 m sur 3 m fait 12 m². Pour une pièce en L ou en T, découpez-la en plusieurs rectangles et additionnez : c'est exactement ce que permet le calculateur en ajoutant des zones.",
      },
      {
        heading: '2. Triangle : base × hauteur ÷ 2',
        body: "Pour un pignon, un rampant ou un angle coupé. La hauteur est la distance perpendiculaire entre la base et le sommet opposé, pas la longueur d'un côté. Un pignon de 6 m de base et 4 m de haut représente 6 × 4 ÷ 2 = 12 m².",
      },
      {
        heading: '3. Cercle : π × (diamètre ÷ 2)²',
        body: "Pour une terrasse ronde, un bassin ou un pilier. À partir du diamètre : aire = π × rayon². Un disque de 2 m de diamètre (rayon 1 m) fait environ 3,14 m². Le calculateur demande le diamètre et fait le reste.",
      },
      {
        heading: '4. Pensez aux déductions et aux pertes',
        body: "Pour un mur à peindre ou à carreler, déduisez les ouvertures (portes, fenêtres) en les ajoutant comme des zones que vous retranchez mentalement, ou calculez-les à part. Pour un revêtement (carrelage, parquet, peinture), ajoutez ensuite 5 à 10 % de perte pour les coupes et les chutes.",
      },
    ],
  },
};
