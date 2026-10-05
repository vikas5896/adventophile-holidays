import Image from "next/image";
import Link from "next/link";
import { Compass, Crosshair, Map, PlaneTakeoff, Users, UsersRound } from "lucide-react";
import clsx from "clsx";
import { Reveal } from "@/components/shared/Reveal";

const featureStrip = [
  { icon: Crosshair, label: "Domestic & International" },
  { icon: Users, label: "Family Holidays" },
  { icon: UsersRound, label: "Group Travel" },
  { icon: Map, label: "Custom Itineraries" },
];

export function Hero() {
  return (
    <section className="relative bg-brand-900 py-16 text-white sm:py-20 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="section-eyebrow text-accent-500">
            Tailor-Made Holidays <span className="mx-2 text-brand-100/50">•</span> Jodhpur, India
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
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl sm:aspect-[16/11]">
            <Image
              src="/images/site/hero-couple.jpg"
              alt="A couple looking out over Jodhpur's Blue City towards Mehrangarh Fort at sunset"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
