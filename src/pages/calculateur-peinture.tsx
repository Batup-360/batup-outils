import { PublicToolLayout } from '@/components/PublicToolLayout';
import { PeintureCalculator } from '@/components/PeintureCalculator';
import { peintureCopy } from '@/content/peinture-copy';
import { peintureFAQ } from '@/content/peinture-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPeinture() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${peintureCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: peintureCopy.seo.title, description: peintureCopy.seo.description, canonicalUrl }}
      webApplicationName={peintureCopy.webApplication.name}
      webApplicationDescription={peintureCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de peinture', url: canonicalUrl },
      ]}
      heroH1={peintureCopy.hero.h1}
      heroLede={peintureCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-peinture`}
      ctaBannerTitle={peintureCopy.ctaBanner.title}
      ctaBannerSubtitle={peintureCopy.ctaBanner.subtitle}
      methodology={peintureCopy.methodology}
      faqItems={peintureFAQ}
    >
      <PeintureCalculator />
    </PublicToolLayout>
  );
}
