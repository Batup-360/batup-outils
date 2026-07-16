import type { FAQItem } from '@/components/FAQAccordion';

export const tuilesFAQ: FAQItem[] = [
  {
    question: 'Combien de tuiles au m² ?',
    answer:
      "Cela dépend du modèle. Une tuile mécanique à emboîtement demande environ 13 tuiles/m², une grande tuile (canal, grand moule) une dizaine, une tuile petit moule environ 22/m², et une tuile plate de 50 à 70/m². La densité exacte figure sur la fiche du fabricant : saisissez-la pour un calcul précis.",
  },
  {
    question: 'Comment calculer le nombre de tuiles d’une toiture ?',
    answer:
      "Multipliez la surface réelle des pans par le nombre de tuiles au m² du modèle, puis ajoutez environ 10 % de marge. Pour 80 m² de toiture en tuiles mécaniques (13/m²) : 80 × 13 = 1 040 tuiles, soit environ 1 145 avec la marge.",
  },
  {
    question: 'Faut-il prendre la surface au sol ou la surface réelle ?',
    answer:
      "La surface réelle des pans, pas l'emprise au sol. Un toit en pente couvre plus que sa projection au sol : plus la pente est forte, plus l'écart est grand. Mesurez la longueur du rampant (de l'égout au faîtage) multipliée par la largeur, pour chaque pan.",
  },
  {
    question: 'Quelle marge de perte pour la couverture ?',
    answer:
      "Comptez environ 10 %. Cette marge couvre les coupes de rives, les découpes en noue et sur les pénétrations (cheminée, fenêtres de toit), ainsi que la casse à la pose et au transport. Sur une toiture complexe avec beaucoup de noues, montez jusqu'à 12-15 %.",
  },
  {
    question: 'Comment calculer les tuiles de faîtage et de rive ?',
    answer:
      "Elles se comptent au mètre linéaire, pas au m². Mesurez la longueur du faîtage et des arêtiers pour les faîtières (environ 2,5 à 3 par mètre), et la longueur des rives pour les tuiles de rive. Ces accessoires s'ajoutent au nombre de tuiles de champ donné par le calculateur.",
  },
  {
    question: 'Combien de liteaux pour poser les tuiles ?',
    answer:
      "Le nombre de rangs de liteaux dépend du pureau de la tuile (partie visible), généralement entre 30 et 45 cm. Longueur de liteaux ≈ surface ÷ pureau. Pour un pureau de 0,35 m, comptez environ 2,85 ml de liteaux par m² de toiture, plus les chevrons et l'écran sous-toiture.",
  },
  {
    question: 'La pente de toit change-t-elle le nombre de tuiles ?',
    answer:
      "Elle ne change pas la densité au m² (nombre de tuiles par m² de pan), mais elle augmente la surface réelle à couvrir par rapport à l'emprise au sol. Une pente plus forte = plus de surface de couverture = plus de tuiles. Utilisez le calculateur de pente de toiture pour obtenir la surface réelle des pans.",
  },
  {
    question: 'Quel type de tuile choisir ?',
    answer:
      "La tuile mécanique à emboîtement est la plus courante (rapide à poser, économique). La tuile canal convient aux régions du sud et aux faibles pentes. La tuile plate, plus dense et plus chère, s'impose sur le bâti ancien et en secteur protégé (ABF). Vérifiez le règlement d'urbanisme local avant de choisir.",
  },
];
