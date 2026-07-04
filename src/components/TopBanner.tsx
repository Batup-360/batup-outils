import { useEffect, useRef, useState } from 'react';
import { MARKETING_BASE } from '@/lib/urls';

/**
 * TopBanner — rotator qui cycle entre 3 messages toutes les 5 secondes.
 * Synchronisé avec batup.fr/src/components/TopBanner.astro.
 *
 * Messages :
 * 1. Offre de lancement -50% les 3 premiers mois -> /tarifs-logiciel-btp
 * 2. Sans engagement · Essai gratuit 14 jours · Sans carte bancaire
 * 3. Facture électronique obligatoire au 1er septembre 2026 -> /facturation-electronique-btp
 */

interface Message {
  text: string;
  highlight?: string;
  cta?: { label: string; href: string };
  tone: 'green' | 'neutral' | 'violet';
}

const MESSAGES: Message[] = [
  {
    text: 'Offre de lancement',
    highlight: '−50 % les 3 premiers mois',
    cta: { label: 'Voir les tarifs', href: `${MARKETING_BASE}/tarifs-logiciel-btp` },
    tone: 'green',
  },
  {
    text: 'Sans engagement',
    highlight: 'Essai gratuit 14 jours · Sans carte bancaire',
    tone: 'neutral',
  },
  {
    text: 'Facture électronique obligatoire au',
    highlight: '1er septembre 2026',
    cta: { label: 'Anticiper avec BatUp', href: `${MARKETING_BASE}/facturation-electronique-btp` },
    tone: 'violet',
  },
];

const INTERVAL_MS = 5000;

const toneColors = {
  green: '#10B981',
  violet: '#5368EE',
  neutral: '#374151',
} as const;

export function TopBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const paused = useRef(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const start = () => {
      timerRef.current = setInterval(() => {
        if (!paused.current) {
          setCurrent((c) => (c + 1) % MESSAGES.length);
        }
      }, INTERVAL_MS);
    };

    start();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative z-40 block overflow-hidden px-4 py-1.5 text-center text-[11px] font-semibold text-slate-700 sm:text-xs"
      style={{ background: 'transparent' }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-live="polite"
    >
      <div className="relative flex h-5 items-center justify-center sm:h-[22px]">
        {MESSAGES.map((msg, i) => (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-500"
            style={{
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? 'auto' : 'none',
            }}
          >
            {msg.tone === 'green' && (
              <svg
                className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
                style={{ color: toneColors.green }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {msg.tone === 'violet' && (
              <svg
                className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                style={{ color: toneColors.violet }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
            <span>{msg.text}</span>
            {msg.highlight && (
              <span
                className="font-extrabold"
                style={{
                  color:
                    msg.tone === 'green'
                      ? toneColors.green
                      : msg.tone === 'violet'
                        ? toneColors.violet
                        : undefined,
                }}
              >
                {msg.highlight}
              </span>
            )}
            {msg.cta && (
              <a
                href={msg.cta.href}
                className="ml-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white transition-transform hover:scale-105 sm:text-[11px]"
                style={{
                  background: msg.tone === 'violet' ? toneColors.violet : toneColors.green,
                }}
              >
                {msg.cta.label}
                <svg
                  className="h-2.5 w-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
