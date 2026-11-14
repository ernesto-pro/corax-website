import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, Newspaper } from "lucide-react";
import { newsCover, newsCoverAltFor } from "../data/newsCovers";
import type { NewsItem } from "../data/news";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ArrowLink } from "../components/UI";
import { NewsCard } from "../components/Cards";
import { categoryLabel } from "../i18n/content";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { NotFound } from "./NotFound";
import { optSrc, optSrcSet } from "../lib/img";

export function NewsDetail() {
  const { slug } = useParams();
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

  const article = slug ? content.news.find((n) => n.slug === slug) : undefined;

  if (!article) return <NotFound />;

  const index = content.news.findIndex((n) => n.slug === article.slug);
  const next = content.news[(index + 1) % content.news.length];
  const related = content.news
    .filter((n) => n.slug !== article.slug && n.category === article.category)
    .slice(0, 3);
  const extras = content.news
    .filter((n) => n.slug !== article.slug && n.category !== article.category)
    .slice(0, 3);
  const suggestions = (related.length >= 2 ? related : [...related, ...extras]).slice(0, 3);

  return (
    <article className="news-article">
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: t("Home"), path: "/" },
            { name: t("Insight"), path: "/insight" },
            { name: article.title, path: `/insight/${article.slug}` },
          ]}
        />
      </div>

      <header className="news-article__head">
        <div className="news-article__meta">
          <span className="news-article__cat">{displayCategory(article.category)}</span>
          <span>
            <Newspaper size={13} aria-hidden /> {article.source}
          </span>
          <span>
            <CalendarDays size={13} aria-hidden /> {article.displayDate}
          </span>
        </div>
        <h1>{article.title}</h1>
        <p className="news-article__excerpt">{article.excerpt}</p>
      </header>

      <figure className="news-article__cover">
        <img
          src={optSrc(newsCover(article.slug))}
          srcSet={optSrcSet(newsCover(article.slug))}
          alt={newsCoverAltFor(article.slug, lang, article.title)}
          width={1600}
          height={900}
        />
        <figcaption>
          <span>
            Corax — {displayCategory(article.category)}
          </span>
          <span>{article.displayDate}</span>
        </figcaption>
      </figure>

      <section className="news-article__body">
        <aside className="news-article__aside">
          <dl>
            <div>
              <dt>{t("Fonte")}</dt>
              <dd>{article.source}</dd>
            </div>
            <div>
              <dt>{t("Data")}</dt>
              <dd>{article.displayDate}</dd>
            </div>
            <div>
              <dt>{t("Categoria")}</dt>
              <dd>{displayCategory(article.category)}</dd>
            </div>
          </dl>
          <a href={article.sourceUrl} target="_blank" rel="noreferrer" className="news-article__source">
            {t("Leggi la fonte originale")} <ArrowUpRight size={14} aria-hidden />
          </a>
          <Link to={to("/insight")} className="case__back">
            <ArrowLeft size={15} aria-hidden /> {t("Tutte le notizie")}
          </Link>
        </aside>

        <div className="news-article__content">
          {article.body.map((p, i) => (
            <p key={p} className={i === 0 ? "is-lead" : ""}>
              {p}
            </p>
          ))}
          <a
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="news-article__source news-article__source--inline"
          >
            {t("Approfondisci su")} {article.source} <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>
      </section>

      {suggestions.length > 0 && (
        <section className="section section--paper news-article__related">
          <div className="case__related-head">
            <span className="eyebrow">{t("Continua a leggere")}</span>
            <h2>{t("Altre notizie.")}</h2>
            <ArrowLink to="/insight">{t("Tutti gli insight")}</ArrowLink>
          </div>
          <div className="insight-grid insight-grid--three">
            {suggestions.map((n, i) => (
              <NewsCard key={n.slug} item={localizedItem(n)} index={i} />
            ))}
          </div>
        </section>
      )}

      <Link to={to(`/insight/${next.slug}`)} className="next-project">
        <span className="eyebrow">{t("Prossima notizia")}</span>
        <div>
          <h2>{next.title}</h2>
          <ArrowUpRight size={40} strokeWidth={1} aria-hidden />
        </div>
        <span>{next.source}</span>
      </Link>

      <CTABand
        kicker={t("Media & stampa")}
        title={t("Vuoi saperne di più?")}
        text={t(
          "Per materiali, interviste e informazioni sul sistema Corax, il team è a disposizione.",
        )}
        primary={{ label: t("Contatti"), to: "/contatti" }}
        secondary={{ label: t("Chi siamo"), to: "/chi-siamo" }}
      />
    </article>
  );
}
