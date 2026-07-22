import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { paquetsNecessaires, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildTerrassePayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-terrasse',
  toolLabel: 'Calculateur de terrasse',
  source: 'calculateur-terrasse',
  inputTitle: 'Votre terrasse et vos lames',
  fields: [
    { key: 'surface', label: 'Surface de la terrasse', suffix: 'm²' },
    { key: 'lameLongueur', label: 'Longueur d\'une lame', suffix: 'm', default: 4 },
    { key: 'lameLargeur', label: 'Largeur d\'une lame', suffix: 'cm', default: 14 },
  ],
  selects: [
    {
      key: 'perte',
      label: 'Marge de perte',
      default: 10,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 %', value: 5 },
        { label: '+ 10 % (recommandé)', value: 10 },
        { label: '+ 15 % (pose en diagonale)', value: 15 },
      ],
    },
  ],
  stickyLabel: 'Lames',
  buildEmbedPayload: (v) =>
    buildTerrassePayload({
      surface: v.surface,
      lameLongueurM: v.lameLongueur,
      lameLargeurCm: v.lameLargeur,
      perte: v.perte,
    }),
  compute: (v) => {
    const aireLame = v.lameLongueur * (v.lameLargeur / 100);
    const n = paquetsNecessaires(v.surface, aireLame, v.perte);
    const surfaceAchat = surfaceAvecPerte(v.surface, v.perte);
    // Structure (estimation, ossature bois) : lambourdes ~2,2 ml/m² (entraxe
    // ~45 cm), vis inox ~35/m², plots ~5/m² (min DTU 51-4 : 4/m²).
    const lambourdesMl = v.surface > 0 ? v.surface * 2.2 : 0;
    const visN = v.surface > 0 ? v.surface * 35 : 0;
    const plotsN = v.surface > 0 ? v.surface * 5 : 0;
    return {
      mainLabel: 'Lames nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} lames` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface à acheter', value: surfaceAchat > 0 ? `${fmtNum(surfaceAchat)} m²` : '—' },
        { label: 'Lambourdes (~2,2 ml/m²)', value: lambourdesMl > 0 ? `${fmtInt(lambourdesMl)} ml` : '—' },
        { label: 'Vis inox (~35/m²)', value: visN > 0 ? `${fmtInt(visN)} vis` : '—' },
        { label: 'Plots (~5/m²)', value: plotsN > 0 ? `${fmtInt(plotsN)} plots` : '—' },
      ],
    };
  },
};

export function TerrasseCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
