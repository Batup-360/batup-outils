export const chargesSocialesCopy = {
  seo: {
    title: "Calcul charges sociales artisan BTP | Batup",
    description:
      "Estimez vos charges sociales d'artisan BTP selon votre statut (micro, EI, EURL, SARL, SAS). Barème à jour, calculateur gratuit.",
    canonicalPath: '/calculateur-charges-sociales-artisan-btp',
  },
  webApplication: {
    name: 'Calculateur charges sociales artisan BTP',
    description:
      "Simulateur gratuit qui estime les cotisations sociales annuelles d'un artisan ou entrepreneur du bâtiment selon son statut juridique (micro-entreprise, EI au réel, EURL, SARL, SAS), avec prise en compte de l'ACRE et du bénéfice prévu, sur la base du barème indicatif 2026 (URSSAF, SSI, CIPAV).",
  },
  hero: {
    h1: 'Calculateur charges sociales artisan BTP 2026',
    lede: "Combien allez-vous vraiment payer de cotisations cette année, une fois URSSAF, retraite, maladie et CSG-CRDS additionnées ? Cet outil vous donne une estimation immédiate selon votre statut juridique, avec ou sans ACRE.",
  },
  ctaBanner: {
    title: 'Vos charges ne s’arrêtent pas aux cotisations',
    subtitle:
      "Cotisations, IR, TVA, fournisseurs, salaires : tous ces flux composent votre rentabilité réelle. Batup les rassemble dans un tableau de bord clair pour que vous sachiez ce qui rentre vraiment dans votre poche, chantier par chantier.",
  },
  methodology: {
    title: 'Comment on estime vos cotisations sociales',
    intro:
      "Les pourcentages utilisés proviennent du barème indicatif 2026 de l'URSSAF, de la SSI et de la CIPAV. Ils correspondent aux taux effectifs constatés pour les artisans du BTP. C'est une estimation : votre comptable affinera selon votre situation précise (zone ZRR, formation continue, complémentaire santé, etc.).",
    blocks: [
      {
        heading: '1. Micro-entreprise artisan : 21,2 % du CA encaissé',
        body: "Pour un artisan BTP en micro (prestations BIC), les cotisations URSSAF s'élèvent à 21,2 % du chiffre d'affaires encaissé (et non du bénéfice). On ajoute 0,3 % de CFP (contribution à la formation professionnelle). Avec l'ACRE la première année, le taux est divisé par deux (10,6 %). Pas d'IS : l'impôt sur le revenu est calculé séparément, soit en barème progressif, soit en versement libératoire (1,7 % pour les prestations BIC).",
      },
      {
        heading: '2. EI au réel et EURL à l’IR : ~45 % du bénéfice',
        body: "L'entrepreneur individuel au réel et le gérant d'EURL à l'IR sont des travailleurs non salariés (TNS). Leurs cotisations totales (URSSAF, retraite de base, retraite complémentaire, maladie, allocations familiales, CSG-CRDS) représentent environ 45 % du bénéfice imposable. Avec l'ACRE la première année, le taux moyen tombe autour de 27 %. Pas d'IS : le bénéfice est imposé à l'IR sur la déclaration personnelle du dirigeant.",
      },
      {
        heading: '3. SARL et SAS : statut social du dirigeant + IS',
        body: "En SARL à l'IS, le gérant majoritaire est TNS (~45 % de charges sur la rémunération). En SAS, le président est assimilé salarié, ce qui implique 70 à 80 % de cotisations totales (part employeur + part salarié) sur la rémunération brute. Ces structures payent aussi l'IS : 15 % sur les bénéfices jusqu'à 42 500 € puis 25 % au-dessus. Le calcul exact dépend de la répartition rémunération / dividendes et mérite l'avis d'un expert-comptable.",
      },
      {
        heading: '4. ACRE : -50 % de cotisations la première année',
        body: "L'Aide aux Créateurs et Repreneurs d'Entreprise (ACRE) divise par deux les cotisations sociales pendant les 12 premiers mois d'activité, sous conditions (demandeur d'emploi, jeune de moins de 26 ans, bénéficiaire RSA, etc.). Pour un micro-entrepreneur BTP, le taux passe de 21,2 % à 10,6 %. Pour un TNS au réel, il passe de ~45 % à ~27 %. Bien anticiper la sortie de l'ACRE pour éviter le choc de trésorerie en année 2.",
      },
    ],
  },
};
