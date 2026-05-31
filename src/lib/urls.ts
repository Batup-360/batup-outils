/**
 * URL helpers for cross-host navigation.
 *
 * In production this site is served from outils.batup.fr (Cloudflare Pages).
 * Auth + signup live on app.batup.fr — those links are always absolute so
 * cookies/sessions land on the right host.
 */

export const APP_BASE = 'https://app.batup.fr';
export const MARKETING_BASE = 'https://www.batup.fr';

export function isProd(): boolean {
  if (typeof window === 'undefined') return true;
  return window.location.hostname === 'outils.batup.fr';
}

export function siteOrigin(): string {
  if (typeof window === 'undefined') return 'https://outils.batup.fr';
  return isProd() ? 'https://outils.batup.fr' : window.location.origin;
}
