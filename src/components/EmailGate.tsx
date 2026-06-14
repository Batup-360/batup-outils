import { useEffect, useId, useRef, useState } from 'react';
import { Lock, X, CheckCircle2 } from 'lucide-react';
import { useEmailGate } from '@/lib/email-gate-context';
import { Button, Input, Label } from './ui';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'error';

export function EmailGate() {
  const { pending, closeGate, markUnlocked } = useEmailGate();
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [rgpd, setRgpd] = useState(true);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const open = pending !== null;

  useEffect(() => {
    if (!open) {
      setPrenom('');
      setEmail('');
      setStatus('idle');
      setErrorMsg(null);
      return;
    }
    // focus first input
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    // lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGate();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeGate]);

  if (!open) return null;

  const canSubmit =
    prenom.trim().length >= 2 &&
    EMAIL_RX.test(email.trim()) &&
    rgpd &&
    status !== 'submitting';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || !pending) return;
    setStatus('submitting');
    setErrorMsg(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          prenom: prenom.trim(),
          tool: pending.toolSlug,
          toolLabel: pending.toolLabel,
          result: pending.resultPreview ?? null,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(body || `Erreur ${res.status}`);
      }
      markUnlocked();
    } catch (err) {
      setStatus('error');
      setErrorMsg(
        err instanceof Error && err.message ? err.message : 'Une erreur est survenue. Réessayez.',
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-gray-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeGate();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={closeGate}
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header avec halo signature BatUp */}
        <div className="relative bg-gradient-to-br from-brand-50 via-white to-white px-6 pt-7 pb-5 sm:px-8 sm:pt-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#BFC6F4] via-[#7076F1] to-[#5368EE] text-white shadow-md">
            <Lock className="h-5 w-5" />
          </div>
          <h2
            id={titleId}
            className="text-center text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Votre résultat est prêt
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-center text-sm text-gray-600">
            Saisissez votre email pour afficher votre résultat. Vous recevrez aussi une copie par mail pour le retrouver plus tard.
          </p>
          <p className="mx-auto mt-3 max-w-sm rounded-lg bg-brand-50 px-3 py-2 text-center text-xs font-medium text-brand-700">
            Une seule fois suffit. Vous accédez ensuite librement à tous nos outils gratuits, sans rien ressaisir.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-center text-xs text-gray-500">
            Pensez à vérifier vos spams si vous ne recevez pas le mail dans quelques minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-7 sm:px-8 sm:pb-8">
          <div className="space-y-1.5">
            <Label htmlFor="eg-prenom">Prénom</Label>
            <Input
              ref={firstFieldRef}
              id="eg-prenom"
              name="prenom"
              type="text"
              autoComplete="given-name"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Thomas"
              required
              minLength={2}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="eg-email">Email professionnel</Label>
            <Input
              id="eg-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@entreprise.fr"
              required
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={rgpd}
              onChange={(e) => setRgpd(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-xs leading-relaxed text-gray-600">
              J'accepte de recevoir mon résultat et les nouveautés BatUp par email. Je peux me
              désinscrire à tout moment.
            </span>
          </label>

          {status === 'error' && errorMsg && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            disabled={!canSubmit}
            className="h-11 w-full rounded-full text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Déblocage…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Voir mon résultat
              </span>
            )}
          </Button>

          <p className="text-center text-[11px] leading-relaxed text-gray-400">
            Vos données restent en France et ne sont jamais revendues. Conformité RGPD.
          </p>
        </form>
      </div>
    </div>
  );
}
