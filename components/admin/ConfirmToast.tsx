"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export interface ConfirmOptions {
  message: string;
  /** Label of the button that goes ahead, e.g. "Hapus". */
  confirmLabel: string;
  /** Red confirm button for actions that can't be undone. */
  danger?: boolean;
}

interface Pending extends ConfirmOptions {
  resolve: (ok: boolean) => void;
}

/**
 * In-page replacement for window.confirm: `await confirm({...})` resolves
 * true when the admin presses the action button, false on Batal or Esc.
 */
export function useConfirmToast() {
  const [pending, setPending] = useState<Pending | null>(null);

  const confirm = useCallback(
    (opts: ConfirmOptions) =>
      new Promise<boolean>((resolve) => {
        setPending((prev) => {
          prev?.resolve(false);
          return { ...opts, resolve };
        });
      }),
    [],
  );

  const settle = useCallback((ok: boolean) => {
    setPending((prev) => {
      prev?.resolve(ok);
      return null;
    });
  }, []);

  const element = pending ? <ConfirmToast pending={pending} onSettle={settle} /> : null;
  return { confirm, element };
}

function ConfirmToast({ pending, onSettle }: { pending: Pending; onSettle: (ok: boolean) => void }) {
  const messageId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSettle(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onSettle]);

  return (
    <div
      role="alertdialog"
      aria-describedby={messageId}
      className="fixed inset-x-4 bottom-24 z-[80] mx-auto flex max-w-md flex-col gap-3 rounded-2xl bg-espresso p-4 text-ivory shadow-2xl sm:flex-row sm:items-center sm:gap-4 sm:pl-5"
    >
      <p id={messageId} className="flex-1 text-sm leading-snug">
        {pending.message}
      </p>
      <div className="flex justify-end gap-2">
        <button
          ref={cancelRef}
          type="button"
          onClick={() => onSettle(false)}
          className="cursor-pointer rounded-full bg-ivory/15 px-4 py-2 text-xs tracking-[1px] uppercase transition-colors hover:bg-ivory/25"
        >
          Batal
        </button>
        <button
          type="button"
          onClick={() => onSettle(true)}
          className={`cursor-pointer rounded-full px-4 py-2 text-xs tracking-[1px] whitespace-nowrap uppercase transition-colors ${
            pending.danger ? "bg-red-700 hover:bg-red-600" : "bg-copper hover:bg-copper-light"
          }`}
        >
          {pending.confirmLabel}
        </button>
      </div>
    </div>
  );
}
