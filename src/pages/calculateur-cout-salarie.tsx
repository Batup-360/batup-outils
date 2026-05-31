import { PublicToolLayout } from '@/components/PublicToolLayout';
import { CoutSalarieCalculator } from '@/components/CoutSalarieCalculator';
import { coutSalarieCopy } from '@/content/cout-salarie-copy';
import { coutSalarieFAQ } from '@/content/cout-salarie-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurCoutSalarie() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${coutSalarieCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: coutSalarieCopy.seo.title,
        description: coutSalarieCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={coutSalarieCopy.webApplication.name}
      webApplicationDescription={coutSalarieCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur coût salarié employeur BTP', url: canonicalUrl },
      ]}
      heroH1={coutSalarieCopy.hero.h1}
      heroLede={coutSalarieCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-cout-salarie-btp`}
      ctaBannerTitle={coutSalarieCopy.ctaBanner.title}
      ctaBannerSubtitle={coutSalarieCopy.ctaBanner.subtitle}
      methodology={coutSalarieCopy.methodology}
      faqItems={coutSalarieFAQ}
    >
      <CoutSalarieCalculator />
    </PublicToolLayout>
  );
}
