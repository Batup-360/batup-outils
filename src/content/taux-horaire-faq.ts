import type { FAQItem } from '@/components/FAQAccordion';

export const tauxHoraireFAQ: FAQItem[] = [
  {
    question: 'Combien faut-il facturer l’heure quand on est artisan du BTP ?',
    answer:
      "Il n'y a pas de taux unique : tout dépend de vos charges fixes annuelles, du nombre d'heures réellement facturables dans l'année et de la marge nette que vous visez. Pour un artisan seul avec 60 000 € de charges, 220 jours travaillés et une marge nette cible de 23 %, le taux à facturer ressort généralement entre 42 et 48 €/h HT. Utilisez le calculateur ci-dessus pour obtenir le taux adapté à votre situation.",
  },
  {
    question: "Qu'est-ce que le coût de revient horaire ?",
    answer:
      "C'est le seuil minimum en dessous duquel chaque heure facturée vous fait perdre de l'argent. On l'obtient en divisant la totalité de vos charges fixes annuelles (salaires, local, véhicules, assurances, logiciels, etc.) par le nombre d'heures réellement facturables dans l'année. Tant que votre taux facturé est en dessous, vous payez de votre poche pour travailler.",
  },
  {
    question: 'Quelle est la différence entre marge nette et coefficient ?',
    answer:
      "La marge nette est exprimée en pourcentage du prix de vente (méthode comptable correcte), le coefficient en pourcentage du coût. Une marge nette de 23,08 % équivaut à un coefficient de 1,30. Travailler en marge nette évite les erreurs classiques où l'on croit avoir 30 % de marge alors qu'on n'en a en réalité que 23 %.",
  },
  {
    question: 'Combien de jours travaillés faut-il prendre dans le calcul ?',
    answer:
      "Sur 365 jours, retirez 104 jours de week-end, 11 jours fériés, 25 jours de congés payés et environ 15 jours combinés d'arrêts maladie et d'intempéries. On obtient autour de 210–220 jours réellement facturables. Pour une équipe expérimentée et un planning serré, 220 est une bonne base. En cas de chantiers très saisonniers (façades, toiture), descendre à 200 est plus prudent.",
  },
  {
    question: 'Combien d’heures par jour faut-il compter ?',
    answer:
      "Le standard légal en France est 7 ou 8 heures par jour. Attention à ne pas confondre les heures de présence et les heures réellement facturables au client : les temps de trajet, de chargement, de pause et d'administratif ne sont pas facturés. La plupart des artisans facturent en moyenne 6,5 à 7,5 heures par journée de présence.",
  },
  {
    question: 'Pourquoi ma marge nette cible doit-elle être supérieure à 14,5 % ?',
    answer:
      'En-dessous de 14,5 % de marge nette, un seul aléa (retard de paiement, SAV, oubli de poste, remise commerciale, intempérie) suffit à transformer le chantier en perte. 14,5 % est le seuil de sécurité que nous utilisons dans Batup ; au-dessus, vous avez du coussin pour absorber les imprévus.',
  },
  {
    question: 'Le calcul tient-il compte de mon salaire de dirigeant ?',
    answer:
      "Oui : intégrez votre rémunération brute annuelle dans les coûts salariaux totaux. C'est une erreur fréquente que de l'oublier : si votre taux horaire ne couvre pas votre propre rémunération, vous travaillez gratuitement et l'entreprise vit sur le crédit fournisseur.",
  },
  {
    question: 'Et la TVA ? Le taux calculé est-il HT ou TTC ?',
    answer:
      "Le calculateur fonctionne intégralement en HT (hors taxes). Pour obtenir votre taux TTC, multipliez le résultat par 1,10 (TVA 10 %, rénovation logement) ou 1,20 (TVA 20 %, neuf). C'est le HT qui rentre dans votre poche, donc c'est sur lui qu'on raisonne pour la rentabilité.",
  },
  {
    question: 'Mon taux calculé est très supérieur à ce que pratiquent mes concurrents.',
    answer:
      "C'est souvent le signe que vos concurrents sous-estiment leurs charges réelles ou ne se versent pas un vrai salaire. Plutôt que de baisser votre taux, augmentez la valeur perçue (qualité, délais, garanties, communication client). Le calculateur vous dit ce qu'il faut facturer pour vivre dignement de votre métier, pas pour casser les prix.",
  },
];
