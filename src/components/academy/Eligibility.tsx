import { col } from "@/lib/style";

const criteria = [
  "Aspiring photographers, videographers, editors and livestream operators.",
  "No formal media qualification required — commitment matters more.",
  "Able to attend in person in Abuja for the full programme.",
  "Own camera helpful but not required; Academy gear is available for training.",
  "Applicants of all backgrounds; we actively encourage women to apply.",
];

const steps = [
  {
    title: "Submit the form",
    copy: "Tell us your track, your experience and why you want in.",
  },
  {
    title: "Short conversation",
    copy: "A call or studio visit with the Academy coordinator.",
  },
  {
    title: "Offer and payment",
    copy: "Confirm your seat, settle the fee or scholarship terms.",
  },
  {
    title: "Start the programme",
    copy: "Induction, gear briefing, then straight into practical work.",
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
            Who we are looking for
          </h2>
          <ul className="m-0 list-disc pl-5 font-body text-[clamp(16px,1.8vw,20px)] leading-[1.75] text-[#d2d2d2]">
            {criteria.map((item) => (
              <li key={item}>{item}</li>
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
