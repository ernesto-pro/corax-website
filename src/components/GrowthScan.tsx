import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Gauge,
  RotateCcw,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  getScanPosition,
  scanFocusOrder,
  type ScanFocus,
  type ScanLevel,
} from "../data/growthScan";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

type Stage = "start" | "quiz" | "result";

const OPTION_KEYS = ["A", "B", "C", "D"];
const KEY_MAP: Record<string, number> = {
  "1": 0,
  "2": 1,
  "3": 2,
  "4": 3,
  a: 0,
  b: 1,
  c: 2,
  d: 3,
};

/** Highest localized level reached at this score. */
function getScanLevel(score: number, levels: ScanLevel[]): ScanLevel {
  return [...levels].reverse().find((level) => score >= level.min) ?? levels[0];
}

/** First localized level above this score. */
function getNextScanLevel(score: number, levels: ScanLevel[]): ScanLevel | undefined {
  return levels.find((level) => level.min > score);
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function ScanRadar({
  counts,
  active,
}: {
  counts: Map<ScanFocus, number>;
  active: ScanFocus;
}) {
  const t = useT();
  const content = useContent();
  const scanFocuses = content.scan.focuses;
  const max = Math.max(1, ...scanFocusOrder.map((key) => counts.get(key) ?? 0));
  const axes = scanFocusOrder.map((key, i) => {
    const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2;
    const value = counts.get(key) ?? 0;
    const ratio = value / max;
    return {
      key,
      name: scanFocuses[key].name,
      value,
      ratio,
      x: 50 + Math.cos(angle) * 40 * ratio,
      y: 50 + Math.sin(angle) * 40 * ratio,
      gx: 50 + Math.cos(angle) * 40,
      gy: 50 + Math.sin(angle) * 40,
    };
  });
  const points = axes.map((axis) => `${axis.x.toFixed(2)},${axis.y.toFixed(2)}`).join(" ");
  const label = axes
    .map((axis) => `${axis.name}: ${axis.value} ${t("su 5")}`)
    .join(", ");

  return (
    <figure className="scan-radar">
      <svg viewBox="0 0 100 100" role="img" aria-label={`${t("Profilo del bisogno")} — ${label}`}>
        {[0.33, 0.66, 1].map((ratio) => (
          <circle
            key={ratio}
            className="scan-radar__ring"
            cx="50"
            cy="50"
            r={40 * ratio}
          />
        ))}
        {axes.map((axis) => (
          <line
            key={`axis-${axis.key}`}
            className="scan-radar__axis"
            x1="50"
            y1="50"
            x2={axis.gx}
            y2={axis.gy}
          />
        ))}
        <polygon className="scan-radar__shape" points={points} />
        {axes.map((axis) => (
          <circle
            key={`dot-${axis.key}`}
            className={`scan-radar__dot ${axis.key === active ? "is-active" : ""} ${
              axis.value === 0 ? "is-zero" : ""
            }`}
            cx={axis.x}
            cy={axis.y}
            r={axis.value === 0 ? 1.3 : 2.1}
          />
        ))}
      </svg>
      <figcaption>
        {axes.map((axis) => (
          <span
            key={axis.key}
            className={`scan-radar__legend ${axis.key === active ? "is-active" : ""}`}
          >
            <i aria-hidden />
            {axis.name}
            <strong>{axis.value}/5</strong>
          </span>
        ))}
      </figcaption>
    </figure>
  );
}

function ScanScale({
  score,
  level,
  nextLevel,
  pointsToNext,
  variant,
}: {
  score: number;
  level: ScanLevel;
  nextLevel: ScanLevel | undefined;
  pointsToNext: number;
  variant: "rail" | "panel";
}) {
  const t = useT();
  const content = useContent();
  const scanLevels = content.scan.levels;
  return (
    <div className={`scan-levels scan-levels--${variant}`}>
      <div className="scan-levels__head">
        <span>{t("Scala Corax")}</span>
        <span>
          {t("Livello")} {level.id} {t("di")} {String(scanLevels.length).padStart(2, "0")}
        </span>
      </div>
      <ol className="scan-levels__list">
        {scanLevels.map((item) => {
          const reached = score >= item.min;
          const current = item.id === level.id;
          return (
            <li
              key={item.id}
              className={`scan-levels__item ${reached ? "is-reached" : ""} ${
                current ? "is-current" : ""
              }`}
            >
              <span className="scan-levels__dot" aria-hidden>
                {reached ? <Check size={10} strokeWidth={2.8} /> : item.id}
              </span>
              <span className="scan-levels__copy">
                <strong>{item.name}</strong>
                <span>{t("da")} {item.min} pt</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="scan-levels__next">
        {nextLevel ? (
          <>
            {t("Ti mancano")} <strong>{pointsToNext} {t("punti")}</strong>{" "}
            {t("per")} <strong>{nextLevel.name}</strong>.
          </>
        ) : (
          <>{t("Sei al massimo della scala. Adesso il lavoro è difenderlo.")}</>
        )}
      </p>
    </div>
  );
}

export function GrowthScan() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const scanQuestions = content.scan.questions;
  const scanLevels = content.scan.levels;
  const scanFocuses = content.scan.focuses;

  const [stage, setStage] = useState<Stage>("start");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    scanQuestions.map(() => null),
  );
  const [displayScore, setDisplayScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const copyTimer = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const selected = answers[step];
  const current = scanQuestions[step];
  const answered = answers.filter((a) => a !== null).length;
  const isQuiz = stage === "quiz";
  const isResult = stage === "result";

  const score = useMemo(
    () =>
      answers.reduce<number>((total, answer, i) => {
        if (answer === null) return total;
        return total + scanQuestions[i].options[answer].points;
      }, 0),
    [answers],
  );

  const level = getScanLevel(score, scanLevels);
  const nextLevel = getNextScanLevel(score, scanLevels);
  const levelProgress = nextLevel
    ? Math.max(
        0,
        Math.min(100, ((score - level.min) / (nextLevel.min - level.min)) * 100),
      )
    : 100;
  const pointsToNext = nextLevel ? nextLevel.min - score : 0;

  const focusCounts = useMemo(() => {
    const counts = new Map<ScanFocus, number>();
    answers.forEach((answer, i) => {
      if (answer === null) return;
      const key = scanQuestions[i].options[answer].focus;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    return counts;
  }, [answers]);

  const focus = useMemo<ScanFocus>(() => {
    let best = level.focus;
    let max = 0;
    focusCounts.forEach((value, key) => {
      if (value > max) {
        max = value;
        best = key;
      }
    });
    return best;
  }, [focusCounts, level.focus]);

  const unit = scanFocuses[focus];

  const mix = useMemo(
    () =>
      scanFocusOrder
        .map((key) => {
          const count = focusCounts.get(key) ?? 0;
          return {
            key,
            name: scanFocuses[key].name,
            count,
            pct: answered > 0 ? Math.round((count / answered) * 100) : 0,
          };
        })
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count),
    [focusCounts, answered],
  );

  const moves = useMemo(
    () => [level.move, ...unit.moves].slice(0, 3),
    [level.move, unit.moves],
  );

  const goal =
    answers[0] !== null
      ? scanQuestions[0].options[answers[0] as number].label
      : "";
  const contactHref = `${localizePath("/contatti", lang)}?score=${score}&level=${level.id}&focus=${focus}&goal=${encodeURIComponent(goal)}`;

  const shareUrl = useMemo(
    () =>
      typeof window === "undefined"
        ? `https://corax.it${localizePath("/", lang)}#growth-scan`
        : `${window.location.origin}${localizePath("/", lang)}#growth-scan`,
    [lang],
  );
  const shareText = `${t("Il mio Corax Score è")} ${score}/100 — ${level.name}. ${t("La mia unit:")} ${unit.name}. ${unit.promise}`;

  useEffect(() => {
    if (!isResult) {
      setDisplayScore(0);
      return;
    }
    if (reduced) {
      setDisplayScore(score);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isResult, score, reduced]);

  useEffect(() => {
    if (isResult) resultRef.current?.focus();
  }, [isResult]);

  useEffect(() => {
    if (!isQuiz) return;
    questionRef.current?.focus({ preventScroll: true });
  }, [isQuiz, step]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
    };
  }, []);

  const choose = (index: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = index;
      return next;
    });
  };

  const advance = () => {
    if (selected === null) return;
    if (step < scanQuestions.length - 1) setStep((s) => s + 1);
    else setStage("result");
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const startScan = () => {
    setStage("quiz");
    setStep(0);
  };

  const restart = () => {
    setAnswers(scanQuestions.map(() => null));
    setStep(0);
    setStage("start");
    setDisplayScore(0);
    setCopied(false);
    window.setTimeout(() => {
      document
        .getElementById("growth-scan")
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }, 60);
  };

  const shareResult = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: t("Il mio Corax Score"), text: shareText, url: shareUrl });
        return;
      } catch (error) {
        if ((error as Error)?.name === "AbortError") return;
      }
    }
    const payload = `${shareText}\n${shareUrl}`;
    let ok = false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(payload);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        const field = document.createElement("textarea");
        field.value = payload;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.top = "-1000px";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        ok = document.execCommand("copy");
        document.body.removeChild(field);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      if (copyTimer.current) window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2400);
    }
  };

  useEffect(() => {
    if (!isQuiz) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target) {
        if (target.isContentEditable) return;
        const tag = target.tagName;
        if (tag === "TEXTAREA") return;
        if (tag === "INPUT" && (target as HTMLInputElement).type !== "radio") return;
      }
      const key = event.key.toLowerCase();
      if (key in KEY_MAP) {
        const index = KEY_MAP[key];
        if (index < current.options.length) {
          event.preventDefault();
          choose(index);
        }
        return;
      }
      if (key === "enter") {
        if (selected === null) return;
        event.preventDefault();
        advance();
        return;
      }
      if (key === "arrowleft" || key === "backspace") {
        if (step > 0) {
          event.preventDefault();
          goBack();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const progress = isResult ? 100 : Math.round((answered / scanQuestions.length) * 100);
  const circumference = 100;
  const gaugeValue = reduced ? score : displayScore;

  return (
    <section className="section section--paper growth-scan" id="growth-scan">
      <div className="growth-scan__head">
        <div>
          <span className="eyebrow">09 · Corax Score</span>
          <h2 className="growth-scan__title">
            {t("Quanto è pronta")}
            <br />
            {t("la tua")} <em>{t("crescita?")}</em>
          </h2>
        </div>
        <div className="growth-scan__intro">
          <p>
            {t("Cinque domande, trenta secondi, un numero. Alla fine sai quanto è pronta la tua crescita, quale unit ti serve e le tre mosse da mettere sul tavolo lunedì mattina. Nessuna email obbligatoria.")}
          </p>
          <div className="growth-scan__promise">
            <span>
              <Sparkles size={13} aria-hidden /> {t("5 domande")}
            </span>
            <span>
              <Check size={13} aria-hidden /> {t("Risultato immediato")}
            </span>
            <span>
              <Check size={13} aria-hidden /> {t("Nessun impegno")}
            </span>
          </div>
        </div>
      </div>

      <div className={`scan ${isResult ? "is-done" : ""} ${isQuiz ? "is-quiz" : ""}`}>
        <div className="scan__rail">
          <span className="scan__watermark">SCORE</span>
          <p className="scan__rail-kicker">{t("Il percorso")}</p>
          <ol className="scan__steps">
            {scanQuestions.map((question, i) => {
              const complete = isResult || (isQuiz && i < step);
              const active = isQuiz && i === step;
              return (
                <li
                  key={question.id}
                  className={`scan__step ${active ? "is-active" : ""} ${
                    complete ? "is-complete" : ""
                  }`}
                >
                  <span className="scan__step-dot">
                    {complete ? (
                      <Check size={12} strokeWidth={2.4} aria-hidden />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span>{question.kicker}</span>
                </li>
              );
            })}
          </ol>
          {isResult && (
            <ScanScale
              score={score}
              level={level}
              nextLevel={nextLevel}
              pointsToNext={pointsToNext}
              variant="rail"
            />
          )}
          <div className="scan__rail-level" aria-live="polite">
            <span className="scan__rail-level-kicker">
              {isResult ? t("Il tuo livello") : t("Livello live")}
            </span>
            <div className="scan__rail-level-row">
              <strong>{level.id}</strong>
              <span>{level.name}</span>
              <em>{isQuiz || isResult ? `${score}/100` : "—"}</em>
            </div>
            <span
              className="scan__rail-level-track"
              role="progressbar"
              aria-label={`${t("Progresso nel livello")} ${level.name}`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(stage === "start" ? 0 : levelProgress)}
            >
              <i style={{ width: `${stage === "start" ? 0 : levelProgress}%` }} />
              {scanLevels.slice(1).map((item) => (
                <b
                  key={item.id}
                  aria-hidden
                  style={{ left: `${getScanPosition(item.min)}%` }}
                />
              ))}
            </span>
            <span className="scan__rail-level-next">
              {stage === "start"
                ? t("5 domande per capire dove sei")
                : nextLevel
                  ? `${pointsToNext} ${t("pt al livello")} ${nextLevel.id}`
                  : t("Livello massimo raggiunto")}
            </span>
          </div>
          <div className="scan__rail-foot">
            <span>30&quot;</span>
            <p>
              {t("Non è un voto.")}
              <br />{t("È una direzione.")}
            </p>
          </div>
        </div>

        <div className="scan__panel">
          {stage === "start" && (
            <div className="scan-start">
              <div className="scan-start__copy">
                <span className="scan-start__eyebrow">
                  <Zap size={12} aria-hidden /> {t("Corax Score · edizione 2026")}
                </span>
                <h3 className="scan-start__title">
                  {t("Ti diamo un numero.")}
                  <br />
                  <em>{t("Non un complimento.")}</em>
                </h3>
                <p className="scan-start__desc">
                  {t("Cinque domande per capire dove sei davvero. Poi un punteggio, la unit giusta e tre mosse concrete. Zero slide, zero giri di parole.")}
                </p>
                <ul className="scan-start__list">
                  <li>
                    <span className="scan-start__icon" aria-hidden>
                      <Gauge size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <strong>{t("Un punteggio vero")}</strong>
                      <span>{t("Calcolato su cinque segnali, non sul feeling.")}</span>
                    </div>
                  </li>
                  <li>
                    <span className="scan-start__icon" aria-hidden>
                      <Sparkles size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <strong>{t("La tua unit")}</strong>
                      <span>{t("Agency, Media House, Talent o Tech.")}</span>
                    </div>
                  </li>
                  <li>
                    <span className="scan-start__icon" aria-hidden>
                      <ArrowRight size={16} strokeWidth={1.7} />
                    </span>
                    <div>
                      <strong>{t("Tre mosse")}</strong>
                      <span>{t("Il brief che porteresti in riunione.")}</span>
                    </div>
                  </li>
                </ul>
                <div className="scan-start__actions">
                  <button type="button" className="scan-start__go" onClick={startScan}>
                    <span>{t("Accendi il Corax Score")}</span>
                    <span className="scan-start__go-icon" aria-hidden>
                      <ArrowRight size={17} strokeWidth={1.9} />
                    </span>
                  </button>
                  <span className="scan-start__time">{t("30 secondi · 0 dati lasciati")}</span>
                </div>
                <p className="scan-start__hint">
                  {t("Scorciatoie:")} <kbd>1</kbd>–<kbd>4</kbd> {t("per scegliere,")}{" "}
                  <kbd>{t("Invio")}</kbd> {t("per avanzare.")}
                </p>
              </div>

              <div className="scan-start__dial" aria-hidden="true">
                <div className="scan-start__orbit">
                  <span className="scan-start__chip scan-start__chip--a">{t("5 domande")}</span>
                  <span className="scan-start__chip scan-start__chip--b">{t("1 direzione")}</span>
                  <span className="scan-start__chip scan-start__chip--c">{t("0 email")}</span>
                </div>
                <div className="scan-start__dial-core">
                  <span>Corax</span>
                  <strong>?</strong>
                  <span>/100</span>
                </div>
                <svg className="scan-start__dial-ring" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="92" pathLength={100} />
                  <circle className="is-dash" cx="100" cy="100" r="78" pathLength={100} />
                </svg>
              </div>
            </div>
          )}

          {isQuiz && (
            <div className="scan__quiz" key={step}>
              <div className="scan__top">
                <span className="scan__count">
                  {t("Domanda")} {String(step + 1).padStart(2, "0")} /{" "}
                  {String(scanQuestions.length).padStart(2, "0")}
                </span>
                <div className="scan__live" aria-live="polite">
                  <span>Score</span>
                  <strong>{score}</strong>
                  <small>/100</small>
                  <i aria-hidden style={{ ["--pct" as string]: `${score}%` }} />
                </div>
              </div>

              <div
                className="scan__progress"
                role="progressbar"
                aria-label={t("Avanzamento del test")}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ transform: `scaleX(${progress / 100})` }} />
              </div>

              <div className="scan__level" aria-live="polite">
                <span className="scan__level-badge">Lv {level.id}</span>
                <span className="scan__level-name">{level.name}</span>
                <span className="scan__level-track" aria-hidden>
                  <i style={{ width: `${levelProgress}%` }} />
                  {scanLevels.slice(1).map((item) => (
                    <b
                      key={item.id}
                      style={{ left: `${getScanPosition(item.min)}%` }}
                    />
                  ))}
                </span>
                <span className="scan__level-next">
                  {nextLevel ? `+${pointsToNext} pt · Lv ${nextLevel.id}` : t("Livello massimo")}
                </span>
              </div>

              <div className="scan__meta-row">
                <span className="scan__kicker">{current.kicker}</span>
                <span className="scan__keys" aria-hidden>
                  <kbd>1</kbd>–<kbd>4</kbd> {t("rispondi")} · <kbd>↵</kbd> {t("avanza")}
                </span>
              </div>

              <h3 ref={questionRef} tabIndex={-1} className="scan__question">
                {current.title}
              </h3>

              <div className="scan__options" role="radiogroup" aria-label={current.title}>
                {current.options.map((option, i) => {
                  const isSelected = selected === i;
                  return (
                    <label
                      className={`scan-option ${isSelected ? "is-selected" : ""}`}
                      key={option.label}
                    >
                      <input
                        type="radio"
                        name={`scan-${current.id}`}
                        value={option.label}
                        checked={isSelected}
                        onChange={() => choose(i)}
                      />
                      <span className="scan-option__key" aria-hidden>
                        {OPTION_KEYS[i]}
                      </span>
                      <span className="scan-option__text">
                        <strong>{option.label}</strong>
                        <span>{option.detail}</span>
                      </span>
                      <span className="scan-option__mark" aria-hidden>
                        <Check size={13} strokeWidth={2.6} />
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="scan__actions">
                <button
                  type="button"
                  className="scan__back"
                  onClick={goBack}
                  disabled={step === 0}
                >
                  {t("Indietro")}
                </button>
                <button
                  type="button"
                  className="btn btn--light scan__next"
                  onClick={advance}
                  disabled={selected === null}
                >
                  <span className="btn__label">
                    {step === scanQuestions.length - 1
                      ? t("Calcola il Corax Score")
                      : t("Avanti")}
                  </span>
                  <span className="btn__icon" aria-hidden>
                    <ArrowRight size={16} strokeWidth={1.8} />
                  </span>
                </button>
              </div>

              <p className="scan__hint">
                {t("Scegli la risposta più vicina al tuo presente. Nessuna risposta è sbagliata.")}
              </p>
            </div>
          )}

          {isResult && (
            <div className="scan-result">
              <div className="scan-result__visual">
                <div className="scan-result__gauge">
                  <span className="scan-result__burst" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  <svg viewBox="0 0 120 120" role="img" aria-label={`${t("Corax Score:")} ${score} ${t("su 100")}`}>
                    <circle
                      className="scan-result__ticks"
                      cx="60"
                      cy="60"
                      r="56"
                      pathLength={100}
                    />
                    <circle
                      className="scan-result__track"
                      cx="60"
                      cy="60"
                      r="48"
                      pathLength={circumference}
                    />
                    <circle
                      className="scan-result__fill"
                      cx="60"
                      cy="60"
                      r="48"
                      pathLength={circumference}
                      style={{ strokeDashoffset: circumference - gaugeValue }}
                    />
                  </svg>
                  <div className="scan-result__number" aria-hidden>
                    <strong>{displayScore}</strong>
                    <span>/100</span>
                  </div>
                </div>

                <div className="scan-result__level-card">
                  <span>{t("Livello")} {level.id}</span>
                  <strong>{level.name}</strong>
                </div>

                <button
                  type="button"
                  className={`scan-result__share ${copied ? "is-copied" : ""}`}
                  onClick={shareResult}
                >
                  {copied ? (
                    <Check size={14} strokeWidth={2.2} aria-hidden />
                  ) : (
                    <Share2 size={14} strokeWidth={1.8} aria-hidden />
                  )}
                  <span>{copied ? t("Risultato copiato") : t("Condividi il risultato")}</span>
                  {!copied && <Copy size={12} strokeWidth={1.6} aria-hidden />}
                </button>
              </div>

              <div className="scan-result__body">
                <span className="scan-result__level">
                  {unit.name} · {t("il tuo territorio")}
                </span>
                <h3 ref={resultRef} tabIndex={-1} className="scan-result__title">
                  {level.title}
                </h3>
                <p className="scan-result__desc">{level.description}</p>

                <ScanScale
                  score={score}
                  level={level}
                  nextLevel={nextLevel}
                  pointsToNext={pointsToNext}
                  variant="panel"
                />

                <div className="scan-mix">
                  <div className="scan-mix__head">
                    <span>{t("Il tuo profilo")}</span>
                    <span>{unit.name} {t("in testa")}</span>
                  </div>
                  <div className="scan-mix__grid">
                    <ScanRadar counts={focusCounts} active={focus} />
                    <div className="scan-mix__bars">
                      {mix.map((item) => (
                        <div className="scan-mix__row" key={item.key}>
                          <span>{item.name}</span>
                          <span className="scan-mix__track">
                            <i
                              style={{ ["--w" as string]: `${item.pct}%` }}
                              aria-hidden
                            />
                          </span>
                          <strong>{item.pct}%</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="scan-mix__promise">{unit.promise}</p>
                </div>

                <div className="scan-moves">
                  <div className="scan-moves__head">
                    <span>{t("Le tre mosse")}</span>
                    <span>{t("Da lunedì")}</span>
                  </div>
                  <ol>
                    {moves.map((move, i) => (
                      <li key={move}>
                        <em aria-hidden>0{i + 1}</em>
                        <p>{move}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="scan-result__meta">
                  <span>
                    <Sparkles size={13} aria-hidden /> {t("Unit consigliata:")}{" "}
                    <strong>{unit.name}</strong>
                  </span>
                  <span>
                    <Check size={13} aria-hidden /> {t("Risposta in 24h")}
                  </span>
                  <span>
                    <Check size={13} aria-hidden /> {t("Nessun impegno")}
                  </span>
                </div>

                <div className="scan-result__actions">
                  <Link to={contactHref} className="btn btn--light">
                    <span className="btn__label">{t("Parliamone")}</span>
                    <span className="btn__icon" aria-hidden>
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </span>
                  </Link>
                  <Link
                    to={localizePath(`/servizi/${focus}`, lang)}
                    className="btn btn--ghost-light"
                  >
                    <span className="btn__label">{t("Vedi")} {unit.name}</span>
                  </Link>
                  <button type="button" className="scan-result__reset" onClick={restart}>
                    <RotateCcw size={13} aria-hidden /> {t("Rifai il test")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
