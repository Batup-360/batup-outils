import { PublicToolLayout } from '@/components/PublicToolLayout';
import { VolumeCalculator } from '@/components/VolumeCalculator';
import { volumeCopy } from '@/content/volume-copy';
import { volumeFAQ } from '@/content/volume-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurVolume() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${volumeCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: volumeCopy.seo.title, description: volumeCopy.seo.description, canonicalUrl }}
      webApplicationName={volumeCopy.webApplication.name}
      webApplicationDescription={volumeCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de volume', url: canonicalUrl },
      ]}
      heroH1={volumeCopy.hero.h1}
      heroLede={volumeCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-volume`}
      ctaBannerTitle={volumeCopy.ctaBanner.title}
      ctaBannerSubtitle={volumeCopy.ctaBanner.subtitle}
      methodology={volumeCopy.methodology}
      faqItems={volumeFAQ}
    >
      <VolumeCalculator />
    </PublicToolLayout>
  );
}
