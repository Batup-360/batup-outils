import { PublicToolLayout } from '@/components/PublicToolLayout';
import { TvaAutoliquidationCalculator } from '@/components/TvaAutoliquidationCalculator';
import { tvaAutoliquidationCopy } from '@/content/tva-autoliquidation-copy';
import { tvaAutoliquidationFAQ } from '@/content/tva-autoliquidation-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurTvaAutoliquidation() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${tvaAutoliquidationCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: tvaAutoliquidationCopy.seo.title,
        description: tvaAutoliquidationCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={tvaAutoliquidationCopy.webApplication.name}
      webApplicationDescription={tvaAutoliquidationCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur TVA autoliquidation BTP', url: canonicalUrl },
      ]}
      heroH1={tvaAutoliquidationCopy.hero.h1}
      heroLede={tvaAutoliquidationCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-tva-autoliquidation`}
      ctaBannerTitle={tvaAutoliquidationCopy.ctaBanner.title}
      ctaBannerSubtitle={tvaAutoliquidationCopy.ctaBanner.subtitle}
      methodology={tvaAutoliquidationCopy.methodology}
      faqItems={tvaAutoliquidationFAQ}
    >
      <TvaAutoliquidationCalculator />
    </PublicToolLayout>
  );
}
