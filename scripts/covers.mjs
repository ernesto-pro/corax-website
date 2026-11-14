import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * Builds the 800px WebP next to every editorial cover, so `optSrcSet()`
 * can serve phones a small file. Files in /img/covers/thumbs/ are already
 * small and are skipped.
 */
const dir = path.join(process.cwd(), "public", "img", "covers");

let made = 0;
let skipped = 0;

for (const name of readdirSync(dir)) {
  if (!name.endsWith(".webp") || name.endsWith("-800.webp")) continue;
  if (name === "thumbs") continue;
  const src = path.join(dir, name);
  const out = path.join(dir, name.replace(/\.webp$/, "-800.webp"));
  if (existsSync(out)) {
    skipped += 1;
    continue;
  }
  try {
    execFileSync("cwebp", ["-quiet", "-resize", "800", "0", "-q", "74", src, "-o", out]);
    made += 1;
    console.log(`✓ ${name} → ${path.basename(out)}`);
  } catch (error) {
    console.error("cwebp is required (brew install webp).", error.message);
    process.exit(1);
  }
}

console.log(`✓ 800px covers: ${made} created, ${skipped} already there`);
