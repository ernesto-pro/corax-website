import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Play,
  X,
} from "lucide-react";
import {
  initiativeCategories,
  instagramIsLive,
  instagramProfile,
  instagramUpdatedAt,
  shortDate,
  type Initiative,
  type InstaPost,
  type Story,
} from "../data/instagram";
import { categoryLabel, postTypeLabel } from "../i18n/content";
import { formatDate } from "../i18n/format";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";
import type { Lang } from "../i18n/lang";
import { SectionHead, useLockBody } from "./UI";
import { optSrc, optSrcSet } from "../lib/img";

const SLIDE_MS = 6800;

/** Category display value: English label in /en, Italian source value at root. */
function displayCategory(value: string, lang: Lang) {
  return lang === "en" ? (categoryLabel[value] ?? value) : value;
}

/** Post-type display value ("Carosello" reads as "Carousel" in English). */
function displayPostType(value: string, lang: Lang) {
  return lang === "en" ? (postTypeLabel[value] ?? value) : value;
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

export function InstagramMark({
  size = 16,
  strokeWidth = 1.7,
}: {
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="5.4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LiveDot() {
  return <span className="live-dot" aria-hidden />;
}

export function StoriesRail({
  className = "",
  showHead = true,
}: {
  className?: string;
  showHead?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const stories = content.stories;

  return (
    <div className={`stories-rail ${className}`}>
      {showHead && (
        <div className="stories-rail__head">
          <div className="stories-rail__id">
            <span className="stories-rail__avatar" aria-hidden>
              <img src="/img/logomark-white.png" alt="" width={26} height={22} />
            </span>
            <div>
              <span className="stories-rail__handle">{instagramProfile.label}</span>
              <span className="stories-rail__kicker">
                <LiveDot />
                {t("Stories & iniziative")}
              </span>
            </div>
          </div>
          <div className="stories-rail__meta">
            <span>
              {t("Aggiornato")} {formatDate(instagramUpdatedAt, lang)}
            </span>
            <a
              href={instagramProfile.url}
              target="_blank"
              rel="noreferrer"
              className="stories-rail__follow"
            >
              <InstagramMark size={13} />
              {t("Segui")}
            </a>
          </div>
        </div>
      )}

      <div
        className="stories-rail__track"
        aria-label={t("Storie e iniziative Corax")}
        role="group"
      >
        {stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            className="story-bubble"
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setOpenIndex(index);
            }}
            aria-label={`${t("Apri la storia")}: ${story.label}`}
          >
            <span className="story-bubble__ring" aria-hidden>
              <span className="story-bubble__inner">
                {story.coverMark ? (
                  <span className={`story-bubble__mark is-${story.coverTone ?? "violet"}`}>
                    {story.coverMark}
                  </span>
                ) : (
                  <img
                    src={optSrc(story.cover)}
                    srcSet={optSrcSet(story.cover)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={96}
                    height={96}
                  />
                )}
              </span>
            </span>
            <span className="story-bubble__label">{story.label}</span>
          </button>
        ))}
      </div>

      {openIndex !== null &&
        createPortal(
          <StoriesViewer
            stories={stories}
            startIndex={openIndex}
            returnFocus={triggerRef.current}
            onClose={() => setOpenIndex(null)}
          />,
          document.body,
        )}
    </div>
  );
}

function StoriesViewer({
  stories: storyList,
  startIndex,
  returnFocus,
  onClose,
}: {
  stories: Story[];
  startIndex: number;
  returnFocus: HTMLElement | null;
  onClose: () => void;
}) {
  const [storyIndex, setStoryIndex] = useState(startIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const remainingRef = useRef(SLIDE_MS);
  const deadlineRef = useRef(0);
  const advanceRef = useRef<() => void>(() => {});
  const backRef = useRef<() => void>(() => {});
  const closeHandler = useRef(onClose);
  closeHandler.current = onClose;

  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const story = storyList[storyIndex];
  const slide = story.slides[slideIndex];

  useLockBody(true);

  const advance = () => {
    setPaused(false);
    if (slideIndex < story.slides.length - 1) {
      remainingRef.current = SLIDE_MS;
      setSlideIndex((value) => value + 1);
      return;
    }
    if (storyIndex < storyList.length - 1) {
      remainingRef.current = SLIDE_MS;
      setStoryIndex((value) => value + 1);
      setSlideIndex(0);
      return;
    }
    closeHandler.current();
  };

  const back = () => {
    setPaused(false);
    remainingRef.current = SLIDE_MS;
    if (slideIndex > 0) {
      setSlideIndex((value) => value - 1);
      return;
    }
    if (storyIndex > 0) {
      const prev = storyIndex - 1;
      setStoryIndex(prev);
      setSlideIndex(storyList[prev].slides.length - 1);
    }
  };

  advanceRef.current = advance;
  backRef.current = back;

  useEffect(() => {
    remainingRef.current = SLIDE_MS;
  }, [storyIndex, slideIndex]);

  useEffect(() => {
    if (paused) {
      remainingRef.current = Math.max(0, deadlineRef.current - Date.now());
    }
  }, [paused]);

  useEffect(() => {
    if (paused || reduced) return;
    deadlineRef.current = Date.now() + remainingRef.current;
    const timer = window.setTimeout(() => advanceRef.current(), remainingRef.current);
    return () => window.clearTimeout(timer);
  }, [paused, reduced, storyIndex, slideIndex]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeHandler.current();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        advanceRef.current();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        backRef.current();
        return;
      }
      if (event.key === "Tab") {
        const nodes = frameRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]):not([tabindex="-1"])',
        );
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      const target = returnFocus ?? previous;
      if (target && document.contains(target)) target.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnFocus]);

  return (
    <div
      className="stories"
      role="dialog"
      aria-modal="true"
      aria-label={`${t("Storie Instagram Corax")} — ${story.label}`}
    >
      <div className="stories__backdrop" onClick={() => closeHandler.current()} />
      <div
        className="stories__frame"
        ref={frameRef}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="stories__slide" key={`${story.id}-${slideIndex}`}>
          {slide.fit === "contain" && (
            <img
              className="stories__bg"
              src={optSrc(slide.image)}
              srcSet={optSrcSet(slide.image)}
              alt=""
              aria-hidden
            />
          )}
          <img
            className={`stories__img ${slide.fit === "contain" ? "is-contain" : ""}`}
            src={optSrc(slide.image)}
            srcSet={optSrcSet(slide.image)}
            alt={slide.alt}
            width={slide.fit === "contain" ? 1600 : 1080}
            height={slide.fit === "contain" ? 900 : 1350}
            fetchPriority="high"
          />
          <span className="stories__scrim" aria-hidden />
        </div>

        <div className="stories__bars" aria-hidden>
          {story.slides.map((_, index) => (
            <span
              key={`${story.id}-bar-${index}`}
              className={`stories__bar ${index < slideIndex ? "is-done" : ""} ${
                index === slideIndex ? "is-active" : ""
              }`}
            >
              <span
                key={`${story.id}-fill-${slideIndex}-${index}`}
                className="stories__bar-fill"
                style={{
                  animationDuration: `${SLIDE_MS}ms`,
                  animationPlayState: paused || reduced ? "paused" : "running",
                }}
              />
            </span>
          ))}
        </div>

        <div className="stories__top">
          <span className="stories__avatar" aria-hidden>
            <img src="/img/logomark-white.png" alt="" width={30} height={26} />
          </span>
          <div className="stories__who">
            <strong>{instagramProfile.label}</strong>
            <span>
              {displayCategory(story.category, lang)} · {formatDate(story.date, lang)}
            </span>
          </div>
          <button
            type="button"
            className="stories__close"
            ref={closeRef}
            onClick={() => closeHandler.current()}
            aria-label={t("Chiudi le storie")}
          >
            <X size={20} strokeWidth={1.8} aria-hidden />
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          {story.label}: {slide.title}
        </p>

        <button
          type="button"
          className="stories__zone stories__zone--prev"
          onClick={back}
          aria-label={t("Storia precedente")}
          tabIndex={-1}
        />
        <button
          type="button"
          className="stories__zone stories__zone--next"
          onClick={() => advanceRef.current()}
          aria-label={t("Storia successiva")}
          tabIndex={-1}
        />

        <div className="stories__content" key={`${story.id}-content-${slideIndex}`}>
          <span className="stories__kicker">{slide.kicker}</span>
          <h2>{slide.title}</h2>
          <p>{slide.text}</p>
          {slide.cta &&
            (slide.cta.href.startsWith("/") ? (
              <Link
                to={to(slide.cta.href)}
                className="stories__cta"
                onClick={() => closeHandler.current()}
              >
                {slide.cta.label}
                <ArrowUpRight size={17} aria-hidden />
              </Link>
            ) : (
              <a
                href={slide.cta.href}
                className="stories__cta"
                target="_blank"
                rel="noreferrer"
                onClick={() => closeHandler.current()}
              >
                {slide.cta.label}
                <ArrowUpRight size={17} aria-hidden />
              </a>
            ))}
        </div>

        <div className="stories__nav" aria-hidden>
          <span>
            <ChevronLeft size={17} />
          </span>
          <span>
            <ChevronRight size={17} />
          </span>
        </div>

        <div className="stories__foot">
          <span>{t("Tocca per continuare")}</span>
          <a href={instagramProfile.url} target="_blank" rel="noreferrer">
            <InstagramMark size={14} />
            {t("Apri Instagram")}
          </a>
        </div>
      </div>
    </div>
  );
}

export function InstaTile({
  post,
  className = "",
  feature = false,
}: {
  post: InstaPost;
  className?: string;
  feature?: boolean;
}) {
  const classes = `insta-tile ${feature ? "insta-tile--feature" : ""} ${className}`;
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);
  const content = (
    <>
      {post.fit === "contain" && (
        <img
          className="insta-tile__bg"
          src={optSrc(post.image)}
          srcSet={optSrcSet(post.image)}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
        />
      )}
      <img
        className={post.fit === "contain" ? "is-contain" : ""}
        src={optSrc(post.image)}
        srcSet={optSrcSet(post.image)}
        alt={post.alt}
        loading="lazy"
        decoding="async"
        width={900}
        height={900}
      />
      <span className="insta-tile__type">
        {post.type === "Reel" ? (
          <Play size={11} fill="currentColor" strokeWidth={0} aria-hidden />
        ) : post.type === "Carosello" ? (
          <Layers size={11} aria-hidden />
        ) : (
          <InstagramMark size={11} />
        )}
        {displayPostType(post.type, lang)}
      </span>
      <span className="insta-tile__scrim" aria-hidden />
      <span className="insta-tile__caption">{post.caption}</span>
      <span className="insta-tile__open" aria-hidden>
        <ArrowUpRight size={16} strokeWidth={1.8} />
      </span>
    </>
  );

  const label = `${t("Apri")}: ${post.caption.slice(0, 90)}`;

  if (post.external) {
    return (
      <a
        className={classes}
        href={post.href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={to(post.href)} aria-label={label}>
      {content}
    </Link>
  );
}

export function InstaFeedGrid({
  posts,
  limit,
  className = "",
}: {
  posts?: InstaPost[];
  limit?: number;
  className?: string;
}) {
  const content = useContent();
  const feed = posts ?? content.instaFeed;
  const visible = typeof limit === "number" ? feed.slice(0, limit) : feed;
  return (
    <div className={`insta-grid ${className}`}>
      {visible.map((post) => (
        <InstaTile key={post.id} post={post} />
      ))}
    </div>
  );
}

const FEED_TYPES = ["Tutti", "Post", "Reel", "Carosello"] as const;
type FeedType = (typeof FEED_TYPES)[number];

export function InstaFeedSection({ posts }: { posts?: InstaPost[] }) {
  const [type, setType] = useState<FeedType>("Tutti");
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const feed = posts ?? content.instaFeed;
  const filtered = useMemo(
    () => (type === "Tutti" ? feed : feed.filter((post) => post.type === type)),
    [feed, type],
  );
  const visible = useMemo(() => {
    if (type !== "Tutti") return filtered.map((post) => ({ post, feature: false }));
    const index = filtered.findIndex(
      (post) => post.fit !== "contain" && post.type === "Reel",
    );
    if (index <= 0) {
      return filtered.map((post, i) => ({ post, feature: i === 0 }));
    }
    return [
      { post: filtered[index], feature: true },
      ...filtered
        .filter((_, i) => i !== index)
        .map((post) => ({ post, feature: false })),
    ];
  }, [filtered, type]);
  const counts = useMemo(
    () =>
      feed.reduce<Record<string, number>>(
        (acc, post) => {
          acc[post.type] = (acc[post.type] ?? 0) + 1;
          return acc;
        },
        { Tutti: feed.length },
      ),
    [feed],
  );

  return (
    <div className="ig-feed__wrap">
      <div
        className="ig-feed__filters"
        role="group"
        aria-label={t("Filtra il feed per formato")}
      >
        {FEED_TYPES.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${type === item ? "is-active" : ""}`}
            onClick={() => setType(item)}
            aria-pressed={type === item}
          >
            {item === "Tutti" ? t("Tutti") : displayPostType(item, lang)}
            <span>{counts[item] ?? 0}</span>
          </button>
        ))}
      </div>
      <div className={`insta-grid ${type === "Tutti" ? "insta-grid--feature" : ""}`}>
        {visible.map(({ post, feature }) => (
          <InstaTile key={post.id} post={post} feature={feature} />
        ))}
      </div>
    </div>
  );
}

export function InstagramPulse() {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const stats = [
    { value: String(content.stories.length), label: t("Stories") },
    { value: String(content.initiatives.length), label: t("Iniziative") },
    {
      value: String(new Set(content.initiatives.map((item) => item.project)).size),
      label: t("Casi collegati"),
    },
    { value: String(content.instaFeed.length), label: t("Contenuti") },
  ];

  return (
    <section className="ig-pulse" aria-label={t("Instagram Corax in numeri")}>
      <div className="ig-pulse__id">
        <span className="ig-pulse__avatar" aria-hidden>
          <img src="/img/logomark-white.png" alt="" width={34} height={29} />
        </span>
        <div>
          <span className="ig-pulse__handle">{instagramProfile.label}</span>
          <span className="ig-pulse__status">
            <LiveDot />
            {t("Account ufficiale")} · {t("aggiornato")}{" "}
            {formatDate(instagramUpdatedAt, lang)}
          </span>
        </div>
      </div>

      <p className="ig-pulse__claim">
        {t("Instagram non è un canale.")}
        <br />
        <em>{t("È il nostro quartier generale.")}</em>
      </p>

      <a
        className="ig-pulse__cta"
        href={instagramProfile.url}
        target="_blank"
        rel="noreferrer"
      >
        <InstagramMark size={16} />
        {t("Segui l'account")}
        <ArrowUpRight size={15} aria-hidden />
      </a>

      <div className="ig-pulse__stats">
        {stats.map((stat) => (
          <span key={stat.label}>
            <strong>{stat.value}</strong>
            {stat.label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function InitiativeArchive({ items }: { items: Initiative[] }) {
  const [category, setCategory] = useState<(typeof initiativeCategories)[number]>("Tutte");
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);
  const filtered = useMemo(
    () => items.filter((item) => category === "Tutte" || item.category === category),
    [category, items],
  );

  return (
    <div className="initiatives">
      <div className="initiatives__bar">
        <div
          className="filters"
          role="group"
          aria-label={t("Filtra le iniziative per categoria")}
        >
          {initiativeCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`chip ${category === cat ? "is-active" : ""}`}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
            >
              {cat === "Tutte" ? t("Tutte") : displayCategory(cat, lang)}
            </button>
          ))}
        </div>
        <p className="initiatives__count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? t("iniziativa") : t("iniziative")} ·{" "}
          {filtered.length === 1 ? t("1 caso") : `${filtered.length} ${t("casi")}`}
        </p>
      </div>

      <ol className="initiatives__grid">
        {filtered.map((item, i) => {
          const project = content.projects.find((entry) => entry.slug === item.project);
          const cover = project?.cover ?? null;
          const results = project?.results.slice(0, 2) ?? [];
          return (
            <li
              key={`${item.date}-${item.title}`}
              className="initiative-card"
              style={
                project?.accent
                  ? { ["--accent" as string]: project.accent }
                  : undefined
              }
            >
              <Link to={to(item.href)} className="initiative-card__link">
                <div className="initiative-card__media">
                  {cover ? (
                    <img
                      src={optSrc(cover)}
                      srcSet={optSrcSet(cover)}
                      alt={project?.coverAlt ?? item.title}
                      loading="lazy"
                      decoding="async"
                      width={1200}
                      height={900}
                    />
                  ) : (
                    <div
                      className="initiative-card__abstract"
                      role="img"
                      aria-label={project?.coverAlt ?? item.title}
                    >
                      <span>{project?.monogram ?? item.title.slice(0, 2).toUpperCase()}</span>
                      <i>{project?.title ?? item.title}</i>
                    </div>
                  )}
                  <span className="initiative-card__cat">
                    {displayCategory(item.category, lang)}
                  </span>
                  <span className="initiative-card__index" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="initiative-card__body">
                  <span className="initiative-card__date">
                    {shortDate(item.date)} · Instagram
                  </span>
                  <h3 className="initiative-card__title">{item.title}</h3>
                  <p className="initiative-card__summary">{item.summary}</p>
                  {results.length > 0 && (
                    <div className="initiative-card__results">
                      {results.map((result) => (
                        <span key={`${result.value}-${result.label}`}>
                          <strong>{result.value}</strong>
                          {result.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="initiative-card__cta">
                    {t("Apri il caso")}
                    <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function InstagramLive({ limit = 4 }: { limit?: number }) {
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const cases = new Set(content.initiatives.map((item) => item.project)).size;
  return (
    <section className="section section--dark social-live" id="live">
      <SectionHead
        index="08"
        label={t("Live")}
        title={
          <>
            {t("Il sistema")}
            <br />
            <em>{t("non si ferma.")}</em>
          </>
        }
        action={{ label: t("Tutte le iniziative"), to: "/instagram" }}
      >
        <p>
          {t(
            "Campagne, properties, talenti, premi. Quello che succede dentro Corax, aggiornato come lo raccontiamo su Instagram.",
          )}
        </p>
      </SectionHead>

      <div className="social-live__body">
        <StoriesRail />
        <InstaFeedGrid limit={limit} />
      </div>

      <div className="social-live__foot">
        <span className="social-live__proof">
          {content.initiatives.length} {t("iniziative")} · {cases}{" "}
          {t("casi collegati")}
        </span>
        <span className="social-live__source">
          <LiveDot />
          {instagramIsLive ? t("Feed sincronizzato da Instagram") : t("Aggiornato dal team")} ·{" "}
          {formatDate(instagramUpdatedAt, lang)}
        </span>
        <a href={instagramProfile.url} target="_blank" rel="noreferrer">
          <InstagramMark size={15} />
          {t("Segui")} {instagramProfile.label}
          <ArrowUpRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
