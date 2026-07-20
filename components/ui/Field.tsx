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

/** Submit button matching the site's primary CTA. */
export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-1 w-full cursor-pointer rounded-full bg-copper px-8 py-3.5 text-sm tracking-[2px] text-ivory uppercase transition-colors hover:bg-copper-light"
    >
      {children}
    </button>
  );
}
