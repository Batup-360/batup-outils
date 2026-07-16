import { QuantiteCalculator, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { quantiteParSurface, surfaceAvecPerte } from '@/lib/metre-quantite-math';

const UNITES = ['kg', 'L', 'sacs'];

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-consommation-materiaux',
  toolLabel: 'Calculateur de consommation de matériaux',
  source: 'calculateur-consommation-materiaux',
  inputTitle: 'Votre chantier',
  fields: [
    { key: 'surface', label: 'Surface ou quantité de base', suffix: 'm²' },
    { key: 'taux', label: 'Consommation au m²', hint: 'Ex. colle 3 kg/m², primaire 0,2 L/m²', suffix: '/m²' },
  ],
  selects: [
    {
      key: 'unite',
      label: 'Unité',
      default: 0,
      options: [
        { label: 'Kilogrammes (kg)', value: 0 },
        { label: 'Litres (L)', value: 1 },
        { label: 'Sacs', value: 2 },
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
  stickyLabel: 'Quantité',
  compute: (v) => {
    const unite = UNITES[v.unite] ?? 'kg';
    const total = quantiteParSurface(v.surface, v.taux, v.perte);
    const surfaceAchat = surfaceAvecPerte(v.surface, v.perte);
    return {
      mainLabel: 'Quantité totale',
      mainValue: total > 0 ? `${fmtNum(total)} ${unite}` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Base + perte', value: surfaceAchat > 0 ? `${fmtNum(surfaceAchat)} m²` : '—' },
        { label: 'Consommation', value: v.taux > 0 ? `${fmtNum(v.taux)} ${unite}/m²` : '—' },
      ],
    };
  },
};

export function ConsommationCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
