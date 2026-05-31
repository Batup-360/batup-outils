import { PublicToolLayout } from '@/components/PublicToolLayout';
import { StatutJuridiqueComparator } from '@/components/StatutJuridiqueComparator';
import { statutJuridiqueCopy } from '@/content/statut-juridique-copy';
import { statutJuridiqueFAQ } from '@/content/statut-juridique-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function ComparateurStatutJuridique() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${statutJuridiqueCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: statutJuridiqueCopy.seo.title,
        description: statutJuridiqueCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={statutJuridiqueCopy.webApplication.name}
      webApplicationDescription={statutJuridiqueCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Comparateur statut juridique artisan BTP', url: canonicalUrl },
      ]}
      heroH1={statutJuridiqueCopy.hero.h1}
      heroLede={statutJuridiqueCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=comparateur-statut-juridique`}
      ctaBannerTitle={statutJuridiqueCopy.ctaBanner.title}
      ctaBannerSubtitle={statutJuridiqueCopy.ctaBanner.subtitle}
      methodology={statutJuridiqueCopy.methodology}
      faqItems={statutJuridiqueFAQ}
    >
      <StatutJuridiqueComparator />
    </PublicToolLayout>
  );
}
