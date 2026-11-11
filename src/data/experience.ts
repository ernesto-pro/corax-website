import { units } from "./site";
import { getService } from "./services";
import { getProject } from "./projects";
import { talents } from "./talents";

export type VelaMetric = { value: string; label: string };

export type VelaCase = {
  slug: string;
  title: string;
  client: string;
  cover: string | null;
  thumb: string | null;
  excerpt: string;
};

export type VelaUnit = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  short: string;
  accent: string;
  angle: number;
  metrics: VelaMetric[];
  capabilities: { title: string; text: string }[];
  cases: VelaCase[];
  href: string;
};

const angles = [
  Math.PI / 4,
  (3 * Math.PI) / 4,
  (5 * Math.PI) / 4,
  (7 * Math.PI) / 4,
];

/** Small WebP thumbs (320px) generated in public/img/covers/thumbs. */
export function coverThumb(cover: string | null): string | null {
  if (!cover) return null;
  const match = cover.match(/^\/img\/covers\/(.+)\.(?:jpe?g|png)$/i);
  return match ? `/img/covers/thumbs/${match[1]}.webp` : cover;
}

export const velaUnits: VelaUnit[] = units.map((unit, index) => {
  const service = getService(unit.slug);
  const cases = (service?.relatedProjects ?? [])
    .map((slug) => getProject(slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project))
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

export const velaRoster = talents.map((talent) => ({
  slug: talent.slug,
  name: talent.name,
  category: talent.categories[0],
  property: talent.property,
  note: talent.note,
  featured: Boolean(talent.featured),
}));

export const velaNumbers = [
  { value: "1.500 mq", label: "spazi a Milano" },
  { value: "73", label: "persone" },
  { value: "4", label: "unit" },
  { value: "250+", label: "progetti" },
  { value: "30 MLN+", label: "view PoretCast" },
  { value: "8 MLN", label: "fatturato 2025" },
];

export const velaSceneNodes = velaUnits.map((unit) => ({
  slug: unit.slug,
  angle: unit.angle,
  accent: unit.accent,
}));

export const getVelaUnit = (slug: string) =>
  velaUnits.find((unit) => unit.slug === slug);
