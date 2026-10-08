import type { Benefit } from "@/lib/membership";
import { BenefitIcon } from "./BenefitIcon";

export function BenefitGrid({ benefits }: { benefits: Benefit[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {benefits.map((benefit) => (
        <li
          key={benefit.title}
          className="flex min-h-[92px] items-center gap-4 border border-line bg-cream-card px-5 py-4 transition-colors hover:border-tan"
        >
          <BenefitIcon name={benefit.icon} />
          <span className="font-serif text-lg leading-snug font-semibold text-espresso">
            {benefit.title}
          </span>
        </li>
      ))}
    </ul>
  );
}
