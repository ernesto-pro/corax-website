import { projects } from "./projects";
import { services } from "./services";
import { properties } from "./properties";
import { news } from "./news";
import { talents } from "./talents";
import { clientsProfiles } from "./clients";
import { localizePath } from "../i18n/routes";

export const staticPaths = [
  "/",
  "/sistema",
  "/progetti",
  "/media",
  "/talent",
  "/chi-siamo",
  "/clienti",
  "/insight",
  "/instagram",
  "/esperienza",
  "/contatti",
  "/lavora-con-noi",
  "/privacy",
  "/cookie",
  "/404",
] as const;

/** Italian content routes (404 handled separately by the prerenderer). */
export const contentPaths: string[] = [
  ...staticPaths.filter((p) => p !== "/404"),
  ...services.map((s) => `/servizi/${s.slug}`),
  ...projects.map((p) => `/progetti/${p.slug}`),
  ...properties.map((p) => `/media/${p.slug}`),
  ...news.map((n) => `/insight/${n.slug}`),
  ...talents.map((t) => `/talent/${t.slug}`),
  ...clientsProfiles.map((c) => `/clienti/${c.slug}`),
];

export const italianPaths: string[] = contentPaths;
export const englishPaths: string[] = contentPaths.map((path) => localizePath(path, "en"));

/**
 * Every localized URL that is prerendered and hydrated. `/404` is written as
 * `404.html`; the English 404 is a regular page under /en/404.
 */
export const allPaths: string[] = [...contentPaths, ...englishPaths, "/en/404"];

export type SearchItem = {
  label: string;
  hint: string;
  href: string;
  group: "Pagine" | "Progetti" | "Properties" | "Servizi" | "Clienti" | "Talent" | "Insight";
};

export const searchIndex: SearchItem[] = [
  { label: "Home", hint: "Corax — Social Media Company", href: "/", group: "Pagine" },
  { label: "Il sistema", hint: "Agency, Media House, Talent, Tech", href: "/sistema", group: "Pagine" },
  { label: "Corax Score", hint: "Test della crescita in 30 secondi", href: "/#growth-scan", group: "Pagine" },
  { label: "Progetti", hint: "Tutti i lavori e le campagne", href: "/progetti", group: "Pagine" },
  { label: "Properties", hint: "PoretCast, Immedia, A tu per tu, TTP", href: "/media", group: "Pagine" },
  { label: "Talent", hint: "Il roster Corax", href: "/talent", group: "Pagine" },
  { label: "Clienti", hint: "Brand, partner e collaborazioni", href: "/clienti", group: "Pagine" },
  { label: "Chi siamo", hint: "Storia, numeri, leadership", href: "/chi-siamo", group: "Pagine" },
  { label: "Insight", hint: "News e riconoscimenti", href: "/insight", group: "Pagine" },
  { label: "Live — Instagram e iniziative", hint: "Stories, feed e archivio", href: "/instagram", group: "Pagine" },
  { label: "Esperienza 3D — La Vela", hint: "Entra nell'atrio digitale di Corax", href: "/esperienza", group: "Pagine" },
  { label: "Contatti", hint: "Parliamone", href: "/contatti", group: "Pagine" },
  { label: "Lavora con noi", hint: "Persone e posizioni aperte", href: "/lavora-con-noi", group: "Pagine" },
  ...services.map((s) => ({
    label: s.name,
    hint: s.kicker,
    href: `/servizi/${s.slug}`,
    group: "Servizi" as const,
  })),
  ...projects.map((p) => ({
    label: p.title,
    hint: `${p.client} · ${p.year}`,
    href: `/progetti/${p.slug}`,
    group: "Progetti" as const,
  })),
  ...properties.map((p) => ({
    label: p.name,
    hint: `${p.type} · ${p.since}`,
    href: `/media/${p.slug}`,
    group: "Properties" as const,
  })),
  ...talents.map((t) => ({
    label: t.name,
    hint: t.categories.join(" · "),
    href: `/talent/${t.slug}`,
    group: "Talent" as const,
  })),
  ...clientsProfiles.map((c) => ({
    label: c.name,
    hint: `${c.sector} · dal ${c.since}`,
    href: `/clienti/${c.slug}`,
    group: "Clienti" as const,
  })),
  ...news.map((n) => ({
    label: n.title,
    hint: `${n.source} · ${n.displayDate}`,
    href: `/insight/${n.slug}`,
    group: "Insight" as const,
  })),
];
