"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * Centered dialog built on the native <dialog> element, driven from React
 * state. Going native means the focus trap, Esc-to-close, and the inert
 * background come from the platform rather than hand-rolled listeners.
 */
export function Modal({ open, onClose, eyebrow, title, description, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  // showModal() blocks interaction but not scrolling, so pin the body while open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // The dialog element itself fills the viewport; a click landing on it
      // rather than on the inner panel is a click on the backdrop.
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto max-h-[92dvh] w-[min(560px,92vw)] overflow-y-auto bg-cream-card p-0 text-espresso shadow-[0_30px_80px_-20px_rgba(42,27,16,0.45)] backdrop:bg-espresso/60 backdrop:backdrop-blur-[2px]"
    >
      <div className="relative px-6 pt-8 pb-7 md:px-10 md:pt-10 md:pb-9">
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xl leading-none text-cocoa-muted transition-colors hover:bg-line hover:text-espresso"
        >
          ×
        </button>

        <p className="font-script text-2xl text-copper md:text-[26px]">{eyebrow}</p>
        <h2 className="mt-1 font-serif text-2xl leading-tight font-medium md:text-[32px]">
          {title}
        </h2>
        {description && (
          <p className="mt-2.5 text-sm leading-relaxed font-light text-cocoa">{description}</p>
        )}

        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  );
}
