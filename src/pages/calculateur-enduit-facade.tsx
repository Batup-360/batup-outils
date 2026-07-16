import { PublicToolLayout } from '@/components/PublicToolLayout';
import { EnduitFacadeCalculator } from '@/components/EnduitFacadeCalculator';
import { enduitFacadeCopy } from '@/content/enduit-facade-copy';
import { enduitFacadeFAQ } from '@/content/enduit-facade-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurEnduitFacade() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${enduitFacadeCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: enduitFacadeCopy.seo.title, description: enduitFacadeCopy.seo.description, canonicalUrl }}
      webApplicationName={enduitFacadeCopy.webApplication.name}
      webApplicationDescription={enduitFacadeCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Calculateur d'enduit de façade", url: canonicalUrl },
      ]}
      heroH1={enduitFacadeCopy.hero.h1}
      heroLede={enduitFacadeCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-enduit-facade`}
      ctaBannerTitle={enduitFacadeCopy.ctaBanner.title}
      ctaBannerSubtitle={enduitFacadeCopy.ctaBanner.subtitle}
      methodology={enduitFacadeCopy.methodology}
      faqItems={enduitFacadeFAQ}
    >
      <EnduitFacadeCalculator />
    </PublicToolLayout>
  );
}
