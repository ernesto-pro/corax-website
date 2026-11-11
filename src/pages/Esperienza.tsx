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
import { ArrowUpRight, Compass, Move, X } from "lucide-react";
import { CTABand } from "../components/PageHero";
import { SectionHead, useLockBody } from "../components/UI";
import type { VelaUnit } from "../data/experience";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

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

const unitHints: Record<string, string> = {
  agency: "Strategia",
  "media-house": "Produzione",
  talent: "Roster",
  tech: "Tecnologia",
};

function formatIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function UnitDialog({ unit, onClose }: { unit: VelaUnit; onClose: () => void }) {
  const content = useContent();
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

  const titleId = `vela-unit-${unit.slug}-title`;
  const descId = `vela-unit-${unit.slug}-desc`;
  const rosterPreview = content.vela.roster
    .filter((talent) => talent.featured)
    .slice(0, 6);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="vela-dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="vela-dialog__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={panelRef}
        tabIndex={-1}
        style={{ ["--accent" as string]: unit.accent }}
      >
        <span className="vela-dialog__beam" aria-hidden />

        <div className="vela-dialog__top">
          <span className="vela-dialog__index">{unit.index}</span>
          <p className="vela-dialog__kicker">{unit.kicker}</p>
          <button
            type="button"
            className="vela-dialog__close"
            onClick={onClose}
            ref={closeRef}
            aria-label={t("Chiudi la scheda della unit")}
          >
            <X size={20} strokeWidth={1.6} aria-hidden />
          </button>
        </div>

        <h2 className="vela-dialog__title" id={titleId}>
          {unit.name}
        </h2>
        <p className="vela-dialog__desc" id={descId}>
          {unit.short}
        </p>

        <dl className="vela-dialog__metrics">
          {unit.metrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="vela-dialog__cols">
          <section className="vela-dialog__block" aria-labelledby={`${titleId}-cap`}>
            <h3 id={`${titleId}-cap`}>{t("Cosa facciamo")}</h3>
            <ol className="vela-dialog__caps">
              {unit.capabilities.slice(0, 4).map((capability, index) => (
                <li key={capability.title}>
                  <span aria-hidden>{formatIndex(index)}</span>
                  <div>
                    <h4>{capability.title}</h4>
                    <p>{capability.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to={to(unit.href)} className="vela-dialog__more" onClick={onClose}>
              {t("Tutte le capabilities")}{" "}
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
            </Link>
          </section>

          <section className="vela-dialog__block" aria-labelledby={`${titleId}-cases`}>
            <h3 id={`${titleId}-cases`}>{t("Casi da aprire")}</h3>
            <ul className="vela-dialog__cases">
              {unit.cases.map((project) => (
                <li key={project.slug}>
                  <Link to={to(`/progetti/${project.slug}`)} onClick={onClose}>
                    {project.thumb && (
                      <img
                        src={project.thumb}
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
                    <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>

            {unit.slug === "talent" && (
              <div className="vela-dialog__roster">
                <h4>{t("Dal roster")}</h4>
                <ul>
                  {rosterPreview.map((talent) => (
                    <li key={talent.slug}>
                      <Link to={to(`/talent/${talent.slug}`)} onClick={onClose}>
                        {talent.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <div className="vela-dialog__foot">
          <Link to={to(unit.href)} className="btn btn--light btn--sm" onClick={onClose}>
            <span className="btn__label">{t("Scopri")} {unit.name}</span>
            <span className="btn__icon" aria-hidden>
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </span>
          </Link>
          <Link to={to("/contatti")} className="btn btn--ghost-light btn--sm" onClick={onClose}>
            <span className="btn__label">{t("Parliamone")}</span>
          </Link>
        </div>
      </div>
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
  const velaRoster = content.vela.roster;
  const velaNumbers = content.vela.numbers;
  const velaSceneNodes = content.vela.nodes;
  const getVelaUnit = (slug: string) => content.vela.units.find((u) => u.slug === slug);

  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const activeRef = useRef<string | null>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const activeUnit = active ? getVelaUnit(active) : undefined;

  useLockBody(Boolean(activeUnit));

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(query.matches);
    apply();
    setMounted(true);
    query.addEventListener?.("change", apply);
    return () => query.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    activeRef.current = activeUnit?.slug ?? null;
  }, [activeUnit]);

  const openUnit = useCallback((slug: string, trigger?: HTMLElement | null) => {
    let target = trigger ?? null;
    if (!target) {
      const candidates = Array.from(
        document.querySelectorAll<HTMLElement>(`[data-unit="${slug}"]`),
      );
      target = candidates.find((el) => el.offsetParent !== null) ?? null;
    }
    lastFocus.current = target;
    setActive(slug);
  }, []);

  const closeUnit = useCallback(() => {
    setActive(null);
    window.requestAnimationFrame(() => lastFocus.current?.focus({ preventScroll: true }));
  }, []);

  const status = sceneFailed
    ? t("Modalità atlante · WebGL non disponibile")
    : !mounted
      ? t("Scena 3D · La Vela")
      : !sceneReady
        ? t("Apro la scena…")
        : t("Scena attiva · trascina per orbitare");

  return (
    <>
      <section className="vela-stage" id="atrio" aria-labelledby="vela-title">
        <div className="vela-stage__bg" aria-hidden />
        <div className="vela-stage__canvas">
          {mounted && !sceneFailed && (
            <SceneBoundary onError={() => setSceneFailed(true)}>
              <Suspense fallback={null}>
                <VelaScene
                  nodes={velaSceneNodes}
                  activeRef={activeRef}
                  labelsRef={labelsRef}
                  onSelect={(slug) => openUnit(slug)}
                  onFail={() => setSceneFailed(true)}
                  onReady={() => setSceneReady(true)}
                  reduced={reduced}
                />
              </Suspense>
            </SceneBoundary>
          )}
        </div>
        <div className="vela-stage__vignette" aria-hidden />
        <div className="vela-stage__grain" aria-hidden />

        <div className="vela-stage__hud">
          <span className="vela-stage__badge">
            <span className={`vela-stage__dot ${sceneReady && !sceneFailed ? "is-live" : ""}`} aria-hidden />
            {status}
          </span>
          <span className="vela-stage__coords" aria-hidden>
            45.4869° N · 9.2017° E — {t("Viale Bodio 29/37, Milano")}
          </span>
        </div>

        <div className="vela-stage__intro">
          <p className="eyebrow">{t("Esperienza immersiva · La Vela")}</p>
          <h1 className="vela-stage__title" id="vela-title">
            {t("Entra nella")} <em>{t("Vela.")}</em>
          </h1>

          <div className="vela-stage__brief">
            <p className="vela-stage__lede">
              {t("L'atrio digitale di Corax: quattro unit,")} {velaRoster.length}{" "}
              {t(
                "talenti e tutti i casi, disposti nello spazio come li pensiamo davvero. Muoviti, avvicinati, apri una porta.",
              )}
            </p>
            <a className="vela-stage__skip" href="#atlante">
              {t("Salta all'atlante testuale")} <ArrowUpRight size={14} aria-hidden />
            </a>
            <p className="vela-stage__fallback">
              {sceneFailed
                ? t(
                    "Il tuo browser non supporta WebGL: qui sotto trovi tutto il sistema in forma di atlante, senza perdere un contenuto.",
                  )
                : t(
                    "La scena è un livello espressivo. Tutto quello che vedi nello spazio è raccolto anche nell'atlante qui sotto, in forma leggibile e indicizzabile.",
                  )}
            </p>
          </div>
        </div>

        <div className="vela-labels" ref={labelsRef} aria-hidden="true">
          {velaUnits.map((unit) => (
            <span
              key={unit.slug}
              className="vela-label"
              data-node={unit.slug}
              style={{ ["--accent" as string]: unit.accent }}
            >
              <span className="vela-label__index">{unit.index}</span>
              <span className="vela-label__body">
                <span className="vela-label__name">{unit.name}</span>
                <span className="vela-label__kicker">
                  {unitHints[unit.slug] ? t(unitHints[unit.slug]) : unit.kicker}
                </span>
              </span>
              <span className="vela-label__arrow" aria-hidden>
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </span>
            </span>
          ))}
        </div>

        <div className="vela-stage__dock" role="group" aria-label={t("Scegli una unit")}>
          {velaUnits.map((unit) => (
            <a
              key={unit.slug}
              href={to(unit.href)}
              className="vela-dock__item"
              style={{ ["--accent" as string]: unit.accent }}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                openUnit(unit.slug, event.currentTarget);
              }}
              aria-haspopup="dialog"
              aria-label={`${t("Apri")} ${unit.name} — ${unit.kicker}`}
              data-unit={unit.slug}
            >
              <span className="vela-dock__index">{unit.index}</span>
              <span className="vela-dock__name">{unit.name}</span>
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden />
            </a>
          ))}
        </div>

        <div className="vela-stage__units" aria-label={t("Le quattro unit")}>
          {velaUnits.map((unit) => (
            <a
              key={unit.slug}
              href={to(unit.href)}
              className="vela-mobile-unit"
              style={{ ["--accent" as string]: unit.accent }}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                openUnit(unit.slug, event.currentTarget);
              }}
              aria-haspopup="dialog"
              aria-label={`${t("Apri")} ${unit.name} — ${unit.kicker}`}
              data-unit={unit.slug}
            >
              <span className="vela-mobile-unit__index">{unit.index}</span>
              <span className="vela-mobile-unit__name">{unit.name}</span>
              <span className="vela-mobile-unit__kicker">{unit.kicker}</span>
              <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden />
            </a>
          ))}
        </div>

        <div className="vela-stage__foot">
          <p className="vela-stage__hint">
            <Move size={15} strokeWidth={1.6} aria-hidden />
            {sceneReady && !sceneFailed
              ? t("Trascina per orbitare · passa sulle isole · scegli una unit")
              : t("Scegli una unit · esplora l'atlante")}
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
            <span>{t("Apro la Vela")}</span>
            <span className="vela-stage__bar" aria-hidden />
          </div>
        )}
      </section>

      <section className="section section--dark vela-atlas" id="atlante">
        <SectionHead
          index="01"
          label={t("Atlante del sistema")}
          title={
            <>
              {t("Quattro isole.")}
              <br />
              <em>{t("Un solo atrio.")}</em>
            </>
          }
          action={{ label: t("Torna all'atrio"), to: "/esperienza#atrio" }}
        >
          <p>
            {t(
              "Ogni isola della Vela è una unit con persone, competenze e casi reali. Qui trovi la mappa completa: quello che nello spazio è un movimento, qui è un elenco che puoi leggere, copiare e verificare.",
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
                  <h4>{t("Capabilities")}</h4>
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
                              src={project.thumb}
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
              "La Vela non è una metafora decorativa: è il modo in cui organizziamo il lavoro. Ogni unit è autonoma, ma condivide lo stesso atrio — e la stessa regia.",
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
          index="02"
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
              "Il roster non è un elenco di follower. È un insieme di voci, verticali e percorsi. Ogni nome nella Vela è una porta che apre una biografia, un property e i casi in cui quella persona ha lavorato.",
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
        kicker={t("Dall'atrio al progetto")}
        title={t("Hai visto il sistema. Ora accendilo.")}
        text={t(
          "Raccontaci dove vuoi arrivare: ti diciamo quale unit entra in campo, con quali persone e con quale primo passo. La Vela è solo l'ingresso.",
        )}
        primary={{ label: t("Parliamone"), to: "/contatti" }}
        secondary={{ label: t("Esplora i casi"), to: "/progetti" }}
      />

      {activeUnit && <UnitDialog unit={activeUnit} onClose={closeUnit} />}
    </>
  );
}
