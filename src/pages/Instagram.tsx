import { ArrowUpRight, Clapperboard, Layers, Sparkles } from "lucide-react";
import { PageHero, CTABand } from "../components/PageHero";
import { SectionHead } from "../components/UI";
import {
  InitiativeArchive,
  InstaFeedSection,
  InstagramMark,
  InstagramPulse,
  StoriesRail,
} from "../components/Instagram";
import {
  instagramIsLive,
  instagramProfile,
  instagramUpdatedAt,
} from "../data/instagram";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { formatDate } from "../i18n/format";

const method = [
  {
    icon: Clapperboard,
    kicker: "01 · Produzione",
    title: "Un contenuto, un caso.",
    text: "Non pubblichiamo per riempire il calendario. Ogni contenuto nasce dentro un progetto e apre il caso che lo racconta.",
  },
  {
    icon: Layers,
    kicker: "02 · Sistema",
    title: "La stessa regia, dal set al feed.",
    text: "Chi gira il reel è la stessa squadra che produce il format. Nessun passaggio a vuoto tra l'idea e la distribuzione.",
  },
  {
    icon: Sparkles,
    kicker: "03 · Conversione",
    title: "Il feed ferma lo sguardo.",
    text: "Il contenuto ti fa fermare, il caso ti spiega cosa c'è dietro. Insieme trasformano l'attenzione in una conversazione.",
  },
];

export function InstagramPage() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const cases = new Set(content.initiatives.map((item) => item.project)).size;

  return (
    <>
      <PageHero
        index="08"
        label={t("Live · Instagram")}
        title={
          <>
            {t("Il lavoro, prima")}
            <br />
            <em>{t("che diventi portfolio.")}</em>
          </>
        }
        lede={t(
          "Instagram è il quartier generale di Corax: stories, feed, iniziative e casi. Ogni contenuto che pubblichiamo ha un progetto dietro. Ogni iniziativa ha il suo caso.",
        )}
        meta={[
          { label: t("Account"), value: instagramProfile.label },
          { label: t("Stories"), value: String(content.stories.length) },
          { label: t("Iniziative"), value: String(content.initiatives.length) },
          { label: t("Casi collegati"), value: String(cases) },
        ]}
      />

      <section className="section section--dark ig-pulse-section">
        <InstagramPulse />
      </section>

      <section className="section section--paper ig-stories">
        <div className="ig-stories__intro">
          <div>
            <span className="eyebrow">{t("01 · Stories")}</span>
            <h2 className="ig-stories__title">
              {t("Le iniziative,")}
              <br />
              <em>{t("una per una.")}</em>
            </h2>
          </div>
          <div className="ig-stories__copy">
            <p>
              {t(
                "Ogni storia è un progetto, un lancio, una persona. Apri una bolla e guarda cosa c'è dietro: il contesto, il risultato, il prossimo passo. Poi scegli dove entrare.",
              )}
            </p>
            <div className="ig-stories__actions">
              <a
                href={instagramProfile.url}
                target="_blank"
                rel="noreferrer"
                className="ig-follow"
              >
                <InstagramMark size={15} />
                {t("Segui")} {instagramProfile.label}
                <ArrowUpRight size={14} aria-hidden />
              </a>
              <span className="ig-stories__updated">
                {content.initiatives.length} {t("iniziative")} · {cases} {t("casi")} ·{" "}
                {t("aggiornato")} {formatDate(instagramUpdatedAt, lang)}
              </span>
            </div>
          </div>
        </div>

        <StoriesRail showHead={false} />
      </section>

      <section className="section section--dark ig-feed">
        <SectionHead
          index="02"
          label={t("Instagram feed")}
          title={
            <>
              {t("Il feed,")}
              <br />
              <em>{t("senza filtri.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Il lavoro che pubblichiamo, il dietro le quinte che di solito resta fuori. Filtra per formato e apri ogni tile: dal post al progetto completo, dal brief al risultato.",
            )}
          </p>
        </SectionHead>

        <div className="ig-feed__bar">
          <span className="ig-feed__source">
            <span className="live-dot" aria-hidden />
            {instagramIsLive
              ? t("Feed sincronizzato da Instagram")
              : t("Selezione editoriale Corax")}{" "}
            · {formatDate(instagramUpdatedAt, lang)}
          </span>
          <a href={instagramProfile.url} target="_blank" rel="noreferrer">
            {t("Apri")} {instagramProfile.label}
            <ArrowUpRight size={15} aria-hidden />
          </a>
        </div>

        <InstaFeedSection posts={content.instaFeed} />

        <div className="ig-method">
          <div className="ig-method__head">
            <span className="eyebrow">{t("Il metodo")}</span>
            <h3>
              {t("Non un canale.")}
              <br />
              <em>{t("Una regia.")}</em>
            </h3>
          </div>
          <ol className="ig-method__list">
            {method.map((step) => (
              <li key={step.kicker}>
                <span className="ig-method__icon" aria-hidden>
                  <step.icon size={17} strokeWidth={1.6} />
                </span>
                <span className="ig-method__kicker">{t(step.kicker)}</span>
                <strong>{t(step.title)}</strong>
                <p>{t(step.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper ig-archive">
        <SectionHead
          index="03"
          label={t("Archivio")}
          title={
            <>
              {t("Tutte le iniziative.")}
              <br />
              <em>{t("In ordine.")}</em>
            </>
          }
          action={{ label: t("Tutti i progetti"), to: "/progetti" }}
        >
          <p>
            {t(
              "Non solo le ultime. Ogni iniziativa è una card con la sua data, il suo caso e i suoi risultati. Filtra per categoria, apri il progetto e guarda cosa abbiamo costruito.",
            )}
          </p>
        </SectionHead>

        <InitiativeArchive items={content.initiatives} />
      </section>

      <CTABand
        kicker={t("Il prossimo capitolo")}
        title={t("La prossima iniziativa può essere la tua.")}
        text={t(
          "Raccontaci cosa vuoi costruire. Ti rispondiamo entro un giorno lavorativo con la squadra giusta e un primo passo concreto.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Lavora con noi"), to: "/lavora-con-noi" }}
      />
    </>
  );
}
