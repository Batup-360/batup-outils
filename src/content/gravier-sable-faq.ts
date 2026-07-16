import type { FAQItem } from '@/components/FAQAccordion';

export const gravierSableFAQ: FAQItem[] = [
  {
    question: 'Combien de tonnes de gravier au m³ ?',
    answer:
      "Environ 1,5 tonne par m³ pour du gravier ou du gravillon sec. Le sable pèse un peu plus (~1,6 t/m³), un mélange à béton ~1,7 t/m³ et un tout-venant ~2,0 t/m³. Ces densités varient avec l'humidité et la granulométrie : la carrière fournit la valeur exacte.",
  },
  {
    question: 'Comment calculer le tonnage de gravier ou de sable ?',
    answer:
      "Calculez d'abord le volume : surface (m²) × épaisseur (m). Puis multipliez par la densité du matériau. Pour 20 m² sur 10 cm de gravier : 20 × 0,10 = 2 m³, puis 2 × 1,5 = 3 tonnes. Le calculateur fait la conversion et estime le nombre de big bags.",
  },
  {
    question: 'Comment convertir des m³ en tonnes ?',
    answer:
      "Tonnes = volume en m³ × densité en t/m³. C'est la densité (masse volumique) qui fait le lien : elle diffère selon le matériau. Sans densité, impossible de convertir un volume en poids. Utilisez celle indiquée par le fournisseur, ou les valeurs types du calculateur.",
  },
  {
    question: 'Quelle épaisseur de gravier prévoir ?',
    answer:
      "Pour une allée piétonne, comptez 4 à 5 cm de gravier sur une sous-couche. Pour une allée carrossable, 8 à 10 cm de gravier sur 10-15 cm de tout-venant compacté. Pour un fond de fouille ou un drainage, adaptez selon l'étude. Le calculateur convertit directement l'épaisseur en cm.",
  },
  {
    question: 'Faut-il prévoir une marge sur les granulats ?',
    answer:
      "Oui, environ 5 %. Les granulats se tassent à la mise en œuvre et au compactage, et il y a toujours des pertes à la manutention. Mieux vaut un léger surplus qu'un manque qui impose une seconde livraison, souvent facturée avec un minimum de commande.",
  },
  {
    question: 'Vrac, big bag ou sac : quel conditionnement ?',
    answer:
      "En vrac (livraison camion) dès quelques tonnes, c'est le moins cher au kilo. Le big bag (environ 1 tonne) convient aux volumes moyens et se manipule à l'engin. Les sacs de 25 ou 35 kg sont réservés aux petites quantités et aux accès difficiles, mais reviennent bien plus cher à la tonne.",
  },
  {
    question: 'Le sable humide pèse-t-il plus lourd ?',
    answer:
      "Oui. L'eau ajoute de la masse : un sable humide peut atteindre 1,8 à 1,9 t/m³ contre ~1,6 sec. Si vous commandez au poids un matériau livré humide, vous payez aussi l'eau. Le foisonnement (volume qui augmente à l'excavation) joue également : tenez-en compte pour les déblais.",
  },
  {
    question: 'Combien de sable et gravier pour faire du béton ?',
    answer:
      "Pour 1 m³ de béton dosé à 350 kg/m³, comptez environ 350 kg de ciment, 800 kg de sable et 1 000 kg de gravier (dosage indicatif 1-2-3 en volume). Pour un dosage précis du béton et le nombre de sacs de ciment, utilisez le calculateur de béton et le calculateur de mortier.",
  },
];
