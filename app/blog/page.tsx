import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostsMeta, getAllCategories } from "@/lib/blog";
import { categoryToSlug } from "@/lib/taxonomy";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: "Travel tips, packing advice and destination guides from the Adventophile Holidays team in Jodhpur.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      <div className="container-page section">
        <p className="section-eyebrow">Our journal</p>
        <h1 className="section-title">Travel tips &amp; stories</h1>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link key={category} href={`/blog/category/${categoryToSlug(category)}`} className="badge hover:bg-brand-100">
              {category}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 6) * 0.06}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
