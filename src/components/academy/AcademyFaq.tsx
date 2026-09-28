const items = [
  {
    question: "Who can apply?",
    answer:
      "Young people aged 16–30 who can attend all three days in person in Maiduguri. Applicants under 18 need a parent or guardian's consent if selected — we collect their details on the form and send the consent form after selection.",
  },
  {
    question: "Do I need my own camera?",
    answer:
      "No. Owning a camera is helpful but not required; available Academy equipment may be used during training. Access to equipment is not a selection advantage.",
  },
  {
    question: "Is there a certificate?",
    answer:
      "Yes — a certificate of completion is issued at the end of the programme, alongside the portfolio work you produce.",
  },
  {
    question: "Does applying guarantee a place?",
    answer:
      "No. There are 30 places. Applications are reviewed based on eligibility, motivation, availability and suitability, and shortlisted/selected applicants are contacted by email and phone.",
  },
  {
    question: "What happens after the training?",
    answer:
      "Selected participants may have access to post-training mentorship, portfolio development, professional exposure and potential internship/placement opportunities, subject to availability, performance, safeguarding requirements and host organisation policies.",
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
