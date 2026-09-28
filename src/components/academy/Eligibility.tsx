import { col } from "@/lib/style";

const criteria = [
  "An aspiring photographer, videographer, visual storyteller or content creator.",
  "A student, recent graduate, unemployed or under-employed young person.",
  "Interested in developing practical creative and digital skills.",
  "A beginner, or someone with some existing experience.",
  "Able to attend the full 3-day programme in person in Maiduguri.",
  "Willing to learn, participate actively and complete practical assignments.",
];

const notes = [
  "You do not need a formal qualification in photography or media.",
  "Owning a camera is helpful but not required; available Academy equipment may be used during training.",
  "Applicants from all backgrounds are welcome, and young women are especially encouraged to apply.",
];

const steps = [
  {
    title: "Apply online",
    copy: "Complete the six-step application form. It takes about 10–15 minutes.",
  },
  {
    title: "Review",
    copy: "Applications are reviewed on eligibility, motivation, availability and suitability.",
  },
  {
    title: "Selection",
    copy: "Shortlisted and selected applicants are contacted by email and phone.",
  },
  {
    title: "Attend the bootcamp",
    copy: "Three days of practical training, 13–15 October 2026 in Maiduguri.",
  },
];

export default function Eligibility() {
  return (
    <section id="eligibility" className="bg-ink">
      <div
        className="shell section-y-sm autofit gap-[clamp(32px,5vw,64px)]"
        style={col("300px")}
      >
        <div data-reveal className="flex flex-col gap-5">
          <div className="eyebrow">
            <span className="eyebrow-text">ELIGIBILITY</span>
          </div>
          <h2 className="m-0 text-[clamp(28px,4vw,50px)] font-extrabold leading-[1.02] tracking-[-0.02em]">
            Who can apply?
          </h2>
          <p className="m-0 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#d2d2d2]">
            Young people aged 16–30 who are interested in developing practical
            skills in photography, visual storytelling and creative media. You
            may apply if you are:
          </p>
          <ul className="m-0 list-disc pl-5 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.75] text-[#d2d2d2]">
            {criteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className="m-0 flex list-none flex-col gap-2 border-l-[3px] border-red-brand p-0 pl-4 font-body text-[16px] leading-[1.6] text-mute-400">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>

        <div data-reveal className="flex flex-col gap-[18px]">
          <div className="eyebrow">
            <span className="eyebrow-text">HOW TO APPLY</span>
          </div>
          <div className="flex flex-col gap-px bg-ink-edge">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="flex items-baseline gap-[18px] bg-ink-card px-6 py-[22px]"
              >
                <span className="text-[26px] font-extrabold text-red-brand">
                  {index + 1}
                </span>
                <div>
                  <div className="text-[19px] font-bold">{step.title}</div>
                  <p className="mx-0 mb-0 mt-[5px] font-body text-base leading-[1.5] text-mute-400">
                    {step.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
