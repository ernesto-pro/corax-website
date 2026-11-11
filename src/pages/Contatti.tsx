import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { FAQ } from "../components/FAQ";
import { SectionHead } from "../components/UI";
import { getScanFocus, getScanLevelById, type ScanFocus } from "../data/growthScan";
import { site } from "../data/site";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

type Errors = Partial<Record<"name" | "email" | "message" | "privacy", string>>;

const projectTypes = [
  "Campagna social",
  "Influencer marketing",
  "Branded entertainment",
  "Produzione / format",
  "Podcast & vodcast",
  "Talent partnership",
  "Piattaforma / tech",
  "Stampa & media",
  "Altro",
];

const budgets = ["Da definire", "< 25.000 €", "25.000 – 50.000 €", "50.000 – 100.000 €", "> 100.000 €"];

const scanTypeByFocus: Record<ScanFocus, string> = {
  agency: "Campagna social",
  "media-house": "Produzione / format",
  talent: "Talent partnership",
  tech: "Piattaforma / tech",
};

export function Contatti() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const scanScore = Number(params.get("score"));
  const scanLevel = getScanLevelById(params.get("level"));
  const scanFocus = getScanFocus(params.get("focus"));
  const scanGoal = params.get("goal") ?? "";
  const localizedLevel = scanLevel
    ? content.scan.levels.find((level) => level.id === scanLevel.id) ?? scanLevel
    : undefined;
  const hasScan =
    Boolean(scanLevel) && Number.isFinite(scanScore) && scanScore >= 25 && scanScore <= 100;

  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    type: projectTypes[0],
    budget: budgets[0],
    message: "",
    privacy: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const appliedScan = useRef<string | null>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const id = useId();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (sent) sentRef.current?.focus();
  }, [sent]);

  useEffect(() => {
    if (!hasScan || !localizedLevel) return;
    const key = location.search;
    if (appliedScan.current === key) return;
    appliedScan.current = key;
    setValues((v) => ({
      ...v,
      type: scanTypeByFocus[scanFocus],
      message: `${t("Ho fatto il Corax Score:")} ${Math.round(scanScore)}/100 — ${t("Livello")} ${
        localizedLevel.id
      }, ${localizedLevel.name}.${scanGoal ? `\n${t("Obiettivo:")} ${scanGoal}.` : ""}\n${t(
        "Priorità:",
      )} ${localizedLevel.move}\n\n`,
    }));
  }, [hasScan, lang, location.search, scanFocus, scanGoal, localizedLevel, scanScore]);

  const update = (key: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const subject = `[Corax] ${t(values.type)} — ${values.company || values.name || t("Nuovo progetto")}`;
  const body = [
    `${t("Nome:")} ${values.name}`,
    values.company ? `${t("Azienda / progetto:")} ${values.company}` : "",
    `${t("Email:")} ${values.email}`,
    `${t("Tipo di progetto:")} ${t(values.type)}`,
    `${t("Budget indicativo:")} ${t(values.budget)}`,
    "",
    t("Messaggio:"),
    values.message,
    "",
    t("— Inviato dal sito corax.it"),
  ]
    .filter(Boolean)
    .join("\n");
  const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

  const copyBrief = async () => {
    const text = `${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (values.name.trim().length < 2) next.name = "Scrivi il tuo nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = "Inserisci un indirizzo email valido.";
    if (values.message.trim().length < 20)
      next.message = "Raccontaci il progetto in almeno 20 caratteri.";
    if (!values.privacy) next.privacy = "Serve il consenso per inviare la richiesta.";
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = document.querySelector<HTMLElement>("[data-invalid='true']");
      first?.focus();
      return;
    }

    window.location.href = mailtoHref;
    setSent(true);
  };

  return (
    <>
      <PageHero
        index="07"
        label={t("Contatti")}
        title={
          <>
            {t("Partiamo")}
            <br />
            {t("da una")} <em>{t("conversazione.")}</em>
          </>
        }
        lede={t(
          "Niente form infiniti. Raccontaci obiettivo, contesto e tempi: ti rispondiamo entro un giorno lavorativo con una prima direzione concreta.",
        )}
        meta={[
          { label: t("Sede"), value: t("Milano") },
          { label: t("Risposta"), value: t("Entro 24h") },
          { label: t("Email"), value: site.email },
        ]}
      />

      <section className="section section--paper contact">
        <div className="contact__aside">
          <div className="contact__block">
            <span className="eyebrow">{t("Scrivici")}</span>
            <a href={`mailto:${site.email}`} className="contact__big">
              {site.email}
              <ArrowUpRight size={26} strokeWidth={1.3} aria-hidden />
            </a>
            <p>
              {t(
                "Per progetti, partnership e richieste stampa. Se hai già un brief, allegalo al primo messaggio: aiuta a capire prima.",
              )}
            </p>
          </div>

          <div className="contact__rows">
            <div className="contact__row">
              <span className="contact__icon" aria-hidden>
                <MapPin size={17} strokeWidth={1.6} />
              </span>
              <div>
                <p className="contact__label">{t("Dove siamo")}</p>
                <p>{site.address.full}</p>
                <a href={site.address.maps} target="_blank" rel="noreferrer">
                  {t("Apri in mappe")} <ArrowUpRight size={13} aria-hidden />
                </a>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__icon" aria-hidden>
                <Mail size={17} strokeWidth={1.6} />
              </span>
              <div>
                <p className="contact__label">{t("Email")}</p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </div>
            </div>
            <div className="contact__row">
              <span className="contact__icon" aria-hidden>
                <Phone size={17} strokeWidth={1.6} />
              </span>
              <div>
                <p className="contact__label">{t("Telefono")}</p>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                <p className="contact__note">{t("Su appuntamento, dal lunedì al venerdì.")}</p>
              </div>
            </div>
          </div>

          <div className="contact__socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} <ArrowUpRight size={13} aria-hidden />
              </a>
            ))}
          </div>

          <p className="contact__talent">
            {t("Sei un talento o un creator?")}{" "}
            <Link to={to("/lavora-con-noi")}>{t("Entra nel roster Corax")}</Link>.
          </p>
        </div>

        <div className="contact__form-wrap">
          {sent ? (
            <div className="contact__sent">
              <span className="contact__sent-icon" aria-hidden>
                <Check size={26} strokeWidth={1.6} />
              </span>
              <h2 ref={sentRef} tabIndex={-1} className="contact__sent-title">
                {t("Bozza pronta. Ora tocca a te.")}
              </h2>
              <p>
                {t(
                  "Abbiamo aperto il client di posta con oggetto e messaggio già scritti. Se non è successo, riapri il brief qui sotto oppure copialo e incollalo dove preferisci. Rispondiamo entro 24 ore lavorative.",
                )}
              </p>
              <div className="contact__sent-actions">
                <a href={mailtoHref} className="btn btn--primary">
                  <span className="btn__label">{t("Apri di nuovo")}</span>
                  <span className="btn__icon" aria-hidden>
                    <ArrowUpRight size={16} />
                  </span>
                </a>
                <button type="button" className="btn btn--ghost" onClick={copyBrief}>
                  <span className="btn__label">{copied ? t("Brief copiato") : t("Copia il brief")}</span>
                  <span className="btn__icon" aria-hidden>
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </span>
                </button>
              </div>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? t("Brief copiato negli appunti.") : ""}
              </span>
              <p className="contact__sent-note">
                {t("Preferisci scrivere a mano?")}{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
              <button
                type="button"
                className="contact__sent-reset"
                onClick={() => {
                  setSent(false);
                  setCopied(false);
                  setValues((v) => ({ ...v, message: "" }));
                }}
              >
                {t("Scrivi un'altra richiesta")}
              </button>
            </div>
          ) : (
            <>
              {hydrated && hasScan && localizedLevel && (
                <div className="contact-scan">
                  <span className="contact-scan__score">
                    {Math.round(scanScore)}
                    <span>/100</span>
                  </span>
                  <div className="contact-scan__body">
                    <p className="eyebrow">
                      {t("Corax Score · Livello")} {localizedLevel.id} — {localizedLevel.name}
                    </p>
                    <p>
                      <strong>{scanGoal || localizedLevel.move}</strong> —{" "}
                      {t(
                        "il brief è già compilato con il tuo risultato. Aggiungi il contesto e siamo pronti a partire.",
                      )}
                    </p>
                  </div>
                  <Link to={to("/#growth-scan")} className="contact-scan__link">
                    {t("Rifai il test")}
                  </Link>
                </div>
              )}

              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="contact-form__head">
                  <span className="eyebrow">{t("Il tuo prossimo passo")}</span>
                  <p>{t("Due minuti per darci il contesto giusto. Il resto lo facciamo noi.")}</p>
                </div>

              <div className="contact-form__grid">
                <div className={`field ${errors.name ? "is-invalid" : ""}`}>
                  <label htmlFor={`${id}-name`}>{t("Nome e cognome *")}</label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                    data-invalid={Boolean(errors.name)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? `${id}-name-error` : undefined}
                    placeholder={t("Come ti chiami")}
                  />
                  {errors.name && (
                    <p className="field__error" id={`${id}-name-error`}>
                      {t(errors.name)}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor={`${id}-company`}>{t("Azienda / progetto")}</label>
                  <input
                    id={`${id}-company`}
                    name="company"
                    value={values.company}
                    onChange={(e) => update("company", e.target.value)}
                    autoComplete="organization"
                    placeholder={t("Facoltativo")}
                  />
                </div>

                <div className={`field ${errors.email ? "is-invalid" : ""}`}>
                  <label htmlFor={`${id}-email`}>{t("Email *")}</label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    data-invalid={Boolean(errors.email)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? `${id}-email-error` : undefined}
                    placeholder={t("nome@azienda.it")}
                  />
                  {errors.email && (
                    <p className="field__error" id={`${id}-email-error`}>
                      {t(errors.email)}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor={`${id}-type`}>{t("Di cosa hai bisogno?")}</label>
                  <select
                    id={`${id}-type`}
                    name="type"
                    value={values.type}
                    onChange={(e) => update("type", e.target.value)}
                  >
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {t(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field field--full">
                  <label htmlFor={`${id}-budget`}>{t("Budget indicativo")}</label>
                  <div className="budget">
                    {budgets.map((b) => (
                      <label key={b} className={`budget__option ${values.budget === b ? "is-active" : ""}`}>
                        <input
                          type="radio"
                          name="budget"
                          value={b}
                          checked={values.budget === b}
                          onChange={() => update("budget", b)}
                        />
                        <span>{t(b)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className={`field field--full ${errors.message ? "is-invalid" : ""}`}>
                  <label htmlFor={`${id}-message`}>{t("Il progetto *")}</label>
                  <textarea
                    id={`${id}-message`}
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    data-invalid={Boolean(errors.message)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? `${id}-message-error` : undefined}
                    placeholder={t(
                      "Obiettivi, tempistiche, pubblico, piattaforme… racconta quello che serve.",
                    )}
                  />
                  {errors.message && (
                    <p className="field__error" id={`${id}-message-error`}>
                      {t(errors.message)}
                    </p>
                  )}
                </div>
              </div>

              <label className={`check ${errors.privacy ? "is-invalid" : ""}`}>
                <input
                  type="checkbox"
                  checked={values.privacy}
                  onChange={(e) => update("privacy", e.target.checked)}
                  data-invalid={Boolean(errors.privacy)}
                  aria-invalid={Boolean(errors.privacy)}
                />
                <span>
                  {t("Ho letto la")} <Link to={to("/privacy")}>{t("privacy policy")}</Link>{" "}
                  {t("e acconsento al trattamento dei dati per essere ricontattato.")} *
                </span>
              </label>
              {errors.privacy && <p className="field__error">{t(errors.privacy)}</p>}

              <div className="contact-form__foot">
                <button type="submit" className="btn btn--primary">
                  <span className="btn__label">{t("Invia il brief")}</span>
                  <span className="btn__icon" aria-hidden>
                    <ArrowUpRight size={16} />
                  </span>
                </button>
                <p>
                  {t(
                    "Il form apre il tuo client di posta con il messaggio già compilato. Nessun dato salvato, nessuna chiamata a freddo.",
                  )}
                </p>
              </div>
              </form>
            </>
          )}
        </div>
      </section>

      <section className="section section--dark contact-office">
        <div className="contact-office__media">
          <img
            src="/img/covers/poretcast-01.jpg"
            alt={t("Il set del PoretCast negli spazi produttivi Corax")}
            loading="lazy"
            width={1600}
            height={900}
          />
        </div>
        <div className="contact-office__body">
          <span className="eyebrow">{t("La Vela — Milano")}</span>
          <h2>
            Viale Bodio 29/37.
            <br />
            <em>{t("Zona Bovisa.")}</em>
          </h2>
          <p>
            {t(
              "Uffici e studi di produzione in espansione, a pochi passi dal Politecnico e dal quartiere che cambia più velocemente di Milano. Passa a trovarci, con un appuntamento.",
            )}
          </p>
          <a href={site.address.maps} target="_blank" rel="noreferrer" className="btn btn--light">
            <span className="btn__label">{t("Indicazioni stradali")}</span>
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={16} />
            </span>
          </a>
        </div>
      </section>

      <section className="section section--paper contact-faq">
        <SectionHead
          index="08"
          label={t("Prima di scrivere")}
          title={t("Le risposte più frequenti.")}
        >
          <p>{t("Se la tua domanda è tra queste, hai già metà della risposta.")}</p>
        </SectionHead>
        <FAQ items={content.faqs.slice(0, 5)} />
      </section>
    </>
  );
}
