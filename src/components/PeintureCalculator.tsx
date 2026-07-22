import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { peintureLitres, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildPeinturePayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-peinture',
  toolLabel: 'Calculateur de peinture',
  source: 'calculateur-peinture',
  inputTitle: 'Votre surface à peindre',
  fields: [
    { key: 'surface', label: 'Surface à peindre', hint: 'Murs et/ou plafond', suffix: 'm²' },
    { key: 'couches', label: 'Nombre de couches', suffix: 'couches', default: 2 },
    { key: 'rendement', label: 'Rendement de la peinture', hint: 'm² par litre (voir le pot)', suffix: 'm²/L', default: 10 },
  ],
  selects: [
    {
      key: 'perte',
      label: 'Marge',
      default: 5,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 % (recommandé)', value: 5 },
        { label: '+ 10 %', value: 10 },
      ],
    },
  ],
  stickyLabel: 'Peinture',
  buildEmbedPayload: (v) =>
    buildPeinturePayload({ surface: v.surface, couches: v.couches, rendement: v.rendement, perte: v.perte }),
  compute: (v) => {
    const litres = peintureLitres(v.surface, v.couches, v.rendement, v.perte);
    const surfaceTotale = surfaceAvecPerte(v.surface, v.perte) * (v.couches > 0 ? v.couches : 1);
    const pots = litres > 0 ? Math.ceil(litres / 2.5) : 0;
    return {
      mainLabel: 'Peinture nécessaire',
      mainValue: litres > 0 ? `${fmtNum(litres)} L` : '—',
      sub: v.couches > 0 ? `pour ${v.couches} couche${v.couches > 1 ? 's' : ''}` : undefined,
      rows: [
        { label: 'Surface totale peinte', value: surfaceTotale > 0 ? `${fmtNum(surfaceTotale)} m²` : '—' },
        { label: 'Pots de 2,5 L', value: pots > 0 ? `${fmtInt(pots)} pots` : '—' },
      ],
    };
  },
};

export function PeintureCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
