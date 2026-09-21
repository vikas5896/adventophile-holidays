import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogCategory, BlogPostMeta } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

interface RawPost {
  meta: BlogPostMeta;
  content: string;
}

function readAllRaw(): RawPost[] {
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx$/, "");
    return {
      meta: {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        coverImageAlt: data.coverImageAlt,
        date: data.date,
        author: data.author,
        category: data.category as BlogCategory,
        tags: data.tags ?? [],
      },
      content,
    };
  });
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return readAllRaw()
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): RawPost | undefined {
  return readAllRaw().find((p) => p.meta.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return readAllRaw().map((p) => p.meta.slug);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPostsMeta().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPostsMeta().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getAllCategories(): BlogCategory[] {
  return ["Company Insight", "Creative", "Lifestyle", "Tips & Tricks"];
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPostsMeta().flatMap((p) => p.tags))).sort();
}
