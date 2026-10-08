import { TierBadge } from "@/components/membership/TierBadge";
import { tiers } from "@/lib/membership";

/** Radio cards for the tier an applicant asks for; staff confirm it on approval. */
export function TierPicker({ name }: { name: string }) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="mb-1.5 text-[13px] tracking-[1.5px] text-cocoa uppercase">
        Pilih Tier<span className="ml-1 text-copper">*</span>
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {tiers.map((tier) => (
          <label
            key={tier.id}
            className="flex cursor-pointer flex-col items-center gap-1.5 border border-line bg-cream px-2 py-3 text-center transition-colors has-[:checked]:border-copper has-[:checked]:bg-cream-card has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-copper/40"
          >
            <input
              type="radio"
              name={name}
              value={tier.id}
              defaultChecked={tier.id === "silver"}
              required
              className="sr-only"
            />
            <TierBadge tier={tier.id} size={36} />
            <span className="font-serif text-lg leading-none font-medium">{tier.name}</span>
          </label>
        ))}
      </div>
      <p className="text-xs font-light text-cocoa-muted">
        Tier Gold dan Platinum dikonfirmasi tim kami saat verifikasi.
      </p>
    </fieldset>
  );
}
