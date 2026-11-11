import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ArrowLink } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { NotFound } from "./NotFound";

export function TalentDetail() {
  const { slug } = useParams();
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const talent = slug ? content.talents.find((x) => x.slug === slug) : undefined;

  if (!talent) return <NotFound />;

  const property = talent.property
    ? content.properties.find((p) => p.slug === talent.property)
    : undefined;
  const related = content.talents
    .filter((x) => x.slug !== talent.slug && x.categories.some((c) => talent.categories.includes(c)))
    .slice(0, 5);

  return (
    <article className="talent-detail">
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Talent", path: "/talent" },
            { name: talent.name, path: `/talent/${talent.slug}` },
          ]}
        />
      </div>

      <header className="talent-detail__hero">
        <span className="eyebrow">Talent · Corax</span>
        <h1>{talent.name}</h1>
        <div className="talent-detail__meta">
          <div>
            <span>{t("Categorie")}</span>
            <p>{talent.categories.join(", ")}</p>
          </div>
          {property && (
            <div>
              <span>Property</span>
              <p>{property.name}</p>
            </div>
          )}
          <div>
            <span>{t("Rappresentanza")}</span>
            <p>Corax Talent</p>
          </div>
        </div>
        <p className="talent-detail__note">{talent.note}</p>
        <div className="talent-detail__actions">
          <a
            href="mailto:info@corax.business?subject=Progetto%20con%20un%20talento%20Corax"
            className="btn btn--primary"
          >
            <span className="btn__label">{t("Proponi un progetto")}</span>
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={16} />
            </span>
          </a>
          {property && (
            <ArrowLink to={`/media/${property.slug}`}>
              {t("Scopri")} {property.name}
            </ArrowLink>
          )}
        </div>
      </header>

      <section className="talent-detail__body">
        <div>
          <span className="eyebrow">{t("Chi è")}</span>
          <p className="talent-detail__statement">
            {talent.name}{" "}
            {t(
              "fa parte del roster Corax. Un percorso costruito insieme, tra contenuti proprietari, brand partnership e una voce che resta riconoscibile.",
            )}
          </p>
        </div>
        <div>
          <span className="eyebrow">{t("Come lavoriamo")}</span>
          <ul className="talent-detail__list">
            <li>{t("Gestione strategica e operativa del talento")}</li>
            <li>{t("Sviluppo di format e contenuti proprietari")}</li>
            <li>{t("Selezione delle partnership in base all'affinità")}</li>
            <li>{t("Produzione e coordinamento end-to-end")}</li>
          </ul>
        </div>
      </section>

      <section className="talent-detail__related">
        <div className="talent-detail__related-head">
          <span className="eyebrow">{t("Roster")}</span>
          <h2>{t("Altri talenti.")}</h2>
          <ArrowLink to="/talent">{t("Tutto il roster")}</ArrowLink>
        </div>
        <div className="talent-detail__related-grid">
          {related.map((x) => (
            <Link key={x.slug} to={to(`/talent/${x.slug}`)} className="talent-mini">
              <h3>{x.name}</h3>
              <p>{x.categories.join(" · ")}</p>
              <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        kicker="Brand & talent"
        title={t("Costruiamo una collaborazione che abbia senso.")}
        text={t("Raccontaci il progetto e ti diremo qual è il talento giusto — o se non c'è.")}
      />
    </article>
  );
}
