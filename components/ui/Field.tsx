import type { ReactNode } from "react";

const controlClass =
  "w-full border border-line bg-cream px-3.5 py-2.5 text-[15px] font-light text-espresso transition-colors placeholder:text-cocoa-muted/70 focus:border-copper focus:outline-none";

interface FieldProps {
  label: string;
  name: string;
  required?: boolean;
  children?: ReactNode;
}

/** Label + required marker wrapper shared by every control in the forms. */
export function Field({ label, name, required, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[13px] tracking-[1.5px] text-cocoa uppercase">
        {label}
        {required && <span className="ml-1 text-copper">*</span>}
      </label>
      {children}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export function TextField({ label, name, required, ...props }: InputProps) {
  return (
    <Field label={label} name={name} required={required}>
      <input id={name} name={name} required={required} className={controlClass} {...props} />
    </Field>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
};

export function TextAreaField({ label, name, required, ...props }: TextAreaProps) {
  return (
    <Field label={label} name={name} required={required}>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={3}
        className={`${controlClass} resize-y`}
        {...props}
      />
    </Field>
  );
}

interface CheckboxFieldProps {
  name: string;
  required?: boolean;
  children: ReactNode;
}

export function CheckboxField({ name, required, children }: CheckboxFieldProps) {
  return (
    <label htmlFor={name} className="flex cursor-pointer items-start gap-3 text-[13px] leading-relaxed font-light text-cocoa">
      <input
        id={name}
        name={name}
        type="checkbox"
        required={required}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-copper"
      />
      <span>{children}</span>
    </label>
  );
}

/**
 * Hidden trap field: people never see or fill it, naive bots fill every input.
 * The API silently drops submissions where it is set.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Submit button matching the site's primary CTA. */
export function SubmitButton({ children, disabled }: { children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-1 w-full cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] text-ivory uppercase transition-colors hover:bg-copper-light disabled:cursor-wait disabled:opacity-60"
    >
      {children}
    </button>
  );
}

/** Secondary CTA that hands the submission to WhatsApp in a new tab. */
export function WhatsAppButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-full border border-copper px-8 py-3.5 text-center text-sm tracking-[2px] text-copper uppercase transition-colors hover:bg-copper hover:text-ivory"
    >
      {children}
    </a>
  );
}
