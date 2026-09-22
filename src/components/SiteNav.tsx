"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type NavLink = {
  href: string;
  label: string;
  tone?: "accent" | "muted";
};

type Props = {
  homeHref: string;
  badge?: string;
  links: NavLink[];
  cta: { href: string; label: string };
};

const toneClass = {
  default: "text-mute-200 hover:text-red-brand",
  accent: "font-semibold text-red-brand hover:text-white",
  muted: "text-mute-500 hover:text-white",
};

/**
 * Sticky header shared by both pages. Full nav from 1024px up; below that the
 * links fold into a menu so the header stays one slim row on phones.
 */
export default function SiteNav({ homeHref, badge, links, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line bg-[rgba(5,5,5,0.92)] backdrop-blur-[10px]">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-[clamp(18px,4vw,48px)] py-[14px]">
        <Link
          href={homeHref}
          className="flex min-w-0 items-center gap-[14px]"
          onClick={close}
        >
          <Image
            src="/assets/logo-white-trim.png"
            alt="Skyflix Media"
            width={360}
            height={96}
            priority
            className="block h-auto w-[clamp(120px,16vw,180px)]"
          />
          {badge ? (
            <span className="hidden font-mono text-[11px] tracking-[0.16em] text-mute-500 sm:inline">
              {badge}
            </span>
          ) : null}
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-[clamp(14px,2.2vw,30px)] font-body text-[15px] font-medium uppercase tracking-[0.08em] lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${toneClass[link.tone ?? "default"]}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={cta.href}
            className="bg-red-brand px-5 py-[11px] font-semibold tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink-deep"
          >
            {cta.label}
          </Link>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className="relative grid h-11 w-11 flex-none place-items-center border border-ink-edge text-white lg:hidden"
        >
          <span
            className={`absolute h-[2px] w-5 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[6px]"
            }`}
          />
          <span
            className={`absolute h-[2px] w-5 bg-current transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-[2px] w-5 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[6px]"
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-ink-line transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="min-h-0 font-body text-[17px] font-medium uppercase tracking-[0.08em]"
        >
          <div className="flex flex-col px-[clamp(18px,4vw,48px)] pb-6 pt-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                tabIndex={open ? 0 : -1}
                className={`border-b border-ink-line py-4 transition-colors ${toneClass[link.tone ?? "default"]}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              onClick={close}
              tabIndex={open ? 0 : -1}
              className="mt-5 bg-red-brand px-5 py-4 text-center font-semibold tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-ink-deep"
            >
              {cta.label}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
