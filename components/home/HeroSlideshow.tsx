"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Compass, Crosshair, Map, PlaneTakeoff, Users, UsersRound } from "lucide-react";
import clsx from "clsx";

const featureStrip = [
  { icon: Crosshair, label: "Domestic & International" },
  { icon: Users, label: "Family Holidays" },
  { icon: UsersRound, label: "Group Travel" },
  { icon: Map, label: "Custom Itineraries" },
];

const SLIDE_DURATION_MS = 5000;

interface Slide {
  src: string;
  alt: string;
}

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative flex min-h-[560px] items-center overflow-hidden text-white sm:min-h-[640px] lg:min-h-[720px]">
      <div className="absolute inset-0 bg-brand-900">
        <AnimatePresence mode={shouldReduceMotion ? "wait" : "sync"} initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1 }}
            className="absolute inset-0"
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="container-page relative z-10 py-16 sm:py-20">
        <div className="max-w-xl">
          <p className="section-eyebrow text-accent-500">
            Tailor-Made Holidays <span className="mx-2 text-white/50">•</span> Jodhpur, India
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Your Journey.
            <br />
            <span className="text-accent-500">Thoughtfully Planned.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-brand-50 sm:text-lg">
            From Rajasthan to the world, we design personalised holidays around your dates, budget
            and travel style — with expert planning and support from start to finish.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              <PlaneTakeoff className="h-4 w-4" aria-hidden="true" />
              Plan My Trip
            </Link>
            <Link
              href="/destinations"
              className="btn-outline border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
              Explore Destinations
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap items-stretch">
            {featureStrip.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className={clsx(
                  "flex max-w-20 flex-col items-start gap-2 px-4 text-left text-xs text-brand-50 first:pl-0",
                  i > 0 && "border-l border-white/15"
                )}
              >
                <Icon className="h-5 w-5 text-accent-500" aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="absolute bottom-16 right-4 z-10 hidden -rotate-3 font-script text-xl text-accent-500 [text-shadow:0_2px_10px_rgb(0_0_0_/_0.6)] sm:right-8 sm:block sm:text-2xl">
        Born in Rajasthan.
        <br />
        Planning journeys worldwide.
      </p>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show slide ${i + 1}: ${slide.alt}`}
            onClick={() => setIndex(i)}
            className={clsx(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-accent-500" : "w-1.5 bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}
