"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { TiltCard } from "@/components/ui/tilt-card";
import { galleryCategories, galleryImages } from "@/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryImage } from "@/types";

type CategoryId = (typeof galleryCategories)[number]["id"];

export function GalleryGrid() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [active, setActive] = useState<GalleryImage | null>(null);

  const filtered = useMemo(() => {
    if (category === "all") return galleryImages;
    return galleryImages.filter((image) => image.category === category);
  }, [category]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Gallery categories"
      >
        {galleryCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={category === item.id}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              category === item.id
                ? "border-primary bg-primary text-white"
                : "border-border text-navy hover:border-primary hover:text-primary bg-white",
            )}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image) => (
          <TiltCard
            key={image.id}
            intensity={5}
            perspective={920}
            className="rounded-2xl"
          >
            <button
              type="button"
              className="group border-border focus-visible:ring-primary relative aspect-[3/2] w-full overflow-hidden rounded-2xl border bg-white text-left shadow-sm focus-visible:ring-2 focus-visible:outline-none"
              onClick={() => setActive(image)}
              aria-label={`Open larger view: ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] [transform:translateZ(12px)]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </button>
          </TiltCard>
        ))}
      </div>

      {active ? (
        <div
          className="bg-navy/70 fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={() => setActive(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setActive(null);
          }}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="text-navy absolute top-3 right-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow"
              aria-label="Close image"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <p className="text-muted px-5 py-4 text-sm">{active.alt}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
