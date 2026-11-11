import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, MapPin, Mail } from "lucide-react";
import { site, units } from "../data/site";
import { properties } from "../data/properties";
import { chrome } from "../i18n/chrome";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { Marquee } from "./UI";

export function Footer() {
  const lang = useLang();
  const c = chrome[lang];
  const to = (path: string) => localizePath(path, lang);

  const navLinks = [
    { label: c.menuHome, href: "/" },
    ...c.nav,
    { label: c.menu3d, href: "/esperienza" },
    { label: c.menuContact, href: "/contatti" },
    { label: c.footerScore, href: "/#growth-scan" },
  ];

  return (
    <footer className="footer">
      <div className="footer__cta">
        <p className="eyebrow">{c.footerKicker}</p>
        <a href={`mailto:${site.email}`} className="footer__mega">
          <span>{c.footerTalk}</span>
          <ArrowUpRight size={56} strokeWidth={1} aria-hidden />
        </a>
        <a href={`mailto:${site.email}`} className="footer__mail">
          {site.email}
        </a>
      </div>

      <Marquee
        items={["Corax", "Beyond the line", "Social Media Company", "Milano", "Since 2020"]}
        speed={44}
        className="marquee--footer"
      />

      <div className="footer__grid">
        <div className="footer__brand">
          <Link to={to("/")} className="brand brand--footer" aria-label={`Corax — ${c.menuHome}`}>
            <img src="/img/logomark-white.png" alt="" width="30" height="26" className="brand__mark" />
            <span className="brand__word">CORAX</span>
            <span className="brand__sup">®</span>
          </Link>
          <p className="footer__claim">{c.footerClaim}</p>
          <address className="footer__address">
            <a href={site.address.maps} target="_blank" rel="noreferrer">
              <MapPin size={14} aria-hidden />
              {site.address.full}
            </a>
            <a href={`mailto:${site.email}`}>
              <Mail size={14} aria-hidden />
              {site.email}
            </a>
          </address>
          <div className="footer__socials">
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} <ArrowUpRight size={13} aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__col" aria-label={c.footerNav}>
          <p className="footer__col-title">{c.footerNav}</p>
          {navLinks.map((l) => (
            <Link key={l.href} to={to(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <nav className="footer__col" aria-label={c.footerSystem}>
          <p className="footer__col-title">{c.footerSystem}</p>
          {units.map((u) => (
            <Link key={u.slug} to={to(`/servizi/${u.slug}`)}>
              {u.name}
            </Link>
          ))}
          <Link to={to("/lavora-con-noi")}>{c.footerCareers}</Link>
        </nav>

        <nav className="footer__col" aria-label={c.footerProperties}>
          <p className="footer__col-title">{c.footerProperties}</p>
          {properties.map((p) => (
            <Link key={p.slug} to={to(`/media/${p.slug}`)}>
              {p.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="footer__bottom">
        <p>
          © 2026 {site.legalName} — P. IVA / Codice fiscale: {site.vat}. {c.footerRights}
        </p>
        <div className="footer__legal">
          <Link to={to("/privacy")}>{c.footerPrivacy}</Link>
          <Link to={to("/cookie")}>{c.footerCookie}</Link>
          <button
            type="button"
            className="footer__top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "auto"
                  : "smooth",
              })
            }
          >
            {c.footerTop} <ArrowUp size={14} aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
