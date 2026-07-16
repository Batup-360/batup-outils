import type { FAQItem } from '@/components/FAQAccordion';

export const enduitFacadeFAQ: FAQItem[] = [
  {
    question: "Quelle quantité d'enduit au m² de façade ?",
    answer:
      "Cela dépend du produit et de l'épaisseur : environ 9 kg/m² pour un gobetis d'accrochage, 15 kg/m² pour un corps d'enduit, 18 kg/m² pour un enduit monocouche appliqué en 15 mm, et 4 kg/m² pour une finition. La consommation exacte figure sur le sac : saisissez-la pour un calcul précis.",
  },
  {
    question: "Comment calculer le nombre de sacs d'enduit ?",
    answer:
      "Quantité (kg) = surface × consommation au m², majorée d'environ 10 %. On divise ensuite par le poids d'un sac (25 kg le plus souvent), arrondi au supérieur. Pour 50 m² d'enduit monocouche (18 kg/m²) : 50 × 18 = 900 kg, +10 % ≈ 990 kg, soit 40 sacs de 25 kg.",
  },
  {
    question: "Quelle est la différence entre monocouche et enduit traditionnel ?",
    answer:
      "L'enduit monocouche s'applique en une passe (parfois deux frais sur frais) et fait à la fois corps et finition : rapide, courant en neuf. L'enduit traditionnel se pose en trois couches (gobetis d'accrochage, corps de dressage, finition), plus technique mais adapté à la rénovation et aux supports anciens.",
  },
  {
    question: "Faut-il un gobetis avant l'enduit ?",
    answer:
      "Sur un support lisse ou peu absorbant (béton, ancien enduit), oui : le gobetis crée l'accroche. Sur un support très absorbant, on humidifie ou on applique un régulateur de fond. L'enduit monocouche moderne peut souvent se passer de gobetis sur maçonnerie neuve : suivez la fiche technique du produit.",
  },
  {
    question: "Quelle épaisseur d'enduit de façade appliquer ?",
    answer:
      "Un enduit monocouche se pose généralement en 12 à 20 mm (souvent 15 mm). Trop fin, il fissure et laisse voir le support ; trop épais, il coule et sèche mal. La consommation en kg/m² monte avec l'épaisseur : doublez l'épaisseur, vous doublez la quantité.",
  },
  {
    question: 'Faut-il déduire les ouvertures du calcul ?',
    answer:
      "Déduisez les grandes ouvertures (baies, portes de garage) mais conservez les petites (fenêtres) : leur surface sert de marge pour enduire les tableaux, les linteaux et les angles. En pratique, beaucoup d'applicateurs facturent la surface tendue sans déduire les petites ouvertures.",
  },
  {
    question: "Combien de temps pour que l'enduit sèche ?",
    answer:
      "Comptez environ 1 jour de séchage par millimètre d'épaisseur, soit une quinzaine de jours pour un monocouche de 15 mm avant mise en peinture éventuelle. Le séchage dépend de la météo : évitez d'enduire par gel, forte chaleur ou pluie. Protégez la façade fraîche du soleil direct et du vent.",
  },
  {
    question: "Quel est le prix d'un ravalement de façade au m² ?",
    answer:
      "Fourni-posé, un enduit de façade se situe souvent entre 30 et 60 € HT/m² selon le produit, l'état du support, la hauteur et l'échafaudage nécessaire. L'enduit lui-même ne représente qu'une part du coût : main-d'œuvre et échafaudage pèsent lourd. Utilisez le calculateur de prix de chantier pour un devis complet.",
  },
];
