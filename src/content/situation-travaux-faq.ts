import type { FAQItem } from '@/components/FAQAccordion';

export const situationTravauxFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le montant d’une situation de travaux ?',
    answer:
      "Montant à facturer = montant du marché × avancement cumulé, moins les situations déjà facturées, moins la retenue de garantie. Exemple : un marché de 10 000 € à 60 % d'avancement, alors qu'on avait facturé 30 %, donne 10 000 × (60 % − 30 %) = 3 000 € HT ce mois. Le calculateur applique cette formule et déduit la retenue automatiquement.",
  },
  {
    question: 'Quelle différence entre une situation de travaux et un acompte ?',
    answer:
      "L'acompte est un pourcentage fixe demandé avant ou en début de chantier, indépendant de l'avancement réel. La situation de travaux facture l'avancement réellement réalisé sur la période. La retenue de garantie s'applique aux situations, pas aux acomptes. Confondre les deux fausse la trésorerie et le suivi du marché.",
  },
  {
    question: 'Comment calculer l’avancement d’un chantier en pourcentage ?',
    answer:
      "L'avancement est le rapport entre les travaux réalisés et le total du marché, poste par poste. Pour un lot de 20 000 € dont 12 000 € sont exécutés, l'avancement est de 60 %. On additionne les avancements pondérés de chaque lot (DPGF) pour obtenir l'avancement global. On facture ensuite la différence avec l'avancement de la situation précédente.",
  },
  {
    question: 'Comment déduire les situations déjà facturées ?',
    answer:
      "On raisonne en cumulé : on calcule le montant total dû au titre de l'avancement atteint, puis on retranche la somme de toutes les situations précédentes. C'est l'erreur la plus fréquente — oublier de déduire le déjà-facturé conduit à facturer deux fois. Le calculateur travaille en cumulé et n'affiche que le net à facturer pour la période.",
  },
  {
    question: 'Faut-il appliquer la TVA sur une situation de travaux ?',
    answer:
      "Oui, au taux applicable aux travaux (20 %, 10 % pour un logement de plus de 2 ans, 5,5 % en rénovation énergétique). En sous-traitance BTP, la situation est facturée en HT avec la mention « Autoliquidation » : c'est le donneur d'ordre qui déclare la TVA. La retenue de garantie de 5 % se calcule, elle, sur le montant TTC de chaque situation.",
  },
  {
    question: 'Comment s’applique la retenue de garantie sur une situation ?',
    answer:
      "La retenue de garantie, plafonnée à 5 % (art. 1799-1 du Code civil en marché privé), est prélevée sur chaque situation et libérée un an après la réception, sauf réserves. Elle peut être remplacée par une caution bancaire, ce qui permet d'encaisser 100 % de chaque situation. Le calculateur déduit la retenue du net à facturer.",
  },
  {
    question: 'Quel est le délai de paiement d’une situation de travaux ?',
    answer:
      "En marché privé entre professionnels, le délai est de 30 jours par défaut, plafonné contractuellement à 60 jours nets ou 45 jours fin de mois. Tout retard déclenche des pénalités et une indemnité forfaitaire de 40 € par facture. En marché public, l'acompte mensuel est mandaté sous un délai encadré par le CCAG-Travaux, avec un délai global de paiement de 30 jours.",
  },
  {
    question: 'Comment appliquer une révision de prix sur une situation ?',
    answer:
      "Si le marché prévoit une clause de révision, on actualise le montant avec l'index BT01 (INSEE), publié avec environ 3 mois de décalage : P = P₀ × BT01(m−3) / BT01(m₀). On applique d'abord un index provisoire, régularisé quand l'index définitif paraît. Utilisez le calculateur de révision de prix Index BT pour ce coefficient avant de l'intégrer à la situation.",
  },
];
