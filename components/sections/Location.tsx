import { contentImage, type SiteData } from "@/lib/api";
import { E } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { InstagramIcon, TikTokIcon } from "@/components/ui/icons";

const pillClass =
  "inline-flex items-center gap-2 rounded-full border border-tan-dark px-6 py-3 text-[13px] tracking-[2px] whitespace-nowrap text-walnut uppercase transition-colors hover:bg-line hover:text-espresso-line md:px-7";

interface LocationProps {
  site: SiteData;
  content: Record<string, string>;
}

export function Location({ site, content }: LocationProps) {
  return (
    <section
      id="lokasi"
      className="scroll-mt-20 bg-sand px-5 py-16 md:px-14 md:pt-[90px] md:pb-[100px]"
    >
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center gap-4 md:gap-[18px]">
          <p className="font-script text-2xl text-copper md:text-[26px]">
            Kunjungi kami
          </p>
          <h2 className="font-serif text-3xl font-medium md:text-[44px]">
            Lokasi & Jam Buka{" "}
            <span className="text-xl italic text-caramel md:text-[26px]">
              / Find Us
            </span>
          </h2>
          <p className="text-[15px] leading-[1.75] font-light text-cocoa md:text-base">
            <E k="site.address_street">{site.addressStreet}</E>
            <br />
            <E k="site.address_city">{site.addressCity}</E>
          </p>
          <dl className="grid max-w-[380px] grid-cols-[auto_1fr] gap-x-7 gap-y-2 text-[15px] font-light text-cocoa">
            {site.hours.map((slot, i) => {
              const prefix = i === 0 ? "site.hours_weekday" : "site.hours_weekend";
              return (
                <div key={prefix} className="col-span-2 grid grid-cols-subgrid">
                  <dt className="self-center text-[12.5px] tracking-[1px] text-cocoa-muted uppercase">
                    <E k={`${prefix}_days`}>{slot.days}</E>
                  </dt>
                  <dd>
                    <E k={`${prefix}_time`}>{slot.time}</E>
                  </dd>
                </div>
              );
            })}
          </dl>
          <div className="mt-2 flex flex-wrap gap-3 md:gap-4">
            <a
              href={site.links.maps}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              Buka di Maps
            </a>
            <a
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <InstagramIcon size={15} />
              Instagram
            </a>
            <a
              href={site.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className={pillClass}
            >
              <TikTokIcon size={14} />
              TikTok
            </a>
          </div>
        </div>
        <div className="h-[280px] sm:h-[360px] lg:h-[440px]">
          <EImg
            image={contentImage(content, "location.image")}
            label="Screenshot peta lokasi / foto fasad"
            k="location.image"
          />
        </div>
      </div>
    </section>
  );
}
