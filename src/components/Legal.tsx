import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "./PageHero";
import { site } from "../data/site";
import { useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

export function LegalPage({
  index,
  label,
  title,
  lede,
  updated,
  sections,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede: string;
  updated: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  const t = useT();
  const lang = useLang();
  return (
    <>
      <PageHero index={index} label={label} title={title} lede={lede}>
        <p className="legal__updated">
          {t("Ultimo aggiornamento:")} {updated}
        </p>
      </PageHero>

      <section className="section section--paper legal">
        <aside className="legal__toc" aria-label={t("Indice della pagina")}>
          <p className="eyebrow">{t("Indice")}</p>
          <ol>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
          <div className="legal__contact">
            <p className="eyebrow">{t("Titolare")}</p>
            <p>{site.legalName}</p>
            <p>{site.address.full}</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </aside>

        <div className="legal__content">
          {children}
          {sections.map((s, i) => (
            <section className="legal__section" id={s.id} key={s.id}>
              <span className="legal__num">{String(i + 1).padStart(2, "0")}</span>
              <h2>{s.title}</h2>
              <div className="legal__prose">{s.content}</div>
            </section>
          ))}
          <p className="legal__back">
            <Link to={localizePath("/", lang)}>← {t("Torna alla home")}</Link>
          </p>
        </div>
      </section>
    </>
  );
}
