import { PublicToolLayout } from '@/components/PublicToolLayout';
import { HourlyRateCalculator } from '@/components/HourlyRateCalculator';
import { tauxHoraireCopy } from '@/content/taux-horaire-copy';
import { tauxHoraireFAQ } from '@/content/taux-horaire-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurTauxHoraire() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${tauxHoraireCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: tauxHoraireCopy.seo.title,
        description: tauxHoraireCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={tauxHoraireCopy.webApplication.name}
      webApplicationDescription={tauxHoraireCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de taux horaire BTP', url: canonicalUrl },
      ]}
      heroH1={tauxHoraireCopy.hero.h1}
      heroLede={tauxHoraireCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-taux-horaire`}
      ctaBannerTitle={tauxHoraireCopy.ctaBanner.title}
      ctaBannerSubtitle={tauxHoraireCopy.ctaBanner.subtitle}
      methodology={tauxHoraireCopy.methodology}
      faqItems={tauxHoraireFAQ}
    >
      <HourlyRateCalculator />
    </PublicToolLayout>
  );
}
