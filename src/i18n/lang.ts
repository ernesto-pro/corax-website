export type Lang = "it" | "en";

export const LANGS: Lang[] = ["it", "en"];
export const DEFAULT_LANG: Lang = "it";

export function isLang(value: string): value is Lang {
  return value === "it" || value === "en";
}

export const htmlLang: Record<Lang, string> = {
  it: "it-IT",
  en: "en",
};

export const ogLocale: Record<Lang, string> = {
  it: "it_IT",
  en: "en_US",
};
