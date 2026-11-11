import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { chrome } from "../i18n/chrome";
import { useLang } from "../i18n/LanguageContext";
import { itPathOf, localizePath } from "../i18n/routes";

/** Italian canonical prefixes where the sticky bar is hidden. */
const HIDDEN_PREFIXES = ["/contatti", "/lavora-con-noi", "/esperienza"];

export function MobileCTA() {
  const { pathname } = useLocation();
  const lang = useLang();
  const c = chrome[lang];
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const [nearQuiz, setNearQuiz] = useState(false);

  useEffect(() => {
    setDismissed(window.sessionStorage.getItem("corax-sticky-cta") === "off");
  }, []);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 640);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const target = document.getElementById("growth-scan");
    if (!target || !("IntersectionObserver" in window)) {
      setNearQuiz(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNearQuiz(entry.isIntersecting),
      { threshold: 0.06 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);

  const canonical = itPathOf(pathname);
  const hidden =
    dismissed ||
    !visible ||
    nearQuiz ||
    HIDDEN_PREFIXES.some((prefix) => canonical === prefix || canonical.startsWith(`${prefix}/`));

  if (hidden) return null;

  const close = () => {
    setDismissed(true);
    window.sessionStorage.setItem("corax-sticky-cta", "off");
  };

  return (
    <div className="mobile-cta">
      <Link to={localizePath("/contatti", lang)} className="mobile-cta__link">
        <span className="mobile-cta__copy">
          <strong>{c.ctaTitle}</strong>
          <span>{c.ctaSub}</span>
        </span>
        <span className="mobile-cta__button">
          {c.ctaTalk}
          <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden />
        </span>
      </Link>
      <button className="mobile-cta__close" onClick={close} aria-label={c.ctaClose}>
        <X size={14} strokeWidth={1.8} aria-hidden />
      </button>
    </div>
  );
}
