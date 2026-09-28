import { PROGRAMME } from "@/lib/academy/application";
import { col } from "@/lib/style";

const facts = [
  { label: "DATES", value: PROGRAMME.dates },
  { label: "DURATION", value: "3 days, in person" },
  { label: "VENUE", value: PROGRAMME.location },
  { label: "PLACES", value: `${PROGRAMME.places} participants` },
  { label: "WHO CAN APPLY", value: `Ages ${PROGRAMME.minAge}–${PROGRAMME.maxAge}` },
  { label: "EXPERIENCE", value: "Beginners welcome" },
];

const outcomes = [
  {
    label: "LEARN",
    title: "Practical skills",
    copy: "Hands-on sessions in photography, visual storytelling, digital communication and creative entrepreneurship.",
  },
  {
    label: "CREATE",
    title: "Meaningful work",
    copy: "Complete practical assignments, create work that matters and start building your portfolio.",
  },
  {
    label: "CONNECT",
    title: "After the training",
    copy: "Selected participants may have access to post-training mentorship, portfolio development, professional exposure and potential internship/placement opportunities, subject to availability, performance, safeguarding requirements and host organisation policies.",
  },
];

export default function Programme() {
  return (
    <section id="programme" className="motif">
      <div className="shell section-y-sm flex flex-col gap-[clamp(26px,3.5vw,44px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <div className="flex flex-col gap-[14px]">
            <div className="eyebrow">
              <span className="eyebrow-text">CALL FOR APPLICATIONS</span>
            </div>
            <h2 className="m-0 text-[clamp(32px,5vw,68px)] font-extrabold leading-[0.98] tracking-[-0.02em]">
              COHORT 1
            </h2>
          </div>
          <p className="lede text-mute-400">
            Are you interested in photography, visual storytelling, videography,
            digital communication or creative entrepreneurship? This is our
            inaugural bootcamp.
          </p>
        </div>

        <div
          data-reveal
          className="autofit border border-ink-edge bg-ink-panel"
          style={col("300px")}
        >
          <div className="flex flex-col gap-[18px] border-b border-ink-edge p-[clamp(26px,3.4vw,44px)] min-[760px]:border-b-0 min-[760px]:border-r">
            <span className="self-start bg-red-brand px-3 py-[7px] font-mono text-[11px] tracking-[0.16em] text-white">
              COHORT 1 · APPLICATIONS OPEN
            </span>
            <h3 className="m-0 text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.05]">
              {PROGRAMME.name}
            </h3>
            <p className="m-0 font-body text-[18px] leading-[1.55] text-mute-300">
              A three-day practical training designed to help emerging creatives
              develop practical skills, create meaningful work, build their
              portfolios and connect with opportunities.
            </p>
            <a
              href="#apply"
              className="btn btn-solid mt-auto self-start px-7 py-[15px] text-[17px]"
            >
              Apply for Cohort 1
            </a>
          </div>
          <div
            className="autofit content-start gap-[22px] p-[clamp(26px,3.4vw,44px)] font-body"
            style={col("150px")}
          >
            {facts.map((fact) => (
              <div key={fact.label}>
                <div className="font-mono text-[11px] tracking-[0.16em] text-red-brand">
                  {fact.label}
                </div>
                <div className="mt-[7px] text-[19px] text-mute-100">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="autofit gap-[clamp(12px,1.6vw,20px)]"
          style={col("260px")}
        >
          {outcomes.map((item) => (
            <div
              key={item.label}
              data-reveal
              className="flex flex-col gap-3 border border-ink-edge bg-ink-card p-[clamp(22px,2.6vw,32px)]"
            >
              <div className="font-mono text-[11px] tracking-[0.16em] text-red-brand">
                {item.label}
              </div>
              <h4 className="m-0 text-[22px] font-bold">{item.title}</h4>
              <p className="m-0 font-body text-base leading-[1.55] text-mute-400">
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
