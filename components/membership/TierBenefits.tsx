"use client";

import { useState } from "react";
import { tiers, type TierId } from "@/lib/membership";
import { BenefitGrid } from "./BenefitGrid";
import { TierBadge } from "./TierBadge";

export function TierBenefits({ initialTier = "silver" }: { initialTier?: TierId }) {
  const [active, setActive] = useState<TierId>(initialTier);
  const tier = tiers.find((t) => t.id === active) ?? tiers[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tingkat member"
        className="mx-auto grid max-w-[520px] grid-cols-3 border-b border-line"
      >
        {tiers.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="tier-panel"
              onClick={() => setActive(t.id)}
              className={`-mb-px cursor-pointer border-b-2 py-3 text-[13px] tracking-[2px] uppercase transition-colors ${
                selected
                  ? "border-copper text-copper"
                  : "border-transparent text-cocoa-muted hover:text-espresso"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <div id="tier-panel" role="tabpanel" className="mt-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <TierBadge tier={tier.id} />
          <h2 className="mt-1 font-serif text-3xl font-medium">{tier.name}</h2>
        </div>
        <div className="mt-10">
          <BenefitGrid benefits={tier.benefits} />
        </div>
      </div>
    </div>
  );
}
