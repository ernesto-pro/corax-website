import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Plus } from "lucide-react";
import { useState } from "react";
import { PageHero, CTABand, SplitStatement } from "../components/PageHero";
import { SectionHead } from "../components/UI";
import { site } from "../data/site";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

const roles = [
  {
    title: "Social Media Manager",
    team: "Agency",
    place: "Milano · Ibrido",
    type: "Full time",
    text: "Gestisci la presenza social di brand nazionali: architettura editoriale, calendario, copy e relazione con le community. Cerchiamo qualcuno che sappia leggere i dati senza perdere il tono di voce.",
  },
  {
    title: "Art Director",
    team: "Agency",
    place: "Milano · Ibrido",
    type: "Full time",
    text: "Dai forma a campagne e format social-first, dal concept all'esecuzione. Portfolio richiesto: ci interessa come pensi, non solo come impagini.",
  },
  {
    title: "Video Editor & Motion",
    team: "Media House",
    place: "Milano · On site",
    type: "Full time",
    text: "Monti format lunghi, clip verticali e contenuti branded. Premiere, After Effects e una sensibilità da regia: il resto lo costruiamo insieme.",
  },
  {
    title: "Producer",
    team: "Media House",
    place: "Milano · On site",
    type: "Full time",
    text: "Coordini produzioni multi-camera, set, ospiti e post-produzione. Sai tenere insieme creatività, tempi e budget senza far perdere qualità al racconto.",
  },
  {
    title: "Talent Manager",
    team: "Talent",
    place: "Milano · Ibrido",
    type: "Full time",
    text: "Segui il roster nella crescita editoriale e commerciale: scouting, posizionamento, partnership e sviluppo di format. Relazione prima di tutto.",
  },
  {
    title: "Sales — Branded Content",
    team: "Agency",
    place: "Milano · Ibrido",
    type: "Full time",
    text: "Porti il sistema Corax sul mercato: brand, centri media e agenzie. Esperienza nella vendita di progetti editoriali e branded entertainment.",
  },
  {
    title: "Full Stack Developer",
    team: "Tech",
    place: "Milano · Remoto",
    type: "Full time",
    text: "Costruisci piattaforme, dashboard e prodotti interni. React, TypeScript e una curiosità vera per il modo in cui i media funzionano.",
  },
];

const perks = [
  ["Un sistema, non una casella", "Lavori su agenzia, media e talenti. Puoi cambiare prospettiva senza cambiare azienda."],
  ["Produzione interna", "Studi, regia, post, audio: le idee non aspettano un fornitore per diventare contenuti."],
  ["Crescita misurata", "Feedback, obiettivi e percorsi chiari. La crescita del gruppo è anche la tua."],
  ["Milano, La Vela", "Una sede in espansione, 1.500 mq tra uffici e set, in un quartiere che cambia."],
];

export function LavoraConNoi() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const [open, setOpen] = useState<number | null>(0);

  const applyHref = (role: string) => {
    const subject = `[Corax] ${t("Candidatura")} — ${role}`;
    const body = `${t("Ciao Corax,")}\n\n${t("mi candido per la posizione di")} ${role}.\n\n${t(
      "Chi sono:",
    )}\n\n${t("Perché Corax:")}\n\n${t("Link / portfolio:")}\n\n${t("Grazie,")}\n`;
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <PageHero
        index="08"
        label={t("Lavora con noi")}
        title={
          <>
            {t("Persone,")}
            <br />
            {t("prima dei")} <em>{t("profili.")}</em>
          </>
        }
        lede={t(
          "Non assumiamo caselle da riempire. Cerchiamo persone con un'ossessione, una voce e la voglia di costruire media che durano. Se ti riconosci, leggi qui sotto.",
        )}
        meta={[
          { label: t("Persone"), value: "73" },
          { label: t("Crescita organico 2026"), value: "+100%" },
          { label: t("Unit"), value: "4" },
        ]}
      />

      <section className="section section--paper careers-intro">
        <SplitStatement
          index="01"
          label={t("Perché Corax")}
          aside={
            <div className="careers-intro__aside">
              <p className="eyebrow">{t("In numeri")}</p>
              <p className="careers-intro__big">{t("12 MLN")}</p>
              <p>
                {t("L'obiettivo di fatturato 2026. Il percorso lo costruiamo con le persone che entrano.")}
              </p>
            </div>
          }
        >
          <span className="eyebrow">{t("Il patto")}</span>
          <h2 className="statement">
            {t("Ti diamo un sistema.")} <em>{t("Tu porti il punto di vista.")}</em>
          </h2>
          <div className="manifesto__cols">
            <p>
              {t(
                "In Corax non esiste un reparto creativo separato dal resto. Strategist, autori, producer, editor, talent manager e sviluppatori lavorano sugli stessi progetti, nella stessa stanza. È così che un'idea diventa un format e un format diventa una property.",
              )}
            </p>
            <p>
              {t(
                "Cerchiamo persone che sappiano stare nel disordine creativo senza perdere il rigore. Persone che guardano i numeri e, allo stesso tempo, si innamorano di una storia ben raccontata. Il resto lo impariamo insieme.",
              )}
            </p>
          </div>
        </SplitStatement>
      </section>

      <section className="section section--dark careers-roles">
        <SectionHead
          index="02"
          label={t("Posizioni aperte")}
          title={
            <>
              {t("Chi stiamo")}
              <br />
              <em>{t("cercando.")}</em>
            </>
          }
        >
          <p>
            {t(
              "Le posizioni aggiornate al 2026. Non trovi la tua? Mandaci una candidatura spontanea: leggiamo tutto.",
            )}
          </p>
        </SectionHead>

        <div className="roles">
          {roles.map((role, i) => {
            const isOpen = open === i;
            return (
              <div className={`role ${isOpen ? "is-open" : ""}`} key={role.title}>
                <button
                  className="role__head"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`role-${i}`}
                >
                  <span className="role__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="role__title">
                    <h3>{t(role.title)}</h3>
                    <span className="role__meta">
                      <span>{t(role.team)}</span>
                      <span>
                        <MapPin size={12} aria-hidden /> {t(role.place)}
                      </span>
                      <span>{t(role.type)}</span>
                    </span>
                  </span>
                  <span className="role__icon" aria-hidden>
                    <Plus size={18} strokeWidth={1.6} />
                  </span>
                </button>
                <div className="role__body" id={`role-${i}`} hidden={!isOpen}>
                  <p>{t(role.text)}</p>
                  <a href={applyHref(t(role.title))} className="arrow-link">
                    <span>
                      {t("Candidati per")} {t(role.title)}
                    </span>
                    <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section section--lavender careers-values">
        <SectionHead
          index="03"
          label={t("Il modo in cui lavoriamo")}
          title={t("Quattro principi. Nessun poster in sala riunioni.")}
        >
          <p>{t("I criteri con cui scegliamo le persone sono gli stessi con cui scegliamo i progetti.")}</p>
        </SectionHead>
        <div className="values__grid">
          {content.company.values.map((v, i) => (
            <div className="value-card" key={v.title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--paper careers-perks">
        <SectionHead index="04" label={t("Cosa trovi")} title={t("Oltre il contratto.")}>
          <p>{t("Le cose che rendono Corax un posto diverso in cui lavorare — e crescere.")}</p>
        </SectionHead>
        <div className="perks">
          {perks.map(([title, text], i) => (
            <div className="perk" key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(title)}</h3>
              <p>{t(text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section--dark careers-talent">
        <div className="careers-talent__body">
          <span className="eyebrow">{t("Talenti & creator")}</span>
          <h2>
            {t("Non cerchiamo follower.")}
            <br />
            <em>{t("Cerchiamo voci.")}</em>
          </h2>
          <p>
            {t(
              "Se hai un'ossessione, un linguaggio riconoscibile e la capacità di metterti in discussione, il roster Corax può essere il posto giusto. Raccontaci chi sei, cosa fai e cosa vorresti costruire: non serve un profilo perfetto.",
            )}
          </p>
          <div className="careers-talent__actions">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(`[Corax] ${t("Proposta talento")}`)}`}
              className="btn btn--light"
            >
              <span className="btn__label">{t("Proponi il tuo profilo")}</span>
              <span className="btn__icon" aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </a>
            <Link to={to("/talent")} className="btn btn--ghost-light">
              <span className="btn__label">{t("Scopri il roster")}</span>
            </Link>
          </div>
        </div>
      </section>

      <CTABand
        kicker={t("Candidatura spontanea")}
        title={t("Non c'è la posizione giusta? Inventiamola.")}
        text={t(
          "Scrivici cosa sai fare e cosa vorresti fare. Se c'è spazio per costruirlo, lo costruiamo.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Chi siamo"), to: "/chi-siamo" }}
      />
    </>
  );
}
