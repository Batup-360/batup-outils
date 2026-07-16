import type { FAQItem } from '@/components/FAQAccordion';

export const betonFAQ: FAQItem[] = [
  {
    question: 'Combien de sacs de ciment pour 1 m³ de béton ?',
    answer:
      "Pour un béton dosé à 350 kg/m³ (le dosage courant d'une dalle), il faut 350 kg de ciment par m³, soit 10 sacs de 35 kg ou 14 sacs de 25 kg. À 250 kg/m³ : environ 8 sacs de 35 kg ; à 400 kg/m³ : environ 12 sacs de 35 kg. Le calculateur ci-dessus donne le nombre de sacs arrondi au supérieur selon votre volume et votre dosage.",
  },
  {
    question: 'Quel dosage de béton pour une dalle ou une terrasse ?',
    answer:
      "350 kg de ciment par m³ : c'est le dosage de référence pour une dalle, une terrasse, une allée ou un dallage courant. Pour un béton de propreté ou une fondation peu sollicitée, 250 kg/m³ suffisent ; pour du béton armé ou un élément porteur, montez à 400 kg/m³. En dessous de 250 kg/m³ le béton manque de résistance.",
  },
  {
    question: 'Comment calculer le volume de béton d’une dalle ?',
    answer:
      "Multipliez la longueur par la largeur par l'épaisseur, en mètres. Pour une dalle de 5 m × 4 m et 12 cm d'épaisseur : 5 × 4 × 0,12 = 2,4 m³. Pensez à convertir l'épaisseur de cm en m (12 cm = 0,12 m) — le calculateur le fait pour vous : saisissez l'épaisseur en centimètres et ajoutez 10 % de marge de sécurité.",
  },
  {
    question: 'Comment calculer le volume de béton d’un poteau rond ?',
    answer:
      "Le volume d'un poteau cylindrique = π × rayon² × hauteur. Pour un poteau de 20 cm de diamètre (rayon 0,10 m) et 3 m de haut : π × 0,10² × 3 ≈ 0,094 m³, soit environ 0,10 m³ avec la marge. Multipliez par le nombre de poteaux. Le calculateur ci-dessus propose le mode « poteau rond » : saisissez le diamètre, la hauteur et le nombre.",
  },
  {
    question: 'Quelle épaisseur pour une dalle en béton ?',
    answer:
      "Comptez environ 8 à 10 cm pour une terrasse ou une allée piétonne, 12 à 15 cm pour un passage de véhicule léger (garage, accès voiture), et 15 cm et plus, avec armature, pour une charge lourde. Une dalle trop fine fissure sous la charge. Adaptez aussi selon la portance du sol et la présence d'un hérisson.",
  },
  {
    question: 'Quelle quantité de sable et de gravier pour 1 m³ de béton ?',
    answer:
      "Pour un béton dosé à 350 kg/m³, comptez environ 825 kg de sable et 1 050 kg de gravier par m³, avec 175 litres d'eau. Ces quantités varient avec le dosage : plus il y a de ciment, moins il faut de granulats. Le calculateur ajuste automatiquement le sable et le gravier selon le dosage choisi.",
  },
  {
    question: 'Combien d’eau pour gâcher 1 m³ de béton ?',
    answer:
      "Environ 175 litres d'eau pour un béton dosé à 350 kg/m³, soit un rapport eau/ciment d'environ 0,5 (la moitié du poids de ciment en litres). Incorporez d'abord ~75 % de l'eau, puis ajustez : trop d'eau affaiblit fortement le béton (chaque litre en trop réduit la résistance d'environ 5 %). Réduisez si le sable est très humide.",
  },
  {
    question: 'Quel dosage de béton pour une fondation ?',
    answer:
      "Pour une fondation ou une semelle porteuse, dosez à 350 kg/m³, et à 400 kg/m³ pour du béton armé fortement sollicité. Un béton de propreté sous la fondation se dose à 150-250 kg/m³. En cas de doute sur un ouvrage porteur, suivez l'étude béton du bureau d'études : la résistance d'une fondation ne s'improvise pas.",
  },
  {
    question: 'Vaut-il mieux faire son béton ou le commander en toupie ?',
    answer:
      "En dessous de 0,5 m³, le béton fait à la bétonnière reste rentable. Entre 0,5 et 1 m³, c'est selon le temps disponible. Au-delà de 1 m³, la livraison en toupie (béton prêt à l'emploi, environ 120 à 160 €/m³ HT) devient souvent plus économique une fois la main-d'œuvre comptée, et garantit un béton régulier et normalisé — un vrai gage de conformité pour un ouvrage porteur.",
  },
];
