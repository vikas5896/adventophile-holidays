import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { categoryToSlug, tagToSlug } from "@/lib/taxonomy";
import { formatDate } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/structured-data";
import { StructuredData } from "@/components/shared/StructuredData";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogPostContent } from "@/components/blog/BlogPostContent";
import { Reveal } from "@/components/shared/Reveal";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.meta.title,
    description: post.meta.excerpt,
    path: `/blog/${post.meta.slug}`,
    image: post.meta.coverImage,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.meta.title, href: `/blog/${slug}` }]} />
      <article className="container-page section max-w-3xl">
        <Reveal>
          <Link
            href={`/blog/category/${categoryToSlug(post.meta.category)}`}
            className="text-xs font-semibold uppercase tracking-wide text-brand-600 hover:underline"
          >
            {post.meta.category}
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{post.meta.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {formatDate(post.meta.date)} · by {post.meta.author}
          </p>

          <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
            <Image src={post.meta.coverImage} alt={post.meta.coverImageAlt} fill priority className="object-cover" sizes="768px" />
          </div>
        </Reveal>

        <BlogPostContent content={post.content} />

        <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
          {post.meta.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tagToSlug(tag)}`} className="badge hover:bg-brand-100">
              #{tag}
            </Link>
          ))}
        </div>
      </article>
      <StructuredData schema={blogPostingSchema(post.meta)} />
    </>
  );
}
