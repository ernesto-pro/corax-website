import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getHead } from "../seo/head";
import { htmlLang, ogLocale } from "../i18n/lang";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = getHead(pathname);
    document.title = head.title;
    document.documentElement.lang = htmlLang[head.lang];
    document.documentElement.setAttribute("data-lang", head.lang);

    setMeta('meta[name="description"]', "name", "description", head.description);
    setMeta('meta[name="robots"]', "name", "robots", head.robots ?? "index, follow, max-image-preview:large");
    setMeta('meta[property="og:title"]', "property", "og:title", head.title);
    setMeta('meta[property="og:description"]', "property", "og:description", head.description);
    setMeta('meta[property="og:url"]', "property", "og:url", head.canonical || `${window.location.origin}${pathname}`);
    setMeta('meta[property="og:image"]', "property", "og:image", head.image);
    setMeta('meta[property="og:type"]', "property", "og:type", head.type);
    setMeta('meta[property="og:locale"]', "property", "og:locale", ogLocale[head.lang]);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", head.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", head.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", head.image);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!head.canonical) {
      canonical?.remove();
    } else {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = head.canonical;
    }

    // Replace hreflang annotations on client navigation.
    document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
    head.alternates.forEach((alt) => {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alt.hreflang;
      link.href = alt.href;
      document.head.appendChild(link);
    });

    let script = document.getElementById("corax-jsonld") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = "corax-jsonld";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": head.jsonLd });
  }, [pathname]);

  return null;
}
