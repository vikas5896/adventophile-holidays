import type { Metadata } from "next";
import Link from "next/link";
import { getDestinationsByScope } from "@/lib/data/destinations";
import { DestinationCard } from "@/components/destinations/DestinationCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Domestic & International Destinations",
  description:
    "Where Adventophile Holidays travels — eleven Indian destinations from Rajasthan and Kashmir to Kerala and the Andamans, plus international holidays from Dubai and the Maldives to Japan, Australia, Europe, the US and beyond.",
  path: "/destinations",
});

const sections = [
  {
    id: "domestic",
    scope: "domestic" as const,
    eyebrow: "Within India",
    title: "India — Domestic",
    lede: "Eleven states and island groups we run packages to, planned out of our Jodhpur office with our own drivers and local guides.",
  },
  {
    id: "international",
    scope: "international" as const,
    eyebrow: "Beyond India",
    title: "International",
    lede: "Visa documentation, flights, transfers and hotels handled end to end — so an overseas holiday is no harder to book than a domestic one.",
  },
];

export default function DestinationsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Destinations", href: "/destinations" }]} />
      <div className="container-page section">
        <p className="section-eyebrow">Where we go</p>
        <h1 className="section-title">Destinations</h1>
        <p className="section-lede">
          We plan customized holidays across India and abroad. Pick a destination to see the packages we
          run there, what it is best known for, and when to go.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="btn-outline">
              {section.title}
            </a>
          ))}
        </div>

        <div className="mt-12 space-y-16">
          {sections.map((section) => {
            const items = getDestinationsByScope(section.scope);
            return (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <Reveal>
                  <p className="section-eyebrow">{section.eyebrow}</p>
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                  <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{section.lede}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {items.length} destinations
                  </p>
                </Reveal>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((destination, i) => (
                    <Reveal key={destination.slug} delay={(i % 6) * 0.06}>
                      <DestinationCard destination={destination} />
                    </Reveal>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="card mt-16 flex flex-col items-center gap-3 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">Somewhere else in mind?</h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            These are the destinations we run most often — not a limit. Tell us where you want to go and
            we will build the itinerary around it.
          </p>
          <Link href="/contact" className="btn-primary">
            Request a custom package
          </Link>
        </div>
      </div>
    </>
  );
}
