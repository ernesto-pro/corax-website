import { LegalPage } from "../components/Legal";
import type { LegalSection } from "../components/Legal";
import { Link } from "react-router-dom";
import { site } from "../data/site";
import { useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export function Privacy() {
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const sections: LegalSection[] = [
    {
      id: "titolare",
      title: t("Titolare del trattamento"),
      content: (
        <>
          <p>
            {t("Il titolare del trattamento dei dati personali è")} <strong>{site.legalName}</strong>
            {t(", con sede legale in")} {site.address.full}, {t("P. IVA")} {site.vat}.
          </p>
          <p>
            {t(
              "Per qualsiasi questione relativa alla protezione dei dati personali è possibile scrivere a",
            )}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </>
      ),
    },
    {
      id: "dati",
      title: t("Quali dati raccogliamo"),
      content: (
        <>
          <p>
            {t(
              "Raccogliamo esclusivamente i dati necessari alle finalità descritte nella presente informativa:",
            )}
          </p>
          <ul>
            <li>
              <strong>{t("Dati di contatto")}</strong>{" "}
              {t(
                "— nome, cognome, indirizzo email, azienda, numero di telefono e contenuto del messaggio, forniti volontariamente tramite form, email o richiesta di appuntamento.",
              )}
            </li>
            <li>
              <strong>{t("Dati di navigazione")}</strong>{" "}
              {t(
                "— informazioni tecniche trasmesse automaticamente dal browser, come indirizzo IP, tipo di dispositivo, pagina di provenienza e pagine visitate. Sono utilizzati in forma aggregata per garantire la sicurezza e migliorare il sito.",
              )}
            </li>
            <li>
              <strong>{t("Cookie e tecnologie analoghe")}</strong>{" "}
              {t("— secondo quanto descritto nella")} <Link to={to("/cookie")}>Cookie Policy</Link>.
            </li>
            <li>
              <strong>{t("Candidature")}</strong>{" "}
              {t(
                "— dati anagrafici, curriculum, portfolio e informazioni professionali inviate spontaneamente per posizioni aperte o collaborazioni.",
              )}
            </li>
          </ul>
          <p>
            {t(
              "Non raccogliamo categorie particolari di dati (art. 9 GDPR) né dati di minori di 16 anni. Ti chiediamo di non inserire nel messaggio informazioni sensibili non necessarie.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "finalita",
      title: t("Finalità e base giuridica"),
      content: (
        <>
          <p>{t("Trattiamo i dati per le seguenti finalità:")}</p>
          <ul>
            <li>
              <strong>{t("Rispondere alle richieste")}</strong>{" "}
              {t(
                "e gestire il rapporto precontrattuale o contrattuale — base giuridica: esecuzione di un contratto o misure precontrattuali (art. 6, par. 1, lett. b GDPR).",
              )}
            </li>
            <li>
              <strong>{t("Gestire candidature e selezione")}</strong>{" "}
              {t(
                "— base giuridica: consenso dell’interessato (art. 6, par. 1, lett. a GDPR) e, ove applicabile, esecuzione di misure precontrattuali.",
              )}
            </li>
            <li>
              <strong>{t("Adempiere a obblighi di legge")}</strong>{" "}
              {t("— base giuridica: obbligo legale (art. 6, par. 1, lett. c GDPR).")}
            </li>
            <li>
              <strong>{t("Misurare e migliorare il sito")}</strong>
              {t(
                ", con cookie analitici di terze parti configurati in forma aggregata — base giuridica: consenso (art. 6, par. 1, lett. a GDPR), revocabile in qualsiasi momento.",
              )}
            </li>
            <li>
              <strong>{t("Tutelare i diritti del titolare")}</strong>{" "}
              {t(
                "in caso di contenzioso — base giuridica: legittimo interesse (art. 6, par. 1, lett. f GDPR).",
              )}
            </li>
          </ul>
          <p>
            {t(
              "Il conferimento dei dati contrassegnati con asterisco è necessario per dare seguito alla richiesta; il mancato conferimento può rendere impossibile rispondere.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "modalita",
      title: t("Modalità del trattamento"),
      content: (
        <>
          <p>
            {t(
              "I dati sono trattati con strumenti informatici e telematici, secondo principi di minimizzazione, integrità, riservatezza e accountability. Adottiamo misure tecniche e organizzative adeguate a proteggerli da accessi non autorizzati, perdita o divulgazione.",
            )}
          </p>
          <p>
            {t(
              "L’accesso è limitato al personale autorizzato e ai fornitori nominati responsabili del trattamento ai sensi dell’art. 28 GDPR.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "destinatari",
      title: t("Destinatari e trasferimenti"),
      content: (
        <>
          <p>
            {t(
              "I dati possono essere comunicati a fornitori di servizi tecnici (hosting, posta elettronica, analisi del traffico, CRM), nominati responsabili del trattamento, e a consulenti professionali, nei limiti delle rispettive competenze.",
            )}
          </p>
          <p>
            {t(
              "Alcuni fornitori possono avere sede fuori dallo Spazio Economico Europeo. In tal caso il trasferimento avviene sulla base di decisioni di adeguatezza o clausole contrattuali tipo approvate dalla Commissione europea (art. 45 e 46 GDPR), con misure supplementari ove necessarie.",
            )}
          </p>
          <p>
            {t(
              "I dati non sono venduti né ceduti a terzi per finalità di marketing autonomo.",
            )}
          </p>
        </>
      ),
    },
    {
      id: "conservazione",
      title: t("Periodo di conservazione"),
      content: (
        <>
          <p>{t("Conserviamo i dati per il tempo strettamente necessario alle finalità:")}</p>
          <ul>
            <li>
              {t(
                "richieste di contatto: fino a 24 mesi dall’ultima interazione, salvo rapporti in corso;",
              )}
            </li>
            <li>
              {t(
                "candidature: fino a 24 mesi dalla ricezione, salvo consenso a ulteriori valutazioni;",
              )}
            </li>
            <li>{t("dati contabili e fiscali: per il periodo previsto dalla legge (10 anni);")}</li>
            <li>
              {t(
                "dati di navigazione: per il periodo tecnico necessario e, per gli analytics, secondo le impostazioni indicate nella Cookie Policy.",
              )}
            </li>
          </ul>
          <p>{t("Decorso il termine, i dati sono cancellati o resi anonimi in modo irreversibile.")}</p>
        </>
      ),
    },
    {
      id: "diritti",
      title: t("I tuoi diritti"),
      content: (
        <>
          <p>
            {t(
              "In qualità di interessato puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 GDPR:",
            )}
          </p>
          <ul>
            <li>{t("accedere ai tuoi dati e ottenere una copia;")}</li>
            <li>{t("chiedere la rettifica o l’aggiornamento;")}</li>
            <li>{t("chiedere la cancellazione, nei casi previsti;")}</li>
            <li>{t("chiedere la limitazione del trattamento;")}</li>
            <li>{t("opporti al trattamento basato su legittimo interesse;")}</li>
            <li>{t("ricevere i dati in formato strutturato e portabile;")}</li>
            <li>
              {t(
                "revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.",
              )}
            </li>
          </ul>
          <p>
            {t("Per esercitare i diritti scrivi a")}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.{" "}
            {t("Risponderemo entro 30 giorni, prorogabili in caso di particolare complessità.")}
          </p>
          <p>
            {t(
              "Se ritieni che il trattamento violi la normativa, puoi proporre reclamo al",
            )}{" "}
            <a href="https://www.garanteprivacy.it/" target="_blank" rel="noreferrer">
              {t("Garante per la protezione dei dati personali")}
            </a>{" "}
            {t("o all’autorità di controllo competente.")}
          </p>
        </>
      ),
    },
    {
      id: "modifiche",
      title: t("Modifiche all’informativa"),
      content: (
        <>
          <p>
            {t(
              "Ci riserviamo di aggiornare la presente informativa per adeguarla a novità normative o organizzative. La versione vigente è sempre pubblicata su questa pagina, con indicazione della data di ultimo aggiornamento.",
            )}
          </p>
          <p>
            {t("Per domande su questa informativa o sul trattamento dei dati, scrivi a")}{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </>
      ),
    },
  ];

  return (
    <LegalPage
      index="09"
      label="Privacy"
      title={
        <>
          {t("I tuoi dati.")}
          <br />
          <em>{t("Le nostre regole.")}</em>
        </>
      }
      lede={t(
        "Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR). In chiaro, senza giri di parole.",
      )}
      updated={t("11 novembre 2026")}
      sections={sections}
    >
      <p className="legal__intro">
        {t("Questa informativa descrive come")} {site.legalName}{" "}
        {t(
          "raccoglie, utilizza e protegge i dati personali delle persone che visitano il sito, scrivono al team, si candidano o collaborano con noi. Non è un documento decorativo: è il modo in cui trattiamo la tua fiducia.",
        )}
      </p>
    </LegalPage>
  );
}
