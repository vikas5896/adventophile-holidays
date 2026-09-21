"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function BookingForm({ tourSlug, tourTitle }: { tourSlug: string; tourTitle: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      tourSlug,
      tourTitle,
      startDate: String(form.get("startDate") || ""),
      guests: Number(form.get("guests") || 1),
      message: String(form.get("message") || ""),
      company: String(form.get("company") || ""),
    };

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-5" role="status">
        <h3 className="font-semibold text-foreground">Request sent</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks — a trip coordinator will reply within one business day to confirm availability for{" "}
          <strong>{tourTitle}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-5">
      <h3 className="font-semibold text-foreground">Book This Tour</h3>
      <p className="text-sm text-muted-foreground">
        This sends a booking inquiry — a real person confirms availability and payment details by email.
      </p>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`booking-company-${tourSlug}`}>Company</label>
        <input id={`booking-company-${tourSlug}`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <FormField label="Full name" name="name" required autoComplete="name" />
      <FormField label="Email" name="email" type="email" required autoComplete="email" />
      <FormField label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Preferred start date" name="startDate" type="date" />
        <FormField label="Guests" name="guests" type="number" min={1} max={30} defaultValue={2} />
      </div>
      <FormField label="Anything we should know?" name="message" as="textarea" placeholder="Optional" />

      {status === "error" && (
        <p className="field-error" role="alert">
          {errorMessage}
        </p>
      )}

      <Button type="submit" variant="accent" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending…" : "Request to Book"}
      </Button>
    </form>
  );
}
