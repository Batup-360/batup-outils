import { PublicToolLayout } from '@/components/PublicToolLayout';
import { BriquesCalculator } from '@/components/BriquesCalculator';
import { briquesCopy } from '@/content/briques-copy';
import { briquesFAQ } from '@/content/briques-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurBriques() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${briquesCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: briquesCopy.seo.title, description: briquesCopy.seo.description, canonicalUrl }}
      webApplicationName={briquesCopy.webApplication.name}
      webApplicationDescription={briquesCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de briques', url: canonicalUrl },
      ]}
      heroH1={briquesCopy.hero.h1}
      heroLede={briquesCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-briques`}
      ctaBannerTitle={briquesCopy.ctaBanner.title}
      ctaBannerSubtitle={briquesCopy.ctaBanner.subtitle}
      methodology={briquesCopy.methodology}
      faqItems={briquesFAQ}
    >
      <BriquesCalculator />
    </PublicToolLayout>
  );
}
