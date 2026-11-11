import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { site } from "../data/site";
import { clients } from "../data/projects";
import { ProjectCard, PropertyCard, NewsCard, ShowreelTrigger } from "../components/Cards";
import { BrandLogo } from "../components/BrandLogo";
import { FAQ } from "../components/FAQ";
import { GrowthScan } from "../components/GrowthScan";
import { InstagramLive } from "../components/Instagram";
import { Showreel } from "../components/Showreel";
import { ArrowLink, Marquee, SectionHead, Stat } from "../components/UI";
import { CTABand, SplitStatement } from "../components/PageHero";
import { useContent, useT } from "../i18n/translate";
import { useLang } from "../i18n/LanguageContext";
import { localizePath } from "../i18n/routes";

function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 720px)").matches;
    if (reduced || compact) {
      video.pause();
      return;
    }
    video.play().catch(() => undefined);
  }, []);

  return (
    <>
      <video
        ref={ref}
        className="hero__video"
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
      >
        <source src={site.video.src540} type="video/mp4" media="(max-width: 720px)" />
        <source src={site.video.src720} type="video/mp4" media="(max-width: 1120px)" />
        <source src={site.video.src} type="video/mp4" />
      </video>
      <img
        className={`hero__poster ${playing ? "is-hidden" : ""}`}
        src="/img/poster-800.webp"
        srcSet="/img/poster-800.webp 800w, /img/poster.webp 1600w"
        sizes="100vw"
        alt=""
        width={800}
        height={450}
        fetchPriority="high"
      />
    </>
  );
}

export function Home() {
  const [reelOpen, setReelOpen] = useState(false);
  const content = useContent();
  const t = useT();
  const lang = useLang();
  const to = (path: string) => localizePath(path, lang);

  const featured = content.projects.filter((p) => p.featured).slice(0, 4);
  const featuredTalents = content.talents.filter((talent) => talent.featured);

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <HeroVideo />
          <div className="hero__scrim" aria-hidden />
          <div className="hero__grid" aria-hidden />
        </div>

        <div className="hero__inner">
          <div className="hero__side">
            <span>{t("Beyond the line — since 2020")}</span>
          </div>

          <div className="hero__content">
            <p className="hero__eyebrow">
              <span className="dot" aria-hidden /> {t("Social media company · Milano")}
            </p>
            <h1 className="hero__title">
              {t("L'attenzione")}
              <br />
              {t("non si compra.")}
              <br />
              <em>{t("Si costruisce.")}</em>
            </h1>
            <p className="hero__lede">
              {t(
                "Media, talenti, format e tecnologia. Un unico sistema per trasformare l'attenzione in crescita — e la crescita in qualcosa che resta.",
              )}
            </p>
            <div className="hero__actions">
              <Link to={to("/#growth-scan")} className="btn btn--light">
                <span className="btn__label">{t("Sblocca la crescita")}</span>
                <span className="btn__icon" aria-hidden>
                  <ArrowUpRight size={16} strokeWidth={1.8} />
                </span>
              </Link>
              <ShowreelTrigger onClick={() => setReelOpen(true)} />
            </div>
            <p className="hero__micro">
              <span>{t("Corax Score")}</span>
              <span>{t("5 domande")}</span>
              <span>{t("30 secondi")}</span>
            </p>
          </div>

          <div className="hero__foot">
            <div className="hero__stats">
              <span>
                <strong>{t("8 MLN")}</strong> {t("fatturato 2025")}
              </span>
              <span>
                <strong>+45%</strong> {t("crescita")}
              </span>
              <span>
                <strong>{t("30 MLN+")}</strong> {t("view PoretCast")}
              </span>
              <span>
                <strong>{t("1.500 mq")}</strong> {t("di produzione")}
              </span>
            </div>
            <div className="hero__meta">
              <a href={site.address.maps} target="_blank" rel="noreferrer" className="hero__place">
                <MapPin size={13} aria-hidden /> {t("Milano, Viale Bodio 29/37")}
              </a>
              <a href="#manifesto" className="hero__scroll" aria-label={t("Scorri al manifesto")}>
                <ArrowDown size={16} aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Marquee
        items={[
          t("Media"),
          t("Talent"),
          t("Branded entertainment"),
          t("Podcast"),
          t("Production"),
          t("Influencer marketing"),
          t("FAST TV"),
          t("Milano"),
        ]}
        className="marquee--hero"
        speed={38}
      />

      <Link to={to("/#growth-scan")} className="score-banner">
        <span className="score-banner__tag">
          <Sparkles size={13} aria-hidden /> {t("Corax Score")}
        </span>
        <span className="score-banner__text">
          {t("Quanto è pronta la tua crescita?")} <strong>{t("Scoprilo in 30 secondi.")}</strong>
        </span>
        <span className="score-banner__cta">
          {t("Fai il test")} <ArrowUpRight size={14} aria-hidden />
        </span>
      </Link>

      <section className="section section--paper manifesto" id="manifesto">
        <SplitStatement
          index="01"
          label={t("Manifesto")}
          aside={
            <div className="manifesto__card">
              <span className="manifesto__sig">Corax</span>
              <p>{t("La firma di un sistema che produce attenzione, non rumore.")}</p>
              <dl>
                <div>
                  <dt>{t("Fondata")}</dt>
                  <dd>2020</dd>
                </div>
                <div>
                  <dt>{t("Sede")}</dt>
                  <dd>{t("Milano")}</dd>
                </div>
                <div>
                  <dt>{t("Persone")}</dt>
                  <dd>73</dd>
                </div>
              </dl>
            </div>
          }
        >
          <span className="eyebrow">{t("Non un'agenzia. Un sistema.")}</span>
          <h2 className="statement reveal">
            {t("Il rumore è gratis.")} <em>{t("L'attenzione no.")}</em>
          </h2>
          <div className="manifesto__cols reveal">
            <p>
              {t(
                "Corax nasce nel 2020 come social media company e cresce come qualcosa di più difficile da definire: un sistema editoriale che tiene insieme agenzia, media house, talent agency e tecnologia.",
              )}
            </p>
            <p>
              {t(
                "Costruiamo campagne e piattaforme per i brand. E possediamo format, podcast e community. Pensiamo come un editore, misuriamo come un'agenzia: è questa doppia anima a fare la differenza.",
              )}
            </p>
          </div>
          <div className="manifesto__foot reveal">
            <ArrowLink to="/chi-siamo">{t("La nostra storia")}</ArrowLink>
            <ArrowLink to="/sistema">{t("Come lavoriamo")}</ArrowLink>
          </div>
        </SplitStatement>

        <div className="numbers reveal">
          <div className="numbers__head">
            <span className="eyebrow">{t("I numeri non mentono")}</span>
            <p>{t("Al 2026. Il resto lo costruiamo insieme.")}</p>
          </div>
          <div className="numbers__grid">
            <Stat value={t("12 MLN")} label={t("obiettivo 2026")} />
            <Stat value="250+" label={t("progetti")} />
            <Stat value="20" label={t("nuovi format nel 2026")} />
            <Stat value="2026" label={t("Leader della Crescita")} />
          </div>
        </div>
      </section>

      <section className="section section--dark system">
        <SectionHead
          index="02"
          label={t("Il sistema")}
          title={
            <>
              {t("Quattro unit.")}
              <br />
              <em>{t("Una sola regia.")}</em>
            </>
          }
          action={{ label: t("Tutto il sistema"), to: "/sistema" }}
        >
          <p>
            {t(
              "Agenzia, produzione, talenti e tecnologia non sono reparti separati: sono parti dello stesso organismo. È così che una campagna diventa un format, un format diventa una property, una property diventa un ecosistema.",
            )}
          </p>
        </SectionHead>

        <div className="units">
          {content.units.map((unit) => (
            <Link
              key={unit.slug}
              to={to(`/servizi/${unit.slug}`)}
              className="unit-card reveal"
              style={{ ["--accent" as string]: unit.accent }}
            >
              <div className="unit-card__top">
                <span className="unit-card__index">{unit.index}</span>
                <span className="unit-card__arrow">
                  <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden />
                </span>
              </div>
              <h3>{unit.name}</h3>
              <p className="unit-card__kicker">{unit.kicker}</p>
              <p className="unit-card__short">{unit.short}</p>
              <span className="unit-card__line" aria-hidden />
            </Link>
          ))}
        </div>

        <Link
          to={to("/esperienza")}
          className="vela-band reveal"
          aria-labelledby="vela-band-title"
        >
          <span className="vela-band__grid" aria-hidden />
          <span className="vela-band__orb" aria-hidden />
          <div className="vela-band__body">
            <span className="eyebrow">{t("Esperienza 3D · La Vela")}</span>
            <h3 id="vela-band-title">
              {t("Entra nella")} <em>{t("Vela.")}</em>
            </h3>
            <p>
              {t(
                "L'atrio digitale di Corax: quattro isole, il roster e i casi intorno a un unico core. Il sistema, da dentro.",
              )}
            </p>
          </div>
          <div className="vela-band__side">
            <dl className="vela-band__meta">
              <div>
                <dt>4</dt>
                <dd>{t("unit")}</dd>
              </div>
              <div>
                <dt>{content.talents.length}</dt>
                <dd>{t("talenti")}</dd>
              </div>
              <div>
                <dt>{content.projects.length}</dt>
                <dd>{t("casi")}</dd>
              </div>
            </dl>
            <span className="vela-band__cta">
              {t("Entra nella Vela")} <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden />
            </span>
          </div>
        </Link>
      </section>

      <section className="section section--paper properties">
        <SectionHead
          index="03"
          label="Properties"
          title={
            <>
              {t("Non aspettiamo i trend.")}
              <br />
              <em>{t("Li costruiamo.")}</em>
            </>
          }
          action={{ label: t("Tutte le properties"), to: "/media" }}
        >
          <p>
            {t(
              "Format, podcast e piattaforme proprietarie. Contenuti che non finiscono con una campagna, ma costruiscono pubblico, riconoscibilità e valore nel tempo.",
            )}
          </p>
        </SectionHead>
        <div className="properties__grid">
          {content.properties.map((property, i) => (
            <PropertyCard key={property.slug} property={property} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--dark work">
        <SectionHead
          index="04"
          label={t("Selected work")}
          title={
            <>
              {t("Non facciamo campagne.")}
              <br />
              <em>{t("Facciamo casi.")}</em>
            </>
          }
          action={{ label: t("Tutti i casi"), to: "/progetti" }}
        >
          <p>
            {t(
              "Campagne, format e produzioni che hanno messo insieme brand, talenti e piattaforme. Non una selezione di belle immagini: una selezione di risultati.",
            )}
          </p>
        </SectionHead>
        <div className="work__grid">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <div className="work__foot">
          <ArrowLink to="/progetti">{t("Esplora il portfolio completo")}</ArrowLink>
        </div>
      </section>

      <section className="spotlight">
        <div className="spotlight__media">
          <img
            src="/img/covers/citroen-01.jpg"
            alt={t("Frank Gramuglia a bordo di una Citroën Ami in città")}
            loading="lazy"
            width={1600}
            height={900}
          />
        </div>
        <div className="spotlight__body">
          <span className="eyebrow">{t("Case spotlight · Citroën")}</span>
          <h2>
            {t("Quando il talento")}
            <br />
            <em>{t("diventa il media.")}</em>
          </h2>
          <p>
            {t(
              "Un viaggio a bordo di Ami con Frank Gramuglia: ironia, città e mobilità urbana. Un format costruito sulla personalità del creator, dove il brand è parte della storia e non un'interruzione.",
            )}
          </p>
          <dl className="spotlight__stats">
            <div>
              <dt>{t("Formato")}</dt>
              <dd>{t("On the road")}</dd>
            </div>
            <div>
              <dt>Unit</dt>
              <dd>{t("Talent + Media House")}</dd>
            </div>
            <div>
              <dt>{t("Anno")}</dt>
              <dd>2024</dd>
            </div>
          </dl>
          <ArrowLink to="/progetti/frank-gramuglia-citroen">{t("Leggi il caso")}</ArrowLink>
        </div>
      </section>

      <section className="section section--lavender talent-teaser">
        <SectionHead
          index="05"
          label="Talent"
          title={
            <>
              {t("Persone,")}
              <br />
              <em>{t("non profili.")}</em>
            </>
          }
          action={{ label: t("Il roster completo"), to: "/talent" }}
        >
          <p>
            {t(
              "Non cerchiamo follower. Cerchiamo persone con qualcosa da dire — e la disciplina per dirlo a lungo. Poi costruiamo un percorso, non una singola collaborazione.",
            )}
          </p>
        </SectionHead>

        <div className="talent-teaser__grid">
          {featuredTalents.slice(0, 6).map((talent, i) => (
            <Link
              to={to(`/talent/${talent.slug}`)}
              className="talent-mini"
              key={talent.slug}
            >
              <span className="talent-mini__media">
                <img
                  src={`/img/talents/${talent.slug}.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={1000}
                />
              </span>
              <span className="talent-mini__text">
                <h3>{talent.name}</h3>
                <p>{talent.categories.join(" · ")}</p>
              </span>
              <span className="talent-mini__index">{String(i + 1).padStart(2, "0")}</span>
              <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--paper clients">
        <SectionHead
          index="06"
          label={t("Brand & partner")}
          title={
            <>
              {t("Non clienti.")}
              <br />
              <em>{t("Complici.")}</em>
            </>
          }
          action={{ label: t("Tutti i clienti"), to: "/clienti" }}
        >
          <p>
            {t(
              "Brand, istituzioni e piattaforme che non si sono accontentate di esserci. Hanno scelto di costruire con noi.",
            )}
          </p>
        </SectionHead>

        <div className="client-teaser">
          {content.clients.slice(0, 3).map((client) => (
            <Link
              key={client.slug}
              to={to(`/clienti/${client.slug}`)}
              className="client-teaser__card"
              style={{ ["--accent" as string]: client.accent }}
            >
              <span className="client-teaser__logo">
                <BrandLogo
                  name={client.name}
                  monogram={client.monogram}
                  plain
                  decorative
                />
              </span>
              <span className="client-teaser__name">
                <h3>{client.name}</h3>
                <p>{client.sector}</p>
              </span>
              <ArrowUpRight size={16} strokeWidth={1.4} aria-hidden />
            </Link>
          ))}
        </div>

        <div className="logo-wall" aria-label={t("Brand e partner Corax")}>
          {clients.map((client) => (
            <span key={client} className="logo-wall__item logo-wall__item--logo">
              <BrandLogo name={client} plain />
            </span>
          ))}
        </div>
      </section>

      <section className="section section--dark press">
        <SectionHead
          index="07"
          label={t("Insight & recognition")}
          title={
            <>
              {t("La crescita")}
              <br />
              <em>{t("si vede da fuori.")}</em>
            </>
          }
          action={{ label: t("Tutte le news"), to: "/insight" }}
        >
          <p>
            {t(
              "Riconoscimenti, campagne e traguardi. La crescita si vede da fuori, ma si costruisce dentro.",
            )}
          </p>
        </SectionHead>

        <div className="press__grid">
          <Link to={to("/insight/leader-della-crescita-2026")} className="press-feature">
            <span className="press-feature__media">
              <img
                src="/img/covers/leader.jpg"
                alt={t("Quattro persone del team Corax in posa su fondo scuro")}
                loading="lazy"
                decoding="async"
                width={1600}
                height={900}
              />
            </span>
            <span className="press-feature__award">Il Sole 24 Ore</span>
            <h3>{t("Leader della Crescita 2026")}</h3>
            <p>
              {t(
                "Corax entra nella classifica delle aziende italiane con la maggiore crescita di ricavi nel triennio 2021–2024.",
              )}
            </p>
            <span className="press-feature__cta">
              {t("Leggi il riconoscimento")} <ArrowUpRight size={18} aria-hidden />
            </span>
            <span className="press-feature__ring" aria-hidden />
          </Link>
          <div className="press__list">
            {content.news
              .filter((item) => item.featured)
              .slice(1, 4)
              .map((item, i) => (
                <NewsCard key={item.slug} item={item} index={i} />
              ))}
          </div>
        </div>
      </section>

      <InstagramLive />

      <GrowthScan />

      <section className="section section--paper faq-home">
        <SectionHead index="10" label="FAQ" title={t("Domande, prima di iniziare.")}>
          <p>{t("Le risposte che servono per capire chi siamo e come possiamo lavorare insieme.")}</p>
        </SectionHead>
        <FAQ items={content.faqs.slice(0, 6)} />
      </section>

      <CTABand secondary={{ label: t("Tutti i casi"), to: "/progetti" }} />

      <Showreel open={reelOpen} onClose={() => setReelOpen(false)} />
    </>
  );
}
