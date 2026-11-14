import { coverThumb, type VelaSpace, type VelaUnit } from "../data/experience";
import type { Content, LocalizedProject } from "./content";
import type { Lang } from "./lang";

const angles = [
  Math.PI / 4,
  (3 * Math.PI) / 4,
  (5 * Math.PI) / 4,
  (7 * Math.PI) / 4,
];

const numbersIt = [
  { value: "02", label: "spazi a Milano" },
  { value: "700+ mq", label: "La Vela" },
  { value: "73", label: "persone" },
  { value: "250+", label: "progetti" },
  { value: "30 MLN+", label: "view PoretCast" },
  { value: "8 MLN", label: "fatturato 2025" },
];

const numbersEn = [
  { value: "02", label: "spaces in Milan" },
  { value: "700+ sqm", label: "La Vela" },
  { value: "73", label: "people" },
  { value: "250+", label: "projects" },
  { value: "30M+", label: "PoretCast views" },
  { value: "€8M", label: "2025 revenue" },
];

const spacesIt: VelaSpace[] = [
  {
    slug: "vela",
    index: "01",
    name: "La Vela",
    kicker: "Headquarters · Bodio Center",
    short: "Il quartier generale di Corax, sotto una vela bianca sospesa sul Bodio Center.",
    intro: [
      "La Vela è la sede principale di Corax, nel complesso del Bodio Center a Milano. Oltre 700 metri quadri, una terrazza e una tensostruttura bianca a forma di vela spiegata: un'architettura che rende riconoscibile il modo in cui lavoriamo.",
      "Qui si incontrano le quattro unit, la produzione e gli ospiti. È lo spazio in cui una campagna diventa un format, un format diventa una property e una property diventa un ecosistema.",
    ],
    accent: "#c8ff4d",
    metrics: [
      { value: "700+ mq", label: "superficie" },
      { value: "01", label: "terrazza" },
      { value: "Bodio", label: "Center" },
    ],
    facts: [
      { label: "Sede", value: "Headquarters" },
      { label: "Indirizzo", value: "Viale Bodio 29/37, Milano" },
      { label: "Superficie", value: "700+ metri quadri" },
      { label: "Struttura", value: "Tensostruttura a vela" },
    ],
    highlights: [
      {
        title: "Le quattro unit",
        text: "Agency, Media House, Talent e Tech lavorano nello stesso atrio.",
        href: "/sistema",
      },
      {
        title: "Produzione",
        text: "Set, sale e post-produzione: il lavoro prende forma dentro la Vela.",
        href: "/servizi/media-house",
      },
      {
        title: "La terrazza",
        text: "Lo spazio aperto che completa i 700 metri quadri del quartier generale.",
        href: "/contatti",
      },
      {
        title: "Vieni a trovarci",
        text: "La Vela è a Milano, nel Bodio Center, in Viale Bodio 29/37.",
        href: "/contatti",
      },
    ],
    links: [
      { label: "La nostra storia", href: "/chi-siamo" },
      { label: "Il sistema", href: "/sistema" },
      { label: "Parliamone", href: "/contatti" },
    ],
    image: "/img/covers/la-vela.jpg",
    imageAlt: "La sala riunioni della Vela, con un grande tavolo in legno e luce calda",
    imageLabel: "Dentro la Vela",
    camera: { position: [12.2, 7.6, 20.4], look: [-3.6, 3.6, 0.9] },
    scene: "vela",
  },
  {
    slug: "tempio",
    index: "02",
    name: "Il Tempio",
    kicker: "Editoriale & talent · Seconda sede",
    short: "Il secondo spazio di Corax, dedicato all'editoria, ai format e al talent management.",
    intro: [
      "Il Tempio è il secondo spazio di Corax. Nasce per espandere l'anima editoriale e il talent management dell'azienda: un luogo pensato per la creazione di nuovi media, format, palinsesti e contenuti per le community digitali.",
      "Non è una sede di rappresentanza: è un laboratorio. Qui si scrivono i programmi, si incontrano i talenti e si costruiscono i palinsesti che poi vivono sulle piattaforme.",
    ],
    accent: "#ff5a3c",
    metrics: [
      { value: "Format", label: "nuovi media" },
      { value: "Palinsesti", label: "editoria" },
      { value: "Community", label: "contenuti" },
    ],
    facts: [
      { label: "Funzione", value: "Seconda sede" },
      { label: "Focus", value: "Editoria e talent" },
      { label: "Attività", value: "Nuovi media, format, palinsesti" },
      { label: "Community", value: "Contenuti per le community digitali" },
    ],
    highlights: [
      {
        title: "Nuovi format",
        text: "Scrittura, sviluppo e prototipi dei programmi.",
        href: "/progetti",
      },
      {
        title: "Palinsesti",
        text: "La programmazione delle property e dei canali.",
        href: "/media",
      },
      {
        title: "Talent management",
        text: "Il roster, i percorsi e le partnership.",
        href: "/talent",
      },
      {
        title: "Community",
        text: "Contenuti costruiti per le community digitali.",
        href: "/instagram",
      },
    ],
    links: [
      { label: "Il roster", href: "/talent" },
      { label: "Le properties", href: "/media" },
      { label: "I casi", href: "/progetti" },
    ],
    image: "/img/tempio-3d.webp",
    imageAlt: "Visualizzazione 3D de Il Tempio, lo spazio editoriale di Corax",
    imageLabel: "Visualizzazione 3D",
    camera: { position: [16.6, 6.8, 16.0], look: [8.6, 2.6, 0.2] },
    scene: "tempio",
  },
];

const spacesEn: VelaSpace[] = [
  {
    slug: "vela",
    index: "01",
    name: "La Vela",
    kicker: "Headquarters · Bodio Center",
    short: "Corax's headquarters, under a white sail suspended over the Bodio Center.",
    intro: [
      "La Vela is Corax's main home, inside the Bodio Center complex in Milan. More than 700 square metres, a terrace and a white tensile roof shaped like an open sail: an architecture that makes the way we work recognisable.",
      "This is where the four units, production and guests meet. It is the space where a campaign becomes a format, a format becomes a property and a property becomes an ecosystem.",
    ],
    accent: "#c8ff4d",
    metrics: [
      { value: "700+ sqm", label: "floor area" },
      { value: "01", label: "terrace" },
      { value: "Bodio", label: "Center" },
    ],
    facts: [
      { label: "Home", value: "Headquarters" },
      { label: "Address", value: "Viale Bodio 29/37, Milan" },
      { label: "Floor area", value: "700+ square metres" },
      { label: "Structure", value: "Sail-shaped tensile roof" },
    ],
    highlights: [
      {
        title: "The four units",
        text: "Agency, Media House, Talent and Tech work in the same atrium.",
        href: "/sistema",
      },
      {
        title: "Production",
        text: "Sets, rooms and post-production: the work takes shape inside La Vela.",
        href: "/servizi/media-house",
      },
      {
        title: "The terrace",
        text: "The open-air space that completes the 700 square metres of the headquarters.",
        href: "/contatti",
      },
      {
        title: "Come and see us",
        text: "La Vela is in Milan, at the Bodio Center, Viale Bodio 29/37.",
        href: "/contatti",
      },
    ],
    links: [
      { label: "Our story", href: "/chi-siamo" },
      { label: "The system", href: "/sistema" },
      { label: "Let's talk", href: "/contatti" },
    ],
    image: "/img/covers/la-vela.jpg",
    imageAlt: "The La Vela meeting room, with a large wooden table and warm light",
    imageLabel: "Inside La Vela",
    camera: { position: [12.2, 7.6, 20.4], look: [-3.6, 3.6, 0.9] },
    scene: "vela",
  },
  {
    slug: "tempio",
    index: "02",
    name: "Il Tempio",
    kicker: "Editorial & talent · Second home",
    short: "Corax's second space, dedicated to publishing, formats and talent management.",
    intro: [
      "Il Tempio is Corax's second space. It exists to expand the company's editorial soul and talent management: a place built for creating new media, formats, schedules and content for digital communities.",
      "It is not a showcase office: it is a laboratory. Here shows are written, talent is met and schedules are built before they go live on the platforms.",
    ],
    accent: "#ff5a3c",
    metrics: [
      { value: "Format", label: "new media" },
      { value: "Schedules", label: "publishing" },
      { value: "Community", label: "content" },
    ],
    facts: [
      { label: "Role", value: "Second home" },
      { label: "Focus", value: "Publishing & talent" },
      { label: "Work", value: "New media, formats, schedules" },
      { label: "Community", value: "Content for digital communities" },
    ],
    highlights: [
      {
        title: "New formats",
        text: "Writing, development and prototypes for shows.",
        href: "/progetti",
      },
      {
        title: "Schedules",
        text: "Programming for properties and channels.",
        href: "/media",
      },
      {
        title: "Talent management",
        text: "The roster, careers and partnerships.",
        href: "/talent",
      },
      {
        title: "Community",
        text: "Content built for digital communities.",
        href: "/instagram",
      },
    ],
    links: [
      { label: "The roster", href: "/talent" },
      { label: "The properties", href: "/media" },
      { label: "The cases", href: "/progetti" },
    ],
    image: "/img/tempio-3d.webp",
    imageAlt: "3D visualisation of Il Tempio, Corax's editorial space",
    imageLabel: "3D visualisation",
    camera: { position: [16.6, 6.8, 16.0], look: [8.6, 2.6, 0.2] },
    scene: "tempio",
  },
];

export type VelaData = {
  units: VelaUnit[];
  spaces: VelaSpace[];
  roster: {
    slug: string;
    name: string;
    category: string;
    property?: string;
    note: string;
    featured: boolean;
  }[];
  numbers: { value: string; label: string }[];
  nodes: { slug: string; angle: number; accent: string }[];
};

/**
 * Build the 3D experience data from the already-localized content, so the
 * scene, the HUD and the SEO atlas always share one language.
 */
export function buildVela(
  content: Pick<Content, "units" | "services" | "projects" | "talents">,
  lang: Lang,
): VelaData {
  const units: VelaUnit[] = content.units.map((unit, index) => {
    const service = content.services.find((item) => item.slug === unit.slug);
    const cases = (service?.relatedProjects ?? [])
      .map((slug) => content.projects.find((project) => project.slug === slug))
      .filter((project): project is LocalizedProject => Boolean(project))
      .slice(0, 3)
      .map((project) => {
        const cover = project.cover ?? project.gallery[0]?.src ?? null;
        return {
          slug: project.slug,
          title: project.title,
          client: project.client,
          cover,
          thumb: coverThumb(cover),
          excerpt: project.excerpt,
        };
      });

    return {
      slug: unit.slug,
      index: unit.index,
      name: unit.name,
      kicker: unit.kicker,
      short: unit.short,
      accent: unit.accent,
      angle: angles[index] ?? 0,
      metrics: (service?.metrics ?? []).slice(0, 3),
      capabilities: (service?.capabilities ?? []).map((item) => ({
        title: item.title,
        text: item.text,
      })),
      cases,
      href: `/servizi/${unit.slug}`,
    };
  });

  const roster = content.talents.map((talent) => ({
    slug: talent.slug,
    name: talent.name,
    category: talent.categories[0],
    property: talent.property,
    note: talent.note,
    featured: Boolean(talent.featured),
  }));

  return {
    units,
    spaces: lang === "en" ? spacesEn : spacesIt,
    roster,
    numbers: lang === "en" ? numbersEn : numbersIt,
    nodes: units.map((unit) => ({
      slug: unit.slug,
      angle: unit.angle,
      accent: unit.accent,
    })),
  };
}
