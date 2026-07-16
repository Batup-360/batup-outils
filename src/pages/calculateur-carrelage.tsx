import { PublicToolLayout } from '@/components/PublicToolLayout';
import { CarrelageCalculator } from '@/components/CarrelageCalculator';
import { carrelageCopy } from '@/content/carrelage-copy';
import { carrelageFAQ } from '@/content/carrelage-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurCarrelage() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${carrelageCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: carrelageCopy.seo.title, description: carrelageCopy.seo.description, canonicalUrl }}
      webApplicationName={carrelageCopy.webApplication.name}
      webApplicationDescription={carrelageCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de carrelage', url: canonicalUrl },
      ]}
      heroH1={carrelageCopy.hero.h1}
      heroLede={carrelageCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-carrelage`}
      ctaBannerTitle={carrelageCopy.ctaBanner.title}
      ctaBannerSubtitle={carrelageCopy.ctaBanner.subtitle}
      methodology={carrelageCopy.methodology}
      faqItems={carrelageFAQ}
    >
      <CarrelageCalculator />
    </PublicToolLayout>
  );
}
