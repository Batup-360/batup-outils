import type { FAQItem } from '@/components/FAQAccordion';

export const carrelageFAQ: FAQItem[] = [
  {
    question: 'Comment calculer le nombre de carreaux ?',
    answer:
      "Déduisez d'abord le nombre de carreaux au m² à partir de la taille du carreau (1 ÷ surface d'un carreau en m²), puis multipliez par la surface à carreler et ajoutez la marge de perte. Pour des carreaux de 30×30 cm (11,1 par m²) sur 15 m² : 15 × 11,1 ≈ 167 carreaux, soit environ 184 avec 10 % de perte.",
  },
  {
    question: 'Quelle marge de perte pour du carrelage ?',
    answer:
      "5 % pour une pose droite simple, 10 % pour une pose en diagonale ou une pièce très découpée, et jusqu'à 15 % pour un calepinage à motif ou de grands formats plus fragiles à la coupe. Cette marge couvre les coupes, les chutes et la casse. Mieux vaut un carton de trop qu'un manque en fin de pose.",
  },
  {
    question: 'Combien de carreaux de 60x60 au m² ?',
    answer:
      "Un carreau de 60×60 cm couvre 0,36 m², il en faut donc environ 2,78 par m². Pour 10 m², cela représente à peu près 28 carreaux avant marge. Le calculateur applique automatiquement ce ratio dès que vous saisissez les dimensions du carreau.",
  },
  {
    question: 'Faut-il acheter le carrelage dans le même lot ?',
    answer:
      "Oui. Les carreaux d'un même bain (ou lot de cuisson) partagent une teinte et un calibre homogènes. D'un lot à l'autre, de légères différences de nuance ou de dimension sont possibles et deviennent visibles au sol. Achetez la totalité, marge comprise, en une seule fois et vérifiez le numéro de bain sur les cartons.",
  },
  {
    question: 'Comment calculer la colle et les joints ?',
    answer:
      "La consommation de colle dépend du format et du type de pose : de l'ordre de 3 à 5 kg/m² au simple encollage, davantage en double encollage pour les grands formats. Le joint dépend de la largeur et de l'épaisseur. Utilisez le calculateur de consommation de matériaux en indiquant la consommation au m² du produit choisi.",
  },
];
