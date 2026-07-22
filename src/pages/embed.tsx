import { lazy, Suspense, useEffect, type ComponentType } from 'react';
import { useParams } from 'wouter';
import { EmbedProvider } from '@/lib/embed-context';

/**
 * Embed shell — renders a single calculator, bare (no nav / hero / footer /
 * methodology / FAQ), for use inside the main Batup app via an <iframe> in a
 * modal. Reachable at /embed/<slug>.
 *
 * The shell reports its content height to the parent window via postMessage
 * ({ type: 'batup-embed-height', slug, height }) so the host can auto-size the
 * iframe. See docs/embed.md for the host-side snippet.
 */

const lazyCalc = (loader: () => Promise<Record<string, unknown>>, name: string) =>
  lazy(() => loader().then((m) => ({ default: m[name] as ComponentType })));

const EMBEDS: Record<string, ComponentType> = {
  // Pricing & marge
  'calculateur-taux-horaire-btp': lazyCalc(() => import('@/components/HourlyRateCalculator'), 'HourlyRateCalculator'),
  'calculateur-prix-chantier-btp': lazyCalc(() => import('@/components/QuotePriceCalculator'), 'QuotePriceCalculator'),
  'calculateur-marge-nette-coefficient-btp': lazyCalc(() => import('@/components/MargeNetteCalculator'), 'MargeNetteCalculator'),
  'calculateur-revision-prix-index-bt': lazyCalc(() => import('@/components/RevisionPrixIndexBTCalculator'), 'RevisionPrixIndexBTCalculator'),
  // Paie & RH
  'calculateur-heures-supplementaires-btp': lazyCalc(() => import('@/components/HeuresSupCalculator'), 'HeuresSupCalculator'),
  'calculateur-cout-salarie-btp': lazyCalc(() => import('@/components/CoutSalarieCalculator'), 'CoutSalarieCalculator'),
  'calculateur-jours-intemperies-cibtp': lazyCalc(() => import('@/components/IntemperiesCibtpCalculator'), 'IntemperiesCibtpCalculator'),
  'calculateur-prime-anciennete-ccn-batiment': lazyCalc(() => import('@/components/PrimeAncienneteCalculator'), 'PrimeAncienneteCalculator'),
  // Fiscal & légal
  'calculateur-tva-autoliquidation-btp': lazyCalc(() => import('@/components/TvaAutoliquidationCalculator'), 'TvaAutoliquidationCalculator'),
  'generateur-mention-tva-facture-btp': lazyCalc(() => import('@/components/MentionTvaGenerator'), 'MentionTvaGenerator'),
  'calculateur-charges-sociales-artisan-btp': lazyCalc(() => import('@/components/ChargesSocialesCalculator'), 'ChargesSocialesCalculator'),
  'comparateur-statut-juridique-artisan-btp': lazyCalc(() => import('@/components/StatutJuridiqueComparator'), 'StatutJuridiqueComparator'),
  'verificateur-mentions-obligatoires-facture-devis-btp': lazyCalc(() => import('@/components/MentionsObligatoiresChecker'), 'MentionsObligatoiresChecker'),
  // Cash, marchés & assurances
  'calculateur-situation-travaux': lazyCalc(() => import('@/components/SituationTravauxCalculator'), 'SituationTravauxCalculator'),
  'calculateur-dgd-decompte-general-definitif': lazyCalc(() => import('@/components/DGDCalculator'), 'DGDCalculator'),
  'calculateur-retenue-de-garantie': lazyCalc(() => import('@/components/RetenueGarantieCalculator'), 'RetenueGarantieCalculator'),
  'simulateur-decennale-btp': lazyCalc(() => import('@/components/DecennaleSimulator'), 'DecennaleSimulator'),
  'simulateur-rc-pro-btp': lazyCalc(() => import('@/components/RcProSimulator'), 'RcProSimulator'),
  'calculateur-roi-certification-rge': lazyCalc(() => import('@/components/RoiRgeCalculator'), 'RoiRgeCalculator'),
  // Métré & quantités
  'calculateur-beton': lazyCalc(() => import('@/components/BetonCalculator'), 'BetonCalculator'),
  'calculateur-tva': lazyCalc(() => import('@/components/TvaCalculator'), 'TvaCalculator'),
  'calculateur-surface': lazyCalc(() => import('@/components/SurfaceCalculator'), 'SurfaceCalculator'),
  'calculateur-volume': lazyCalc(() => import('@/components/VolumeCalculator'), 'VolumeCalculator'),
  'calculateur-escalier': lazyCalc(() => import('@/components/EscalierCalculator'), 'EscalierCalculator'),
  'calculateur-mortier': lazyCalc(() => import('@/components/MortierCalculator'), 'MortierCalculator'),
  'calculateur-chape': lazyCalc(() => import('@/components/ChapeCalculator'), 'ChapeCalculator'),
  'calculateur-pente-toiture': lazyCalc(() => import('@/components/PenteToitureCalculator'), 'PenteToitureCalculator'),
  'calculateur-papier-peint': lazyCalc(() => import('@/components/PapierPeintCalculator'), 'PapierPeintCalculator'),
  'generateur-attestation-tva': lazyCalc(() => import('@/components/AttestationTvaGenerator'), 'AttestationTvaGenerator'),
  'calculateur-parpaings': lazyCalc(() => import('@/components/ParpaingsCalculator'), 'ParpaingsCalculator'),
  'calculateur-briques': lazyCalc(() => import('@/components/BriquesCalculator'), 'BriquesCalculator'),
  'calculateur-placo': lazyCalc(() => import('@/components/PlacoCalculator'), 'PlacoCalculator'),
  'calculateur-carrelage': lazyCalc(() => import('@/components/CarrelageCalculator'), 'CarrelageCalculator'),
  'calculateur-parquet': lazyCalc(() => import('@/components/ParquetCalculator'), 'ParquetCalculator'),
  'calculateur-terrasse': lazyCalc(() => import('@/components/TerrasseCalculator'), 'TerrasseCalculator'),
  'calculateur-isolant': lazyCalc(() => import('@/components/IsolantCalculator'), 'IsolantCalculator'),
  'calculateur-peinture': lazyCalc(() => import('@/components/PeintureCalculator'), 'PeintureCalculator'),
  'calculateur-consommation-materiaux': lazyCalc(() => import('@/components/ConsommationCalculator'), 'ConsommationCalculator'),
  'calculateur-tuiles': lazyCalc(() => import('@/components/TuilesCalculator'), 'TuilesCalculator'),
  'calculateur-gravier-sable': lazyCalc(() => import('@/components/GravierSableCalculator'), 'GravierSableCalculator'),
  'calculateur-enduit-facade': lazyCalc(() => import('@/components/EnduitFacadeCalculator'), 'EnduitFacadeCalculator'),
  'grille-salaires-minima-batiment': lazyCalc(() => import('@/components/GrilleSalairesCalculator'), 'GrilleSalairesCalculator'),
};

/** Report content height to the parent window so it can size the iframe. */
function useReportHeight(slug: string) {
  useEffect(() => {
    if (typeof window === 'undefined' || window.parent === window) return;
    const send = () => {
      const height = Math.ceil(document.documentElement.getBoundingClientRect().height);
      window.parent.postMessage({ type: 'batup-embed-height', slug, height }, '*');
    };
    send();
    const ro = new ResizeObserver(send);
    ro.observe(document.documentElement);
    window.addEventListener('load', send);
    return () => {
      ro.disconnect();
      window.removeEventListener('load', send);
    };
  }, [slug]);
}

/** Keep embed pages out of the search index. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}

export default function Embed() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug ?? '';
  const Calculator = EMBEDS[slug];

  useReportHeight(slug);
  useNoIndex();

  return (
    <EmbedProvider slug={slug}>
      <div className="bg-transparent p-4">
        {Calculator ? (
          <Suspense
            fallback={
              <div className="flex min-h-[200px] items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
              </div>
            }
          >
            <Calculator />
          </Suspense>
        ) : (
          <p className="p-6 text-center text-sm text-gray-500">Outil introuvable : « {slug} ».</p>
        )}
      </div>
    </EmbedProvider>
  );
}
