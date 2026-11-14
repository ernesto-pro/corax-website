import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PageHero, CTABand } from "../components/PageHero";
import { SectionHead, Stat, ArrowLink } from "../components/UI";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export function Sistema() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const methodSteps = [
    ["01", t("Ascolto"), t("Obiettivi, mercato, audience. Prima di parlare, capiamo.")],
    ["02", t("Strategia"), t("Posizionamento, territorio, canali e KPI condivisi.")],
    ["03", t("Creazione"), t("Concept e produzione interna, con un presidio creativo.")],
    ["04", t("Attivazione"), t("Media, creator e properties lavorano insieme.")],
    ["05", t("Misurazione"), t("Dati, lettura e ottimizzazione continua.")],
  ];

  const glossary = [
    {
      term: "Agency",
      text: t(
        "La unit che unisce strategia, creatività, influencer marketing e performance. È il punto di ingresso per la maggior parte dei brand.",
      ),
    },
    {
      term: "Media House",
      text: t(
        "La factory editoriale: idea, produce e distribuisce format, podcast e contenuti. Gestisce anche le properties proprietarie.",
      ),
    },
    {
      term: "Talent",
      text: t(
        "La talent agency: rappresenta persone, ne sviluppa la carriera e costruisce partnership con i brand.",
      ),
    },
    {
      term: "Tech",
      text: t("Il reparto che progetta e sviluppa siti, piattaforme, e-commerce e strumenti di misurazione."),
    },
    {
      term: "FAST",
      text: t(
        "Free Ad-Supported Streaming TV: canali gratuiti finanziati dalla pubblicità, distribuiti su Connected TV. “A tu per tu” è il nostro canale dedicato ai vodcast.",
      ),
    },
    {
      term: "Property",
      text: t(
        "Un format, un podcast o una piattaforma di proprietà Corax. Vive di vita propria e può ospitare brand, campagne e operazioni speciali.",
      ),
    },
  ];

  return (
    <>
      <PageHero
        index="00"
        label={t("Il sistema")}
        title={
          <>
            {t("Quattro unit.")}
            <br />
            <em>{t("Una sola regia.")}</em>
          </>
        }
        lede={t(
          "Corax non è una somma di reparti. È un sistema in cui strategia, produzione, talenti e tecnologia si alimentano a vicenda. Ecco come funziona.",
        )}
        meta={[
          { label: t("Fondata"), value: "2020" },
          { label: t("Persone"), value: "73" },
          { label: t("Fatturato 2025"), value: t("8 MLN") },
          { label: t("Target 2026"), value: t("12 MLN") },
        ]}
      />

      <div className="unit-index">
        {content.services.map((s) => (
          <Link key={s.slug} to={to(`/servizi/${s.slug}`)} className="unit-index__item">
            <span className="unit-index__index">{s.index}</span>
            <span className="unit-index__name">{s.name}</span>
            <span className="unit-index__kicker">{s.kicker}</span>
            <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden />
          </Link>
        ))}
      </div>

      {content.services.map((service, i) => (
        <section
          key={service.slug}
          className={`section unit-detail ${i % 2 === 0 ? "section--dark" : "section--paper"} ${
            i % 2 === 1 ? "unit-detail--reverse" : ""
          }`}
          style={{ ["--accent" as string]: service.accent }}
        >
          <div className="unit-detail__head">
            <span className="unit-detail__index">{service.index}</span>
            <div>
              <p className="eyebrow">{service.kicker}</p>
              <h2>
                {service.name}
                <span className="unit-detail__dot" aria-hidden />
              </h2>
            </div>
            <p className="unit-detail__lede">{service.intro}</p>
          </div>

          <div className="unit-detail__grid">
            <div className="unit-detail__caps">
              {service.capabilities.slice(0, 4).map((cap, idx) => (
                <div className="capability" key={cap.title}>
                  <span>{String(idx + 1).padStart(2, "0")}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.text}</p>
                </div>
              ))}
            </div>
            <div className="unit-detail__aside">
              <div className="unit-detail__metrics">
                {service.metrics.map((m) => (
                  <Stat key={m.label} value={m.value} label={m.label} />
                ))}
              </div>
              <ArrowLink to={`/servizi/${service.slug}`}>
                {t("Scopri")} {service.name}
              </ArrowLink>
            </div>
          </div>
        </section>
      ))}

      <section className="section section--lavender method">
        <SectionHead
          index="05"
          label={t("Metodo")}
          title={t("Dal brief al risultato, senza passaggi a vuoto.")}
        >
          <p>
            {t(
              "Un processo chiaro, ma abbastanza flessibile da cambiare forma quando il progetto lo richiede. Cinque fasi, un unico team.",
            )}
          </p>
        </SectionHead>
        <div className="method__steps">
          {methodSteps.map(([n, title, text]) => (
            <div className="method__step" key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--paper glossary">
        <SectionHead index="06" label={t("Glossario")} title={t("Le parole, spiegate.")}>
          <p>
            {t(
              "Il nostro settore parla spesso per sigle. Qui trovi i termini che usiamo davvero, senza giri di parole.",
            )}
          </p>
        </SectionHead>
        <dl className="glossary__grid">
          {glossary.map(({ term, text }, i) => (
            <div className="glossary__item" key={term}>
              <dt>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {term}
              </dt>
              <dd>{text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <CTABand
        kicker={t("Lavoriamo insieme")}
        title={t("Una regia sola, per tutto il sistema.")}
        text={t(
          "Che tu abbia bisogno di una campagna, di un format o di un partner editoriale, la porta d'ingresso è sempre la stessa.",
        )}
        secondary={{ label: t("Entra negli spazi 3D"), to: "/esperienza" }}
      />
    </>
  );
}
