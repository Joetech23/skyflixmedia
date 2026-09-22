import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "/academy", label: "Academy", current: true },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-[rgba(5,5,5,0.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-[clamp(18px,4vw,48px)] py-[14px]">
        <Link href="#top" className="flex items-center">
          <Image
            src="/assets/logo-white-trim.png"
            alt="Skyflix Media"
            width={360}
            height={96}
            priority
            className="block h-auto w-[clamp(130px,16vw,180px)]"
          />
        </Link>
        <nav className="flex flex-wrap items-center gap-[clamp(14px,2.2vw,30px)] font-body text-[15px] font-medium uppercase tracking-[0.08em]">
          {links.map((link) =>
            link.current ? (
              <Link
                key={link.href}
                href={link.href}
                className="font-semibold text-red-brand"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-mute-200 transition-colors hover:text-red-brand"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#contact"
            className="bg-red-brand px-5 py-[11px] font-semibold tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink-deep"
          >
            Get a quote
          </a>
        </nav>
      </div>
    </header>
  );
}
