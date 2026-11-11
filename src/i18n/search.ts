import type { Lang } from "./lang";
import type { SearchItem } from "../data/routes";
import { localizePath } from "./routes";
import { contentFor } from "./content";

type PageEntry = { label: string; hint: string; path: string };

export const searchPages: Record<Lang, PageEntry[]> = {
  it: [
    { label: "Home", hint: "Corax — Social Media Company", path: "/" },
    { label: "Il sistema", hint: "Agency, Media House, Talent, Tech", path: "/sistema" },
    { label: "Corax Score", hint: "Test della crescita in 30 secondi", path: "/#growth-scan" },
    { label: "Progetti", hint: "Tutti i lavori e le campagne", path: "/progetti" },
    { label: "Properties", hint: "PoretCast, Immedia, A tu per tu, TTP", path: "/media" },
    { label: "Talent", hint: "Il roster Corax", path: "/talent" },
    { label: "Clienti", hint: "Brand, partner e collaborazioni", path: "/clienti" },
    { label: "Chi siamo", hint: "Storia, numeri, leadership", path: "/chi-siamo" },
    { label: "Insight", hint: "News e riconoscimenti", path: "/insight" },
    {
      label: "Live — Instagram e iniziative",
      hint: "Stories, feed e archivio",
      path: "/instagram",
    },
    {
      label: "Esperienza 3D — La Vela",
      hint: "Entra nell'atrio digitale di Corax",
      path: "/esperienza",
    },
    { label: "Contatti", hint: "Parliamone", path: "/contatti" },
    { label: "Lavora con noi", hint: "Persone e posizioni aperte", path: "/lavora-con-noi" },
  ],
  en: [
    { label: "Home", hint: "Corax — Social Media Company", path: "/" },
    { label: "The system", hint: "Agency, Media House, Talent, Tech", path: "/sistema" },
    { label: "Corax Score", hint: "The 30-second growth test", path: "/#growth-scan" },
    { label: "Projects", hint: "All work and campaigns", path: "/progetti" },
    { label: "Properties", hint: "PoretCast, Immedia, A tu per tu, TTP", path: "/media" },
    { label: "Talent", hint: "The Corax roster", path: "/talent" },
    { label: "Clients", hint: "Brands, partners and collaborations", path: "/clienti" },
    { label: "About", hint: "Story, numbers, leadership", path: "/chi-siamo" },
    { label: "Insights", hint: "News and awards", path: "/insight" },
    { label: "Live — Instagram and initiatives", hint: "Stories, feed and archive", path: "/instagram" },
    {
      label: "3D Experience — La Vela",
      hint: "Enter Corax's digital atrium",
      path: "/esperienza",
    },
    { label: "Contact", hint: "Let's talk", path: "/contatti" },
    { label: "Careers", hint: "People and open positions", path: "/lavora-con-noi" },
  ],
};

/** Language-aware search index used by the command palette. */
export function searchIndexFor(lang: Lang): SearchItem[] {
  const content = contentFor(lang);
  const localize = (path: string) => localizePath(path, lang);
  const pages = searchPages[lang].map((entry) => ({
    label: entry.label,
    hint: entry.hint,
    href: localize(entry.path),
    group: "Pagine" as const,
  }));

  return [
    ...pages,
    ...content.services.map((service) => ({
      label: service.name,
      hint: service.kicker,
      href: localize(`/servizi/${service.slug}`),
      group: "Servizi" as const,
    })),
    ...content.projects.map((project) => ({
      label: project.title,
      hint: `${project.client} · ${project.year}`,
      href: localize(`/progetti/${project.slug}`),
      group: "Progetti" as const,
    })),
    ...content.properties.map((property) => ({
      label: property.name,
      hint: `${property.type} · ${property.since}`,
      href: localize(`/media/${property.slug}`),
      group: "Properties" as const,
    })),
    ...content.talents.map((talent) => ({
      label: talent.name,
      hint: talent.categories.join(" · "),
      href: localize(`/talent/${talent.slug}`),
      group: "Talent" as const,
    })),
    ...content.clients.map((client) => ({
      label: client.name,
      hint: `${client.sector} · ${lang === "it" ? "dal" : "since"} ${client.since}`,
      href: localize(`/clienti/${client.slug}`),
      group: "Clienti" as const,
    })),
    ...content.news.map((item) => ({
      label: item.title,
      hint: `${item.source} · ${item.displayDate}`,
      href: localize(`/insight/${item.slug}`),
      group: "Insight" as const,
    })),
  ];
}
