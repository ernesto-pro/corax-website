import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "../data/projects";
import type { Property } from "../data/properties";
import type { NewsItem } from "../data/news";
import { newsCover, newsCoverAltFor } from "../data/newsCovers";
import type { Client } from "../data/clients";
import { BrandLogo } from "./BrandLogo";
import { categoryLabel } from "../i18n/content";
import { useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { optSrc, optSrcSet } from "../lib/img";

export function ProjectCard({
  project,
  index,
  variant = "default",
}: {
  project: Project;
  index: number;
  variant?: "default" | "feature";
}) {
  const results = project.results.slice(0, 2);
  const t = useT();
  const lang = useLang();

  return (
    <Link
      to={localizePath(`/progetti/${project.slug}`, lang)}
      className={`project-card ${variant === "feature" ? "project-card--feature" : ""}`}
      style={project.accent ? { ["--accent" as string]: project.accent } : undefined}
    >
      <div className="project-card__media">
        {project.cover ? (
          <img
            src={optSrc(project.cover)}
            srcSet={optSrcSet(project.cover)}
            alt={project.coverAlt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        ) : (
          <div className="project-card__abstract" aria-label={project.coverAlt} role="img">
            <span className="project-card__monogram">
              {project.monogram ?? project.title.slice(0, 2).toUpperCase()}
            </span>
            <span className="project-card__abstract-title">{project.title}</span>
            <span className="project-card__grid" aria-hidden />
          </div>
        )}
        <span className="project-card__index">{String(index + 1).padStart(2, "0")}</span>
        <span className="project-card__open" aria-hidden>
          <ArrowUpRight size={18} strokeWidth={1.6} />
        </span>
        <span className="project-card__tag">{t(project.categories[0])}</span>
      </div>
      <div className="project-card__body">
        <div className="project-card__kicker">
          <span>{project.client}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__excerpt">{project.excerpt}</p>
        {results.length > 0 && (
          <div className="project-card__results">
            {results.map((result) => (
              <span className="project-card__result" key={`${result.value}-${result.label}`}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </span>
            ))}
          </div>
        )}
        <div className="project-card__meta">
          <span>{t(project.categories[0])}</span>
          <span className="project-card__case">
            {t("Apri il caso")} <ArrowUpRight size={12} strokeWidth={1.9} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PropertyCard({ property, index }: { property: Property; index: number }) {
  const lang = useLang();
  return (
    <Link
      to={localizePath(`/media/${property.slug}`, lang)}
      className={`property-card ${index === 0 ? "property-card--wide" : ""}`}
      style={{ ["--accent" as string]: property.accent }}
    >
      <div className="property-card__media">
        {property.cover ? (
          <img
            src={optSrc(property.cover)}
            srcSet={optSrcSet(property.cover)}
            alt={property.coverAlt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        ) : (
          <div className="property-card__abstract" aria-label={property.coverAlt} role="img">
            <span>{property.name}</span>
          </div>
        )}
        <span className="property-card__type">{property.type}</span>
      </div>
      <div className="property-card__body">
        <div className="property-card__head">
          <span className="property-card__index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{property.name}</h3>
          <ArrowUpRight className="property-card__arrow" size={22} strokeWidth={1.4} aria-hidden />
        </div>
        <p className="property-card__claim">{property.claim}</p>
        <p className="property-card__excerpt">{property.excerpt}</p>
        <div className="property-card__stats">
          {property.stats.slice(0, 3).map((s) => (
            <span key={s.label}>
              <strong>{s.value}</strong> {s.label}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ClientCard({ client, index }: { client: Client; index: number }) {
  const t = useT();
  const lang = useLang();
  return (
    <Link
      to={localizePath(`/clienti/${client.slug}`, lang)}
      className="client-card"
      style={{ ["--accent" as string]: client.accent }}
    >
      <div className="client-card__top">
        <span className="client-card__index">{String(index + 1).padStart(2, "0")}</span>
        <span className="client-card__sector">{client.sector}</span>
      </div>
      <BrandLogo
        name={client.name}
        monogram={client.monogram}
        className="client-card__logo"
        decorative
      />
      <span className="client-card__mono" aria-hidden>
        {client.monogram}
      </span>
      <div className="client-card__body">
        <h3>{client.name}</h3>
        <p>{client.summary}</p>
        <div className="client-card__foot">
          <span>
            {client.projects.length}{" "}
            {client.projects.length === 1 ? t("progetto") : t("progetti")}
          </span>
          <span>
            {t("dal")} {client.since}
          </span>
          <span className="client-card__arrow" aria-hidden>
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const t = useT();
  const lang = useLang();
  return (
    <Link to={localizePath(`/insight/${item.slug}`, lang)} className="news-card">
      <span className="news-card__media">
        <img
          src={optSrc(newsCover(item.slug))}
          srcSet={optSrcSet(newsCover(item.slug))}
          alt={newsCoverAltFor(item.slug, lang, item.title)}
          loading="lazy"
          decoding="async"
          width={1600}
          height={900}
        />
      </span>
      <div className="news-card__body">
        <div className="news-card__meta">
          <span>{item.source}</span>
          <span>{item.displayDate}</span>
        </div>
        <span className="news-card__cat">
          {lang === "en" ? categoryLabel[item.category] ?? item.category : item.category}
        </span>
        <h3>{item.title}</h3>
        <p>{item.excerpt}</p>
        <span className="news-card__link">
          {t("Leggi")} <ArrowUpRight size={14} aria-hidden />
        </span>
      </div>
      <span className="news-card__index">{String(index + 1).padStart(2, "0")}</span>
    </Link>
  );
}

export function ShowreelTrigger({
  onClick,
  label,
}: {
  onClick: () => void;
  label?: string;
}) {
  const t = useT();
  return (
    <button className="reel-trigger" onClick={onClick}>
      <span className="reel-trigger__icon">
        <Play size={16} fill="currentColor" strokeWidth={0} aria-hidden />
      </span>
      <span className="reel-trigger__label">{label ?? t("Guarda il reel")}</span>
      <span className="reel-trigger__duration">00:24</span>
    </button>
  );
}
