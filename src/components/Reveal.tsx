"use client";

import { useEffect } from "react";

/**
 * Scroll-in reveal for [data-reveal] elements.
 *
 * The hidden state lives behind `.reveal-ready` on <html>, added here, so the
 * page renders fully visible when JS never runs. A timed fail-safe reveals
 * everything regardless, because IntersectionObserver callbacks are throttled
 * or frozen in background tabs — animation must never gate readability.
 */
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    if (!nodes.length) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const revealAll = () => nodes.forEach((n) => n.classList.add("is-revealed"));

    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach((n) => io.observe(n));

    // Fail-safe: nothing stays hidden for more than a few seconds.
    const failSafe = window.setTimeout(revealAll, 4000);

    return () => {
      window.clearTimeout(failSafe);
      io.disconnect();
    };
  }, []);

  return null;
}
