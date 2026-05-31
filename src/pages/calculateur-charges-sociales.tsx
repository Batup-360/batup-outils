import { PublicToolLayout } from '@/components/PublicToolLayout';
import { ChargesSocialesCalculator } from '@/components/ChargesSocialesCalculator';
import { chargesSocialesCopy } from '@/content/charges-sociales-copy';
import { chargesSocialesFAQ } from '@/content/charges-sociales-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurChargesSociales() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${chargesSocialesCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: chargesSocialesCopy.seo.title,
        description: chargesSocialesCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={chargesSocialesCopy.webApplication.name}
      webApplicationDescription={chargesSocialesCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur charges sociales artisan BTP', url: canonicalUrl },
      ]}
      heroH1={chargesSocialesCopy.hero.h1}
      heroLede={chargesSocialesCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-charges-sociales-artisan`}
      ctaBannerTitle={chargesSocialesCopy.ctaBanner.title}
      ctaBannerSubtitle={chargesSocialesCopy.ctaBanner.subtitle}
      methodology={chargesSocialesCopy.methodology}
      faqItems={chargesSocialesFAQ}
    >
      <ChargesSocialesCalculator />
    </PublicToolLayout>
  );
}
