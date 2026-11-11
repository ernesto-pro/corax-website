export const site = {
  name: "Corax",
  legalName: "Corax S.r.l.",
  claim: "Social Media Company",
  baseline: "Beyond the line.",
  url: "https://corax.it",
  locale: "it_IT",
  lang: "it",
  description:
    "Corax è la social media company italiana che unisce media, talenti, produzione e tecnologia. Podcast, format e branded entertainment dal 2020.",
  email: "info@corax.business",
  phone: "+39 02 0000 0000",
  vat: "IT10914740963",
  founded: "2020",
  address: {
    street: "Viale Bodio 29/37",
    locality: "Milano",
    region: "MI",
    postalCode: "20158",
    country: "IT",
    venue: "La Vela",
    full: "Viale Bodio 29/37 — La Vela, 20158 Milano",
    maps: "https://g.co/kgs/zkkpjS1",
  },
  socials: [
    { label: "Instagram", handle: "@coraxcompany", href: "https://www.instagram.com/coraxcompany/" },
    {
      label: "LinkedIn",
      handle: "Corax",
      href: "https://www.linkedin.com/company/corax-digital-media/",
    },
  ],
  video: {
    src: "/video/corax-loop.mp4",
    src720: "/video/corax-loop-720.mp4",
    src540: "/video/corax-loop-540.mp4",
    poster: "/img/poster.webp",
    duration: "00:24",
  },
  stats: {
    revenue2025: "8",
    growth2025: "+45%",
    target2026: "12",
    mediaViews: "30 MLN+",
    space: "1.500",
    formats: "20",
    people: "73",
    projects: "250+",
  },
} as const;

export const nav = [
  { label: "Sistema", href: "/sistema" },
  { label: "Progetti", href: "/progetti" },
  { label: "Properties", href: "/media" },
  { label: "Talent", href: "/talent" },
  { label: "Clienti", href: "/clienti" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Insight", href: "/insight" },
  { label: "Live", href: "/instagram" },
] as const;

export const units = [
  {
    slug: "agency",
    index: "01",
    name: "Agency",
    kicker: "Strategia, creatività, performance",
    short:
      "Un unico partner per social, influencer marketing e branded entertainment, dalla strategia alla misurazione.",
    accent: "#5b3df5",
  },
  {
    slug: "media-house",
    index: "02",
    name: "Media House",
    kicker: "Produzione e distribuzione",
    short:
      "Ideazione, produzione e distribuzione di format, podcast e contenuti pensati per ogni piattaforma.",
    accent: "#ff5a3c",
  },
  {
    slug: "talent",
    index: "03",
    name: "Talent",
    kicker: "Persone, non semplici profili",
    short:
      "Gestiamo e valorizziamo talenti, costruendo partnership che generano valore per i brand e per le persone.",
    accent: "#dedbf5",
  },
  {
    slug: "tech",
    index: "04",
    name: "Tech",
    kicker: "Infrastrutture per il racconto",
    short:
      "Piattaforme, siti, e-commerce e dashboard: la tecnologia che rende scalabile ogni progetto editoriale.",
    accent: "#c8ff4d",
  },
] as const;

export type Unit = (typeof units)[number];
