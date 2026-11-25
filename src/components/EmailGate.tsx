import { useEffect, useId, useRef, useState } from 'react';
import { Mail, X } from 'lucide-react';
import { useEmailGate } from '@/lib/email-gate-context';
import { Button, Input, Label } from './ui';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'error';
type Champ = 'prenom' | 'email' | 'rgpd';

export function EmailGate() {
  const { pending, closeGate, markUnlocked } = useEmailGate();
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [rgpd, setRgpd] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [erreurs, setErreurs] = useState<Partial<Record<Champ, string>>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();

  const open = pending !== null;

  // <dialog> natif ouvert avec showModal() : page inerte, focus confiné, Échap géré
  // par le navigateur. Au démontage, le focus revient sur le bouton qui a ouvert.
  useEffect(() => {
    if (!open) {
      setPrenom('');
      setEmail('');
      setStatus('idle');
      setErrorMsg(null);
      setErreurs({});
      return;
    }
    const declencheur = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    firstFieldRef.current?.focus();
    return () => {
      if (declencheur?.isConnected) declencheur.focus();
    };
  }, [open]);

  if (!open) return null;

  function valider(): Partial<Record<Champ, string>> {
    const e: Partial<Record<Champ, string>> = {};
    if (prenom.trim().length < 2) e.prenom = 'Indiquez votre prénom (2 caractères minimum).';
    if (!EMAIL_RX.test(email.trim())) e.email = 'Indiquez une adresse email valide, par exemple vous@entreprise.fr.';
    if (!rgpd) e.rgpd = 'Cochez la case pour recevoir votre résultat par email.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'submitting' || !pending) return;
    const nouvelles = valider();
    setErreurs(nouvelles);
    const premier = (['prenom', 'email', 'rgpd'] as const).find((c) => nouvelles[c]);
    if (premier) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${premier}"]`)?.focus();
      return;
    }
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
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={closeGate}
      className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-gray-900/60 backdrop:backdrop-blur-sm"
    >
      <div
        className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeGate();
        }}
      >
      <div className="relative w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
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
            <Mail className="h-5 w-5" />
          </div>
          <h2
            id={titleId}
            className="text-center text-xl font-bold text-gray-900 sm:text-2xl"
          >
            Recevez votre résultat par email
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-center text-sm text-gray-600">
            Saisissez votre email : on vous en envoie une copie à garder et à retrouver quand vous voulez.
          </p>
          <p className="mx-auto mt-3 max-w-sm rounded-lg bg-brand-50 px-3 py-2 text-center text-xs font-medium text-brand-700">
            Recevez aussi nos nouveaux outils et astuces BatUp. Désinscription en un clic, à tout moment.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-center text-xs text-gray-500">
            Pensez à vérifier vos spams si vous ne recevez pas le mail dans quelques minutes.
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="space-y-4 px-6 pb-7 sm:px-8 sm:pb-8">
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
              aria-invalid={erreurs.prenom ? true : undefined}
              aria-describedby={erreurs.prenom ? 'eg-prenom-erreur' : undefined}
            />
            {erreurs.prenom && (
              <p id="eg-prenom-erreur" className="text-xs text-rose-700">
                {erreurs.prenom}
              </p>
            )}
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
              aria-invalid={erreurs.email ? true : undefined}
              aria-describedby={erreurs.email ? 'eg-email-erreur' : undefined}
            />
            {erreurs.email && (
              <p id="eg-email-erreur" className="text-xs text-rose-700">
                {erreurs.email}
              </p>
            )}
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              name="rgpd"
              required
              aria-invalid={erreurs.rgpd ? true : undefined}
              aria-describedby={erreurs.rgpd ? 'eg-rgpd-erreur' : undefined}
              checked={rgpd}
              onChange={(e) => setRgpd(e.target.checked)}
              className="mt-0.5 h-4 w-4 cursor-pointer rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <span className="text-xs leading-relaxed text-gray-600">
              J'accepte de recevoir mon résultat et les nouveautés BatUp par email. Je peux me
              désinscrire à tout moment.
            </span>
          </label>
          {erreurs.rgpd && (
            <p id="eg-rgpd-erreur" className="-mt-2 text-xs text-rose-700">
              {erreurs.rgpd}
            </p>
          )}

          {status === 'error' && errorMsg && (
            <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
              {errorMsg}
            </div>
          )}

          <Button
            type="submit"
            disabled={status === 'submitting'}
            className="h-11 w-full rounded-full text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'submitting' ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Envoi…
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                M'envoyer le résultat
              </span>
            )}
          </Button>

          <p className="text-center text-xs leading-relaxed text-gray-600">
            Vos données restent en France et ne sont jamais revendues. Conformité RGPD.
          </p>
        </form>
      </div>
      </div>
    </dialog>
  );
}
