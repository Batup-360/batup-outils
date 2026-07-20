export const consommationCopy = {
  seo: {
    title: "Calcul consommation de matériaux au m² | Batup",
    description:
      "Estimez la quantité de matériau (colle, enduit, primaire, ragréage) selon la surface et la consommation au m². Outil gratuit.",
    canonicalPath: '/calculateur-consommation-materiaux',
  },
  webApplication: {
    name: 'Calculateur de consommation de matériaux',
    description:
      "Calculateur gratuit qui estime la quantité totale d'un matériau (en kg, litres ou sacs) à partir d'une surface, d'une consommation au m² et d'une marge de perte. Utile pour la colle, l'enduit, le primaire, le mortier-colle, etc.",
  },
  hero: {
    h1: 'Calculateur de consommation de matériaux',
    lede: "Combien de colle, d'enduit ou de primaire pour votre chantier ? Entrez la surface et la consommation au m² indiquée par le fabricant, et obtenez la quantité totale. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Chiffrez tous vos matériaux avec Batup',
    subtitle:
      'Métrés, quantités et devis dans un seul outil pensé pour le BTP. Vos surfaces deviennent des lignes de devis en un clic.',
  },
  methodology: {
    title: 'Comment estimer la consommation d’un matériau',
    intro:
      "La plupart des produits du bâtiment indiquent une consommation au m². La quantité totale s'en déduit directement.",
    blocks: [
      {
        heading: '1. Consommation au m²',
        body: "Le fabricant indique une consommation au m² sur l'emballage ou la fiche technique : par exemple 3 kg/m² pour un mortier-colle en simple encollage, 0,2 L/m² pour un primaire, 1,5 kg/m² pour un enduit fin. C'est la donnée clé du calcul.",
      },
      {
        heading: '2. Quantité = surface × consommation',
        body: "On multiplie la surface à traiter par la consommation au m², puis on ajoute une marge de perte. Pour 50 m² à 3 kg/m² avec 10 % de marge : 50 × 3 × 1,10 = 165 kg. Le calculateur affiche le total dans l'unité choisie (kg, litres ou sacs).",
      },
      {
        heading: '3. Vérifiez les conditions d’application',
        body: "La consommation réelle dépend du support (planéité, porosité), de l'épaisseur et de la technique (simple ou double encollage). Prenez la consommation haute de la fourchette pour un support irrégulier, et gardez une marge de sécurité pour éviter la rupture en cours de pose.",
      },
    ],
  },
};
