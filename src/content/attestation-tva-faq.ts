import type { FAQItem } from '@/components/FAQAccordion';

export const attestationTvaFAQ: FAQItem[] = [
  {
    question: 'L’attestation TVA est-elle encore obligatoire en 2026 ?',
    answer:
      "Depuis le 1er mars 2025, le formulaire CERFA d'attestation n'est plus exigé pour les taux réduits de 10 % et 5,5 %. Une mention certifiant les conditions (logement de plus de 2 ans, nature des travaux), apposée et signée par le client sur le devis ou la facture, suffit désormais. Cette attestation reste un moyen pratique de recueillir cette certification et de la conserver à l'appui de votre comptabilité.",
  },
  {
    question: 'Quelle différence entre l’attestation simplifiée et l’attestation normale ?',
    answer:
      "L'attestation simplifiée suffit pour les travaux courants d'entretien et d'amélioration qui n'affectent ni les fondations, ni la structure, ni une part majoritaire du second œuvre. L'attestation normale, plus détaillée, est exigée pour les travaux plus lourds touchant le gros œuvre. Le modèle généré ici est l'attestation simplifiée, la plus fréquente.",
  },
  {
    question: 'Qui doit remplir et signer l’attestation TVA ?',
    answer:
      "C'est le client (le maître d'ouvrage : propriétaire, locataire ou syndic) qui remplit et signe l'attestation, car lui seul peut certifier l'ancienneté du logement et sa destination. L'entreprise fournit le modèle, mais n'est pas responsable de la véracité des déclarations du client. Elle est en revanche responsable de l'application du bon taux sur sa facture.",
  },
  {
    question: 'Quand faut-il établir l’attestation ?',
    answer:
      "Avant la facturation, idéalement à la signature du devis. L'attestation doit exister au moment où l'entreprise émet la facture au taux réduit. Une attestation régularisée après coup est fragile en cas de contrôle. La bonne pratique est de la faire signer en même temps que le devis, puis de la conserver avec le dossier du chantier.",
  },
  {
    question: 'Combien de temps conserver l’attestation TVA ?',
    answer:
      "Au moins 5 ans, à l'appui de la comptabilité, avec la copie de la facture correspondante. C'est le délai pendant lequel l'administration peut exercer son droit de reprise. Conservez-la classée par chantier ou par client : en cas de contrôle, vous devez pouvoir la présenter rapidement pour chaque facture émise à taux réduit.",
  },
  {
    question: 'Quels travaux ouvrent droit au taux réduit de TVA ?',
    answer:
      "Le taux de 10 % vise les travaux d'amélioration, de transformation, d'aménagement et d'entretien d'un logement de plus de 2 ans. Le taux de 5,5 % vise les travaux d'amélioration de la qualité énergétique (isolation, chauffage performant) et les travaux induits indissociables. Sont exclus la construction neuve, l'agrandissement important et les logements de moins de 2 ans, taxés à 20 %. Pour déterminer le taux, utilisez aussi le générateur de mention TVA.",
  },
  {
    question: 'Comment appliquer la mention pour un locataire ou une copropriété ?',
    answer:
      "La mention est signée par celui qui commande les travaux : le locataire pour son logement, le propriétaire bailleur, ou le syndic pour les parties communes d'une copropriété. C'est cette personne qui certifie l'ancienneté et l'usage d'habitation du bien. Pour des travaux en copropriété, c'est donc le syndic (ou son représentant) qui appose et signe la certification sur le devis ou la facture.",
  },
  {
    question: 'Que risque-t-on en cas d’erreur sur l’attestation ?',
    answer:
      "Le client comme l'entreprise peuvent être tenus responsables. Si les conditions du taux réduit ne sont pas réunies, l'administration réclame le complément de TVA (écart avec 20 %), assorti d'intérêts et de pénalités. Le client qui a certifié à tort est solidairement redevable. D'où l'importance de faire signer la certification avant facturation et de la conserver 5 ans avec la facture.",
  },
];
