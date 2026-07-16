import { PublicToolLayout } from '@/components/PublicToolLayout';
import { PapierPeintCalculator } from '@/components/PapierPeintCalculator';
import { papierPeintCopy } from '@/content/papier-peint-copy';
import { papierPeintFAQ } from '@/content/papier-peint-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPapierPeint() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${papierPeintCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: papierPeintCopy.seo.title, description: papierPeintCopy.seo.description, canonicalUrl }}
      webApplicationName={papierPeintCopy.webApplication.name}
      webApplicationDescription={papierPeintCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de papier peint', url: canonicalUrl },
      ]}
      heroH1={papierPeintCopy.hero.h1}
      heroLede={papierPeintCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-papier-peint`}
      ctaBannerTitle={papierPeintCopy.ctaBanner.title}
      ctaBannerSubtitle={papierPeintCopy.ctaBanner.subtitle}
      methodology={papierPeintCopy.methodology}
      faqItems={papierPeintFAQ}
    >
      <PapierPeintCalculator />
    </PublicToolLayout>
  );
}
