import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

export function NotFound() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  return (
    <>
      <section className="notfound">
        <span className="notfound__ghost" aria-hidden>
          404
        </span>
        <div className="notfound__inner">
          <span className="eyebrow">{t("Errore 404 — fuori copione")}</span>
          <h1>
            {t("Questa pagina")}
            <br />
            {t("non esiste")} <em>{t("(ancora).")}</em>
          </h1>
          <p>
            {t(
              "Il link è vecchio, il titolo è cambiato o abbiamo scritto male l’URL. Nessun problema: tutto il resto del sistema è qui sotto.",
            )}
          </p>
          <div className="notfound__actions">
            <Link to={to("/")} className="btn btn--primary">
              <span className="btn__label">{t("Torna alla home")}</span>
              <span className="btn__icon" aria-hidden>
                <ArrowUpRight size={16} />
              </span>
            </Link>
            <Link to={to("/progetti")} className="btn btn--ghost">
              <span className="btn__label">{t("Guarda i progetti")}</span>
            </Link>
            <Link to={to("/contatti")} className="btn btn--ghost">
              <span className="btn__label">{t("Contattaci")}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--paper notfound__suggest">
        <div className="notfound__col">
          <p className="eyebrow">{t("Forse cercavi")}</p>
          <ul>
            {content.projects.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link to={to(`/progetti/${p.slug}`)}>
                  <span>{p.title}</span>
                  <span>{p.client}</span>
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="notfound__col">
          <p className="eyebrow">{t("Le properties")}</p>
          <ul>
            {content.properties.map((p) => (
              <li key={p.slug}>
                <Link to={to(`/media/${p.slug}`)}>
                  <span>{p.name}</span>
                  <span>{p.type}</span>
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
