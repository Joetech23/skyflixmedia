import "server-only";
import { SHEET_COLUMNS } from "@/lib/academy/application";

/**
 * Appends one application to the Google Sheet through the Apps Script web app
 * in integrations/google-sheets/Code.gs. The script checks the shared secret,
 * writes the header row on first use and appends under the matching columns.
 */
export async function appendToSheet(
  row: Record<string, string | number>
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return { ok: false, reason: "not-configured" };

  try {
    // Apps Script answers with a 302 to a googleusercontent URL; fetch follows
    // it (as a GET), which is how the script's JSON response is delivered.
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, columns: SHEET_COLUMNS, row }),
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const text = await response.text();
    let body: { ok?: boolean; error?: string } = {};
    try {
      body = JSON.parse(text);
    } catch {
      return { ok: false, reason: `unexpected response (${response.status})` };
    }
    return body.ok ? { ok: true } : { ok: false, reason: body.error ?? "rejected" };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "network error" };
  }
}
