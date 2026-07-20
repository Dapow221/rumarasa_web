import { type SiteData } from "@/lib/api";
import { E } from "@/components/admin/Editable";
import {
  ClockIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-full border border-tan-dark text-walnut transition-colors hover:border-copper hover:bg-copper hover:text-ivory";

/** tel: and mailto: want the raw value, not the display formatting. */
const telHref = (phone: string) => `tel:${phone.replace(/[^0-9+]/g, "")}`;

/**
 * Keyless Google Maps embed pinned to the restaurant's exact coordinates.
 * Coordinates rather than a name query so the pin can never drift to a
 * similarly-named place.
 */
const mapEmbedSrc = `https://maps.google.com/maps?q=${siteConfig.coords.lat},${siteConfig.coords.lng}&z=17&hl=id&output=embed`;

interface LocationProps {
  site: SiteData;
  content: Record<string, string>;
}

export function Location({ site }: LocationProps) {
  const contactRows = [
    {
      key: "address",
      icon: <MapPinIcon size={18} />,
      label: "Address",
      body: (
        <>
          <E k="site.address_street">{site.addressStreet}</E>
          <br />
          <E k="site.address_city">{site.addressCity}</E>
        </>
      ),
    },
    {
      key: "phone",
      icon: <PhoneIcon size={18} />,
      label: "Phone",
      body: (
        <a href={telHref(site.phone)} className="transition-colors hover:text-copper">
          <E k="site.phone">{site.phone}</E>
        </a>
      ),
    },
    {
      key: "email",
      icon: <MailIcon size={18} />,
      label: "Email",
      body: (
        <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-copper">
          <E k="site.email">{site.email}</E>
        </a>
      ),
    },
    {
      key: "hours",
      icon: <ClockIcon size={18} />,
      label: "Opening Hours",
      body: (
        <>
          <E k="site.hours_days">{site.hours.days}</E> :{" "}
          <E k="site.hours_time">{site.hours.time}</E>
        </>
      ),
    },
  ];

  return (
    <section
      id="lokasi"
      className="scroll-mt-20 bg-sand px-5 py-16 md:px-14 md:pt-[90px] md:pb-[100px]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-4 md:gap-[18px]">
          <p className="font-script text-2xl text-copper md:text-[26px]">Kunjungi kami</p>
          <h2 className="font-serif text-3xl font-medium md:text-[44px]">
            Contact Information{" "}
            <span className="text-xl italic text-caramel md:text-[26px]">/ Lokasi</span>
          </h2>

          <dl className="mt-1 flex flex-col gap-5">
            {contactRows.map((row) => (
              <div key={row.key} className="flex items-start gap-3.5">
                <span className="mt-0.5 flex-none text-copper">{row.icon}</span>
                <div>
                  <dt className="text-[12.5px] tracking-[1.5px] text-cocoa-muted uppercase">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-[15px] leading-[1.7] font-light text-cocoa md:text-base">
                    {row.body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-3 flex flex-wrap gap-3 border-t border-line pt-6">
            <a
              href={site.links.maps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Buka lokasi di Google Maps"
              title="Google Maps"
              className={socialClass}
            >
              <MapPinIcon size={18} />
            </a>
            <a
              href={site.waOrderLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi kami via WhatsApp"
              title="WhatsApp"
              className={socialClass}
            >
              <WhatsAppIcon size={18} />
            </a>
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Rumarasa Nusantara"
              title="Instagram"
              className={socialClass}
            >
              <InstagramIcon size={17} />
            </a>
            <a
              href={site.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Rumarasa Nusantara"
              title="TikTok"
              className={socialClass}
            >
              <TikTokIcon size={16} />
            </a>
          </div>
        </div>

        <div className="h-[280px] overflow-hidden border border-line sm:h-[360px] lg:h-auto lg:min-h-[440px]">
          <iframe
            src={mapEmbedSrc}
            title="Peta lokasi Rumarasa Nusantara"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
