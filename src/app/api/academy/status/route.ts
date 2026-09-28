import { NextResponse } from "next/server";
import { checkSheet } from "@/lib/academy/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Setup check for the Academy application pipeline. Open
 * /api/academy/status in a browser after configuring Vercel. Reports only
 * yes/no and next steps — never the webhook URL, secret or API key.
 */

const sheetAdvice: [RegExp, string][] = [
  [/not-configured/, "GOOGLE_SHEETS_WEBHOOK_URL or GOOGLE_SHEETS_WEBHOOK_SECRET is missing in Vercel. Add both, then redeploy."],
  [/no-secret-set/, "The script has no SHARED_SECRET. In Apps Script: Project Settings → Script Properties → add SHARED_SECRET."],
  [/unauthorised/, "The secret doesn't match. GOOGLE_SHEETS_WEBHOOK_SECRET in Vercel must be exactly the SHARED_SECRET script property. Redeploy Vercel after changing it."],
  [/no-sheet/, "The script isn't attached to a sheet. Either recreate it from the sheet (Extensions → Apps Script), or add a SHEET_ID script property with the ID from the sheet's URL."],
  [/html-response/, "Google returned a sign-in page. In Apps Script: Deploy → Manage deployments → edit → 'Execute as: Me' and 'Who has access: Anyone', then deploy a New version. Also check the URL in Vercel ends in /exec."],
  [/unexpected response \(404\)/, "The web app URL wasn't found. Copy it again from Deploy → Manage deployments (it ends in /exec) and update Vercel."],
  [/rejected|bad payload/, "The script is an older version. Paste the latest Code.gs, then Deploy → Manage deployments → edit → Version: New version → Deploy."],
];

export async function GET() {
  const sheet = await checkSheet();
  const has = (name: string) => Boolean(process.env[name]?.trim());

  let sheetStatus: string;
  if (sheet.ok) {
    const version = Number(sheet.body.version ?? 0);
    sheetStatus =
      version >= 2
        ? `Working — connected to "${String(sheet.body.spreadsheet ?? "your sheet")}".`
        : "Reachable, but running an old version of the script. Paste the latest Code.gs and deploy a New version.";
  } else {
    const advice = sheetAdvice.find(([pattern]) => pattern.test(sheet.reason));
    sheetStatus = advice
      ? `Not working — ${advice[1]}`
      : `Not working — ${sheet.reason}. Check the URL in Vercel is the /exec web app URL.`;
  }

  // The first version of the script answers a dry run with "bad payload"
  // (and writes nothing), which the advice above maps to "update the script".
  const emailReady = has("RESEND_API_KEY") && has("RESEND_FROM");

  return NextResponse.json(
    {
      googleSheet: sheetStatus,
      googleSheetUrlFormat: sheet.urlLooksRight
        ? "OK (ends in /exec)"
        : "Doesn't look like a web app URL — it should be https://script.google.com/macros/s/…/exec",
      emails: emailReady
        ? "Configured (RESEND_API_KEY and RESEND_FROM are set)."
        : "Missing RESEND_API_KEY or RESEND_FROM in Vercel.",
      adminEmail: has("ADMIN_EMAIL") ? "Set." : "Missing ADMIN_EMAIL in Vercel.",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
