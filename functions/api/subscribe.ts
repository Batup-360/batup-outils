/**
 * POST /api/subscribe
 *
 * Cloudflare Pages Function that receives an email capture from the
 * EmailGate modal, pushes the contact into a Brevo list (with tool-usage
 * attributes) and fires the transactional result email.
 *
 * Required env vars (set in Cloudflare Pages → Settings → Variables) :
 *   - BREVO_API_KEY   (Secret)  → your Brevo v3 API key (xkeysib-...)
 *   - BREVO_LIST_ID   (Plain)   → numeric id of the target list (e.g. "9")
 */

const SENDER_NAME = 'BatUp';
const SENDER_EMAIL = 'contact@batup.fr';
const ORIGIN = 'https://outils.batup.fr';
const APP_BASE = 'https://app.batup.fr';
const LOGO_URL = `${ORIGIN}/email-logo.png`;
const COMPANY_ADDRESS = '60 rue François I<sup>er</sup>, 75008 Paris';

interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
}

interface PagesContext<E> {
  request: Request;
  env: E;
}
type PagesHandler<E> = (ctx: PagesContext<E>) => Response | Promise<Response>;

interface IncomingPayload {
  email?: unknown;
  prenom?: unknown;
  tool?: unknown;
  toolLabel?: unknown;
  result?: unknown;
}

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function badRequest(msg: string) {
  return jsonResponse({ ok: false, error: msg }, 400);
}

function serverError(msg: string) {
  return jsonResponse({ ok: false, error: msg }, 500);
}

function asString(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

interface EmailParams {
  prenom: string;
  toolLabel: string;
  toolSlug: string;
  result: string | null;
}

function buildEmailHtml({ prenom, toolLabel, toolSlug, result }: EmailParams): string {
  const safePrenom = escapeHtml(prenom);
  const safeTool = escapeHtml(toolLabel);
  const toolUrl = `${ORIGIN}/${toolSlug}`;
  const signupUrl = `${APP_BASE}/signup?source=${encodeURIComponent(toolSlug)}`;

  const resultBlock = result
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
        <tr><td align="center" style="background:#F7F8FE;border:1px solid #E0E3F8;border-radius:12px;padding:28px 24px;">
          <p style="font-size:11px;color:#6b7280;margin:0 0 8px;letter-spacing:1px;text-transform:uppercase;font-family:Arial,sans-serif;">Votre résultat</p>
          <p style="font-size:32px;font-weight:700;color:#5368EE;margin:0;letter-spacing:-1px;line-height:1.1;font-family:Arial,sans-serif;">${escapeHtml(result)}</p>
        </td></tr>
      </table>`
    : '';

  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>Votre résultat BatUp</title></head>
<body style="margin:0;padding:0;background:#f5f6f9;font-family:Arial,Helvetica,sans-serif;color:#1a1a2e;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f6f9;padding:40px 16px;">
    <tr><td align="center">
      <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:640px;background:white;border:1px solid #e5e7eb;border-radius:12px;">
        <tr><td style="padding:36px 32px 28px;">

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #ECECFF;padding-bottom:24px;">
            <tr><td align="center">
              <img src="${LOGO_URL}" alt="BatUp" width="50" height="53" style="display:inline-block;vertical-align:middle;">
              <span style="font-size:24px;font-weight:700;color:#0a0a0a;letter-spacing:-0.5px;vertical-align:middle;margin-left:12px;">BatUp</span>
            </td></tr>
          </table>

          <p style="font-size:16px;color:#1a1a2e;margin:28px 0 16px;">Bonjour ${safePrenom},</p>
          <p style="font-size:15px;line-height:1.6;color:#4b5563;margin:0;">Voici le résultat de votre simulation sur le <span style="color:#5368EE;font-weight:600;">${safeTool}</span>.</p>

          ${resultBlock}

          <p style="text-align:center;margin:16px 0 28px;"><a href="${toolUrl}" style="font-size:14px;color:#5368EE;text-decoration:none;font-weight:500;">Modifier mes valeurs et recalculer →</a></p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ECECFF;border-bottom:1px solid #ECECFF;margin:28px 0;">
            <tr><td style="padding:22px 0;">
              <p style="font-size:14px;color:#6b7280;margin:0 0 4px;">Une astuce pour ne plus refaire ce calcul</p>
              <p style="font-size:15px;color:#1a1a2e;font-weight:600;margin:0 0 12px;line-height:1.4;">Et si BatUp le calculait automatiquement à partir de vos pointages chantier ?</p>
              <p style="font-size:14px;line-height:1.6;color:#4b5563;margin:0;">Heures, paniers, trajets, grands déplacements. BatUp Pointage récupère tout depuis le terrain et alimente la paie sans Excel. Plus d'oubli en fin de mois.</p>
            </td></tr>
          </table>

          <p style="text-align:center;margin:4px 0 8px;"><a href="${signupUrl}" style="display:inline-block;background:#5368EE;color:white;padding:14px 30px;border-radius:999px;font-size:14px;font-weight:600;text-decoration:none;">Essayer BatUp gratuitement</a></p>
          <p style="text-align:center;font-size:12px;color:#6b7280;margin:12px 0 0;">14 jours d'essai, sans carte bancaire</p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ECECFF;margin-top:36px;padding-top:22px;">
            <tr><td align="center">
              <p style="font-size:11px;color:#9ca3af;line-height:1.6;margin:0 0 8px;">
                Vous recevez ce mail parce que vous avez utilisé un outil gratuit sur outils.batup.fr.<br>
                BatUp · ${COMPANY_ADDRESS} · contact@batup.fr
              </p>
              <p style="font-size:11px;color:#9ca3af;margin:0;">
                <a href="{{unsubscribe}}" style="color:#9ca3af;text-decoration:underline;">Se désinscrire</a> · <a href="${ORIGIN.replace('outils.', '')}/mentions-legales" style="color:#9ca3af;text-decoration:underline;">Mentions légales</a>
              </p>
            </td></tr>
          </table>

        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendResultEmail(
  env: Env,
  to: { email: string; name: string },
  params: EmailParams,
): Promise<void> {
  const subject = `Votre résultat : ${params.toolLabel}`;
  const htmlContent = buildEmailHtml(params);

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [to],
      subject,
      htmlContent,
      tags: ['outils-gratuits', params.toolSlug],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Brevo email error', res.status, detail);
    throw new Error(`Brevo email failed ${res.status}`);
  }
}

export const onRequestPost: PagesHandler<Env> = async ({ request, env }) => {
  if (!env.BREVO_API_KEY) return serverError('BREVO_API_KEY not configured');
  if (!env.BREVO_LIST_ID) return serverError('BREVO_LIST_ID not configured');
  const listId = Number.parseInt(env.BREVO_LIST_ID, 10);
  if (!Number.isFinite(listId)) return serverError('BREVO_LIST_ID must be numeric');

  let payload: IncomingPayload;
  try {
    payload = (await request.json()) as IncomingPayload;
  } catch {
    return badRequest('Invalid JSON body');
  }

  const email = asString(payload.email)?.toLowerCase();
  const prenom = asString(payload.prenom);
  const tool = asString(payload.tool) ?? 'unknown';
  const toolLabel = asString(payload.toolLabel) ?? tool;
  const result = asString(payload.result);

  if (!email || !EMAIL_RX.test(email)) return badRequest('Invalid email');
  if (!prenom || prenom.length < 2) return badRequest('Invalid prenom');

  const attributes: Record<string, unknown> = {
    PRENOM: prenom,
    DERNIER_OUTIL: toolLabel,
    DERNIER_OUTIL_SLUG: tool,
    DERNIERE_UTILISATION: new Date().toISOString(),
    SOURCE: 'outils.batup.fr',
  };
  if (result) attributes.DERNIER_RESULTAT = result;

  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      'api-key': env.BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  let deduped = false;
  if (!brevoRes.ok && brevoRes.status !== 204) {
    const detail = await brevoRes.text().catch(() => '');
    console.error('Brevo contact error', brevoRes.status, detail);
    if (brevoRes.status === 400 && /duplicate_parameter|already.*exist/i.test(detail)) {
      deduped = true;
    } else {
      return serverError('Brevo subscription failed');
    }
  }

  try {
    await sendResultEmail(env, { email, name: prenom }, { prenom, toolLabel, toolSlug: tool, result });
  } catch (err) {
    console.error('Result email send failed', err);
  }

  return jsonResponse({ ok: true, deduped });
};

export const onRequest: PagesHandler<Env> = async () =>
  new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
