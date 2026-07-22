import { describe, it, expect } from 'vitest';
import { dosageBeton } from './beton-math';
import { dosageMortier } from './mortier-math';
import { calculePapierPeint } from './papier-peint-math';
import { calculeEscalier } from './escalier-math';
import type { EmbedResultPayload, EmbedUnit } from './embed-result';
import {
  buildBetonPayload,
  buildMortierPayload,
  buildChapePayload,
  buildCarrelagePayload,
  buildParquetPayload,
  buildPlacoPayload,
  buildPeinturePayload,
  buildEnduitFacadePayload,
  buildPapierPeintPayload,
  buildParpaingsPayload,
  buildBriquesPayload,
  buildIsolantPayload,
  buildTerrassePayload,
  buildTuilesPayload,
  buildEscalierPayload,
  buildPenteToiturePayload,
  buildSurfacePayload,
  buildVolumePayload,
  buildGravierSablePayload,
  buildConsommationPayload,
} from './embed-payloads';

const keysOf = (p: EmbedResultPayload) => p.lines.map((l) => l.lineKey);
const lineOf = (p: EmbedResultPayload, key: string) => {
  const l = p.lines.find((x) => x.lineKey === key);
  if (!l) throw new Error(`ligne ${key} absente (${keysOf(p).join(', ')})`);
  return l;
};

describe('buildBetonPayload', () => {
  it('émet volume, sacs de ciment, sable et gravier', () => {
    // 1 m³ dosé à 350 : ciment 350 kg, eau 175 L, granulat 2400-350-175 = 1875 kg
    const mat = dosageBeton(1, 350);
    const p = buildBetonPayload(mat, 350, 10);
    expect(keysOf(p)).toEqual(['beton.volume', 'beton.ciment_sacs35', 'beton.sable', 'beton.gravier']);
    expect(lineOf(p, 'beton.volume')).toMatchObject({ qty: 1, unit: 'm3' });
    expect(lineOf(p, 'beton.ciment_sacs35')).toMatchObject({ qty: Math.ceil(350 / 35), unit: 'sac' });
    expect(lineOf(p, 'beton.sable')).toMatchObject({ qty: 1875 * 0.44, unit: 'kg' });
    expect(lineOf(p, 'beton.gravier')).toMatchObject({ qty: 1875 * 0.56, unit: 'kg' });
    expect(p.meta).toMatchObject({ dosageKgParM3: 350, margePct: 10 });
  });

  it('renvoie zéro ligne sur volume nul', () => {
    expect(buildBetonPayload(dosageBeton(0, 350), 350).lines).toEqual([]);
  });
});

describe('buildMortierPayload / buildChapePayload', () => {
  it('mortier : volume, sacs, sable', () => {
    const mat = dosageMortier(0.5, 350); // ciment 175 kg → 5 sacs de 35, sable 725 kg
    const p = buildMortierPayload(mat, 350, 5);
    expect(keysOf(p)).toEqual(['mortier.volume', 'mortier.ciment_sacs35', 'mortier.sable']);
    expect(lineOf(p, 'mortier.volume')).toMatchObject({ qty: 0.5, unit: 'm3' });
    expect(lineOf(p, 'mortier.ciment_sacs35')).toMatchObject({ qty: 5, unit: 'sac' });
    expect(lineOf(p, 'mortier.sable')).toMatchObject({ qty: 725, unit: 'kg' });
  });

  it('chape : mêmes quantités sous les clés chape.*', () => {
    const mat = dosageMortier(0.5, 350);
    const p = buildChapePayload(mat, 10);
    expect(keysOf(p)).toEqual(['chape.volume', 'chape.ciment_sacs35', 'chape.sable']);
    expect(lineOf(p, 'chape.volume').qty).toBe(0.5);
  });
});

describe('buildCarrelagePayload', () => {
  it('recalcule carreaux, colle et joint comme le composant', () => {
    // 20 m², carreau 50×50 (4/m²), perte 10 % → ceil(22 × 4) = 88 carreaux
    const p = buildCarrelagePayload({ surface: 20, carreauL: 50, carreaul: 50, perte: 10 });
    expect(keysOf(p)).toEqual(['carrelage.surface', 'carrelage.carreaux', 'carrelage.colle', 'carrelage.joint']);
    expect(lineOf(p, 'carrelage.surface')).toMatchObject({ qty: 20, unit: 'm2' });
    expect(lineOf(p, 'carrelage.carreaux')).toMatchObject({ qty: 88, unit: 'u' });
    expect(lineOf(p, 'carrelage.colle')).toMatchObject({ qty: 80, unit: 'kg' }); // 4 kg/m²
    expect(lineOf(p, 'carrelage.joint')).toMatchObject({ qty: 6, unit: 'kg' }); // 0,3 kg/m²
  });

  it('entrées vides → aucune ligne', () => {
    expect(buildCarrelagePayload({ surface: 0, carreauL: 60, carreaul: 60, perte: 10 }).lines).toEqual([]);
  });
});

describe('buildPeinturePayload', () => {
  it('litres = surface × couches / rendement, avec perte', () => {
    // 40 m², 2 couches, 10 m²/L, perte 5 % → 40 × 1,05 × 2 / 10 = 8,4 L → 4 pots
    const p = buildPeinturePayload({ surface: 40, couches: 2, rendement: 10, perte: 5 });
    expect(keysOf(p)).toEqual(['peinture.surface', 'peinture.litres', 'peinture.pots_2_5l']);
    const litres = lineOf(p, 'peinture.litres');
    expect(litres).toMatchObject({ qty: 8.4, unit: 'L', label: 'Peinture (2 couches)' });
    expect(litres.hint).toContain('rendement 10 m²/L');
    expect(lineOf(p, 'peinture.pots_2_5l')).toMatchObject({ qty: 4, unit: 'u' });
  });
});

describe('buildPlacoPayload', () => {
  it('plaques, vis, bande et enduit', () => {
    // 30 m², plaque 3 m², perte 10 % → ceil(33/3) = 11 plaques, 275 vis
    const p = buildPlacoPayload({ surface: 30, surfacePlaque: 3, perte: 10 });
    expect(lineOf(p, 'placo.plaques')).toMatchObject({ qty: 11, unit: 'u' });
    expect(lineOf(p, 'placo.vis')).toMatchObject({ qty: 275, unit: 'u' });
    expect(lineOf(p, 'placo.bande_joint')).toMatchObject({ qty: 42, unit: 'ml' }); // 1,4 m/m²
    expect(lineOf(p, 'placo.enduit_joint')).toMatchObject({ qty: 36, unit: 'kg' }); // 1,2 kg/m²
  });
});

describe('buildParpaingsPayload', () => {
  it('blocs et mortier de montage depuis les dimensions du mur', () => {
    // mur 10 × 2,5 = 25 m², 10 blocs/m², perte 5 % → ceil(26,25 × 10) = 263
    const p = buildParpaingsPayload({ longueur: 10, hauteur: 2.5, unitesParM2: 10, perte: 5 });
    expect(lineOf(p, 'parpaings.surface')).toMatchObject({ qty: 25, unit: 'm2' });
    expect(lineOf(p, 'parpaings.blocs')).toMatchObject({ qty: 263, unit: 'u' });
    expect(lineOf(p, 'parpaings.mortier')).toMatchObject({ qty: 750, unit: 'kg' }); // 30 kg/m²
  });
});

describe('buildIsolantPayload', () => {
  it('rouleaux + épaisseur conseillée dans le hint', () => {
    // 60 m², rouleau 6 m², perte 5 % → ceil(63/6) = 11 ; λ 0,038 × R 7 → 27 cm
    const p = buildIsolantPayload({ surface: 60, surfaceRouleau: 6, lambda: 0.038, paroiR: 7, perte: 5 });
    const rouleaux = lineOf(p, 'isolant.rouleaux');
    expect(rouleaux).toMatchObject({ qty: 11, unit: 'u' });
    expect(rouleaux.hint).toContain('épaisseur ~27 cm');
    expect(lineOf(p, 'isolant.surface')).toMatchObject({ qty: 60, unit: 'm2' });
  });
});

describe('buildEscalierPayload', () => {
  it('nombre de marches avec dimensions en hint', () => {
    // 280 cm / 17,5 → 16 marches de 17,5 cm, giron 63 - 35 = 28 cm
    const r = calculeEscalier(280);
    const p = buildEscalierPayload(r);
    expect(keysOf(p)).toEqual(['escalier.marches']);
    const marches = lineOf(p, 'escalier.marches');
    expect(marches).toMatchObject({ qty: 16, unit: 'u' });
    expect(marches.hint).toContain('hauteur 17,5 cm');
    expect(marches.hint).toContain('giron 28 cm');
  });
});

describe('buildGravierSablePayload', () => {
  it('tonnage en kg, volume et big bags', () => {
    // 20 m² × 10 cm = 2 m³, marge 5 % → 2,1 m³ × 1,5 t/m³ = 3,15 t → 3150 kg, 4 big bags
    const p = buildGravierSablePayload({ surface: 20, epaisseurCm: 10, densiteTParM3: 1.5, perte: 5 });
    expect(lineOf(p, 'gravier_sable.volume')).toMatchObject({ qty: 2.1, unit: 'm3' });
    expect(lineOf(p, 'gravier_sable.tonnage')).toMatchObject({ qty: 3150, unit: 'kg' });
    expect(lineOf(p, 'gravier_sable.big_bags')).toMatchObject({ qty: 4, unit: 'u' });
  });
});

describe('tous les builders (contrat v1)', () => {
  const UNITES: EmbedUnit[] = ['m2', 'm3', 'ml', 'u', 'kg', 'L', 'sac', 'paquet', 'h'];
  const LINE_KEY_RE = /^[a-z_]+\.[a-z0-9_]+$/;

  // Un appel représentatif (entrées valides) par builder — les 20 outils métré.
  const SAMPLES: [string, EmbedResultPayload][] = [
    ['calculateur-beton', buildBetonPayload(dosageBeton(1.2, 350), 350, 10)],
    ['calculateur-mortier', buildMortierPayload(dosageMortier(0.4, 350), 350, 10)],
    ['calculateur-chape', buildChapePayload(dosageMortier(0.6, 350), 5)],
    ['calculateur-carrelage', buildCarrelagePayload({ surface: 18, carreauL: 60, carreaul: 60, perte: 10 })],
    ['calculateur-parquet', buildParquetPayload({ surface: 25, surfacePaquet: 2, perte: 10 })],
    ['calculateur-placo', buildPlacoPayload({ surface: 30, surfacePlaque: 3, perte: 10 })],
    ['calculateur-peinture', buildPeinturePayload({ surface: 40, couches: 2, rendement: 10, perte: 5 })],
    ['calculateur-enduit-facade', buildEnduitFacadePayload({ surface: 80, consoKgParM2: 18, perte: 10 })],
    ['calculateur-papier-peint', buildPapierPeintPayload(calculePapierPeint(18, 2.5))],
    ['calculateur-parpaings', buildParpaingsPayload({ longueur: 10, hauteur: 2.5, unitesParM2: 10, perte: 5 })],
    ['calculateur-briques', buildBriquesPayload({ longueur: 8, hauteur: 2.4, unitesParM2: 50, perte: 5 })],
    ['calculateur-isolant', buildIsolantPayload({ surface: 60, surfaceRouleau: 6, lambda: 0.038, paroiR: 7, perte: 5 })],
    ['calculateur-terrasse', buildTerrassePayload({ surface: 22, lameLongueurM: 4, lameLargeurCm: 14, perte: 10 })],
    ['calculateur-tuiles', buildTuilesPayload({ surface: 90, tuilesParM2: 13, perte: 10 })],
    ['calculateur-escalier', buildEscalierPayload(calculeEscalier(280))],
    ['calculateur-pente-toiture', buildPenteToiturePayload({ pourcent: 40, degres: 21.8, rampantM: 5.39 })],
    ['calculateur-surface', buildSurfacePayload(34.5, 2)],
    ['calculateur-volume', buildVolumePayload(1.85)],
    ['calculateur-gravier-sable', buildGravierSablePayload({ surface: 20, epaisseurCm: 10, densiteTParM3: 1.5, perte: 5 })],
    ['calculateur-consommation-materiaux', buildConsommationPayload({ surface: 15, tauxParM2: 3, uniteIndex: 0, perte: 10 })],
  ];

  it('couvre les 20 outils métré', () => {
    expect(SAMPLES).toHaveLength(20);
    expect(new Set(SAMPLES.map(([slug]) => slug)).size).toBe(20);
  });

  it.each(SAMPLES)('%s : payload valide', (_slug, p) => {
    expect(p.lines.length).toBeGreaterThanOrEqual(1);
    for (const l of p.lines) {
      expect(l.lineKey).toMatch(LINE_KEY_RE);
      expect(UNITES).toContain(l.unit);
      expect(Number.isFinite(l.qty)).toBe(true);
      expect(l.qty).toBeGreaterThan(0);
      expect(l.label.length).toBeGreaterThan(0);
      if (l.hint !== undefined) expect(l.hint.length).toBeGreaterThan(0);
    }
    // Pas de doublon de lineKey dans un même payload.
    expect(new Set(p.lines.map((l) => l.lineKey)).size).toBe(p.lines.length);
    // meta : uniquement string | number | boolean.
    for (const v of Object.values(p.meta ?? {})) {
      expect(['string', 'number', 'boolean']).toContain(typeof v);
    }
  });
});
