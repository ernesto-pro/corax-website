import type { Lang } from "./lang";
import { site, units } from "../data/site";
import { projects } from "../data/projects";
import { services } from "../data/services";
import { properties } from "../data/properties";
import { talents } from "../data/talents";
import { clientsProfiles } from "../data/clients";
import { news, type NewsItem } from "../data/news";
import {
  instaFeed,
  initiatives,
  stories,
  type Initiative,
  type InstaPost,
  type Story,
} from "../data/instagram";
import { faqs } from "../data/faqs";
import { team, timeline, values } from "../data/company";
import {
  scanFocuses,
  scanLevels,
  scanQuestions,
  type ScanFocus,
  type ScanFocusProfile,
  type ScanLevel,
  type ScanQuestion,
} from "../data/growthScan";
import { projectsTr } from "./en/projects";
import { servicesTr } from "./en/services";
import { propertiesTr } from "./en/properties";
import { talentsTr } from "./en/talents";
import { clientsTr } from "./en/clients";
import { newsTr } from "./en/news";
import { storiesTr, postsTr, initiativesTr } from "./en/instagram";
import { faqsTr } from "./en/faqs";
import { companyTr } from "./en/company";
import { scanTr } from "./en/scan";
import { siteTr } from "./en/site";
import { buildVela, type VelaData } from "./experience";

export type LocalizedProject = (typeof projects)[number];
export type LocalizedService = (typeof services)[number];
export type LocalizedProperty = (typeof properties)[number];
export type LocalizedTalent = (typeof talents)[number];
export type LocalizedClient = (typeof clientsProfiles)[number];
export type LocalizedNews = NewsItem;

export type Content = {
  site: Omit<typeof site, "description"> & { description: string };
  units: { slug: string; index: string; name: string; kicker: string; short: string; accent: string }[];
  projects: LocalizedProject[];
  services: LocalizedService[];
  properties: LocalizedProperty[];
  talents: LocalizedTalent[];
  clients: LocalizedClient[];
  news: LocalizedNews[];
  stories: Story[];
  instaFeed: InstaPost[];
  initiatives: Initiative[];
  faqs: { q: string; a: string }[];
  company: {
    team: { name: string; role: string; bio: string; initials: string }[];
    timeline: { year: string; title: string; text: string }[];
    values: { title: string; text: string }[];
  };
  scan: {
    questions: ScanQuestion[];
    levels: ScanLevel[];
    focuses: Record<ScanFocus, ScanFocusProfile>;
  };
  vela: VelaData;
};

/** Labels that stay enum-like in the data but need an English display value. */
export const categoryLabel: Record<string, string> = {
  Azienda: "Company",
  Campagne: "Campaigns",
  Media: "Media",
  Talent: "Talent",
  Premi: "Awards",
  Instagram: "Instagram",
  Produzione: "Production",
};

export const postTypeLabel: Record<string, string> = {
  Post: "Post",
  Reel: "Reel",
  Carosello: "Carousel",
};

const cache: Partial<Record<Lang, Content>> = {};

/** Format Italian numeric units for English readers ("1.500 mq" → "1,500 sqm"). */
function enUnits(value: string) {
  return value
    .replace(/(\d)\.(\d{3})/g, "$1,$2")
    .replace(/\bMLN\b/g, "M")
    .replace(/\bmq\b/g, "sqm");
}

function buildEnglish(): Content {
  const content: Content = {
    site: { ...site, description: siteTr.description },
    units: units.map((unit, index) => {
      const tr = siteTr.units[index];
      return tr ? { ...unit, kicker: tr.kicker, short: tr.short } : unit;
    }),
    projects: projects.map((project) => {
      const tr = projectsTr[project.slug];
      return tr ? { ...project, ...tr } : project;
    }),
    services: services.map((service) => {
      const tr = servicesTr[service.slug];
      if (!tr) return service;
      return {
        ...service,
        ...tr,
        metrics: (tr.metrics ?? service.metrics.map((m) => ({ ...m, value: enUnits(m.value) }))).map(
          (metric) => ({ ...metric, value: enUnits(metric.value) }),
        ),
      };
    }),
    properties: properties.map((property) => {
      const tr = propertiesTr[property.slug];
      if (!tr) return property;
      return {
        ...property,
        ...tr,
        stats: (tr.stats ?? property.stats.map((s) => ({ ...s, value: enUnits(s.value) }))).map(
          (stat) => ({ ...stat, value: enUnits(stat.value) }),
        ),
      };
    }),
    talents: talents.map((talent) => {
      const tr = talentsTr[talent.slug];
      return tr ? { ...talent, ...tr } : talent;
    }),
    clients: clientsProfiles.map((client) => {
      const tr = clientsTr[client.slug];
      return tr ? { ...client, ...tr } : client;
    }),
    news: news.map((item) => {
      const tr = newsTr[item.slug];
      return tr ? { ...item, ...tr } : item;
    }),
    stories: stories.map((story) => {
      const tr = storiesTr[story.id];
      if (!tr) return story;
      return {
        ...story,
        label: tr.label ?? story.label,
        coverAlt: tr.coverAlt ?? story.coverAlt,
        slides: story.slides.map((slide, index) => {
          const slideTr = tr.slides?.[index];
          if (!slideTr) return slide;
          return {
            ...slide,
            alt: slideTr.alt ?? slide.alt,
            kicker: slideTr.kicker ?? slide.kicker,
            title: slideTr.title ?? slide.title,
            text: slideTr.text ?? slide.text,
            cta: slide.cta
              ? { ...slide.cta, label: slideTr.cta?.label ?? slide.cta.label }
              : slide.cta,
          };
        }),
      };
    }),
    instaFeed: instaFeed.map((post) => {
      const tr = postsTr[post.id];
      return tr ? { ...post, ...tr } : post;
    }),
    initiatives: initiatives.map((item, index) => {
      const tr = initiativesTr[index];
      return tr ? { ...item, ...tr } : item;
    }),
    faqs: faqs.map((item, index) => faqsTr[index] ?? item),
    company: {
      team: team.map((member, index) => {
        const tr = companyTr.team?.[index];
        return tr ? { ...member, bio: tr.bio } : member;
      }),
      timeline: timeline.map((item, index) => {
        const tr = companyTr.timeline?.[index];
        return tr ? { ...item, title: tr.title, text: tr.text } : item;
      }),
      values: values.map((item, index) => {
        const tr = companyTr.values?.[index];
        return tr ? { ...item, title: tr.title, text: tr.text } : item;
      }),
    },
    scan: {
      questions: scanQuestions.map((question, index) => {
        const tr = scanTr.questions?.[index];
        if (!tr) return question;
        return {
          ...question,
          kicker: tr.kicker,
          title: tr.title,
          options: question.options.map((option, optionIndex) => {
            const optionTr = tr.options[optionIndex];
            return optionTr ? { ...option, label: optionTr.label, detail: optionTr.detail } : option;
          }),
        };
      }),
      levels: scanLevels.map((level, index) => {
        const tr = scanTr.levels?.[index];
        return tr ? { ...level, ...tr } : level;
      }),
      focuses: {
        agency: mergeFocus("agency"),
        "media-house": mergeFocus("media-house"),
        talent: mergeFocus("talent"),
        tech: mergeFocus("tech"),
      },
    },
    vela: { units: [], roster: [], numbers: [], nodes: [] },
  };
  content.vela = buildVela(content, "en");
  return content;
}

function mergeFocus(slug: ScanFocus): ScanFocusProfile {
  const base = scanFocuses[slug];
  const tr = scanTr.focuses?.[slug];
  return tr ? { ...base, promise: tr.promise, moves: tr.moves } : base;
}

export function contentFor(lang: Lang): Content {
  if (lang === "it") {
    const cached = cache.it;
    if (cached) return cached;
    const content: Content = {
      site,
      units: [...units],
      projects,
      services,
      properties,
      talents,
      clients: clientsProfiles,
      news,
      stories,
      instaFeed,
      initiatives,
      faqs,
      company: { team, timeline, values },
      scan: { questions: scanQuestions, levels: scanLevels, focuses: scanFocuses },
      vela: { units: [], roster: [], numbers: [], nodes: [] },
    };
    content.vela = buildVela(content, "it");
    cache.it = content;
    return content;
  }

  const cached = cache.en;
  if (cached) return cached;
  const content = buildEnglish();
  cache.en = content;
  return content;
}

export const getLocalizedProject = (slug: string, lang: Lang) =>
  contentFor(lang).projects.find((project) => project.slug === slug);

export const getLocalizedService = (slug: string, lang: Lang) =>
  contentFor(lang).services.find((service) => service.slug === slug);

export const getLocalizedProperty = (slug: string, lang: Lang) =>
  contentFor(lang).properties.find((property) => property.slug === slug);

export const getLocalizedTalent = (slug: string, lang: Lang) =>
  contentFor(lang).talents.find((talent) => talent.slug === slug);

export const getLocalizedClient = (slug: string, lang: Lang) =>
  contentFor(lang).clients.find((client) => client.slug === slug);

export const getLocalizedNews = (slug: string, lang: Lang) =>
  contentFor(lang).news.find((item) => item.slug === slug);
