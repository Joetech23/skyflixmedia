import { col } from "@/lib/style";

const roles = [
  "Creative Director",
  "Lead Photographer",
  "Broadcast Engineer",
  "Editor & Colourist",
  "Academy Coordinator",
];

export default function Team() {
  return (
    <section id="team" className="bg-white text-ink">
      <div className="shell section-y-sm flex flex-col gap-[clamp(28px,4vw,48px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <div className="flex flex-col gap-[14px]">
            <div className="eyebrow">
              <span className="eyebrow-text">THE TEAM</span>
            </div>
            <h2 className="h-section">The people on set</h2>
          </div>
          <p className="m-0 font-body text-[17px] leading-[1.5] text-[#3a3a3a]">
            Send names, roles and headshots and I will drop them straight into
            these cards.
          </p>
        </div>
        <div
          className="autofit gap-[clamp(14px,2vw,24px)]"
          style={col("210px")}
        >
          {roles.map((role) => (
            <div key={role} data-reveal className="flex flex-col gap-[14px]">
              <div className="headshot-placeholder">
                <span className="font-mono text-[11px] tracking-[0.12em] text-mute-500">
                  HEADSHOT
                  <br />
                  DROP PHOTO HERE
                </span>
              </div>
              <div>
                <div className="text-[19px] font-bold">Name</div>
                <div className="font-body text-[15px] font-semibold text-red-brand">
                  {role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
