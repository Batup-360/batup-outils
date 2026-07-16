import { PublicToolLayout } from '@/components/PublicToolLayout';
import { EscalierCalculator } from '@/components/EscalierCalculator';
import { escalierCopy } from '@/content/escalier-copy';
import { escalierFAQ } from '@/content/escalier-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurEscalier() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${escalierCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: escalierCopy.seo.title, description: escalierCopy.seo.description, canonicalUrl }}
      webApplicationName={escalierCopy.webApplication.name}
      webApplicationDescription={escalierCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Calculateur d'escalier", url: canonicalUrl },
      ]}
      heroH1={escalierCopy.hero.h1}
      heroLede={escalierCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-escalier`}
      ctaBannerTitle={escalierCopy.ctaBanner.title}
      ctaBannerSubtitle={escalierCopy.ctaBanner.subtitle}
      methodology={escalierCopy.methodology}
      faqItems={escalierFAQ}
    >
      <EscalierCalculator />
    </PublicToolLayout>
  );
}
