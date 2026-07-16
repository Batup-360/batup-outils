import { PublicToolLayout } from '@/components/PublicToolLayout';
import { TuilesCalculator } from '@/components/TuilesCalculator';
import { tuilesCopy } from '@/content/tuiles-copy';
import { tuilesFAQ } from '@/content/tuiles-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurTuiles() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${tuilesCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: tuilesCopy.seo.title, description: tuilesCopy.seo.description, canonicalUrl }}
      webApplicationName={tuilesCopy.webApplication.name}
      webApplicationDescription={tuilesCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de tuiles', url: canonicalUrl },
      ]}
      heroH1={tuilesCopy.hero.h1}
      heroLede={tuilesCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-tuiles`}
      ctaBannerTitle={tuilesCopy.ctaBanner.title}
      ctaBannerSubtitle={tuilesCopy.ctaBanner.subtitle}
      methodology={tuilesCopy.methodology}
      faqItems={tuilesFAQ}
    >
      <TuilesCalculator />
    </PublicToolLayout>
  );
}
