import type { FAQItem } from '@/components/FAQAccordion';

export const prixChantierFAQ: FAQItem[] = [
  {
    question: 'Comment chiffrer un chantier BTP sans perdre d’argent ?',
    answer:
      "Trois étapes : (1) lister honnêtement vos coûts (heures de main d'œuvre × votre taux facturé, matériaux × coefficient, sous-traitance, frais divers) ; (2) appliquer votre marge nette cible ; (3) vérifier que la marge résultante est au-dessus du seuil de sécurité de 14,5 %. Le calculateur ci-dessus fait ces trois étapes pour vous.",
  },
  {
    question: 'Quel coefficient appliquer sur les matériaux ?',
    answer:
      "Un coefficient de 1,30 sur le prix d'achat HT correspond à environ 23 % de marge nette : c'est la norme dans le BTP français pour des chantiers de rénovation classique. Pour des matériaux à faible rotation, des projets sur-mesure ou de la fourniture spécialisée, montez à 1,40–1,50. Pour de la pure pose avec matériaux fournis par le client, le coefficient ne s'applique évidemment pas.",
  },
  {
    question: 'Marge nette ou marge brute, quelle différence ?',
    answer:
      'La marge nette est calculée sur le prix de vente : (PV − coût) / PV. La marge brute (parfois appelée taux de marge) est calculée sur le coût : (PV − coût) / coût. Pour le même chantier, une marge brute de 30 % correspond à une marge nette de 23 %. Le calculateur travaille en marge nette, qui est la référence comptable correcte et qui correspond à ce qui rentre vraiment dans votre poche.',
  },
  {
    question: 'Pourquoi le verdict passe en orange en dessous de 14,5 % ?',
    answer:
      "14,5 % de marge nette est le seuil en dessous duquel un aléa moyen suffit à transformer le chantier en perte : un retard de 15 jours sur un paiement, une remise commerciale de fin de chantier, un poste oublié dans le devis, une intempérie. Au-dessus de 14,5 %, vous avez du coussin pour absorber ces imprévus. C'est le seuil que nous utilisons dans Batup pour alerter sur les chantiers à risque.",
  },
  {
    question: 'Comment gérer les frais imprévus dans un devis ?',
    answer:
      "Deux options. Option A : ajouter une ligne « aléas / imprévus » représentant 3 à 5 % du chantier — c'est transparent et le client le comprend généralement. Option B : appliquer une marge nette cible légèrement supérieure (par exemple 28 % au lieu de 23 %) qui absorbe les aléas sans qu'ils apparaissent en clair. La plupart des artisans expérimentés font les deux.",
  },
  {
    question: 'Faut-il refacturer la sous-traitance avec une marge ?',
    answer:
      "Légalement, vous le pouvez, et c'est souvent recommandé car la sous-traitance vous coûte aussi en temps de coordination, de qualité-contrôle et de trésorerie. Une marge de 10 à 15 % sur la sous-traitance est usuelle. Si vous refacturez au coût réel (pass-through), assurez-vous que votre main d'œuvre absorbe le temps de gestion.",
  },
  {
    question: 'Pourquoi le calculateur ne demande pas la TVA ?',
    answer:
      "Tout est en HT. Pour le client final, vous appliquerez la TVA selon votre régime (10 % rénovation, 20 % neuf, 5,5 % travaux d'efficacité énergétique). La TVA collectée est reversée à l'État, elle n'intervient pas dans votre marge.",
  },
  {
    question: 'Mon client dit que mon prix est trop élevé. Comment réagir ?',
    answer:
      'Avant de baisser le prix, vérifiez le verdict du calculateur. Si vous êtes en marge nette < 14,5 %, ne descendez pas : vous travaillerez à perte. Préférez ajuster le périmètre (matériaux moins chers, finitions simplifiées, phasage du chantier). Si vous êtes confortablement au-dessus, vous pouvez accorder une remise de 3 à 5 % sans danger.',
  },
  {
    question: 'Le calculateur garde-t-il mes données ?',
    answer:
      "Non. Tout est calculé en local dans votre navigateur, rien n'est envoyé sur nos serveurs. Si vous voulez sauvegarder vos devis, les comparer, les envoyer à vos clients ou suivre vos marges sur l'année, c'est précisément ce que Batup propose — essai gratuit ci-dessous.",
  },
];
