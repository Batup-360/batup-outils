import type { FAQItem } from '@/components/FAQAccordion';

export const penteToitureFAQ: FAQItem[] = [
  {
    question: 'Comment convertir une pente de toiture de % en degrés ?',
    answer:
      "L'angle en degrés est l'arctangente de la pente en %/100. Une pente de 100 % fait 45°, 50 % fait environ 26,6°, 30 % fait environ 16,7°. Ce n'est pas une conversion linéaire : doubler le pourcentage ne double pas l'angle. Le calculateur ci-dessus fait la conversion dans les deux sens instantanément.",
  },
  {
    question: 'Comment calculer la pente d’un toit ?',
    answer:
      "Divisez le dénivelé (la hauteur entre l'égout et le faîtage) par la base horizontale (la portée), puis multipliez par 100 pour obtenir le pourcentage. Par exemple, un toit qui monte de 2 m sur 5 m de base a une pente de 40 %. Entrez ces deux dimensions dans le calculateur pour obtenir aussi l'angle et la longueur du rampant.",
  },
  {
    question: 'Qu’est-ce que le rampant d’une toiture ?',
    answer:
      "Le rampant est la longueur réelle du versant, mesurée le long de la pente, de l'égout au faîtage. Il se calcule comme l'hypoténuse : √(base² + dénivelé²). C'est cette longueur, multipliée par la longueur du bâtiment, qui donne la surface de couverture à couvrir, toujours supérieure à la surface au sol.",
  },
  {
    question: 'Quelle est la pente minimale d’une toiture ?',
    answer:
      "Elle dépend du matériau de couverture et de la zone climatique. Les couvertures étanches (bac acier, membrane, zinc à joint debout) acceptent de faibles pentes ; les tuiles et les ardoises demandent des pentes plus fortes pour évacuer l'eau. Les valeurs exactes sont fixées par les DTU et modulées selon la région (vent, neige) et l'exposition. Sous la pente minimale, le risque d'infiltration devient réel.",
  },
  {
    question: 'À combien de degrés correspond une pente de 45 % ?',
    answer:
      "Une pente de 45 % correspond à environ 24,2°. Pour mémoire : 30 % ≈ 16,7°, 50 % ≈ 26,6°, 75 % ≈ 36,9°, 100 % = 45°. Le pourcentage et l'angle divergent de plus en plus à mesure que la pente augmente. Utilisez le calculateur pour obtenir la valeur exacte de votre pente.",
  },
  {
    question: 'Comment mesurer la pente d’un toit existant ?',
    answer:
      "Posez un niveau à bulle horizontal contre la pente, mesurez une longueur horizontale connue (par exemple 1 m), puis mesurez la hauteur verticale entre l'extrémité du niveau et le toit. La pente en % est cette hauteur (en cm) rapportée à 100 cm. Un niveau à pente ou une application smartphone donnent directement l'angle en degrés.",
  },
];
