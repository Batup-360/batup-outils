import { PublicToolLayout } from '@/components/PublicToolLayout';
import { BetonCalculator } from '@/components/BetonCalculator';
import { betonCopy } from '@/content/beton-copy';
import { betonFAQ } from '@/content/beton-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurBeton() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${betonCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: betonCopy.seo.title, description: betonCopy.seo.description, canonicalUrl }}
      webApplicationName={betonCopy.webApplication.name}
      webApplicationDescription={betonCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de béton', url: canonicalUrl },
      ]}
      heroH1={betonCopy.hero.h1}
      heroLede={betonCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-beton`}
      ctaBannerTitle={betonCopy.ctaBanner.title}
      ctaBannerSubtitle={betonCopy.ctaBanner.subtitle}
      methodology={betonCopy.methodology}
      faqItems={betonFAQ}
    >
      <BetonCalculator />
    </PublicToolLayout>
  );
}
