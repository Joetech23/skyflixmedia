const items = [
  {
    question: "Do I need my own camera?",
    answer:
      "No. Academy gear is available for training sessions. Bringing your own body and lens means more practice time between classes.",
  },
  {
    question: "Is there a certificate?",
    answer:
      "Yes — a certificate of completion is issued at the end of the programme, alongside the portfolio work you produce.",
  },
  {
    question: "Can I pay in instalments?",
    answer:
      "Confirm your payment terms and we will state them here, including deposit and balance deadlines.",
  },
  {
    question: "Do trainees work on real jobs?",
    answer:
      "Selected trainees join a live Skyflix production as crew support, supervised, as part of the programme.",
  },
  {
    question: "Can an organisation sponsor applicants?",
    answer:
      "Yes. We partner with local and international organisations to fund seats. Write to skyflixmedia@gmail.com to discuss terms.",
  },
];

export default function AcademyFaq() {
  return (
    <section id="faq" className="border-t border-ink-line bg-ink-deep">
      <div className="shell-narrow section-y-sm flex flex-col gap-[clamp(22px,3vw,36px)]">
        <div className="eyebrow">
          <span className="eyebrow-text">ACADEMY FAQ</span>
        </div>
        <h2 className="m-0 text-[clamp(30px,4.4vw,56px)] font-extrabold leading-none tracking-[-0.02em]">
          Before you apply
        </h2>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <details
              key={item.question}
              className={`border-t border-ink-edge py-[22px] ${
                index === items.length - 1 ? "border-b" : ""
              }`}
            >
              <summary className="flex justify-between gap-5 text-[clamp(18px,2.1vw,23px)] font-bold text-white">
                {item.question}
                <span className="text-red-brand">+</span>
              </summary>
              <p className="mx-0 mb-0 mt-[14px] font-body text-[18px] leading-[1.6] text-mute-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
