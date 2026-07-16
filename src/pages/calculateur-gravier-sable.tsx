import { PublicToolLayout } from '@/components/PublicToolLayout';
import { GravierSableCalculator } from '@/components/GravierSableCalculator';
import { gravierSableCopy } from '@/content/gravier-sable-copy';
import { gravierSableFAQ } from '@/content/gravier-sable-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurGravierSable() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${gravierSableCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: gravierSableCopy.seo.title, description: gravierSableCopy.seo.description, canonicalUrl }}
      webApplicationName={gravierSableCopy.webApplication.name}
      webApplicationDescription={gravierSableCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de gravier et sable', url: canonicalUrl },
      ]}
      heroH1={gravierSableCopy.hero.h1}
      heroLede={gravierSableCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-gravier-sable`}
      ctaBannerTitle={gravierSableCopy.ctaBanner.title}
      ctaBannerSubtitle={gravierSableCopy.ctaBanner.subtitle}
      methodology={gravierSableCopy.methodology}
      faqItems={gravierSableFAQ}
    >
      <GravierSableCalculator />
    </PublicToolLayout>
  );
}
