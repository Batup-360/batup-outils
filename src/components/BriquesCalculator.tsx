import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { unitesParSurface } from '@/lib/metre-quantite-math';
import { buildBriquesPayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-briques',
  toolLabel: 'Calculateur de briques',
  source: 'calculateur-briques',
  inputTitle: 'Votre mur',
  fields: [
    { key: 'longueur', label: 'Longueur du mur', suffix: 'm' },
    { key: 'hauteur', label: 'Hauteur du mur', suffix: 'm' },
  ],
  selects: [
    {
      key: 'briquesParM2',
      label: 'Type de brique',
      default: 50,
      options: [
        { label: 'Brique de parement / plaquette (~65 / m²)', value: 65 },
        { label: 'Grand format WF / module (~50 / m²)', value: 50 },
        { label: 'Brique creuse 50×20 cm (~10 / m²)', value: 10 },
        { label: 'Brique pleine 22×10,5 cm (~65 / m²)', value: 65 },
      ],
    },
    {
      key: 'perte',
      label: 'Marge de perte',
      default: 5,
      options: [
        { label: 'Aucune (0 %)', value: 0 },
        { label: '+ 5 % (recommandé)', value: 5 },
        { label: '+ 10 %', value: 10 },
      ],
    },
  ],
  stickyLabel: 'Briques',
  buildEmbedPayload: (v) =>
    buildBriquesPayload({ longueur: v.longueur, hauteur: v.hauteur, unitesParM2: v.briquesParM2, perte: v.perte }),
  compute: (v) => {
    const surface = v.longueur * v.hauteur;
    const n = unitesParSurface(surface, v.briquesParM2, v.perte);
    return {
      mainLabel: 'Briques nécessaires',
      mainValue: n > 0 ? `${fmtInt(n)} briques` : '—',
      sub: v.perte > 0 ? `perte incluse : +${v.perte} %` : 'sans marge',
      rows: [{ label: 'Surface du mur', value: surface > 0 ? `${fmtNum(surface)} m²` : '—' }],
    };
  },
};

export function BriquesCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
