import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { unitesParSurface } from '@/lib/metre-quantite-math';

const PERTE = {
  key: 'perte',
  label: 'Marge de perte',
  default: 5,
  options: [
    { label: 'Aucune (0 %)', value: 0 },
    { label: '+ 5 % (recommandé)', value: 5 },
    { label: '+ 10 %', value: 10 },
  ],
};

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-parpaings',
  toolLabel: 'Calculateur de parpaings',
  source: 'calculateur-parpaings',
  inputTitle: 'Votre mur',
  fields: [
    { key: 'longueur', label: 'Longueur du mur', suffix: 'm' },
    { key: 'hauteur', label: 'Hauteur du mur', suffix: 'm' },
  ],
  selects: [
    {
      key: 'blocsParM2',
      label: 'Type de bloc',
      default: 10,
      options: [
        { label: 'Standard 20×50 cm (10 / m²)', value: 10 },
        { label: 'Hauteur 25×50 cm (8 / m²)', value: 8 },
        { label: 'Bloc 20×40 cm (12,5 / m²)', value: 12.5 },
      ],
    },
    PERTE,
  ],
  stickyLabel: 'Parpaings',
  compute: (v) => {
    const surface = v.longueur * v.hauteur;
    const n = unitesParSurface(surface, v.blocsParM2, v.perte);
    // Mortier de montage : ~30 kg/m² de mur (joints ~1,5 cm).
    const mortierKg = surface > 0 ? surface * 30 : 0;
    return {
      mainLabel: 'Parpaings nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} blocs` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [
        { label: 'Surface du mur', value: surface > 0 ? `${fmtNum(surface)} m²` : '—' },
        { label: 'Mortier de montage (~30 kg/m²)', value: mortierKg > 0 ? `${fmtInt(mortierKg)} kg (${fmtInt(Math.ceil(mortierKg / 35))} sacs de 35 kg)` : '—' },
      ],
    };
  },
};

export function ParpaingsCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
