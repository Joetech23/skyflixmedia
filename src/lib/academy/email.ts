import "server-only";
import {
  PROGRAMME,
  formatInterests,
  formatStatus,
  type Application,
} from "@/lib/academy/application";

type SendResult = { ok: true } | { ok: false; reason: string };

const RED = "#FF0000";

const escapeHtml = (value: string | number) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const paragraphs = (text: string) =>
  escapeHtml(text).replace(/\r?\n/g, "<br>");

async function send(message: {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return { ok: false, reason: "not-configured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (response.ok) return { ok: true };
    const detail = await response.text();
    return { ok: false, reason: `resend ${response.status}: ${detail.slice(0, 200)}` };
  } catch (error) {
    return { ok: false, reason: error instanceof Error ? error.message : "network error" };
  }
}

const shell = (inner: string) => `<!doctype html>
<html><body style="margin:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;color:#0a0a0a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff">
<tr><td style="background:#050505;padding:22px 28px">
<div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.04em">SKYFLIX MEDIA</div>
<div style="color:${RED};font-size:11px;font-weight:700;letter-spacing:0.22em;margin-top:4px">CREATIVE ACADEMY</div>
</td></tr>
<tr><td style="height:6px;background:${RED}"></td></tr>
<tr><td style="padding:28px">${inner}</td></tr>
<tr><td style="background:#050505;padding:18px 28px;color:#8a8a8a;font-size:12px;line-height:1.6">
We Capture. We Create. We Train.<br>
Skyflix Media Creative Academy · skyflixmedia@gmail.com · +234 808 314 3524
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;

/** Confirmation to the applicant, using the Academy's final submission message. */
export function sendApplicantConfirmation(a: Application, id: string) {
  const name = a.firstName;
  const html = shell(`
<h1 style="margin:0 0 16px;font-size:24px;line-height:1.2">Application received, ${escapeHtml(name)}.</h1>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#2b2b2b">
Thank you for applying to the Skyflix Media Creative Academy — ${escapeHtml(PROGRAMME.name)}.
Your application has been received successfully.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0;border-left:4px solid ${RED};background:#f7f7f7;width:100%">
<tr><td style="padding:14px 18px;font-size:14px;line-height:1.7;color:#2b2b2b">
<strong>Application ID:</strong> ${escapeHtml(id)}<br>
<strong>Programme:</strong> ${escapeHtml(PROGRAMME.name)}<br>
<strong>Dates:</strong> ${escapeHtml(PROGRAMME.dates)}<br>
<strong>Venue:</strong> ${escapeHtml(PROGRAMME.location)}
</td></tr></table>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#2b2b2b">
Our team will review all applications, and shortlisted/selected applicants will be contacted using
the email address and phone number you provided.</p>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#2b2b2b">
Good luck, and thank you for your interest in learning, creating and telling stories through visual media.</p>
${
  a.age < 18
    ? `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#2b2b2b">
Because you are under 18, a parent or guardian consent form will be sent to the guardian you listed if you are selected.</p>`
    : ""
}
<p style="margin:22px 0 0;font-size:14px;line-height:1.6;color:#555555">
Stay connected — follow us on our social media handles (@skyfixmedia) for updates and announcements.</p>`);

  const text = [
    `Application received, ${name}.`,
    "",
    `Thank you for applying to the Skyflix Media Creative Academy — ${PROGRAMME.name}. Your application has been received successfully.`,
    "",
    `Application ID: ${id}`,
    `Dates: ${PROGRAMME.dates}`,
    `Venue: ${PROGRAMME.location}`,
    "",
    "Our team will review all applications, and shortlisted/selected applicants will be contacted using the email address and phone number you provided.",
    "",
    "Good luck, and thank you for your interest in learning, creating and telling stories through visual media.",
    "",
    "Skyflix Media Creative Academy — We Capture. We Create. We Train.",
  ].join("\n");

  return send({
    to: [a.email],
    subject: `Application received — ${PROGRAMME.name} (${id})`,
    html,
    text,
    replyTo: process.env.ADMIN_EMAIL,
  });
}

/** Full application to the Academy inbox; replying goes straight to the applicant. */
export function sendAdminNotification(a: Application, id: string, submittedAt: string) {
  const admin = process.env.ADMIN_EMAIL;
  if (!admin) return Promise.resolve<SendResult>({ ok: false, reason: "not-configured" });

  const fullName = [a.firstName, a.middleName, a.surname].filter(Boolean).join(" ");
  const rows: [string, string | number][] = [
    ["Application ID", id],
    ["Submitted (WAT)", submittedAt],
    ["Name", fullName],
    ["Email", a.email],
    ["Phone / WhatsApp", a.phone],
    ["Age", a.age],
    ["Gender", a.gender],
    ["Location", `${a.city}, ${a.state}`],
    ...(a.age < 18
      ? ([
          ["Guardian", a.guardianName],
          ["Guardian phone", a.guardianPhone],
        ] as [string, string][])
      : []),
    ["School / Organisation / Workplace", a.affiliation],
    ["Status", formatStatus(a)],
    ["Interests", formatInterests(a)],
    ["Experience", a.experience],
    ["Equipment access", a.equipment],
    ["Prior creative work", a.hasPriorWork],
    ...(a.hasPriorWork === "Yes"
      ? ([
          ["About prior work", a.priorWork],
          ["Portfolio link", a.portfolioLink || "—"],
        ] as [string, string][])
      : []),
    ["Why join", a.motivation],
    ["Goals", a.goals.join(", ") || "—"],
    ["Story to document", a.story],
    ["Heard about us", a.heardFrom],
    ["Anything else", a.anythingElse || "—"],
    ["Media consent", a.mediaConsent],
  ];

  const html = shell(`
<div style="font-size:11px;font-weight:700;letter-spacing:0.22em;color:${RED}">NEW APPLICATION · ${escapeHtml(PROGRAMME.cohort.toUpperCase())}</div>
<h1 style="margin:8px 0 18px;font-size:22px;line-height:1.25">${escapeHtml(fullName)} (${escapeHtml(a.age)}, ${escapeHtml(a.state)})</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.55">
${rows
  .map(
    ([label, value]) => `<tr>
<td style="padding:9px 12px 9px 0;border-top:1px solid #e4e4e4;color:#6a6a6a;vertical-align:top;width:34%">${escapeHtml(label)}</td>
<td style="padding:9px 0;border-top:1px solid #e4e4e4;color:#0a0a0a;vertical-align:top">${paragraphs(String(value))}</td>
</tr>`
  )
  .join("")}
</table>
<p style="margin:20px 0 0;font-size:13px;color:#6a6a6a">Reply to this email to contact the applicant directly. The full list is in the Academy Google Sheet.</p>`);

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");

  return send({
    to: admin.split(",").map((s) => s.trim()).filter(Boolean),
    subject: `New Academy application — ${fullName} (${id})`,
    html,
    text,
    replyTo: a.email,
  });
}
