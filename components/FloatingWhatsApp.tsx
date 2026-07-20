"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { waLink } from "@/lib/whatsapp";

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  name: string;
}

/**
 * Floating WhatsApp button that expands into a small compose panel, so a
 * visitor can type their question on the page and land in WhatsApp with it
 * already written rather than facing an empty chat.
 */
export function FloatingWhatsApp({ whatsappNumber, name }: FloatingWhatsAppProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus the composer when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Esc closes; so does a click anywhere outside the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;
    window.open(waLink(whatsappNumber, text), "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  return (
    <div ref={panelRef} className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 md:right-7 md:bottom-7">
      {open && (
        <div className="w-[min(330px,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl bg-cream-card shadow-[0_20px_50px_-12px_rgba(42,27,16,0.4)]">
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#25D366]">
              <WhatsAppIcon size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{name}</p>
              <p className="text-[11px] text-white/70">Biasanya membalas dalam beberapa menit</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="flex h-7 w-7 flex-none cursor-pointer items-center justify-center rounded-full text-lg leading-none text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="bg-sand px-4 py-4">
            <p className="relative w-fit rounded-lg rounded-tl-none bg-cream-card px-3.5 py-2.5 text-sm leading-relaxed font-light text-cocoa shadow-sm">
              Halo! 👋 Ada yang bisa kami bantu? Tulis pesan Anda di bawah.
            </p>
          </div>

          <form onSubmit={send} className="flex items-end gap-2 border-t border-line bg-cream-card p-3">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // Enter sends, Shift+Enter makes a new line — the convention
              // people already expect from chat apps.
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(e);
                }
              }}
              rows={1}
              maxLength={1000}
              placeholder="Tulis pesan…"
              aria-label="Pesan WhatsApp"
              className="max-h-28 min-h-[42px] flex-1 resize-none rounded-full border border-line bg-cream px-4 py-2.5 text-[15px] font-light text-espresso transition-colors placeholder:text-cocoa-muted/70 focus:border-copper focus:outline-none"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              aria-label="Kirim pesan"
              className="flex h-[42px] w-[42px] flex-none cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90 disabled:cursor-default disabled:opacity-40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Tutup obrolan WhatsApp" : "Chat via WhatsApp"}
        className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <span className="text-2xl leading-none">×</span> : <WhatsAppIcon size={28} />}
      </button>
    </div>
  );
}
