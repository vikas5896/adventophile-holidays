import Link from "next/link";
import { getAllPostsMeta } from "@/lib/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/shared/Reveal";

export function LatestBlog() {
  const posts = getAllPostsMeta().slice(0, 3);

  return (
    <section className="section bg-muted">
      <div className="container-page">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">From the journal</p>
            <h2 className="section-title">Latest from our blog</h2>
          </div>
          <Link href="/blog" className="btn-outline">
            Read the blog
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
