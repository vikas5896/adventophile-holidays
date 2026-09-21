"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";

export function SearchWidget() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("q", destination.trim());
    if (guests) params.set("guests", guests);
    router.push(`/tours?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:items-end"
    >
      <div className="flex-1 text-left">
        <label htmlFor="search-destination" className="field-label">
          Destination or package
        </label>
        <input
          id="search-destination"
          type="text"
          className="field-input"
          placeholder="Try “Rajasthan”, “Kashmir”, “Dubai”…"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="text-left sm:w-36">
        <label htmlFor="search-guests" className="field-label">
          Guests
        </label>
        <select
          id="search-guests"
          className="field-input"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-accent h-[42px] shrink-0">
        <Search className="h-4 w-4" aria-hidden="true" />
        Search Packages
      </button>
    </form>
  );
}
