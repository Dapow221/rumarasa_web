"use client";

import { useRef, useState } from "react";
import type { Dish } from "@/lib/content";
import { EF } from "@/components/admin/Editable";
import { EImg } from "@/components/admin/EImg";
import { AddItem, DeleteItem } from "@/components/admin/ItemControls";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARD_WIDTH = 352;
const CARD_GAP = 28;

type Category = "food" | "beverage";

const tabs: { id: Category; label: string }[] = [
  { id: "food", label: "Makanan · Food" },
  { id: "beverage", label: "Minuman · Beverages" },
];

interface MenuShowcaseProps {
  foods: Dish[];
  beverages: Dish[];
}

export function MenuShowcase({ foods, beverages }: MenuShowcaseProps) {
  const [category, setCategory] = useState<Category>("food");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const dishes = category === "food" ? foods : beverages;

  const selectCategory = (next: Category) => {
    setCategory(next);
    scrollerRef.current?.scrollTo({ left: 0 });
  };

  const scrollBy = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GAP) * 2,
      behavior: "smooth",
    });
  };

  return (
    <section id="menu" className="scroll-mt-20 bg-cream px-5 py-16 md:px-14 md:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-10 md:mb-[52px]">
          <SectionHeading
            eyebrow="Dari dapur kami"
            title="Menu Andalan"
            titleEn="Signatures"
          />
          <p className="mx-auto mt-2.5 max-w-[520px] text-center text-[15px] font-light text-cocoa">
            Sebagian kecil dari menu lengkap kami — tanyakan menu hari ini
            melalui WhatsApp.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Kategori menu"
          className="mb-8 flex flex-wrap justify-center gap-3 md:mb-10"
        >
          {tabs.map((tab) => {
            const active = category === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active}
                onClick={() => selectCategory(tab.id)}
                className={`cursor-pointer rounded-full border px-6 py-3 text-[13.5px] tracking-[2px] whitespace-nowrap uppercase transition-colors md:px-[30px] ${
                  active
                    ? "border-espresso bg-espresso text-ivory-soft"
                    : "border-tan bg-transparent text-walnut hover:bg-line"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-7 overflow-x-auto scroll-smooth px-0.5 pt-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {dishes.map((dish) => (
            <article
              key={dish.id}
              className="relative flex w-[280px] flex-none flex-col gap-3.5 md:w-[352px]"
            >
              <DeleteItem collection="dishes" id={dish.id} />
              <div className="h-[200px] md:h-[250px]">
                <EImg image={dish.image} label={dish.imagePlaceholder} c="dishes" id={dish.id} />
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-xl font-semibold md:text-2xl">
                  <EF c="dishes" id={dish.id} f="name">{dish.name}</EF>
                </h3>
                <p className="font-serif text-lg whitespace-nowrap text-copper md:text-xl">
                  <EF c="dishes" id={dish.id} f="price">{dish.price}</EF>
                </p>
              </div>
              <p className="text-sm leading-relaxed font-light text-cocoa">
                <EF c="dishes" id={dish.id} f="description">{dish.description}</EF>
              </p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <AddItem
            collection="dishes"
            label={category === "food" ? "Tambah Makanan" : "Tambah Minuman"}
            template={{
              kind: category,
              name: category === "food" ? "Menu Baru" : "Minuman Baru",
              price: "Rp 0",
              description: "Deskripsi menu.",
            }}
          />
        </div>

        <div className="mt-7 flex justify-center gap-3.5">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Sebelumnya"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-tan-dark text-xl text-walnut transition-colors hover:bg-line"
          >
            ←
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Berikutnya"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-tan-dark text-xl text-walnut transition-colors hover:bg-line"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
