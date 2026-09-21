"use client";

import { useState, type FormEvent } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: "Newsletter subscriber",
      email: String(form.get("email") || ""),
      message: "Newsletter signup from footer.",
      type: "newsletter" as const,
      company: String(form.get("company") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong.");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return <p className="text-sm text-brand-100">You&rsquo;re subscribed — thanks for joining us.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row sm:items-start">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-company">Company</label>
        <input id="newsletter-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex-1">
        <FormField
          label="Email address"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          error={status === "error" ? errorMessage ?? undefined : undefined}
          className="[&_.field-label]:text-brand-100 [&_.field-error]:text-accent-500"
        />
      </div>
      <Button type="submit" variant="accent" disabled={status === "loading"} className="sm:mt-7">
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  );
}
