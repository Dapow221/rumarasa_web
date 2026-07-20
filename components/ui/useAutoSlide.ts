"use client";

import { useEffect, useRef } from "react";

/**
 * Auto-advances a horizontal scroller one card at a time, looping back to the
 * start at the end.
 *
 * Hover is checked per tick rather than tracked with mouseenter/mouseleave:
 * scrolling the page moves the slider under a stationary cursor, which fires
 * enter without a matching leave and would strand the slider paused forever.
 * Also idles while the tab is hidden or the section is off screen.
 */
export function useAutoSlide(step: number, intervalMs = 2000, resetKey?: unknown) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const el = ref.current;
      if (!el || document.hidden || el.matches(":hover")) return;

      const box = el.getBoundingClientRect();
      const onScreen = box.bottom > 0 && box.top < window.innerHeight;
      if (!onScreen) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + step, behavior: "smooth" });
    }, intervalMs);
    return () => clearInterval(id);
  }, [step, intervalMs, resetKey]);

  return ref;
}
