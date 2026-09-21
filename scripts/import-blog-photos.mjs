// One-off import: the 9 illustrated cover images supplied in Blog/1.png..9.png match the blog
// posts by content (most have the post's own title baked into the artwork) and, in order, line
// up exactly with the posts newest-to-oldest. Resizes each to the site's existing blog-cover
// aspect ratio (1200x675, matching the SVG placeholders it replaces) and writes them under
// public/images/blog/. Run once with `node scripts/import-blog-photos.mjs`.
import { existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const destDir = path.join(rootDir, "public", "images", "blog");

// Source file (Blog/<n>.png) -> post slug, ordered newest-post-first to match how the
// images were generated (confirmed by the title text baked into images 3 and 5-9).
const mapping = [
  { n: 1, slug: "change-your-place-and-get-the-fresh-air" },
  { n: 2, slug: "signs-you-should-book-that-trek" },
  { n: 3, slug: "budget-adventure-travel-on-any-income" },
  { n: 4, slug: "the-surfing-man-will-blow-your-mind" },
  { n: 5, slug: "introducing-this-amazing-city" },
  { n: 6, slug: "pack-wisely-before-traveling" },
  { n: 7, slug: "why-slow-travel-changes-how-you-see-the-world" },
  { n: 8, slug: "how-to-travel-with-a-paper-map" },
  { n: 9, slug: "a-rethoric-question-worth-asking-before-you-book" },
];

async function run() {
  mkdirSync(destDir, { recursive: true });
  for (const { n, slug } of mapping) {
    const src = path.join(rootDir, "Blog", `${n}.png`);
    if (!existsSync(src)) {
      console.log(`SKIP ${n}.png — not found`);
      continue;
    }
    const dest = path.join(destDir, `${slug}.jpg`);
    await sharp(src).resize(1200, 675, { fit: "cover", position: "attention" }).jpeg({ quality: 85, mozjpeg: true }).toFile(dest);
    console.log(`${String(n).padEnd(2)} -> ${slug}.jpg`);
  }
  console.log(`\nDone: ${mapping.length} blog covers imported.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
