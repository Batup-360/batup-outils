/**
 * Google Analytics 4 — même propriété que batup.fr.
 *
 * Le Measurement ID (G-XXXX) est fourni par la variable d'environnement de build
 * `VITE_GA_MEASUREMENT_ID` (à définir dans Cloudflare Pages avec l'ID existant de
 * batup.fr). Non défini → aucun script chargé (dev/preview restent silencieux).
 *
 * Cookie posé sur `.batup.fr` : la session est partagée avec www.batup.fr et
 * app.batup.fr, ce qui conserve le tunnel outil → inscription dans une seule
 * propriété. On segmente ensuite par `hostname` dans GA4.
 *
 * En iframe (outil intégré sur une page batup.fr) ou sur les routes /embed, on
 * NE charge PAS GA : la page parente suit déjà avec la même propriété, sinon on
 * double-compterait les vues et on fragmenterait les sessions.
 */

// Measurement ID public (même propriété GA4 que batup.fr). Surchargeable via
// VITE_GA_MEASUREMENT_ID au build si besoin.
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-8NVKZYY1SE';

// GA ne se déclenche que sur les hôtes batup.fr : localhost et les previews
// *.pages.dev restent silencieux et ne polluent pas la propriété.
function isBatupHost(): boolean {
  return /(^|\.)batup\.fr$/.test(window.location.hostname);
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

function isEmbedded(): boolean {
  try {
    if (window.self !== window.top) return true;
  } catch {
    // Accès cross-origin au frame parent → on est forcément dans une iframe.
    return true;
  }
  return window.location.pathname.startsWith('/embed');
}

export function initAnalytics(): void {
  if (initialized) return;
  if (typeof window === 'undefined') return;
  if (!MEASUREMENT_ID) return;
  if (!isBatupHost()) return;
  if (isEmbedded()) return;

  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID, {
    cookie_domain: '.batup.fr',
    // Vues de page envoyées manuellement au changement de route (SPA wouter).
    send_page_view: false,
  });
}

export function trackPageView(path: string): void {
  if (!initialized || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
    hostname: window.location.hostname,
  });
}
