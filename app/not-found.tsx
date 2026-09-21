import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <Compass className="h-12 w-12 text-brand-300" aria-hidden="true" />
      <h1 className="mt-4 text-3xl font-bold text-foreground">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        That page doesn&rsquo;t exist — it may have moved, or the link was mistyped. Try one of these instead.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
        <Link href="/tours" className="btn-outline">
          Browse tours
        </Link>
      </div>
    </div>
  );
}
