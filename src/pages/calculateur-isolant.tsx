import { PublicToolLayout } from '@/components/PublicToolLayout';
import { IsolantCalculator } from '@/components/IsolantCalculator';
import { isolantCopy } from '@/content/isolant-copy';
import { isolantFAQ } from '@/content/isolant-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurIsolant() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${isolantCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: isolantCopy.seo.title, description: isolantCopy.seo.description, canonicalUrl }}
      webApplicationName={isolantCopy.webApplication.name}
      webApplicationDescription={isolantCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Calculateur d'isolant", url: canonicalUrl },
      ]}
      heroH1={isolantCopy.hero.h1}
      heroLede={isolantCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-isolant`}
      ctaBannerTitle={isolantCopy.ctaBanner.title}
      ctaBannerSubtitle={isolantCopy.ctaBanner.subtitle}
      methodology={isolantCopy.methodology}
      faqItems={isolantFAQ}
    >
      <IsolantCalculator />
    </PublicToolLayout>
  );
}
