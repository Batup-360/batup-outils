import type { FAQItem } from '@/components/FAQAccordion';

export const mortierFAQ: FAQItem[] = [
  {
    question: 'Quel dosage de mortier pour monter des parpaings ?',
    answer:
      "Un mortier de montage se dose autour de 350 kg de ciment par m³, soit environ un volume de ciment pour trois à quatre volumes de sable. Pour du parpaing courant, comptez à peu près 25 à 30 kg de mortier par m² de mur en pose classique. Le calculateur vous donne le ciment, le sable et l'eau à partir de la surface et de l'épaisseur de joint.",
  },
  {
    question: 'Quelle différence entre mortier et béton ?',
    answer:
      "Le mortier associe ciment, sable et eau, sans gravier. Le béton ajoute du gravier, ce qui lui donne sa résistance structurelle. Le mortier sert à lier (montage), enduire ou sceller ; le béton sert à couler des ouvrages porteurs (dalles, semelles, poteaux). Pour un ouvrage en béton, utilisez le calculateur de béton dédié.",
  },
  {
    question: 'Combien de sacs de ciment pour 1 m³ de mortier ?',
    answer:
      "À 350 kg/m³, il faut 350 kg de ciment par m³ de mortier, soit 10 sacs de 35 kg ou 14 sacs de 25 kg. À 300 kg/m³ (montage non porteur), comptez environ 9 sacs de 35 kg ; à 400 kg/m³ (enduit riche ou scellement), environ 12 sacs de 35 kg. Le calculateur arrondit le nombre de sacs au supérieur.",
  },
  {
    question: 'Quelle quantité de sable pour faire du mortier ?',
    answer:
      "Comptez environ 1 450 kg de sable par m³ de mortier fini, soit à peu près trois à quatre volumes de sable pour un volume de ciment. Le sable doit être propre et de granulométrie adaptée (sable à maçonner 0/4). Un sable trop fin ou argileux fragilise le mortier.",
  },
  {
    question: 'Comment doser l’eau du mortier ?',
    answer:
      "Visez un rapport eau/ciment d'environ 0,5, soit à peu près la moitié du poids de ciment en litres d'eau. Un mortier bien dosé est plastique et tient sur la truelle sans couler. Trop d'eau réduit fortement la résistance et provoque des fissures de retrait. Incorporez l'eau progressivement.",
  },
  {
    question: 'Combien de temps peut-on utiliser un mortier après gâchage ?',
    answer:
      "Un mortier au ciment doit être mis en œuvre dans les 1 à 2 heures qui suivent le gâchage, avant le début de prise. Ne rebattez jamais un mortier qui a commencé à durcir en rajoutant de l'eau : cela le fragilise durablement. Gâchez des quantités adaptées au rythme de pose.",
  },
];
