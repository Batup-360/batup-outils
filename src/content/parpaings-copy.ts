export const parpaingsCopy = {
  seo: {
    title: "Calculateur de parpaings pour un mur | Batup",
    description:
      "Calculez le nombre de parpaings pour un mur selon les dimensions et le format de bloc. Calculateur gratuit et instantané.",
    canonicalPath: '/calculateur-parpaings',
  },
  webApplication: {
    name: 'Calculateur de parpaings',
    description:
      "Calculateur gratuit qui détermine le nombre de parpaings (blocs béton) nécessaires pour monter un mur, à partir de ses dimensions, du format de bloc et d'une marge de perte.",
  },
  hero: {
    h1: 'Calculateur de parpaings',
    lede: "Combien de parpaings pour monter votre mur ? Entrez les dimensions et le type de bloc, ajoutez une marge, et obtenez le nombre de blocs à commander. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Gérez vos chantiers de maçonnerie avec Batup',
    subtitle:
      'Métrés, commandes, devis et facturation dans un seul outil pensé pour le BTP. Vos quantités deviennent des lignes de devis en un clic.',
  },
  methodology: {
    title: 'Comment calculer le nombre de parpaings',
    intro:
      "On raisonne à la surface du mur, puis on applique le nombre de blocs au m² selon le format et on ajoute une marge de perte.",
    blocks: [
      {
        heading: '1. Surface du mur = longueur × hauteur',
        body: "On calcule d'abord la surface du mur en m². Un mur de 8 m de long sur 2,5 m de haut fait 20 m². Pour un mur avec des ouvertures importantes (porte, fenêtre), vous pouvez déduire leur surface, mais gardez de la marge pour les coupes.",
      },
      {
        heading: '2. Nombre de blocs au m²',
        body: "Un parpaing standard de 20×50 cm (face vue) couvre 0,10 m², soit 10 blocs par m². Un bloc de 25×50 cm en couvre 8 par m², un bloc de 20×40 cm environ 12,5 par m². Le calculateur applique le ratio du format choisi.",
      },
      {
        heading: '3. Marge de perte',
        body: "Ajoutez 5 % pour les blocs coupés en about de mur, autour des ouvertures et pour la casse. Prévoyez aussi le mortier de montage : environ 25 à 30 kg par m² de mur. Utilisez le calculateur de mortier pour le dosage ciment et sable.",
      },
    ],
  },
};
