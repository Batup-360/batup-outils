import type { FAQItem } from '@/components/FAQAccordion';

export const heuresSupFAQ: FAQItem[] = [
  {
    question: 'Quel est le taux de majoration des heures supplémentaires dans le bâtiment ?',
    answer:
      "Dans le BTP, les heures de la 36ᵉ à la 43ᵉ sont majorées de 25 %, et à partir de la 44ᵉ heure de 50 %. Pour un taux horaire de 15 €, une heure sup à 25 % est payée 18,75 €, et à 50 % 22,50 €. Le calculateur applique ce découpage automatiquement à partir des heures saisies.",
  },
  {
    question: 'Comment calculer les heures supplémentaires dans le BTP ?',
    answer:
      "On part de la base de 35 h. Les heures effectuées au-delà, jusqu'à 43 h, sont majorées de 25 % ; celles à partir de 44 h, de 50 %. Une semaine de 44 h compte donc 8 heures à +25 % et 1 heure à +50 %. On ajoute ensuite les paniers, l'indemnité de trajet et, le cas échéant, le grand déplacement. Le calculateur fait ce décompte pour vous.",
  },
  {
    question: 'Le temps de trajet chantier est-il du temps de travail ?',
    answer:
      "Non, le trajet domicile-chantier n'est en principe pas du temps de travail effectif : il n'est pas majoré comme une heure travaillée. Il est compensé par l'indemnité de trajet, qui indemnise le temps de déplacement, distincte de l'indemnité de transport qui rembourse le coût. La distance se mesure en kilomètres réels depuis le siège ou le dépôt de l'entreprise.",
  },
  {
    question: 'Différence entre indemnité de trajet et indemnité de transport BTP ?',
    answer:
      "L'indemnité de trajet compense le temps passé à se rendre sur le chantier ; elle est due quel que soit le moyen de transport. L'indemnité de transport rembourse le coût du déplacement ; elle n'est pas due si l'employeur fournit un véhicule ou prend en charge le transport. Les deux dépendent de la zone (distance réelle depuis le dépôt) et de barèmes régionaux.",
  },
  {
    question: 'Quel est le montant de la prime de panier repas BTP en 2026 ?',
    answer:
      "Le panier conventionnel payé varie selon la région : de l'ordre de 13 à 14,30 € par jour en 2025-2026. Attention, à ne pas confondre avec le plafond d'exonération URSSAF (environ 10,40 € en 2026) : au-delà de ce plafond, l'excédent est soumis à cotisations. Le calculateur utilise une valeur de référence ; ajustez-la à votre accord régional.",
  },
  {
    question: 'Quel est le contingent d’heures supplémentaires dans le BTP en 2026 ?',
    answer:
      "Le contingent annuel dans le bâtiment est de 180 heures par salarié (145 heures en cas d'annualisation du temps de travail), inférieur au contingent légal de 220 heures. Au-delà du contingent, chaque heure supplémentaire ouvre droit à une contrepartie obligatoire en repos, en plus de la majoration salariale.",
  },
  {
    question: 'Quelles sont les conditions du grand déplacement dans le BTP ?',
    answer:
      "Le grand déplacement s'applique quand deux conditions sont réunies : l'éloignement est d'au moins 50 km entre le domicile et le chantier, ET le trajet en transports en commun dépasserait 1h30. Le salarié perçoit alors des indemnités de repas et d'hébergement, selon un barème dégressif au-delà de plusieurs mois sur le même chantier.",
  },
  {
    question: 'Les heures supplémentaires du BTP sont-elles défiscalisées ?',
    answer:
      "Oui, la rémunération des heures supplémentaires est exonérée d'impôt sur le revenu dans la limite de 7 500 € par an et par salarié, et bénéficie d'une réduction de cotisations salariales. La majoration reste due par l'employeur. C'est un avantage net pour le salarié : à compétence égale, les heures sup sont plus intéressantes que le même montant en salaire de base.",
  },
];
