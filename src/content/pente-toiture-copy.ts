export const penteToitureCopy = {
  seo: {
    title: "Calculateur de pente de toiture gratuit | Batup",
    description:
      "Calculez la pente de toiture en % et en degrés, plus la longueur du rampant. Conversion instantanée. Outil gratuit.",
    canonicalPath: '/calculateur-pente-toiture',
  },
  webApplication: {
    name: 'Calculateur de pente de toiture',
    description:
      "Calculateur gratuit qui convertit une pente de toiture entre pourcentage, degrés et dimensions (dénivelé et base horizontale), et calcule la longueur du rampant.",
  },
  hero: {
    h1: 'Calculateur de pente de toiture',
    lede: "Quelle est la pente de votre toit en % et en degrés ? Quelle longueur de rampant ? Entrez vos dimensions ou une pente connue, et obtenez toutes les conversions. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Gérez vos chantiers de couverture avec Batup',
    subtitle:
      'Devis, métrés, suivi et facturation dans un outil pensé pour les couvreurs et charpentiers du BTP. Moins d’administratif, plus de chantier.',
  },
  methodology: {
    title: 'Comment calculer la pente d’une toiture',
    intro:
      "La pente se mesure entre le dénivelé (la hauteur) et la base horizontale (la portée). On l'exprime en %, en degrés ou en cm par mètre.",
    blocks: [
      {
        heading: '1. Pente en % = dénivelé ÷ base × 100',
        body: "Une toiture qui monte de 3 m sur une base horizontale de 6 m a une pente de 3 ÷ 6 × 100 = 50 %. Le pourcentage exprime combien on monte pour 100 unités parcourues à l'horizontale. C'est l'unité la plus utilisée sur les plans.",
      },
      {
        heading: '2. Pente en degrés = arctangente du rapport',
        body: "L'angle en degrés se calcule avec arctan(dénivelé ÷ base). Une pente de 100 % correspond à 45°, une pente de 50 % à environ 26,6°. Attention : le pourcentage et les degrés ne sont pas proportionnels, une pente de 100 % ne fait pas 90° mais 45°.",
      },
      {
        heading: '3. Longueur du rampant',
        body: "Le rampant est la longueur réelle de la pente, l'hypoténuse du triangle formé par la base et le dénivelé : rampant = √(base² + dénivelé²). Pour une base de 4 m et un dénivelé de 3 m, le rampant mesure 5 m. C'est cette longueur qui sert à calculer la surface de couverture.",
      },
      {
        heading: '4. La pente minimale dépend du matériau',
        body: "Chaque couverture impose une pente minimale, variable aussi selon la région (zone de vent et de neige) : quelques pourcents pour un bac acier ou une membrane, davantage pour les tuiles et les ardoises. Sous la pente minimale, le risque d'infiltration augmente. Vérifiez le DTU et les préconisations du fabricant.",
      },
    ],
  },
};
