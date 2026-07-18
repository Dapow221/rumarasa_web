"use client";

import { useRef, type KeyboardEvent } from "react";
import { useAdmin } from "./AdminProvider";

interface EditableSpanProps {
  save: (text: string) => void;
  children: string;
  className?: string;
}

function EditableSpan({ save, children, className = "" }: EditableSpanProps) {
  const { editMode } = useAdmin();
  const ref = useRef<HTMLSpanElement>(null);
  const original = useRef(children);
  original.current = children;

  if (!editMode) {
    return <span className={className}>{children}</span>;
  }

  const onBlur = () => {
    const text = ref.current?.innerText.replace(/ /g, " ").trim() ?? "";
    if (text !== original.current.trim()) save(text);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Escape") {
      if (ref.current) ref.current.innerText = original.current;
      ref.current?.blur();
    }
  };

  return (
    <span
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      title="Klik untuk mengedit — Esc untuk batal"
      className={`${className} -m-0.5 cursor-text rounded-sm p-0.5 outline-1 outline-dashed outline-amber-500/70 transition-colors hover:bg-amber-500/10 focus:bg-transparent focus:outline-2 focus:outline-solid focus:outline-amber-500`}
    >
      {children}
    </span>
  );
}

/** Click-to-edit text backed by a content block (PUT /content/{key}). */
export function E({ k, children, className }: { k: string; children: string; className?: string }) {
  const { saveContent } = useAdmin();
  return (
    <EditableSpan save={(text) => void saveContent(k, text)} className={className}>
      {children}
    </EditableSpan>
  );
}

interface EFProps {
  c: string; // collection path, e.g. "promos"
  id: string;
  f: string; // API field name, e.g. "description_en"
  children: string;
  className?: string;
}

/** Click-to-edit text backed by a collection item field (PATCH /{c}/{id}). */
export function EF({ c, id, f, children, className }: EFProps) {
  const { patchItem } = useAdmin();
  return (
    <EditableSpan save={(text) => void patchItem(c, id, { [f]: text })} className={className}>
      {children}
    </EditableSpan>
  );
}
