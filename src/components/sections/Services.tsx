import Link from "next/link";
import { col } from "@/lib/style";

const services = [
  {
    number: "02",
    title: "Videography",
    copy: "Event films, brand and campaign video, interviews and highlight edits.",
  },
  {
    number: "03",
    title: "Livestream & Broadcast",
    copy: "Multi-camera production, event recording and broadcast support for large gatherings.",
  },
  {
    number: "04",
    title: "Documentary",
    copy: "Development and humanitarian storytelling, testimonials and field documentation.",
  },
  {
    number: "05",
    title: "Event Support",
    copy: "Sound, screens and technical set-up for church programmes and conferences.",
  },
];

export default function Services() {
  return (
    <section id="services" className="motif">
      <div className="shell section-y flex flex-col gap-[clamp(32px,4vw,56px)]">
        <div
          className="autofit items-end gap-6"
          style={col("320px")}
        >
          <h2 data-reveal className="h-display">
            WHAT WE DO
          </h2>
          <p data-reveal className="lede !leading-[1.45] text-mute-400">
            Four core disciplines, one production team. Booked separately or as
            a full package.
          </p>
        </div>
        <div className="autofit gap-[clamp(12px,1.6vw,22px)]" style={col("300px")}>
          <div
            data-reveal
            className="flex flex-col gap-[14px] bg-red-brand p-[clamp(26px,3vw,40px)]"
          >
            <div className="kicker text-red-soft">01</div>
            <h3 className="m-0 text-[clamp(23px,2.4vw,32px)] font-extrabold leading-[1.05]">
              Photography
            </h3>
            <p className="m-0 font-body text-[17px] leading-[1.5] text-white">
              Weddings, portraiture, event and editorial coverage, with full
              post-production.
            </p>
          </div>

          {services.map((service) => (
            <div
              key={service.number}
              data-reveal
              className="flex flex-col gap-[14px] border border-ink-edge bg-ink-card p-[clamp(26px,3vw,40px)]"
            >
              <div className="kicker text-red-brand">{service.number}</div>
              <h3 className="m-0 text-[clamp(23px,2.4vw,32px)] font-extrabold leading-[1.05]">
                {service.title}
              </h3>
              <p className="m-0 font-body text-[17px] leading-[1.5] text-mute-300">
                {service.copy}
              </p>
            </div>
          ))}

          <Link
            href="/academy"
            data-reveal
            className="flex flex-col gap-[14px] bg-white p-[clamp(26px,3vw,40px)] text-ink transition-colors hover:bg-[#ededed]"
          >
            <div className="kicker text-red-brand">06</div>
            <h3 className="m-0 text-[clamp(23px,2.4vw,32px)] font-extrabold leading-[1.05]">
              Creative Academy
            </h3>
            <p className="m-0 font-body text-[17px] leading-[1.5] text-[#333333]">
              Training aspiring multimedia professionals in production and
              post-production craft.
            </p>
            <span className="mt-auto font-body text-base font-semibold text-red-brand">
              Visit the Academy →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
