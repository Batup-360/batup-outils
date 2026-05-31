import { PublicToolLayout } from '@/components/PublicToolLayout';
import { MargeNetteCalculator } from '@/components/MargeNetteCalculator';
import { margeNetteCopy } from '@/content/marge-nette-copy';
import { margeNetteFAQ } from '@/content/marge-nette-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurMargeNette() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${margeNetteCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: margeNetteCopy.seo.title,
        description: margeNetteCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={margeNetteCopy.webApplication.name}
      webApplicationDescription={margeNetteCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de marge nette et coefficient BTP', url: canonicalUrl },
      ]}
      heroH1={margeNetteCopy.hero.h1}
      heroLede={margeNetteCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-marge-nette-coefficient`}
      ctaBannerTitle={margeNetteCopy.ctaBanner.title}
      ctaBannerSubtitle={margeNetteCopy.ctaBanner.subtitle}
      methodology={margeNetteCopy.methodology}
      faqItems={margeNetteFAQ}
    >
      <MargeNetteCalculator />
    </PublicToolLayout>
  );
}
