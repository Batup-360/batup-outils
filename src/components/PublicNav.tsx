import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { APP_BASE, MARKETING_BASE } from '@/lib/urls';

/**
 * Marketing navbar — dark floating pill matching batup.fr.
 *
 * • Liens "Fonctionnalités" et "Pour qui ?" : renvoient vers batup.fr (où vivent
 *   les vrais mega menus). Affichés avec chevron pour cohérence visuelle.
 * • "Ressources" : VRAI mega menu local avec les 19 outils en 3 colonnes +
 *   2 cards CTA en bas (Centre d'aide + Voir tous les outils).
 */

const SIGNUP_GRADIENT = 'linear-gradient(180deg, #BFC6F4 0%, #7076F1 50%, #5368EE 100%)';
const CTA_GRADIENT = 'linear-gradient(135deg, #BFC6F4, #7076F1, #5368EE)';

interface ToolLink {
  label: string;
  desc: string;
  href: string;
  icon: string; // SVG path data (Heroicons-style stroke)
}

interface ToolCategory {
  title: string;
  description: string;
  links: ToolLink[];
}

const RESSOURCES_MENU: ToolCategory[] = [
  {
    title: 'Chiffrer & marger',
    description: 'Vos calculs critiques de pricing, marge et révision de prix.',
    links: [
      {
        label: 'Taux horaire BTP',
        desc: 'Calculez votre taux horaire de vente rentable.',
        href: '/calculateur-taux-horaire-btp',
        icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        label: 'Prix de chantier BTP',
        desc: 'Estimez le prix de vente au coût + marge.',
        href: '/calculateur-prix-chantier-btp',
        icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
      },
      {
        label: 'Marge nette & coefficient',
        desc: 'Calcul instantané de votre marge nette.',
        href: '/calculateur-marge-nette-coefficient-btp',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      },
      {
        label: 'Révision de prix (Index BT)',
        desc: 'Indexez vos prix sur les Index BT officiels.',
        href: '/calculateur-revision-prix-index-bt',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      },
      {
        label: 'ROI certification RGE',
        desc: 'Mesurez la rentabilité d’une certification RGE.',
        href: '/calculateur-roi-certification-rge',
        icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
      },
      {
        label: 'Comparateur statut juridique',
        desc: 'Auto-entreprise, EI, EURL, SASU : lequel choisir ?',
        href: '/comparateur-statut-juridique-artisan-btp',
        icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      },
    ],
  },
  {
    title: 'Paie, TVA & charges',
    description: 'Tous les calculs de paie BTP, charges sociales et TVA artisans.',
    links: [
      {
        label: 'Heures supplémentaires BTP',
        desc: 'Calcul des heures sup selon CCN bâtiment.',
        href: '/calculateur-heures-supplementaires-btp',
        icon: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        label: 'Coût salarié employeur',
        desc: 'Du brut au coût total employeur en 1 calcul.',
        href: '/calculateur-cout-salarie-btp',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      },
      {
        label: 'Jours d’intempéries CIBTP',
        desc: 'Indemnités CIBTP par jour & par salarié.',
        href: '/calculateur-jours-intemperies-cibtp',
        icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15zm9 4l-2 2m4-2l2 2',
      },
      {
        label: 'Prime d’ancienneté CCN bâtiment',
        desc: 'Prime ancienneté ouvriers/ETAM/Cadres.',
        href: '/calculateur-prime-anciennete-ccn-batiment',
        icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      },
      {
        label: 'TVA autoliquidation BTP',
        desc: 'Quand et comment appliquer l’autoliquidation.',
        href: '/calculateur-tva-autoliquidation-btp',
        icon: 'M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        label: 'Mention TVA facture',
        desc: 'Génère la bonne mention TVA par situation.',
        href: '/generateur-mention-tva-facture-btp',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      },
      {
        label: 'Charges sociales artisan',
        desc: 'Charges sociales indépendant BTP par tranche.',
        href: '/calculateur-charges-sociales-artisan-btp',
        icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
      },
    ],
  },
  {
    title: 'Trésorerie & assurances',
    description: 'Sécurisez votre trésorerie de chantier et vos assurances.',
    links: [
      {
        label: 'Mentions facture & devis',
        desc: 'Vérifiez que vos docs sont 100 % conformes.',
        href: '/verificateur-mentions-obligatoires-facture-devis-btp',
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      },
      {
        label: 'Situation de travaux',
        desc: 'Situations + retenue + révision en 1 calcul.',
        href: '/calculateur-situation-travaux',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      },
      {
        label: 'DGD (décompte général)',
        desc: 'Solde de chantier marché public/privé.',
        href: '/calculateur-dgd-decompte-general-definitif',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
      },
      {
        label: 'Retenue de garantie',
        desc: 'Montant retenue 5 % + caution bancaire.',
        href: '/calculateur-retenue-de-garantie',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      },
      {
        label: 'Décennale BTP',
        desc: 'Simulez le coût décennale par métier.',
        href: '/simulateur-decennale-btp',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      },
      {
        label: 'RC Pro BTP',
        desc: 'Comparez les RC Pro selon votre CA.',
        href: '/simulateur-rc-pro-btp',
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      },
    ],
  },
];

interface PublicNavProps {
  signupHref?: string;
  loginHref?: string;
}

export function PublicNav({
  signupHref = `${APP_BASE}/signup`,
  loginHref = `${APP_BASE}/login`,
}: PublicNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ressourcesOpen, setRessourcesOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  function showRessources() {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
    setRessourcesOpen(true);
  }
  function scheduleHideRessources() {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setRessourcesOpen(false), 200);
  }

  return (
    <nav className="sticky top-0 z-50 bg-transparent py-2 px-4 sm:px-6 lg:px-8" id="navbar">
      <div
        className="relative mx-auto max-w-7xl rounded-2xl border border-white/10 px-5 shadow-md backdrop-blur-xl sm:px-6 lg:px-8"
        style={{ backgroundColor: '#151515' }}
      >
        <div className="flex h-12 items-center justify-between lg:h-14">
          <a href={MARKETING_BASE} className="flex shrink-0 items-center gap-2">
            <img src="/assets/logo-batup-marketing.png" alt="BatUp" className="h-9 w-auto" />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {/* Fonctionnalités → batup.fr */}
            <a
              href={`${MARKETING_BASE}/`}
              className="flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Fonctionnalités
              <ChevronDown className="h-4 w-4" />
            </a>

            {/* Pour qui ? → batup.fr */}
            <a
              href={`${MARKETING_BASE}/`}
              className="flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Pour qui&nbsp;?
              <ChevronDown className="h-4 w-4" />
            </a>

            {/* Ressources : DROPDOWN LOCAL */}
            <div
              className="relative"
              onMouseEnter={showRessources}
              onMouseLeave={scheduleHideRessources}
            >
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                Ressources
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    ressourcesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <a
              href={`${MARKETING_BASE}/tarifs-logiciel-btp`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Nos tarifs
            </a>
            <a
              href={`${MARKETING_BASE}/blog`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Blog
            </a>
            <a
              href={`${MARKETING_BASE}/demander-une-demo`}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Demander une démo
            </a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={loginHref}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Se connecter
            </a>
            <a
              href={signupHref}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#7076F1]/25"
              style={{ background: SIGNUP_GRADIENT }}
            >
              S'inscrire
            </a>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mega menu Ressources */}
      {ressourcesOpen && (
        <div
          className="absolute left-0 right-0 top-full z-50 hidden px-4 pt-2 sm:px-6 lg:block lg:px-8"
          onMouseEnter={showRessources}
          onMouseLeave={scheduleHideRessources}
        >
          <div className="mx-auto max-w-7xl rounded-2xl border border-gray-100 bg-white px-6 py-8 shadow-2xl">
            <div className="grid grid-cols-3 gap-10">
              {RESSOURCES_MENU.map((category) => (
                <div key={category.title}>
                  <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-900">
                    {category.title}
                  </h3>
                  <p className="mb-5 border-b border-gray-100 pb-4 text-xs text-gray-500">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="group -mx-2 flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                        onClick={() => setRessourcesOpen(false)}
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600 transition-colors group-hover:bg-brand-600/15">
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={link.icon}
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-brand-600">
                            {link.label}
                          </div>
                          <div className="mt-0.5 text-xs text-gray-500">{link.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer CTA : 4 cards (Comparatifs + Nouveautés + Centre d'aide + Tous les outils) */}
            <div className="mt-8 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6">
              {/* Card Comparatifs logiciels BTP (NEW) */}
              <a
                href={`${MARKETING_BASE}/comparatifs-logiciels-btp`}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-600/40 hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight text-gray-900 group-hover:text-brand-600">
                    Comparatifs logiciels BTP
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    BatUp vs Batappli, Obat, Vertuoza...
                  </p>
                </div>
              </a>

              {/* Card Nouveautés (NEW) */}
              <a
                href={`${MARKETING_BASE}/nouveautes`}
                className="group flex items-start gap-3 rounded-xl border border-gray-200 p-4 transition-all hover:border-brand-600/40 hover:bg-gray-50"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold leading-tight text-gray-900 group-hover:text-brand-600">
                    Nouveautés
                  </p>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    Les améliorations produit ce mois-ci.
                  </p>
                </div>
              </a>

              {/* Card Centre d'aide DARK */}
              <a
                href={`${MARKETING_BASE}/centre-aide`}
                className="group relative block overflow-hidden rounded-2xl p-5 transition-shadow hover:shadow-xl"
                style={{ backgroundColor: '#151515' }}
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(112,118,241,0.45) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(231,251,188,0.18) 0%, transparent 70%)',
                  }}
                />
                <div className="relative mb-3 flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ background: CTA_GRADIENT }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-tight text-white">
                      Centre d&rsquo;aide
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/60">
                      Guides, FAQ et tutos pour bien démarrer avec BatUp.
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-white/15">
                  Accéder au centre d&rsquo;aide
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </a>

              {/* Card Voir tous les outils LIGHT multicolor */}
              <Link
                href="/"
                className="group relative block overflow-hidden rounded-2xl border-2 border-brand-600/20 p-5 transition-all hover:border-brand-600/40 hover:shadow-xl"
                style={{
                  background:
                    'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 60%, #EFFDDA 100%)',
                }}
                onClick={() => setRessourcesOpen(false)}
              >
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(231,251,188,0.85) 0%, transparent 70%)',
                  }}
                />
                <div
                  className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full blur-3xl"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(191,198,244,0.8) 0%, transparent 70%)',
                  }}
                />
                <div className="relative mb-3 flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                    style={{ background: CTA_GRADIENT }}
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-1.5">
                      <span
                        className="inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[9px] font-bold text-gray-900"
                        style={{
                          background:
                            'linear-gradient(135deg, #E7FBBC 0%, #F5D9A8 40%, #D4BFFF 75%, #BFC6F4 100%)',
                        }}
                      >
                        19 OUTILS
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Calculateurs gratuits
                      </p>
                    </div>
                    <p className="text-sm font-semibold leading-tight text-gray-900">
                      Voir tous les outils BTP gratuits
                    </p>
                    <p className="mt-0.5 text-[11px] text-gray-500">
                      Sans inscription, sans installation.
                    </p>
                  </div>
                </div>
                <span className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-all group-hover:gap-2">
                  Explorer les outils
                  <svg
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-0 z-[60] flex flex-col overflow-x-hidden lg:hidden">
          <div
            className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4"
            style={{ backgroundColor: '#151515' }}
          >
            <a href={MARKETING_BASE} onClick={() => setMobileOpen(false)}>
              <img src="/assets/logo-batup-marketing.png" alt="BatUp" className="h-8 w-auto" />
            </a>
            <button
              type="button"
              className="rounded-lg p-2 text-white hover:bg-white/10"
              aria-label="Fermer le menu"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-1 space-y-1 overflow-y-auto bg-white px-4 py-4 pb-24">
            <a
              href={`${MARKETING_BASE}/`}
              className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Fonctionnalités
            </a>
            <a
              href={`${MARKETING_BASE}/`}
              className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Pour qui&nbsp;?
            </a>

            {/* Mobile accordion Ressources */}
            <details className="group/acc border-b border-gray-100">
              <summary className="flex cursor-pointer list-none items-center justify-between px-2 py-3 [&::-webkit-details-marker]:hidden">
                <span className="text-base font-semibold text-gray-900">Ressources</span>
                <ChevronDown className="h-5 w-5 text-gray-500 transition-transform group-open/acc:rotate-180" />
              </summary>
              <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-3 pb-4 shadow-sm">
                {RESSOURCES_MENU.map((category) => (
                  <div key={category.title}>
                    <p className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      {category.title}
                    </p>
                    <div className="space-y-1">
                      {category.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={link.icon}
                              />
                            </svg>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold leading-tight text-gray-900">
                              {link.label}
                            </p>
                            <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
                              {link.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* CTA cards mobile (4 cards : Comparatifs + Nouveautés + Centre d'aide + Tous les outils) */}
                <div className="mt-2 grid grid-cols-1 gap-2">
                  <a
                    href={`${MARKETING_BASE}/comparatifs-logiciels-btp`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight text-gray-900">
                        Comparatifs logiciels BTP
                      </p>
                      <p className="text-[11px] leading-snug text-gray-500">
                        BatUp vs Batappli, Obat, Vertuoza...
                      </p>
                    </div>
                  </a>
                  <a
                    href={`${MARKETING_BASE}/nouveautes`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight text-gray-900">
                        Nouveautés
                      </p>
                      <p className="text-[11px] leading-snug text-gray-500">
                        Les améliorations produit ce mois-ci.
                      </p>
                    </div>
                  </a>
                  <a
                    href={`${MARKETING_BASE}/centre-aide`}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight text-gray-900">
                        Centre d&rsquo;aide
                      </p>
                      <p className="text-[11px] leading-snug text-gray-500">
                        Guides, FAQ et tutos.
                      </p>
                    </div>
                  </a>
                  <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F3FF 100%)',
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: CTA_GRADIENT }}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-tight text-gray-900">
                        Voir tous les 19 outils
                      </p>
                      <p className="text-[11px] leading-snug text-gray-500">
                        Sans inscription, sans installation.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </details>

            <a
              href={`${MARKETING_BASE}/tarifs-logiciel-btp`}
              className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Nos tarifs
            </a>
            <a
              href={`${MARKETING_BASE}/blog`}
              className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </a>
            <a
              href={`${MARKETING_BASE}/demander-une-demo`}
              className="block rounded-lg px-2 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileOpen(false)}
            >
              Demander une démo
            </a>

            <div className="flex flex-col items-center gap-3 border-t border-gray-100 pt-5">
              <a
                href={loginHref}
                className="py-1 text-sm font-medium text-gray-500"
                onClick={() => setMobileOpen(false)}
              >
                Se connecter
              </a>
              <a
                href={signupHref}
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                style={{ background: SIGNUP_GRADIENT }}
                onClick={() => setMobileOpen(false)}
              >
                S'inscrire
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
