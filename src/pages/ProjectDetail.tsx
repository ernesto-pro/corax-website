import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { instagramProfile, shortDate } from "../data/instagram";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ProjectCard } from "../components/Cards";
import { InstaTile, InstagramMark } from "../components/Instagram";
import { ArrowLink } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const { slug } = useParams();
  const project = slug ? content.projects.find((p) => p.slug === slug) : undefined;

  if (!project) return <NotFound />;

  const client = content.clients.find((c) => c.projects.includes(project.slug));
  const unitSlug = {
    Agency: "agency",
    "Media House": "media-house",
    Talent: "talent",
    Tech: "tech",
  }[project.unit];
  const index = content.projects.findIndex((p) => p.slug === project.slug);
  const next = content.projects[(index + 1) % content.projects.length];
  const related = (project.related ?? [])
    .map((s) => content.projects.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 3);
  const instaPosts = content.instaFeed.filter((p) => p.project === project.slug);
  const initiative = content.initiatives.find((i) => i.project === project.slug);

  return (
    <article className="case">
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: t("Home"), path: "/" },
            { name: t("Progetti"), path: "/progetti" },
            { name: project.title, path: `/progetti/${project.slug}` },
          ]}
        />
      </div>

      <header className="case__hero">
        <div className="case__hero-top">
          <span className="eyebrow">
            {t("Selected work")} · {project.unit} · {project.year}
          </span>
          <div className="case__tags">
            {project.categories.map((c) => (
              <span key={c}>{t(c)}</span>
            ))}
          </div>
        </div>
        <h1>{project.title}</h1>
        <p className="case__lede">{project.intro}</p>
      </header>

      <figure className="case__cover">
        {project.cover ? (
          <img src={project.cover} alt={project.coverAlt} width={1600} height={900} />
        ) : (
          <div className="case__cover-abstract" role="img" aria-label={project.coverAlt}>
            <span>{project.title}</span>
          </div>
        )}
        <figcaption>
          <span>{project.title}</span>
          {client ? (
            <Link to={to(`/clienti/${client.slug}`)} className="case__caption-link">
              {project.client}
            </Link>
          ) : (
            <span>{project.client}</span>
          )}
        </figcaption>
      </figure>

      <section className="case__body">
        <div className="case__aside">
          <dl>
            <div>
              <dt>{t("Cliente")}</dt>
              <dd>
                {client ? (
                  <Link to={to(`/clienti/${client.slug}`)}>{client.name} ↗</Link>
                ) : (
                  project.client
                )}
              </dd>
            </div>
            <div>
              <dt>{t("Anno")}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Unit</dt>
              <dd>
                <Link to={to(`/servizi/${unitSlug}`)}>{project.unit} ↗</Link>
              </dd>
            </div>
            <div>
              <dt>{t("Categorie")}</dt>
              <dd>{project.categories.map((c) => t(c)).join(", ")}</dd>
            </div>
            <div>
              <dt>{t("Tag")}</dt>
              <dd>{project.tags.join(", ")}</dd>
            </div>
          </dl>
          <Link to={to("/progetti")} className="case__back">
            <ArrowLeft size={15} aria-hidden /> {t("Tutti i progetti")}
          </Link>
        </div>

        <div className="case__content">
          <div className="case__block">
            <span className="eyebrow">{t("01 — La sfida")}</span>
            <h2>{t("La sfida")}</h2>
            <p>{project.challenge}</p>
          </div>
          <div className="case__block">
            <span className="eyebrow">{t("02 — L'approccio")}</span>
            <h2>{t("L'approccio")}</h2>
            <p>{project.approach}</p>
          </div>
          <div className="case__block">
            <span className="eyebrow">{t("03 — Cosa abbiamo fatto")}</span>
            <h2>{t("Deliverable")}</h2>
            <ul className="case__list">
              {project.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="case__results">
        <div className="case__results-head">
          <span className="eyebrow">{t("04 — I risultati")}</span>
          <h2>{t("Numeri, non aggettivi.")}</h2>
        </div>
        <div className="case__results-grid">
          {project.results.map((r) => (
            <div key={r.label}>
              <strong>{r.value}</strong>
              <span>{r.label}</span>
            </div>
          ))}
        </div>
      </section>

      {(instaPosts.length > 0 || initiative) && (
        <section className="case__insta" aria-labelledby="case-insta-title">
          <div className="case__insta-head">
            <span className="eyebrow">
              <InstagramMark size={13} aria-hidden /> {t("Su Instagram")}
            </span>
            <h2 id="case-insta-title">
              {t("Il caso è anche")}
              <br />
              <em>{t("un contenuto.")}</em>
            </h2>
            <p>
              {t(
                "Ogni progetto passa dal feed: il contenuto che lo presenta, il dietro le quinte che lo rende vero. Questo è quello che abbiamo pubblicato.",
              )}
            </p>
            {initiative && (
              <p className="case__insta-initiative">
                {t("Iniziativa del")} {shortDate(initiative.date)} —{" "}
                <strong>{initiative.title}</strong>
              </p>
            )}
            <div className="case__insta-actions">
              <a href={instagramProfile.url} target="_blank" rel="noreferrer">
                <InstagramMark size={15} />
                {t("Apri")} {instagramProfile.label}
                <ArrowUpRight size={14} aria-hidden />
              </a>
              <ArrowLink to="/instagram">{t("Tutte le iniziative")}</ArrowLink>
            </div>
          </div>

          <div className={`case__insta-feed ${instaPosts.length === 1 ? "is-single" : ""}`}>
            {instaPosts.length > 0 ? (
              instaPosts.map((post) => <InstaTile key={post.id} post={post} />)
            ) : (
              initiative && (
                <Link to={to(initiative.href)} className="case__insta-note">
                  <span className="case__insta-note-date">{shortDate(initiative.date)}</span>
                  <strong>{initiative.title}</strong>
                  <span>{initiative.summary}</span>
                  <span className="case__insta-note-cta">
                    {t("Apri il caso")} <ArrowUpRight size={14} aria-hidden />
                  </span>
                </Link>
              )
            )}
            {instaPosts.length > 0 && instaPosts.length < 3 && (
              <a
                className={`case__insta-follow ${
                  instaPosts.length === 1 ? "is-wide" : ""
                }`}
                href={instagramProfile.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="case__insta-follow-mark" aria-hidden>
                  <InstagramMark size={26} strokeWidth={1.4} />
                </span>
                <strong>{t("Il dietro le quinte continua qui.")}</strong>
                <span>
                  {t("Segui")} {instagramProfile.label}{" "}
                  {t("per vedere come nasce il prossimo caso.")}
                </span>
                <span className="case__insta-follow-cta">
                  {t("Segui l'account")} <ArrowUpRight size={14} aria-hidden />
                </span>
              </a>
            )}
          </div>
        </section>
      )}

      {project.gallery.length > 0 && (
        <section className="case__gallery">
          {project.gallery.map((img, i) => (
            <figure key={`${img.src}-${i}`} className={i === 0 ? "is-wide" : ""}>
              <img src={img.src} alt={img.alt} loading="lazy" width={1600} height={900} />
            </figure>
          ))}
        </section>
      )}

      {project.quote && (
        <blockquote className="case__quote">
          <p>“{project.quote.text}”</p>
          <footer>
            <strong>{project.quote.author}</strong>
            <span>{project.quote.role}</span>
          </footer>
        </blockquote>
      )}

      {related.length > 0 && (
        <section className="case__related">
          <div className="case__related-head">
            <span className="eyebrow">{t("Correlati")}</span>
            <h2>{t("Nello stesso spirito.")}</h2>
            <ArrowLink to="/progetti">{t("Tutti i progetti")}</ArrowLink>
          </div>
          <div className="project-grid project-grid--three">
            {related.map((p, i) => p && <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </section>
      )}

      <Link to={to(`/progetti/${next.slug}`)} className="next-project">
        <span className="eyebrow">{t("Prossimo progetto")}</span>
        <div>
          <h2>{next.title}</h2>
          <ArrowUpRight size={40} strokeWidth={1} aria-hidden />
        </div>
        <span>{next.client}</span>
      </Link>

      <CTABand />
    </article>
  );
}
