import { useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs, CTABand } from "../components/PageHero";
import { ProjectCard } from "../components/Cards";
import { FAQ } from "../components/FAQ";
import { ArrowLink, Marquee, SectionHead, Stat } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { NotFound } from "./NotFound";

export function ServiceDetail() {
  const content = useContent();
  const t = useT();
  const { slug } = useParams();
  const service = slug ? content.services.find((s) => s.slug === slug) : undefined;

  if (!service) return <NotFound />;

  const related = service.relatedProjects
    .map((s) => content.projects.find((project) => project.slug === s))
    .filter(Boolean);
  const property = content.properties.find((p) => p.slug === service.slug);
  const next =
    content.services[
      (content.services.findIndex((s) => s.slug === service.slug) + 1) % content.services.length
    ];

  return (
    <article className="service-detail" style={{ ["--accent" as string]: service.accent }}>
      <div className="case__crumb">
        <Breadcrumbs
          items={[
            { name: t("Home"), path: "/" },
            { name: t("Sistema"), path: "/sistema" },
            { name: service.name, path: `/servizi/${service.slug}` },
          ]}
        />
      </div>

      <header className="service-hero">
        <span className="service-hero__ghost" aria-hidden>
          {service.index}
        </span>
        <div className="service-hero__top">
          <span className="eyebrow">
            Unit {service.index} — {service.kicker}
          </span>
          <span className="service-hero__dot" aria-hidden />
        </div>
        <h1>{service.name}</h1>
        <div className="service-hero__bottom">
          <p className="service-hero__title">{service.title}</p>
          <p className="service-hero__intro">{service.intro}</p>
        </div>
      </header>

      <div className="service-marquee">
        <Marquee
          items={service.keywords}
          speed={40}
          separator="✳"
          className="marquee--outline"
        />
      </div>

      <section className="section section--paper service-caps">
        <div className="service-caps__head">
          <div>
            <span className="eyebrow">{t("Cosa facciamo")}</span>
            <h2>
              {t("Le competenze,")}
              <br />
              <em>{t("senza gerghi.")}</em>
            </h2>
          </div>
          <p>
            {t(
              "Un perimetro chiaro di attività, tutte gestite internamente o con un presidio diretto del team Corax. Nessun passaggio di mano, nessuna promessa che non possiamo misurare.",
            )}
          </p>
        </div>
        <div className="service-caps__grid">
          {service.capabilities.map((cap, i) => (
            <div className="capability capability--wide" key={cap.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{cap.title}</h3>
                <p>{cap.text}</p>
              </div>
              <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden />
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark service-metrics">
        <div className="service-metrics__grid">
          {service.metrics.map((m) => (
            <Stat key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
        <p className="service-metrics__note">
          {t(
            "Dati del sistema Corax, aggiornati al 2025–2026. La crescita è il risultato di un metodo, non di un singolo progetto.",
          )}
        </p>
      </section>

      <section className="section section--lavender service-process">
        <div className="section-head section-head--plain">
          <div className="section-head__top">
            <span className="section-head__index">03</span>
            <span className="section-head__label">{t("Metodo")}</span>
          </div>
          <h2 className="section-head__title">
            {t("Come si arriva")}
            <br />
            <em>{t("al risultato.")}</em>
          </h2>
        </div>
        <div className="service-process__steps">
          {service.process.map((p) => (
            <div className="service-step" key={p.step}>
              <span className="service-step__num">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <span className="service-step__line" aria-hidden />
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark service-faq">
        <SectionHead
          index="04"
          label={t("Domande")}
          title={
            <>
              {t("Prima di")} <em>{t("iniziare.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Le risposte alle domande che ci arrivano più spesso su questa unit. Se la tua non è qui, scrivici: risponde una persona.",
            )}
          </p>
        </SectionHead>
        <FAQ items={service.faqs} />
      </section>

      {property && (
        <section className="section section--paper service-property">
          <div className="service-property__head">
            <span className="eyebrow">{t("La property")}</span>
            <h2>
              {property.name}
              <span className="unit-detail__dot" aria-hidden />
            </h2>
            <p>{property.claim}</p>
          </div>
          <div className="service-property__body">
            <p>{property.excerpt}</p>
            <ArrowLink to={`/media/${property.slug}`}>
              {t("Scopri")} {property.name}
            </ArrowLink>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section section--paper service-work">
          <div className="case__related-head">
            <span className="eyebrow">Selected work</span>
            <h2>{t("Il metodo, applicato.")}</h2>
            <ArrowLink to="/progetti">{t("Tutti i progetti")}</ArrowLink>
          </div>
          <div className="project-grid project-grid--three">
            {related.map((p, i) => p && <ProjectCard key={p.slug} project={p} index={i} />)}
          </div>
        </section>
      )}

      <div className="service-next">
        <span className="eyebrow">{t("Prossima unit")}</span>
        <ArrowLink to={`/servizi/${next.slug}`}>{next.name}</ArrowLink>
      </div>

      <CTABand
        kicker={`Unit ${service.index}`}
        title={t("Partiamo da un obiettivo. Il resto è sistema.")}
        text={t(
          "Raccontaci cosa vuoi ottenere: ti diremo chi, come e con quale squadra possiamo arrivarci.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Tutte le unit"), to: "/sistema" }}
      />
    </article>
  );
}
