import { col } from "@/lib/style";

const figures = [
  {
    value: "50+",
    label: "creatives to be trained",
    className: "bg-ink text-white",
    valueClassName: "text-red-brand",
    labelClassName: "text-mute-300",
  },
  {
    value: "4",
    label: "disciplines taught",
    className: "bg-red-brand text-white",
    valueClassName: "",
    labelClassName: "text-red-softer",
  },
  {
    value: "100%",
    label: "hands-on, on real gear",
    className: "bg-[#f4f4f4]",
    valueClassName: "",
    labelClassName: "text-[#444444]",
  },
  {
    value: "1",
    label: "live production placement",
    className: "bg-[#f4f4f4]",
    valueClassName: "",
    labelClassName: "text-[#444444]",
  },
];

export default function AcademyAbout() {
  return (
    <section className="bg-white text-ink">
      <div
        className="shell section-y-sm autofit items-center gap-[clamp(32px,5vw,72px)]"
        style={col("320px")}
      >
        <div data-reveal className="flex flex-col gap-5">
          <div className="eyebrow">
            <span className="eyebrow-text">ABOUT THE ACADEMY</span>
          </div>
          <h2 className="m-0 text-[clamp(30px,4.4vw,56px)] font-extrabold leading-[1.02] tracking-[-0.02em]">
            Craft is learned on a live set, not in theory.
          </h2>
          <p className="lede !leading-[1.55] text-[#2b2b2b]">
            The Skyflix Media Creative Academy trains aspiring multimedia
            professionals in production and post-production craft. Trainees
            learn on the same cameras, switchers and consoles the Skyflix crew
            uses on paid jobs, and finish with work they can show.
          </p>
          <p className="lede !leading-[1.55] text-[#2b2b2b]">
            The Academy is part of our commitment to train and empower a minimum
            of 50 aspiring multimedia professionals, supporting diversity and
            inclusion in the industry.
          </p>
        </div>
        <div data-reveal className="grid grid-cols-2 gap-px bg-[#e0e0e0]">
          {figures.map((figure) => (
            <div
              key={figure.label}
              className={`p-[clamp(22px,3vw,34px)] ${figure.className}`}
            >
              <div
                className={`text-[clamp(30px,3.6vw,46px)] font-extrabold leading-none ${figure.valueClassName}`}
              >
                {figure.value}
              </div>
              <div
                className={`mt-[6px] font-body text-base leading-[1.35] ${figure.labelClassName}`}
              >
                {figure.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
