import { col } from "@/lib/style";

const facilitators = [
  "Photography & post",
  "Videography & editing",
  "Livestream & broadcast",
  "Sound engineering",
];

export default function Facilitators() {
  return (
    <section id="facilitators" className="bg-white text-ink">
      <div className="shell section-y-sm flex flex-col gap-[clamp(28px,4vw,48px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <div className="flex flex-col gap-[14px]">
            <div className="eyebrow">
              <span className="eyebrow-text">FACILITATORS</span>
            </div>
            <h2 className="h-section">Taught by working crew</h2>
          </div>
          <p className="m-0 font-mono text-[13px] leading-[1.6] text-mute-500">
            Send facilitator names, roles, short bios and headshots to fill
            these cards.
          </p>
        </div>
        <div
          className="autofit gap-[clamp(14px,2vw,24px)]"
          style={col("230px")}
        >
          {facilitators.map((role) => (
            <div key={role} data-reveal className="flex flex-col gap-[14px]">
              <div className="headshot-placeholder">
                <span className="font-mono text-[11px] tracking-[0.12em] text-mute-500">
                  FACILITATOR PHOTO
                  <br />
                  DROP IMAGE HERE
                </span>
              </div>
              <div>
                <div className="text-[19px] font-bold">Name</div>
                <div className="font-body text-[15px] font-semibold text-red-brand">
                  {role}
                </div>
                <p className="mx-0 mb-0 mt-2 font-body text-[15px] leading-[1.5] text-[#444444]">
                  One-line bio: years on the job, notable clients.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
