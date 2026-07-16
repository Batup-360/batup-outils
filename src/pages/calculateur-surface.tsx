import { PublicToolLayout } from '@/components/PublicToolLayout';
import { SurfaceCalculator } from '@/components/SurfaceCalculator';
import { surfaceCopy } from '@/content/surface-copy';
import { surfaceFAQ } from '@/content/surface-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurSurface() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${surfaceCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: surfaceCopy.seo.title, description: surfaceCopy.seo.description, canonicalUrl }}
      webApplicationName={surfaceCopy.webApplication.name}
      webApplicationDescription={surfaceCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de surface', url: canonicalUrl },
      ]}
      heroH1={surfaceCopy.hero.h1}
      heroLede={surfaceCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-surface`}
      ctaBannerTitle={surfaceCopy.ctaBanner.title}
      ctaBannerSubtitle={surfaceCopy.ctaBanner.subtitle}
      methodology={surfaceCopy.methodology}
      faqItems={surfaceFAQ}
    >
      <SurfaceCalculator />
    </PublicToolLayout>
  );
}
