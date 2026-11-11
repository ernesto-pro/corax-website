import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Search, X } from "lucide-react";
import { site } from "../data/site";
import { chrome } from "../i18n/chrome";
import { useLang } from "../i18n/LanguageContext";
import { localizePath, itPathOf } from "../i18n/routes";
import { useLockBody } from "./UI";

export function Header({ onOpenSearch }: { onOpenSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const lang = useLang();
  const c = chrome[lang];
  const other = lang === "it" ? "en" : "it";
  const to = (path: string) => localizePath(path, lang);

  useLockBody(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      menuRef.current
        ?.querySelector<HTMLElement>("a[href], button:not([disabled])")
        ?.focus();
    }, 30);

    const getFocusable = () =>
      [headerRef.current, menuRef.current]
        .filter((root): root is HTMLElement => Boolean(root))
        .flatMap((root) =>
          Array.from(root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
        )
        .filter((el) => el.getClientRects().length > 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = getFocusable();
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || itPathOf(location.pathname) !== "/";
  const canonicalPath = itPathOf(location.pathname);
  // A 404 has no counterpart: switching language goes back to that language's home.
  const switchPath =
    canonicalPath === "/404" ? localizePath("/", other) : `${localizePath(location.pathname, other)}${location.hash}`;
  const mobileItems = [
    { label: c.menuHome, href: "/" },
    ...c.nav,
    { label: c.menu3d, href: "/esperienza" },
    { label: c.menuContact, href: "/contatti" },
  ];
  const isCurrent = (href: string) =>
    href === "/"
      ? canonicalPath === "/"
      : canonicalPath === href || canonicalPath.startsWith(`${href}/`);

  return (
    <>
      <header ref={headerRef} className={`site-header ${solid ? "is-solid" : ""}`}>
        <div className="site-header__inner">
          <Link to={to("/")} className="brand" aria-label={`Corax — ${c.menuHome}`}>
            <img src="/img/logomark-white.png" alt="" width="28" height="24" className="brand__mark" />
            <span className="brand__word">CORAX</span>
            <span className="brand__sup">®</span>
          </Link>

          <nav className="nav" aria-label={c.navAria}>
            {c.nav.map((item) => (
              <NavLink
                key={item.href}
                to={to(item.href)}
                className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to={to("/esperienza")}
              className="nav__link nav__link--immersive"
              aria-label={c.immersive}
            >
              <span aria-hidden>3D</span>
            </Link>
          </nav>

          <div className="site-header__actions">
            <Link
              to={switchPath}
              className="lang-switch"
              hrefLang={other}
              lang={other}
              aria-label={c.langSwitch}
              title={c.langSwitch}
            >
              {c.langSwitchShort}
            </Link>
            <button
              className="cmdk-trigger"
              onClick={onOpenSearch}
              aria-label={c.searchAria}
              aria-keyshortcuts="Meta+K Control+K"
            >
              <Search size={15} strokeWidth={1.8} aria-hidden />
              <span className="cmdk-trigger__label" aria-hidden>
                {c.search}
              </span>
              <kbd aria-hidden>⌘K</kbd>
            </button>
            <Link to={to("/contatti")} className="header-cta">
              <span>{c.contact}</span>
              <span className="header-cta__dot" aria-hidden />
            </Link>
            <button
              ref={toggleRef}
              className="menu-toggle"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? c.menuClose : c.menuOpen}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          ref={menuRef}
          role="region"
          aria-label={c.mobileNavAria}
        >
          <nav className="mobile-menu__nav" aria-label={c.navAria}>
            {mobileItems.map((item, i) => (
              <Link
                key={item.href}
                to={to(item.href)}
                className={`mobile-menu__link ${isCurrent(item.href) ? "is-active" : ""}`}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="mobile-menu__index">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="mobile-menu__foot">
            <div>
              <p className="eyebrow">{c.writeUs}</p>
              <a href={`mailto:${site.email}`} className="mobile-menu__mail">
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow">{c.where}</p>
              <p className="muted">{site.address.full}</p>
            </div>
            <div className="mobile-menu__socials">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
              ))}
              <Link to={switchPath} hrefLang={other} lang={other} className="mobile-menu__lang">
                {c.langSwitch} ↗
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
