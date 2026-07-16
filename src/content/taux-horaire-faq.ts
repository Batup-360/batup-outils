import type { FAQItem } from '@/components/FAQAccordion';

export const tauxHoraireFAQ: FAQItem[] = [
  {
    question: 'Comment calculer son taux horaire dans le BTP ?',
    answer:
      "Additionnez toutes vos charges annuelles (salaires chargés, local, véhicules, assurances, logiciels, marketing), divisez par le nombre d'heures réellement facturables dans l'année, puis appliquez votre marge cible. Exemple : 73 500 € de charges ÷ 1 200 h = 61 €/h de coût, soit environ 70 €/h avec 15 % de marge. Le calculateur ci-dessus fait ce calcul à partir de vos chiffres.",
  },
  {
    question: 'Combien d’heures facturables par an pour un artisan ?',
    answer:
      "Beaucoup moins qu'on ne le croit : autour de 1 100 à 1 300 heures, pas 2 000. Sur 1 607 h légales, il faut retirer les congés, la formation, les intempéries, puis les heures non facturables (trajets, devis, administratif, pauses). Compter 2 000 h fait sous-évaluer le taux horaire de 30 à 40 %. C'est l'erreur n°1 : partez d'un volume réaliste (~1 200 h).",
  },
  {
    question: 'Quel est le tarif horaire d’un maçon, plombier ou électricien en 2026 ?',
    answer:
      "En moyenne 45 à 70 €/h HT selon le métier et la région : maçon ~55 €/h, plombier ~55 €/h, électricien ~40-45 €/h, menuisier/charpentier ~50 €/h, peintre ~30-40 €/h. L'Île-de-France se situe 20 à 30 % au-dessus, les zones rurales en dessous. Ces moyennes sont indicatives : votre vrai taux dépend de vos charges, pas de celui du voisin.",
  },
  {
    question: 'Quel est le taux horaire minimum dans le bâtiment ?',
    answer:
      "Il n'existe pas de taux horaire de vente minimum réglementaire — seul le SMIC encadre les salaires (environ 12 €/h brut). Votre taux minimum est votre seuil de rentabilité : le coût horaire en dessous duquel vous perdez de l'argent. Le calculateur le donne (coût de revient horaire) : facturer en dessous, c'est travailler à perte.",
  },
  {
    question: 'Faut-il afficher son taux horaire en HT ou en TTC sur le devis ?',
    answer:
      "En HT sur le devis destiné à un professionnel, et en HT et TTC pour un particulier (qui paie le prix TTC). Le taux horaire que vous calculez ici est un montant HT : ajoutez la TVA applicable (20 %, 10 % en rénovation d'un logement de plus de 2 ans, 5,5 % en rénovation énergétique) pour obtenir le TTC facturé au client.",
  },
  {
    question: 'Quelle marge appliquer sur son taux horaire pour être rentable ?',
    answer:
      "Comptez 10 à 30 % de marge nette au-dessus de votre coût horaire, avec 15 à 20 % comme cible saine. Cette marge finance les imprévus (SAV, remises, retards de paiement), l'investissement et votre rémunération réelle. Sans marge, le moindre aléa fait basculer le chantier en perte : ne vous contentez pas de couvrir vos coûts.",
  },
  {
    question: 'Comment justifier un taux horaire élevé face à un client qui négocie ?',
    answer:
      "Détaillez ce que couvre l'heure : main-d'œuvre qualifiée, charges sociales, assurance décennale, matériel, garantie et SAV — pas seulement le temps passé. Un taux plus élevé qu'un concurrent traduit souvent une vraie couverture d'assurance et une pérennité. Présentez un devis clair et chiffré : un prix argumenté se défend mieux qu'un prix bas non expliqué.",
  },
  {
    question: 'Comment ne plus perdre de temps à recalculer son taux horaire ?',
    answer:
      "En le pilotant en continu plutôt qu'une fois par an sur Excel. Batup calcule automatiquement vos heures réellement facturées à partir des pointages chantier et suit vos charges en temps réel, pour garder un taux horaire juste et une marge maîtrisée sur chaque chantier. Essai gratuit, sans carte bancaire.",
  },
];
