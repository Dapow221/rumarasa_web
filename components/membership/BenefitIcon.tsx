import type { ReactNode } from "react";
import type { BenefitIconName } from "@/lib/membership";

const paths: Record<BenefitIconName, ReactNode> = {
  points: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10 16V8h2.6a2.3 2.3 0 0 1 0 4.6H10" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5.5h11a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5H9l-3.5 3v-3H4A1.5 1.5 0 0 1 2.5 13V7A1.5 1.5 0 0 1 4 5.5z" />
      <path d="M18.5 9h1.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-1.5 1.5h-1v2.5L16 17h-3" />
    </>
  ),
  drink: (
    <>
      <path d="M6 7h12l-1.4 12.2a1.5 1.5 0 0 1-1.5 1.3H8.9a1.5 1.5 0 0 1-1.5-1.3z" />
      <path d="M6.6 12h10.8M13 7l2-4.5" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.7 6.7a1.4 1.4 0 0 1-2 0z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  star: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M9 15l2 2 4-4" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20.5v-7a1.5 1.5 0 0 1 1.5-1.5h13a1.5 1.5 0 0 1 1.5 1.5v7M2.5 20.5h19" />
      <path d="M4 15.5c1.3 1.3 2.7 1.3 4 0s2.7-1.3 4 0 2.7 1.3 4 0 2.7-1.3 4 0M12 12V8.5" />
      <path d="M12 6.5c-1-.8-1-2 0-3.5 1 1.5 1 2.7 0 3.5z" />
    </>
  ),
  seat: (
    <>
      <path d="M7 3.5h10v8H7zM5 11.5h14v3H5zM7 14.5v6M17 14.5v6" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12.5H6z" />
      <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
    </>
  ),
  note: (
    <>
      <path d="M5.5 3.5h9l4 4v13h-13z" />
      <path d="M14.5 3.5v4h4M8.5 12h7M8.5 15.5h7M8.5 8.5h3" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7z" />
      <path d="M19 16.5c.2 1.5.9 2.2 2.5 2.5-1.6.3-2.3 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5z" />
    </>
  ),
  room: (
    <>
      <path d="M4 20.5V4.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v16M2.5 20.5h19M16 8h3.5v12.5" />
      <circle cx="12.5" cy="12.5" r=".6" fill="currentColor" />
    </>
  ),
  chef: (
    <>
      <path d="M7 14.5a4 4 0 0 1-.8-7.9 5 5 0 0 1 9.6-1 4 4 0 0 1 1.2 7.9v5H7z" />
      <path d="M7 16.5h10" />
    </>
  ),
  gift: (
    <>
      <path d="M4 10.5h16v10H4zM3 7h18v3.5H3zM12 7v13.5" />
      <path d="M12 7C10.5 3.5 7 3.5 7 5.5S10 7 12 7zm0 0c1.5-3.5 5-3.5 5-1.5S14 7 12 7z" />
    </>
  ),
};

interface BenefitIconProps {
  name: BenefitIconName;
  badge?: string;
}

/** Line icon in a soft circle, echoing the benefit tiles of the member program. */
export function BenefitIcon({ name, badge }: BenefitIconProps) {
  return (
    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-sand text-copper">
      {badge ? (
        <span className="font-serif text-[15px] font-semibold">{badge}</span>
      ) : (
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {paths[name]}
        </svg>
      )}
    </span>
  );
}
