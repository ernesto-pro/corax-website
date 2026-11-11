import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { projectCategories } from "../data/projects";
import type { ProjectCategory } from "../data/projects";
import { ProjectCard } from "./Cards";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import { optSrc } from "../lib/img";

type ViewMode = "grid" | "index";

export function ProjectExplorer({ limit }: { limit?: number }) {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);
  const projects = content.projects;

  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    setHydrated(true);
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  const activeCategory = hydrated
    ? ((params.get("cat") as ProjectCategory | null) ?? "Tutti")
    : "Tutti";

  const view: ViewMode =
    hydrated && params.get("view") === "indice" ? "index" : "grid";

  const setCategory = (cat: string) => {
    const next = new URLSearchParams(params);
    if (cat === "Tutti") next.delete("cat");
    else next.set("cat", cat);
    setParams(next, { replace: true });
  };

  const setView = (mode: ViewMode) => {
    const next = new URLSearchParams(params);
    if (mode === "grid") next.delete("view");
    else next.set("view", "indice");
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = projects.filter((p) => {
      const inCat =
        activeCategory === "Tutti" ||
        p.categories.includes(activeCategory as ProjectCategory);
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        p.categories.some((cat) => t(cat).toLowerCase().includes(q));
      return inCat && inQuery;
    });
    if (limit) list = list.filter((p) => p.featured).slice(0, limit);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, activeCategory, limit, projects, lang]);

  const preview =
    filtered.find((project) => project.slug === activeSlug) ?? filtered[0] ?? null;

  const resetFilters = () => {
    setQuery("");
    setCategory("Tutti");
    setActiveSlug(null);
  };

  return (
    <div className="explorer">
      <h2 className="sr-only">{t("Progetti e campagne")}</h2>

      <div className="explorer__deck">
        <div className="explorer__deck-head">
          <p className="explorer__deck-label">
            <SlidersHorizontal size={14} strokeWidth={1.8} aria-hidden />
            {t("Scegli il terreno")}
          </p>
          <div className="explorer__view" role="group" aria-label={t("Vista dei progetti")}>
            <button
              type="button"
              className={view === "grid" ? "is-active" : ""}
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label={t("Vista a griglia")}
            >
              <LayoutGrid size={15} strokeWidth={1.8} aria-hidden />
            </button>
            <button
              type="button"
              className={view === "index" ? "is-active" : ""}
              onClick={() => setView("index")}
              aria-pressed={view === "index"}
              aria-label={t("Vista a indice")}
            >
              <List size={15} strokeWidth={1.8} aria-hidden />
            </button>
          </div>
        </div>

        <div className="explorer__bar">
          <div className="filters" role="group" aria-label={t("Filtra progetti per categoria")}>
            <button
              className={`chip ${activeCategory === "Tutti" ? "is-active" : ""}`}
              onClick={() => setCategory("Tutti")}
              aria-pressed={activeCategory === "Tutti"}
            >
              {t("Tutti")} <span>{projects.length}</span>
            </button>
            {projectCategories.map((cat) => {
              const count = projects.filter((p) => p.categories.includes(cat)).length;
              return (
                <button
                  key={cat}
                  className={`chip ${activeCategory === cat ? "is-active" : ""}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {t(cat)} <span>{count}</span>
                </button>
              );
            })}
          </div>
          {!limit && (
            <div className="explorer__search">
              <Search size={16} strokeWidth={1.8} aria-hidden />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("Cerca un progetto o un brand")}
                aria-label={t("Cerca un progetto o un brand")}
                type="search"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label={t("Cancella ricerca")}>
                  <X size={14} aria-hidden />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="explorer__count" aria-live="polite">
        <strong>{filtered.length}</strong>{" "}
        {filtered.length === 1 ? t("caso selezionato") : t("casi selezionati")}
        {activeCategory !== "Tutti" ? ` · ${t(activeCategory)}` : ""}
        <span className="explorer__count-note">{t("Zero riempitivi.")}</span>
      </div>

      {filtered.length > 0 ? (
        view === "grid" ? (
          <div
            className="project-grid"
            key={`${activeCategory}-${query}-grid`}
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                variant={i === 0 && filtered.length > 2 ? "feature" : "default"}
              />
            ))}
          </div>
        ) : (
          <div className="project-index" key={`${activeCategory}-${query}-index`}>
            <div className="project-index__list">
              {filtered.map((project, i) => (
                <Link
                  key={project.slug}
                  to={to(`/progetti/${project.slug}`)}
                  className={`project-index__row ${
                    preview?.slug === project.slug ? "is-active" : ""
                  }`}
                  onMouseEnter={() => setActiveSlug(project.slug)}
                  onFocus={() => setActiveSlug(project.slug)}
                >
                  <span className="project-index__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.cover && (
                    <img
                      className="project-index__thumb"
                      src={optSrc(project.cover)}
                      alt={project.coverAlt}
                      loading="lazy"
                      decoding="async"
                      width={160}
                      height={120}
                    />
                  )}
                  <span className="project-index__main">
                    <strong>{project.title}</strong>
                    <span>
                      {project.client} · {project.year}
                    </span>
                  </span>
                  <span className="project-index__cat">{t(project.categories[0])}</span>
                  {project.results[0] && (
                    <span className="project-index__metric">
                      <strong>{project.results[0].value}</strong>
                      <span>{project.results[0].label}</span>
                    </span>
                  )}
                  <span className="project-index__arrow" aria-hidden>
                    <ArrowUpRight size={17} strokeWidth={1.6} />
                  </span>
                </Link>
              ))}
            </div>

            <aside className="project-index__preview" aria-hidden="true">
              {preview && (
                <div className="project-index__preview-card" key={preview.slug}>
                  {preview.cover ? (
                    <img
                      src={optSrc(preview.cover)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={900}
                    />
                  ) : (
                    <div className="project-index__preview-abstract">
                      <span>{preview.monogram ?? preview.title.slice(0, 2)}</span>
                    </div>
                  )}
                  <div className="project-index__preview-body">
                    <span className="project-index__preview-cat">
                      {t(preview.categories[0])}
                    </span>
                    <strong>{preview.title}</strong>
                    <div className="project-index__preview-results">
                      {preview.results.slice(0, 2).map((result) => (
                        <span key={`${result.value}-${result.label}`}>
                          <strong>{result.value}</strong>
                          <span>{result.label}</span>
                        </span>
                      ))}
                    </div>
                    <span className="project-index__preview-open">
                      {t("Apri il caso")} <ArrowUpRight size={13} strokeWidth={1.8} />
                    </span>
                  </div>
                </div>
              )}
            </aside>
          </div>
        )
      ) : (
        <div className="explorer__empty">
          <p>{t("Nessun progetto trovato. Forse è il momento di inventarlo.")}</p>
          <button className="btn btn--ghost btn--sm" onClick={resetFilters}>
            {t("Azzera filtri")}
          </button>
        </div>
      )}
    </div>
  );
}
