import { PageHero, CTABand, SplitStatement } from "../components/PageHero";
import { SectionHead, Stat } from "../components/UI";
import { site } from "../data/site";
import { useContent, useT } from "../i18n/translate";

export function ChiSiamo() {
  const content = useContent();
  const t = useT();
  const { team, timeline, values } = content.company;

  return (
    <>
      <PageHero
        index="04"
        label={t("Chi siamo")}
        title={
          <>
            {t("Una company fresca.")}
            <br />
            <em>{t("Un'idea seria.")}</em>
          </>
        }
        lede={t(
          "Corax nasce a Milano nel 2020 per reinterpretare il mondo dei media: un ponte tra talenti, brand e piattaforme. Cinque anni dopo siamo un sistema da 8 milioni di fatturato, con 73 persone e un obiettivo chiaro.",
        )}
        meta={[
          { label: t("Fondata"), value: "2020" },
          { label: t("Fatturato 2025"), value: t("8 MLN") },
          { label: t("Crescita"), value: "+45%" },
          { label: t("Target 2026"), value: t("12 MLN") },
        ]}
      />

      <section className="section section--paper about-manifesto">
        <SplitStatement
          index="01"
          label={t("Visione")}
          aside={
            <div className="about-manifesto__aside">
              <p className="eyebrow">Il Sole 24 Ore</p>
              <p className="about-manifesto__award">Leader della Crescita 2026</p>
              <p>
                {t(
                  "Inseriti nella classifica delle aziende italiane con la maggiore crescita di ricavi nel triennio 2021–2024.",
                )}
              </p>
            </div>
          }
        >
          <span className="eyebrow">{t("Il punto di partenza")}</span>
          <h2 className="statement">
            {t("Un nuovo modo di guardare al settore:")} <em>{t("rigore metrico")}</em>{" "}
            {t("e creatività, nella stessa stanza.")}
          </h2>
          <div className="manifesto__cols">
            <p>
              {t(
                "Siamo una social media company con due anime: agenzia ed editore. Lavoriamo con i brand e, allo stesso tempo, possediamo format, podcast e piattaforme. Questo ci permette di capire cosa funziona davvero, prima di proporlo a un cliente.",
              )}
            </p>
            <p>
              {t(
                "Il nostro centro è sempre il cliente, ma il nostro motore sono le persone: talenti, autori, producer, strategist e sviluppatori che condividono la stessa ossessione per il dettaglio.",
              )}
            </p>
          </div>
        </SplitStatement>

        <div className="numbers">
          <div className="numbers__head">
            <span className="eyebrow">{t("Chi siamo, in numeri")}</span>
            <p>{t("Dati aggiornati al 2025–2026.")}</p>
          </div>
          <div className="numbers__grid">
            <Stat value="73" label={t("persone")} />
            <Stat value="4" label={t("unit integrate")} />
            <Stat value="250+" label={t("progetti conclusi")} />
            <Stat value="96%" label="client satisfaction" />
          </div>
        </div>
      </section>

      <section className="section section--dark timeline-section">
        <SectionHead
          index="02"
          label={t("Storia")}
          title={t("Cinque anni, nessuna scorciatoia.")}
        >
          <p>
            {t("Dal 2020 a oggi: le tappe che hanno trasformato una startup in un sistema editoriale.")}
          </p>
        </SectionHead>
        <div className="timeline">
          {timeline.map((item) => (
            <div className="timeline__item" key={item.year}>
              <span className="timeline__year">{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--lavender values">
        <SectionHead
          index="03"
          label={t("Come pensiamo")}
          title={t("Quattro principi, zero slogan.")}
        >
          <p>
            {t("Non sono valori da parete. Sono i criteri con cui scegliamo le persone e i progetti.")}
          </p>
        </SectionHead>
        <div className="values__grid">
          {values.map((v, i) => (
            <div className="value-card" key={v.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--paper team">
        <SectionHead
          index="04"
          label="Leadership"
          title={t("Le persone che tengono la regia.")}
        >
          <p>
            {t(
              "Un team giovane, con esperienze diverse, unito dalla stessa idea: fare media, non solo comunicazione.",
            )}
          </p>
        </SectionHead>
        <div className="team__grid">
          {team.map((person) => (
            <div className="team-card" key={person.name}>
              <span className="team-card__initials" aria-hidden>
                {person.initials}
              </span>
              <div>
                <h3>{person.name}</h3>
                <p className="team-card__role">{person.role}</p>
                <p className="team-card__bio">{person.bio}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="team__note">
          {t(
            "73 persone, 4 unit, una sede che cresce. Nel 2026 gli spazi supereranno i 1.500 mq.",
          )}
        </p>
      </section>

      <section className="section section--dark about-office">
        <div className="about-office__media">
          <img
            src="/img/covers/poretcast-01.webp"
            alt={t("Il set del PoretCast negli spazi produttivi Corax")}
            loading="lazy"
            width={1600}
            height={900}
          />
        </div>
        <div className="about-office__body">
          <span className="eyebrow">{t("La casa")}</span>
          <h2>
            La Vela.
            <br />
            <em>{t("Milano.")}</em>
          </h2>
          <p>
            {t(
              "Viale Bodio 29/37, zona Bovisa. Uffici e studi di produzione in espansione: 850 mq aggiuntivi nel 2026 per produrre e distribuire 20 nuovi format.",
            )}
          </p>
          <dl>
            <div>
              <dt>{t("Indirizzo")}</dt>
              <dd>{site.address.full}</dd>
            </div>
            <div>
              <dt>{t("Spazi")}</dt>
              <dd>{t("1.500+ mq")}</dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>{t("Produzione interna")}</dd>
            </div>
          </dl>
          <a href={site.address.maps} target="_blank" rel="noreferrer" className="btn btn--light">
            <span className="btn__label">{t("Apri in mappe")}</span>
            <span className="btn__icon" aria-hidden>
              ↗
            </span>
          </a>
        </div>
      </section>

      <CTABand
        kicker={t("Persone")}
        title={t("Il talento non si compra. Si riconosce.")}
        text={t(
          "Se vuoi far parte del sistema Corax, o se pensi che il tuo brand abbia bisogno di una regia diversa, scrivici.",
        )}
        primary={{ label: t("Lavora con noi"), to: "/lavora-con-noi" }}
        secondary={{ label: t("Contatti"), to: "/contatti" }}
      />
    </>
  );
}
