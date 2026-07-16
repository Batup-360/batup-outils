import { PublicToolLayout } from '@/components/PublicToolLayout';
import { TerrasseCalculator } from '@/components/TerrasseCalculator';
import { terrasseCopy } from '@/content/terrasse-copy';
import { terrasseFAQ } from '@/content/terrasse-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurTerrasse() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${terrasseCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: terrasseCopy.seo.title, description: terrasseCopy.seo.description, canonicalUrl }}
      webApplicationName={terrasseCopy.webApplication.name}
      webApplicationDescription={terrasseCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de terrasse', url: canonicalUrl },
      ]}
      heroH1={terrasseCopy.hero.h1}
      heroLede={terrasseCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-terrasse`}
      ctaBannerTitle={terrasseCopy.ctaBanner.title}
      ctaBannerSubtitle={terrasseCopy.ctaBanner.subtitle}
      methodology={terrasseCopy.methodology}
      faqItems={terrasseFAQ}
    >
      <TerrasseCalculator />
    </PublicToolLayout>
  );
}
