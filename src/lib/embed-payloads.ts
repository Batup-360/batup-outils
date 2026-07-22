/**
 * Constructeurs de payloads `batup-embed-result` (v1) — un par calculateur
 * « métré ». Fonctions PURES : elles reçoivent les résultats calculés (ou les
 * entrées brutes, qu'elles recalculent avec les mêmes libs math que le
 * composant) et renvoient un EmbedResultPayload prêt pour emitEmbedResult().
 *
 * Les lignes qty <= 0 / non finies sont filtrées ICI : appeler un builder avec
 * des entrées vides renvoie simplement `lines: []` (et le bouton « Utiliser
 * dans le devis » reste masqué).
 *
 * Convention lineKey : `<domaine>.<quantite>` en snake_case — la liste
 * complète est documentée dans docs/embed.md (contrat v1, FIGÉ).
 */
import {
  validEmbedLines,
  type EmbedResultLine,
  type EmbedResultPayload,
  type EmbedUnit,
} from './embed-result';
import type { BetonMateriaux } from './beton-math';
import type { MortierMateriaux } from './mortier-math';
import type { PapierPeintResult } from './papier-peint-math';
import type { EscalierResult } from './escalier-math';
import {
  paquetsNecessaires,
  peintureLitres,
  quantiteParSurface,
  surfaceAvecPerte,
  unitesParM2DepuisCm,
  unitesParSurface,
} from './metre-quantite-math';

const round2 = (n: number): number => Math.round(n * 100) / 100;
/** Nombre au format français (virgule décimale) pour les hints. */
const fr = (n: number): string => String(round2(n)).replace('.', ',');

function line(lineKey: string, label: string, qty: number, unit: EmbedUnit, hint?: string): EmbedResultLine {
  return { lineKey, label, qty: round2(qty), unit, ...(hint ? { hint } : {}) };
}

function payload(lines: EmbedResultLine[], meta?: EmbedResultPayload['meta']): EmbedResultPayload {
  return { lines: validEmbedLines(lines), ...(meta ? { meta } : {}) };
}

const hintPerte = (pertePct: number): string => (pertePct > 0 ? `, perte +${fr(pertePct)} %` : '');

/* ------------------------------------------------------------------ */
/* Béton / mortier / chape                                             */
/* ------------------------------------------------------------------ */

/** calculateur-beton — `mat` sort de dosageBeton() (marge déjà incluse). */
export function buildBetonPayload(mat: BetonMateriaux, dosageKgParM3: number, margePct = 0): EmbedResultPayload {
  const marge = margePct > 0 ? `, marge +${fr(margePct)} %` : '';
  return payload(
    [
      line('beton.volume', 'Béton à couler', mat.volumeM3, 'm3', `dosage ${fr(dosageKgParM3)} kg/m³${marge}`),
      line('beton.ciment_sacs35', 'Ciment (sacs de 35 kg)', mat.sacs35, 'sac', `soit ~${fr(mat.cimentKg)} kg de ciment`),
      line('beton.sable', 'Sable à béton', mat.sableKg, 'kg'),
      line('beton.gravier', 'Gravier à béton', mat.gravierKg, 'kg'),
    ],
    { dosageKgParM3, margePct },
  );
}

/** calculateur-mortier — `mat` sort de dosageMortier() (marge déjà incluse). */
export function buildMortierPayload(mat: MortierMateriaux, dosageKgParM3: number, margePct = 0): EmbedResultPayload {
  const marge = margePct > 0 ? `, marge +${fr(margePct)} %` : '';
  return payload(
    [
      line('mortier.volume', 'Mortier', mat.volumeM3, 'm3', `dosage ${fr(dosageKgParM3)} kg/m³${marge}`),
      line('mortier.ciment_sacs35', 'Ciment (sacs de 35 kg)', mat.sacs35, 'sac', `soit ~${fr(mat.cimentKg)} kg de ciment`),
      line('mortier.sable', 'Sable', mat.sableKg, 'kg'),
    ],
    { dosageKgParM3, margePct },
  );
}

/** calculateur-chape — `mat` sort de dosageMortier(volume, 350). */
export function buildChapePayload(mat: MortierMateriaux, margePct = 0): EmbedResultPayload {
  const marge = margePct > 0 ? `, marge +${fr(margePct)} %` : '';
  return payload(
    [
      line('chape.volume', 'Chape traditionnelle', mat.volumeM3, 'm3', `dosage 350 kg/m³${marge}`),
      line('chape.ciment_sacs35', 'Ciment (sacs de 35 kg)', mat.sacs35, 'sac', `soit ~${fr(mat.cimentKg)} kg de ciment`),
      line('chape.sable', 'Sable', mat.sableKg, 'kg'),
    ],
    { margePct },
  );
}

/* ------------------------------------------------------------------ */
/* Revêtements & cloisons                                              */
/* ------------------------------------------------------------------ */

export interface CarrelageInputs {
  surface: number;
  carreauL: number;
  carreaul: number;
  perte: number;
}

/** calculateur-carrelage */
export function buildCarrelagePayload(v: CarrelageInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const parM2 = unitesParM2DepuisCm(v.carreauL, v.carreaul);
  const carreaux = unitesParSurface(surface, parM2, v.perte);
  return payload(
    [
      line('carrelage.surface', 'Pose de carrelage', surface, 'm2'),
      line(
        'carrelage.carreaux',
        `Carreaux ${fr(v.carreauL)} × ${fr(v.carreaul)} cm`,
        carreaux,
        'u',
        `${fr(parM2)} carreaux/m²${hintPerte(v.perte)}`,
      ),
      line('carrelage.colle', 'Mortier-colle', surface * 4, 'kg', '~4 kg/m² (simple encollage)'),
      line('carrelage.joint', 'Joint de carrelage', surface * 0.3, 'kg', '~0,3 kg/m²'),
    ],
    { surface: v.surface, carreauL: v.carreauL, carreaul: v.carreaul, perte: v.perte },
  );
}

export interface ParquetInputs {
  surface: number;
  surfacePaquet: number;
  perte: number;
}

/** calculateur-parquet */
export function buildParquetPayload(v: ParquetInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const paquets = paquetsNecessaires(surface, v.surfacePaquet, v.perte);
  return payload(
    [
      line('parquet.surface', 'Pose de parquet', surface, 'm2'),
      line('parquet.paquets', 'Parquet', paquets, 'paquet', `${fr(v.surfacePaquet)} m²/paquet${hintPerte(v.perte)}`),
      line('parquet.sous_couche', 'Sous-couche parquet', surface, 'm2'),
    ],
    { surface: v.surface, surfacePaquet: v.surfacePaquet, perte: v.perte },
  );
}

export interface PlacoInputs {
  surface: number;
  surfacePlaque: number;
  perte: number;
}

/** calculateur-placo */
export function buildPlacoPayload(v: PlacoInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const plaques = paquetsNecessaires(surface, v.surfacePlaque, v.perte);
  return payload(
    [
      line('placo.surface', 'Pose de plaques de plâtre', surface, 'm2'),
      line('placo.plaques', 'Plaques de plâtre BA13', plaques, 'u', `${fr(v.surfacePlaque)} m²/plaque${hintPerte(v.perte)}`),
      line('placo.vis', 'Vis à plaques', plaques * 25, 'u', '≈ 25 vis/plaque'),
      line('placo.bande_joint', 'Bande à joint', surface * 1.4, 'ml', '~1,4 m/m²'),
      line('placo.enduit_joint', 'Enduit à joint', surface * 1.2, 'kg', '~1,2 kg/m²'),
    ],
    { surface: v.surface, surfacePlaque: v.surfacePlaque, perte: v.perte },
  );
}

export interface PeintureInputs {
  surface: number;
  couches: number;
  rendement: number;
  perte: number;
}

/** calculateur-peinture */
export function buildPeinturePayload(v: PeintureInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const litres = peintureLitres(surface, v.couches, v.rendement, v.perte);
  const couches = v.couches > 0 ? Math.round(v.couches) : 0;
  return payload(
    [
      line('peinture.surface', 'Mise en peinture', surface, 'm2', couches > 0 ? `${couches} couche${couches > 1 ? 's' : ''}` : undefined),
      line(
        'peinture.litres',
        couches > 0 ? `Peinture (${couches} couche${couches > 1 ? 's' : ''})` : 'Peinture',
        litres,
        'L',
        `rendement ${fr(v.rendement)} m²/L${hintPerte(v.perte)}`,
      ),
      line('peinture.pots_2_5l', 'Pots de 2,5 L', litres > 0 ? Math.ceil(litres / 2.5) : 0, 'u'),
    ],
    { surface: v.surface, couches: v.couches, rendement: v.rendement, perte: v.perte },
  );
}

export interface EnduitFacadeInputs {
  surface: number;
  /** Consommation retenue (kg/m²) : saisie manuelle si > 0, sinon le type d'enduit. */
  consoKgParM2: number;
  perte: number;
}

/** calculateur-enduit-facade */
export function buildEnduitFacadePayload(v: EnduitFacadeInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const kg = quantiteParSurface(surface, v.consoKgParM2, v.perte);
  return payload(
    [
      line('enduit_facade.surface', 'Enduit de façade (application)', surface, 'm2'),
      line('enduit_facade.enduit', 'Enduit de façade', kg, 'kg', `${fr(v.consoKgParM2)} kg/m²${hintPerte(v.perte)}`),
      line('enduit_facade.sacs25', 'Sacs de 25 kg', kg > 0 ? Math.ceil(kg / 25) : 0, 'sac'),
    ],
    { surface: v.surface, consoKgParM2: v.consoKgParM2, perte: v.perte },
  );
}

/** calculateur-papier-peint — `r` sort de calculePapierPeint(). */
export function buildPapierPeintPayload(r: PapierPeintResult): EmbedResultPayload {
  return payload(
    [
      line('papier_peint.surface', 'Pose de papier peint', r.surfaceM2, 'm2'),
      line(
        'papier_peint.rouleaux',
        'Rouleaux de papier peint',
        r.rouleaux,
        'u',
        r.rouleaux > 0 ? `${r.lesNecessaires} lés, ${r.lesParRouleau} lés/rouleau` : undefined,
      ),
    ],
    { surfaceM2: round2(r.surfaceM2), lesNecessaires: r.lesNecessaires },
  );
}

/* ------------------------------------------------------------------ */
/* Maçonnerie & enveloppe                                              */
/* ------------------------------------------------------------------ */

export interface MurInputs {
  longueur: number;
  hauteur: number;
  /** Blocs (ou briques) par m². */
  unitesParM2: number;
  perte: number;
}

/** calculateur-parpaings */
export function buildParpaingsPayload(v: MurInputs): EmbedResultPayload {
  const surface = [v.longueur, v.hauteur].every((n) => Number.isFinite(n) && n > 0) ? v.longueur * v.hauteur : 0;
  const blocs = unitesParSurface(surface, v.unitesParM2, v.perte);
  return payload(
    [
      line('parpaings.surface', 'Mur en parpaings', surface, 'm2'),
      line('parpaings.blocs', 'Parpaings', blocs, 'u', `${fr(v.unitesParM2)} blocs/m²${hintPerte(v.perte)}`),
      line('parpaings.mortier', 'Mortier de montage', surface * 30, 'kg', '~30 kg/m² de mur (joints ~1,5 cm)'),
    ],
    { longueur: v.longueur, hauteur: v.hauteur, blocsParM2: v.unitesParM2, perte: v.perte },
  );
}

/** calculateur-briques */
export function buildBriquesPayload(v: MurInputs): EmbedResultPayload {
  const surface = [v.longueur, v.hauteur].every((n) => Number.isFinite(n) && n > 0) ? v.longueur * v.hauteur : 0;
  const briques = unitesParSurface(surface, v.unitesParM2, v.perte);
  return payload(
    [
      line('briques.surface', 'Mur en briques', surface, 'm2'),
      line('briques.briques', 'Briques', briques, 'u', `${fr(v.unitesParM2)} briques/m²${hintPerte(v.perte)}`),
    ],
    { longueur: v.longueur, hauteur: v.hauteur, briquesParM2: v.unitesParM2, perte: v.perte },
  );
}

export interface IsolantInputs {
  surface: number;
  surfaceRouleau: number;
  lambda: number;
  /** Résistance thermique R visée (m²·K/W) selon la paroi. */
  paroiR: number;
  perte: number;
}

/** calculateur-isolant */
export function buildIsolantPayload(v: IsolantInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const rouleaux = paquetsNecessaires(surface, v.surfaceRouleau, v.perte);
  const epaisseurCm = v.lambda > 0 && v.paroiR > 0 ? Math.ceil(v.lambda * v.paroiR * 100) : 0;
  const epHint = epaisseurCm > 0 ? `, épaisseur ~${epaisseurCm} cm (R ≥ ${fr(v.paroiR)})` : '';
  return payload(
    [
      line('isolant.surface', "Pose d'isolant", surface, 'm2', v.paroiR > 0 ? `R ≥ ${fr(v.paroiR)} m²·K/W` : undefined),
      line('isolant.rouleaux', 'Isolant (rouleaux)', rouleaux, 'u', `${fr(v.surfaceRouleau)} m²/rouleau${hintPerte(v.perte)}${epHint}`),
    ],
    { surface: v.surface, surfaceRouleau: v.surfaceRouleau, lambda: v.lambda, paroiR: v.paroiR, perte: v.perte },
  );
}

export interface TerrasseInputs {
  surface: number;
  lameLongueurM: number;
  lameLargeurCm: number;
  perte: number;
}

/** calculateur-terrasse */
export function buildTerrassePayload(v: TerrasseInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const aireLame = v.lameLongueurM > 0 && v.lameLargeurCm > 0 ? v.lameLongueurM * (v.lameLargeurCm / 100) : 0;
  const lames = paquetsNecessaires(surface, aireLame, v.perte);
  return payload(
    [
      line('terrasse.surface', 'Terrasse (pose de lames)', surface, 'm2'),
      line(
        'terrasse.lames',
        'Lames de terrasse',
        lames,
        'u',
        `lame ${fr(v.lameLongueurM)} m × ${fr(v.lameLargeurCm)} cm${hintPerte(v.perte)}`,
      ),
      line('terrasse.lambourdes', 'Lambourdes', surface * 2.2, 'ml', '~2,2 ml/m² (entraxe ~45 cm)'),
      line('terrasse.vis', 'Vis inox', Math.ceil(surface * 35), 'u', '~35 vis/m²'),
      line('terrasse.plots', 'Plots de terrasse', Math.ceil(surface * 5), 'u', '~5 plots/m²'),
    ],
    { surface: v.surface, lameLongueurM: v.lameLongueurM, lameLargeurCm: v.lameLargeurCm, perte: v.perte },
  );
}

export interface TuilesInputs {
  surface: number;
  /** Densité retenue (tuiles/m²) : saisie manuelle si > 0, sinon le type de tuile. */
  tuilesParM2: number;
  perte: number;
}

/** calculateur-tuiles */
export function buildTuilesPayload(v: TuilesInputs): EmbedResultPayload {
  const surface = Number.isFinite(v.surface) && v.surface > 0 ? v.surface : 0;
  const tuiles = unitesParSurface(surface, v.tuilesParM2, v.perte);
  return payload(
    [
      line('tuiles.surface', 'Couverture en tuiles', surface, 'm2'),
      line('tuiles.tuiles', 'Tuiles', tuiles, 'u', `${fr(v.tuilesParM2)} tuiles/m²${hintPerte(v.perte)}`),
    ],
    { surface: v.surface, tuilesParM2: v.tuilesParM2, perte: v.perte },
  );
}

/* ------------------------------------------------------------------ */
/* Dimensionnement & mesures                                           */
/* ------------------------------------------------------------------ */

/** calculateur-escalier — `r` sort de calculeEscalier(). */
export function buildEscalierPayload(r: EscalierResult): EmbedResultPayload {
  return payload(
    [
      line(
        'escalier.marches',
        "Marches d'escalier",
        r.nombreMarches,
        'u',
        r.nombreMarches > 0
          ? `hauteur ${fr(r.hauteurMarcheCm)} cm, giron ${fr(r.gironCm)} cm, Blondel ${fr(r.blondelCm)} cm`
          : undefined,
      ),
    ],
    {
      hauteurMarcheCm: round2(r.hauteurMarcheCm),
      gironCm: round2(r.gironCm),
      reculementTotalCm: round2(r.reculementTotalCm),
      confortable: r.confortable,
    },
  );
}

export interface PenteToitureResults {
  pourcent: number;
  degres: number;
  /** Longueur du rampant (m), 0 si non calculée (mode conversion). */
  rampantM: number;
}

/** calculateur-pente-toiture — seule quantité devis : le rampant. */
export function buildPenteToiturePayload(v: PenteToitureResults): EmbedResultPayload {
  return payload(
    [
      line(
        'pente_toiture.rampant',
        'Rampant de toiture',
        v.rampantM,
        'ml',
        v.pourcent > 0 ? `pente ${fr(v.pourcent)} % (${fr(v.degres)}°)` : undefined,
      ),
    ],
    { pentePourcent: round2(v.pourcent), angleDegres: round2(v.degres) },
  );
}

/** calculateur-surface */
export function buildSurfacePayload(totalM2: number, nbZones = 1): EmbedResultPayload {
  return payload(
    [line('surface.totale', 'Surface mesurée', totalM2, 'm2', nbZones > 1 ? `${nbZones} zones` : undefined)],
    { nbZones },
  );
}

/** calculateur-volume */
export function buildVolumePayload(volumeM3: number): EmbedResultPayload {
  return payload([
    line('volume.total', 'Volume mesuré', volumeM3, 'm3', volumeM3 > 0 ? `soit ~${Math.round(volumeM3 * 1000)} L` : undefined),
  ]);
}

/* ------------------------------------------------------------------ */
/* Granulats & consommations                                           */
/* ------------------------------------------------------------------ */

export interface GravierSableInputs {
  surface: number;
  epaisseurCm: number;
  /** Densité retenue (t/m³) : saisie manuelle si > 0, sinon le matériau. */
  densiteTParM3: number;
  perte: number;
}

/** calculateur-gravier-sable */
export function buildGravierSablePayload(v: GravierSableInputs): EmbedResultPayload {
  const volume = v.surface > 0 && v.epaisseurCm > 0 ? v.surface * (v.epaisseurCm / 100) : 0;
  const volumeMarge = surfaceAvecPerte(volume, v.perte);
  const tonnes = v.densiteTParM3 > 0 ? volumeMarge * v.densiteTParM3 : 0;
  return payload(
    [
      line('gravier_sable.volume', 'Granulats (volume en place)', volumeMarge, 'm3', v.perte > 0 ? `marge +${fr(v.perte)} %` : undefined),
      line(
        'gravier_sable.tonnage',
        'Granulats (gravier / sable)',
        tonnes * 1000,
        'kg',
        tonnes > 0 ? `soit ${fr(tonnes)} t, densité ${fr(v.densiteTParM3)} t/m³` : undefined,
      ),
      line('gravier_sable.big_bags', 'Big bags (~1 t)', tonnes > 0 ? Math.ceil(tonnes) : 0, 'u'),
    ],
    { surface: v.surface, epaisseurCm: v.epaisseurCm, densiteTParM3: v.densiteTParM3, perte: v.perte },
  );
}

export interface ConsommationInputs {
  surface: number;
  tauxParM2: number;
  /** Index d'unité du calculateur : 0 = kg, 1 = L, 2 = sacs. */
  uniteIndex: number;
  perte: number;
}

const CONSO_UNITS: EmbedUnit[] = ['kg', 'L', 'sac'];

/** calculateur-consommation-materiaux */
export function buildConsommationPayload(v: ConsommationInputs): EmbedResultPayload {
  const unit = CONSO_UNITS[v.uniteIndex] ?? 'kg';
  const total = quantiteParSurface(v.surface, v.tauxParM2, v.perte);
  const qty = unit === 'sac' && total > 0 ? Math.ceil(total) : total;
  return payload(
    [
      line('consommation.quantite', 'Matériau (consommation au m²)', qty, unit, `${fr(v.tauxParM2)} ${unit}/m²${hintPerte(v.perte)}`),
      line('consommation.surface', 'Surface de base', v.surface, 'm2'),
    ],
    { surface: v.surface, tauxParM2: v.tauxParM2, unite: unit, perte: v.perte },
  );
}
