import { PublicToolLayout } from '@/components/PublicToolLayout';
import { QuotePriceCalculator } from '@/components/QuotePriceCalculator';
import { prixChantierCopy } from '@/content/prix-chantier-copy';
import { prixChantierFAQ } from '@/content/prix-chantier-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurPrixChantier() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${prixChantierCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: prixChantierCopy.seo.title,
        description: prixChantierCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={prixChantierCopy.webApplication.name}
      webApplicationDescription={prixChantierCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur de prix de chantier BTP', url: canonicalUrl },
      ]}
      heroH1={prixChantierCopy.hero.h1}
      heroLede={prixChantierCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-prix-chantier`}
      ctaBannerTitle={prixChantierCopy.ctaBanner.title}
      ctaBannerSubtitle={prixChantierCopy.ctaBanner.subtitle}
      methodology={prixChantierCopy.methodology}
      faqItems={prixChantierFAQ}
    >
      <QuotePriceCalculator />
    </PublicToolLayout>
  );
}
