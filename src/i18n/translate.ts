import type { Lang } from "./lang";
import { copyEn } from "./en/copy";
import { useLang } from "./LanguageContext";
import { contentFor, type Content } from "./content";

/**
 * Translate an Italian UI string into the active language.
 *
 * Italian is the source of truth: the dictionary is keyed by the exact Italian
 * string, so a missing translation degrades to Italian instead of showing an
 * empty label or a raw key.
 */
export function translate(lang: Lang, text: string): string {
  if (lang === "it") return text;
  return copyEn[text] ?? text;
}

/** Translation function bound to the active language. */
export function useT() {
  const lang = useLang();
  return (text: string) => translate(lang, text);
}

/** All localized content for the active language. */
export function useContent(): Content {
  const lang = useLang();
  return contentFor(lang);
}
