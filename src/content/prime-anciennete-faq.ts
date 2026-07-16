import type { FAQItem } from '@/components/FAQAccordion';

export const primeAncienneteFAQ: FAQItem[] = [
  {
    question: 'La prime d’ancienneté est-elle obligatoire dans le bâtiment ?',
    answer:
      "Pas au niveau national : les conventions collectives nationales du bâtiment (IDCC 1596/1597 ouvriers, IDCC 2609 ETAM) ne prévoient pas de prime d'ancienneté monétaire obligatoire ; elles reconnaissent l'ancienneté par des jours de congés supplémentaires. Une prime en pourcentage résulte le plus souvent d'un accord régional, d'un accord d'entreprise ou du contrat de travail. Vérifiez le texte qui s'applique à vous.",
  },
  {
    question: 'Comment calculer la prime d’ancienneté d’un salarié du BTP ?',
    answer:
      "Quand une prime existe (accord régional ou d'entreprise), on applique un taux croissant avec l'ancienneté à une base de calcul — généralement le salaire minimum conventionnel de la catégorie, pas le salaire réel. Exemple avec un barème de 3 % : 3 % × salaire de référence = prime mensuelle. Le calculateur applique un barème par paliers et chiffre aussi le coût employeur chargé.",
  },
  {
    question: 'Quelle base de calcul pour la prime d’ancienneté ?',
    answer:
      "Le plus souvent le salaire minimum conventionnel de la classification du salarié (ou le salaire de base réel, selon le texte le plus favorable), et non l'intégralité de la rémunération primes comprises. Cette base change sensiblement le résultat : vérifiez ce que prévoit votre accord régional ou d'entreprise avant de figer un montant en paie.",
  },
  {
    question: 'Quelle différence entre prime et jours d’ancienneté dans le bâtiment ?',
    answer:
      "Les jours d'ancienneté sont l'avantage réellement prévu par la CCN nationale ouvriers : 2 jours de congés supplémentaires à 20 ans, 4 jours à 25 ans, 6 jours à 30 ans d'ancienneté. La prime d'ancienneté, elle, est un versement en euros qui n'existe que si un accord régional, d'entreprise ou le contrat le prévoit. Les deux ne se confondent pas.",
  },
  {
    question: 'Un salarié à temps partiel touche-t-il la même prime d’ancienneté ?',
    answer:
      "Non : lorsqu'une prime d'ancienneté s'applique, elle est proratisée au temps de travail, comme le salaire. Un salarié à mi-temps perçoit la moitié de la prime d'un temps plein de même ancienneté et même classification. Le calculateur raisonne sur la base saisie ; ajustez-la au temps de travail réel.",
  },
  {
    question: 'La prime d’ancienneté est-elle maintenue en cas de maladie ?',
    answer:
      "Cela dépend de l'accord applicable. En général, la prime suit le sort du salaire : maintenue si le salaire est maintenu (subrogation employeur), réduite ou suspendue si le salaire ne l'est pas. Les périodes de maladie, d'accident du travail ou de maternité comptent en revanche dans l'ancienneté du salarié. Référez-vous à votre accord.",
  },
  {
    question: 'Comment déterminer l’ancienneté d’un salarié ?',
    answer:
      "L'ancienneté court à partir de la date d'entrée dans l'entreprise et inclut les périodes assimilées à du travail effectif (congés payés, maladie, accident du travail, maternité). En cas de rachat ou de transfert d'entreprise (article L1224-1 du Code du travail), l'ancienneté est reprise. Les missions d'intérim antérieures ne sont en principe pas comptées, sauf disposition contraire.",
  },
  {
    question: 'Comment suivre l’ancienneté et les primes de toute mon équipe ?',
    answer:
      "En automatisant plutôt qu'en surveillant des dates d'embauche sur un tableur. Batup connaît la date d'entrée de chaque salarié, applique le bon palier selon l'accord retenu, alimente la paie et met à jour le coût horaire chargé utilisé dans vos devis. Plus de palier oublié ni de marge surestimée. Essai gratuit, sans carte bancaire.",
  },
];
