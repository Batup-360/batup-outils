import type { FAQItem } from '@/components/FAQAccordion';

export const margeNetteFAQ: FAQItem[] = [
  {
    question: 'Quelle est la différence entre la marge et le coefficient ?',
    answer:
      "Le coefficient est un multiplicateur appliqué au coût pour obtenir le prix de vente (coefficient = prix de vente ÷ coût). La marge est la différence entre le prix de vente et le coût, exprimée en %. Exemple : un coût de 100 € × coefficient 1,30 = 130 € de vente, soit 30 € de marge (23 % du prix de vente). Le calculateur convertit l'un en l'autre instantanément.",
  },
  {
    question: 'Comment passer d’un coefficient à une marge (et inversement) ?',
    answer:
      "À partir du coefficient : marge nette (%) = (1 − 1/coefficient) × 100. Un coefficient de 1,30 donne 23,1 % de marge nette. À l'inverse : coefficient = 1 ÷ (1 − marge/100). Une marge nette de 25 % correspond à un coefficient de 1,33. Le calculateur fait ces deux conversions et affiche le prix de vente correspondant.",
  },
  {
    question: 'Quelle est la différence entre taux de marge et taux de marque ?',
    answer:
      "Le taux de marge se calcule sur le coût d'achat (marge ÷ coût), le taux de marque sur le prix de vente (marge ÷ prix de vente). Les deux donnent des prix très différents pour un même pourcentage. Confondre les deux — annoncer « 30 % » sans préciser la base — fait chiffrer environ 5 points trop bas. Ici, la marge nette est calculée sur le prix de vente (taux de marque).",
  },
  {
    question: 'Quel coefficient appliquer sur les matériaux dans le bâtiment ?',
    answer:
      "Entre 1,3 et 1,7 selon les fournitures : environ 1,3 sur les petites fournitures, 1,5 sur les matériaux principaux. Certains corps de métier montent plus haut (électricien 2,0 à 2,2, plombier 1,8 à 2,0 sur le matériel). Appliquer un coefficient unique à tout est une erreur : mieux vaut le moduler selon le type de fourniture et la marge visée.",
  },
  {
    question: 'Comment calculer la marge nette d’un artisan ?',
    answer:
      "Marge nette (%) = (prix de vente − coût de revient complet) ÷ prix de vente × 100. Le coût de revient complet inclut la main-d'œuvre chargée, les fournitures, le matériel ET les frais généraux (15 à 25 %). Attention : une marge brute de 30 à 50 % (matériaux seuls) peut cacher une marge nette de seulement 1 à 3 % une fois tous les frais déduits.",
  },
  {
    question: 'Quelle est la marge moyenne dans le bâtiment ?',
    answer:
      "La marge brute cible varie selon le chantier : 30 à 50 % en rénovation courante, 50 à 70 % en dépannage, 25 à 40 % en construction neuve, 15 à 25 % en sous-traitance. Mais la marge nette moyenne du secteur n'est que de 1 à 3 % du chiffre d'affaires. Une marge nette saine se situe entre 15 et 30 % : c'est l'objectif à viser.",
  },
  {
    question: 'Comment calculer son prix de vente à partir du coût de revient ?',
    answer:
      "Prix de vente HT = coût de revient ÷ (1 − marge nette visée/100), ou coût de revient × coefficient. Pour un coût de 100 € et une marge nette cible de 25 % : 100 ÷ 0,75 = 133 €. Le calculateur affiche directement ce prix de vente à partir de votre coût et de votre objectif de marge ou de coefficient.",
  },
  {
    question: 'Comment connaître la vraie marge nette de chaque chantier ?',
    answer:
      "En suivant les coûts réels — heures pointées, achats, frais de structure — chantier par chantier, plutôt qu'en estimant sur Excel. Batup calcule la marge nette réelle de chaque chantier à partir de vos données terrain, pour repérer ceux qui rapportent vraiment et ajuster vos prix. Essai gratuit, sans carte bancaire.",
  },
];
