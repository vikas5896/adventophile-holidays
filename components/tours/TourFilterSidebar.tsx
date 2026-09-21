"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import type { Destination } from "@/lib/types";

export function TourFilterSidebar({
  destinations,
  tags,
}: {
  destinations: Destination[];
  tags: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [scope, setScope] = useState(searchParams.get("scope") ?? "");
  const [destination, setDestination] = useState(searchParams.get("destination") ?? "");
  const [tag, setTag] = useState(searchParams.get("tag") ?? "");
  const [guests, setGuests] = useState(searchParams.get("guests") ?? "");

  const domestic = destinations.filter((d) => d.scope === "domestic");
  const international = destinations.filter((d) => d.scope === "international");

  function apply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (scope) params.set("scope", scope);
    if (destination) params.set("destination", destination);
    if (tag) params.set("tag", tag);
    if (guests) params.set("guests", guests);
    router.push(`/tours?${params.toString()}`);
  }

  function reset() {
    setQ("");
    setScope("");
    setDestination("");
    setTag("");
    setGuests("");
    router.push("/tours");
  }

  // Picking a specific destination implies its scope, so clear the broader filter to avoid
  // a contradictory pair like scope=domestic + destination=dubai returning nothing.
  function onDestinationChange(value: string) {
    setDestination(value);
    if (value) setScope("");
  }

  return (
    <form onSubmit={apply} className="card sticky top-24 space-y-5 p-5">
      <h2 className="font-semibold text-foreground">Search Packages</h2>

      <div>
        <label htmlFor="filter-q" className="field-label">
          Keyword
        </label>
        <input
          id="filter-q"
          type="text"
          className="field-input"
          placeholder="Destination, package name…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <fieldset>
        <legend className="field-label">Trip scope</legend>
        <div className="mt-1 grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
          {[
            { value: "", label: "All" },
            { value: "domestic", label: "India" },
            { value: "international", label: "Abroad" },
          ].map((option) => (
            <label
              key={option.value || "all"}
              className={
                scope === option.value
                  ? "cursor-pointer rounded-md bg-white px-2 py-1.5 text-center text-sm font-semibold text-brand-700 shadow-sm"
                  : "cursor-pointer rounded-md px-2 py-1.5 text-center text-sm text-muted-foreground hover:text-foreground"
              }
            >
              <input
                type="radio"
                name="scope"
                value={option.value}
                checked={scope === option.value}
                onChange={() => {
                  setScope(option.value);
                  setDestination("");
                }}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="filter-destination" className="field-label">
          Destination
        </label>
        <select
          id="filter-destination"
          className="field-input"
          value={destination}
          onChange={(e) => onDestinationChange(e.target.value)}
        >
          <option value="">All destinations</option>
          <optgroup label="India — Domestic">
            {domestic.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="International">
            {international.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div>
        <label htmlFor="filter-tag" className="field-label">
          Trip type
        </label>
        <select id="filter-tag" className="field-input" value={tag} onChange={(e) => setTag(e.target.value)}>
          <option value="">All types</option>
          {tags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="filter-guests" className="field-label">
          Guests
        </label>
        <select id="filter-guests" className="field-input" value={guests} onChange={(e) => setGuests(e.target.value)}>
          <option value="">Any group size</option>
          {[1, 2, 4, 6, 8].map((n) => (
            <option key={n} value={n}>
              {n}+ guests
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn-primary flex-1">
          Apply Search
        </button>
        <button type="button" onClick={reset} className="btn-ghost">
          Reset
        </button>
      </div>
    </form>
  );
}
