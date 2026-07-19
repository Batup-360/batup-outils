import { describe, it, expect } from 'vitest';
import {
  CADRES_NATIONAL,
  getRegion,
  categorieGrille,
  minimumApplicable,
  SMIC_MENSUEL_35H,
} from './grille-salaires-btp';

const idf = getRegion('ile-de-france');

describe('grille-salaires-btp', () => {
  it('contient au moins l’Île-de-France avec ouvriers + ETAM', () => {
    expect(idf.key).toBe('ile-de-france');
    expect(idf.ouvriers).toBeDefined();
    expect(idf.etam).toBeDefined();
  });

  it('résout la grille par catégorie (cadres = nationale)', () => {
    expect(categorieGrille(idf, 'cadres')).toBe(CADRES_NATIONAL);
    expect(categorieGrille(idf, 'ouvriers')).toBe(idf.ouvriers);
  });

  it('renvoie une grille absente comme undefined (région sans donnée)', () => {
    const ara = getRegion('auvergne-rhone-alpes');
    expect(categorieGrille(ara, 'ouvriers')).toBeUndefined(); // pas encore transcrit
    expect(categorieGrille(ara, 'etam')).toBeDefined();
  });

  it('applique le plancher SMIC sous le minimum conventionnel (base 35 h)', () => {
    const n1p1 = idf.ouvriers!.lignes[0]; // coeff 150, 1843 € < SMIC
    const res = minimumApplicable(idf.ouvriers!, n1p1);
    expect(res.smicApplique).toBe(true);
    expect(res.montant).toBe(SMIC_MENSUEL_35H);
  });

  it('garde la valeur conventionnelle quand elle dépasse le SMIC', () => {
    const n3p1 = idf.ouvriers!.lignes.find((l) => l.coefficient === 210)!; // 2038 €
    const res = minimumApplicable(idf.ouvriers!, n3p1);
    expect(res.smicApplique).toBe(false);
    expect(res.montant).toBe(2038);
  });

  it("n'applique pas le plancher SMIC 35 h aux cadres (base 169 h)", () => {
    const res = minimumApplicable(CADRES_NATIONAL, CADRES_NATIONAL.lignes[0]); // 2356 €
    expect(res.smicApplique).toBe(false);
    expect(res.montant).toBe(2356);
  });

  it('getRegion retombe sur la région par défaut si clé inconnue', () => {
    expect(getRegion('narnia').key).toBe('ile-de-france');
  });
});
