import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { paquetsNecessaires, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildParquetPayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-parquet',
  toolLabel: 'Calculateur de parquet',
  source: 'calculateur-parquet',
  inputTitle: 'Votre surface et vos paquets',
  fields: [
    { key: 'surface', label: 'Surface à couvrir', suffix: 'm²' },
    { key: 'surfacePaquet', label: 'Surface par paquet', hint: 'Indiquée sur l\'emballage', suffix: 'm²', default: 2 },
  ],
  selects: [
    {
      key: 'perte',
      label: 'Marge de perte',
      hint: '8 à 10 % selon la pose',
      default: 10,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 %', value: 5 },
        { label: '+ 10 % (recommandé)', value: 10 },
        { label: '+ 15 % (pose diagonale)', value: 15 },
      ],
    },
  ],
  stickyLabel: 'Paquets',
  buildEmbedPayload: (v) =>
    buildParquetPayload({ surface: v.surface, surfacePaquet: v.surfacePaquet, perte: v.perte }),
  compute: (v) => {
    const n = paquetsNecessaires(v.surface, v.surfacePaquet, v.perte);
    const surfaceAchat = surfaceAvecPerte(v.surface, v.perte);
    return {
      mainLabel: 'Paquets nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} paquets` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface à acheter', value: surfaceAchat > 0 ? `${fmtNum(surfaceAchat)} m²` : '—' },
        { label: 'Sous-couche (obligatoire)', value: v.surface > 0 ? `${fmtNum(v.surface)} m²` : '—' },
      ],
    };
  },
};

export function ParquetCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
