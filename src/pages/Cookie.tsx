import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { LegalPage } from "../components/Legal";
import type { LegalSection } from "../components/Legal";
import { site } from "../data/site";
import { useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

function CookieSettings() {
  const t = useT();
  const [analytics, setAnalytics] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAnalytics(window.localStorage.getItem("corax-consent") === "all");
  }, []);

  const save = (value: "all" | "essential") => {
    window.localStorage.setItem("corax-consent", value);
    setAnalytics(value === "all");
    setSaved(true);
  };

  return (
    <div className="cookie-panel">
      <div className="cookie-panel__head">
        <span className="eyebrow">{t("Preferenze")}</span>
        <h2>{t("Gestisci il consenso.")}</h2>
        <p>
          {t(
            "Puoi cambiare idea in qualsiasi momento. Le preferenze sono salvate solo nel tuo browser.",
          )}
        </p>
      </div>
      <div className="cookie-panel__rows">
        <div className="cookie-panel__row">
          <div>
            <h3>{t("Tecnici — necessari")}</h3>
            <p>{t("Indispensabili per il funzionamento del sito e per ricordare questa scelta.")}</p>
          </div>
          <span className="cookie-panel__always">{t("Sempre attivi")}</span>
        </div>
        <div className="cookie-panel__row">
          <div>
            <h3>{t("Misurazione — opzionali")}</h3>
            <p>
              {t("Ci aiutano a capire quali contenuti funzionano, in forma aggregata e anonima.")}
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={analytics}
            className={`switch ${analytics ? "is-on" : ""}`}
            onClick={() => {
              setAnalytics((v) => !v);
              setSaved(false);
            }}
          >
            <span className="switch__dot" aria-hidden />
            <span className="sr-only">
              {analytics ? t("Disattiva cookie di misurazione") : t("Attiva cookie di misurazione")}
            </span>
          </button>
        </div>
      </div>
      <div className="cookie-panel__foot">
        <button className="btn btn--primary btn--sm" onClick={() => save(analytics ? "all" : "essential")}>
          <span className="btn__label">{t("Salva preferenze")}</span>
        </button>
        <button className="btn btn--ghost btn--sm" onClick={() => save("essential")}>
          <span className="btn__label">{t("Solo essenziali")}</span>
        </button>
        {saved && (
          <span className="cookie-panel__saved" role="status">
            <Check size={14} aria-hidden /> {t("Preferenze salvate")}
          </span>
        )}
      </div>
    </div>
  );
}

export function Cookie() {
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const sections: LegalSection[] = [
    {
      id: "cosa",
      title: t("Cosa sono i cookie"),
      content: (
        <>
          <p>
            {t(
              "I cookie sono piccoli file di testo che i siti visitati inviano al browser dell’utente, dove vengono memorizzati per essere ritrasmessi agli stessi siti alla visita successiva. Servono a far funzionare il sito, a ricordare le preferenze e a raccogliere informazioni sull’esperienza di navigazione.",
            )}
          </p>
          <p>
            {t(
              "Tecnologie analoghe — come local storage, pixel o tag — funzionano in modo simile e sono trattate nella presente policy.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "tipologie",
      title: t("Le tipologie che usiamo"),
      content: (
        <>
          <ul>
            <li>
              <strong>{t("Cookie tecnici o necessari.")}</strong>{" "}
              {t(
                "Consentono il funzionamento del sito e delle sue funzioni di base, come la memorizzazione delle preferenze sui cookie. Non richiedono consenso.",
              )}
            </li>
            <li>
              <strong>{t("Cookie di misurazione.")}</strong>{" "}
              {t(
                "Raccolgono informazioni aggregate su pagine visitate, sorgenti di traffico e interazioni, per capire cosa funziona. Sono attivati solo previo consenso.",
              )}
            </li>
            <li>
              <strong>{t("Cookie di terze parti.")}</strong>{" "}
              {t(
                "Impostati da servizi esterni eventualmente integrati (ad esempio player video o piattaforme di analisi). Sono regolati dalle rispettive informative.",
              )}
            </li>
          </ul>
          <p>
            {t(
              "Il sito non utilizza cookie di profilazione pubblicitaria propri. Le immagini e i video sono serviti direttamente dal dominio del sito.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "elenco",
      title: t("Cookie utilizzati"),
      content: (
        <div className="cookie-table">
          <div className="cookie-table__row cookie-table__row--head">
            <span>{t("Nome")}</span>
            <span>{t("Tipologia")}</span>
            <span>{t("Finalità")}</span>
            <span>{t("Durata")}</span>
          </div>
          <div className="cookie-table__row">
            <span data-label={t("Nome")}>corax-consent</span>
            <span data-label={t("Tipologia")}>{t("Tecnico")}</span>
            <span data-label={t("Finalità")}>{t("Memorizza la scelta sui cookie")}</span>
            <span data-label={t("Durata")}>{t("Persistente (local storage)")}</span>
          </div>
          <div className="cookie-table__row">
            <span data-label={t("Nome")}>_ga / _ga_*</span>
            <span data-label={t("Tipologia")}>{t("Misurazione (terze parti)")}</span>
            <span data-label={t("Finalità")}>
              {t("Statistiche aggregate sulle visite, se attivate")}
            </span>
            <span data-label={t("Durata")}>{t("Fino a 24 mesi")}</span>
          </div>
          <div className="cookie-table__row">
            <span data-label={t("Nome")}>{t("Sessione")}</span>
            <span data-label={t("Tipologia")}>{t("Tecnico")}</span>
            <span data-label={t("Finalità")}>{t("Navigazione e sicurezza della sessione")}</span>
            <span data-label={t("Durata")}>{t("Sessione")}</span>
          </div>
        </div>
      ),
    },
    {
      id: "consenso",
      title: t("Consenso e revoca"),
      content: (
        <>
          <p>
            {t(
              "Alla prima visita puoi accettare tutti i cookie oppure mantenere solo quelli essenziali. Puoi modificare la scelta in qualsiasi momento dal pannello qui sopra, oppure cancellando i dati del sito dalle impostazioni del browser.",
            )}
          </p>
          <p>
            {t(
              "Il rifiuto dei cookie di misurazione non pregiudica l’accesso ai contenuti e alle funzioni del sito.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "browser",
      title: t("Gestione dal browser"),
      content: (
        <>
          <p>
            {t(
              "Puoi configurare il browser per bloccare o eliminare i cookie. Le modalità variano in base al browser utilizzato; di seguito i collegamenti alle guide più comuni:",
            )}
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647?hl=it" target="_blank" rel="noreferrer">Google Chrome</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a></li>
            <li><a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-reni" target="_blank" rel="noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noreferrer">Microsoft Edge</a></li>
          </ul>
          <p>
            {t("La disattivazione dei cookie tecnici può compromettere alcune funzionalità del sito.")}
          </p>
        </>
      ),
    },
    {
      id: "riferimenti",
      title: t("Riferimenti e contatti"),
      content: (
        <>
          <p>
            {t("Per informazioni sul trattamento dei dati personali consulta la")}{" "}
            <Link to={to("/privacy")}>Privacy Policy</Link>.{" "}
            {t("Per qualsiasi richiesta scrivi a")}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p>
            {t("Titolare del trattamento:")} {site.legalName}, {site.address.full},{" "}
            {t("P. IVA")} {site.vat}.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      index="10"
      label="Cookie"
      title={
        <>
          {t("Pochi cookie.")}
          <br />
          <em>{t("Nessun biscotto di troppo.")}</em>
        </>
      }
      lede={t(
        "Informativa sull’uso dei cookie e delle tecnologie di tracciamento. Cosa usiamo, perché e come cambiare idea.",
      )}
      updated={t("11 novembre 2026")}
      sections={sections}
    >
      <CookieSettings />
    </LegalPage>
  );
}
