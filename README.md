# batup-outils

Standalone lead-magnet calculators for [outils.batup.fr](https://outils.batup.fr).

Tiny Vite + React + Tailwind app deployed to **Cloudflare Pages**. No backend, no DB — just pure client-side math wrapped in SEO-optimized French BTP content.

## Pages

- `/` — index of both tools
- `/calculateur-taux-horaire-btp` — coût de revient + taux à facturer
- `/calculateur-prix-chantier-btp` — quote estimator with rentable / limite / perte verdict

## Architecture

Why split from the main [batup](https://github.com/jonathanadam3114/batup) SaaS repo?
- ~50KB total bundle vs ~1MB in the SaaS bundle
- 30-second deploys vs ~5-minute CI
- Different cadence — marketing iterates faster than the app
- Cleaner domain authority for SEO

Trade-off: ~5 lines of pricing math (`calculateBillableHourlyRate`, `VERDICT_LIMIT_MARGIN_PCT`) are duplicated in `src/lib/pricing.ts`. They never change (set by accounting reality), so the duplication is cheap.

## Development

```bash
npm install
npm run dev          # localhost:5173
npm run build        # → dist/
npm run preview      # serve dist/
npm run typecheck
```

## Deploy

Pushed to `main` → Cloudflare Pages auto-builds and deploys to `outils.batup.fr`.

- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20

## URL contracts

The calculator CTAs link to the SaaS app at `https://app.batup.fr/signup?source=…` (so cookies/sessions land on the right host). Marketing nav links go to `https://www.batup.fr`. These hosts are hardcoded in `src/lib/urls.ts`.
