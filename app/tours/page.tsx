import type { Metadata } from "next";
import { getAllTours, getAllTags, getTourScope } from "@/lib/data/tours";
import { getAllDestinations, getDestinationName } from "@/lib/data/destinations";
import { TourCard } from "@/components/tours/TourCard";
import { TourFilterSidebar } from "@/components/tours/TourFilterSidebar";
import { Pagination } from "@/components/shared/Pagination";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Tour Packages",
  description:
    "Browse every Adventophile Holidays package — domestic holidays across Rajasthan, Kashmir, Himachal, Kerala, Goa, the Northeast and the Andamans, and international trips to Dubai, the Maldives, Vietnam, Malaysia, Sri Lanka and Europe.",
  path: "/tours",
});

const PAGE_SIZE = 9;

interface ToursPageProps {
  searchParams: Promise<{
    q?: string;
    scope?: string;
    destination?: string;
    tag?: string;
    guests?: string;
    page?: string;
  }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams;
  const allTours = getAllTours();

  const q = params.q?.toLowerCase().trim();
  const scope = params.scope === "domestic" || params.scope === "international" ? params.scope : undefined;
  const destination = params.destination;
  const tag = params.tag;
  const guests = params.guests ? Number(params.guests) : undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const filtered = allTours.filter((tour) => {
    if (q) {
      const haystack = `${tour.title} ${tour.location.country} ${tour.location.city ?? ""} ${getDestinationName(
        tour.location.destination
      )} ${tour.excerpt}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    if (scope && getTourScope(tour) !== scope) return false;
    if (destination && tour.location.destination !== destination) return false;
    if (tag && !tour.tags.includes(tag)) return false;
    if (guests && tour.groupSize.max < guests) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function buildHref(targetPage: number) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (scope) p.set("scope", scope);
    if (destination) p.set("destination", destination);
    if (tag) p.set("tag", tag);
    if (guests) p.set("guests", String(guests));
    if (targetPage > 1) p.set("page", String(targetPage));
    const qs = p.toString();
    return qs ? `/tours?${qs}` : "/tours";
  }

  return (
    <>
      <Breadcrumbs items={[{ label: "Tours", href: "/tours" }]} />
      <div className="container-page section grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside>
          <TourFilterSidebar destinations={getAllDestinations()} tags={getAllTags()} />
        </aside>
        <div>
          <div className="mb-6 flex items-baseline justify-between">
            <h1 className="text-2xl font-bold text-foreground">
              {filtered.length} {filtered.length === 1 ? "package" : "packages"} found
            </h1>
          </div>
          {pageItems.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {pageItems.map((tour, i) => (
                <Reveal key={tour.slug} delay={(i % 6) * 0.06}>
                  <TourCard tour={tour} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card p-10 text-center text-muted-foreground">
              No packages match those filters yet. Try widening your search — or ask us to build the trip
              from scratch.
            </div>
          )}
          <Pagination currentPage={currentPage} totalPages={totalPages} buildHref={buildHref} />
        </div>
      </div>
    </>
  );
}
