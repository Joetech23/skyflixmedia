import Image from "next/image";
import { col } from "@/lib/style";

const lines = [
  { label: "ACADEMY LINE", value: "+234 808 314 3524" },
  { label: "EMAIL", value: "skyflixmedia@gmail.com" },
];

const steps = [
  "Your details and preferred track",
  "Your experience so far",
  "Why you want this training",
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
          <div className="relative h-[clamp(200px,40vw,300px)] w-full">
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
                <div className="mt-[6px] break-words text-[19px] text-mute-100">
                  {line.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col justify-center gap-6 self-start border border-ink-edge bg-ink-panel p-[clamp(24px,3vw,40px)]"
        >
          <div className="kicker text-red-brand">APPLICATION FORM</div>
          <p className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.1]">
            Takes about five minutes.
          </p>
          <ol className="m-0 flex list-none flex-col gap-px bg-ink-edge p-0">
            {steps.map((step, index) => (
              <li
                key={step}
                className="flex items-baseline gap-4 bg-ink-card px-5 py-4 font-body text-[17px] text-mute-200"
              >
                <span className="font-display text-[20px] font-extrabold text-red-brand">
                  {index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <a
            href="#apply"
            className="btn btn-solid px-6 py-[17px] text-center text-[18px]"
          >
            Start your application
          </a>
          <p className="m-0 font-body text-[15px] text-mute-500">
            Scholarship and sponsored seats can be requested on the form.
          </p>
        </div>
      </div>
    </section>
  );
}
