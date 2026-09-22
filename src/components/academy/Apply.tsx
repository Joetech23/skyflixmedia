import Image from "next/image";
import ApplyForm from "@/components/academy/ApplyForm";
import { col } from "@/lib/style";

const lines = [
  { label: "ACADEMY LINE", value: "+234 808 314 3524" },
  { label: "EMAIL", value: "skyflixmedia@gmail.com" },
];

export default function Apply() {
  return (
    <section id="apply" className="bg-ink">
      <div
        className="shell section-y autofit gap-[clamp(32px,5vw,72px)]"
        style={col("320px")}
      >
        <div className="flex flex-col gap-[clamp(20px,3vw,32px)]">
          <h2 className="m-0 text-[clamp(34px,5.2vw,72px)] font-extrabold leading-[0.95] tracking-[-0.02em]">
            APPLY TO THE FIRST EDITION
          </h2>
          <p className="lede max-w-[52ch] text-mute-300">
            Fill the form and the Academy coordinator will come back to you with
            next steps. Seats are limited.
          </p>
          <div className="relative h-[300px] w-full">
            <Image
              src="/assets/humanitarian-3.jpeg"
              alt="Skyflix Media field production"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="autofit gap-5 font-body" style={col("180px")}>
            {lines.map((line) => (
              <div
                key={line.label}
                className="border-t-[3px] border-red-brand pt-[14px]"
              >
                <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
                  {line.label}
                </div>
                <div className="mt-[6px] text-[19px] text-mute-100">
                  {line.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-ink-edge bg-ink-panel p-[clamp(24px,3vw,40px)]">
          <ApplyForm />
        </div>
      </div>
    </section>
  );
}
