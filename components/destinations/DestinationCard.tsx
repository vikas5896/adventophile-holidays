import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Destination } from "@/lib/types";
import { getToursByDestination } from "@/lib/data/tours";

export function DestinationCard({ destination }: { destination: Destination }) {
  const tourCount = getToursByDestination(destination.slug).length;

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={destination.image.src}
          alt={destination.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-700">
          {destination.name}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {destination.country}
        </p>
        <p className="line-clamp-3 text-sm text-muted-foreground">{destination.blurb}</p>
        <p className="mt-auto border-t border-border pt-3 text-sm font-medium text-brand-600">
          {tourCount > 0
            ? `${tourCount} ${tourCount === 1 ? "package" : "packages"} →`
            : "Plan a custom trip →"}
        </p>
      </div>
    </Link>
  );
}
