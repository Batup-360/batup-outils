import { PublicToolLayout } from '@/components/PublicToolLayout';
import { ChapeCalculator } from '@/components/ChapeCalculator';
import { chapeCopy } from '@/content/chape-copy';
import { chapeFAQ } from '@/content/chape-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurChape() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${chapeCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: chapeCopy.seo.title, description: chapeCopy.seo.description, canonicalUrl }}
      webApplicationName={chapeCopy.webApplication.name}
      webApplicationDescription={chapeCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de chape', url: canonicalUrl },
      ]}
      heroH1={chapeCopy.hero.h1}
      heroLede={chapeCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-chape`}
      ctaBannerTitle={chapeCopy.ctaBanner.title}
      ctaBannerSubtitle={chapeCopy.ctaBanner.subtitle}
      methodology={chapeCopy.methodology}
      faqItems={chapeFAQ}
    >
      <ChapeCalculator />
    </PublicToolLayout>
  );
}
