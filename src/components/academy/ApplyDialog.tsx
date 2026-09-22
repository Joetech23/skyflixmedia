"use client";

import { useCallback, useEffect, useRef } from "react";
import ApplyForm from "@/components/academy/ApplyForm";

const APPLY_HASH = "#apply";

/**
 * The application form, shown as a modal. Any link on this page pointing at
 * #apply opens it, as does arriving with #apply in the URL (the main site's
 * "Apply now" buttons link to /academy#apply).
 */
export default function ApplyDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Capture phase so we cancel the jump before Next's Link acts on it; Link
    // still runs its own onClick (closing the mobile menu) and then bails out.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor) return;
      if (anchor.hash !== APPLY_HASH || anchor.pathname !== window.location.pathname) {
        return;
      }
      event.preventDefault();
      open();
    };

    const onHash = () => {
      if (window.location.hash === APPLY_HASH) open();
    };

    const onClose = () => {
      document.documentElement.style.overflow = "";
      if (window.location.hash === APPLY_HASH) {
        const { pathname, search } = window.location;
        window.history.replaceState(window.history.state, "", pathname + search);
      }
    };

    // Clicking the dimmed backdrop (the dialog element itself) closes it.
    const onBackdrop = (event: MouseEvent) => {
      if (event.target === dialog) dialog.close();
    };

    window.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHash);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onBackdrop);
    onHash();

    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHash);
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onBackdrop);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="apply-dialog-title"
      className="apply-dialog m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-white backdrop:bg-black/80 backdrop:backdrop-blur-sm sm:m-auto sm:h-auto sm:max-h-[92vh] sm:w-[min(92vw,760px)]"
    >
      <div className="flex h-full flex-col border-ink-edge bg-ink-panel sm:h-auto sm:max-h-[92vh] sm:border">
        <div className="flex items-start justify-between gap-6 border-b border-ink-edge px-[clamp(20px,3vw,40px)] py-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[11px] tracking-[0.16em] text-mute-500">
              SKYFLIX MEDIA CREATIVE ACADEMY
            </span>
            <h2
              id="apply-dialog-title"
              className="m-0 text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.05] tracking-[-0.01em]"
            >
              Apply to the first edition
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close application form"
            className="grid h-11 w-11 flex-none place-items-center border border-ink-edge text-2xl leading-none text-white transition-colors hover:border-red-brand hover:text-red-brand"
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-[clamp(20px,3vw,40px)] py-[clamp(20px,3vw,32px)]">
          <ApplyForm />
        </div>
      </div>
    </dialog>
  );
}
