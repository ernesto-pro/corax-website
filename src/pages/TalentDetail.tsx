import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Instagram, Play, Youtube } from "lucide-react";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ArrowLink } from "../components/UI";
import { instagramUrl, youtubeVideoUrl } from "../data/talents";
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
        <div className="talent-detail__social" aria-label={t("Profili ufficiali")}>
          <a
            className="social-pill"
            href={instagramUrl(talent.instagram)}
            target="_blank"
            rel="noreferrer"
          >
            <Instagram size={15} strokeWidth={1.6} aria-hidden />
            <span>@{talent.instagram}</span>
            <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden />
          </a>
          {talent.youtube && (
            <a
              className="social-pill"
              href={talent.youtube.url}
              target="_blank"
              rel="noreferrer"
            >
              <Youtube size={15} strokeWidth={1.6} aria-hidden />
              <span>{talent.youtube.name}</span>
              <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden />
            </a>
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

      <section className="talent-channels">
        <div className="talent-channels__head">
          <span className="eyebrow">{t("Canali ufficiali")}</span>
          <h2>{t("I canali, senza intermediari.")}</h2>
          <p>
            {t(
              "Il profilo Instagram e, quando c'è, il canale YouTube: i posti dove il talento parla direttamente al suo pubblico.",
            )}
          </p>
        </div>

        <div
          className={`talent-channels__grid ${
            talent.youtube ? "talent-channels__grid--pair" : ""
          }`}
        >
          <a
            className="channel-card channel-card--instagram"
            href={instagramUrl(talent.instagram)}
            target="_blank"
            rel="noreferrer"
          >
            <span className="channel-card__icon" aria-hidden>
              <Instagram size={20} strokeWidth={1.5} />
            </span>
            <span className="channel-card__label">Instagram</span>
            <strong className="channel-card__name">@{talent.instagram}</strong>
            <span className="channel-card__cta">
              {t("Apri il profilo")}
              <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden />
            </span>
          </a>

          {talent.youtube && (
            <a
              className="channel-card channel-card--youtube"
              href={talent.youtube.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="channel-card__icon" aria-hidden>
                <Youtube size={20} strokeWidth={1.5} />
              </span>
              <span className="channel-card__label">YouTube</span>
              <strong className="channel-card__name">{talent.youtube.name}</strong>
              <span className="channel-card__cta">
                {t("Apri il canale")}
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden />
              </span>
            </a>
          )}
        </div>

        {talent.youtube && (
          <div className="talent-videos">
            <div className="talent-videos__head">
              <span className="eyebrow">{t("Video dal canale")}</span>
              <a
                className="talent-videos__all"
                href={talent.youtube.url}
                target="_blank"
                rel="noreferrer"
              >
                {t("Tutti i video")}
                <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden />
              </a>
            </div>
            <div className="talent-videos__grid">
              {talent.youtube.videos.map((video) => (
                <a
                  key={video.id}
                  className="talent-video"
                  href={youtubeVideoUrl(video.id)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="talent-video__media">
                    <img
                      src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={480}
                      height={360}
                    />
                    <span className="talent-video__play" aria-hidden>
                      <Play size={17} fill="currentColor" strokeWidth={0} />
                    </span>
                  </span>
                  <span className="talent-video__title">{video.title}</span>
                  <span className="talent-video__meta">
                    YouTube
                    <ArrowUpRight size={13} strokeWidth={1.6} aria-hidden />
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
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
