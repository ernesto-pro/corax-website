import { coverThumb, type VelaUnit } from "../data/experience";
import type { Content, LocalizedProject } from "./content";
import type { Lang } from "./lang";

const angles = [
  Math.PI / 4,
  (3 * Math.PI) / 4,
  (5 * Math.PI) / 4,
  (7 * Math.PI) / 4,
];

const numbersIt = [
  { value: "1.500 mq", label: "spazi a Milano" },
  { value: "73", label: "persone" },
  { value: "4", label: "unit" },
  { value: "250+", label: "progetti" },
  { value: "30 MLN+", label: "view PoretCast" },
  { value: "8 MLN", label: "fatturato 2025" },
];

const numbersEn = [
  { value: "1,500 sqm", label: "of space in Milan" },
  { value: "73", label: "people" },
  { value: "4", label: "units" },
  { value: "250+", label: "projects" },
  { value: "30M+", label: "PoretCast views" },
  { value: "€8M", label: "2025 revenue" },
];

export type VelaData = {
  units: VelaUnit[];
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
    roster,
    numbers: lang === "en" ? numbersEn : numbersIt,
    nodes: units.map((unit) => ({
      slug: unit.slug,
      angle: unit.angle,
      accent: unit.accent,
    })),
  };
}
