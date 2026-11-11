import { PageHero, CTABand } from "../components/PageHero";
import { SectionHead } from "../components/UI";
import { PropertyCard } from "../components/Cards";
import { useContent, useT } from "../i18n/translate";

export function Media() {
  const content = useContent();
  const t = useT();

  return (
    <>
      <PageHero
        index="02"
        label="Properties"
        title={
          <>
            {t("Non aspettiamo i trend.")}
            <br />
            <em>{t("Li costruiamo.")}</em>
          </>
        }
        lede={t(
          "Podcast, piattaforme editoriali, canali FAST e programmi. Le proprietà di Corax sono il laboratorio in cui sperimentiamo linguaggi prima di portarli ai brand.",
        )}
        meta={[
          { label: "Properties", value: "5" },
          { label: t("Canali"), value: "10+" },
          { label: "View PoretCast", value: t("30 MLN+") },
          { label: "FAST", value: "24/7" },
        ]}
      />

      <section className="section section--paper properties-page">
        <h2 className="sr-only">{t("Le properties Corax")}</h2>
        <div className="properties__grid properties__grid--page">
          {content.properties.map((p, i) => (
            <PropertyCard key={p.slug} property={p} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--dark distribution">
        <SectionHead
          index="03"
          label={t("Distribuzione")}
          title={
            <>
              {t("Dove vivono")}
              <br />
              <em>{t("i nostri contenuti.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Ogni property nasce per una piattaforma, ma non si esaurisce lì. Costruiamo un ecosistema di distribuzione che attraversa social, audio, video e Connected TV.",
            )}
          </p>
        </SectionHead>
        <div className="distribution__grid">
          {[
            ["YouTube", "Format lunghi, vodcast e community"],
            ["Instagram", "Contenuti seriali e clip verticali"],
            ["TikTok", "Linguaggio nativo e sperimentazione"],
            ["Spotify", "Podcast e distribuzione audio"],
            ["Samsung TV Plus", "FAST channel e Connected TV"],
            ["Web", "Properties e piattaforme proprietarie"],
          ].map(([name, desc], i) => (
            <div className="distribution__item" key={name}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{name}</h3>
              <p>{t(desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        kicker="Brand & property"
        title={t("Una property è un media. Trattiamola come tale.")}
        text={t(
          "Possiamo costruire un format proprietario per il tuo brand o integrare la tua comunicazione nelle nostre properties.",
        )}
      />
    </>
  );
}
