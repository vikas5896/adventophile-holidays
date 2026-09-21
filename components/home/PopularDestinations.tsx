import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDestinationsByScope } from "@/lib/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { Reveal } from "@/components/shared/Reveal";

const groups = [
  {
    id: "domestic",
    title: "India — Domestic",
    lede: "Planned out of our Jodhpur office, with our own drivers and local guides.",
  },
  {
    id: "international",
    title: "International",
    lede: "Visas, flights, transfers and hotels handled end to end.",
  },
] as const;

export function PopularDestinations() {
  return (
    <section className="section bg-muted">
      <div className="container-page">
        <Reveal>
          <p className="section-eyebrow">Where we go</p>
          <h2 className="section-title">Domestic &amp; international holidays</h2>
        </Reveal>

        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <div key={group.id}>
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{group.lede}</p>
                  </div>
                  <Link
                    href={`/destinations#${group.id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    See all
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {getDestinationsByScope(group.id)
                  .filter((d) => d.featured)
                  .slice(0, 4)
                  .map((destination, i) => (
                    <Reveal key={destination.slug} delay={i * 0.06}>
                      <DestinationCard destination={destination} />
                    </Reveal>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
