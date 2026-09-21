import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { getAllTourSlugs, getTourBySlug } from "@/lib/data/tours";
import { buildMetadata } from "@/lib/seo";
import { touristTripSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/shared/StructuredData";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourInfoBox } from "@/components/tours/TourInfoBox";
import { IncludedExcludedList } from "@/components/tours/IncludedExcludedList";
import { ItineraryAccordion } from "@/components/tours/ItineraryAccordion";
import { BookingForm } from "@/components/tours/BookingForm";
import { Reveal } from "@/components/shared/Reveal";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllTourSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return {};

  return buildMetadata({
    title: tour.title,
    description: tour.excerpt,
    path: `/tours/${tour.slug}`,
    image: tour.images[0]?.src,
  });
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Tours", href: "/tours" },
          { label: tour.title, href: `/tours/${tour.slug}` },
        ]}
      />
      <div className="container-page section">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <Reveal>
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {tour.location.city ? `${tour.location.city}, ` : ""}
                {tour.location.country}
              </p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{tour.title}</h1>

              <div className="mt-6">
                <TourGallery images={tour.images} title={tour.title} />
              </div>
            </Reveal>

            <Reveal>
              <section className="mt-10">
                <h2 className="text-xl font-semibold text-foreground">Overview</h2>
                <p className="mt-3 text-muted-foreground">{tour.overview}</p>
              </section>
            </Reveal>

            <Reveal>
              <section className="mt-10">
                <h2 className="text-xl font-semibold text-foreground">Tour Highlights</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {tour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section className="mt-10">
                <h2 className="text-xl font-semibold text-foreground">What&rsquo;s Included</h2>
                <div className="mt-3">
                  <IncludedExcludedList included={tour.included} excluded={tour.excluded} />
                </div>
              </section>
            </Reveal>

            <Reveal>
              <section className="mt-10">
                <h2 className="text-xl font-semibold text-foreground">Day-by-Day Itinerary</h2>
                <div className="mt-3">
                  <ItineraryAccordion itinerary={tour.itinerary} />
                </div>
              </section>
            </Reveal>
          </div>

          <aside className="space-y-6">
            <Reveal delay={0.15} className="lg:sticky lg:top-24">
              <TourInfoBox tour={tour} />
              <div className="mt-6">
                <BookingForm tourSlug={tour.slug} tourTitle={tour.title} />
              </div>
            </Reveal>
          </aside>
        </div>
      </div>
      <StructuredData schema={touristTripSchema(tour)} />
    </>
  );
}
