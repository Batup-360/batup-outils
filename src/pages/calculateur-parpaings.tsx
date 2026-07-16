import { PublicToolLayout } from '@/components/PublicToolLayout';
import { ParpaingsCalculator } from '@/components/ParpaingsCalculator';
import { parpaingsCopy } from '@/content/parpaings-copy';
import { parpaingsFAQ } from '@/content/parpaings-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurParpaings() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${parpaingsCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: parpaingsCopy.seo.title, description: parpaingsCopy.seo.description, canonicalUrl }}
      webApplicationName={parpaingsCopy.webApplication.name}
      webApplicationDescription={parpaingsCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de parpaings', url: canonicalUrl },
      ]}
      heroH1={parpaingsCopy.hero.h1}
      heroLede={parpaingsCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-parpaings`}
      ctaBannerTitle={parpaingsCopy.ctaBanner.title}
      ctaBannerSubtitle={parpaingsCopy.ctaBanner.subtitle}
      methodology={parpaingsCopy.methodology}
      faqItems={parpaingsFAQ}
    >
      <ParpaingsCalculator />
    </PublicToolLayout>
  );
}
