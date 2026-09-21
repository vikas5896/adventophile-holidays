import Image from "next/image";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="w-fit text-xs font-semibold uppercase tracking-wide text-brand-600">
          {post.category}
        </span>
        <h3 className="text-lg font-semibold text-foreground group-hover:text-brand-700">{post.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">
          {formatDate(post.date)} · by {post.author}
        </p>
      </div>
    </Link>
  );
}
