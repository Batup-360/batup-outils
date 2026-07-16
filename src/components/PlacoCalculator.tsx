import { QuantiteCalculator, fmtInt, type QuantiteConfig } from './QuantiteCalculator';
import { paquetsNecessaires } from '@/lib/metre-quantite-math';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-placo',
  toolLabel: 'Calculateur de plaques de placo',
  source: 'calculateur-placo',
  inputTitle: 'Votre surface à couvrir',
  fields: [{ key: 'surface', label: 'Surface (murs et/ou plafond)', hint: 'Total à recouvrir', suffix: 'm²' }],
  selects: [
    {
      key: 'surfacePlaque',
      label: 'Format de plaque',
      default: 3,
      options: [
        { label: 'BA13 — 2,50 × 1,20 m (3 m²)', value: 3 },
        { label: 'BA13 — 2,60 × 1,20 m (3,12 m²)', value: 3.12 },
        { label: 'BA13 — 3,00 × 1,20 m (3,6 m²)', value: 3.6 },
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
  stickyLabel: 'Plaques',
  compute: (v) => {
    const n = paquetsNecessaires(v.surface, v.surfacePlaque, v.perte);
    // Finitions : bande à joint ~1,4 m/m², enduit à joint ~1,2 kg/m².
    const bandeM = v.surface > 0 ? v.surface * 1.4 : 0;
    const enduitKg = v.surface > 0 ? v.surface * 1.2 : 0;
    return {
      mainLabel: 'Plaques nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} plaques` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Vis (≈ 25 / plaque)', value: n > 0 ? `${fmtInt(n * 25)} vis` : '—' },
        { label: 'Bande à joint (~1,4 m/m²)', value: bandeM > 0 ? `${fmtInt(bandeM)} m` : '—' },
        { label: 'Enduit à joint (~1,2 kg/m²)', value: enduitKg > 0 ? `${fmtInt(enduitKg)} kg` : '—' },
      ],
    };
  },
};

export function PlacoCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
