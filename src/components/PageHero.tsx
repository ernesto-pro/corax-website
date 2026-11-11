import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const t = useT();
  const lang = useLang();
  return (
    <nav className="breadcrumbs" aria-label={t("Percorso di navigazione")}>
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.path}-${i}`}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link to={localizePath(item.path, lang)}>{item.name}</Link>
              )}
              {!last && <ChevronRight size={12} aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function PageHero({
  index,
  label,
  title,
  lede,
  meta,
  children,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  lede?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="page-hero__top">
        <span className="page-hero__index">{index}</span>
        <span className="page-hero__label">{label}</span>
      </div>
      <h1 className="page-hero__title">{title}</h1>
      <div className="page-hero__bottom">
        {lede && <p className="page-hero__lede">{lede}</p>}
        {meta && (
          <dl className="page-hero__meta">
            {meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {children}
    </section>
  );
}

export function CTABand({
  kicker,
  title,
  text,
  primary,
  secondary,
}: {
  kicker?: string;
  title?: string;
  text?: string;
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  const t = useT();
  const lang = useLang();
  const primaryLink = primary ?? { label: t("Parliamone"), to: "/contatti" };
  const secondaryLink = secondary ?? { label: t("Scopri il tuo Corax Score"), to: "/#growth-scan" };
  return (
    <section className="cta-band">
      <div className="cta-band__inner">
        <div>
          <p className="eyebrow">{kicker ?? t("Il prossimo caso sei tu")}</p>
          <h2>{title ?? t("Hai un obiettivo. Noi abbiamo il sistema.")}</h2>
          <p className="cta-band__text">
            {text ??
              t(
                "Raccontaci dove vuoi arrivare. Ti rispondiamo entro un giorno lavorativo con la squadra giusta e un primo passo concreto.",
              )}
          </p>
        </div>
        <div className="cta-band__actions">
          <Link to={localizePath(primaryLink.to, lang)} className="btn btn--light">
            <span className="btn__label">{primaryLink.label}</span>
            <span className="btn__icon" aria-hidden>
              ↗
            </span>
          </Link>
          <Link to={localizePath(secondaryLink.to, lang)} className="btn btn--ghost-light">
            <span className="btn__label">{secondaryLink.label}</span>
          </Link>
        </div>
      </div>
      <span className="cta-band__orb" aria-hidden />
    </section>
  );
}

export function SplitStatement({
  index,
  label,
  children,
  aside,
}: {
  index: string;
  label: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="split">
      <div className="split__left">
        <span className="split__index">{index}</span>
        <span className="split__label">{label}</span>
      </div>
      <div className="split__main">{children}</div>
      {aside && <div className="split__aside">{aside}</div>}
    </section>
  );
}
