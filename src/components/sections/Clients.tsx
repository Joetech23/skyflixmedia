import { col } from "@/lib/style";

export default function Clients() {
  return (
    <section className="bg-red-brand">
      <div className="shell flex flex-col gap-[clamp(24px,3vw,40px)] py-[clamp(48px,7vw,96px)]">
        <span className="kicker text-red-soft">CLIENTS &amp; PARTNERS</span>
        <div className="autofit gap-3" style={col("150px")}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="grid aspect-[5/2] place-items-center bg-[rgba(0,0,0,0.22)] p-[10px] text-center"
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-red-tint">
                CLIENT LOGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
