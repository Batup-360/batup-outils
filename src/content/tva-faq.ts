import type { FAQItem } from '@/components/FAQAccordion';

export const tvaFAQ: FAQItem[] = [
  {
    question: 'Comment convertir un prix HT en TTC ?',
    answer:
      "Multipliez le montant HT par (1 + taux/100). À 20 %, TTC = HT × 1,20 ; à 10 %, × 1,10 ; à 5,5 %, × 1,055. Exemple : 1 000 € HT à 20 % donne 1 200 € TTC (200 € de TVA). C'est la conversion la plus fréquente pour établir un devis à partir de vos prix hors taxes. Le calculateur fait aussi l'inverse (TTC → HT).",
  },
  {
    question: 'Comment enlever la TVA d’un montant TTC ?',
    answer:
      "On divise le montant TTC par 1 + le taux, on ne soustrait pas le taux. À 20 %, HT = TTC ÷ 1,20. Erreur classique : retirer 20 % du TTC. Sur 120 € TTC, soustraire 20 % donne 96 € (faux) ; le vrai HT est 120 ÷ 1,20 = 100 €. Sur 10 000 €, l'écart atteint 1 666 €. Le calculateur le fait correctement.",
  },
  {
    question: 'Comment calculer le HT à partir du TTC ?',
    answer:
      "Divisez le TTC par 1 + le taux de TVA : à 20 %, HT = TTC ÷ 1,20 ; à 10 %, ÷ 1,10 ; à 5,5 %, ÷ 1,055. Exemple : 1 200 € TTC à 20 % = 1 000 € HT et 200 € de TVA. C'est le calcul à utiliser quand vous partez d'un prix affiché toutes taxes comprises, ou pour vérifier une facture fournisseur.",
  },
  {
    question: 'Comment calculer la TVA à 20 % sur un montant HT ?',
    answer:
      "La TVA = HT × taux. À 20 %, TVA = HT × 0,20, et le TTC = HT × 1,20. Pour 1 000 € HT : 200 € de TVA et 1 200 € TTC. À 10 %, TTC = HT × 1,10 ; à 5,5 %, HT × 1,055. Le calculateur affiche les trois montants (HT, TVA, TTC) en même temps dans les deux sens.",
  },
  {
    question: 'Quels sont les taux de TVA en France ?',
    answer:
      "Quatre taux : 20 % (taux normal, par défaut), 10 % (taux intermédiaire : rénovation d'un logement de plus de 2 ans, restauration, transport), 5,5 % (taux réduit : rénovation énergétique, alimentation, livres) et 2,1 % (super-réduit : médicaments remboursables, presse). Un taux de 8,5 % existe dans les DOM. Les anciens taux de 19,6 % et 7 % ne servent qu'à vérifier de vieilles factures.",
  },
  {
    question: 'Quel taux de TVA pour des travaux de rénovation ?',
    answer:
      "10 % pour les travaux d'amélioration, de transformation et d'entretien d'un logement achevé depuis plus de 2 ans. 5,5 % pour la rénovation énergétique (isolation, chauffage performant). 20 % pour le neuf, les logements de moins de 2 ans et les locaux professionnels. Depuis mars 2025, l'attestation TVA papier n'est plus exigée : une mention certifiant les conditions sur le devis ou la facture suffit.",
  },
  {
    question: 'Quelle différence entre la TVA à 10 % et à 5,5 % ?',
    answer:
      "Le 10 % couvre les travaux courants d'amélioration, d'aménagement et d'entretien d'un logement de plus de 2 ans. Le 5,5 % est réservé aux travaux d'amélioration de la performance énergétique (isolation thermique, équipements de chauffage performants) et aux travaux induits indissociables. Le 5,5 % est donc plus restrictif : il ne s'applique qu'aux travaux énergétiques éligibles.",
  },
  {
    question: 'La TVA se calcule-t-elle sur le HT ou le TTC ?',
    answer:
      "Toujours sur le montant HT : TVA = HT × taux, puis TTC = HT + TVA. Pour retrouver la TVA contenue dans un prix déjà TTC, il faut d'abord recalculer le HT (TTC ÷ 1 + taux), puis faire la différence. Appliquer le taux directement sur un TTC donne un résultat faux.",
  },
  {
    question: 'Comment fonctionne l’autoliquidation de TVA dans le BTP ?',
    answer:
      "En sous-traitance de travaux BTP, le sous-traitant facture en HT sans TVA : c'est l'entreprise principale (le donneur d'ordre) qui déclare et paie la TVA sur sa déclaration CA3, au bon taux. La facture du sous-traitant porte la mention « Autoliquidation ». Oublier de la déclarer expose le donneur d'ordre à une amende de 5 %. Pour ce cas, utilisez le calculateur de TVA autoliquidation.",
  },
];
