import Link from "next/link";
import { getFeaturedTours } from "@/lib/data/tours";
import { TourCard } from "@/components/tours/TourCard";
import { Reveal } from "@/components/shared/Reveal";

export function PopularTours() {
  const tours = getFeaturedTours();

  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">Handpicked itineraries</p>
            <h2 className="section-title">Popular Packages</h2>
          </div>
          <Link href="/tours" className="btn-outline">
            View all packages
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={(i % 3) * 0.1}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
