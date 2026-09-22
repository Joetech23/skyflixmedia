import { col } from "@/lib/style";

export default function Partners() {
  return (
    <section className="bg-red-brand">
      <div className="shell flex flex-col gap-[clamp(20px,3vw,34px)] py-[clamp(48px,7vw,90px)]">
        <div className="autofit items-end gap-5" style={col("280px")}>
          <h2 className="m-0 text-[clamp(26px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            PARTNERS &amp; SPONSORS
          </h2>
          <p className="m-0 font-body text-[17px] leading-[1.5] text-red-softer">
            Organisations funding seats, hosting placements or co-delivering
            modules. Send logos to place here.
          </p>
        </div>
        <div className="autofit gap-3" style={col("150px")}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="grid aspect-[5/2] place-items-center bg-[rgba(0,0,0,0.22)] p-[10px]"
            >
              <span className="font-mono text-[11px] tracking-[0.12em] text-red-tint">
                PARTNER LOGO
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
