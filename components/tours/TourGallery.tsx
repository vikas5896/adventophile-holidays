"use client";

import Image from "next/image";
import { useState } from "react";
import type { TourImage } from "@/lib/types";

export function TourGallery({ images, title }: { images: TourImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="relative h-72 w-full overflow-hidden rounded-2xl sm:h-96">
        <Image src={current.src} alt={current.alt} fill priority className="object-cover" sizes="100vw" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1} of ${title}`}
              aria-pressed={i === active}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                i === active ? "ring-brand-600" : "ring-transparent hover:ring-border"
              }`}
            >
              <Image src={img.src} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
