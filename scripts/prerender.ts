/**
 * Build-time prerender for the batup-outils SPA.
 *
 * Runs AFTER `vite build` (see package.json `build` script). For each route in
 * the SEO manifest it rewrites `dist/index.html` into a per-route static file
 * with full <head> SEO (title, description, canonical, OG, Twitter, JSON-LD)
 * plus a visible pre-hydration HTML block inside #root so search engines and AI
 * crawlers get the real text content without executing JS.
 *
 * React mounts with `createRoot().render()` (NOT hydrateRoot — see src/main.tsx),
 * so this static markup is simply replaced on mount: no hydration mismatch.
 *
 * Node built-ins only; ESM (package is `type: module`).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_ROUTES, type SeoRoute } from '../src/seo-manifest';
import { REGIONS, CADRES_NATIONAL, minimumApplicable, getRegion, type Region, type CategorieGrille } from '../src/lib/grille-salaires-btp';
import { grilleSalairesCopy } from '../src/content/grille-salaires-copy';
import { grilleSalairesFAQ } from '../src/content/grille-salaires-faq';

import { METIERS } from '../src/lib/salaires-metiers-btp';
import { salairesMetiersCopy } from '../src/content/salaires-metiers-copy';
import { salairesMetiersFAQ } from '../src/content/salaires-metiers-faq';

/** Hub + pages programmatiques « salaire <métier> » : une par métier. */
const METIER_ROUTES: SeoRoute[] = [
  {
    path: salairesMetiersCopy.hub.canonicalPath,
    title: salairesMetiersCopy.hub.seoTitle,
    description: salairesMetiersCopy.hub.seoDescription,
    webApplicationName: 'Salaires par métier du BTP',
    webApplicationDescription: salairesMetiersCopy.hub.seoDescription,
    breadcrumbName: 'Salaires par métier BTP',
    h1: salairesMetiersCopy.hub.h1,
    lede: salairesMetiersCopy.hub.lede,
    methodology: salairesMetiersCopy.methodology,
    faq: salairesMetiersFAQ,
  },
  ...METIERS.map((m) => {
    const lbl = m.label.toLowerCase();
    return {
      path: `/salaire-${m.slug}`,
      title: `Salaire ${lbl} 2026 : combien gagne ${m.article} ${lbl} ? | Batup`,
      description: `Combien gagne ${m.article} ${lbl} dans le BTP en 2026 ? Salaire net de début de carrière, brut estimé et niveau conventionnel du bâtiment. Gratuit.`,
      webApplicationName: `Salaire ${lbl} 2026`,
      webApplicationDescription: `Salaire ${m.article} ${lbl} dans le bâtiment en 2026.`,
      breadcrumbName: `Salaire ${m.label}`,
      h1: `Salaire ${lbl} en 2026`,
      lede: `${m.article.charAt(0).toUpperCase() + m.article.slice(1)} ${lbl} débutant gagne environ ${m.debutantNet} € net/mois (~${Math.round(m.debutantNet / 0.78)} € brut), classé ${m.niveauConventionnel}. Combien gagne ${m.article} ${lbl} en 2026 : salaire net, brut estimé et minimum conventionnel du bâtiment.`,
      methodology: salairesMetiersCopy.methodology,
      faq: salairesMetiersFAQ,
    };
  }),
];

/** Tableau HTML statique d'une grille (crawlable + citable par les moteurs IA). */
function grilleTable(title: string, grille: CategorieGrille): string {
  const hasCoeff = grille.lignes.some((l) => l.coefficient);
  const rows = grille.lignes
    .map((l) => {
      const m = minimumApplicable(grille, l);
      return `<tr><td>${escapeHtml(l.label)}</td>${hasCoeff ? `<td>${l.coefficient ?? '—'}</td>` : ''}<td>${Math.round(m.montant)} €${m.smicApplique ? ' (SMIC)' : ''}</td></tr>`;
    })
    .join('');
  return `<h3>${escapeHtml(title)}</h3><p>En vigueur au ${escapeHtml(grille.dateEffet)} — ${escapeHtml(grille.accord)}. Base ${escapeHtml(grille.baseLabel)}.</p><table><thead><tr><th>Poste</th>${hasCoeff ? '<th>Coefficient</th>' : ''}<th>Minimum brut mensuel</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function grilleTablesHtml(region: Region): string {
  const parts: string[] = [];
  if (region.ouvriers) parts.push(grilleTable(`Ouvriers du bâtiment — ${region.label}`, region.ouvriers));
  if (region.etam) parts.push(grilleTable(`ETAM du bâtiment — ${region.label}`, region.etam));
  parts.push(grilleTable('Cadres du bâtiment — grille nationale', CADRES_NATIONAL));
  return `<section>${parts.join('')}</section>`;
}

/** Pages programmatiques « grille salaires × région » : une par région. */
const GRILLE_REGION_ROUTES: SeoRoute[] = REGIONS.map((r) => ({
  path: `/grille-salaires-minima-batiment/${r.key}`,
  title: `Grille des salaires BTP ${r.label} 2026 | Batup`,
  description: `Grille des salaires BTP en ${r.label} 2026 : minima conventionnels du bâtiment (ouvriers, ETAM, cadres) par niveau et coefficient. Daté et sourcé, gratuit.`,
  webApplicationName: grilleSalairesCopy.webApplication.name,
  webApplicationDescription: grilleSalairesCopy.webApplication.description,
  breadcrumbName: `Grille salaires BTP ${r.label}`,
  h1: `Grille des salaires BTP en ${r.label} 2026`,
  lede: `Salaires minima conventionnels des ouvriers, ETAM et cadres du bâtiment en ${r.label}. Choisissez la catégorie et le poste pour obtenir le minimum brut mensuel, annuel et le taux horaire. Grille datée et sourcée, gratuit.`,
  methodology: grilleSalairesCopy.methodology,
  faq: grilleSalairesFAQ,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://outils.batup.fr';
const OG_IMAGE = SITE + '/assets/logo-batup-marketing.png';

// Home page SEO — mirrors the <SEOHead> values in src/pages/home.tsx.
const HOME = {
  title:
    '38 outils BTP gratuits — calculateurs taux horaire, marge, TVA, béton, carrelage, peinture, paie, décennale | Batup',
  description:
    '38 calculateurs gratuits pour artisans et PME du BTP : taux horaire, marge, TVA, béton, mortier, carrelage, placo, peinture, parpaings, surface, volume, escalier, pente de toiture, paie, charges sociales, DGD, décennale, RC Pro, RGE. Sans inscription.',
  h1: '38 outils BTP gratuits',
  lede: "Pricing, paie, fiscalité, trésorerie, assurances, métré : tous les calculs critiques d'une entreprise BTP, dans un outil dédié pour chacun. Sans inscription, sans installation, en quelques secondes.",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Replace the <title> contents in the template. */
function setTitle(html: string, title: string): string {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
}

/** Insert markup immediately before </head>. */
function injectHead(html: string, head: string): string {
  return html.replace('</head>', `${head}\n  </head>`);
}

/** Insert markup between <div id="root"> and its closing tag. */
function injectRoot(html: string, body: string): string {
  return html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${body}</div>`
  );
}

/**
 * Strip the template's default per-route-overridable meta so each prerendered
 * page ends up with exactly ONE description / og:* / twitter:* of each kind.
 * Keeps static brand tags (og:site_name, charset, viewport, icon, theme-color).
 */
function stripTemplateMeta(html: string): string {
  const patterns: RegExp[] = [
    /\s*<meta\s+name="description"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:type"[^>]*>/gi,
    /\s*<meta\s+property="og:locale"[^>]*>/gi,
    /\s*<meta\s+property="og:title"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:description"[\s\S]*?>/gi,
    /\s*<meta\s+property="og:image"[^>]*>/gi,
    /\s*<meta\s+name="twitter:card"[^>]*>/gi,
    /\s*<meta\s+name="twitter:image"[^>]*>/gi,
  ];
  return patterns.reduce((acc, re) => acc.replace(re, ''), html);
}

function jsonLdScript(obj: unknown): string {
  // JSON.stringify already escapes the dangerous characters for a <script> JSON
  // context except the closing-tag sequence; guard against `</script>`.
  const json = JSON.stringify(obj).replace(/<\//g, '<\\/');
  return `<script type="application/ld+json">${json}</script>`;
}

/** The full 19-route internal-link hub, rendered on every page. */
function navHub(): string {
  const links = SEO_ROUTES.map(
    (r) => `<a href="${r.path}">${escapeHtml(r.breadcrumbName)}</a>`
  ).join('');
  return `<nav aria-label="Tous les outils BTP">${links}</nav>`;
}

function headMeta(opts: {
  title: string;
  description: string;
  url: string;
}): string {
  const { title, description, url } = opts;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  return [
    `<meta name="description" content="${d}">`,
    `<link rel="canonical" href="${url}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:title" content="${t}">`,
    `<meta property="og:description" content="${d}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${t}">`,
    `<meta name="twitter:description" content="${d}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`,
  ]
    .map((line) => `    ${line}`)
    .join('\n');
}

function routeJsonLd(route: SeoRoute, url: string): string {
  const webApplication = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: route.webApplicationName,
    description: route.webApplicationDescription,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    inLanguage: 'fr-FR',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };
  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: route.faq.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: route.breadcrumbName, item: url },
    ],
  };
  return [jsonLdScript(webApplication), jsonLdScript(faqPage), jsonLdScript(breadcrumb)]
    .map((line) => `    ${line}`)
    .join('\n');
}

function routeBodyContent(route: SeoRoute): string {
  const parts: string[] = [];
  parts.push(`<h1>${escapeHtml(route.h1)}</h1>`);
  parts.push(`<p>${escapeHtml(route.lede)}</p>`);

  parts.push(`<h2>${escapeHtml(route.methodology.title)}</h2>`);
  if (route.methodology.intro) {
    parts.push(`<p>${escapeHtml(route.methodology.intro)}</p>`);
  }
  for (const block of route.methodology.blocks) {
    parts.push(`<h3>${escapeHtml(block.heading)}</h3><p>${escapeHtml(block.body)}</p>`);
  }

  const faq = route.faq
    .map(
      (q) =>
        `<details><summary>${escapeHtml(q.question)}</summary><p>${escapeHtml(
          q.answer
        )}</p></details>`
    )
    .join('');
  parts.push(`<section><h2>Questions fréquentes</h2>${faq}</section>`);

  parts.push(navHub());
  return parts.join('');
}

function writePage(relPath: string, html: string): void {
  // Home → dist/index.html (served at "/").
  // Tool route '/foo' → dist/foo.html, which Cloudflare Pages serves at the
  // clean no-slash URL "/foo" with a 200 (matching our canonical + sitemap +
  // internal links). Writing dist/foo/index.html instead would make Pages
  // 308-redirect "/foo" → "/foo/", creating a canonical/served-URL mismatch.
  if (relPath === '/') {
    fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');
    return;
  }
  const file = path.join(DIST, `${relPath.replace(/^\//, '')}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
}

function main(): void {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath} — run "vite build" first.`);
  }
  const template = stripTemplateMeta(fs.readFileSync(templatePath, 'utf8'));

  let count = 0;

  // Per-tool routes.
  for (const route of SEO_ROUTES) {
    const url = SITE + route.path;
    let html = setTitle(template, route.title);
    html = injectHead(html, headMeta({ title: route.title, description: route.description, url }));
    html = injectHead(html, routeJsonLd(route, url));
    // La page grille de base affiche la grille par défaut (Île-de-France) en
    // HTML statique — sinon les tableaux ne seraient rendus qu'en JS.
    const body =
      route.path === '/grille-salaires-minima-batiment'
        ? routeBodyContent(route) + grilleTablesHtml(getRegion(undefined))
        : routeBodyContent(route);
    html = injectRoot(html, body);
    writePage(route.path, html);
    count++;
  }

  // Bare embed shells (interactive, no SEO) for iframe use inside the Batup app.
  // Served at /embed/<slug> with a 200; the SPA boots and renders the calculator
  // alone (no nav/hero/footer) via the /embed/:slug route.
  for (const route of SEO_ROUTES) {
    const slug = route.path.replace(/^\//, '');
    let html = setTitle(template, 'Batup — outil intégré');
    html = injectHead(html, '    <meta name="robots" content="noindex, nofollow">');
    writePage(`/embed/${slug}`, html);
    count++;
  }

  // Pages programmatiques « grille salaires × région ».
  let regionCount = 0;
  GRILLE_REGION_ROUTES.forEach((route, i) => {
    const url = SITE + route.path;
    let html = setTitle(template, route.title);
    html = injectHead(html, headMeta({ title: route.title, description: route.description, url }));
    html = injectHead(html, routeJsonLd(route, url));
    html = injectRoot(html, routeBodyContent(route) + grilleTablesHtml(REGIONS[i]));
    writePage(route.path, html);
    regionCount++;
  });

  // Pages programmatiques « salaire <métier> » + hub.
  for (const route of METIER_ROUTES) {
    const url = SITE + route.path;
    let html = setTitle(template, route.title);
    html = injectHead(html, headMeta({ title: route.title, description: route.description, url }));
    html = injectHead(html, routeJsonLd(route, url));
    html = injectRoot(html, routeBodyContent(route));
    writePage(route.path, html);
    regionCount++;
  }

  // Home page (dist/index.html) — regenerated last so it overwrites the template.
  {
    const url = SITE + '/';
    let html = setTitle(template, HOME.title);
    html = injectHead(html, headMeta({ title: HOME.title, description: HOME.description, url }));
    const body = `<h1>${escapeHtml(HOME.h1)}</h1><p>${escapeHtml(HOME.lede)}</p>${navHub()}`;
    html = injectRoot(html, body);
    writePage('/', html);
    count++;
  }

  // 404 fallback (dist/404.html). Cloudflare Pages serves this for any path
  // that doesn't match a prerendered file — the SPA boots with an empty #root
  // and wouter renders <NotFound>. This REPLACES the old `_redirects`
  // `/* /index.html 200` catch-all, which incorrectly overrode every
  // per-route prerendered file with the generic root shell.
  {
    let html = setTitle(
      template,
      'Page introuvable — Outils BTP gratuits | Batup'
    );
    html = injectHead(
      html,
      headMeta({
        title: 'Page introuvable | Batup',
        description: 'Cette page n’existe pas. Découvrez les outils BTP gratuits de Batup.',
        url: SITE + '/404',
      })
    );
    html = injectRoot(html, `<h1>Page introuvable</h1>${navHub()}`);
    fs.writeFileSync(path.join(DIST, '404.html'), html, 'utf8');
  }

  // Sitemap généré depuis les routes (source unique = les tableaux de données ;
  // ajouter un outil/métier/région met le sitemap à jour automatiquement).
  const sitemapUrls = [
    { loc: '/', priority: '0.8' },
    ...SEO_ROUTES.map((r) => ({ loc: r.path, priority: '0.9' })),
    ...METIER_ROUTES.map((r) => ({ loc: r.path, priority: '0.8' })),
    ...GRILLE_REGION_ROUTES.map((r) => ({ loc: r.path, priority: '0.8' })),
  ];
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapUrls
      .map(
        (u) =>
          `  <url><loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc><changefreq>monthly</changefreq><priority>${u.priority}</priority></url>`,
      )
      .join('\n') +
    '\n</urlset>\n';
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  console.log(
    `[prerender] wrote ${count} static pages (${SEO_ROUTES.length} tools + 1 home) + ${regionCount} programmatic pages (régions + métiers) + 404.html + sitemap.xml (${sitemapUrls.length} URLs)`
  );
}

main();
