import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHero, CTABand } from "../components/PageHero";
import { ArrowLink, Marquee, SectionHead } from "../components/UI";
import type { TalentCategory } from "../data/talents";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

/** Fixed order keeps the filter bar stable as the roster grows. */
const categories: TalentCategory[] = [
  "Entertainment",
  "Comedy",
  "Food",
  "Lifestyle",
  "Green",
  "Sport",
  "Creator",
];

export function Talent() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const [category, setCategory] = useState<TalentCategory | "Tutti">("Tutti");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return content.talents.filter((talent) => {
      const inCat = category === "Tutti" || talent.categories.includes(category);
      const inQuery =
        !q || talent.name.toLowerCase().includes(q) || talent.note.toLowerCase().includes(q);
      return inCat && inQuery;
    });
  }, [category, query, content.talents]);

  return (
    <>
      <PageHero
        index="03"
        label="Talent"
        title={
          <>
            {t("Persone,")}
            <br />
            <em>{t("non profili.")}</em>
          </>
        }
        lede={t(
          "Entertainment, comedy, food, lifestyle, green e sport. Gestiamo talenti e creator con una visione di lungo periodo, costruendo carriere prima ancora che collaborazioni.",
        )}
        meta={[
          { label: t("Talenti"), value: "20+" },
          { label: t("Verticali"), value: "6" },
          { label: t("Gestione"), value: "360°" },
        ]}
      >
        <div className="talent-hero__strip">
          <Marquee
            items={["Entertainment", "Comedy", "Food", "Lifestyle", "Green", "Sport", "Creator"]}
            speed={28}
            separator="·"
            className="marquee--outline"
          />
        </div>
      </PageHero>

      <section className="section section--paper talent-directory">
        <h2 className="sr-only">{t("Il roster Corax")}</h2>
        <div className="talent-directory__bar">
          <div className="filters" role="group" aria-label={t("Filtra talent per categoria")}>
            {(["Tutti", ...categories] as const).map((cat) => (
              <button
                key={cat}
                className={`chip ${category === cat ? "is-active" : ""}`}
                onClick={() => setCategory(cat as TalentCategory | "Tutti")}
                aria-pressed={category === cat}
              >
                {cat === "Tutti" ? t("Tutti") : cat}
              </button>
            ))}
          </div>
          <div className="explorer__search">
            <Search size={16} aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Cerca un talento")}
              aria-label={t("Cerca un talento")}
              type="search"
            />
          </div>
        </div>

        <div className="talent-list">
          {filtered.map((talent, i) => (
            <Link to={to(`/talent/${talent.slug}`)} className="talent-row" key={talent.slug}>
              <span className="talent-row__index">{String(i + 1).padStart(2, "0")}</span>
              <div className="talent-row__name">
                <span className="talent-row__photo">
                  <img
                    src={`/img/talents/${talent.slug}.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={1000}
                  />
                </span>
                <span className="talent-row__label">
                  <h3>{talent.name}</h3>
                  {talent.property && (
                    <span className="talent-row__property">{talent.property}</span>
                  )}
                </span>
              </div>
              <p className="talent-row__note">{talent.note}</p>
              <span className="talent-row__cats">{talent.categories.join(" · ")}</span>
              <span className="talent-row__arrow" aria-hidden>
                <ArrowUpRight size={20} strokeWidth={1.4} />
              </span>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="talent-directory__empty">{t("Nessun talento trovato.")}</p>
        )}
      </section>

      <section className="section section--dark talent-join">
        <SectionHead
          index="04"
          label={t("Entra nel roster")}
          title={t("Cerchiamo voci, non numeri.")}
        >
          <p>
            {t(
              "Se hai un'ossessione, una voce riconoscibile e la capacità di metterti in discussione, vogliamo conoscerti. Raccontaci chi sei e cosa fai.",
            )}
          </p>
        </SectionHead>
        <div className="talent-join__actions">
          <ArrowLink to="/lavora-con-noi">{t("Candidati come talento")}</ArrowLink>
          <ArrowLink to="/contatti">{t("Proponi una collaborazione")}</ArrowLink>
        </div>
      </section>

      <CTABand
        kicker="Brand & talent"
        title={t("Il talento giusto non è quello con più follower.")}
        text={t("È quello che sa raccontare il tuo brand senza tradire sé stesso. Noi sappiamo trovarlo.")}
      />
    </>
  );
}
