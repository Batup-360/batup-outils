# AGENTS.md — batup-outils

Guide for AI coding agents. How this app is built and, above all, **how to add a new free tool** end to end.

## What this is

Standalone lead-magnet calculators for `outils.batup.fr`. Vite + React 18 SPA (client-only `createRoot`, router = `wouter`), prerendered to static HTML for SEO, deployed on **Cloudflare Pages** (auto-deploy on push to `main`). One Cloudflare Pages Function (`functions/api/subscribe.ts`) handles the email capture → Brevo.

- **Build**: `npm run build` = `tsc -b && vite build && tsx scripts/prerender.ts`. Prerender writes one static `.html` per SEO route + one bare `/embed/<slug>` shell (noindex) + home + 404. Expect `wrote N static pages` where `N = tools×2 + 1`.
- **Tests**: `npm test` (vitest). Pure math lives in `src/lib/*-math.ts` with colocated `*.test.ts`.
- **Prod deploy**: push to `main`. GA4 (`G-8NVKZYY1SE`) is baked in `src/lib/analytics.ts`, fires only on `*.batup.fr`, skipped in `/embed` iframes.

## Tool catalog (41 tools)

What already exists — check here before building to avoid duplicates. Slug = URL path (minus leading `/`) and the identifier used everywhere (see invariant). `Q` = built on the shared `QuantiteCalculator` engine; `B` = bespoke component.

### Pricing & marge
| slug | eng | what it does |
|---|:-:|---|
| `calculateur-taux-horaire-btp` | B | Taux horaire à facturer pour couvrir charges + dégager une marge |
| `calculateur-prix-chantier-btp` | B | Prix de vente d'un chantier : déboursé sec + frais généraux + marge |
| `calculateur-marge-nette-coefficient-btp` | B | Conversion coefficient ↔ marge nette + prix de vente correspondant |
| `calculateur-revision-prix-index-bt` | B | Coefficient de révision CCAG-Travaux via les index BT (INSEE) |

### Paie & RH
| slug | eng | what it does |
|---|:-:|---|
| `calculateur-heures-supplementaires-btp` | B | Majorations d'heures sup + paniers/trajets BTP |
| `calculateur-cout-salarie-btp` | B | Coût total employeur (brut + charges patronales, CIBTP) |
| `calculateur-jours-intemperies-cibtp` | B | Indemnisation intempéries CIBTP (75 %, carence, plafond) |
| `calculateur-prime-anciennete-ccn-batiment` | B | Prime d'ancienneté selon coefficient + ancienneté (CCN Bâtiment) |

### Fiscal & légal
| slug | eng | what it does |
|---|:-:|---|
| `calculateur-tva` | B | Conversion TVA HT ↔ TTC, multi-taux |
| `calculateur-tva-autoliquidation-btp` | B | Montant HT sous-traitance + mention autoliquidation |
| `generateur-mention-tva-facture-btp` | B | Génère la mention légale de taux réduit (5,5 / 10 / 20 %) |
| `generateur-attestation-tva` | B | Mention de certification taux réduit (formulation BOFiP 2025) |
| `calculateur-charges-sociales-artisan-btp` | B | Cotisations selon statut (micro / EURL…), option ACRE |
| `comparateur-statut-juridique-artisan-btp` | B | Compare micro-entreprise / EI / EURL / SASU pour un artisan |
| `verificateur-mentions-obligatoires-facture-devis-btp` | B | Checklist conformité facture + devis BTP |

### Trésorerie & marchés
| slug | eng | what it does |
|---|:-:|---|
| `calculateur-situation-travaux` | B | Montant à facturer = avancement − déjà facturé − retenue |
| `calculateur-dgd-decompte-general-definitif` | B | Solde final d'un marché (décompte général définitif) |
| `calculateur-retenue-de-garantie` | B | Retenue de garantie 5 % + alternative caution bancaire |

### Assurances & aides
| slug | eng | what it does |
|---|:-:|---|
| `simulateur-decennale-btp` | B | Fourchette de prix garantie décennale par métier |
| `simulateur-rc-pro-btp` | B | Fourchette de prix RC Pro BTP |
| `calculateur-roi-certification-rge` | B | Rentabilité (ROI) de la certification RGE |

### Métré & quantités
| slug | eng | what it does |
|---|:-:|---|
| `calculateur-beton` | B | Volume de béton + sacs (dalle, semelle, poteau) |
| `calculateur-surface` | B | Surface multi-zones en m² (loi Carrez / Boutin) |
| `calculateur-volume` | B | Volume en m³ |
| `calculateur-escalier` | B | Nombre de marches, hauteur/giron (loi de Blondel) |
| `calculateur-mortier` | B | Dosage ciment / sable / eau du mortier |
| `calculateur-chape` | B | Volume de chape + sacs |
| `calculateur-pente-toiture` | B | Conversion % ↔ degrés ↔ longueur de rampant |
| `calculateur-papier-peint` | B | Nombre de rouleaux / lés |
| `calculateur-parpaings` | Q | Blocs au m² + mortier |
| `calculateur-briques` | Q | Briques au m² selon le format |
| `calculateur-placo` | Q | Plaques BA13 + vis + rails + bande/enduit à joint |
| `calculateur-carrelage` | Q | Carreaux + colle + joint |
| `calculateur-parquet` | Q | Paquets + sous-couche |
| `calculateur-terrasse` | Q | Lames + lambourdes + vis + plots |
| `calculateur-isolant` | Q | Rouleaux + épaisseur conseillée (e = λ × R) |
| `calculateur-peinture` | Q | Litres selon surface + nombre de couches |
| `calculateur-consommation-materiaux` | Q | Consommation au m² (colle, enduit, primaire, ragréage) |
| `calculateur-tuiles` | Q | Nombre de tuiles selon type (mécanique/plate/canal) + surface des pans |
| `calculateur-gravier-sable` | Q | Volume (m³) → tonnage de gravier / sable / tout-venant |
| `calculateur-enduit-facade` | Q | Enduit de façade en kg + sacs de 25 kg (monocouche, gobetis…) |

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

### 10. Sitemap — `public/sitemap.xml`
```xml
<url><loc>https://outils.batup.fr/calculateur-foo</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>
```

### 11. Email astuce — `functions/api/subscribe.ts`
Add the slug to `TOOL_ASTUCE` with the right family (`metre | pricing | paie | fiscal | cash | assurance`) so the result email pitches the relevant BatUp product:
```ts
'calculateur-foo': 'metre',
```

## Handled automatically (do NOT hand-edit)
- Static SEO page + `/embed/<slug>` shell + JSON-LD → `scripts/prerender.ts` reads `SEO_ROUTES`.
- Internal-link nav hub → also from `SEO_ROUTES`.
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
