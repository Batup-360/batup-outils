import { PublicToolLayout } from '@/components/PublicToolLayout';
import { ConsommationCalculator } from '@/components/ConsommationCalculator';
import { consommationCopy } from '@/content/consommation-copy';
import { consommationFAQ } from '@/content/consommation-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurConsommationMateriaux() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${consommationCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: consommationCopy.seo.title, description: consommationCopy.seo.description, canonicalUrl }}
      webApplicationName={consommationCopy.webApplication.name}
      webApplicationDescription={consommationCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de consommation de matériaux', url: canonicalUrl },
      ]}
      heroH1={consommationCopy.hero.h1}
      heroLede={consommationCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-consommation-materiaux`}
      ctaBannerTitle={consommationCopy.ctaBanner.title}
      ctaBannerSubtitle={consommationCopy.ctaBanner.subtitle}
      methodology={consommationCopy.methodology}
      faqItems={consommationFAQ}
    >
      <ConsommationCalculator />
    </PublicToolLayout>
  );
}
