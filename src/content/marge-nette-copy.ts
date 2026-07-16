export const margeNetteCopy = {
  seo: {
    title: "Calcul marge nette et coefficient BTP | Batup",
    description:
      "Convertissez un coefficient en marge nette (et l'inverse) et trouvez le prix de vente correspondant. Calculateur BTP gratuit.",
    canonicalPath: '/calculateur-marge-nette-coefficient-btp',
  },
  webApplication: {
    name: 'Calculateur de marge nette et coefficient BTP',
    description:
      "Calculateur bidirectionnel qui convertit entre coefficient multiplicateur et marge nette, et calcule le prix de vente HT recommandé à partir d'un coût d'achat. Inclut un verdict de rentabilité basé sur le seuil de sécurité de 14,5 %.",
  },
  hero: {
    h1: 'Calculateur de marge nette et coefficient BTP',
    lede: 'Coefficient 1,30 ou marge nette 23 % : c\'est la même chose, mais on s\'y perd vite. Cet outil convertit les deux et vous donne le prix de vente HT à appliquer pour rester rentable. Gratuit, instantané, formule comptable correcte.',
  },
  ctaBanner: {
    title: 'Un coefficient bien calculé ne sert à rien si vous ne l\'appliquez pas partout',
    subtitle:
      "Batup mémorise votre coefficient par catégorie (main d'œuvre / matériaux / sous-traitance) et l'applique en 1 clic à chaque ligne de devis. Plus d'oubli, plus de chantier vendu à perte.",
  },
  methodology: {
    title: 'Coefficient ou marge nette : quelle formule utiliser',
    intro:
      "Les deux mesurent la même réalité, mais ne se calculent pas pareil. Voici les formules exactes utilisées dans Batup et dans tous les logiciels de comptabilité, sans piège.",
    blocks: [
      {
        heading: '1. Du coefficient vers le prix de vente',
        body: "La formule directe : prix de vente = coût d'achat × coefficient. Un coefficient de 1,30 sur un coût de 100 € donne un PV de 130 €. C'est rapide, mais ça ne dit pas combien vous gagnez vraiment — le coefficient est calculé sur le coût, pas sur le PV.",
      },
      {
        heading: '2. De la marge nette vers le prix de vente',
        body: "La formule inverse, comptablement correcte : prix de vente = coût ÷ (1 − marge/100). Pour 100 € de coût et 23,08 % de marge nette cible, le PV = 100 ÷ 0,7692 = 130 €. La marge est calculée sur le PV — c'est ce qui rentre vraiment dans votre poche.",
      },
      {
        heading: '3. Conversion coefficient ↔ marge nette',
        body: "Marge nette = (PV − coût) / PV × 100. Pour un coefficient de 1,30, marge = (1,30 − 1) / 1,30 = 23,08 %. Inversement, coefficient = 1 / (1 − marge/100). Une marge de 30 % correspond à un coefficient de 1,43 — pas de 1,30 comme on le croit souvent.",
      },
      {
        heading: '4. Verdict de rentabilité (seuil 14,5 %)',
        body: "En dessous de 14,5 % de marge nette (≈ coefficient 1,17), un seul aléa (remise commerciale, SAV, retard de paiement, oubli de poste) suffit à faire basculer le chantier en perte. C'est le seuil de sécurité utilisé par Batup pour alerter sur les devis à risque.",
      },
    ],
  },
};
