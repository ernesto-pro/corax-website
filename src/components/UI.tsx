import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const lang = useLang();
  return (
    <Link to={localizePath(to, lang)} className={`arrow-link ${className}`}>
      <span>{children}</span>
      <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden />
    </Link>
  );
}

export function Button({
  to,
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type,
  ariaLabel,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light" | "dark";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const lang = useLang();
  const cls = `btn btn--${variant} ${className}`;
  if (to)
    return (
      <Link to={localizePath(to, lang)} className={cls} aria-label={ariaLabel}>
        <span className="btn__label">{children}</span>
        <span className="btn__icon" aria-hidden>
          <ArrowRight size={16} strokeWidth={1.8} />
        </span>
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={ariaLabel}>
        <span className="btn__label">{children}</span>
        <span className="btn__icon" aria-hidden>
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </span>
      </a>
    );
  return (
    <button className={cls} onClick={onClick} type={type ?? "button"} aria-label={ariaLabel}>
      <span className="btn__label">{children}</span>
      <span className="btn__icon" aria-hidden>
        <ArrowRight size={16} strokeWidth={1.8} />
      </span>
    </button>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

export function SectionHead({
  index,
  label,
  title,
  children,
  action,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  action?: { label: string; to: string };
  className?: string;
}) {
  return (
    <header className={`section-head ${className}`}>
      <div className="section-head__top">
        <span className="section-head__index">{index}</span>
        <span className="section-head__label">{label}</span>
        {action && <ArrowLink to={action.to}>{action.label}</ArrowLink>}
      </div>
      <h2 className="section-head__title">{title}</h2>
      {children && <div className="section-head__body">{children}</div>}
    </header>
  );
}

export function Marquee({
  items,
  speed = 34,
  className = "",
  separator = "✳",
}: {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track" style={{ animationDuration: `${speed}s` }}>
        {row.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            {item}
            <span className="marquee__sep">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stat({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={`stat ${className}`}>
      <span className="stat__value">{value}</span>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export function useLockBody(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
