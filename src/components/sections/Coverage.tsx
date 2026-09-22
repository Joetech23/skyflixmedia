import CoverImage from "@/components/CoverImage";
import { col } from "@/lib/style";

const states = [
  "BORNO",
  "YOBE",
  "BAUCHI",
  "KADUNA",
  "ABUJA",
  "NASARAWA",
  "KOGI",
];

export default function Coverage() {
  return (
    <section className="bg-ink">
      <div
        className="shell section-y-sm autofit items-center gap-[clamp(32px,5vw,64px)]"
        style={col("320px")}
      >
        <div data-reveal className="flex flex-col gap-[clamp(18px,2.4vw,26px)]">
          <div className="eyebrow">
            <span className="eyebrow-text">WHERE WE&rsquo;VE WORKED</span>
          </div>
          <h2 className="h-section">
            From conference halls to communities without a road in.
          </h2>
          <div className="flex flex-wrap gap-2 font-body text-[clamp(15px,1.7vw,19px)] font-semibold">
            {states.map((state, index) => (
              <span
                key={state}
                className={
                  index % 2 === 0
                    ? "bg-red-brand px-[18px] py-[9px] text-white"
                    : "bg-white px-[18px] py-[9px] text-ink"
                }
              >
                {state}
              </span>
            ))}
          </div>
        </div>
        <div data-reveal className="grid grid-cols-2 gap-2">
          <CoverImage
            src="/assets/event-coverage.jpeg"
            alt="Conference and stakeholder event coverage"
            ratio="16/8"
            className="col-span-2"
          />
          <CoverImage
            src="/assets/church-livestream-2.jpeg"
            alt="Church programme production"
            ratio="4/3"
          />
          <CoverImage
            src="/assets/sound-2.jpeg"
            alt="Technical set-up on site"
            ratio="4/3"
          />
        </div>
      </div>
    </section>
  );
}
