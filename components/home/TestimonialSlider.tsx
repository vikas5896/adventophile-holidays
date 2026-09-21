"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal } from "@/components/shared/Reveal";

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const current = testimonials[index];

  function go(delta: number) {
    setDirection(delta);
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="text-center">
          <p className="section-eyebrow">Traveler stories</p>
          <h2 className="section-title">What our travelers say</h2>
        </Reveal>

        <div className="relative mx-auto mt-10 max-w-2xl overflow-hidden text-center">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current.name}
              custom={direction}
              initial={{ opacity: 0, x: direction >= 0 ? 32 : -32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction >= 0 ? -32 : 32 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Quote className="mx-auto h-8 w-8 text-brand-200" aria-hidden="true" />
              <p className="mt-4 text-lg text-foreground">&ldquo;{current.quote}&rdquo;</p>
              <div className="mt-6 flex flex-col items-center gap-2">
                <Image
                  src={current.avatar}
                  alt={`Photo of ${current.name}`}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <p className="font-semibold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground">{current.location}</p>
                <StarRating value={current.rating} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            className="btn-ghost h-10 w-10 rounded-full p-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="flex gap-1.5" role="tablist" aria-label="Testimonials">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial from ${t.name}`}
                onClick={() => goTo(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? "bg-brand-600" : "bg-border"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="btn-ghost h-10 w-10 rounded-full p-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
