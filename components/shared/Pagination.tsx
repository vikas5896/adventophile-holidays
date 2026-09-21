import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  buildHref,
}: {
  currentPage: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={
            page === currentPage
              ? "flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
              : "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-foreground hover:bg-muted"
          }
        >
          {page}
        </Link>
      ))}
    </nav>
  );
}
