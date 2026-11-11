import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigationType } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileCTA } from "./MobileCTA";
import { CommandPalette } from "./CommandPalette";
import { prefetchVelaScene } from "./experience/prefetch";
import { Seo } from "./Seo";
import { chrome } from "../i18n/chrome";
import { htmlLang } from "../i18n/lang";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const keyRef = useRef(key);
  keyRef.current = key;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        window.setTimeout(
          () => el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }),
          80,
        );
        return;
      }
    }

    if (navigationType === "POP") {
      const saved = window.sessionStorage.getItem(`corax-scroll:${key}`);
      if (saved !== null) {
        const target = Number(saved);
        let lastY = -1;
        let attempts = 0;
        let cancelled = false;
        let timer = 0;
        let frame = 0;

        const restore = () => {
          if (cancelled) return;
          attempts += 1;
          const current = window.scrollY;
          if (attempts > 1 && Math.abs(current - lastY) > 40) {
            cancelled = true;
            return;
          }
          window.scrollTo(0, target);
          lastY = window.scrollY;
          if (attempts < 4) timer = window.setTimeout(restore, 150);
        };

        frame = window.requestAnimationFrame(restore);
        return () => {
          cancelled = true;
          window.cancelAnimationFrame(frame);
          window.clearTimeout(timer);
        };
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, key, navigationType]);

  useEffect(() => {
    let frame = 0;
    const save = () => {
      frame = 0;
      window.sessionStorage.setItem(`corax-scroll:${keyRef.current}`, String(Math.round(window.scrollY)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(save);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden />;
}

function useReveal(pathname: string) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    nodes.forEach((n) => io.observe(n));

    const mo = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)").forEach((n) => io.observe(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}

function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const lang = useLang();
  const c = chrome[lang];

  useEffect(() => {
    const stored = window.localStorage.getItem("corax-consent");
    if (!stored) {
      const t = window.setTimeout(() => setVisible(true), 1400);
      return () => window.clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  const choose = (value: "all" | "essential") => {
    window.localStorage.setItem("corax-consent", value);
    setVisible(false);
  };

  return (
    <div className="cookie" role="region" aria-label={c.cookieRegion}>
      <div className="cookie__text">
        <p className="cookie__title">{c.cookieTitle}</p>
        <p>
          {c.cookieText} <Link to={localizePath("/cookie", lang)}>{c.cookiePolicy}</Link>.
        </p>
      </div>
      <div className="cookie__actions">
        <button className="btn btn--ghost btn--sm" onClick={() => choose("essential")}>
          {c.cookieEssential}
        </button>
        <button className="btn btn--primary btn--sm" onClick={() => choose("all")}>
          {c.cookieAccept}
        </button>
      </div>
    </div>
  );
}

export function Layout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();
  const lang = useLang();
  const c = chrome[lang];

  useReveal(pathname);

  // Warm the 3D chunk only when someone shows intent to enter the studio.
  useEffect(() => {
    const intent = (event: Event) => {
      const target = (event.target as HTMLElement | null)?.closest?.("a[href]");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      if (/^\/(en\/)?(esperienza|experience)(\/|$|\?|#)/.test(href)) prefetchVelaScene();
    };
    document.addEventListener("pointerover", intent, { passive: true });
    document.addEventListener("focusin", intent);
    document.addEventListener("pointerdown", intent, { passive: true });
    return () => {
      document.removeEventListener("pointerover", intent);
      document.removeEventListener("focusin", intent);
      document.removeEventListener("pointerdown", intent);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
    document.documentElement.setAttribute("data-lang", lang);
  }, [lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <Seo />
      <ScrollManager />
      <ScrollProgress />
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main id="main" key={pathname} className="main">
        <Outlet />
      </main>
      <Footer />
      <MobileCTA />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CookieConsent />
      <div className="grain" aria-hidden />
    </div>
  );
}
