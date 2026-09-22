import CoverImage from "@/components/CoverImage";
import { col } from "@/lib/style";

const modules = [
  {
    number: "MODULE 01",
    title: "Camera & exposure",
    copy: "Bodies, lenses, exposure control, composition and shooting discipline under pressure.",
  },
  {
    number: "MODULE 02",
    title: "Lighting & sound",
    copy: "LED panels and modifiers, interview lighting, microphone choice and clean audio capture.",
  },
  {
    number: "MODULE 03",
    title: "Event & wedding coverage",
    copy: "Reading a run-of-show, shot lists, working with clients and covering a day end to end.",
  },
  {
    number: "MODULE 04",
    title: "Livestream & broadcast",
    copy: "Multi-camera switching, encoders, bandwidth planning and redundancy for live programmes.",
  },
  {
    number: "MODULE 05",
    title: "Editing & post",
    copy: "Culling, retouching, timeline editing, colour and delivering to client specification.",
  },
];

const stills = [
  {
    src: "/assets/church-livestream-1.jpeg",
    alt: "Trainees on a multi-camera livestream",
  },
  { src: "/assets/sound-1.jpeg", alt: "Audio console set-up" },
  { src: "/assets/event-coverage.jpeg", alt: "Event coverage practice" },
  { src: "/assets/humanitarian-2.jpeg", alt: "Field documentation practice" },
];

export default function Curriculum() {
  return (
    <section id="curriculum" className="bg-white text-ink">
      <div className="shell section-y-sm flex flex-col gap-[clamp(28px,4vw,48px)]">
        <div className="autofit items-end gap-5" style={col("300px")}>
          <div className="flex flex-col gap-[14px]">
            <div className="eyebrow">
              <span className="eyebrow-text">CURRICULUM</span>
            </div>
            <h2 className="h-section">What you will learn</h2>
          </div>
          <p className="m-0 font-body text-[17px] leading-[1.5] text-[#3a3a3a]">
            Six modules, built from the way Skyflix actually runs a job: plan,
            shoot, deliver.
          </p>
        </div>

        <div className="autofit gap-px bg-[#e0e0e0]" style={col("280px")}>
          {modules.map((module) => (
            <div
              key={module.number}
              data-reveal
              className="flex flex-col gap-3 bg-white p-[clamp(24px,3vw,38px)]"
            >
              <div className="kicker !tracking-[0.2em] text-red-brand">
                {module.number}
              </div>
              <h3 className="m-0 text-[clamp(21px,2.2vw,28px)] font-extrabold leading-[1.1]">
                {module.title}
              </h3>
              <p className="m-0 font-body text-[17px] leading-[1.55] text-[#333333]">
                {module.copy}
              </p>
            </div>
          ))}
          <div
            data-reveal
            className="flex flex-col gap-3 bg-ink p-[clamp(24px,3vw,38px)] text-white"
          >
            <div className="kicker !tracking-[0.2em] text-red-brand">
              MODULE 06
            </div>
            <h3 className="m-0 text-[clamp(21px,2.2vw,28px)] font-extrabold leading-[1.1]">
              Ethics &amp; the business
            </h3>
            <p className="m-0 font-body text-[17px] leading-[1.55] text-mute-300">
              Consent, dignity and ethical representation in field work — plus
              quoting, contracts and client handling.
            </p>
          </div>
        </div>

        <div data-reveal className="autofit gap-2" style={col("220px")}>
          {stills.map((still) => (
            <CoverImage
              key={still.src}
              src={still.src}
              alt={still.alt}
              ratio="4/3"
              sizes="(max-width: 900px) 50vw, 25vw"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
