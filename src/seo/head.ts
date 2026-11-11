import { site } from "../data/site";
import { instagramUrl } from "../data/talents";
import { contentFor } from "../i18n/content";
import { categoryLabel } from "../i18n/content";
import { langFromPath, itPathOf, localizePath, alternates } from "../i18n/routes";
import { htmlLang, ogLocale, type Lang } from "../i18n/lang";
import { metaEn, crumbEn } from "../i18n/en/meta";

export type HeadData = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: "website" | "article" | "profile";
  robots?: string;
  jsonLd: Record<string, unknown>[];
  breadcrumbs: { name: string; path: string }[];
  lang: Lang;
  alternates: { hreflang: string; href: string }[];
};

const BASE = site.url;
const DEFAULT_IMAGE = `${BASE}/img/og-cover.jpg`;

const clean = (path: string) => {
  const p = path.split("?")[0].split("#")[0];
  if (p.length > 1 && p.endsWith("/")) return p.slice(0, -1);
  return p || "/";
};

const abs = (src: string) => (src.startsWith("http") ? src : `${BASE}${src}`);

/** Italian labels for breadcrumbs and section names. */
const crumbIt: Record<string, string> = {
  "/": "Home",
  "/sistema": "Sistema",
  "/progetti": "Progetti",
  "/media": "Properties",
  "/talent": "Talent",
  "/clienti": "Clienti",
  "/chi-siamo": "Chi siamo",
  "/insight": "Insight",
  "/instagram": "Live",
  "/esperienza": "Esperienza 3D",
  "/contatti": "Contatti",
  "/lavora-con-noi": "Lavora con noi",
  "/privacy": "Privacy",
  "/cookie": "Cookie",
};

const crumbFor = (path: string, lang: Lang) =>
  lang === "en" ? crumbEn[path] ?? path : crumbIt[path] ?? path;

export function getHead(rawPath: string): HeadData {
  const lang = langFromPath(rawPath);
  const itPath = itPathOf(clean(rawPath));
  const path = localizePath(itPath, lang);
  const content = contentFor(lang);
  const t = {
    home: crumbFor("/", lang),
    sistema: crumbFor("/sistema", lang),
    progetti: crumbFor("/progetti", lang),
    media: crumbFor("/media", lang),
    talent: crumbFor("/talent", lang),
    clienti: crumbFor("/clienti", lang),
    insight: crumbFor("/insight", lang),
    contatti: crumbFor("/contatti", lang),
    lavoro: crumbFor("/lavora-con-noi", lang),
    privacy: crumbFor("/privacy", lang),
    cookie: crumbFor("/cookie", lang),
  };

  const organization = {
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "Corax",
    legalName: site.legalName,
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/img/logomark.png`,
      width: 300,
      height: 300,
    },
    image: DEFAULT_IMAGE,
    description: content.site.description,
    foundingDate: site.founded,
    founder: { "@type": "Person", name: "Enrico Bricchi", jobTitle: "CEO & Founder" },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    sameAs: site.socials.map((s) => s.href),
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 51, maxValue: 200 },
    award: "Il Sole 24 Ore — Leader della Crescita 2026",
    knowsAbout: [
      "Social media marketing",
      "Influencer marketing",
      "Branded entertainment",
      "Podcast production",
      "Talent management",
      "Content strategy",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "Corax — Social Media Company",
    inLanguage: htmlLang[lang],
    publisher: { "@id": `${BASE}/#organization` },
  };

  const breadcrumb = (items: { name: string; path: string }[]) => ({
    "@type": "BreadcrumbList",
    "@id": `${BASE}${items[items.length - 1]?.path || "/"}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${localizePath(item.path, lang)}`,
    })),
  });

  const crumbs: { name: string; path: string }[] = [{ name: t.home, path: "/" }];

  const base = (
    overrides: Partial<HeadData> & {
      title: string;
      description: string;
      jsonLd?: Record<string, unknown>[];
    },
  ): HeadData => {
    const allCrumbs = overrides.breadcrumbs ?? crumbs;
    const canonical = `${BASE}${path === "/" ? "/" : path}`;
    const known = itPath !== "/404";
    const alt = alternates(itPath);
    return {
      canonical,
      image: DEFAULT_IMAGE,
      type: "website",
      lang,
      alternates: known
        ? [
            { hreflang: "it-IT", href: `${BASE}${alt.it}` },
            { hreflang: "en", href: `${BASE}${alt.en}` },
            { hreflang: "x-default", href: `${BASE}${alt.xDefault}` },
          ]
        : [],
      jsonLd: [organization, website, breadcrumb(allCrumbs), ...(overrides.jsonLd ?? [])],
      breadcrumbs: allCrumbs,
      ...overrides,
    };
  };

  /** Static metadata, localized when English. */
  const staticMeta = (key: string, itTitle: string, itDescription: string) => {
    if (lang === "en") {
      const meta = metaEn[key];
      if (meta) return meta;
    }
    return { title: itTitle, description: itDescription };
  };

  if (itPath === "/") {
    const meta = staticMeta(
      "/",
      "Corax — Social Media Company | Media, Talent & Branded Entertainment",
      "Corax unisce media, talenti, produzione e tecnologia: podcast, format, influencer marketing e branded entertainment. 8 milioni di fatturato nel 2025, Leader della Crescita 2026.",
    );
    return base({
      ...meta,
      image: DEFAULT_IMAGE,
      jsonLd: [
        {
          "@type": "WebPage",
          "@id": `${BASE}/#webpage`,
          url: `${BASE}${path === "/" ? "/" : path}`,
          name: "Corax — Social Media Company",
          isPartOf: { "@id": `${BASE}/#website` },
          about: { "@id": `${BASE}/#organization` },
          inLanguage: htmlLang[lang],
        },
        {
          "@type": "VideoObject",
          name: "Corax — Showreel",
          description:
            lang === "en"
              ? "The reel that tells the Corax system: productions, formats, talent and campaigns."
              : "Il reel che racconta il sistema Corax: produzioni, format, talenti e campagne.",
          thumbnailUrl: [`${BASE}/img/poster.jpg`],
          uploadDate: "2024-01-01",
          contentUrl: `${BASE}${site.video.src}`,
          embedUrl: `${BASE}/`,
        },
        {
          "@type": "FAQPage",
          mainEntity: content.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  }

  if (itPath === "/sistema") {
    crumbs.push({ name: t.sistema, path: "/sistema" });
    return base({
      ...staticMeta(
        "/sistema",
        "Il sistema Corax — Agency, Media House, Talent, Tech",
        "Quattro unit, un unico sistema: agenzia social, media house, talent agency e tecnologia. Scopri come Corax costruisce ecosistemi di intrattenimento.",
      ),
      jsonLd: [
        {
          "@type": "ItemList",
          name: lang === "en" ? "The Corax units" : "Le unit di Corax",
          itemListElement: content.services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: s.name,
            url: `${BASE}${localizePath(`/servizi/${s.slug}`, lang)}`,
          })),
        },
      ],
    });
  }

  if (itPath === "/progetti") {
    crumbs.push({ name: t.progetti, path: "/progetti" });
    return base({
      ...staticMeta(
        "/progetti",
        "Progetti e campagne — Portfolio Corax",
        "Podcast, format, campagne e progetti digitali: il portfolio Corax tra branded entertainment, influencer marketing, produzione e tecnologia.",
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax projects" : "Progetti Corax",
          url: `${BASE}${path}`,
          hasPart: content.projects.map((p) => ({
            "@type": "CreativeWork",
            name: p.title,
            url: `${BASE}${localizePath(`/progetti/${p.slug}`, lang)}`,
          })),
        },
      ],
    });
  }

  const project = itPath.startsWith("/progetti/")
    ? content.projects.find((p) => p.slug === itPath.replace("/progetti/", ""))
    : undefined;
  if (project) {
    const clientLabel = project.client
      .replace(/\s*·\s*Corax$/, "")
      .replace(/^Corax\s*·\s*/, "")
      .trim();
    const hasClient = clientLabel.length > 0 && clientLabel !== "Corax";
    crumbs.push({ name: t.progetti, path: "/progetti" }, { name: project.title, path: itPath });
    return base({
      title: hasClient
        ? `${project.title} — ${clientLabel} | Corax`
        : `${project.title} | Corax`,
      description: `${hasClient ? `${project.title} ${lang === "en" ? "for" : "per"} ${clientLabel}` : project.title}: ${project.excerpt}`.slice(0, 158),
      image: project.cover ? abs(project.cover) : DEFAULT_IMAGE,
      type: "article",
      jsonLd: [
        {
          "@type": "CreativeWork",
          name: project.title,
          headline: project.title,
          description: project.excerpt,
          url: `${BASE}${path}`,
          image: project.cover ? abs(project.cover) : DEFAULT_IMAGE,
          creator: { "@id": `${BASE}/#organization` },
          about: project.tags,
          datePublished: project.year.split(" ")[0],
          genre: project.categories,
          keywords: project.tags.join(", "),
        },
      ],
    });
  }

  if (itPath === "/media") {
    crumbs.push({ name: t.media, path: "/media" });
    return base({
      ...staticMeta(
        "/media",
        "Properties — PoretCast, Immedia, A tu per tu, TTP",
        "Le proprietà editoriali di Corax: il PoretCast di Giacomo Poretti, Immedia, il canale FAST A tu per tu, TTP e la piattaforma Influenceritalia.",
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax properties" : "Properties Corax",
          url: `${BASE}${path}`,
          hasPart: content.properties.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: `${BASE}${localizePath(`/media/${p.slug}`, lang)}`,
          })),
        },
      ],
    });
  }

  const property = itPath.startsWith("/media/")
    ? content.properties.find((p) => p.slug === itPath.replace("/media/", ""))
    : undefined;
  if (property) {
    crumbs.push({ name: t.media, path: "/media" }, { name: property.name, path: itPath });
    return base({
      title: `${property.name} — ${property.type} | Corax`,
      description: property.excerpt.slice(0, 158),
      image: property.cover ? abs(property.cover) : DEFAULT_IMAGE,
      type: "article",
      jsonLd: [
        {
          "@type": "CreativeWorkSeries",
          name: property.name,
          description: property.excerpt,
          url: `${BASE}${path}`,
          startDate: property.since,
          creator: { "@id": `${BASE}/#organization` },
          genre: property.tags,
          image: property.cover ? abs(property.cover) : DEFAULT_IMAGE,
        },
      ],
    });
  }

  const service = itPath.startsWith("/servizi/")
    ? content.services.find((s) => s.slug === itPath.replace("/servizi/", ""))
    : undefined;
  if (service) {
    crumbs.push({ name: t.sistema, path: "/sistema" }, { name: service.name, path: itPath });
    return base({
      title: `${service.name} — ${service.kicker} | Corax`,
      description: service.excerpt.slice(0, 158),
      jsonLd: [
        {
          "@type": "Service",
          name: service.name,
          serviceType: service.kicker,
          description: service.intro,
          url: `${BASE}${path}`,
          provider: { "@id": `${BASE}/#organization` },
          areaServed: { "@type": "Country", name: lang === "en" ? "Italy" : "Italia" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: service.name,
            itemListElement: service.capabilities.map((c) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: c.title, description: c.text },
            })),
          },
        },
        {
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        },
      ],
    });
  }

  if (itPath === "/talent") {
    crumbs.push({ name: t.talent, path: "/talent" });
    return base({
      ...staticMeta(
        "/talent",
        "Talent — Il roster Corax",
        "Entertainment, comedy, food, lifestyle, green e sport: il roster di talenti e creator gestito da Corax.",
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax roster" : "Roster Corax",
          url: `${BASE}${path}`,
        },
      ],
    });
  }

  const talent = itPath.startsWith("/talent/")
    ? content.talents.find((t0) => t0.slug === itPath.replace("/talent/", ""))
    : undefined;
  if (talent) {
    crumbs.push({ name: t.talent, path: "/talent" }, { name: talent.name, path: itPath });
    return base({
      title: `${talent.name} — ${lang === "en" ? "Corax Talent" : "Talent Corax"}`,
      description: talent.note.slice(0, 158),
      type: "profile",
      jsonLd: [
        {
          "@type": "Person",
          name: talent.name,
          description: talent.note,
          url: `${BASE}${path}`,
          sameAs: [
            instagramUrl(talent.instagram),
            ...(talent.youtube ? [talent.youtube.url] : []),
          ],
          worksFor: { "@id": `${BASE}/#organization` },
          knowsAbout: talent.categories,
        },
      ],
    });
  }

  if (itPath === "/clienti") {
    crumbs.push({ name: t.clienti, path: "/clienti" });
    return base({
      ...staticMeta(
        "/clienti",
        "Clienti e brand partner — Corax",
        "I brand e i partner che hanno scelto Corax: campagne, format, influencer marketing e properties. Profili, progetti e collaborazioni raccontate una per una.",
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax clients" : "Clienti Corax",
          url: `${BASE}${path}`,
          hasPart: content.clients.map((c) => ({
            "@type": "Organization",
            name: c.name,
            url: `${BASE}${localizePath(`/clienti/${c.slug}`, lang)}`,
          })),
        },
      ],
    });
  }

  const client = itPath.startsWith("/clienti/")
    ? content.clients.find((c) => c.slug === itPath.replace("/clienti/", ""))
    : undefined;
  if (client) {
    crumbs.push({ name: t.clienti, path: "/clienti" }, { name: client.name, path: itPath });
    return base({
      title:
        lang === "en" ? `${client.name} — Corax client` : `${client.name} — Cliente Corax`,
      description: client.summary.slice(0, 158),
      type: "profile",
      jsonLd: [
        {
          "@type": "AboutPage",
          name: lang === "en" ? `${client.name} — Corax client` : `${client.name} — Cliente Corax`,
          url: `${BASE}${path}`,
          about: {
            "@type": "Organization",
            name: client.name,
            description: client.summary,
          },
          mentions: client.projects
            .map((s) => content.projects.find((p) => p.slug === s))
            .filter(Boolean)
            .map((p) => ({
              "@type": "CreativeWork",
              name: p!.title,
              url: `${BASE}${localizePath(`/progetti/${p!.slug}`, lang)}`,
            })),
        },
      ],
    });
  }

  if (itPath === "/chi-siamo") {
    crumbs.push({ name: t.home, path: "/" }, { name: crumbFor("/chi-siamo", lang), path: "/chi-siamo" });
    return base({
      ...staticMeta(
        "/chi-siamo",
        "Chi siamo — Corax, social media company dal 2020",
        "La storia di Corax: da startup milanese a sistema integrato con 8 milioni di fatturato, 73 persone e l'obiettivo di 12 milioni nel 2026. Leadership, numeri, visione.",
      ),
      jsonLd: [
        {
          "@type": "AboutPage",
          name: lang === "en" ? "About — Corax" : "Chi siamo — Corax",
          url: `${BASE}${path}`,
          about: { "@id": `${BASE}/#organization` },
        },
      ],
    });
  }

  if (itPath === "/insight") {
    crumbs.push({ name: t.insight, path: "/insight" });
    return base({
      ...staticMeta(
        "/insight",
        "Insight — News, campagne e riconoscimenti | Corax",
        "Le notizie di Corax: crescita, campagne, properties e riconoscimenti raccontati dalla stampa e dal team.",
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax insights" : "Insight Corax",
          url: `${BASE}${path}`,
        },
      ],
    });
  }

  const article = itPath.startsWith("/insight/")
    ? content.news.find((n) => n.slug === itPath.replace("/insight/", ""))
    : undefined;
  if (article) {
    crumbs.push({ name: t.insight, path: "/insight" }, { name: article.title, path: itPath });
    return base({
      title: `${article.metaTitle ?? article.title} | Corax`,
      description: article.excerpt.slice(0, 158),
      type: "article",
      jsonLd: [
        {
          "@type": "NewsArticle",
          headline: article.title,
          description: article.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          inLanguage: htmlLang[lang],
          articleSection:
            lang === "en" ? categoryLabel[article.category] ?? article.category : article.category,
          url: `${BASE}${path}`,
          publisher: { "@id": `${BASE}/#organization` },
          mainEntityOfPage: `${BASE}${path}`,
        },
      ],
    });
  }

  if (itPath === "/instagram") {
    crumbs.push({ name: crumbFor("/instagram", lang), path: "/instagram" });
    return base({
      ...staticMeta(
        "/instagram",
        "Instagram Corax — Il quartier generale del sistema",
        `Stories, feed e ${content.initiatives.length} iniziative: ogni contenuto Corax apre un caso portfolio. Campagne, properties, talenti e premi raccontati mentre succedono.`,
      ),
      jsonLd: [
        {
          "@type": "CollectionPage",
          name: lang === "en" ? "Corax Live — Instagram and initiatives" : "Corax Live — Instagram e iniziative",
          url: `${BASE}${path}`,
          isPartOf: { "@id": `${BASE}/#website` },
          about: { "@id": `${BASE}/#organization` },
          sameAs: "https://www.instagram.com/coraxcompany/",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: content.initiatives.length,
            itemListElement: content.initiatives.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.title,
              url: `${BASE}${localizePath("/instagram", lang)}`,
            })),
          },
        },
      ],
    });
  }

  if (itPath === "/esperienza") {
    crumbs.push({ name: crumbFor("/esperienza", lang), path: "/esperienza" });
    return base({
      ...staticMeta(
        "/esperienza",
        "Esperienza 3D — Entra nella Vela | Corax",
        `L'atrio digitale di Corax: quattro unit, ${content.vela.roster.length} talenti e tutti i casi in una scena 3D navigabile. Entra nella Vela e guarda il sistema da dentro.`,
      ),
      jsonLd: [
        {
          "@type": "WebPage",
          "@id": `${BASE}${path}#webpage`,
          url: `${BASE}${path}`,
          name: lang === "en" ? "3D Experience — La Vela by Corax" : "Esperienza 3D — La Vela di Corax",
          description:
            lang === "en"
              ? "Interactive three-dimensional scene with the four Corax units, the roster and portfolio cases."
              : "Scena tridimensionale interattiva con le quattro unit di Corax, il roster e i casi portfolio.",
          isPartOf: { "@id": `${BASE}/#website` },
          about: { "@id": `${BASE}/#organization` },
          inLanguage: htmlLang[lang],
          mainEntity: {
            "@type": "ItemList",
            name: lang === "en" ? "The islands of La Vela" : "Le isole della Vela",
            numberOfItems: content.vela.units.length,
            itemListElement: content.vela.units.map((unit, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: unit.name,
              description: unit.kicker,
              url: `${BASE}${localizePath(unit.href, lang)}`,
            })),
          },
          mentions: content.vela.roster.slice(0, 16).map((talent0) => ({
            "@type": "Person",
            name: talent0.name,
            url: `${BASE}${localizePath(`/talent/${talent0.slug}`, lang)}`,
          })),
        },
      ],
    });
  }

  if (itPath === "/contatti") {
    crumbs.push({ name: t.contatti, path: "/contatti" });
    return base({
      ...staticMeta(
        "/contatti",
        "Contatti — Parliamo del tuo prossimo progetto | Corax",
        "Scrivici per campagne, produzioni, talent e partnership. Corax è a Milano, Viale Bodio 29/37 — La Vela.",
      ),
      jsonLd: [
        {
          "@type": "ContactPage",
          name: lang === "en" ? "Corax contact" : "Contatti Corax",
          url: `${BASE}${path}`,
          about: { "@id": `${BASE}/#organization` },
        },
      ],
    });
  }

  if (itPath === "/lavora-con-noi") {
    crumbs.push({ name: t.lavoro, path: "/lavora-con-noi" });
    return base({
      ...staticMeta(
        "/lavora-con-noi",
        "Lavora con noi — Persone, prima dei profili | Corax",
        "Entra nel sistema Corax: posizioni aperte, candidature spontanee e collaborazioni con talenti e creator.",
      ),
    });
  }

  if (itPath === "/privacy") {
    crumbs.push({ name: t.privacy, path: "/privacy" });
    return base({
      ...staticMeta(
        "/privacy",
        "Privacy Policy | Corax",
        "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) — Corax S.r.l.",
      ),
      robots: "noindex, follow",
    });
  }

  if (itPath === "/cookie") {
    crumbs.push({ name: t.cookie, path: "/cookie" });
    return base({
      ...staticMeta(
        "/cookie",
        "Cookie Policy | Corax",
        "Informativa sull'uso dei cookie e delle tecnologie di tracciamento — Corax S.r.l.",
      ),
      robots: "noindex, follow",
    });
  }

  // A 404 has no canonical URL: it is a state, not a page.
  return base({
    ...staticMeta(
      "/404",
      "Pagina non trovata | Corax",
      "La pagina che cerchi non esiste o è stata spostata. Torna alla home di Corax.",
    ),
    canonical: "",
    robots: "noindex, follow",
  });
}

export const ogLocaleFor = ogLocale;
