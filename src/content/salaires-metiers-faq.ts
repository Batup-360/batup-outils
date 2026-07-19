import type { FAQItem } from '@/components/FAQAccordion';

export const salairesMetiersFAQ: FAQItem[] = [
  {
    question: 'Les salaires affichés sont-ils en net ou en brut ?',
    answer:
      "Le salaire de début de carrière affiché est un net mensuel, issu d'une source datée. Le brut est estimé à partir du net (charges salariales d'environ 22 % pour un ouvrier non-cadre, soit brut ≈ net ÷ 0,78). Le brut est la référence pour comparer au minimum conventionnel, qui est toujours exprimé en brut.",
  },
  {
    question: 'Quelle différence entre salaire de marché et minimum conventionnel ?',
    answer:
      "Le minimum conventionnel est le plancher légal fixé par la convention collective selon le coefficient du poste : personne ne peut être payé en dessous. Le salaire de marché est ce que les entreprises paient réellement pour attirer et garder les profils : il est souvent supérieur au minimum, surtout sur les métiers en tension.",
  },
  {
    question: 'Comment évolue le salaire avec l’expérience dans le BTP ?',
    answer:
      "Un débutant démarre près du minimum conventionnel. Après 5 à 10 ans, un ouvrier confirmé gagne sensiblement plus (souvent +20 à +40 %), et l'accès à un poste de chef d'équipe, de chef de chantier ou de conducteur de travaux marque un nouveau palier. Les habilitations (CACES, soudure, électricité) accélèrent la progression.",
  },
  {
    question: 'Les primes du BTP sont-elles comprises dans ces salaires ?',
    answer:
      "Non. Les salaires affichés sont le salaire de base. Dans le bâtiment s'ajoutent des indemnités spécifiques : paniers repas, trajets, grands déplacements, et les heures supplémentaires majorées. Elles peuvent représenter plusieurs centaines d'euros par mois et gonfler nettement le net réellement perçu.",
  },
  {
    question: 'Quel métier du BTP paie le mieux ?',
    answer:
      "Côté ouvriers, les métiers en tension et à habilitation (grutier, soudeur, couvreur) sont parmi les mieux payés. L'encadrement (chef de chantier, conducteur puis directeur de travaux) et les fonctions études (économiste de la construction, ingénieur) atteignent les rémunérations les plus élevées de la filière.",
  },
  {
    question: 'Le salaire dépend-il de la région ?',
    answer:
      "Oui. Les minima conventionnels des ouvriers et des ETAM sont négociés région par région, et le marché varie fortement selon la tension locale (l'Île-de-France, PACA et Auvergne-Rhône-Alpes affichent des niveaux élevés). Le salaire de marché d'un même métier peut différer de plusieurs centaines d'euros d'une région à l'autre.",
  },
];
