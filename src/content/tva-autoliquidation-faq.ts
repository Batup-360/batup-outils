import type { FAQItem } from '@/components/FAQAccordion';

export const tvaAutoliquidationFAQ: FAQItem[] = [
  {
    question: 'Qu’est-ce que l’autoliquidation de TVA dans le BTP ?',
    answer:
      "C'est un régime particulier de TVA prévu à l'article 283-2 nonies du CGI, introduit par la loi de finances 2014 pour lutter contre la fraude TVA dans les chantiers en sous-traitance. Le sous-traitant ne facture pas la TVA : il indique sur sa facture le montant HT seul et la mention « Autoliquidation ». C'est le donneur d'ordre (l'entreprise principale) qui collecte la TVA dans sa propre déclaration et qui la déduit immédiatement. Le mécanisme est neutre financièrement mais sécurise la collecte pour l'État.",
  },
  {
    question: 'Quand suis-je en autoliquidation en tant que sous-traitant ?',
    answer:
      "Trois conditions cumulatives : (1) vous facturez une autre entreprise du BTP qui est titulaire du marché vis-à-vis du client final, pas directement le client final ; (2) ce donneur d'ordre est un assujetti à la TVA établi en France ; (3) les travaux portent sur un immeuble (construction, rénovation, réparation, démolition, nettoyage rattaché à des travaux, travaux publics). Si une seule de ces conditions manque, vous restez en TVA classique.",
  },
  {
    question: 'Quelle mention exacte mettre sur ma facture en autoliquidation ?',
    answer:
      "La mention obligatoire à recopier mot pour mot est : « TVA due par le preneur — Autoliquidation, article 283-2 nonies du CGI ». Elle doit figurer de manière visible sur la facture, à côté du total. Vous indiquez le montant HT seul, sans ligne TVA. Une omission de cette mention vous expose à une amende fiscale de 5 % du montant facturé (article 1737 du CGI), même si le régime applicable est bien l'autoliquidation.",
  },
  {
    question: 'Que se passe-t-il si je collecte la TVA par erreur en autoliquidation ?',
    answer:
      "Si vous facturez à tort de la TVA alors que le régime est l'autoliquidation, vous devez la reverser à l'État (TVA facturée = TVA due), mais votre client ne peut pas la déduire car la facture est non conforme. Résultat : votre client subit un manque à gagner et peut vous demander une facture rectificative. En cas de contrôle, l'administration redresse votre client sur la déduction abusive. Il faut alors émettre un avoir et refaire la facture en autoliquidation.",
  },
  {
    question: 'Le particulier client final est-il concerné par l’autoliquidation ?',
    answer:
      "Non. L'autoliquidation ne s'applique qu'entre professionnels du BTP. Si vous travaillez directement pour un particulier, un syndic de copropriété ou un maître d'ouvrage non assujetti, vous appliquez la TVA classique : 5,5 % pour les travaux d'amélioration énergétique éligibles, 10 % pour la rénovation d'un logement de plus de deux ans, 20 % pour le neuf et le reste. Le particulier vous paye TTC et vous reversez la TVA collectée.",
  },
  {
    question: 'L’autoliquidation s’applique-t-elle si je suis auto-entrepreneur ?',
    answer:
      "Cela dépend de votre régime TVA, pas de votre forme juridique. Si vous êtes en franchise en base (sous les seuils de l'article 293 B du CGI), vous ne facturez jamais de TVA et l'autoliquidation ne joue pas : votre facture porte la mention « TVA non applicable — art. 293 B du CGI ». Si vous avez opté pour la TVA ou si vous avez dépassé les seuils, l'autoliquidation s'applique exactement comme pour une SARL ou une SAS sous-traitante : vérifiez les trois conditions cumulatives.",
  },
  {
    question: 'Comment déclarer la TVA en autoliquidation (CA12 / CA3) ?',
    answer:
      "Côté sous-traitant : reportez le montant HT dans la ligne « Autres opérations non imposables » (ligne 05 du CA3 mensuel/trimestriel, ou ligne équivalente du CA12 annuel pour le régime simplifié). Vous ne collectez aucune TVA sur cette opération. Côté donneur d'ordre : déclarez le HT en base imposable (ligne 02 du CA3) ET en TVA déductible sur le même formulaire — l'opération est neutre. Conservez les factures et le contrat de sous-traitance pour justifier le régime en cas de contrôle.",
  },
  {
    question: 'Que faire si je ne suis pas sûr du régime applicable ?',
    answer:
      "En cas de doute, deux réflexes. D'abord, demandez par écrit à votre donneur d'ordre s'il est titulaire du marché et assujetti à la TVA — sa réponse engage sa responsabilité et sécurise votre facture. Ensuite, en cas de doute persistant, vous pouvez interroger le SIE (Service des Impôts des Entreprises) par rescrit (art. L80 B du LPF) : la réponse de l'administration vous est opposable. Dans tous les cas, gardez une trace écrite (contrat de sous-traitance, devis accepté, échange mail) qui prouve la nature de la relation.",
  },
];
