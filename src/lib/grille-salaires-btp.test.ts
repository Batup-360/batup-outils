import { describe, it, expect } from 'vitest';
import { GRILLES, minimumApplicable, SMIC_MENSUEL_35H } from './grille-salaires-btp';

const ouvriers = GRILLES.find((g) => g.categorie === 'ouvriers')!;
const cadres = GRILLES.find((g) => g.categorie === 'cadres')!;

describe('grille-salaires-btp', () => {
  it('a bien les 3 grilles du MVP', () => {
    expect(GRILLES.map((g) => g.categorie).sort()).toEqual(['cadres', 'etam', 'ouvriers']);
  });

  it('applique le plancher SMIC sous le minimum conventionnel (base 35 h)', () => {
    const n1p1 = ouvriers.lignes[0]; // coeff 150, 1843 € < SMIC
    const res = minimumApplicable(ouvriers, n1p1);
    expect(res.smicApplique).toBe(true);
    expect(res.montant).toBe(SMIC_MENSUEL_35H);
  });

  it('garde la valeur conventionnelle quand elle dépasse le SMIC', () => {
    const n3p1 = ouvriers.lignes.find((l) => l.coefficient === 210)!; // 2038 €
    const res = minimumApplicable(ouvriers, n3p1);
    expect(res.smicApplique).toBe(false);
    expect(res.montant).toBe(2038);
  });

  it("n'applique pas le plancher SMIC 35 h aux cadres (base 169 h)", () => {
    const res = minimumApplicable(cadres, cadres.lignes[0]); // 2356 €
    expect(res.smicApplique).toBe(false);
    expect(res.montant).toBe(2356);
  });
});
