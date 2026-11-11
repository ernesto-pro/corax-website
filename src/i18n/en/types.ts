import type { Project } from "../../data/projects";
import type { Service } from "../../data/services";
import type { Property } from "../../data/properties";
import type { Talent } from "../../data/talents";
import type { Client } from "../../data/clients";
import type { NewsItem } from "../../data/news";
import type { InstaPost, Initiative, Story } from "../../data/instagram";
import type { ScanFocus, ScanFocusProfile, ScanLevel, ScanQuestion } from "../../data/growthScan";

/** Partial translations merged over the Italian source of truth. */
export type ProjectTr = Partial<
  Pick<
    Project,
    | "title"
    | "excerpt"
    | "intro"
    | "challenge"
    | "approach"
    | "deliverables"
    | "results"
    | "gallery"
    | "quote"
    | "tags"
    | "coverAlt"
    | "categories"
    | "year"
  >
>;

export type ServiceTr = Partial<
  Pick<
    Service,
    | "kicker"
    | "title"
    | "excerpt"
    | "intro"
    | "capabilities"
    | "process"
    | "faqs"
    | "metrics"
    | "keywords"
  >
>;

export type PropertyTr = Partial<
  Pick<
    Property,
    | "type"
    | "claim"
    | "partners"
    | "excerpt"
    | "intro"
    | "body"
    | "coverAlt"
    | "stats"
    | "highlights"
    | "tags"
  >
>;

export type TalentTr = Partial<Pick<Talent, "note" | "property">>;

export type ClientTr = Partial<
  Pick<Client, "sector" | "summary" | "intro" | "services" | "facts">
>;

export type NewsTr = Partial<
  Pick<NewsItem, "title" | "metaTitle" | "displayDate" | "excerpt" | "body">
>;

export type StoryTr = {
  label?: string;
  coverAlt?: string;
  slides?: { alt?: string; kicker?: string; title?: string; text?: string; cta?: { label?: string } }[];
};

export type PostTr = Partial<Pick<InstaPost, "alt" | "caption">>;
export type InitiativeTr = Partial<Pick<Initiative, "title" | "summary">>;

export type FaqTr = { q: string; a: string };

export type CompanyTr = {
  team?: { bio: string }[];
  timeline?: { title: string; text: string }[];
  values?: { title: string; text: string }[];
};

export type ScanTr = {
  questions?: { kicker: string; title: string; options: { label: string; detail: string }[] }[];
  levels?: Pick<ScanLevel, "name" | "title" | "description" | "move">[];
  focuses?: Record<ScanFocus, Pick<ScanFocusProfile, "promise" | "moves">>;
};

export type SiteTr = {
  description: string;
  units: { kicker: string; short: string }[];
};

export type ContentTranslations = {
  projects: Record<string, ProjectTr>;
  services: Record<string, ServiceTr>;
  properties: Record<string, PropertyTr>;
  talents: Record<string, TalentTr>;
  clients: Record<string, ClientTr>;
  news: Record<string, NewsTr>;
  stories: Record<string, StoryTr>;
  posts: Record<string, PostTr>;
  initiatives: Record<string, InitiativeTr>;
  faqs: FaqTr[];
  company: CompanyTr;
  scan: ScanTr;
  site: SiteTr;
};

/** A merged, translated story keeps the Italian shape and the English text. */
export type LocalizedStory = Omit<Story, "slides"> & {
  slides: (Story["slides"][number] & { cta?: { label: string; href: string } })[];
};

/** Unused re-exports keep the translation files self-documenting. */
export type { ScanQuestion, ScanLevel };
