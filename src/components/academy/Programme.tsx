import { col } from "@/lib/style";

const facts = [
  { label: "DURATION", value: "To confirm" },
  { label: "START DATE", value: "To confirm" },
  { label: "FORMAT", value: "In-person, Abuja" },
  { label: "COHORT SIZE", value: "Limited seats" },
  { label: "FEE", value: "To confirm" },
  { label: "CERTIFICATE", value: "On completion" },
];

const extras = [
  {
    label: "WEEKEND TRACK",
    title: "Short course",
    copy: "A shorter weekend option for people already in work. Confirm if you plan to run it.",
  },
  {
    label: "MASTERCLASS",
    title: "One-day intensive",
    copy: "Single-topic sessions — lighting, colour, livestream set-up — for paying attendees.",
  },
  {
    label: "SCHOLARSHIP",
    title: "Sponsored seats",
    copy: "Partner-funded places for applicants who cannot pay fees. Open to sponsors.",
  },
];

export default function Programme() {
  return (
    <section id="programme" className="motif">
      <div className="shell section-y-sm flex flex-col gap-[clamp(26px,3.5vw,44px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <div className="flex flex-col gap-[14px]">
            <div className="eyebrow">
              <span className="eyebrow-text">UPCOMING PROGRAMMES</span>
            </div>
            <h2 className="m-0 text-[clamp(32px,5vw,68px)] font-extrabold leading-[0.98] tracking-[-0.02em]">
              FIRST EDITION
            </h2>
          </div>
          <p className="m-0 font-mono text-[13px] leading-[1.6] text-mute-500">
            Programme title, dates, duration and fee were cut off in your brief
            — send them and I will set them here.
          </p>
        </div>

        <div
          data-reveal
          className="autofit border border-ink-edge bg-ink-panel"
          style={col("300px")}
        >
          <div className="flex flex-col gap-[18px] border-r border-ink-edge p-[clamp(26px,3.4vw,44px)]">
            <span className="self-start bg-red-brand px-3 py-[7px] font-mono text-[11px] tracking-[0.16em] text-white">
              EDITION 01 · FLAGSHIP
            </span>
            <h3 className="m-0 text-[clamp(24px,2.8vw,38px)] font-extrabold leading-[1.05]">
              Programme name to confirm
            </h3>
            <p className="m-0 font-body text-[18px] leading-[1.55] text-mute-300">
              The flagship intake for the first edition of the Academy. Confirm
              the discipline focus — photography, videography, livestream
              operations or a combined multimedia track — and the full
              description will sit here.
            </p>
            <a
              href="#apply"
              className="btn btn-solid mt-auto self-start px-7 py-[15px] text-[17px]"
            >
              Apply for this intake
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
          {extras.map((extra) => (
            <div
              key={extra.label}
              data-reveal
              className="flex flex-col gap-3 border border-ink-edge bg-ink-card p-[clamp(22px,2.6vw,32px)]"
            >
              <div className="font-mono text-[11px] tracking-[0.16em] text-mute-500">
                {extra.label}
              </div>
              <h4 className="m-0 text-[22px] font-bold">{extra.title}</h4>
              <p className="m-0 font-body text-base leading-[1.5] text-mute-400">
                {extra.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
