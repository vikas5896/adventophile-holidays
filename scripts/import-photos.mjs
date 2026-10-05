// One-off import: takes the real photography the user dropped in folders at the repo root
// and produces resized/cropped JPEGs under public/images/**, matching the dimensions the
// placeholder generator used (1200x800 destination/tour, 1920x1080 hero, 1200x630 OG).
// Run once with `node scripts/import-photos.mjs`, then delete the source folders.
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const imagesRoot = path.join(rootDir, "public", "images");

// destination slug -> [source folder name at repo root, tour slugs that reuse its photos]
const folderMap = {
  kashmir: { folder: "Kashmir", tours: ["kashmir-srinagar-gulmarg-pahalgam"] },
  "himachal-pradesh": { folder: "Himachal pradesh", tours: ["himachal-shimla-manali-solang"] },
  uttarakhand: { folder: "Uttrakand", tours: ["uttarakhand-nainital-mussoorie-rishikesh"] },
  goa: { folder: "Goa", tours: ["goa-beach-break"] },
  sikkim: { folder: "Sikkim", tours: ["sikkim-gangtok-pelling-lachung"] },
  meghalaya: { folder: "Meghalaya", tours: ["meghalaya-shillong-cherrapunji-dawki"] },
  kerala: { folder: "Kerala", tours: ["kerala-munnar-alleppey-kovalam"] },
  gujarat: { folder: "Gujarat", tours: ["gujarat-rann-somnath-gir"] },
  dubai: { folder: "Dubai", tours: ["dubai-city-desert-abu-dhabi"] },
  maldives: { folder: "Maldives", tours: ["maldives-overwater-escape"] },
  vietnam: { folder: "vietnam", tours: ["vietnam-hanoi-halong-danang-saigon"] },
  malaysia: { folder: "Malaysia", tours: ["malaysia-kl-genting-langkawi"] },
  "sri-lanka": { folder: "sri lanka", tours: ["sri-lanka-colombo-kandy-bentota"] },
  europe: { folder: "Europe", tours: ["europe-paris-switzerland-rome"] },
};

// destination slug -> explicit cover source file (repo-root relative), for destinations whose
// photos are split across per-city folders rather than one folder per state.
const destinationCovers = {
  rajasthan: "jodhpur/abhinav-tripathi-3FeeAbwIO2o-unsplash.jpg",
  "andaman-nicobar": "Andaman & nicobar/images.jpeg",
  "arunachal-pradesh": "Andra pradesh/images (3).jpeg",
};

// tour slug -> ordered list of explicit source files (repo-root relative).
const tourGalleries = {
  "jaisalmer-golden-city-desert-camp": [
    "jaisalmer/rashi-jain-L0CXfc_PE_w-unsplash.jpg",
    "jaisalmer/pj-bhumika-3GKW_PMipqs-unsplash.jpg",
    "jaisalmer/hotel-lal-garh-fort-and-palace-5ijvy635zhY-unsplash.jpg",
  ],
  "jodhpur-osian-desert-safari": [
    "jodhpur/abhinav-tripathi-3FeeAbwIO2o-unsplash.jpg",
    "jodhpur/deepesh-pareek-DiSHlURGr8E-unsplash.jpg",
    "jodhpur/akshay-thorat-JeMFUyi-vzo-unsplash.jpg",
  ],
  "royal-rajasthan-jaipur-jodhpur-udaipur": [
    "jodhpur/abhinav-tripathi-3FeeAbwIO2o-unsplash.jpg",
    "jaisalmer/rashi-jain-L0CXfc_PE_w-unsplash.jpg",
    "jodhpur/deepesh-pareek-DiSHlURGr8E-unsplash.jpg",
    "jaisalmer/pj-bhumika-3GKW_PMipqs-unsplash.jpg",
  ],
  "andaman-port-blair-havelock-neil": [
    "Andaman & nicobar/images.jpeg",
    "Andaman & nicobar/images (1).jpeg",
  ],
  "arunachal-tawang-bomdila": [
    "Andra pradesh/images (3).jpeg",
    "Andra pradesh/images.jpeg",
    "Andra pradesh/images (1).jpeg",
  ],
};

const MAX_PER_TOUR = 4;
const IMG_EXT = /\.(jpe?g|png)$/i;

function listImages(folder) {
  const dir = path.join(rootDir, folder);
  if (!existsSync(dir)) return [];
  const seen = new Set();
  const files = [];
  for (const name of readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    if (!statSync(full).isFile() || !IMG_EXT.test(name)) continue;
    // Skip exact duplicates (e.g. a browser-downloaded "(1)" copy of the same file).
    const key = `${statSync(full).size}`;
    if (seen.has(key)) continue;
    seen.add(key);
    files.push(full);
  }
  return files;
}

async function writePhoto(srcPath, destPath, { w, h }) {
  mkdirSync(path.dirname(destPath), { recursive: true });
  await sharp(srcPath)
    .rotate() // respect EXIF orientation
    .resize(w, h, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destPath);
}

async function run() {
  let destinationCount = 0;
  let tourImageCount = 0;
  const skippedDestinations = [];

  for (const [slug, { folder, tours }] of Object.entries(folderMap)) {
    const files = listImages(folder);
    if (files.length === 0) {
      skippedDestinations.push(slug);
      continue;
    }

    // Destination cover — first (best-ordered) photo in the folder.
    await writePhoto(files[0], path.join(imagesRoot, "destinations", `${slug}.jpg`), { w: 1200, h: 800 });
    destinationCount++;

    // Each tour tied to this destination gets up to MAX_PER_TOUR photos from the same folder.
    const chosen = files.slice(0, MAX_PER_TOUR);
    for (const tourSlug of tours) {
      for (let i = 0; i < chosen.length; i++) {
        await writePhoto(chosen[i], path.join(imagesRoot, "tours", tourSlug, `${i + 1}.jpg`), { w: 1200, h: 800 });
        tourImageCount++;
      }
    }
    console.log(`${slug.padEnd(18)} <- ${folder}/ (${files.length} photos, ${chosen.length} used per tour)`);
  }

  // Explicit per-destination covers and per-tour galleries (destinations whose photos arrived
  // split across per-city folders, e.g. Rajasthan, rather than one folder per state).
  for (const [slug, src] of Object.entries(destinationCovers)) {
    await writePhoto(path.join(rootDir, src), path.join(imagesRoot, "destinations", `${slug}.jpg`), { w: 1200, h: 800 });
    destinationCount++;
    console.log(`${slug.padEnd(18)} <- ${src}`);
  }
  for (const [tourSlug, sources] of Object.entries(tourGalleries)) {
    for (let i = 0; i < sources.length; i++) {
      await writePhoto(path.join(rootDir, sources[i]), path.join(imagesRoot, "tours", tourSlug, `${i + 1}.jpg`), { w: 1200, h: 800 });
      tourImageCount++;
    }
    console.log(`${tourSlug.padEnd(40)} <- ${sources.length} photos`);
  }

  // Homepage hero + default OG image, from the single hero collage.
  const heroSrc = path.join(rootDir, "Hiro Image", "Gemini_Generated_Image_u2fzd2u2fzd2u2fz.png");
  if (existsSync(heroSrc)) {
    await writePhoto(heroSrc, path.join(imagesRoot, "site", "hero.jpg"), { w: 1920, h: 1080 });
    await writePhoto(heroSrc, path.join(imagesRoot, "site", "og-default.jpg"), { w: 1200, h: 630 });
    console.log("site hero/OG   <- Hiro Image/");
  }

  console.log(
    `\nDone: ${destinationCount} destination covers, ${tourImageCount} tour photos, hero + OG image.`
  );
  if (skippedDestinations.length) {
    console.log(`No photos supplied for: ${skippedDestinations.join(", ")} — left on the illustrated SVG placeholder.`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
