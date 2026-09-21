import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getPostsByCategory } from "@/lib/blog";
import { categoryToSlug, slugToCategory } from "@/lib/taxonomy";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: categoryToSlug(category) }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = slugToCategory(categorySlug);
  if (!category) return {};

  return buildMetadata({
    title: `${category} — Blog`,
    description: `Adventophile Holidays blog posts filed under ${category}.`,
    path: `/blog/category/${categorySlug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = slugToCategory(categorySlug);
  if (!category) notFound();

  const posts = getPostsByCategory(category);

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: category, href: `/blog/category/${categorySlug}` }]} />
      <div className="container-page section">
        <p className="section-eyebrow">Category</p>
        <h1 className="section-title">{category}</h1>
        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 6) * 0.06}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-muted-foreground">No posts in this category yet.</p>
        )}
      </div>
    </>
  );
}
