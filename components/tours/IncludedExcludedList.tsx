import { Check, X } from "lucide-react";

export function IncludedExcludedList({ included, excluded }: { included: string[]; excluded: string[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <div>
        <h3 className="font-semibold text-foreground">Included</h3>
        <ul className="mt-3 space-y-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">Not Included</h3>
        <ul className="mt-3 space-y-2">
          {excluded.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
