import { statSync } from "node:fs";
import path from "node:path";

// Appends the source file's mtime as a query string so that re-running
// scripts/import-photos.mjs (which overwrites files in place, same filename) produces a new
// URL — otherwise browsers and the Next.js image optimizer keep serving the old cached photo
// at that path indefinitely, since the URL never changes even though the file content does.
export function withVersion(publicSrc: string): string {
  try {
    const abs = path.join(process.cwd(), "public", publicSrc);
    const mtime = statSync(abs).mtimeMs;
    return `${publicSrc}?v=${Math.round(mtime)}`;
  } catch {
    return publicSrc;
  }
}
