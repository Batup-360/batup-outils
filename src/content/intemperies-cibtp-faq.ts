import type { FAQItem } from '@/components/FAQAccordion';

export const intemperiesCibtpFAQ: FAQItem[] = [
  {
    question: 'Quel est le montant de l’indemnité de chômage intempéries dans le BTP ?',
    answer:
      "L'indemnité est égale à 75 % du salaire horaire de référence (celui de la veille de l'arrêt, hors majorations d'heures supplémentaires et primes de frais), dans la limite d'un plafond horaire d'environ 26 €/h en 2026. Ce n'est pas 100 % du salaire. Le calculateur applique le taux de 75 % et le plafond en vigueur.",
  },
  {
    question: 'Combien d’heures d’intempéries sont indemnisables ?',
    answer:
      "Les heures d'arrêt réelles, moins une heure de carence sur le premier arrêt, dans la limite de 55 jours (ou l'équivalent en heures) par salarié et par année civile. Au-delà de ce plafond, l'arrêt n'est plus indemnisé. Le calculateur retranche la carence et s'arrête au plafond annuel.",
  },
  {
    question: 'L’indemnité intempéries est-elle payée à 100 % du salaire ?',
    answer:
      "Non. Elle correspond à 75 % du salaire horaire de référence, plafonnée. Le salarié subit donc une perte, mais faible sur le net : l'indemnité est exonérée de cotisations sociales et seule la CSG-CRDS (environ 6,70 %) s'applique. En net, l'écart réel avec un salaire travaillé reste limité.",
  },
  {
    question: 'Qu’est-ce que la carence d’une heure sur les intempéries ?',
    answer:
      "La première heure du premier arrêt n'est pas indemnisée : c'est la carence, fixée à 1 heure. Attention, beaucoup de sources parlent à tort d'une « carence de 10 jours » — c'est faux pour le régime intempéries du BTP. Le calculateur déduit automatiquement cette heure de carence du total indemnisable.",
  },
  {
    question: 'La canicule est-elle indemnisée au titre des intempéries ?',
    answer:
      "Oui, depuis le 1er janvier 2024, les fortes chaleurs (vigilance orange ou rouge de Météo-France) ouvrent droit au régime de chômage intempéries, au même titre que le gel, la neige ou les fortes pluies. L'arrêt doit rendre le travail dangereux ou impossible sur le chantier. Les mêmes règles de taux, de carence et de plafond s'appliquent.",
  },
  {
    question: 'Quelles conditions pour bénéficier de l’indemnité intempéries ?',
    answer:
      "Le salarié doit avoir travaillé au moins 200 heures dans le BTP au cours des deux mois précédents, être présent sur le chantier au moment de l'arrêt, et ne pas avoir dépassé le plafond de 55 jours indemnisés dans l'année. L'arrêt doit résulter d'intempéries rendant le travail dangereux ou impossible, sur décision de l'employeur.",
  },
  {
    question: 'Comment déclarer un arrêt intempéries en 2026 ?',
    answer:
      "Depuis le 1er janvier 2026, la déclaration se fait exclusivement en ligne, via l'espace sécurisé de votre caisse CIBTP ; les envois papier sont rejetés. L'employeur avance l'indemnité sur la paie, puis déclare l'arrêt et se fait rembourser. La déclaration doit être faite dans le mois suivant la reprise du travail, sous peine de forclusion.",
  },
  {
    question: 'Quelle différence entre chômage intempéries et chômage partiel ?',
    answer:
      "Le chômage intempéries est propre au BTP, financé par les caisses CIBTP, et ne nécessite aucune autorisation administrative préalable : l'employeur décide l'arrêt puis se fait rembourser. L'activité partielle (chômage partiel) relève d'un dispositif général, soumis à autorisation de l'administration et à un autre mode d'indemnisation. Les deux ne se cumulent pas sur les mêmes heures.",
  },
];
