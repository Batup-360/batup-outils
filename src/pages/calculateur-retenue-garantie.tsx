import { PublicToolLayout } from '@/components/PublicToolLayout';
import { RetenueGarantieCalculator } from '@/components/RetenueGarantieCalculator';
import { retenueGarantieCopy } from '@/content/retenue-garantie-copy';
import { retenueGarantieFAQ } from '@/content/retenue-garantie-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurRetenueGarantie() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${retenueGarantieCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: retenueGarantieCopy.seo.title,
        description: retenueGarantieCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={retenueGarantieCopy.webApplication.name}
      webApplicationDescription={retenueGarantieCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de retenue de garantie', url: canonicalUrl },
      ]}
      heroH1={retenueGarantieCopy.hero.h1}
      heroLede={retenueGarantieCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-retenue-de-garantie`}
      ctaBannerTitle={retenueGarantieCopy.ctaBanner.title}
      ctaBannerSubtitle={retenueGarantieCopy.ctaBanner.subtitle}
      methodology={retenueGarantieCopy.methodology}
      faqItems={retenueGarantieFAQ}
    >
      <RetenueGarantieCalculator />
    </PublicToolLayout>
  );
}
