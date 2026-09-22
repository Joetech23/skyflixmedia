import Image from "next/image";
import Link from "next/link";
import { col } from "@/lib/style";

const company = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#team", label: "Team" },
  { href: "/#gear", label: "Gear" },
];

const academy = [
  { href: "/academy", label: "Overview" },
  { href: "/academy#curriculum", label: "Curriculum" },
  { href: "/academy#apply", label: "Apply" },
];

const contact = [
  "+234 808 314 3524",
  "skyflixmedia@gmail.com",
  "@skyfixmedia",
  "Abuja, Nigeria.",
];

export default function SiteFooter() {
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
            Perfection in Profession.
          </div>
        </div>

        <div className="flex flex-col gap-[10px] font-body text-base">
          <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
            COMPANY
          </div>
          {company.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#c2c2c2] transition-colors hover:text-red-brand"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-[10px] font-body text-base">
          <div className="font-display text-xs font-bold tracking-[0.18em] text-red-brand">
            ACADEMY
          </div>
          {academy.map((link) => (
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
          {contact.map((line) => (
            <span key={line}>{line}</span>
          ))}
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
