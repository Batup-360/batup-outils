import { useParams } from 'wouter';
import { PublicToolLayout } from '@/components/PublicToolLayout';
import { GrilleSalairesCalculator } from '@/components/GrilleSalairesCalculator';
import { grilleSalairesCopy } from '@/content/grille-salaires-copy';
import { grilleSalairesFAQ } from '@/content/grille-salaires-faq';
import { REGIONS, getRegion } from '@/lib/grille-salaires-btp';
import { APP_BASE, siteOrigin } from '@/lib/urls';

const BASE_PATH = '/grille-salaires-minima-batiment';

export default function GrilleSalairesMinimaBatiment() {
  const params = useParams<{ region?: string }>();
  const base = siteOrigin();

  // Une région valide dans l'URL → page programmatique « query × région ».
  const known = params.region ? REGIONS.some((r) => r.key === params.region) : false;
  const region = known ? getRegion(params.region) : null;

  const canonicalUrl = region ? `${base}${BASE_PATH}/${region.key}` : `${base}${BASE_PATH}`;
  const title = region
    ? `Grille des salaires minima du bâtiment en ${region.label} 2026 | Batup`
    : grilleSalairesCopy.seo.title;
  const description = region
    ? `Salaires minima conventionnels du bâtiment en ${region.label} 2026 : ouvriers, ETAM et cadres, par niveau et coefficient. Grille datée et sourcée, gratuit.`
    : grilleSalairesCopy.seo.description;
  const h1 = region
    ? `Grille des salaires minima du bâtiment en ${region.label} 2026`
    : grilleSalairesCopy.hero.h1;
  const lede = region
    ? `Salaires minima conventionnels des ouvriers, ETAM et cadres du bâtiment en ${region.label}. Choisissez la catégorie et le poste : minimum brut mensuel, annuel et taux horaire. Grille datée et sourcée, gratuit.`
    : grilleSalairesCopy.hero.lede;

  const breadcrumb = region
    ? [
        { name: 'Accueil', url: base + '/' },
        { name: 'Grille des salaires minima du bâtiment', url: `${base}${BASE_PATH}` },
        { name: region.label, url: canonicalUrl },
      ]
    : [
        { name: 'Accueil', url: base + '/' },
        { name: 'Grille des salaires minima du bâtiment', url: canonicalUrl },
      ];

  return (
    <PublicToolLayout
      seo={{ title, description, canonicalUrl }}
      webApplicationName={grilleSalairesCopy.webApplication.name}
      webApplicationDescription={grilleSalairesCopy.webApplication.description}
      breadcrumb={breadcrumb}
      heroH1={h1}
      heroLede={lede}
      signupHref={`${APP_BASE}/signup?source=grille-salaires-minima-batiment`}
      ctaBannerTitle={grilleSalairesCopy.ctaBanner.title}
      ctaBannerSubtitle={grilleSalairesCopy.ctaBanner.subtitle}
      methodology={grilleSalairesCopy.methodology}
      faqItems={grilleSalairesFAQ}
    >
      <GrilleSalairesCalculator regionKey={region?.key} />
    </PublicToolLayout>
  );
}
