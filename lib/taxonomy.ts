import type { BlogCategory } from "@/lib/types";

const CATEGORY_SLUGS: Record<BlogCategory, string> = {
  "Company Insight": "company-insight",
  Creative: "creative",
  Lifestyle: "lifestyle",
  "Tips & Tricks": "tips-tricks",
};

export function categoryToSlug(category: BlogCategory): string {
  return CATEGORY_SLUGS[category];
}

export function slugToCategory(slug: string): BlogCategory | undefined {
  const entry = (Object.entries(CATEGORY_SLUGS) as [BlogCategory, string][]).find(
    ([, s]) => s === slug
  );
  return entry?.[0];
}

export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
