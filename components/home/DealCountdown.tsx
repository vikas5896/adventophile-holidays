"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Fixed target so the countdown is deterministic between server and client renders.
const DEAL_END = new Date("2026-10-12T23:59:59Z").getTime();

function getRemaining() {
  const diff = Math.max(0, DEAL_END - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function DealCountdown() {
  const [remaining, setRemaining] = useState<ReturnType<typeof getRemaining> | null>(null);

  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    const initial = setTimeout(() => setRemaining(getRemaining()), 0);
    return () => {
      clearInterval(id);
      clearTimeout(initial);
    };
  }, []);

  const units = [
    { label: "Days", value: remaining?.days },
    { label: "Hours", value: remaining?.hours },
    { label: "Minutes", value: remaining?.minutes },
    { label: "Seconds", value: remaining?.seconds },
  ];

  return (
    <section className="section bg-accent-600 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container-page flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-100">Limited-time offer</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Save ₹5,000 per couple on Kashmir &amp; Himachal
          </h2>
          <p className="mt-3 max-w-xl text-orange-50">
            Book any Kashmir or Himachal package for the coming season before the offer ends.
          </p>
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3" role="timer" aria-label="Time remaining on this offer">
            {units.map((unit) => (
              <div key={unit.label} className="w-16 rounded-xl bg-white/15 py-3">
                <span className="block text-2xl font-bold tabular-nums" aria-hidden="true">
                  {unit.value !== undefined ? String(unit.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-1 block text-xs uppercase tracking-wide text-orange-100">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link href="/tours" className="btn-outline bg-white text-accent-600 hover:bg-orange-50">
              View Deals
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
