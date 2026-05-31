import type { FAQItem } from '@/components/FAQAccordion';

export const margeNetteFAQ: FAQItem[] = [
  {
    question: 'Comment calculer la marge nette d\'un chantier ou d\'un produit ?',
    answer:
      "La formule comptable correcte est : marge nette = (prix de vente HT − coût d'achat HT) / prix de vente HT × 100. Pour un produit acheté 100 € HT et revendu 130 € HT, la marge nette est de (130 − 100) / 130 = 23,08 %. C'est le pourcentage du chiffre d'affaires qui reste après avoir payé le coût direct — la base sur laquelle un comptable raisonne. Évitez de calculer la marge sur le coût (formule erronée fréquente) : elle gonfle artificiellement le résultat de plusieurs points.",
  },
  {
    question: 'Quelle différence entre coefficient, taux de marge et taux de marque ?',
    answer:
      "Le coefficient multiplicateur s'applique sur le coût (PV = coût × coef). Le taux de marge est calculé sur le coût : (PV − coût) / coût. Le taux de marque (ou marge nette commerciale) est calculé sur le PV : (PV − coût) / PV. Pour un coefficient de 1,30, le taux de marge est de 30 % mais le taux de marque (marge nette) n'est que de 23,08 %. Dans le BTP comme dans la grande distribution, la référence comptable est la marge nette (taux de marque) — c'est ce que retient l'administration fiscale.",
  },
  {
    question: 'Quel coefficient appliquer dans le BTP ?',
    answer:
      "Pour des matériaux de rénovation classique avec rotation rapide, 1,30 est la norme et correspond à environ 23 % de marge nette. Pour des matériaux à faible rotation, sur-mesure ou commandes spécifiques (carrelage importé, plan de travail en pierre, équipements techniques), 1,40 à 1,60 est usuel. Pour la sous-traitance refacturée au client, 1,10 à 1,15 couvre le temps de coordination. Pour la main d'œuvre, le coefficient s'applique sur le coût horaire interne et tourne autour de 1,30 à 1,50 selon votre structure.",
  },
  {
    question: 'Coefficient 2 = 100 % de marge ? Vrai ou faux ?',
    answer:
      "Faux. Un coefficient de 2 (PV = 2 × coût) correspond à une marge nette de 50 %, pas de 100 %. La formule : marge nette = (PV − coût) / PV = (2c − c) / 2c = 0,5 = 50 %. C'est une confusion classique : seul le taux de marge sur coût atteint 100 % avec un coefficient de 2. Pour avoir 100 % de marge nette il faudrait un PV infini par rapport au coût — ce qui est impossible. Plafond pratique de marge nette : autour de 60 % sur du conseil ou de la pose pure, rarement plus dans le BTP.",
  },
  {
    question: 'Pourquoi viser au moins 14,5 % de marge nette ?',
    answer:
      "En dessous de 14,5 %, un seul aléa annule la marge. Exemple sur un chantier à 10 000 € HT avec 12 % de marge nette : la marge théorique est de 1 200 €. Mais une remise commerciale de fin de chantier de 5 % (500 €), un poste oublié dans le devis (300 €) ou un retard de paiement de 30 jours (coût de trésorerie ≈ 100 €) suffisent à la ramener à 300 €, voire à zéro. Au-dessus de 14,5 %, vous avez du coussin pour absorber ces imprévus sans basculer en perte.",
  },
  {
    question: 'Comment passer du coefficient à la marge nette dans la tête ?',
    answer:
      "Un raccourci utile : marge nette (%) ≈ (coefficient − 1) / coefficient × 100. Pour 1,30 : (0,30 / 1,30) × 100 = 23,08 %. Pour 1,50 : (0,50 / 1,50) × 100 = 33,33 %. Pour 2,00 : 50 %. Pour 1,20 : 16,67 %. À mémoriser : 1,17 ≈ 14,5 % (seuil de sécurité), 1,30 ≈ 23 %, 1,50 ≈ 33 %, 2,00 = 50 %. Au-dessus de 1,17, vous êtes dans le vert ; en dessous, attention.",
  },
  {
    question: 'Le calcul change-t-il avec la TVA ?',
    answer:
      "Non. La marge nette et le coefficient s'appliquent toujours sur des montants HT (hors taxes). La TVA collectée est reversée à l'État et ne fait pas partie de votre marge. Si vous raisonnez en TTC par erreur, vous vous croyez plus rentable que vous ne l'êtes : un PV de 156 € TTC correspond à 130 € HT (TVA 20 %), et c'est sur 130 € que se calcule la marge. Le calculateur ci-dessus travaille intégralement en HT, conformément à la pratique comptable.",
  },
  {
    question: 'Faut-il appliquer le même coefficient à tous les postes du devis ?',
    answer:
      "Non, et c'est une erreur classique. Le coefficient doit refléter le risque, le temps de gestion et la trésorerie immobilisée par chaque poste. Main d'œuvre interne : coefficient 1,30 à 1,50 (couvre les charges patronales, l'encadrement, le temps mort). Matériaux courants : 1,30. Matériaux sur-mesure : 1,40 à 1,60. Sous-traitance : 1,10 à 1,15 (le sous-traitant prend son risque). Frais divers (déchèterie, location) : pass-through au coût. Mélanger les coefficients par poste augmente la marge globale de 2 à 4 points sur un chantier moyen.",
  },
  {
    question: 'Mon comptable parle de « marge brute » — c\'est pareil ?',
    answer:
      "Pas tout à fait. La marge brute, au sens comptable, est calculée sur l'ensemble du chiffre d'affaires moins l'ensemble des coûts directs (matières + main d'œuvre directe) sur une période — pas sur un seul produit ou chantier. À l'échelle d'un poste de devis, « marge brute » et « marge nette commerciale » désignent souvent la même chose : (PV − coût direct) / PV. La marge nette comptable de l'entreprise, elle, inclut aussi les charges fixes (local, assurances, frais généraux) et tourne en général entre 3 et 8 % du chiffre d'affaires global dans le BTP.",
  },
];
