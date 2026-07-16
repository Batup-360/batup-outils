import { PublicToolLayout } from '@/components/PublicToolLayout';
import { PlacoCalculator } from '@/components/PlacoCalculator';
import { placoCopy } from '@/content/placo-copy';
import { placoFAQ } from '@/content/placo-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPlaco() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${placoCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: placoCopy.seo.title, description: placoCopy.seo.description, canonicalUrl }}
      webApplicationName={placoCopy.webApplication.name}
      webApplicationDescription={placoCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de placo', url: canonicalUrl },
      ]}
      heroH1={placoCopy.hero.h1}
      heroLede={placoCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-placo`}
      ctaBannerTitle={placoCopy.ctaBanner.title}
      ctaBannerSubtitle={placoCopy.ctaBanner.subtitle}
      methodology={placoCopy.methodology}
      faqItems={placoFAQ}
    >
      <PlacoCalculator />
    </PublicToolLayout>
  );
}
