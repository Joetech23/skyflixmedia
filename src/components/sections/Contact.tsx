"use client";

import { useState, type FormEvent } from "react";
import { col } from "@/lib/style";

const details = [
  { label: "PHONE", value: "+234 808 314 3524" },
  { label: "EMAIL", value: "skyflixmedia@gmail.com" },
  { label: "STUDIO", value: "Abuja, Nigeria." },
  { label: "SOCIAL", value: "@skyfixmedia" },
];

const servicesOptions = [
  "Photography",
  "Videography",
  "Livestream & Broadcast",
  "Documentary",
  "Event Support",
  "Partnership / NGO project",
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  // The design's prototype confirms locally; wire this to your booking
  // endpoint or inbox when one is available.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="motif">
      <div
        className="shell section-y autofit gap-[clamp(32px,5vw,72px)]"
        style={col("320px")}
      >
        <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
          <h2 className="m-0 text-[clamp(34px,5.4vw,76px)] font-extrabold leading-[0.94] tracking-[-0.02em]">
            LET&rsquo;S SHOOT SOMETHING GOOD
          </h2>
          <p className="lede max-w-[52ch] text-mute-300">
            Send us the date, the venue and the outcome you need. We will come
            back with a production plan and a quote.
          </p>
          <div className="autofit gap-5 font-body" style={col("180px")}>
            {details.map((detail) => (
              <div
                key={detail.label}
                className="border-t-[3px] border-red-brand pt-[14px]"
              >
                <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
                  {detail.label}
                </div>
                <div className="mt-[6px] text-[19px] text-mute-100">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-ink-edge bg-ink-panel p-[clamp(24px,3vw,40px)]">
          {sent ? (
            <div className="flex min-h-[320px] flex-col justify-center gap-[14px]">
              <div className="text-[clamp(24px,2.8vw,34px)] font-extrabold text-red-brand">
                Request received.
              </div>
              <p className="m-0 font-body text-[18px] leading-[1.55] text-mute-300">
                We will come back with a production plan and a quote. For
                anything urgent, call +234 808 314 3524.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-2 self-start border border-[#4a4a4a] bg-transparent px-[22px] py-3 font-body text-base text-white transition-colors hover:border-red-brand hover:text-red-brand"
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="kicker text-red-brand">BOOKING ENQUIRY</div>
              <div className="autofit gap-3" style={col("180px")}>
                <label className="field-label">
                  NAME
                  <input name="name" required className="field" />
                </label>
                <label className="field-label">
                  ORGANISATION
                  <input name="org" className="field" />
                </label>
                <label className="field-label">
                  EMAIL
                  <input name="email" type="email" required className="field" />
                </label>
                <label className="field-label">
                  PHONE
                  <input name="phone" className="field" />
                </label>
                <label className="field-label">
                  SERVICE
                  <select name="service" className="field">
                    {servicesOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="field-label">
                  EVENT DATE
                  <input name="date" type="date" className="field" />
                </label>
              </div>
              <label className="field-label">
                VENUE &amp; WHAT YOU NEED
                <textarea name="brief" rows={4} className="field resize-y" />
              </label>
              <button
                type="submit"
                className="btn btn-solid cursor-pointer border-none px-6 py-[17px] text-[18px]"
              >
                Send enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
