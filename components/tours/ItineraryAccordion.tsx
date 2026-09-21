"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";

export function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<number | null>(itinerary[0]?.day ?? null);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border">
      {itinerary.map((day) => {
        const isOpen = openDay === day.day;
        const panelId = `itinerary-day-${day.day}`;
        return (
          <div key={day.day}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenDay(isOpen ? null : day.day)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-foreground">
                  <span className="text-brand-600">Day {day.day}:</span> {day.title}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && (
              <div id={panelId} className="px-5 pb-5 text-sm text-muted-foreground">
                {day.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
