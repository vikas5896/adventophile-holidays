import { Calendar, ShieldCheck, Users } from "lucide-react";
import type { Tour } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { StarRating } from "@/components/ui/StarRating";

export function TourInfoBox({ tour }: { tour: Tour }) {
  return (
    <div className="card p-5">
      <p className="text-3xl font-bold text-brand-700">
        {formatPrice(tour.price.amount, tour.price.currency)}
        <span className="text-base font-normal text-muted-foreground"> / {tour.price.unit.replace("per ", "")}</span>
      </p>
      <div className="mt-2">
        <StarRating value={tour.rating.value} count={tour.rating.count} />
      </div>

      <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" aria-hidden="true" /> Duration
          </dt>
          <dd className="font-medium text-foreground">
            {tour.duration.days} days / {tour.duration.nights} nights
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" aria-hidden="true" /> Group size
          </dt>
          <dd className="font-medium text-foreground">
            {tour.groupSize.min}–{tour.groupSize.max} people
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" /> Minimum age
          </dt>
          <dd className="font-medium text-foreground">{tour.minAge}+</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-5">
        {tour.tags.map((tag) => (
          <span key={tag} className="badge">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
