export const betonCopy = {
  seo: {
    title: "Calculateur de béton : volume et dosage | Batup",
    description:
      "Calculez le volume de béton d'une dalle et le dosage : ciment, sable, gravier, eau. Calculateur gratuit pour le BTP.",
    canonicalPath: '/calculateur-beton',
  },
  webApplication: {
    name: 'Calculateur de béton (volume et dosage)',
    description:
      "Calculateur gratuit qui détermine le volume de béton d'un ouvrage rectangulaire (dalle, semelle, longrine) et les quantités de matériaux : ciment en kilos et en sacs, sable, gravier et eau, pour un dosage de 250, 350 ou 400 kg/m³.",
  },
  hero: {
    h1: 'Calculateur de béton : volume et dosage',
    lede: "Combien de béton pour votre dalle ? Combien de sacs de ciment, de sable et de gravier commander ? Entrez vos dimensions, choisissez le dosage, et obtenez le volume et la liste des matériaux. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Gérez vos chantiers de A à Z avec Batup',
    subtitle:
      'Devis, métrés, commandes de matériaux, pointage et facturation : Batup centralise tout le suivi de vos chantiers BTP. Fini les calculs sur un coin de table.',
  },
  methodology: {
    title: 'Comment calculer le béton d’un chantier',
    intro:
      "Le calcul se fait en deux temps : d'abord le volume de l'ouvrage, puis les matériaux à partir du dosage en ciment. Voici la méthode appliquée par le calculateur.",
    blocks: [
      {
        heading: '1. Volume = longueur × largeur × épaisseur',
        body: "Pour une dalle ou une semelle rectangulaire, le volume en m³ est le produit de la longueur, de la largeur et de l'épaisseur, toutes ramenées en mètres. Exemple : une dalle de 4 m × 5 m sur 12 cm d'épaisseur représente 4 × 5 × 0,12 = 2,4 m³ de béton.",
      },
      {
        heading: '2. Le dosage en ciment dépend de l’usage',
        body: "On exprime le dosage en kilos de ciment par m³ de béton fini. En pratique : 250 kg/m³ pour une fondation légère ou un béton de propreté, 350 kg/m³ pour une dalle courante ou une terrasse (le dosage standard), 400 kg/m³ pour un béton structurel ou du béton armé. Le ciment nécessaire = volume × dosage.",
      },
      {
        heading: '3. Sable, gravier et eau',
        body: "Pour un béton dosé à 350 kg/m³, on retient environ 825 kg de sable et 1 050 kg de gravier par m³, avec un rapport eau/ciment d'environ 0,5 (soit 175 litres d'eau). Le granulat diminue quand le dosage en ciment augmente : le calculateur ajuste sable et gravier automatiquement. Ces valeurs sont des estimations ; pour un ouvrage porteur, suivez l'étude béton de votre bureau d'études.",
      },
      {
        heading: '4. Prévoyez une marge',
        body: "Ajoutez systématiquement 5 à 10 % au volume calculé pour absorber les pertes, les irrégularités du fond de fouille et les fonds de bétonnière. Pour un gros volume, la livraison en camion toupie (béton prêt à l'emploi) est souvent plus économique et plus régulière que le béton fabriqué sur place.",
      },
    ],
  },
};
