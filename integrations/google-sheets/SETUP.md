# Academy applications — setup guide

Every application submitted on `/academy` is:

1. **Added as a row to a Google Sheet** (through the Apps Script in `Code.gs`)
2. **Emailed to the admin inbox** (skyflixmedia@gmail.com) with every answer
3. **Confirmed to the applicant** by email with their Application ID

Emails go through [Resend](https://resend.com). Both services are free at this volume.

The application counts as received if **either** the sheet **or** the admin
email succeeds. If both fail, the applicant is told to try again, so no
application is silently lost.

---

## Part 1 — Google Sheet (about 10 minutes)

1. Sign in to Google with the Skyflix account (skyflixmedia@gmail.com) and
   create a new Google Sheet. Name it e.g. **Skyflix Academy — Applications**.
2. In the sheet: **Extensions → Apps Script**.
3. Delete everything in `Code.gs` in the editor and paste the whole contents
   of [Code.gs](Code.gs) (in this same folder). Click **Save**.
   - **Important:** open Apps Script *from the sheet* (Extensions → Apps
     Script). A script created at script.google.com isn't attached to any
     sheet. If that's how you made it, add a second script property
     `SHEET_ID` (step 4) with the ID from the sheet's address:
     `docs.google.com/spreadsheets/d/`**`<SHEET_ID>`**`/edit`
4. Create the shared secret (a password only the website and the script know):
   - In Apps Script, click the **gear icon (Project Settings)**.
   - Scroll to **Script Properties → Add script property**.
   - Property: `SHARED_SECRET`
   - Value: a long random string. Generate one with:
     ```
     node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"
     ```
   - **Save script properties.** Keep this value — you need it in Part 3.
5. Deploy it as a web app:
   - **Deploy → New deployment**, click the gear next to "Select type" → **Web app**.
   - Description: `Academy intake`
   - Execute as: **Me**
   - Who has access: **Anyone**
     (Anyone can reach the URL, but only requests carrying the secret are written.)
   - Click **Deploy**, then **Authorize access** and allow it with the Skyflix
     Google account. (If Google warns the app is unverified: Advanced → Go to
     project → Allow. It is your own script.)
   - Copy the **Web app URL** (ends in `/exec`).
6. Check it: open the Web app URL in a browser. You should see
   `{"ok":true,"service":"skyflix-academy-intake"}`.

The script creates an **Applications** tab and its header row on the first
submission. A **Review status** column starts as `New` for every applicant,
so the team can change it to Shortlisted / Selected / Not selected.

> **If you edit `Code.gs` later:** Deploy → **Manage deployments** → pencil
> icon → Version: **New version** → Deploy. This keeps the same URL.
> "New deployment" would give you a different URL.

---

## Part 2 — Resend emails (about 15 minutes, plus DNS wait)

1. Create an account at https://resend.com (use skyflixmedia@gmail.com).
2. **Verify the domain** so emails come from `@skyflixmedia.com.ng`:
   - Resend → **Domains → Add Domain** → `skyflixmedia.com.ng`
     (region: pick the closest, e.g. Ireland `eu-west-1`).
   - Resend shows 3–4 DNS records (MX, TXT/SPF, TXT/DKIM, optional DMARC).
   - Add them exactly as shown wherever the domain's DNS is managed
     (the `.com.ng` registrar, or Vercel if the domain uses Vercel nameservers:
     Vercel → Domains → skyflixmedia.com.ng → DNS Records).
   - Back in Resend click **Verify**. It can take from minutes to a few hours.
3. **API key:** Resend → **API Keys → Create API Key** → permission
   "Sending access", domain `skyflixmedia.com.ng`. Copy it (starts `re_`).
   It is only shown once.

> Until the domain is verified, Resend only lets you send **to your own
> account email** from `onboarding@resend.dev`. That is enough to test the
> admin notification, but applicants won't receive confirmations yet.

---

## Part 3 — Add the settings to Vercel

Vercel → the **skyflixmedia** project → **Settings → Environment Variables**.
Add each for **Production** (and Preview if you use it):

| Name | Value |
| --- | --- |
| `GOOGLE_SHEETS_WEBHOOK_URL` | the Web app URL from Part 1 (ends `/exec`) |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | the `SHARED_SECRET` value from Part 1 |
| `RESEND_API_KEY` | the `re_…` key from Part 2 |
| `RESEND_FROM` | `Skyflix Media Creative Academy <academy@skyflixmedia.com.ng>` |
| `ADMIN_EMAIL` | `skyflixmedia@gmail.com` (comma-separate to notify several people) |

Then **Deployments → the latest → ⋯ → Redeploy** so the new settings load.

For local testing, copy [.env.example](../../.env.example) (project root) to `.env.local` and fill in the same
values. Without any values, the form still works locally: submissions are
printed in the terminal instead of stored.

---

## Part 4 — Test it end to end

0. Open **https://www.skyflixmedia.com.ng/api/academy/status**. It checks
   the sheet connection (without writing anything) and says in plain words
   what to fix. Every line should say Working / OK / Set / Configured.
1. Go to https://www.skyflixmedia.com.ng/academy and click **Apply now**.
2. Submit a test application using your own email.
3. Check:
   - a new row in the **Applications** tab,
   - "New Academy application" in skyflixmedia@gmail.com,
   - "Application received" in the test applicant's inbox (check spam the first time).
4. Delete the test row from the sheet.

If something fails, the reason is in **Vercel → the project → Logs**; search
for `academy/apply`.

| Log message | Fix |
| --- | --- |
| `sheet failed: unauthorised` | The secret in Vercel doesn't match `SHARED_SECRET` in the script |
| `sheet failed: unexpected response (…)` | Web app access isn't "Anyone", or the URL isn't the `/exec` one |
| `resend 403` | Domain not verified yet, or `RESEND_FROM` uses a different domain |
| `not-configured` | That environment variable is missing — add it and redeploy |

---

## Under-18 applicants

The form collects a parent/guardian name and phone for applicants aged 16–17,
and their confirmation email says a guardian consent form will follow if they
are selected. **The online form is not itself guardian consent.** Send
selected under-18s a separate consent form for a parent/guardian to sign
before the bootcamp.
