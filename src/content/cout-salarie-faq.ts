import type { FAQItem } from '@/components/FAQAccordion';

export const coutSalarieFAQ: FAQItem[] = [
  {
    question: 'Combien coûte réellement un salarié dans le BTP pour l’employeur ?',
    answer:
      "Environ 1,6 à 1,65 fois le salaire brut pour un ouvrier du bâtiment. Pour 2 500 € brut, le coût total employeur avoisine 4 100 €, une fois ajoutées les charges patronales (~40 à 45 %) et la cotisation CIBTP congés payés (~20,7 %). Le BTP est plus cher que les autres secteurs à cause de cette CIBTP. Le calculateur détaille le coût à partir du brut.",
  },
  {
    question: 'Quelle est la différence entre salaire brut, net et coût employeur ?',
    answer:
      "Le brut est le salaire de référence du contrat. Le net (environ 77 à 78 % du brut) est ce que touche le salarié après cotisations salariales. Le coût employeur (ou « super-brut ») est le brut augmenté des charges patronales et de la CIBTP : c'est ce que paie réellement l'entreprise, soit environ 1,6 fois le brut dans le BTP.",
  },
  {
    question: 'Pour 1 € net versé, combien coûte le salarié à l’entreprise ?',
    answer:
      "Environ 2 € dans le BTP. Le passage du net au coût total cumule les cotisations salariales (pour remonter au brut) puis les charges patronales et la CIBTP (pour atteindre le coût employeur). Résultat : pour 1 € réellement perçu par l'ouvrier, l'entreprise débourse à peu près le double. Le calculateur affiche ce ratio directement.",
  },
  {
    question: 'Quel est le taux de charges patronales dans le bâtiment en 2026 ?',
    answer:
      "Les charges patronales représentent environ 40 à 45 % du brut selon la taille de l'entreprise, auxquelles s'ajoute la cotisation CIBTP congés payés d'environ 20,7 % propre au BTP. C'est cette CIBTP qui explique pourquoi le coût d'un salarié du bâtiment dépasse celui des autres secteurs. Les bas salaires bénéficient en plus de la réduction générale de cotisations.",
  },
  {
    question: 'Qu’est-ce que la cotisation CIBTP congés payés et qui la paie ?',
    answer:
      "Dans le BTP, les congés payés ne sont pas gérés par l'entreprise mais par une caisse externe, la CIBTP. L'employeur y cotise environ 20,7 % de la masse salariale (2026), et c'est la caisse qui verse les congés aux salariés. Cette cotisation s'ajoute aux charges patronales classiques : elle est la principale raison du surcoût du travail dans le bâtiment.",
  },
  {
    question: 'Comment calculer le coût horaire chargé d’un ouvrier BTP ?',
    answer:
      "Divisez le coût total employeur annuel par le nombre d'heures réellement productives, pas par les heures payées. Un ouvrier payé 1 607 h/an n'est productif qu'environ 1 200 à 1 400 h (déplacements, intempéries, absences). Diviser par les heures payées sous-estime le coût horaire et fait perdre de l'argent sur les devis. Utilisez le coût productif pour chiffrer.",
  },
  {
    question: 'Qu’est-ce que la réduction générale de cotisations sur les bas salaires ?',
    answer:
      "La réduction générale (ex-réduction Fillon, devenue RGDU en 2026) diminue les charges patronales sur les salaires proches du SMIC. Depuis 2026, elle s'annule à 3 SMIC (contre 1,6 SMIC auparavant), ce qui élargit le nombre de salaires concernés. Elle réduit sensiblement le coût réel d'un ouvrier payé au SMIC ou légèrement au-dessus.",
  },
  {
    question: 'Comment passer du coût d’un salarié au taux horaire à facturer ?',
    answer:
      "Le coût horaire chargé n'est pas le prix de vente : il faut y ajouter les frais généraux et une marge. En pratique, on multiplie souvent le coût horaire chargé par 1,8 à 2,5 pour obtenir le taux horaire à facturer au client. Utilisez le calculateur de taux horaire BTP pour intégrer vos charges de structure et votre marge cible.",
  },
];
