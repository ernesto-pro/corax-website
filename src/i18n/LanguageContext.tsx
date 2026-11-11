import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LANG, type Lang } from "./lang";
import { localizePath } from "./routes";

const LanguageContext = createContext<Lang>(DEFAULT_LANG);

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  return <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LanguageContext);
}

/** Localize an internal path for the active language. */
export function useLocalePath() {
  const lang = useLang();
  return (path: string) => localizePath(path, lang);
}
