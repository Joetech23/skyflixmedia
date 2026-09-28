"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  EQUIPMENT,
  EXPERIENCE,
  GENDERS,
  GOALS,
  HEARD_FROM,
  INTERESTS,
  MEDIA_CONSENT,
  NIGERIAN_STATES,
  PROGRAMME,
  STATUSES,
  STEPS,
  WORD_LIMITS,
  countWords,
  validateStep,
  type ApplicationField,
} from "@/lib/academy/application";

type Values = {
  canAttend: string;
  firstName: string;
  middleName: string;
  surname: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  city: string;
  state: string;
  guardianName: string;
  guardianPhone: string;
  affiliation: string;
  status: string;
  statusOther: string;
  interests: string[];
  interestOther: string;
  experience: string;
  equipment: string;
  hasPriorWork: string;
  priorWork: string;
  portfolioLink: string;
  motivation: string;
  goals: string[];
  story: string;
  heardFrom: string;
  anythingElse: string;
  mediaConsent: string;
  declaration: boolean;
};

type Errors = Partial<Record<ApplicationField | "form", string>>;

const EMPTY: Values = {
  canAttend: "",
  firstName: "",
  middleName: "",
  surname: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  city: "",
  state: "",
  guardianName: "",
  guardianPhone: "",
  affiliation: "",
  status: "",
  statusOther: "",
  interests: [],
  interestOther: "",
  experience: "",
  equipment: "",
  hasPriorWork: "",
  priorWork: "",
  portfolioLink: "",
  motivation: "",
  goals: [],
  story: "",
  heardFrom: "",
  anythingElse: "",
  mediaConsent: "",
  declaration: false,
};

const DRAFT_KEY = "skyflix-academy-application-c1";

// Drafts are a convenience only: storage can be blocked or cleared, so every
// access is guarded and the form works the same without it.
function loadDraft(): { values: Values; step: number } | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      values: { ...EMPTY, ...parsed.values, declaration: false },
      step: Math.min(Math.max(Number(parsed.step) || 0, 0), STEPS.length - 1),
    };
  } catch {
    return null;
  }
}

function saveDraft(values: Values, step: number) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ values, step }));
  } catch {
    /* storage unavailable */
  }
}

function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* storage unavailable */
  }
}

export default function ApplyForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const draft = loadDraft();
    if (draft && JSON.stringify(draft.values) !== JSON.stringify(EMPTY)) {
      setValues(draft.values);
      setStep(draft.step);
      setRestored(true);
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current && !submittedId) saveDraft(values, step);
  }, [values, step, submittedId]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start" });
  }, [step, submittedId]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as ApplicationField]) return current;
      const next = { ...current };
      delete next[key as ApplicationField];
      return next;
    });
  };

  const toggle = (key: "interests" | "goals", option: string) => {
    const list = values[key];
    set(
      key,
      list.includes(option) ? list.filter((o) => o !== option) : [...list, option]
    );
  };

  const focusFirstError = (found: Errors) => {
    const first = Object.keys(found)[0];
    if (!first) return;
    window.requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-field="${first}"]`);
      el?.scrollIntoView({ block: "center" });
      el?.querySelector<HTMLElement>("input, select, textarea")?.focus({
        preventScroll: true,
      });
    });
  };

  const checkStep = (index: number) => {
    const found = validateStep(values, index);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(found);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!checkStep(step)) return;
    setRestored(false);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => {
    setRestored(false);
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const startOver = () => {
    clearDraft();
    setValues(EMPTY);
    setErrors({});
    setStep(0);
    setRestored(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    if (!checkStep(step) || submitting) return;

    // Last line of defence: re-check every step before sending.
    for (let i = 0; i < STEPS.length; i += 1) {
      const found = validateStep(values, i);
      if (Object.keys(found).length) {
        setStep(i);
        setErrors(found);
        focusFirstError(found);
        return;
      }
    }

    setSubmitting(true);
    setErrors({});
    const honeypot =
      (event.currentTarget.elements.namedItem("website") as HTMLInputElement | null)
        ?.value ?? "";

    try {
      const response = await fetch("/api/academy/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.ok) {
        clearDraft();
        setSubmittedId(result.id);
        return;
      }

      if (result.fieldErrors) {
        const fieldErrors = result.fieldErrors as Errors;
        const target = STEPS.findIndex((s) =>
          s.fields.some((f) => fieldErrors[f])
        );
        if (target >= 0) setStep(target);
        setErrors({ ...fieldErrors, form: result.error });
        focusFirstError(fieldErrors);
        return;
      }

      setErrors({
        form:
          result.error ??
          "Something went wrong. Please try again, or email skyflixmedia@gmail.com.",
      });
    } catch {
      setErrors({
        form: "We couldn't reach the server. Check your connection and try again — your answers are saved on this device.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedId) {
    return <Success id={submittedId} name={values.firstName} />;
  }

  const age = Number(values.age);
  const isMinor = Number.isFinite(age) && age >= PROGRAMME.minAge && age < 18;
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div ref={topRef} className="flex scroll-mt-4 flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <span className="kicker text-red-brand">
            STEP {step + 1} OF {STEPS.length}
          </span>
          <span className="font-body text-sm text-mute-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div
          className="h-[6px] w-full bg-ink-edge"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Application progress"
        >
          <div
            className="h-full bg-red-brand transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <h3 className="m-0 text-[clamp(22px,2.6vw,28px)] font-extrabold leading-[1.1]">
          {STEPS[step].title}
        </h3>
        {restored ? (
          <p className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 border-l-[3px] border-red-brand bg-ink-card px-4 py-3 font-body text-[15px] text-mute-300">
            We restored the answers you started earlier on this device.
            <button
              type="button"
              onClick={startOver}
              className="font-semibold text-red-brand underline underline-offset-4"
            >
              Start over
            </button>
          </p>
        ) : null}
      </div>

      {/* Hidden from people; bots that fill every field are ignored. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {step === 0 ? (
        <div className="flex flex-col gap-6">
          <p className="m-0 font-body text-[17px] leading-[1.6] text-mute-300">
            Thank you for your interest in the Skyflix Media Creative Academy.
            This three-day practical programme equips young people with hands-on
            skills in photography, visual storytelling, digital communication and
            creative entrepreneurship. Spaces are limited, and submitting an
            application does not guarantee selection.
          </p>
          <dl className="m-0 grid grid-cols-1 gap-px bg-ink-edge sm:grid-cols-2">
            {[
              ["Programme", PROGRAMME.name],
              ["Cohort", PROGRAMME.cohort],
              ["Dates", PROGRAMME.dates],
              ["Venue", `In person, ${PROGRAMME.location}`],
              ["Places", `${PROGRAMME.places} participants`],
              ["Who can apply", `Ages ${PROGRAMME.minAge}–${PROGRAMME.maxAge}`],
            ].map(([term, detail]) => (
              <div key={term} className="bg-ink-card px-4 py-3">
                <dt className="font-mono text-[11px] tracking-[0.16em] text-red-brand">
                  {term.toUpperCase()}
                </dt>
                <dd className="m-0 mt-1 font-body text-[16px] text-mute-100">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
          <Choice
            name="canAttend"
            label="Can you attend the full three-day programme in person in Maiduguri?"
            required
            options={["Yes", "No"]}
            value={values.canAttend}
            onChange={(v) => set("canAttend", v)}
            error={errors.canAttend}
            columns={2}
          />
          {values.canAttend === "No" ? (
            <p className="m-0 font-body text-[15px] leading-[1.6] text-mute-300">
              Selected participants must attend all three days in person. Follow
              @skyfixmedia for future cohorts and other ways to take part.
            </p>
          ) : null}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="flex flex-col gap-5">
          <Grid>
            <Text
              name="firstName"
              label="First name"
              required
              autoComplete="given-name"
              value={values.firstName}
              onChange={(v) => set("firstName", v)}
              error={errors.firstName}
            />
            <Text
              name="middleName"
              label="Middle name"
              autoComplete="additional-name"
              value={values.middleName}
              onChange={(v) => set("middleName", v)}
              error={errors.middleName}
            />
            <Text
              name="surname"
              label="Surname"
              required
              autoComplete="family-name"
              value={values.surname}
              onChange={(v) => set("surname", v)}
              error={errors.surname}
            />
          </Grid>
          <Grid>
            <Text
              name="email"
              label="Email address"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
            />
            <Text
              name="phone"
              label="Phone / WhatsApp number"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="+234 …"
              value={values.phone}
              onChange={(v) => set("phone", v)}
              error={errors.phone}
            />
            <Text
              name="age"
              label="Age"
              required
              inputMode="numeric"
              hint={`${PROGRAMME.minAge}–${PROGRAMME.maxAge}`}
              value={values.age}
              onChange={(v) => set("age", v.replace(/\D/g, "").slice(0, 2))}
              error={errors.age}
            />
          </Grid>
          <Choice
            name="gender"
            label="Gender"
            required
            options={GENDERS}
            value={values.gender}
            onChange={(v) => set("gender", v)}
            error={errors.gender}
            columns={2}
          />
          <Grid>
            <Text
              name="city"
              label="City / Town"
              required
              autoComplete="address-level2"
              value={values.city}
              onChange={(v) => set("city", v)}
              error={errors.city}
            />
            <Select
              name="state"
              label="State"
              required
              options={NIGERIAN_STATES}
              value={values.state}
              onChange={(v) => set("state", v)}
              error={errors.state}
            />
          </Grid>
          {isMinor ? (
            <div className="flex flex-col gap-4 border-l-[3px] border-red-brand bg-ink-card p-4">
              <p className="m-0 font-body text-[15px] leading-[1.6] text-mute-300">
                As you are under 18, we need a parent or guardian&rsquo;s details.
                If you are selected, we will send them a consent form to sign
                before the bootcamp.
              </p>
              <Grid>
                <Text
                  name="guardianName"
                  label="Parent / guardian name"
                  required
                  value={values.guardianName}
                  onChange={(v) => set("guardianName", v)}
                  error={errors.guardianName}
                />
                <Text
                  name="guardianPhone"
                  label="Parent / guardian phone"
                  type="tel"
                  required
                  inputMode="tel"
                  value={values.guardianPhone}
                  onChange={(v) => set("guardianPhone", v)}
                  error={errors.guardianPhone}
                />
              </Grid>
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="flex flex-col gap-5">
          <Text
            name="affiliation"
            label="Current school, organisation or workplace"
            required
            hint="Your school, university, organisation, workplace or business. If none, write “Not applicable”."
            value={values.affiliation}
            onChange={(v) => set("affiliation", v)}
            error={errors.affiliation}
          />
          <Choice
            name="status"
            label="Which best describes you?"
            required
            options={STATUSES}
            value={values.status}
            onChange={(v) => set("status", v)}
            error={errors.status}
            columns={2}
          />
          {values.status === "Other" ? (
            <Text
              name="statusOther"
              label="Please describe"
              required
              value={values.statusOther}
              onChange={(v) => set("statusOther", v)}
              error={errors.statusOther}
            />
          ) : null}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="flex flex-col gap-6">
          <Choice
            name="interests"
            label="Which areas are you interested in?"
            hint="Select all that apply."
            required
            multiple
            options={INTERESTS}
            value={values.interests}
            onChange={(v) => toggle("interests", v)}
            error={errors.interests}
            columns={2}
          />
          <Text
            name="interestOther"
            label="Another area (optional)"
            value={values.interestOther}
            onChange={(v) => set("interestOther", v)}
            error={errors.interestOther}
          />
          <Choice
            name="experience"
            label="What is your current level of experience?"
            required
            options={EXPERIENCE}
            value={values.experience}
            onChange={(v) => set("experience", v)}
            error={errors.experience}
          />
          <Choice
            name="equipment"
            label="Do you have access to a camera or other creative equipment?"
            hint="This is not a selection advantage — Academy equipment is available during training."
            required
            options={EQUIPMENT}
            value={values.equipment}
            onChange={(v) => set("equipment", v)}
            error={errors.equipment}
          />
          <Choice
            name="hasPriorWork"
            label="Have you created any creative work before?"
            required
            options={["Yes", "No"]}
            value={values.hasPriorWork}
            onChange={(v) => set("hasPriorWork", v)}
            error={errors.hasPriorWork}
            columns={2}
          />
          {values.hasPriorWork === "Yes" ? (
            <div className="flex flex-col gap-5 border-l-[3px] border-red-brand pl-4">
              <LongText
                name="priorWork"
                label="Tell us briefly about it"
                hint="Photography, videos, social media content, documentaries, event coverage, school or personal projects."
                required
                rows={4}
                value={values.priorWork}
                onChange={(v) => set("priorWork", v)}
                error={errors.priorWork}
              />
              <Text
                name="portfolioLink"
                label="Link to your work (optional)"
                hint="Google Drive, Instagram, TikTok, YouTube or a portfolio site. Make sure the link is viewable."
                type="url"
                inputMode="url"
                placeholder="https://"
                value={values.portfolioLink}
                onChange={(v) => set("portfolioLink", v)}
                error={errors.portfolioLink}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="flex flex-col gap-6">
          <LongText
            name="motivation"
            label="Why do you want to join the bootcamp, and what do you hope to gain?"
            hint="Tell us about your interest in photography, visual storytelling or creative media."
            required
            rows={6}
            minWords={WORD_LIMITS.motivation.min}
            value={values.motivation}
            onChange={(v) => set("motivation", v)}
            error={errors.motivation}
          />
          <Choice
            name="goals"
            label="What do you hope to achieve after the training?"
            hint="Select any that apply."
            multiple
            options={GOALS}
            value={values.goals}
            onChange={(v) => toggle("goals", v)}
            error={errors.goals}
            columns={2}
          />
          <LongText
            name="story"
            label="Tell us about a story, issue or community you would like to document through photography or visual storytelling."
            required
            rows={5}
            minWords={WORD_LIMITS.story.min}
            maxWords={WORD_LIMITS.story.max}
            value={values.story}
            onChange={(v) => set("story", v)}
            error={errors.story}
          />
        </div>
      ) : null}

      {step === 5 ? (
        <div className="flex flex-col gap-6">
          <Select
            name="heardFrom"
            label="How did you hear about the Skyflix Media Creative Academy?"
            required
            options={HEARD_FROM}
            value={values.heardFrom}
            onChange={(v) => set("heardFrom", v)}
            error={errors.heardFrom}
          />
          <LongText
            name="anythingElse"
            label="Is there anything else you would like us to know? (optional)"
            hint="Your creative journey, challenges accessing equipment or training, your community, or a particular goal."
            rows={4}
            value={values.anythingElse}
            onChange={(v) => set("anythingElse", v)}
            error={errors.anythingElse}
          />
          <Choice
            name="mediaConsent"
            label="Photography & media consent"
            hint="During the Academy, photographs and videos may be taken for programme documentation, reporting and communication. Your choice does not affect selection."
            required
            options={MEDIA_CONSENT}
            value={values.mediaConsent}
            onChange={(v) => set("mediaConsent", v)}
            error={errors.mediaConsent}
          />
          {isMinor ? (
            <p className="m-0 font-body text-[15px] leading-[1.6] text-mute-400">
              For applicants under 18, a parent or guardian will also be asked to
              give consent if you are selected.
            </p>
          ) : null}
          <div data-field="declaration" className="flex flex-col gap-2">
            <span className="field-label !text-mute-200">
              APPLICANT DECLARATION <Req />
            </span>
            <label
              className={`flex cursor-pointer items-start gap-3 border bg-ink-deep p-4 font-body text-[15px] leading-[1.6] text-mute-200 transition-colors has-[:checked]:border-red-brand ${
                errors.declaration ? "border-red-brand" : "border-ink-field"
              }`}
            >
              <input
                type="checkbox"
                checked={values.declaration}
                onChange={(e) => set("declaration", e.target.checked)}
                className="mt-1 h-[18px] w-[18px] flex-none accent-red-brand"
                aria-invalid={Boolean(errors.declaration)}
              />
              <span>
                I confirm that the information in this application is accurate
                to the best of my knowledge, and I understand that submitting it
                does not guarantee selection.
              </span>
            </label>
            <FieldError message={errors.declaration} />
          </div>
        </div>
      ) : null}

      {errors.form ? (
        <p
          role="alert"
          className="m-0 border-l-[3px] border-red-brand bg-[rgba(255,0,0,0.08)] px-4 py-3 font-body text-[15px] leading-[1.5] text-white"
        >
          {errors.form}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink-edge pt-5">
        {step > 0 ? (
          <button
            type="button"
            onClick={back}
            className="border border-[#4a4a4a] bg-transparent px-6 py-[14px] font-body text-base font-semibold text-white transition-colors hover:border-white"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting || (step === 0 && values.canAttend === "No")}
          className="btn btn-solid min-w-[180px] cursor-pointer border-none px-7 py-[15px] text-[17px] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-red-brand disabled:hover:text-white"
        >
          {step < STEPS.length - 1
            ? "Continue →"
            : submitting
              ? "Submitting…"
              : "Submit application"}
        </button>
      </div>
    </form>
  );
}

/* ---------- Pieces ---------- */

function Req() {
  return (
    <span aria-hidden="true" className="text-red-brand">
      *
    </span>
  );
}

function FieldError({ message, id }: { message?: string; id?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="font-body text-[14px] text-[#ff6b6b]">
      {message}
    </span>
  );
}

function Grid({ children }: { children: ReactNode }) {
  return (
    <div className="autofit gap-4" style={{ ["--col" as string]: "180px" }}>
      {children}
    </div>
  );
}

type TextProps = {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "url";
};

function Text({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
}: TextProps) {
  const errorId = `${name}-error`;
  return (
    <div data-field={name} className="flex flex-col gap-2">
      <label className="field-label">
        <span>
          {label.toUpperCase()} {required ? <Req /> : null}
        </span>
        <input
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`field ${error ? "!border-red-brand" : ""}`}
        />
      </label>
      {hint ? (
        <span className="font-body text-[13px] leading-[1.5] text-mute-500">{hint}</span>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function Select({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}) {
  const errorId = `${name}-error`;
  return (
    <div data-field={name} className="flex flex-col gap-2">
      <label className="field-label">
        <span>
          {label.toUpperCase()} {required ? <Req /> : null}
        </span>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`field ${error ? "!border-red-brand" : ""} ${value ? "" : "text-mute-500"}`}
        >
          <option value="">Select…</option>
          {options.map((option) => (
            <option key={option} value={option} className="text-white">
              {option}
            </option>
          ))}
        </select>
      </label>
      <FieldError id={errorId} message={error} />
    </div>
  );
}

function LongText({
  name,
  label,
  value,
  onChange,
  error,
  hint,
  required,
  rows = 4,
  minWords,
  maxWords,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  rows?: number;
  minWords?: number;
  maxWords?: number;
}) {
  const words = countWords(value);
  const counted = minWords !== undefined || maxWords !== undefined;
  const inRange =
    (minWords === undefined || words >= minWords) &&
    (maxWords === undefined || words <= maxWords);
  const errorId = `${name}-error`;
  const range =
    minWords && maxWords
      ? `${minWords}–${maxWords} words`
      : minWords
        ? `at least ${minWords} words`
        : "";

  return (
    <div data-field={name} className="flex flex-col gap-2">
      <label className="field-label">
        <span className="normal-case leading-[1.5] tracking-normal text-mute-200 [font-size:15px]">
          {label} {required ? <Req /> : null}
        </span>
        {hint ? (
          <span className="normal-case leading-[1.5] tracking-normal text-mute-500 [font-size:13px]">
            {hint}
          </span>
        ) : null}
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : `${name}-count`}
          className={`field resize-y leading-[1.55] ${error ? "!border-red-brand" : ""}`}
        />
      </label>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <FieldError id={errorId} message={error} />
        {counted ? (
          <span
            id={`${name}-count`}
            aria-live="polite"
            className={`ml-auto font-mono text-[12px] tracking-[0.06em] ${
              words === 0 ? "text-mute-500" : inRange ? "text-[#5bd18b]" : "text-[#ffb347]"
            }`}
          >
            {words} {words === 1 ? "word" : "words"} · {range}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function Choice({
  name,
  label,
  options,
  value,
  onChange,
  error,
  hint,
  required,
  multiple,
  columns = 1,
}: {
  name: string;
  label: string;
  options: readonly string[];
  value: string | string[];
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  multiple?: boolean;
  columns?: 1 | 2;
}) {
  const errorId = `${name}-error`;
  const isChecked = (option: string) =>
    Array.isArray(value) ? value.includes(option) : value === option;

  return (
    <fieldset
      data-field={name}
      aria-describedby={error ? errorId : undefined}
      className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0"
    >
      <legend className="mb-1 p-0 font-body text-[15px] leading-[1.5] text-mute-200">
        {label} {required ? <Req /> : null}
        {hint ? (
          <span className="mt-1 block text-[13px] text-mute-500">{hint}</span>
        ) : null}
      </legend>
      <div
        className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2" : "grid-cols-1"}`}
      >
        {options.map((option) => (
          <label
            key={option}
            className={`flex cursor-pointer items-start gap-3 border bg-ink-deep px-4 py-3 font-body text-[15px] leading-[1.45] text-mute-200 transition-colors hover:border-[#555] has-[:checked]:border-red-brand has-[:checked]:bg-[rgba(255,0,0,0.08)] has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-red-brand ${
              error ? "border-[rgba(255,0,0,0.5)]" : "border-ink-field"
            }`}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={option}
              checked={isChecked(option)}
              onChange={() => onChange(option)}
              className="mt-[3px] h-[18px] w-[18px] flex-none accent-red-brand"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

function Success({ id, name }: { id: string; name: string }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="kicker text-red-brand">APPLICATION RECEIVED</div>
      <h3 className="m-0 text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.05]">
        Thank you{name ? `, ${name}` : ""}.
      </h3>
      <p className="m-0 font-body text-[17px] leading-[1.6] text-mute-300">
        Thank you for applying to the Skyflix Media Creative Academy —{" "}
        {PROGRAMME.name}. Your application has been received successfully.
      </p>
      <div className="border-l-[3px] border-red-brand bg-ink-card px-4 py-3">
        <div className="font-mono text-[11px] tracking-[0.16em] text-mute-500">
          YOUR APPLICATION ID
        </div>
        <div className="mt-1 font-mono text-[20px] tracking-[0.08em] text-white">
          {id}
        </div>
      </div>
      <p className="m-0 font-body text-[17px] leading-[1.6] text-mute-300">
        Our team will review all applications, and shortlisted/selected
        applicants will be contacted using the email address and phone number
        provided. A confirmation has been sent to your email — check your spam
        folder if you don&rsquo;t see it.
      </p>
      <p className="m-0 font-body text-[17px] leading-[1.6] text-mute-300">
        Good luck, and thank you for your interest in learning, creating and
        telling stories through visual media.
      </p>
      <p className="m-0 border-t border-ink-edge pt-5 font-body text-[15px] leading-[1.6] text-mute-500">
        <span className="font-display font-bold text-white">
          We Capture. We Create. We Train.
        </span>
        <br />
        Stay connected — follow @skyfixmedia for updates and announcements.
      </p>
    </div>
  );
}
