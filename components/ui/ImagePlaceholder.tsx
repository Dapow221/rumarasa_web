interface ImagePlaceholderProps {
  label: string;
  className?: string;
}

/**
 * Temporary stand-in for photography. Swap for `next/image` once real
 * assets are available — keep the same wrapper dimensions.
 */
export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex h-full w-full items-center justify-center border border-dashed border-tan bg-ivory-dim/60 ${className}`}
    >
      <span className="max-w-[80%] text-center text-xs font-light tracking-[0.15em] text-cocoa-muted uppercase">
        {label}
      </span>
    </div>
  );
}
