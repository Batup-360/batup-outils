export const tvaCopy = {
  seo: {
    title: "Calculateur de TVA : HT en TTC et TTC en HT | Batup",
    description:
      "Convertissez HT en TTC et TTC en HT avec les taux du bâtiment (20, 10, 5,5%). Calculateur de TVA gratuit et instantané.",
    canonicalPath: '/calculateur-tva',
  },
  webApplication: {
    name: 'Calculateur de TVA (HT ↔ TTC)',
    description:
      "Calculateur de TVA gratuit qui convertit un montant hors taxes en toutes taxes comprises et inversement, pour n'importe quel taux (20 %, 10 %, 5,5 %, 2,1 % ou taux personnalisé), et affiche le montant de TVA correspondant.",
  },
  hero: {
    h1: 'Calculateur de TVA : HT ↔ TTC',
    lede: "Passez d'un montant HT à TTC ou d'un TTC à HT instantanément, avec les taux de TVA du bâtiment. Le montant de TVA s'affiche à part. Gratuit, sans inscription.",
  },
  ctaBanner: {
    title: 'Vos devis et factures BTP, TVA calculée automatiquement',
    subtitle:
      'Batup applique le bon taux de TVA à chaque ligne, gère l’autoliquidation et édite des factures conformes en quelques secondes. Zéro erreur de TVA sur vos documents.',
  },
  methodology: {
    title: 'Comment calculer la TVA dans le bâtiment',
    intro:
      "La TVA se calcule sur le montant hors taxes. Le taux applicable dépend de la nature des travaux et du logement. Voici les règles appliquées par le calculateur.",
    blocks: [
      {
        heading: '1. HT → TTC : on ajoute la TVA',
        body: "Le montant TTC = montant HT × (1 + taux/100). Pour 1 000 € HT à 20 %, la TVA est de 200 € et le TTC de 1 200 €. C'est le sens de calcul le plus courant quand vous établissez un devis à partir de vos prix hors taxes.",
      },
      {
        heading: '2. TTC → HT : on retire la TVA',
        body: "Le montant HT = montant TTC ÷ (1 + taux/100). Pour 1 200 € TTC à 20 %, le HT est de 1 000 €. Utile pour retrouver la base hors taxes à partir d'un prix affiché TTC, ou pour vérifier une facture reçue.",
      },
      {
        heading: '3. Les taux de TVA du BTP',
        body: "20 % : taux normal, construction neuve et locaux professionnels. 10 % : travaux d'amélioration, de transformation et d'entretien d'un logement de plus de 2 ans. 5,5 % : travaux de rénovation énergétique éligibles (isolation, chauffage performant). 2,1 % : cas très particuliers. Le taux réduit nécessite une attestation du client.",
      },
      {
        heading: '4. Attention à l’autoliquidation',
        body: "En sous-traitance BTP, la TVA est souvent autoliquidée : le sous-traitant facture en HT sans TVA, et c'est l'entreprise principale qui la déclare. Dans ce cas, le taux appliqué sur la facture du sous-traitant est de 0 %, avec une mention obligatoire spécifique.",
      },
    ],
  },
};
