import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const templatePath = path.join(dist, "index.html");
const serverEntry = path.join(root, "dist-ssr", "entry-server.js");
const base = "https://corax.it";
const lastmod = "2026-11-11";

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function headHtml(head, route) {
  const robots = head.robots ?? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": head.jsonLd }).replace(/</g, "\\u003c");
  const locale = head.lang === "en" ? "en_US" : "it_IT";
  const parts = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<meta name="robots" content="${esc(robots)}" />`,
    ...(head.canonical ? [`<link rel="canonical" href="${esc(head.canonical)}" />`] : []),
    ...head.alternates.map(
      (alt) => `<link rel="alternate" hreflang="${esc(alt.hreflang)}" href="${esc(alt.href)}" />`,
    ),
    `<meta property="og:type" content="${esc(head.type)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${locale === "en_US" ? "it_IT" : "en_US"}" />`,
    `<meta property="og:site_name" content="Corax" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:url" content="${esc(head.canonical || `${base}${route}`)}" />`,
    `<meta property="og:image" content="${esc(head.image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc("Corax — Social Media Company")}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.title)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${esc(head.image)}" />`,
    `<script type="application/ld+json" id="corax-jsonld">${json}</script>`,
  ];

  return parts.join("\n    ");
}

/** Strip the English tree so priorities and changefreq stay language-agnostic. */
const canonicalRoute = (route) => route.replace(/^\/en(?=\/|$)/, "") || "/";

const PRIORITIES = (route) => {
  const r = canonicalRoute(route);
  if (r === "/") return "1.0";
  if (["/sistema", "/progetti", "/media", "/talent", "/clienti", "/chi-siamo", "/insight", "/instagram", "/contatti", "/lavora-con-noi"].includes(r)) return "0.9";
  if (r.startsWith("/servizi/")) return "0.8";
  if (r.startsWith("/progetti/")) return "0.7";
  if (r.startsWith("/media/")) return "0.7";
  if (r.startsWith("/clienti/")) return "0.6";
  if (r.startsWith("/talent/")) return "0.6";
  if (r.startsWith("/insight/")) return "0.6";
  return "0.3";
};

const CHANGEFREQ = (route) => {
  const r = canonicalRoute(route);
  if (r === "/" || r === "/insight") return "weekly";
  if (r === "/progetti" || r === "/media" || r === "/talent") return "weekly";
  if (r.startsWith("/insight/")) return "monthly";
  if (r === "/privacy" || r === "/cookie") return "yearly";
  return "monthly";
};

/**
 * L'HTML è già completo e indicizzabile: l'idratazione React non deve competere
 * con il primo paint. Il bundle viene caricato a pagina pronta, in idle.
 */
function deferHydration(html) {
  return html.replace(
    /<script type="module"([^>]*?)src="([^"]+)"([^>]*)><\/script>/,
    (_match, before, src, after) =>
      `<script>
      (function () {
        var file = ${JSON.stringify(src)};
        function boot() {
          var s = document.createElement("script");
          s.type = "module";${/crossorigin/.test(`${before} ${after}`) ? '\n          s.crossOrigin = "anonymous";' : ""}
          s.src = file;
          document.head.appendChild(s);
        }
        function idle() {
          if (window.requestIdleCallback) window.requestIdleCallback(boot, { timeout: 1500 });
          else setTimeout(boot, 200);
        }
        if (document.readyState === "complete") idle();
        else window.addEventListener("load", idle, { once: true });
      })();
    </script>`,
  );
}

async function main() {
  const template = await readFile(templatePath, "utf8");
  const { render, getHead, allPaths } = await import(pathToFileURL(serverEntry).href);

  const cleanTemplate = deferHydration(
    template.replace(/<!--seo-fallback-->[\s\S]*?<!--\/seo-fallback-->/g, ""),
  );

  let count = 0;
  for (const route of allPaths) {
    const appHtml = render(route);
    const head = getHead(route);
    const html = cleanTemplate
      .replace(/<html lang="[^"]*"/, `<html lang="${head.lang === "en" ? "en" : "it-IT"}"`)
      .replace("<!--app-head-->", headHtml(head, route))
      .replace("<!--app-html-->", appHtml);

    if (route === "/") {
      await writeFile(path.join(dist, "index.html"), html, "utf8");
    } else {
      const dir = path.join(dist, route.replace(/^\//, ""));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, "index.html"), html, "utf8");
      await writeFile(path.join(dist, `${route.replace(/^\//, "")}.html`), html, "utf8");
    }
    count += 1;
  }

  // 404 page
  const notFoundHtml = cleanTemplate
    .replace(/<html lang="[^"]*"/, '<html lang="it-IT"')
    .replace("<!--app-head-->", headHtml(getHead("/404"), "/404"))
    .replace("<!--app-html-->", render("/404"));
  await writeFile(path.join(dist, "404.html"), notFoundHtml, "utf8");

  // sitemap with hreflang alternates
  // The 404 is a state, not a page: it stays out of the sitemap.
  const urls = allPaths
    .filter((route) => !route.endsWith("/404"))
    .map((route) => {
      const head = getHead(route);
      const alt = head.alternates
        .map(
          (a) =>
            `\n    <xhtml:link rel="alternate" hreflang="${esc(a.hreflang)}" href="${esc(a.href)}" />`,
        )
        .join("");
      return `  <url>
    <loc>${base}${route === "/" ? "/" : route}</loc>${alt}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${CHANGEFREQ(route)}</changefreq>
    <priority>${PRIORITIES(route)}</priority>
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");

  const robots = `# Corax — https://corax.it
User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
Host: corax.it
`;
  await writeFile(path.join(dist, "robots.txt"), robots, "utf8");

  console.log(`✓ Prerendered ${count} routes + 404`);
  console.log(`✓ sitemap.xml (${allPaths.length - 1} URLs + hreflang), robots.txt`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
