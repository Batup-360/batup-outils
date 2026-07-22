import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { unitesParSurface, unitesParM2DepuisCm, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildCarrelagePayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-carrelage',
  toolLabel: 'Calculateur de carrelage',
  source: 'calculateur-carrelage',
  inputTitle: 'Votre surface et vos carreaux',
  fields: [
    { key: 'surface', label: 'Surface à carreler', suffix: 'm²' },
    { key: 'carreauL', label: 'Longueur du carreau', hint: 'ex. 60', suffix: 'cm', default: 60 },
    { key: 'carreaul', label: 'Largeur du carreau', hint: 'ex. 60', suffix: 'cm', default: 60 },
  ],
  selects: [
    {
      key: 'perte',
      label: 'Marge de perte',
      hint: '5 % pose droite, 10 % en diagonale',
      default: 10,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 % (pose droite)', value: 5 },
        { label: '+ 10 % (diagonale / découpes)', value: 10 },
        { label: '+ 15 % (motif à raccorder)', value: 15 },
      ],
    },
  ],
  stickyLabel: 'Carreaux',
  buildEmbedPayload: (v) =>
    buildCarrelagePayload({ surface: v.surface, carreauL: v.carreauL, carreaul: v.carreaul, perte: v.perte }),
  compute: (v) => {
    const parM2 = unitesParM2DepuisCm(v.carreauL, v.carreaul);
    const n = unitesParSurface(v.surface, parM2, v.perte);
    const surfaceAchat = surfaceAvecPerte(v.surface, v.perte);
    // Estimations chantier : mortier-colle ~4 kg/m² (simple encollage),
    // joint ~0,3 kg/m². Sur la surface réellement posée.
    const colleKg = v.surface > 0 ? v.surface * 4 : 0;
    const jointKg = v.surface > 0 ? v.surface * 0.3 : 0;
    return {
      mainLabel: 'Carreaux nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} carreaux` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface à acheter', value: surfaceAchat > 0 ? `${fmtNum(surfaceAchat)} m²` : '—' },
        { label: 'Carreaux par m²', value: parM2 > 0 ? fmtNum(parM2) : '—' },
        { label: 'Mortier-colle (~4 kg/m²)', value: colleKg > 0 ? `${fmtInt(colleKg)} kg (${fmtInt(Math.ceil(colleKg / 25))} sacs de 25 kg)` : '—' },
        { label: 'Joint (~0,3 kg/m²)', value: jointKg > 0 ? `${fmtNum(jointKg)} kg` : '—' },
      ],
    };
  },
};

export function CarrelageCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
