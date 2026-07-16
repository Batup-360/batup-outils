import type { FAQItem } from '@/components/FAQAccordion';

export const mentionTvaFAQ: FAQItem[] = [
  {
    question: 'Comment savoir si la TVA est à 10 ou 20 % pour mes travaux ?',
    answer:
      "10 % pour les travaux d'amélioration, de transformation, d'aménagement ou d'entretien d'un logement achevé depuis plus de 2 ans. 20 % pour le neuf, un logement de moins de 2 ans, un local professionnel, ou des travaux qui augmentent la surface de plancher de plus de 10 % ou reviennent à produire un immeuble neuf. Le générateur ci-dessus tranche selon votre situation.",
  },
  {
    question: 'Quels travaux bénéficient de la TVA à 5,5 % ?',
    answer:
      "Uniquement les travaux d'amélioration de la qualité énergétique d'un logement de plus de 2 ans : isolation thermique, chaudière à haute performance, pompe à chaleur, double vitrage, ainsi que les travaux induits indissociables. Tous les autres travaux de rénovation relèvent du 10 %, pas du 5,5 %. C'est une confusion fréquente : le 5,5 % n'est pas le taux de toute rénovation.",
  },
  {
    question: 'Quelle mention TVA écrire sur un devis ou une facture en 2026 ?',
    answer:
      "Pour un taux réduit, le client appose sur le devis ou la facture une mention certifiant que le logement a plus de 2 ans et la nature des travaux (art. 279-0 bis pour le 10 %, 278-0 bis A pour le 5,5 %). En sous-traitance : « Autoliquidation ». En franchise : « TVA non applicable, art. 293 B du CGI ». Le générateur produit la mention exacte à copier.",
  },
  {
    question: 'L’attestation TVA (Cerfa 1300 / 1301) est-elle encore obligatoire ?',
    answer:
      "Non, plus depuis le 1er mars 2025. Le formulaire CERFA d'attestation a été supprimé : il est remplacé par une mention de certification que le client appose et signe directement sur le devis ou la facture. Beaucoup de sites indiquent encore le contraire — c'est faux. La règle est confirmée par le BOFiP BOI-TVA-LIQ-30-20-90-40 du 22 octobre 2025.",
  },
  {
    question: 'Faut-il la mention si les travaux sont inférieurs à 1 000 € ?',
    answer:
      "Pour des travaux d'entretien ou de réparation inférieurs à 1 000 € TTC, la mention de certification n'est pas exigée. La facture doit néanmoins comporter le nom et l'adresse du client, l'adresse du chantier, la nature des travaux et l'ancienneté du logement (plus de 2 ans). Au-delà de ce seuil, la mention signée du client redevient nécessaire pour le taux réduit.",
  },
  {
    question: 'Quelle mention pour un auto-entrepreneur en franchise de TVA ?',
    answer:
      "« TVA non applicable, art. 293 B du CGI ». En franchise en base, vous facturez en HT sans TVA et n'appliquez ni le taux réduit ni l'autoliquidation. Les seuils 2026 sont de 37 500 € pour les prestations de services (majoré 41 250 €) ; le projet de seuil unique à 25 000 € a été suspendu. Surveillez le franchissement en cours d'année.",
  },
  {
    question: 'Quelle TVA si le client achète lui-même les matériaux ?',
    answer:
      "Le taux réduit ne s'applique qu'à une prestation globale de fourniture et de pose par l'entreprise. Si le client fournit lui-même les matériaux, seule la main-d'œuvre peut bénéficier du taux réduit, et les matériaux qu'il achète restent à 20 %. C'est une erreur coûteuse fréquente : facturer à 10 % des matériaux fournis par le client expose à un redressement.",
  },
  {
    question: 'Qui est responsable en cas d’erreur de taux de TVA ?',
    answer:
      "L'entreprise est responsable de l'application du bon taux, mais le client qui certifie les conditions (ancienneté, nature des travaux) est solidairement redevable du complément de TVA si sa déclaration est inexacte. C'est tout l'intérêt de la mention signée : elle engage le client. Conservez-la 5 ans avec la facture à l'appui de votre comptabilité.",
  },
];
