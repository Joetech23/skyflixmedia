import Link from "next/link";
import type { ReactNode } from "react";

type Item = { question: string; answer: ReactNode };

const items: Item[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "For weddings and conferences, four to six weeks gives us room to plan crew and logistics. Livestreams with uplink requirements are best confirmed earlier.",
  },
  {
    question: "Do you travel outside Abuja?",
    answer:
      "Yes. We have worked across Borno, Yobe, Bauchi, Kaduna, Abuja, Nasarawa and Kogi, including hard-to-reach field locations.",
  },
  {
    question: "How long is delivery after a shoot?",
    answer:
      "Confirm your standard turnaround and we will state it here — for example, edited photo galleries within a set number of working days and films after an agreed review cycle.",
  },
  {
    question: "Can you handle consent and safeguarding requirements?",
    answer:
      "Field work follows a clear standard on consent, dignity and ethical representation, and we can work to a partner’s own safeguarding and media policy.",
  },
  {
    question: "Who is the Creative Academy for?",
    answer: (
      <>
        Aspiring photographers, videographers, editors and livestream operators.
        Details are on the{" "}
        <Link
          href="/academy"
          className="border-b-2 border-red-brand text-red-brand"
        >
          Academy page
        </Link>
        .
      </>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="bg-white text-ink">
      <div className="shell-narrow section-y-sm flex flex-col gap-[clamp(24px,3vw,40px)]">
        <div className="eyebrow">
          <span className="eyebrow-text">FAQ</span>
        </div>
        <h2 className="h-section">Questions we get asked</h2>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <details
              key={item.question}
              className={`border-t border-[#dcdcdc] py-[22px] ${
                index === items.length - 1 ? "border-b" : ""
              }`}
            >
              <summary className="flex justify-between gap-5 text-[clamp(18px,2.1vw,24px)] font-bold">
                {item.question}
                <span className="text-red-brand">+</span>
              </summary>
              <p className="mx-0 mb-0 mt-[14px] font-body text-[18px] leading-[1.6] text-[#333333]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
