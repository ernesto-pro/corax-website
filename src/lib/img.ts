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
