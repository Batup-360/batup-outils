import { PublicToolLayout } from '@/components/PublicToolLayout';
import { AttestationTvaGenerator } from '@/components/AttestationTvaGenerator';
import { attestationTvaCopy } from '@/content/attestation-tva-copy';
import { attestationTvaFAQ } from '@/content/attestation-tva-faq';
import { APP_BASE, siteOrigin } from '@/lib/urls';

export default function GenerateurAttestationTva() {
  const base = siteOrigin();
  const canonicalUrl = `${base}${attestationTvaCopy.seo.canonicalPath}`;
  return (
    <PublicToolLayout
      seo={{ title: attestationTvaCopy.seo.title, description: attestationTvaCopy.seo.description, canonicalUrl }}
      webApplicationName={attestationTvaCopy.webApplication.name}
      webApplicationDescription={attestationTvaCopy.webApplication.description}
      breadcrumb={[
        { name: 'Accueil', url: base + '/' },
        { name: "Générateur d'attestation TVA", url: canonicalUrl },
      ]}
      heroH1={attestationTvaCopy.hero.h1}
      heroLede={attestationTvaCopy.hero.lede}
      signupHref={`${APP_BASE}/signup?source=generateur-attestation-tva`}
      ctaBannerTitle={attestationTvaCopy.ctaBanner.title}
      ctaBannerSubtitle={attestationTvaCopy.ctaBanner.subtitle}
      methodology={attestationTvaCopy.methodology}
      faqItems={attestationTvaFAQ}
    >
      <AttestationTvaGenerator />
    </PublicToolLayout>
  );
}
