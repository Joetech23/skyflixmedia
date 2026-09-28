import { z } from "zod";

/**
 * Cohort 1 application: the single source of truth for fields, options and
 * rules. The client form and the /api/academy/apply route both validate
 * against `applicationSchema`, so they can never disagree.
 */

export const PROGRAMME = {
  cohort: "Cohort 1 — October 2026",
  name: "Photography & Visual Storytelling Bootcamp",
  dates: "13–15 October 2026",
  location: "Maiduguri, Borno State",
  places: 30,
  minAge: 16,
  maxAge: 30,
} as const;

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT (Abuja)", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

export const GENDERS = ["Female", "Male", "Prefer not to say", "Other"] as const;

export const STATUSES = [
  "Student",
  "Recent graduate",
  "Employed",
  "Self-employed / Entrepreneur",
  "Unemployed",
  "Under-employed",
  "Content creator / Creative professional",
  "Other",
] as const;

export const INTERESTS = [
  "Photography",
  "Videography",
  "Video editing",
  "Livestreaming",
  "Visual storytelling",
  "Documentary production",
  "Digital communication",
  "Content creation",
  "Creative entrepreneurship",
] as const;

export const EXPERIENCE = [
  "Beginner — I am just starting",
  "Basic — I have some experience",
  "Intermediate — I have created projects before",
  "Advanced — I already work professionally or regularly",
] as const;

export const EQUIPMENT = [
  "Yes, I own a camera",
  "Yes, I can borrow or access one",
  "No, I don't currently have access to one",
] as const;

export const GOALS = [
  "Build a portfolio",
  "Start a creative career",
  "Improve existing skills",
  "Start a media business",
  "Tell stories from my community",
  "Get professional experience",
  "Develop content creation skills",
  "Connect with other creatives",
] as const;

export const HEARD_FROM = [
  "Instagram",
  "Facebook",
  "TikTok",
  "LinkedIn",
  "WhatsApp",
  "Friend / Family",
  "School / University",
  "Organisation / Community",
  "News media",
  "Skyflix Media",
  "Other",
] as const;

export const MEDIA_CONSENT = [
  "I consent to being photographed/filmed for Academy documentation and communication.",
  "I do not consent to being photographed/filmed.",
] as const;

export const WORD_LIMITS = {
  motivation: { min: 50 },
  story: { min: 50, max: 100 },
} as const;

export const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).length : 0;

const trimmed = (max: number) => z.string().trim().max(max);
const required = (label: string, max = 120) =>
  trimmed(max).min(1, `${label} is required.`);
const oneOf = <T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.enum(values as unknown as [T[number], ...T[number][]], {
    errorMap: () => ({ message }),
  });

const baseSchema = z.object({
    // Step 1 — programme
    canAttend: z.literal("Yes", {
      errorMap: (_issue, ctx) => ({
        message:
          ctx.data === "No"
            ? "The bootcamp is in person in Maiduguri for all three days, so full attendance is required to apply."
            : "Please choose Yes or No.",
      }),
    }),

    // Step 2 — about you
    firstName: required("First name", 60),
    middleName: trimmed(60).optional().default(""),
    surname: required("Surname", 60),
    email: z.string().trim().toLowerCase().email("Enter a valid email address."),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[\d\s()-]{7,20}$/, "Enter a valid phone or WhatsApp number."),
    // Empty box → "Enter your age", not a confusing "must be 16–30" for 0.
    age: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.coerce
        .number({ invalid_type_error: "Enter your age." })
        .int("Enter your age in whole years.")
        .min(PROGRAMME.minAge, `Applicants must be ${PROGRAMME.minAge}–${PROGRAMME.maxAge}.`)
        .max(PROGRAMME.maxAge, `Applicants must be ${PROGRAMME.minAge}–${PROGRAMME.maxAge}.`)
    ),
    gender: oneOf(GENDERS, "Select an option."),
    city: required("City or town", 80),
    state: oneOf(NIGERIAN_STATES, "Select your state."),
    guardianName: trimmed(120).optional().default(""),
    guardianPhone: trimmed(20).optional().default(""),

    // Step 3 — education & status
    affiliation: required("School, organisation or workplace", 160),
    status: oneOf(STATUSES, "Select the option that best describes you."),
    statusOther: trimmed(80).optional().default(""),

    // Step 4 — creative background
    interests: z
      .array(oneOf(INTERESTS, "Unknown interest."))
      .min(1, "Pick at least one area."),
    interestOther: trimmed(80).optional().default(""),
    experience: oneOf(EXPERIENCE, "Select your level of experience."),
    equipment: oneOf(EQUIPMENT, "Select an option."),
    hasPriorWork: z.enum(["Yes", "No"], {
      errorMap: () => ({ message: "Select Yes or No." }),
    }),
    priorWork: trimmed(1200).optional().default(""),
    portfolioLink: trimmed(300).optional().default(""),

    // Step 5 — motivation
    motivation: trimmed(4000).refine(
      (value) => countWords(value) >= WORD_LIMITS.motivation.min,
      `Write at least ${WORD_LIMITS.motivation.min} words.`
    ),
    goals: z.array(oneOf(GOALS, "Unknown goal.")).default([]),
    story: trimmed(1500).refine(
      (value) => {
        const words = countWords(value);
        return words >= WORD_LIMITS.story.min && words <= WORD_LIMITS.story.max;
      },
      `Write between ${WORD_LIMITS.story.min} and ${WORD_LIMITS.story.max} words.`
    ),

    // Step 6 — final details
    heardFrom: oneOf(HEARD_FROM, "Tell us how you heard about the Academy."),
    anythingElse: trimmed(2000).optional().default(""),
    mediaConsent: oneOf(MEDIA_CONSENT, "Choose one option."),
    declaration: z.literal(true, {
      errorMap: () => ({ message: "Please confirm the declaration to submit." }),
    }),
});

const PHONE = /^\+?[\d\s()-]{7,20}$/;

type Issue = { path: ApplicationFieldName; message: string };
type ApplicationFieldName = keyof z.input<typeof baseSchema>;

/**
 * Rules that depend on other answers. Written against loose input so the form
 * can run them on a half-finished application, one step at a time.
 */
export function conditionalIssues(data: Partial<Record<ApplicationFieldName, unknown>>): Issue[] {
  const issues: Issue[] = [];
  const text = (key: ApplicationFieldName) =>
    typeof data[key] === "string" ? (data[key] as string).trim() : "";
  const age = Number(data.age);

  if (Number.isFinite(age) && age > 0 && age < 18) {
    if (!text("guardianName")) {
      issues.push({
        path: "guardianName",
        message: "A parent or guardian's name is required for applicants under 18.",
      });
    }
    if (!PHONE.test(text("guardianPhone"))) {
      issues.push({ path: "guardianPhone", message: "Enter a parent or guardian's phone number." });
    }
  }
  if (data.status === "Other" && !text("statusOther")) {
    issues.push({ path: "statusOther", message: "Tell us what describes you." });
  }
  if (data.hasPriorWork === "Yes" && !text("priorWork")) {
    issues.push({ path: "priorWork", message: "Tell us briefly about your work." });
  }
  const link = text("portfolioLink");
  if (data.hasPriorWork === "Yes" && link && !/^https?:\/\/\S+\.\S+/i.test(link)) {
    issues.push({ path: "portfolioLink", message: "Paste a full link starting with https://" });
  }
  return issues;
}

export const applicationSchema = baseSchema.superRefine((data, ctx) => {
  for (const issue of conditionalIssues(data)) {
    ctx.addIssue({ code: "custom", path: [issue.path], message: issue.message });
  }
});

export type Application = z.infer<typeof applicationSchema>;
export type ApplicationField = keyof Application;

/** Which fields each step owns, so the form can validate one step at a time. */
export const STEPS: { title: string; fields: ApplicationField[] }[] = [
  { title: "The programme", fields: ["canAttend"] },
  {
    title: "About you",
    fields: [
      "firstName", "middleName", "surname", "email", "phone", "age", "gender",
      "city", "state", "guardianName", "guardianPhone",
    ],
  },
  { title: "Education & status", fields: ["affiliation", "status", "statusOther"] },
  {
    title: "Your creative background",
    fields: [
      "interests", "interestOther", "experience", "equipment", "hasPriorWork",
      "priorWork", "portfolioLink",
    ],
  },
  { title: "Your motivation", fields: ["motivation", "goals", "story"] },
  {
    title: "Consent & declaration",
    fields: ["heardFrom", "anythingElse", "mediaConsent", "declaration"],
  },
];

/**
 * Errors for one step only, keyed by field. Uses the same rules as the server
 * so a step that passes here won't be rejected on submit.
 */
export function validateStep(
  values: Partial<Record<ApplicationField, unknown>>,
  step: number
): Partial<Record<ApplicationField, string>> {
  const fields = STEPS[step].fields;
  const mask = Object.fromEntries(fields.map((f) => [f, true])) as {
    [K in ApplicationField]?: true;
  };
  const errors: Partial<Record<ApplicationField, string>> = {};
  const result = baseSchema.pick(mask).safeParse(values);
  if (!result.success) {
    for (const issue of result.error.issues) {
      const key = issue.path[0] as ApplicationField;
      errors[key] ??= issue.message;
    }
  }
  for (const issue of conditionalIssues(values)) {
    if (fields.includes(issue.path)) errors[issue.path] ??= issue.message;
  }
  return errors;
}

/** Column order for the Google Sheet. Keys map to `toSheetRow` below. */
export const SHEET_COLUMNS = [
  "Application ID",
  "Submitted (WAT)",
  "Cohort",
  "Programme",
  "First name",
  "Middle name",
  "Surname",
  "Email",
  "Phone / WhatsApp",
  "Age",
  "Gender",
  "City / Town",
  "State",
  "Guardian name",
  "Guardian phone",
  "School / Organisation / Workplace",
  "Status",
  "Interests",
  "Experience",
  "Equipment access",
  "Prior creative work",
  "About prior work",
  "Portfolio link",
  "Why join",
  "Goals",
  "Story to document",
  "Heard about us",
  "Anything else",
  "Media consent",
  "Review status",
] as const;

export const formatStatus = (a: Application) =>
  a.status === "Other" ? `Other: ${a.statusOther}` : a.status;

export const formatInterests = (a: Application) =>
  [...a.interests, ...(a.interestOther ? [`Other: ${a.interestOther}`] : [])].join(", ");

export function toSheetRow(
  a: Application,
  meta: { id: string; submittedAt: string }
): Record<(typeof SHEET_COLUMNS)[number], string | number> {
  return {
    "Application ID": meta.id,
    "Submitted (WAT)": meta.submittedAt,
    Cohort: PROGRAMME.cohort,
    Programme: PROGRAMME.name,
    "First name": a.firstName,
    "Middle name": a.middleName,
    Surname: a.surname,
    Email: a.email,
    "Phone / WhatsApp": a.phone,
    Age: a.age,
    Gender: a.gender,
    "City / Town": a.city,
    State: a.state,
    "Guardian name": a.age < 18 ? a.guardianName : "",
    "Guardian phone": a.age < 18 ? a.guardianPhone : "",
    "School / Organisation / Workplace": a.affiliation,
    Status: formatStatus(a),
    Interests: formatInterests(a),
    Experience: a.experience,
    "Equipment access": a.equipment,
    "Prior creative work": a.hasPriorWork,
    "About prior work": a.hasPriorWork === "Yes" ? a.priorWork : "",
    "Portfolio link": a.hasPriorWork === "Yes" ? a.portfolioLink : "",
    "Why join": a.motivation,
    Goals: a.goals.join(", "),
    "Story to document": a.story,
    "Heard about us": a.heardFrom,
    "Anything else": a.anythingElse,
    "Media consent": a.mediaConsent.startsWith("I consent") ? "Consents" : "Does not consent",
    "Review status": "New",
  };
}
