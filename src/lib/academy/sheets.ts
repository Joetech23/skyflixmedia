import "server-only";
import { SHEET_COLUMNS } from "@/lib/academy/application";

type ScriptResult =
  | { ok: true; body: Record<string, unknown> }
  | { ok: false; reason: string };

// Values pasted into Vercel often carry a stray space or line break.
const env = (name: string) => process.env[name]?.trim().replace(/^["']|["']$/g, "");

/**
 * Talks to the Apps Script web app in integrations/google-sheets/Code.gs.
 * Apps Script answers with a 302 to a googleusercontent URL; fetch follows it
 * (as a GET), which is how the script's JSON response is delivered.
 */
async function callScript(payload: Record<string, unknown>): Promise<ScriptResult> {
  const url = env("GOOGLE_SHEETS_WEBHOOK_URL");
  const secret = env("GOOGLE_SHEETS_WEBHOOK_SECRET");
  if (!url || !secret) return { ok: false, reason: "not-configured" };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, ...payload }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const text = await response.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(text);
    } catch {
      // An HTML page instead of JSON means Google showed a sign-in or error
      // page: the deployment isn't public, or the URL isn't the /exec one.
      const looksLikeHtml = text.trimStart().startsWith("<");
      return {
        ok: false,
        reason: looksLikeHtml
          ? `html-response (${response.status})`
          : `unexpected response (${response.status})`,
      };
    }
    return body.ok === true
      ? { ok: true, body }
      : { ok: false, reason: String(body.error ?? "rejected") };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "network error" };
  }
}

/** Appends one application under the matching column headers. */
export async function appendToSheet(
  row: Record<string, string | number>
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const result = await callScript({ columns: SHEET_COLUMNS, row });
  return result.ok ? { ok: true } : result;
}

/** Status-page check: reaches the sheet and checks the secret, writes nothing. */
export async function checkSheet() {
  const url = env("GOOGLE_SHEETS_WEBHOOK_URL") ?? "";
  const result = await callScript({ dryRun: true });
  return {
    urlLooksRight: /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url),
    ...result,
  };
}
