import { PublicToolLayout } from '@/components/PublicToolLayout';
import { PenteToitureCalculator } from '@/components/PenteToitureCalculator';
import { penteToitureCopy } from '@/content/pente-toiture-copy';
import { penteToitureFAQ } from '@/content/pente-toiture-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPenteToiture() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${penteToitureCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: penteToitureCopy.seo.title, description: penteToitureCopy.seo.description, canonicalUrl }}
      webApplicationName={penteToitureCopy.webApplication.name}
      webApplicationDescription={penteToitureCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de pente de toiture', url: canonicalUrl },
      ]}
      heroH1={penteToitureCopy.hero.h1}
      heroLede={penteToitureCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-pente-toiture`}
      ctaBannerTitle={penteToitureCopy.ctaBanner.title}
      ctaBannerSubtitle={penteToitureCopy.ctaBanner.subtitle}
      methodology={penteToitureCopy.methodology}
      faqItems={penteToitureFAQ}
    >
      <PenteToitureCalculator />
    </PublicToolLayout>
  );
}
