import { Star } from "lucide-react";

export function StarRating({ value, count }: { value: number; count?: number }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5 stars${count ? ` from ${count} reviews` : ""}`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < rounded ? "h-4 w-4 fill-accent-500 text-accent-500" : "h-4 w-4 text-border"}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {value.toFixed(1)}
        {count ? ` (${count})` : ""}
      </span>
    </div>
  );
}
