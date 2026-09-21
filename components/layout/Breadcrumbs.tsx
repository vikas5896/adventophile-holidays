import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { StructuredData } from "@/components/shared/StructuredData";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/structured-data";

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const withHome: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/60">
      <div className="container-page flex flex-wrap items-center gap-1 py-3 text-sm text-muted-foreground">
        {withHome.map((item, i) => {
          const isLast = i === withHome.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-brand-600">
                  {item.label}
                </Link>
              )}
            </span>
          );
        })}
      </div>
      <StructuredData schema={breadcrumbSchema(withHome)} />
    </nav>
  );
}
