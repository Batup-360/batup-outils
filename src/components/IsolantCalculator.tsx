import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { paquetsNecessaires, surfaceAvecPerte } from '@/lib/metre-quantite-math';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-isolant',
  toolLabel: 'Calculateur d\'isolant',
  source: 'calculateur-isolant',
  inputTitle: 'Votre surface à isoler',
  fields: [
    { key: 'surface', label: 'Surface à isoler', hint: 'Murs, combles ou sol', suffix: 'm²' },
    { key: 'surfaceRouleau', label: 'Surface par rouleau / paquet', hint: 'Indiquée sur l\'emballage', suffix: 'm²', default: 6 },
    { key: 'lambda', label: 'Conductivité λ de l\'isolant', hint: '0,030 (performant) à 0,040 (laine standard)', suffix: 'W/m.K', default: 0.038 },
  ],
  selects: [
    {
      key: 'perte',
      label: 'Marge de perte',
      default: 5,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 % (recommandé)', value: 5 },
        { label: '+ 10 % (nombreuses découpes)', value: 10 },
      ],
    },
    {
      key: 'paroi',
      label: 'Paroi à isoler',
      hint: 'Fixe la résistance thermique R à viser',
      default: 7,
      options: [
        { label: 'Combles perdus (R ≥ 7)', value: 7 },
        { label: 'Combles aménagés / rampants (R ≥ 6)', value: 6 },
        { label: 'Toiture-terrasse (R ≥ 4,5)', value: 4.5 },
        { label: 'Murs (R ≥ 3,7)', value: 3.7 },
        { label: 'Sol / plancher bas (R ≥ 3)', value: 3 },
      ],
    },
  ],
  stickyLabel: 'Rouleaux',
  compute: (v) => {
    const n = paquetsNecessaires(v.surface, v.surfaceRouleau, v.perte);
    const surfaceAchat = surfaceAvecPerte(v.surface, v.perte);
    // Épaisseur conseillée : e (m) = λ × R, arrondie au cm supérieur.
    const epaisseurCm = v.lambda > 0 && v.paroi > 0 ? Math.ceil(v.lambda * v.paroi * 100) : 0;
    return {
      mainLabel: 'Rouleaux nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} rouleaux` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface à acheter', value: surfaceAchat > 0 ? `${fmtNum(surfaceAchat)} m²` : '—' },
        { label: 'Résistance thermique visée', value: v.paroi > 0 ? `R ≥ ${fmtNum(v.paroi)} m²·K/W` : '—' },
        { label: 'Épaisseur conseillée', value: epaisseurCm > 0 ? `~ ${fmtInt(epaisseurCm)} cm` : '—' },
      ],
    };
  },
};

export function IsolantCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
