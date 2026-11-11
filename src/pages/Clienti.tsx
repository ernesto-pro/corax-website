import { PageHero, CTABand } from "../components/PageHero";
import { SectionHead } from "../components/UI";
import { ClientCard } from "../components/Cards";
import { BrandLogo } from "../components/BrandLogo";
import { clients } from "../data/projects";
import { Marquee } from "../components/UI";
import { useContent, useT } from "../i18n/translate";

const principles = [
  {
    title: "Un solo interlocutore",
    text: "Account, strategia, produzione e talent lavorano nella stessa stanza. Meno passaggi, più responsabilità.",
  },
  {
    title: "Dal brief alla distribuzione",
    text: "Non consegniamo un'idea e sparire. La portiamo in produzione, la distribuiamo e la misuriamo.",
  },
  {
    title: "Creatività misurabile",
    text: "Ogni progetto nasce con obiettivi chiari e viene letto con i dati, non con gli aggettivi.",
  },
  {
    title: "Relazioni lunghe",
    text: "La maggior parte delle collaborazioni nasce per un progetto e continua perché funziona.",
  },
];

export function Clienti() {
  const content = useContent();
  const t = useT();

  return (
    <>
      <PageHero
        index="05"
        label={t("Clienti")}
        title={
          <>
            {t("Brand, partner,")}
            <br />
            <em>{t("complici.")}</em>
          </>
        }
        lede={t(
          "Non lavoriamo per i clienti: lavoriamo con loro. Ogni collaborazione è un pezzo di sistema che mette insieme strategia, produzione, talenti e tecnologia.",
        )}
        meta={[
          { label: t("Progetti conclusi"), value: "250+" },
          { label: t("Soddisfazione clienti"), value: "96%" },
          { label: t("Brand e partner"), value: "22" },
          { label: t("Unit coinvolte"), value: "4" },
        ]}
      />

      <Marquee items={clients} className="marquee--clients" speed={54} separator="✳" />

      <section className="section section--paper clients-page">
        <SectionHead
          index="01"
          label={t("Profili")}
          title={
            <>
              {t("Le collaborazioni,")}
              <br />
              <em>{t("una per una.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Una selezione di brand con cui abbiamo costruito campagne, format e piattaforme. Per ognuno trovi il contesto, il lavoro fatto e i progetti collegati.",
            )}
          </p>
        </SectionHead>

        <div className="clients-grid">
          {content.clients.map((client, i) => (
            <ClientCard key={client.slug} client={client} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--dark clients-how">
        <SectionHead
          index="02"
          label={t("Come lavoriamo")}
          title={
            <>
              {t("Un partner,")}
              <br />
              <em>{t("non un fornitore.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Il valore di Corax non è una singola competenza, ma la possibilità di tenere insieme strategia, produzione, talenti e tecnologia sotto un'unica regia.",
            )}
          </p>
        </SectionHead>

        <div className="clients-how__grid">
          {principles.map((item, i) => (
            <div className="clients-how__item" key={item.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--paper clients-wall">
        <SectionHead
          index="03"
          label={t("Brand & partner")}
          title={t("Tutti gli altri, uno per uno.")}
        >
          <p>
            {t(
              "Oltre ai profili raccontati, negli anni abbiamo lavorato con brand, istituzioni e piattaforme in settori diversi. Qui ci sono tutti.",
            )}
          </p>
        </SectionHead>
        <div className="logo-wall" aria-label={t("Brand e partner Corax")}>
          {clients.map((client) => (
            <span key={client} className="logo-wall__item logo-wall__item--logo">
              <BrandLogo name={client} plain />
            </span>
          ))}
        </div>
        <p className="clients-wall__note">
          {t(
            "I profili approfonditi raccontano le collaborazioni documentate nel portfolio. Per richieste su altri progetti o referenze, scrivici.",
          )}
        </p>
      </section>

      <CTABand
        kicker={t("Il prossimo cliente")}
        title={t("Il tuo brand, dentro il sistema.")}
        text={t(
          "Raccontaci obiettivi, pubblico e tempistiche. Ti diremo con quale squadra possiamo arrivarci.",
        )}
        secondary={{ label: t("Scopri il sistema"), to: "/sistema" }}
      />
    </>
  );
}
