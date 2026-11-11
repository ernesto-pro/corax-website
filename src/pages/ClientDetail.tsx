import { Link, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ProjectCard } from "../components/Cards";
import { ArrowLink, SectionHead } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { NotFound } from "./NotFound";

export function ClientDetail() {
  const { slug } = useParams();
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const client = slug ? content.clients.find((x) => x.slug === slug) : undefined;

  if (!client) return <NotFound />;

  const projects = client.projects.flatMap((s) => {
    const project = content.projects.find((p) => p.slug === s);
    return project ? [project] : [];
  });
  const first = projects[0];
  const others = content.clients.filter((c) => c.slug !== client.slug).slice(0, 3);

  return (
    <article className="client-detail" style={{ ["--accent" as string]: client.accent }}>
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: t("Clienti"), path: "/clienti" },
            { name: client.name, path: `/clienti/${client.slug}` },
          ]}
        />
      </div>

      <header className="client-hero">
        <div className="client-hero__content">
          <span className="eyebrow">
            {t("Cliente")} · {client.sector} · {t("dal")} {client.since}
          </span>
          <h1>{client.name}</h1>
          <p className="client-hero__summary">{client.summary}</p>
          <dl className="client-hero__facts">
            {client.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="client-hero__actions">
            {first && <ArrowLink to={`/progetti/${first.slug}`}>{t("Leggi il caso")}</ArrowLink>}
            <ArrowLink to="/contatti">{t("Parliamone")}</ArrowLink>
          </div>
        </div>

        <div className="client-hero__visual">
          {first?.cover ? (
            <img src={first.cover} alt={first.coverAlt} width={1600} height={900} />
          ) : (
            <span className="client-hero__pattern" aria-hidden />
          )}
          <span className="client-hero__mono" aria-hidden>
            {client.monogram}
          </span>
          <span className="client-hero__sector">{client.sector}</span>
        </div>
      </header>

      <section className="section section--paper client-story">
        <div className="client-story__main">
          <span className="eyebrow">{t("La collaborazione")}</span>
          <h2>
            {t("Come abbiamo")}
            <br />
            <em>{t("lavorato.")}</em>
          </h2>
          <div className="client-story__text">
            {client.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>

        <aside className="client-story__aside">
          <div>
            <p className="eyebrow">{t("Cosa abbiamo fatto")}</p>
            <ul className="client-story__list">
              {client.services.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="client-story__note">
            {t("Vuoi referenze, dettagli sul progetto o parlare con il team che lo ha seguito?")}{" "}
            <Link to={to("/contatti")}>{t("Scrivici")}</Link>.
          </p>
          <Link to={to("/clienti")} className="client-story__back">
            ← {t("Tutti i clienti")}
          </Link>
        </aside>
      </section>

      {projects.length > 0 && (
        <section className="section section--dark client-work">
          <SectionHead index="02" label={t("Il lavoro")} title={t("Il progetto, per esteso.")}>
            <p>
              {t(
                "Il caso completo con sfida, approccio, deliverable e risultati. Per vedere come l'idea è diventata un progetto.",
              )}
            </p>
          </SectionHead>
          <div className={`project-grid ${projects.length === 1 ? "project-grid--one" : ""}`}>
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="section section--paper client-others">
        <div className="client-others__head">
          <div>
            <span className="eyebrow">{t("Altri clienti")}</span>
            <h2>
              {t("Stessa regia,")}
              <br />
              <em>{t("settori diversi.")}</em>
            </h2>
          </div>
          <ArrowLink to="/clienti">{t("Tutti i profili")}</ArrowLink>
        </div>
        <div className="client-others__list">
          {others.map((c, i) => (
            <Link key={c.slug} to={to(`/clienti/${c.slug}`)} className="client-mini">
              <span className="client-mini__index">{String(i + 1).padStart(2, "0")}</span>
              <span className="client-mini__mono" aria-hidden>
                {c.monogram}
              </span>
              <span className="client-mini__name">
                <h3>{c.name}</h3>
                <p>{c.sector}</p>
              </span>
              <span className="client-mini__arrow" aria-hidden>
                <ArrowUpRight size={18} strokeWidth={1.4} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        kicker={t("Il prossimo caso")}
        title={t("Mettiamo il tuo brand nel sistema.")}
        text={t(
          "Una conversazione per capire obiettivi e contesto. Poi costruiamo la squadra giusta.",
        )}
      />
    </article>
  );
}
