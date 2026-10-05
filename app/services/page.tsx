import type { Metadata } from "next";
import Link from "next/link";
import { getAllServices } from "@/lib/data/services";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Our Services",
  description:
    "Customized tour packages, domestic and international holidays, hotel bookings, private vehicles, sightseeing, honeymoon and group tours, corporate & MICE travel and complete travel assistance from Adventophile Holidays, Jodhpur.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <Breadcrumbs items={[{ label: "Services", href: "/services" }]} />
      <div className="container-page section">
        <p className="section-eyebrow">What we do</p>
        <h1 className="section-title">Our Services</h1>
        <p className="section-lede">
          Adventophile Holidays is a full travel &amp; holiday management company. We do not just sell a
          package and step back — flights, hotels, vehicles, permits, sightseeing and the phone call at
          11pm when a train is late are all part of the same job.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, title, description, icon: Icon }, i) => (
            <Reveal key={slug} delay={(i % 6) * 0.06}>
              <div id={slug} className="card h-full scroll-mt-24 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-semibold text-foreground">{title}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="card mt-16 flex flex-col items-center gap-3 p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground">Tell us what you need</h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            Send us your dates, your group size and roughly what you have in mind. We will come back with
            an itinerary and a quote, usually within one working day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Get in touch
            </Link>
            <Link href="/destinations" className="btn-outline">
              Browse destinations
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
