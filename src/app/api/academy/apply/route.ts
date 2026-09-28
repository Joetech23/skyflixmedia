import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { applicationSchema, toSheetRow } from "@/lib/academy/application";
import { appendToSheet } from "@/lib/academy/sheets";
import {
  sendAdminNotification,
  sendApplicantConfirmation,
} from "@/lib/academy/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort flood guard. Serverless instances don't share memory, so this
// only slows a single client down; it is not a hard security boundary. Only
// complete, valid submissions count, and the cap is generous, because many
// applicants share one IP (mobile carrier NAT, school or café Wi-Fi).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const newId = () =>
  `SKF-C1-${randomBytes(4).toString("hex").toUpperCase().slice(0, 6)}`;

const watTimestamp = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real people never see or fill this field. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, id: newId() });
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json(
      { ok: false, error: "Some answers need attention.", fieldErrors },
      { status: 422 }
    );
  }

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many applications from this connection. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const application = parsed.data;
  const id = newId();
  const submittedAt = watTimestamp();

  const [sheet, admin] = await Promise.all([
    appendToSheet(toSheetRow(application, { id, submittedAt })),
    sendAdminNotification(application, id, submittedAt),
  ]);

  const nothingConfigured =
    !sheet.ok && sheet.reason === "not-configured" &&
    !admin.ok && admin.reason === "not-configured";

  if (!sheet.ok) console.error(`[academy/apply] ${id} sheet failed:`, sheet.reason);
  if (!admin.ok) console.error(`[academy/apply] ${id} admin email failed:`, admin.reason);

  if (nothingConfigured && process.env.NODE_ENV !== "production") {
    // Local development without keys: log it so the flow can still be tested.
    console.info(`[academy/apply] ${id} (dev, not stored)`, application);
  } else if (!sheet.ok && !admin.ok) {
    // Neither the sheet nor the inbox has it, so the application would be lost.
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your application just now. Please try again in a few minutes, or email skyflixmedia@gmail.com.",
      },
      { status: 502 }
    );
  }

  // Confirmation to the applicant is a courtesy; the application is already saved.
  const confirmation = await sendApplicantConfirmation(application, id);
  if (!confirmation.ok) {
    console.error(`[academy/apply] ${id} confirmation failed:`, confirmation.reason);
  }

  return NextResponse.json({ ok: true, id });
}
