import { col } from "@/lib/style";

const pillars = [
  {
    title: "End to end",
    copy: "Planning, production and post handled by one team, so nothing is lost between hands.",
    accent: "border-t-red-brand",
  },
  {
    title: "Built for live",
    copy: "Redundant set-ups and rehearsed workflows, because a live programme only happens once.",
    accent: "border-t-ink",
  },
  {
    title: "Consent first",
    copy: "Field work follows a clear standard on consent, dignity and ethical representation.",
    accent: "border-t-ink",
  },
  {
    title: "Ready to travel",
    copy: "Crews mobilise across states, with gear and logistics planned for hard-to-reach locations.",
    accent: "border-t-red-brand",
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-white text-ink">
      <div className="shell section-y-sm flex flex-col gap-[clamp(30px,4vw,54px)]">
        <div className="eyebrow">
          <span className="eyebrow-text">HOW WE WORK</span>
        </div>
        <div className="autofit gap-[clamp(24px,3vw,44px)]" style={col("260px")}>
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              data-reveal
              className={`flex flex-col gap-3 border-t-[6px] pt-5 ${pillar.accent}`}
            >
              <h3 className="m-0 text-[clamp(22px,2.4vw,30px)] font-extrabold leading-[1.05]">
                {pillar.title}
              </h3>
              <p className="m-0 font-body text-[17px] leading-[1.5] text-[#333333]">
                {pillar.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
