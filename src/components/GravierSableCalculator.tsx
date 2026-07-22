import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildGravierSablePayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-gravier-sable',
  toolLabel: 'Calculateur de gravier et sable',
  source: 'calculateur-gravier-sable',
  inputTitle: 'Votre surface à couvrir',
  fields: [
    { key: 'surface', label: 'Surface à couvrir', hint: 'Allée, terrasse, fond de fouille…', suffix: 'm²' },
    { key: 'epaisseur', label: 'Épaisseur', hint: 'Hauteur de matériau à mettre en place', suffix: 'cm', default: 10 },
    { key: 'densiteManuelle', label: 'Densité (si connue)', hint: 'Fournie par la carrière — sinon laissez vide', suffix: 't/m³', default: 0 },
  ],
  selects: [
    {
      key: 'materiau',
      label: 'Matériau',
      default: 1.5,
      options: [
        { label: 'Gravier / gravillon (~1,5 t/m³)', value: 1.5 },
        { label: 'Sable (~1,6 t/m³)', value: 1.6 },
        { label: 'Mélange à béton (~1,7 t/m³)', value: 1.7 },
        { label: 'Tout-venant / grave (~2,0 t/m³)', value: 2 },
      ],
    },
    {
      key: 'perte',
      label: 'Marge (tassement, pertes)',
      default: 5,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 % (recommandé)', value: 5 },
        { label: '+ 10 %', value: 10 },
      ],
    },
  ],
  stickyLabel: 'Tonnage',
  buildEmbedPayload: (v) =>
    buildGravierSablePayload({
      surface: v.surface,
      epaisseurCm: v.epaisseur,
      densiteTParM3: v.densiteManuelle > 0 ? v.densiteManuelle : v.materiau,
      perte: v.perte,
    }),
  compute: (v) => {
    const densite = v.densiteManuelle > 0 ? v.densiteManuelle : v.materiau;
    const volume = v.surface > 0 && v.epaisseur > 0 ? v.surface * (v.epaisseur / 100) : 0;
    const volumeMarge = surfaceAvecPerte(volume, v.perte);
    const tonnes = volumeMarge * densite;
    const bigBags = tonnes > 0 ? Math.ceil(tonnes) : 0; // ~1 t par big bag
    return {
      mainLabel: 'Tonnage nécessaire',
      mainValue: tonnes > 0 ? `${fmtNum(tonnes)} t` : '—',
      sub: v.perte > 0 ? `marge incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Volume', value: volumeMarge > 0 ? `${fmtNum(volumeMarge)} m³` : '—' },
        { label: 'Big bags (~1 t)', value: bigBags > 0 ? `${fmtInt(bigBags)} sacs` : '—' },
      ],
    };
  },
};

export function GravierSableCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
