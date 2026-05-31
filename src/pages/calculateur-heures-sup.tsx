import { PublicToolLayout } from '@/components/PublicToolLayout';
import { HeuresSupCalculator } from '@/components/HeuresSupCalculator';
import { heuresSupCopy } from '@/content/heures-sup-copy';
import { heuresSupFAQ } from '@/content/heures-sup-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function CalculateurHeuresSup() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${heuresSupCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{
        title: heuresSupCopy.seo.title,
        description: heuresSupCopy.seo.description,
        canonicalUrl,
      }}
      webApplicationName={heuresSupCopy.webApplication.name}
      webApplicationDescription={heuresSupCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: 'Calculateur heures supplémentaires BTP', url: canonicalUrl },
      ]}
      heroH1={heuresSupCopy.hero.h1}
      heroLede={heuresSupCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=calculateur-heures-supplementaires-btp`}
      ctaBannerTitle={heuresSupCopy.ctaBanner.title}
      ctaBannerSubtitle={heuresSupCopy.ctaBanner.subtitle}
      methodology={heuresSupCopy.methodology}
      faqItems={heuresSupFAQ}
    >
      <HeuresSupCalculator />
    </PublicToolLayout>
  );
}
