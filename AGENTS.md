# AGENTS.md — batup-outils

Guide for AI coding agents. How this app is built and, above all, **how to add a new free tool** end to end.

## What this is

Standalone lead-magnet calculators for `outils.batup.fr`. Vite + React 18 SPA (client-only `createRoot`, router = `wouter`), prerendered to static HTML for SEO, deployed on **Cloudflare Pages** (auto-deploy on push to `main`). One Cloudflare Pages Function (`functions/api/subscribe.ts`) handles the email capture → Brevo.

- **Build**: `npm run build` = `tsc -b && vite build && tsx scripts/prerender.ts`. Prerender writes one static `.html` per SEO route + one bare `/embed/<slug>` shell (noindex) + home + 404. Expect `wrote N static pages` where `N = tools×2 + 1`.
- **Tests**: `npm test` (vitest). Pure math lives in `src/lib/*-math.ts` with colocated `*.test.ts`.
- **Prod deploy**: push to `main`. GA4 (`G-8NVKZYY1SE`) is baked in `src/lib/analytics.ts`, fires only on `*.batup.fr`, skipped in `/embed` iframes.

## Tool catalog (43 tools + 28 fiches métier + 9 grilles régionales)

What already exists — check here before building to avoid duplicates. Slug = URL path (minus leading `/`) and the identifier used everywhere (see invariant). `Q` = built on the shared `QuantiteCalculator` engine; `B` = bespoke component.

### Pricing & marge
| slug | eng | what it does |
|---|:-:|---|
| [`calculateur-taux-horaire-btp`](https://outils.batup.fr/calculateur-taux-horaire-btp) | B | Taux horaire à facturer pour couvrir charges + dégager une marge |
| [`calculateur-prix-chantier-btp`](https://outils.batup.fr/calculateur-prix-chantier-btp) | B | Prix de vente d'un chantier : déboursé sec + frais généraux + marge |
| [`calculateur-marge-nette-coefficient-btp`](https://outils.batup.fr/calculateur-marge-nette-coefficient-btp) | B | Conversion coefficient ↔ marge nette + prix de vente correspondant |
| [`calculateur-revision-prix-index-bt`](https://outils.batup.fr/calculateur-revision-prix-index-bt) | B | Coefficient de révision CCAG-Travaux via les index BT (INSEE) |

### Paie & RH
| slug | eng | what it does |
|---|:-:|---|
| [`calculateur-heures-supplementaires-btp`](https://outils.batup.fr/calculateur-heures-supplementaires-btp) | B | Majorations d'heures sup + paniers/trajets BTP |
| [`calculateur-cout-salarie-btp`](https://outils.batup.fr/calculateur-cout-salarie-btp) | B | Coût total employeur (brut + charges patronales, CIBTP) |
| [`calculateur-jours-intemperies-cibtp`](https://outils.batup.fr/calculateur-jours-intemperies-cibtp) | B | Indemnisation intempéries CIBTP (75 %, carence, plafond) |
| [`calculateur-prime-anciennete-ccn-batiment`](https://outils.batup.fr/calculateur-prime-anciennete-ccn-batiment) | B | Prime d'ancienneté selon coefficient + ancienneté (CCN Bâtiment) |
| [`grille-salaires-minima-batiment`](https://outils.batup.fr/grille-salaires-minima-batiment) | B | Salaires minima conventionnels (ouvriers/ETAM/cadres). Données dans `src/lib/grille-salaires-btp.ts`. **SEO programmatique** : une page par région à `/grille-salaires-minima-batiment/<region>` |

### Fiscal & légal
| slug | eng | what it does |
|---|:-:|---|
| [`calculateur-tva`](https://outils.batup.fr/calculateur-tva) | B | Conversion TVA HT ↔ TTC, multi-taux |
| [`calculateur-tva-autoliquidation-btp`](https://outils.batup.fr/calculateur-tva-autoliquidation-btp) | B | Montant HT sous-traitance + mention autoliquidation |
| [`generateur-mention-tva-facture-btp`](https://outils.batup.fr/generateur-mention-tva-facture-btp) | B | Génère la mention légale de taux réduit (5,5 / 10 / 20 %) |
| [`generateur-attestation-tva`](https://outils.batup.fr/generateur-attestation-tva) | B | Mention de certification taux réduit (formulation BOFiP 2025) |
| [`calculateur-charges-sociales-artisan-btp`](https://outils.batup.fr/calculateur-charges-sociales-artisan-btp) | B | Cotisations selon statut (micro / EURL…), option ACRE |
| [`comparateur-statut-juridique-artisan-btp`](https://outils.batup.fr/comparateur-statut-juridique-artisan-btp) | B | Compare micro-entreprise / EI / EURL / SASU pour un artisan |
| [`verificateur-mentions-obligatoires-facture-devis-btp`](https://outils.batup.fr/verificateur-mentions-obligatoires-facture-devis-btp) | B | Checklist conformité facture + devis BTP |

### Trésorerie & marchés
| slug | eng | what it does |
|---|:-:|---|
| [`calculateur-situation-travaux`](https://outils.batup.fr/calculateur-situation-travaux) | B | Montant à facturer = avancement − déjà facturé − retenue |
| [`calculateur-dgd-decompte-general-definitif`](https://outils.batup.fr/calculateur-dgd-decompte-general-definitif) | B | Solde final d'un marché (décompte général définitif) |
| [`calculateur-retenue-de-garantie`](https://outils.batup.fr/calculateur-retenue-de-garantie) | B | Retenue de garantie 5 % + alternative caution bancaire |

### Assurances & aides
| slug | eng | what it does |
|---|:-:|---|
| [`simulateur-decennale-btp`](https://outils.batup.fr/simulateur-decennale-btp) | B | Fourchette de prix garantie décennale par métier |
| [`simulateur-rc-pro-btp`](https://outils.batup.fr/simulateur-rc-pro-btp) | B | Fourchette de prix RC Pro BTP |
| [`calculateur-roi-certification-rge`](https://outils.batup.fr/calculateur-roi-certification-rge) | B | Rentabilité (ROI) de la certification RGE |

### Métré & quantités
| slug | eng | what it does |
|---|:-:|---|
| [`calculateur-beton`](https://outils.batup.fr/calculateur-beton) | B | Volume de béton + sacs (dalle, semelle, poteau) |
| [`calculateur-surface`](https://outils.batup.fr/calculateur-surface) | B | Surface multi-zones en m² (loi Carrez / Boutin) |
| [`calculateur-volume`](https://outils.batup.fr/calculateur-volume) | B | Volume en m³ |
| [`calculateur-escalier`](https://outils.batup.fr/calculateur-escalier) | B | Nombre de marches, hauteur/giron (loi de Blondel) |
| [`calculateur-mortier`](https://outils.batup.fr/calculateur-mortier) | B | Dosage ciment / sable / eau du mortier |
| [`calculateur-chape`](https://outils.batup.fr/calculateur-chape) | B | Volume de chape + sacs |
| [`calculateur-pente-toiture`](https://outils.batup.fr/calculateur-pente-toiture) | B | Conversion % ↔ degrés ↔ longueur de rampant |
| [`calculateur-papier-peint`](https://outils.batup.fr/calculateur-papier-peint) | B | Nombre de rouleaux / lés |
| [`calculateur-parpaings`](https://outils.batup.fr/calculateur-parpaings) | Q | Blocs au m² + mortier |
| [`calculateur-briques`](https://outils.batup.fr/calculateur-briques) | Q | Briques au m² selon le format |
| [`calculateur-placo`](https://outils.batup.fr/calculateur-placo) | Q | Plaques BA13 + vis + rails + bande/enduit à joint |
| [`calculateur-carrelage`](https://outils.batup.fr/calculateur-carrelage) | Q | Carreaux + colle + joint |
| [`calculateur-parquet`](https://outils.batup.fr/calculateur-parquet) | Q | Paquets + sous-couche |
| [`calculateur-terrasse`](https://outils.batup.fr/calculateur-terrasse) | Q | Lames + lambourdes + vis + plots |
| [`calculateur-isolant`](https://outils.batup.fr/calculateur-isolant) | Q | Rouleaux + épaisseur conseillée (e = λ × R) |
| [`calculateur-peinture`](https://outils.batup.fr/calculateur-peinture) | Q | Litres selon surface + nombre de couches |
| [`calculateur-consommation-materiaux`](https://outils.batup.fr/calculateur-consommation-materiaux) | Q | Consommation au m² (colle, enduit, primaire, ragréage) |
| [`calculateur-tuiles`](https://outils.batup.fr/calculateur-tuiles) | Q | Nombre de tuiles selon type (mécanique/plate/canal) + surface des pans |
| [`calculateur-gravier-sable`](https://outils.batup.fr/calculateur-gravier-sable) | Q | Volume (m³) → tonnage de gravier / sable / tout-venant |
| [`calculateur-enduit-facade`](https://outils.batup.fr/calculateur-enduit-facade) | Q | Enduit de façade en kg + sacs de 25 kg (monocouche, gobetis…) |

## The one invariant

A tool is identified by its **slug** (e.g. `calculateur-isolant`). The slug string must be **byte-identical** in every place below. A mismatch = broken result URL, missing email astuce, or a 404. This is the #1 source of bugs when adding a tool.

## Two kinds of tool

1. **Quantity / métré** (parpaings, placo, isolant, terrasse…): reuse the shared engine `src/components/QuantiteCalculator.tsx`. You only write a `QuantiteConfig` (fields, selects, `compute()` → `{mainLabel, mainValue, sub, rows}`). Math goes in `src/lib/*-math.ts`. This is the cheap path — prefer it.
2. **Bespoke** (taux horaire, TVA, simulateurs…): a custom component. Wrap the result in `<GatedReveal toolSlug=… toolLabel=… resultPreview=…>` and read `useEmailGate()`.

Reference implementation to copy from: **IsolantCalculator** (quantity) — files listed below.

## Checklist: adding a tool `calculateur-foo`

Component name `FooCalculator`, breadcrumb `Calculateur de foo`.

### 1. Math + test (métré tools) — `src/lib/foo-math.ts` (+ `foo-math.test.ts`)
Pure functions, unit-tested. Reuse helpers in `src/lib/metre-quantite-math.ts` (`paquetsNecessaires`, `surfaceAvecPerte`) when quantity-style. Skip if the tool has no non-trivial math.

### 2. Copy — `src/content/foo-copy.ts`
Export `fooCopy` with this exact shape (see `src/content/isolant-copy.ts`):
```ts
export const fooCopy = {
  seo: { title, description, canonicalPath: '/calculateur-foo' },
  webApplication: { name, description },   // → JSON-LD SoftwareApplication
  hero: { h1, lede },
  ctaBanner: { title, subtitle },
  methodology: { title, intro, blocks: [{ heading, body }, …] },
};
```

### 3. FAQ — `src/content/foo-faq.ts`
```ts
import type { FAQItem } from '@/components/FAQAccordion';
export const fooFAQ: FAQItem[] = [{ question, answer }, …]; // target 8, PAA-driven
```
FAQ feeds both the on-page accordion and the `FAQPage` JSON-LD (prerender).

### 4. Component — `src/components/FooCalculator.tsx`
Quantity path:
```ts
import { QuantiteCalculator, fmtInt, fmtNum, type QuantiteConfig } from './QuantiteCalculator';
const CONFIG: QuantiteConfig = {
  toolSlug: 'calculateur-foo', toolLabel: 'Calculateur de foo', source: 'calculateur-foo',
  inputTitle: '…', fields: [...], selects: [...], stickyLabel: '…',
  compute: (v) => ({ mainLabel, mainValue, sub, rows: [{ label, value }] }),
};
export function FooCalculator() { return <QuantiteCalculator config={CONFIG} />; }
```
Bespoke path: custom component with a `const TOOL_SLUG = 'calculateur-foo'`, gated via `<GatedReveal toolSlug={TOOL_SLUG} …>`.

### 5. Page — `src/pages/calculateur-foo.tsx`
Default-export using `PublicToolLayout` (copy from `src/pages/calculateur-isolant.tsx`). Wire `seo`, `webApplication*`, `breadcrumb`, `hero*`, `methodology`, `faqItems`, and `signupHref={`${APP_BASE}/signup?source=calculateur-foo`}`.

### 6. Router — `src/App.tsx`
```ts
const CalculateurFoo = lazy(() => import('./pages/calculateur-foo'));
// inside <Switch>:
<Route path="/calculateur-foo" component={CalculateurFoo} />
```

### 7. SEO manifest — `src/seo-manifest.ts`
Import `fooCopy` + `fooFAQ`, then add to `SEO_ROUTES`:
```ts
toRoute(fooCopy, fooFAQ, 'Calculateur de foo'),
```
This one line drives the prerendered SEO page, the `/embed/calculateur-foo` shell, all JSON-LD, **and** the internal-link nav hub — automatically. Keep `src/seo-manifest.ts` free of any React/DOM import (it runs under `tsx` in prerender).

### 8. Embed map — `src/pages/embed.tsx`
```ts
'calculateur-foo': lazyCalc(() => import('@/components/FooCalculator'), 'FooCalculator'),
```

### 9. Home grid — `src/pages/home.tsx`
Add a `Tool` to `TOOLS` (`href`, `icon` from lucide, `title`, `description`, `type`, `theme`, `popularity`).

### 10. Sitemap — automatique
`scripts/prerender.ts` génère `dist/sitemap.xml` depuis `SEO_ROUTES` + les routes programmatiques. Rien à éditer (il n'y a plus de `public/sitemap.xml`).

### 11. Email astuce — `functions/api/subscribe.ts`
Add the slug to `TOOL_ASTUCE` with the right family (`metre | pricing | paie | fiscal | cash | assurance`) so the result email pitches the relevant BatUp product:
```ts
'calculateur-foo': 'metre',
```

## Programmatic SEO — grille salaires par région (query × région)

`/grille-salaires-minima-batiment/<region>` génère une page indexable par région (titre/H1/canonical avec le nom de région). Pour **ajouter une région** : ajouter une entrée à `REGIONS` dans `src/lib/grille-salaires-btp.ts` avec ses grilles `ouvriers`/`etam` réelles (datées + sourcées, jamais inventées) — les catégories sont optionnelles, une région sans donnée affiche « en cours d'intégration » sans page vide. La page statique est émise par `scripts/prerender.ts` (boucle `GRILLE_REGION_ROUTES`), la route dynamique est `/grille-salaires-minima-batiment/:region` dans `App.tsx`, le composant lit `regionKey`. Route + prerender + sitemap sont tous dérivés de `REGIONS` (rien d'autre à éditer). Les cadres (IDCC 2420) sont nationaux et partagés (`CADRES_NATIONAL`).

## Programmatic SEO — salaires par métier

`/salaires-metiers-btp` (hub) + `/salaire-<metier>` (une page par métier). Données dans `src/lib/salaires-metiers-btp.ts` (`METIERS[]`) : le SEUL chiffre affirmé est `debutantNet`, transcrit d'une source datée et citée (`METIER_SOURCE`) — jamais inventé ; le reste (brut, confirmé) est étiqueté « estimation ». **Ajouter un métier** = ajouter une entrée à `METIERS` avec un `debutantNet` sourcé. Les routes sont générées depuis `METIERS` dans `App.tsx` (routes explicites `/salaire-<slug>` via render-prop — wouter ne capture PAS un param en milieu de segment comme `/salaire-:x`). Le prerender émet une page par métier (boucle `METIER_ROUTES` dans `scripts/prerender.ts`). Route + prerender + sitemap + astuce email (préfixe `salaire-` → `paie` dans `subscribe.ts`) sont tous auto : ajouter une entrée à `METIERS` suffit. Priorité mots-clés (Semrush FR) : le volume est sur le MÉTIER (grutier 2900, menuisier 1300, couvreur 880…), pas sur la région (≈ 0).

## Handled automatically (do NOT hand-edit)
- Static SEO page + `/embed/<slug>` shell + JSON-LD → `scripts/prerender.ts` reads `SEO_ROUTES`.
- Internal-link nav hub → also from `SEO_ROUTES`.
- `sitemap.xml` → generated by `scripts/prerender.ts` from all route arrays (no manual edit).
- Email gate modal, StickyResultBar, signup URL params → `QuantiteCalculator` / `PublicToolLayout`.
- GA4 pageview on route change → `AnalyticsTracker` in `App.tsx`.

## Verify before pushing
```bash
npm run build   # tsc + vite + prerender; page count must grow by 2 (SEO + embed)
npm test        # all green
```
Quick slug-coverage sanity check (should print the slug in each file):
```bash
S=calculateur-foo; grep -l "$S" src/App.tsx src/pages/embed.tsx public/sitemap.xml src/seo-manifest.ts functions/api/subscribe.ts
```

## Gotchas
- Slug identical in all 11 places (see invariant). The result-email link is `outils.batup.fr/<toolSlug>` — a wrong slug 404s the CTA.
- Page renders client-side only; `prerender.ts` is pure HTML string rewriting, not React SSR. Guard any `window` access.
- Secrets are env-only: `BREVO_API_KEY`, `BREVO_LIST_ID` (Cloudflare Pages → Variables). Never commit keys. GA Measurement ID is public and intentionally committed.
- `.env*` is gitignored; `npm audit` must stay at 0 (esbuild pinned via `overrides`).

## Toutes les URLs live (généré depuis le sitemap)

Base : `https://outils.batup.fr` — 81 URLs. Régénéré à chaque build (`dist/sitemap.xml`).

### Accueil (1)
- [/ (accueil)](https://outils.batup.fr/)

### Outils (41)
- [/calculateur-beton](https://outils.batup.fr/calculateur-beton)
- [/calculateur-briques](https://outils.batup.fr/calculateur-briques)
- [/calculateur-carrelage](https://outils.batup.fr/calculateur-carrelage)
- [/calculateur-chape](https://outils.batup.fr/calculateur-chape)
- [/calculateur-charges-sociales-artisan-btp](https://outils.batup.fr/calculateur-charges-sociales-artisan-btp)
- [/calculateur-consommation-materiaux](https://outils.batup.fr/calculateur-consommation-materiaux)
- [/calculateur-cout-salarie-btp](https://outils.batup.fr/calculateur-cout-salarie-btp)
- [/calculateur-dgd-decompte-general-definitif](https://outils.batup.fr/calculateur-dgd-decompte-general-definitif)
- [/calculateur-enduit-facade](https://outils.batup.fr/calculateur-enduit-facade)
- [/calculateur-escalier](https://outils.batup.fr/calculateur-escalier)
- [/calculateur-gravier-sable](https://outils.batup.fr/calculateur-gravier-sable)
- [/calculateur-heures-supplementaires-btp](https://outils.batup.fr/calculateur-heures-supplementaires-btp)
- [/calculateur-isolant](https://outils.batup.fr/calculateur-isolant)
- [/calculateur-jours-intemperies-cibtp](https://outils.batup.fr/calculateur-jours-intemperies-cibtp)
- [/calculateur-marge-nette-coefficient-btp](https://outils.batup.fr/calculateur-marge-nette-coefficient-btp)
- [/calculateur-mortier](https://outils.batup.fr/calculateur-mortier)
- [/calculateur-papier-peint](https://outils.batup.fr/calculateur-papier-peint)
- [/calculateur-parpaings](https://outils.batup.fr/calculateur-parpaings)
- [/calculateur-parquet](https://outils.batup.fr/calculateur-parquet)
- [/calculateur-peinture](https://outils.batup.fr/calculateur-peinture)
- [/calculateur-pente-toiture](https://outils.batup.fr/calculateur-pente-toiture)
- [/calculateur-placo](https://outils.batup.fr/calculateur-placo)
- [/calculateur-prime-anciennete-ccn-batiment](https://outils.batup.fr/calculateur-prime-anciennete-ccn-batiment)
- [/calculateur-prix-chantier-btp](https://outils.batup.fr/calculateur-prix-chantier-btp)
- [/calculateur-retenue-de-garantie](https://outils.batup.fr/calculateur-retenue-de-garantie)
- [/calculateur-revision-prix-index-bt](https://outils.batup.fr/calculateur-revision-prix-index-bt)
- [/calculateur-roi-certification-rge](https://outils.batup.fr/calculateur-roi-certification-rge)
- [/calculateur-situation-travaux](https://outils.batup.fr/calculateur-situation-travaux)
- [/calculateur-surface](https://outils.batup.fr/calculateur-surface)
- [/calculateur-taux-horaire-btp](https://outils.batup.fr/calculateur-taux-horaire-btp)
- [/calculateur-terrasse](https://outils.batup.fr/calculateur-terrasse)
- [/calculateur-tuiles](https://outils.batup.fr/calculateur-tuiles)
- [/calculateur-tva](https://outils.batup.fr/calculateur-tva)
- [/calculateur-tva-autoliquidation-btp](https://outils.batup.fr/calculateur-tva-autoliquidation-btp)
- [/calculateur-volume](https://outils.batup.fr/calculateur-volume)
- [/comparateur-statut-juridique-artisan-btp](https://outils.batup.fr/comparateur-statut-juridique-artisan-btp)
- [/generateur-attestation-tva](https://outils.batup.fr/generateur-attestation-tva)
- [/generateur-mention-tva-facture-btp](https://outils.batup.fr/generateur-mention-tva-facture-btp)
- [/simulateur-decennale-btp](https://outils.batup.fr/simulateur-decennale-btp)
- [/simulateur-rc-pro-btp](https://outils.batup.fr/simulateur-rc-pro-btp)
- [/verificateur-mentions-obligatoires-facture-devis-btp](https://outils.batup.fr/verificateur-mentions-obligatoires-facture-devis-btp)

### Hubs (2)
- [/grille-salaires-minima-batiment](https://outils.batup.fr/grille-salaires-minima-batiment)
- [/salaires-metiers-btp](https://outils.batup.fr/salaires-metiers-btp)

### Grille salaires — régions (9)
- [/grille-salaires-minima-batiment/auvergne-rhone-alpes](https://outils.batup.fr/grille-salaires-minima-batiment/auvergne-rhone-alpes)
- [/grille-salaires-minima-batiment/bretagne](https://outils.batup.fr/grille-salaires-minima-batiment/bretagne)
- [/grille-salaires-minima-batiment/centre-val-de-loire](https://outils.batup.fr/grille-salaires-minima-batiment/centre-val-de-loire)
- [/grille-salaires-minima-batiment/hauts-de-france](https://outils.batup.fr/grille-salaires-minima-batiment/hauts-de-france)
- [/grille-salaires-minima-batiment/ile-de-france](https://outils.batup.fr/grille-salaires-minima-batiment/ile-de-france)
- [/grille-salaires-minima-batiment/normandie](https://outils.batup.fr/grille-salaires-minima-batiment/normandie)
- [/grille-salaires-minima-batiment/nouvelle-aquitaine](https://outils.batup.fr/grille-salaires-minima-batiment/nouvelle-aquitaine)
- [/grille-salaires-minima-batiment/occitanie](https://outils.batup.fr/grille-salaires-minima-batiment/occitanie)
- [/grille-salaires-minima-batiment/pays-de-la-loire](https://outils.batup.fr/grille-salaires-minima-batiment/pays-de-la-loire)

### Fiches métier (salaire) (28)
- [/salaire-canalisateur](https://outils.batup.fr/salaire-canalisateur)
- [/salaire-carreleur](https://outils.batup.fr/salaire-carreleur)
- [/salaire-charpentier](https://outils.batup.fr/salaire-charpentier)
- [/salaire-chauffagiste](https://outils.batup.fr/salaire-chauffagiste)
- [/salaire-chef-de-chantier](https://outils.batup.fr/salaire-chef-de-chantier)
- [/salaire-coffreur-bancheur](https://outils.batup.fr/salaire-coffreur-bancheur)
- [/salaire-conducteur-de-travaux](https://outils.batup.fr/salaire-conducteur-de-travaux)
- [/salaire-cordiste](https://outils.batup.fr/salaire-cordiste)
- [/salaire-couvreur](https://outils.batup.fr/salaire-couvreur)
- [/salaire-couvreur-zingueur](https://outils.batup.fr/salaire-couvreur-zingueur)
- [/salaire-desamianteur](https://outils.batup.fr/salaire-desamianteur)
- [/salaire-dessinateur-projeteur](https://outils.batup.fr/salaire-dessinateur-projeteur)
- [/salaire-directeur-de-travaux](https://outils.batup.fr/salaire-directeur-de-travaux)
- [/salaire-economiste-de-la-construction](https://outils.batup.fr/salaire-economiste-de-la-construction)
- [/salaire-electricien](https://outils.batup.fr/salaire-electricien)
- [/salaire-etancheur](https://outils.batup.fr/salaire-etancheur)
- [/salaire-frigoriste](https://outils.batup.fr/salaire-frigoriste)
- [/salaire-geometre-topographe](https://outils.batup.fr/salaire-geometre-topographe)
- [/salaire-grutier](https://outils.batup.fr/salaire-grutier)
- [/salaire-ingenieur-genie-civil](https://outils.batup.fr/salaire-ingenieur-genie-civil)
- [/salaire-macon](https://outils.batup.fr/salaire-macon)
- [/salaire-menuisier](https://outils.batup.fr/salaire-menuisier)
- [/salaire-metreur](https://outils.batup.fr/salaire-metreur)
- [/salaire-peintre-en-batiment](https://outils.batup.fr/salaire-peintre-en-batiment)
- [/salaire-plaquiste](https://outils.batup.fr/salaire-plaquiste)
- [/salaire-plombier](https://outils.batup.fr/salaire-plombier)
- [/salaire-soudeur](https://outils.batup.fr/salaire-soudeur)
- [/salaire-tailleur-de-pierre](https://outils.batup.fr/salaire-tailleur-de-pierre)
