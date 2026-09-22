"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

/**
 * Scroll-in reveal for [data-reveal] elements.
 *
 * The hidden state lives behind `.reveal-ready` on <html>, so the page is fully
 * visible if JS never runs. Nothing is hidden while the tab is in the
 * background (IntersectionObserver is frozen there) or when motion is
 * reduced — an animation must never be what keeps content invisible. While
 * the page is live, a scroll check backs up the observer.
 *
 * Runs again on every route change: this lives in the root layout, which stays
 * mounted across client navigations, so each new page needs its own pass.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      !nodes.length ||
      prefersReduced ||
      typeof IntersectionObserver === "undefined"
    ) {
      // A previous page may have left the hidden state switched on.
      root.classList.remove("reveal-ready");
      return;
    }

    let io: IntersectionObserver | null = null;
    const pending = new Set<HTMLElement>(nodes);

    const show = (node: HTMLElement) => {
      node.classList.add("is-revealed");
      pending.delete(node);
      io?.unobserve(node);
    };

    // Backstop: anything whose top has entered the viewport gets shown, even
    // if the observer is throttled (fast flings, jump links).
    const sweep = () => {
      const limit = window.innerHeight;
      pending.forEach((node) => {
        if (node.getBoundingClientRect().top < limit) show(node);
      });
    };

    let queued = false;
    const onScroll = () => {
      if (queued || !io) return;
      queued = true;
      window.setTimeout(() => {
        queued = false;
        sweep();
      }, 120);
    };

    /**
     * `deferred` is true when the page was opened in a background tab and is
     * only now being looked at: whatever is already on screen stays put, and
     * only content further down animates in.
     */
    const start = (deferred: boolean) => {
      // Siblings in the same grid cascade in rather than landing at once.
      nodes.forEach((node) => {
        const siblings = node.parentElement
          ? Array.from(node.parentElement.children).filter((el) =>
              el.hasAttribute("data-reveal")
            )
          : [node];
        const step = Math.min(siblings.indexOf(node), MAX_STAGGER_STEPS);
        node.style.transitionDelay = `${Math.max(step, 0) * STAGGER_MS}ms`;
      });

      if (deferred) {
        const limit = window.innerHeight;
        nodes.forEach((node) => {
          if (node.getBoundingClientRect().top < limit) {
            node.style.transitionDelay = "0ms";
            node.classList.add("is-revealed");
            pending.delete(node);
          }
        });
      }

      root.classList.add("reveal-ready");

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) show(entry.target as HTMLElement);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      pending.forEach((node) => io?.observe(node));

      // Don't leave what's already on screen waiting on the observer's first
      // callback; a short delay lets the hidden state paint so it still fades.
      window.setTimeout(sweep, 60);
    };

    // A hidden tab never delivers observer callbacks, so hold off (content
    // stays fully visible) until someone is actually looking at the page.
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (io) sweep();
      else start(true);
    };

    if (document.visibilityState === "visible") {
      start(false);
    } else {
      root.classList.remove("reveal-ready");
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [pathname]);

  return null;
}
