import { col } from "@/lib/style";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink">
      <div className="shell section-y-sm flex flex-col gap-[clamp(28px,4vw,48px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <h2 className="h-section">WHAT CLIENTS SAY</h2>
          <p className="m-0 font-mono text-[13px] leading-[1.6] text-mute-500">
            Placeholder quotes — send real client words and attributions to
            replace them.
          </p>
        </div>
        <div
          className="autofit gap-[clamp(14px,2vw,22px)]"
          style={col("280px")}
        >
          {Array.from({ length: 3 }).map((_, index) => (
            <blockquote
              key={index}
              data-reveal
              className="m-0 flex flex-col gap-[18px] border-l-[6px] border-red-brand bg-ink-card p-[clamp(24px,3vw,36px)]"
            >
              <p className="m-0 font-body text-[19px] leading-[1.55] text-[#e4e4e4]">
                Client quote goes here — one or two sentences about the shoot,
                the crew and the result.
              </p>
              <footer className="font-mono text-xs tracking-[0.12em] text-mute-500">
                CLIENT NAME · ORGANISATION
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
