import type { FAQItem } from '@/components/FAQAccordion';

export const prixChantierFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le prix de vente d’un chantier ?',
    answer:
      "Partez du déboursé sec (main-d'œuvre + fournitures + matériel), ajoutez les frais généraux (15 à 25 %), puis appliquez votre marge. En pratique : prix de vente HT = déboursé sec × coefficient. Le calculateur applique votre coefficient ou votre marge cible et affiche le prix HT à viser, avec un verdict de rentabilité.",
  },
  {
    question: 'Qu’est-ce que le déboursé sec et comment le calculer ?',
    answer:
      "Le déboursé sec est le coût direct d'un chantier, sans marge ni frais de structure : main-d'œuvre (heures × coût horaire chargé) + fournitures + matériel loué. C'est la base de tout chiffrage. On lui ajoute ensuite les frais généraux puis la marge pour obtenir le prix de vente. Oublier une part du déboursé, c'est vendre à perte sans le voir.",
  },
  {
    question: 'Quel coefficient multiplicateur appliquer dans le BTP ?',
    answer:
      "Le coefficient moyen du bâtiment tourne autour de 1,30, mais il varie selon la prestation : fournitures seules 1,3 à 1,5, main-d'œuvre / pose 1,8 à 2,2, fourniture + pose 1,5 à 1,8, sous-traitance 1,15 à 1,25, études 2,5 à 3,5. Un plombier vise 1,8 à 2,0 sur le matériel, un électricien 2,0 à 2,2. Le bon coefficient couvre vos frais tout en restant compétitif.",
  },
  {
    question: 'Quelle est la différence entre taux de marge et taux de marque ?',
    answer:
      "Le taux de marge se calcule sur le coût (marge ÷ coût de revient) ; le taux de marque se calcule sur le prix de vente (marge ÷ prix de vente HT). C'est la confusion n°1 : annoncer « 30 % » sans préciser la base fait chiffrer environ 5 points trop bas. Pour fixer un prix, raisonnez en taux de marque : prix = coût ÷ (1 − marque).",
  },
  {
    question: 'Quelle marge viser pour qu’un chantier soit rentable ?',
    answer:
      "Une marge nette de 20 à 35 % est une zone saine. En dessous de 15 %, la rentabilité est fragile : le moindre aléa fait basculer en perte. Au-dessus de 40 %, vous risquez de perdre l'appel d'offres. Attention : la marge nette moyenne du secteur n'est que de 1 à 3 % du chiffre d'affaires — beaucoup d'artisans croient gagner 30 % et n'en gardent que 8.",
  },
  {
    question: 'Comment intégrer les aléas de chantier dans le devis ?',
    answer:
      "Ajoutez une provision pour imprévus de 10 à 15 % du déboursé sec : intempéries, découvertes en rénovation, reprises, retards. Comptez aussi un coefficient de perte sur les matériaux (5 à 10 % pour le carrelage, 8 à 15 % pour les revêtements de sol). Sans ces marges, un chantier calculé « au plus juste » finit presque toujours en dessous de sa marge prévue.",
  },
  {
    question: 'Quelle TVA appliquer sur un devis de travaux ?',
    answer:
      "20 % pour le neuf et les locaux professionnels ; 10 % pour l'amélioration ou l'entretien d'un logement de plus de 2 ans ; 5,5 % pour la rénovation énergétique. Depuis mars 2025, une mention certifiée par le client sur le devis remplace l'ancienne attestation papier. Le prix de vente que vous calculez est un montant HT auquel s'ajoute cette TVA.",
  },
  {
    question: 'Comment chiffrer plus vite et sans erreur ses chantiers ?',
    answer:
      "En sortant d'Excel, source d'oublis et d'erreurs dès qu'on gère plusieurs chantiers. Batup calcule le déboursé sec à partir de vos coûts réels, applique vos coefficients et marges, et génère un devis complet et conforme en quelques minutes — avec la marge visible avant l'envoi. Essai gratuit, sans carte bancaire.",
  },
];
