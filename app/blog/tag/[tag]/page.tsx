import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { tagToSlug } from "@/lib/taxonomy";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: tagToSlug(tag) }));
}

function findTagByName(slug: string): string | undefined {
  return getAllTags().find((tag) => tagToSlug(tag) === slug);
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = findTagByName(tagSlug);
  if (!tag) return {};

  return buildMetadata({
    title: `#${tag} — Blog`,
    description: `Adventophile Holidays blog posts tagged ${tag}.`,
    path: `/blog/tag/${tagSlug}`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag: tagSlug } = await params;
  const tag = findTagByName(tagSlug);
  if (!tag) notFound();

  const posts = getPostsByTag(tag);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: `#${tag}`, href: `/blog/tag/${tagSlug}` }]} />
      <div className="container-page section">
        <p className="section-eyebrow">Tag</p>
        <h1 className="section-title">#{tag}</h1>
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 6) * 0.06}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted-foreground">No posts with this tag yet.</p>
        )}
      </div>
    </>
  );
}
