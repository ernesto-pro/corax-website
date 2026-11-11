import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ProjectCard } from "../components/Cards";
import { ArrowLink } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { NotFound } from "./NotFound";
import { optSrc } from "../lib/img";

export function PropertyDetail() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);
  const { slug } = useParams();
  const property = slug ? content.properties.find((p) => p.slug === slug) : undefined;

  if (!property) return <NotFound />;

  const idx = content.properties.findIndex((p) => p.slug === property.slug);
  const next = content.properties[(idx + 1) % content.properties.length];
  const related = content.projects
    .filter((p) => p.tags.some((tag) => property.tags.includes(tag)) || p.title === property.name)
    .slice(0, 3);

  return (
    <article className="property-detail" style={{ ["--accent" as string]: property.accent }}>
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: t("Home"), path: "/" },
            { name: "Properties", path: "/media" },
            { name: property.name, path: `/media/${property.slug}` },
          ]}
        />
      </div>

      <header className="property-hero">
        <div className="property-hero__top">
          <span className="eyebrow">
            {property.type} · {t("dal")} {property.since}
          </span>
          {property.partners && <span className="property-hero__partners">{property.partners}</span>}
        </div>
        <h1>{property.name}</h1>
        <p className="property-hero__claim">{property.claim}</p>
        <p className="property-hero__lede">{property.intro}</p>
      </header>

      {property.cover && (
        <figure className="property-hero__cover">
          <img src={optSrc(property.cover)} alt={property.coverAlt} width={1600} height={900} />
        </figure>
      )}

      <section className="property-stats">
        {property.stats.map((s) => (
          <div key={s.label}>
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="property-body">
        <div className="property-body__text">
          {property.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="property-body__aside">
          <p className="eyebrow">{t("In sintesi")}</p>
          <ul>
            {property.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          {property.links && (
            <div className="property-body__links">
              {property.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                  {l.label} <ArrowUpRight size={14} aria-hidden />
                </a>
              ))}
            </div>
          )}
          <div className="property-body__tags">
            {property.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="case__related">
          <div className="case__related-head">
            <span className="eyebrow">{t("Progetti collegati")}</span>
            <h2>{t("Il format diventa campagna.")}</h2>
            <ArrowLink to="/progetti">{t("Tutti i progetti")}</ArrowLink>
          </div>
          <div className="project-grid project-grid--three">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <Link to={to(`/media/${next.slug}`)} className="next-project">
        <span className="eyebrow">{t("Prossima property")}</span>
        <div>
          <h2>{next.name}</h2>
          <ArrowUpRight size={40} strokeWidth={1} aria-hidden />
        </div>
        <span>{next.type}</span>
      </Link>

      <CTABand
        kicker="Brand & property"
        title={t("Vuoi entrare in questo ecosistema?")}
        text={t(
          "Possiamo costruire un format insieme o integrare il tuo brand nelle nostre properties.",
        )}
      />
    </article>
  );
}
