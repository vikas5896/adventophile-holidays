import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Users } from "lucide-react";
import type { Tour } from "@/lib/types";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/lib/format";

export function TourCard({ tour }: { tour: Tour }) {
  const cover = tour.images[0];
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-brand-700 shadow">
          {formatPrice(tour.price.amount, tour.price.currency)}
          <span className="font-normal text-muted-foreground"> / person</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {tour.tags.slice(0, 2).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-700">{tour.title}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {tour.location.city ? `${tour.location.city}, ` : ""}
          {tour.location.country}
        </p>
        <p className="line-clamp-2 text-sm text-muted-foreground">{tour.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {tour.duration.days} days
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" aria-hidden="true" />
            Up to {tour.groupSize.max}
          </span>
          <StarRating value={tour.rating.value} />
        </div>
      </div>
    </Link>
  );
}
