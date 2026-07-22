import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { unitesParSurface, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildTuilesPayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-tuiles',
  toolLabel: 'Calculateur de tuiles',
  source: 'calculateur-tuiles',
  inputTitle: 'Votre surface de toiture',
  fields: [
    { key: 'surface', label: 'Surface de toiture', hint: 'Surface réelle des pans (pas au sol)', suffix: 'm²' },
    { key: 'densiteManuelle', label: 'Tuiles au m² (si connu)', hint: 'Indiqué par le fabricant — sinon laissez vide', suffix: '/m²', default: 0 },
  ],
  selects: [
    {
      key: 'typeTuile',
      label: 'Type de tuile',
      default: 13,
      options: [
        { label: 'Tuile mécanique à emboîtement (~13/m²)', value: 13 },
        { label: 'Tuile grand moule / canal (~10/m²)', value: 10 },
        { label: 'Tuile petit moule (~22/m²)', value: 22 },
        { label: 'Tuile plate (~60/m²)', value: 60 },
      ],
    },
    {
      key: 'perte',
      label: 'Marge de perte',
      default: 10,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 %', value: 5 },
        { label: '+ 10 % (recommandé)', value: 10 },
      ],
    },
  ],
  stickyLabel: 'Tuiles',
  buildEmbedPayload: (v) =>
    buildTuilesPayload({
      surface: v.surface,
      tuilesParM2: v.densiteManuelle > 0 ? v.densiteManuelle : v.typeTuile,
      perte: v.perte,
    }),
  compute: (v) => {
    const densite = v.densiteManuelle > 0 ? v.densiteManuelle : v.typeTuile;
    const n = unitesParSurface(v.surface, densite, v.perte);
    const surfaceMarge = surfaceAvecPerte(v.surface, v.perte);
    return {
      mainLabel: 'Tuiles nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} tuiles` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface avec marge', value: surfaceMarge > 0 ? `${fmtNum(surfaceMarge)} m²` : '—' },
        { label: 'Densité retenue', value: densite > 0 ? `${fmtInt(densite)} tuiles/m²` : '—' },
      ],
    };
  },
};

export function TuilesCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
