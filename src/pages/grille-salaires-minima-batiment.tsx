import { PublicToolLayout } from '@/components/PublicToolLayout';
import { GrilleSalairesCalculator } from '@/components/GrilleSalairesCalculator';
import { grilleSalairesCopy } from '@/content/grille-salaires-copy';
import { grilleSalairesFAQ } from '@/content/grille-salaires-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function GrilleSalairesMinimaBatiment() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${grilleSalairesCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: grilleSalairesCopy.seo.title, description: grilleSalairesCopy.seo.description, canonicalUrl }}
      webApplicationName={grilleSalairesCopy.webApplication.name}
      webApplicationDescription={grilleSalairesCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Grille des salaires minima du bâtiment', url: canonicalUrl },
      ]}
      heroH1={grilleSalairesCopy.hero.h1}
      heroLede={grilleSalairesCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=grille-salaires-minima-batiment`}
      ctaBannerTitle={grilleSalairesCopy.ctaBanner.title}
      ctaBannerSubtitle={grilleSalairesCopy.ctaBanner.subtitle}
      methodology={grilleSalairesCopy.methodology}
      faqItems={grilleSalairesFAQ}
    >
      <GrilleSalairesCalculator />
    </PublicToolLayout>
  );
}
