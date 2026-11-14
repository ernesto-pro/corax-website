const RASTER = /^\/img\/.+\.(?:jpe?g|png)$/i;

/**
 * Local editorial photos ship as WebP next to the original JPEG/PNG:
 * same path, ~60-80% smaller. Remote images and SVG are left untouched.
 * Open Graph and JSON-LD keep using the original files.
 */
export function optSrc(src: string | null | undefined): string | undefined {
  if (!src) return undefined;
  return RASTER.test(src) ? src.replace(/\.(?:jpe?g|png)$/i, ".webp") : src;
}

const COVER = /^\/img\/covers\/(?!thumbs\/).+\.(?:webp|jpe?g|png)$/i;

/**
 * Editorial covers also ship as an 800px-wide WebP, so phones download the
 * small file and wide screens keep the 1600px master. Folder thumbs and files
 * outside /img/covers/ have no small variant, so they return undefined.
 */
export function optSrcSet(src: string | null | undefined): string | undefined {
  if (!src || !COVER.test(src)) return undefined;
  const small = src.replace(/\.(?:webp|jpe?g|png)$/i, "-800.webp");
  const large = optSrc(src);
  return large ? `${small} 800w, ${large} 1600w` : undefined;
}
