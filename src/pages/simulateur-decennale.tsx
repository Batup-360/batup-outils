import { PublicToolLayout } from '@/components/PublicToolLayout';
import { DecennaleSimulator } from '@/components/DecennaleSimulator';
import { decennaleCopy } from '@/content/decennale-copy';
import { decennaleFAQ } from '@/content/decennale-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function SimulateurDecennale() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${decennaleCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: decennaleCopy.seo.title,
        description: decennaleCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={decennaleCopy.webApplication.name}
      webApplicationDescription={decennaleCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Simulateur garantie décennale BTP', url: canonicalUrl },
      ]}
      heroH1={decennaleCopy.hero.h1}
      heroLede={decennaleCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=simulateur-decennale`}
      ctaBannerTitle={decennaleCopy.ctaBanner.title}
      ctaBannerSubtitle={decennaleCopy.ctaBanner.subtitle}
      methodology={decennaleCopy.methodology}
      faqItems={decennaleFAQ}
    >
      <DecennaleSimulator />
    </PublicToolLayout>
  );
}
