export const enduitFacadeCopy = {
  seo: {
    title: "Calculateur d'enduit de façade : kg et sacs | Batup",
    description:
      "Calculez la quantité d'enduit de façade (kg et nombre de sacs de 25 kg) selon la surface et le type d'enduit : monocouche, gobetis, corps d'enduit. Gratuit.",
    canonicalPath: '/calculateur-enduit-facade',
  },
  webApplication: {
    name: "Calculateur d'enduit de façade",
    description:
      "Calculateur gratuit qui détermine la quantité d'enduit de façade en kg et en sacs de 25 kg à partir de la surface à enduire, du type d'enduit (consommation au m²) et d'une marge de perte.",
  },
  hero: {
    h1: "Calculateur d'enduit de façade",
    lede: "Combien de sacs d'enduit pour votre façade ? Entrez la surface, choisissez le type d'enduit et ajoutez une marge : obtenez les kilos et le nombre de sacs. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Chiffrez vos chantiers de ravalement avec Batup',
    subtitle:
      'Métrés, quantités, devis et facturation dans un seul outil pensé pour le BTP. Vos surfaces deviennent des devis en quelques minutes.',
  },
  methodology: {
    title: "Comment calculer la quantité d'enduit de façade",
    intro:
      "On part de la surface à enduire et de la consommation au m² du produit, puis on ajoute une marge pour les pertes et on convertit en sacs.",
    blocks: [
      {
        heading: '1. Mesurer la surface à enduire',
        body: "Prenez la surface de façade en m², en déduisant les grandes ouvertures (portes, baies) mais en conservant les petites : elles servent de marge pour les tableaux et les angles.",
      },
      {
        heading: '2. Appliquer la consommation au m²',
        body: "La consommation dépend du produit et de l'épaisseur : environ 9 kg/m² pour un gobetis d'accrochage, 15 kg/m² pour un corps d'enduit, 18 kg/m² pour un enduit monocouche (≈ 15 mm), 4 kg/m² pour une finition. La valeur exacte est sur le sac.",
      },
      {
        heading: '3. Convertir en sacs et ajouter une marge',
        body: "Quantité (kg) = surface × consommation, majorée d'environ 10 % de perte. On divise ensuite par le poids d'un sac (25 kg le plus souvent) et on arrondit au supérieur. Gardez un sac d'avance pour les retouches.",
      },
    ],
  },
};
