import type { FAQItem } from '@/components/FAQAccordion';

export const tvaAutoliquidationFAQ: FAQItem[] = [
  {
    question: 'Qui paie la TVA en cas d’autoliquidation dans le BTP ?',
    answer:
      "C'est le donneur d'ordre (l'entreprise principale), pas le sous-traitant. Le sous-traitant facture en HT, sans TVA ; le donneur d'ordre déclare et paie la TVA sur sa déclaration CA3, puis la déduit. Le sous-traitant ne collecte donc aucune TVA sur ces travaux : c'est une simple opération de report de la taxe vers le client professionnel.",
  },
  {
    question: 'Comment savoir si je suis concerné par l’autoliquidation ?',
    answer:
      "L'autoliquidation s'applique quand vous réalisez des travaux de bâtiment en tant que sous-traitant pour un donneur d'ordre assujetti à la TVA (art. 283-2 nonies du CGI). Elle ne s'applique pas si votre client direct est un particulier, ni si vous êtes en franchise en base de TVA. Le vérificateur ci-dessus tranche votre cas.",
  },
  {
    question: 'Un auto-entrepreneur en franchise de TVA est-il concerné ?',
    answer:
      "Non. Un sous-traitant en franchise en base de TVA n'autoliquide pas : il facture en HT avec la mention « TVA non applicable, art. 293 B du CGI », et non « Autoliquidation ». C'est l'erreur la plus fréquente. L'autoliquidation suppose que le sous-traitant est lui-même assujetti et redevable de la TVA.",
  },
  {
    question: 'Quelle mention mettre sur une facture en autoliquidation ?',
    answer:
      "La mention obligatoire est le mot « Autoliquidation », sur une facture établie en HT sans TVA. En pratique, on écrit souvent la forme complète : « Autoliquidation — TVA due par le preneur (art. 283-2 nonies du CGI) ». L'absence de TVA et cette mention sont les deux éléments indispensables.",
  },
  {
    question: 'Quel taux de TVA appliquer en autoliquidation ?',
    answer:
      "Le sous-traitant facture en HT sans appliquer de taux. C'est le donneur d'ordre qui autoliquide au taux correspondant à la nature des travaux : 20 %, 10 % (amélioration d'un logement de plus de 2 ans) ou 5,5 % (rénovation énergétique). Depuis la doctrine BOFiP du 22 octobre 2025, il doit ventiler par taux quand un chantier mélange plusieurs types de travaux.",
  },
  {
    question: 'Quelles sanctions en cas d’oubli de l’autoliquidation ?',
    answer:
      "Deux sanctions distinctes. L'oubli de la mention sur la facture coûte 15 € par mention manquante (art. 1737 du CGI), plafonné au quart de la facture. Le défaut de déclaration de la TVA autoliquidée par le donneur d'ordre est sanctionné d'une amende de 5 % de la TVA déductible omise (art. 1788 A du CGI), plus intérêts de retard.",
  },
  {
    question: 'L’autoliquidation s’applique-t-elle à la fourniture de matériel seul ?',
    answer:
      "Non. La simple fourniture de matériaux sans pose et la location de matériel sans opérateur sont exclues de l'autoliquidation : elles suivent le régime de TVA normal. L'autoliquidation vise les travaux immobiliers (construction, rénovation, entretien, réparation, démolition) réalisés en sous-traitance. Un chantier mixte fourniture + pose relève des travaux.",
  },
  {
    question: 'L’autoliquidation vaut-elle pour un sous-traitant de rang 2 ?',
    answer:
      "Oui. L'autoliquidation s'applique à chaque niveau d'une chaîne de sous-traitance : le sous-traitant de rang 2 facture en HT au sous-traitant de rang 1, qui autoliquide, et ainsi de suite jusqu'à l'entreprise principale. Un devis ou un bon de commande signé suffit à établir la relation de sous-traitance ; un contrat formel n'est pas exigé.",
  },
];
