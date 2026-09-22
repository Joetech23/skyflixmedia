import Image from "next/image";
import Link from "next/link";
import { col } from "@/lib/style";

const academy = [
  { href: "#programme", label: "Programmes" },
  { href: "#curriculum", label: "Curriculum" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#faq", label: "FAQ" },
];

const main = [
  { href: "/", label: "Main site" },
  { href: "/#work", label: "Our work" },
  { href: "/#contact", label: "Book a shoot" },
];

export default function AcademyFooter() {
  return (
    <footer className="border-t border-ink-line bg-ink-pure">
      <div
        className="shell autofit items-start gap-[clamp(24px,3vw,48px)] py-[clamp(36px,5vw,64px)]"
        style={col("240px")}
      >
        <div className="flex flex-col gap-4">
          <Image
            src="/assets/logo-white-trim.png"
            alt="Skyflix Media"
            width={360}
            height={96}
            className="block h-auto w-[180px]"
          />
          <div className="font-body text-[15px] text-mute-600">
            Creative Academy · Abuja, Nigeria.
          </div>
        </div>

        <div className="flex flex-col gap-[10px] font-body text-base">
          <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
            ACADEMY
          </div>
          {academy.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[#c2c2c2] transition-colors hover:text-red-brand"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-[10px] font-body text-base">
          <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
            SKYFLIX MEDIA
          </div>
          {main.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#c2c2c2] transition-colors hover:text-red-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[10px] font-body text-base text-[#c2c2c2]">
          <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
            CONTACT
          </div>
          <span>+234 808 314 3524</span>
          <span>skyflixmedia@gmail.com</span>
          <span>@skyfixmedia</span>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="shell py-[18px] font-body text-sm text-mute-700">
          © 2026 Skyflix Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
