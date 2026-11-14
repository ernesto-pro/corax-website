import {
  Component,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { ArrowUpRight, Compass, Move, RotateCcw, X } from "lucide-react";
import { CTABand } from "../components/PageHero";
import { SectionHead, useLockBody } from "../components/UI";
import type { VelaSpace } from "../data/experience";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { optSrc, optSrcSet } from "../lib/img";

const VelaScene = lazy(() => import("../components/experience/VelaScene"));

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function SpacePanel({ space, onClose }: { space: VelaSpace; onClose: () => void }) {
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const titleId = `space-${space.slug}-title`;
  const descId = `space-${space.slug}-desc`;

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="space-panel"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="space-panel__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={panelRef}
        tabIndex={-1}
        style={{ ["--accent" as string]: space.accent }}
      >
        <div className="space-panel__media">
          {space.image && (
            <img
              src={optSrc(space.image)}
              srcSet={optSrcSet(space.image)}
              alt={space.imageAlt}
              width={1600}
              height={900}
              loading="eager"
              decoding="async"
            />
          )}
          <span className="space-panel__label">{space.imageLabel}</span>
          <button
            type="button"
            className="space-panel__close"
            onClick={onClose}
            ref={closeRef}
            aria-label={t("Chiudi la scheda dello spazio")}
          >
            <X size={20} strokeWidth={1.6} aria-hidden />
          </button>
        </div>

        <div className="space-panel__scroll">
          <header className="space-panel__head">
            <p className="space-panel__meta">
              <span>{space.index}</span>
              {space.kicker}
            </p>
            <h2 className="space-panel__title" id={titleId}>
              {space.name}
            </h2>
            <p className="space-panel__short" id={descId}>
              {space.short}
            </p>
          </header>

          <dl className="space-panel__metrics">
            {space.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>

          <div className="space-panel__intro">
            {space.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <dl className="space-panel__facts">
            {space.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>

          <section className="space-panel__block" aria-labelledby={`${titleId}-inside`}>
            <h3 id={`${titleId}-inside`}>{t("Cosa succede qui")}</h3>
            <ul className="space-panel__highlights">
              {space.highlights.map((item) => (
                <li key={item.title}>
                  <Link to={to(item.href)} onClick={onClose}>
                    <span>
                      <strong>{item.title}</strong>
                      <em>{item.text}</em>
                    </span>
                    <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <nav className="space-panel__links" aria-label={t("Approfondisci")}>
            {space.links.map((link) => (
              <Link
                key={link.href}
                to={to(link.href)}
                className="btn btn--ghost-light btn--sm"
                onClick={onClose}
              >
                <span className="btn__label">{link.label}</span>
              </Link>
            ))}
          </nav>

          <div className="space-panel__foot">
            <p>
              {t(
                "Vuoi vedere gli spazi dal vivo? La Vela è a Milano, nel Bodio Center.",
              )}
            </p>
            <Link to={to("/contatti")} className="btn btn--light btn--sm" onClick={onClose}>
              <span className="btn__label">{t("Parliamone")}</span>
              <span className="btn__icon" aria-hidden>
                <ArrowUpRight size={16} strokeWidth={1.8} />
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
}

export function Esperienza() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const velaUnits = content.vela.units;
  const velaSpaces = content.vela.spaces;
  const velaRoster = content.vela.roster;
  const velaNumbers = content.vela.numbers;

  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const activeRef = useRef<string | null>(null);
  const hoverRef = useRef<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const skipRef = useRef<(() => void) | null>(null);
  const [hoverSlug, setHoverSlug] = useState<string | null>(null);

  const activeSpace = active
    ? velaSpaces.find((space) => space.slug === active)
    : undefined;

  useLockBody(Boolean(activeSpace));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    setMounted(true);
    query.addEventListener?.("change", apply);
    return () => query.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    activeRef.current = activeSpace?.slug ?? null;
  }, [activeSpace]);

  const openSpace = useCallback((slug: string, trigger?: HTMLElement | null) => {
    let target = trigger ?? null;
    if (!target) {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-space="${slug}"]`),
      );
      target = candidates.find((el) => el.offsetParent !== null) ?? null;
    }
    lastFocus.current = target;
    setActive(slug);
  }, []);

  const closeSpace = useCallback(() => {
    setActive(null);
    hoverRef.current = null;
    setHoverSlug(null);
    window.requestAnimationFrame(() => lastFocus.current?.focus({ preventScroll: true }));
  }, []);

  const status = sceneFailed
    ? t("Versione senza 3D · WebGL non disponibile")
    : !mounted
      ? t("Scena 3D · Gli spazi di Corax")
      : !sceneReady
        ? t("Apro la scena…")
        : !entered
          ? t("Ingresso negli spazi…")
          : t("Scena attiva · 2 spazi");

  return (
    <>
      <section
        className={`vela-stage${sceneReady && !sceneFailed ? " is-live" : ""}${
          activeSpace ? " has-panel" : ""
        }`}
        id="scena"
        aria-labelledby="vela-title"
      >
        <div className="vela-stage__bg" aria-hidden />
        <div className="vela-stage__canvas">
          {mounted && !sceneFailed && (
            <SceneBoundary onError={() => setSceneFailed(true)}>
              <Suspense fallback={null}>
                <VelaScene
                  spaces={velaSpaces}
                  activeRef={activeRef}
                  hoverRef={hoverRef}
                  onSelect={(slug) => openSpace(slug)}
                  onHover={setHoverSlug}
                  onFail={() => setSceneFailed(true)}
                  onReady={() => setSceneReady(true)}
                  onEntered={() => setEntered(true)}
                  skipRef={skipRef}
                  reduced={reduced}
                />
              </Suspense>
            </SceneBoundary>
          )}

          {sceneReady && !sceneFailed && !entered && (
            <button
              type="button"
              className="vela-stage__skip-intro"
              onClick={() => skipRef.current?.()}
            >
              {t("Salta l'ingresso")}
            </button>
          )}
        </div>
        <div className="vela-stage__vignette" aria-hidden />
        <div className="vela-stage__grain" aria-hidden />

        <div className="vela-stage__hud">
          <span className="vela-stage__badge">
            <span
              className={`vela-stage__dot ${sceneReady && !sceneFailed ? "is-live" : ""}`}
              aria-hidden
            />
            {status}
          </span>
          <span className="vela-stage__coords" aria-hidden>
            45.4869° N · 9.2017° E — {t("Viale Bodio 29/37, Milano")}
          </span>
        </div>

        <div className="vela-stage__intro">
          <p className="eyebrow">{t("Esperienza immersiva · Gli spazi di Corax")}</p>
          <h1 className="vela-stage__title" id="vela-title">
            {t("La Vela.")}
            <br />
            <em>{t("Il Tempio.")}</em>
          </h1>

          <div className="vela-stage__brief">
            <p className="vela-stage__lede">
              {t(
                "I due spazi di Corax ricostruiti in 3D. La Vela è il quartier generale nel Bodio Center, con la tensostruttura bianca a forma di vela. Il Tempio è il laboratorio editoriale dove nascono format, palinsesti e contenuti. Muoviti intorno agli edifici e apri uno spazio.",
              )}
            </p>
            <a className="vela-stage__skip" href="#contenuti">
              {t("Vai ai contenuti")} <ArrowUpRight size={14} aria-hidden />
            </a>
            <ol className="vela-stage__guide" aria-label={t("Come funziona l'esperienza")}>
              <li>
                <span aria-hidden>01</span> {t("Trascina per ruotare la scena")}
              </li>
              <li>
                <span aria-hidden>02</span> {t("Apri uno spazio o una voce")}
              </li>
              <li>
                <span aria-hidden>03</span> {t("Scorri per i dettagli")}
              </li>
            </ol>
            <p className="vela-stage__fallback">
              {sceneFailed
                ? t(
                    "Il tuo browser non supporta la grafica 3D: qui sotto trovi gli spazi e tutte le unit in formato testo, con gli stessi contenuti.",
                  )
                : t(
                    "Quello che vedi nella scena è raccolto anche qui sotto in testo: puoi leggerlo con calma, copiarlo e ritrovarlo nella ricerca.",
                  )}
            </p>
          </div>
        </div>

        <nav className="vela-index" aria-label={t("Gli spazi di Corax")}>
          <p className="vela-index__title">
            <span>{t("Gli spazi di Corax")}</span>
            <span aria-hidden>{String(velaSpaces.length).padStart(2, "0")}</span>
          </p>
          <ul>
            {velaSpaces.map((space) => (
              <li
                key={space.slug}
                className={`vela-index__row ${hoverSlug === space.slug ? "is-hot" : ""} ${
                  active === space.slug ? "is-open" : ""
                }`}
                style={{ ["--accent" as string]: space.accent }}
                onPointerEnter={() => {
                  hoverRef.current = space.slug;
                  setHoverSlug(space.slug);
                }}
                onPointerLeave={() => {
                  hoverRef.current = null;
                  setHoverSlug(null);
                }}
              >
                <button
                  type="button"
                  className="vela-index__open"
                  data-space={space.slug}
                  onClick={(event) => openSpace(space.slug, event.currentTarget)}
                  aria-expanded={active === space.slug}
                  aria-controls={active === space.slug ? `space-${space.slug}-title` : undefined}
                  onFocus={() => {
                    hoverRef.current = space.slug;
                    setHoverSlug(space.slug);
                  }}
                  onBlur={() => {
                    hoverRef.current = null;
                    setHoverSlug(null);
                  }}
                >
                  <span className="vela-index__num">{space.index}</span>
                  <span className="vela-index__body">
                    <strong>{space.name}</strong>
                    <em>{space.kicker}</em>
                  </span>
                </button>
                <Link
                  to={to(space.links[0].href)}
                  className="vela-index__go"
                  aria-label={`${space.links[0].label} — ${space.name}`}
                  onFocus={() => {
                    hoverRef.current = space.slug;
                    setHoverSlug(space.slug);
                  }}
                  onBlur={() => {
                    hoverRef.current = null;
                    setHoverSlug(null);
                  }}
                >
                  <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <button type="button" className="vela-index__reset" onClick={closeSpace}>
            <RotateCcw size={13} strokeWidth={1.6} aria-hidden />
            {t("Vista d'insieme")}
          </button>
          <p className="vela-index__hint">
            {t("La voce apre la scheda. La freccia porta alla pagina.")}
          </p>
        </nav>

        <div className="vela-stage__units" aria-label={t("Gli spazi di Corax")}>
          {velaSpaces.map((space) => (
            <button
              key={space.slug}
              type="button"
              className="vela-mobile-unit"
              style={{ ["--accent" as string]: space.accent }}
              onClick={(event) => openSpace(space.slug, event.currentTarget)}
              data-space={space.slug}
              aria-expanded={active === space.slug}
            >
              <span className="vela-mobile-unit__index">{space.index}</span>
              <span className="vela-mobile-unit__name">{space.name}</span>
              <span className="vela-mobile-unit__kicker">{space.kicker}</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
            </button>
          ))}
        </div>

        <div className="vela-stage__foot">
          <p className="vela-stage__hint">
            <Move size={15} strokeWidth={1.6} aria-hidden />
            {sceneReady && !sceneFailed
              ? t("Trascina per ruotare la scena · clicca uno spazio per la scheda")
              : t("Scegli uno spazio e leggi i dettagli")}
          </p>
          <dl className="vela-stage__numbers">
            {velaNumbers.slice(0, 4).map((number) => (
              <div key={number.label}>
                <dt>{number.value}</dt>
                <dd>{number.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {mounted && !sceneReady && !sceneFailed && (
          <div className="vela-stage__loading" role="status" aria-live="polite">
            <span>{t("Apro gli spazi")}</span>
            <span className="vela-stage__bar" aria-hidden />
          </div>
        )}
      </section>

      <section className="section section--dark vela-spaces" id="spazi">
        <SectionHead
          index="01"
          label={t("Gli spazi")}
          title={
            <>
              {t("Due luoghi.")}
              <br />
              <em>{t("Una sola regia.")}</em>
            </>
          }
          action={{ label: t("Torna alla scena"), to: "/esperienza#scena" }}
        >
          <p>
            {t(
              "La Vela e Il Tempio sono i due luoghi di Corax. La Vela è il quartier generale, dove lavorano le quattro unit e la produzione. Il Tempio è il laboratorio dove nascono editoria, format, palinsesti e contenuti per le community digitali.",
            )}
          </p>
        </SectionHead>

        <div className="vela-spaces__grid">
          {velaSpaces.map((space) => (
            <article
              className="space-card"
              key={space.slug}
              style={{ ["--accent" as string]: space.accent }}
            >
              <div className="space-card__media">
                {space.image && (
                  <img
                    src={optSrc(space.image)}
                    srcSet={optSrcSet(space.image)}
                    alt={space.imageAlt}
                    width={1600}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="space-card__index">{space.index}</span>
                <span className="space-card__label">{space.imageLabel}</span>
              </div>
              <div className="space-card__body">
                <p className="eyebrow">{space.kicker}</p>
                <h3>{space.name}</h3>
                <p className="space-card__short">{space.short}</p>
                <dl className="space-card__metrics">
                  {space.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt>{metric.label}</dt>
                      <dd>{metric.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="space-card__links">
                  {space.links.slice(0, 2).map((link) => (
                    <Link key={link.href} to={to(link.href)} className="arrow-link">
                      <span>{link.label}</span>
                      <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="vela-spaces__note">
          <Compass size={18} strokeWidth={1.4} aria-hidden />
          <p>
            {t(
              "Entrambi gli spazi sono a Milano. La Vela è nel Bodio Center, in Viale Bodio 29/37: è l'indirizzo del quartier generale e il punto di partenza per conoscere il sistema.",
            )}
          </p>
          <Link to={to("/contatti")} className="arrow-link">
            <span>{t("Vieni a trovarci")}</span>
            <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section section--dark vela-atlas" id="contenuti">
        <SectionHead
          index="02"
          label={t("Le quattro unit")}
          title={
            <>
              {t("Quattro unit.")}
              <br />
              <em>{t("Una sola azienda.")}</em>
            </>
          }
          action={{ label: t("Torna agli spazi"), to: "/esperienza#spazi" }}
        >
          <p>
            {t(
              "Ogni unit è un insieme di persone, competenze e casi reali. Qui trovi tutto in un unico elenco: puoi leggere, copiare e verificare ogni informazione.",
            )}
          </p>
        </SectionHead>

        <div className="vela-numbers">
          {velaNumbers.map((number) => (
            <div key={number.label}>
              <span>{number.value}</span>
              <p>{number.label}</p>
            </div>
          ))}
        </div>

        <div className="vela-atlas__list">
          {velaUnits.map((unit) => (
            <article
              className="vela-atlas__unit"
              id={`unita-${unit.slug}`}
              key={unit.slug}
              style={{ ["--accent" as string]: unit.accent }}
            >
              <header className="vela-atlas__head">
                <span className="vela-atlas__index">{unit.index}</span>
                <div>
                  <p className="eyebrow">{unit.kicker}</p>
                  <h3>{unit.name}</h3>
                </div>
                <Link to={to(unit.href)} className="vela-atlas__link">
                  {t("Pagina")} {unit.name}
                  <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
                </Link>
              </header>

              <p className="vela-atlas__short">{unit.short}</p>

              <div className="vela-atlas__grid">
                <div className="vela-atlas__caps">
                  <h4>{t("Competenze")}</h4>
                  <ul>
                    {unit.capabilities.map((capability) => (
                      <li key={capability.title}>{capability.title}</li>
                    ))}
                  </ul>
                </div>

                <div className="vela-atlas__metrics">
                  <h4>{t("Numeri")}</h4>
                  <dl>
                    {unit.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt>{metric.label}</dt>
                        <dd>{metric.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="vela-atlas__cases">
                  <h4>{t("Casi")}</h4>
                  <ul>
                    {unit.cases.map((project) => (
                      <li key={project.slug}>
                        <Link to={to(`/progetti/${project.slug}`)}>
                          {project.thumb && (
                            <img
                              src={optSrc(project.thumb)}
                              srcSet={optSrcSet(project.thumb)}
                              alt=""
                              width={96}
                              height={64}
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                          <span>
                            <strong>{project.title}</strong>
                            <em>{project.client}</em>
                          </span>
                          <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="vela-atlas__note">
          <Compass size={18} strokeWidth={1.4} aria-hidden />
          <p>
            {t(
              "Le quattro unit lavorano in modo autonomo ma condividono spazi, persone e direzione. Qui trovi competenze, numeri e casi di ciascuna unit.",
            )}
          </p>
          <Link to={to("/sistema")} className="arrow-link">
            <span>{t("Il sistema completo")}</span>
            <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section section--lavender vela-roster">
        <SectionHead
          index="03"
          label={t("Roster")}
          title={
            <>
              {velaRoster.length} {t("persone.")}
              <br />
              <em>{t("Nessun profilo.")}</em>
            </>
          }
          action={{ label: t("Tutto il roster"), to: "/talent" }}
        >
          <p>
            {t(
              "Il roster non è un elenco di follower. È un insieme di persone con voci, competenze e percorsi diversi. Ogni nome porta a una biografia, alle property e ai casi seguiti.",
            )}
          </p>
        </SectionHead>

        <div className="vela-roster__grid">
          {velaRoster.map((talent, index) => (
            <Link
              to={to(`/talent/${talent.slug}`)}
              className="vela-roster__item"
              key={talent.slug}
            >
              <span className="vela-roster__index">{formatIndex(index)}</span>
              <span className="vela-roster__body">
                <strong>{talent.name}</strong>
                <em>{talent.category}</em>
              </span>
              <ArrowUpRight size={15} strokeWidth={1.4} aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        kicker={t("Dagli spazi al progetto")}
        title={t("Hai visto come lavoriamo.")}
        text={t(
          "Raccontaci il tuo obiettivo: ti diciamo quale unit può seguirlo, con quali persone e quale può essere il primo passo.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Esplora i casi"), to: "/progetti" }}
      />

      {activeSpace && <SpacePanel space={activeSpace} onClose={closeSpace} />}
    </>
  );
}
