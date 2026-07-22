import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
import { quantiteParSurface, surfaceAvecPerte } from '@/lib/metre-quantite-math';
import { buildEnduitFacadePayload } from '@/lib/embed-payloads';

const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-enduit-facade',
  toolLabel: "Calculateur d'enduit de façade",
  source: 'calculateur-enduit-facade',
  inputTitle: 'Votre surface de façade',
  fields: [
    { key: 'surface', label: 'Surface à enduire', hint: 'Façade hors ouvertures', suffix: 'm²' },
    { key: 'consoManuelle', label: 'Consommation (si connue)', hint: 'kg/m² indiqué sur le sac — sinon laissez vide', suffix: 'kg/m²', default: 0 },
  ],
  selects: [
    {
      key: 'typeEnduit',
      label: "Type d'enduit",
      default: 18,
      options: [
        { label: 'Enduit monocouche (~18 kg/m²)', value: 18 },
        { label: "Corps d'enduit (~15 kg/m²)", value: 15 },
        { label: 'Gobetis / accrochage (~9 kg/m²)', value: 9 },
        { label: 'Enduit de finition (~4 kg/m²)', value: 4 },
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
  stickyLabel: 'Sacs',
  buildEmbedPayload: (v) =>
    buildEnduitFacadePayload({
      surface: v.surface,
      consoKgParM2: v.consoManuelle > 0 ? v.consoManuelle : v.typeEnduit,
      perte: v.perte,
    }),
  compute: (v) => {
    const conso = v.consoManuelle > 0 ? v.consoManuelle : v.typeEnduit;
    const kg = quantiteParSurface(v.surface, conso, v.perte);
    const sacs = kg > 0 ? Math.ceil(kg / 25) : 0;
    const surfaceMarge = surfaceAvecPerte(v.surface, v.perte);
    return {
      mainLabel: 'Sacs de 25 kg',
      mainValue: sacs > 0 ? `${fmtInt(sacs)} sacs` : '—',
      sub: kg > 0 ? `soit ~${fmtInt(kg)} kg d'enduit` : 'sacs de 25 kg',
      rows: [
        { label: 'Enduit total', value: kg > 0 ? `${fmtInt(kg)} kg` : '—' },
        { label: 'Surface avec marge', value: surfaceMarge > 0 ? `${fmtNum(surfaceMarge)} m²` : '—' },
        { label: 'Consommation retenue', value: conso > 0 ? `${fmtInt(conso)} kg/m²` : '—' },
      ],
    };
  },
};

export function EnduitFacadeCalculator() {
  return <QuantiteCalculator config={CONFIG} />;
}
