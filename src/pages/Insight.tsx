import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, CTABand } from "../components/PageHero";
import { NewsCard } from "../components/Cards";
import { Marquee } from "../components/UI";
import type { NewsItem } from "../data/news";
import { newsCover, newsCoverAltFor } from "../data/newsCovers";
import { categoryLabel } from "../i18n/content";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { optSrc } from "../lib/img";

const categories = ["Tutte", "Azienda", "Campagne", "Media", "Talent", "Premi"] as const;

export function Insight() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Tutte");
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const displayCategory = (value: string) =>
    lang === "en" ? (categoryLabel[value] ?? value) : value;

  const localizedItem = (item: NewsItem): NewsItem =>
    lang === "en"
      ? { ...item, category: displayCategory(item.category) as NewsItem["category"] }
      : item;

  const featured =
    content.news.find((n) => n.slug === "leader-della-crescita-2026") ?? content.news[0];

  const filtered = useMemo(
    () =>
      content.news.filter(
        (n) => n.slug !== featured.slug && (category === "Tutte" || n.category === category),
      ),
    [category, featured.slug, content.news],
  );

  return (
    <>
      <PageHero
        index="06"
        label={t("Insight")}
        title={
          <>
            {t("La crescita")}
            <br />
            <em>{t("si vede da fuori.")}</em>
          </>
        }
        lede={t(
          "Campagne, properties, persone e riconoscimenti. Le notizie che raccontano cosa succede dentro e intorno al sistema Corax — dalla stampa di settore alla voce del team.",
        )}
        meta={[
          { label: t("Articoli"), value: String(content.news.length) },
          { label: t("Riconoscimenti"), value: "2026" },
          { label: t("Fonte"), value: t("Stampa & team") },
        ]}
      />

      <section className="section section--dark insight-feature">
        <div className="insight-feature__head">
          <span className="eyebrow">{t("In evidenza")}</span>
          <span className="insight-feature__date">{featured.displayDate}</span>
        </div>
        <Link to={to(`/insight/${featured.slug}`)} className="insight-feature__card">
          <div className="insight-feature__media">
            <img
              src={optSrc(newsCover(featured.slug))}
              alt={newsCoverAltFor(featured.slug, lang, featured.title)}
              width={1600}
              height={900}
              fetchPriority="high"
            />
            <span className="insight-feature__badge">{displayCategory(featured.category)}</span>
          </div>
          <div className="insight-feature__body">
            <p className="insight-feature__source">{featured.source}</p>
            <h2>{featured.title}</h2>
            <p className="insight-feature__excerpt">{featured.excerpt}</p>
            <span className="insight-feature__cta">
              {t("Leggi l'articolo")} <ArrowUpRight size={18} aria-hidden />
            </span>
          </div>
        </Link>
      </section>

      <section className="section section--paper insight-index">
        <div className="insight-index__bar">
          <div className="filters" role="group" aria-label={t("Filtra le notizie per categoria")}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`chip ${category === cat ? "is-active" : ""}`}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
              >
                {cat === "Tutte" ? t("Tutte") : displayCategory(cat)}
              </button>
            ))}
          </div>
          <div className="insight-index__meta">
            <p className="insight-index__count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? t("articolo") : t("articoli")}
            </p>
            <Link to={to("/instagram")} className="insight-index__live">
              {t("Live Instagram")}
              <ArrowUpRight size={14} aria-hidden />
            </Link>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="insight-grid">
            {filtered.map((item: NewsItem, i: number) => (
              <NewsCard key={item.slug} item={localizedItem(item)} index={i} />
            ))}
          </div>
        ) : (
          <p className="insight-index__empty">
            {t("Nessun articolo in questa categoria, per ora.")}
          </p>
        )}
      </section>

      <section className="section section--dark press-wall">
        <p className="eyebrow">{t("Ci hanno raccontato")}</p>
        <Marquee
          items={[
            "Il Sole 24 Ore",
            "Media Key",
            "Engage",
            "Youmark",
            "Dailyonline",
            "Google Italia",
            "LinkedIn News",
          ]}
          speed={42}
          separator="·"
          className="marquee--big"
        />
      </section>

      <CTABand
        kicker={t("Stampa & media")}
        title={t("Hai una storia da raccontare?")}
        text={t(
          "Per richieste stampa, interviste e materiali è possibile scrivere al team Corax.",
        )}
        primary={{ label: t("Contatta il team"), to: "/contatti" }}
        secondary={{ label: t("Chi siamo"), to: "/chi-siamo" }}
      />
    </>
  );
}
