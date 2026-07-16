import { PublicToolLayout } from '@/components/PublicToolLayout';
import { TvaCalculator } from '@/components/TvaCalculator';
import { tvaCopy } from '@/content/tva-copy';
import { tvaFAQ } from '@/content/tva-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurTva() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${tvaCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: tvaCopy.seo.title, description: tvaCopy.seo.description, canonicalUrl }}
      webApplicationName={tvaCopy.webApplication.name}
      webApplicationDescription={tvaCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de TVA', url: canonicalUrl },
      ]}
      heroH1={tvaCopy.hero.h1}
      heroLede={tvaCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-tva`}
      ctaBannerTitle={tvaCopy.ctaBanner.title}
      ctaBannerSubtitle={tvaCopy.ctaBanner.subtitle}
      methodology={tvaCopy.methodology}
      faqItems={tvaFAQ}
    >
      <TvaCalculator />
    </PublicToolLayout>
  );
}
