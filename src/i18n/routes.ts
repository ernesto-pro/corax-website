import type { Lang } from "./lang";

/**
 * URL localization.
 *
 * Italian is the default language and lives at the root. English lives under
 * `/en` with translated section names, while detail slugs stay stable so a
 * project keeps one canonical identity in both languages.
 *
 *   /progetti/poretcast  <->  /en/projects/poretcast
 *   /chi-siamo           <->  /en/about
 */

const itToEn: Record<string, string> = {
  sistema: "system",
  servizi: "services",
  progetti: "projects",
  media: "media",
  talent: "talent",
  clienti: "clients",
  "chi-siamo": "about",
  insight: "insights",
  instagram: "instagram",
  esperienza: "experience",
  contatti: "contact",
  "lavora-con-noi": "careers",
  privacy: "privacy",
  cookie: "cookies",
};

const enToIt: Record<string, string> = Object.fromEntries(
  Object.entries(itToEn).map(([it, en]) => [en, it]),
);

const external = (value: string) =>
  /^(https?:|mailto:|tel:|#)/.test(value) || value.startsWith("//");

/** Split a path into pathname + hash, preserving the query string. */
function split(value: string) {
  const hashIndex = value.indexOf("#");
  const hash = hashIndex >= 0 ? value.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const queryIndex = withoutHash.indexOf("?");
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  return { pathname: pathname || "/", query, hash };
}

/** Remove a trailing slash and normalize an empty path. */
export function cleanPath(value: string): string {
  const { pathname, query, hash } = split(value);
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  return `${clean}${query}${hash}`;
}

export function langFromPath(value: string): Lang {
  const { pathname } = split(value);
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

/** Canonical Italian path for any localized path. */
export function itPathOf(value: string): string {
  const { pathname, query, hash } = split(value);
  if (pathname !== "/en" && !pathname.startsWith("/en/")) {
    return cleanPath(value);
  }

  const rest = pathname.replace(/^\/en\/?/, "");
  if (!rest) return `/${query}${hash}`;

  const segments = rest.split("/");
  const first = segments[0];
  segments[0] = enToIt[first] ?? first;
  return `/${segments.join("/")}${query}${hash}`;
}

/** Localized path for a canonical Italian path. */
export function localizePath(value: string, lang: Lang): string {
  if (external(value)) return value;

  const itPath = itPathOf(value);
  const { pathname, query, hash } = split(itPath);

  if (lang === "it") {
    return cleanPath(`${pathname}${query}${hash}`);
  }

  if (pathname === "/") return `/en${query}${hash}`;

  const segments = pathname.replace(/^\//, "").split("/");
  const first = segments[0];
  segments[0] = itToEn[first] ?? first;
  return `/en/${segments.join("/")}${query}${hash}`;
}

/** Equivalent paths for hreflang annotations. */
export function alternates(itPath: string) {
  const canonicalIt = itPathOf(itPath);
  return {
    it: canonicalIt,
    en: localizePath(canonicalIt, "en"),
    xDefault: canonicalIt,
  };
}

/** True when the path is under the English tree. */
export function isEnglishPath(value: string): boolean {
  const { pathname } = split(value);
  return pathname === "/en" || pathname.startsWith("/en/");
}
