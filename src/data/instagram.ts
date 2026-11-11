import generatedRaw from "./instagram.generated.json";

export const instagramProfile = {
  handle: "coraxcompany",
  label: "@coraxcompany",
  url: "https://www.instagram.com/coraxcompany/",
};

export type InstaCategory =
  | "Azienda"
  | "Campagne"
  | "Media"
  | "Talent"
  | "Premi"
  | "Instagram";

export type StorySlide = {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  text: string;
  /** "contain" per immagini editoriali 16:9: card centrata su fondo sfocato. */
  fit?: "cover" | "contain";
  cta?: { label: string; href: string };
};

export type Story = {
  id: string;
  label: string;
  category: InstaCategory;
  date: string;
  cover: string;
  coverAlt: string;
  /** Copertina tipografica per storie con visual editoriale 16:9. */
  coverMark?: string;
  coverTone?: "violet" | "coral" | "acid" | "ink";
  slides: StorySlide[];
};

export type InstaPost = {
  id: string;
  image: string;
  alt: string;
  /** "contain" per visual editoriali con testo: evita crop involontari. */
  fit?: "cover" | "contain";
  caption: string;
  date: string;
  type: "Post" | "Reel" | "Carosello";
  category: InstaCategory;
  href: string;
  external?: boolean;
  /** Caso portfolio collegato, quando il contenuto non linka già un progetto. */
  project?: string;
};

export type Initiative = {
  date: string;
  title: string;
  category: InstaCategory;
  summary: string;
  /** Caso portfolio collegato: ogni iniziativa ha il suo progetto. */
  project: string;
  href: string;
  external?: boolean;
};

const MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

/** Data italiana deterministica: nessun fuso orario, nessun mismatch in SSR. */
export function formatItalianDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function shortDate(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}.${month}.${year}`;
}

export const stories: Story[] = [
  {
    id: "corax-score",
    label: "Corax Score",
    category: "Azienda",
    date: "2026-10-21",
    cover: "/img/og-cover.jpg",
    coverAlt: "Corax Score: il test della crescita in trenta secondi",
    coverMark: "CS",
    coverTone: "violet",
    slides: [
      {
        image: "/img/og-cover.jpg",
        fit: "contain",
        alt: "Corax Score: il test della crescita in trenta secondi",
        kicker: "Nuovo strumento",
        title: "Quanto è pronta la tua crescita?",
        text: "Cinque domande. Trenta secondi. Un punteggio da 25 a 100 e la unit da cui partire.",
        cta: { label: "Fai il test", href: "/#growth-scan" },
      },
      {
        image: "/img/og-cover.jpg",
        fit: "contain",
        alt: "Il risultato del Corax Score con la unit consigliata",
        kicker: "Perché farlo",
        title: "Non è un voto. È una direzione.",
        text: "Nessuna email obbligatoria. Alla fine hai un brief già pronto per parlarne con noi.",
        cta: { label: "Scopri il Corax Score", href: "/#growth-scan" },
      },
    ],
  },
  {
    id: "rossopomodoro",
    label: "Rossopomodoro",
    category: "Campagne",
    date: "2026-10-07",
    cover: "/img/covers/cooking-hands.jpg",
    coverAlt: "Le mani di un pizzaiolo al lavoro per la campagna Rossopomodoro",
    slides: [
      {
        image: "/img/covers/cooking-hands.jpg",
        alt: "La lavorazione dell'impasto per la campagna Rossopomodoro",
        kicker: "Campagna · Food",
        title: "A ognuno la sua.",
        text: "Napoletana, croccante o padellino: la pizza come scelta personale, non come categoria.",
        cta: { label: "Guarda il caso", href: "/progetti/rossopomodoro" },
      },
      {
        image: "/img/covers/plate-pasta.jpg",
        alt: "Il piatto finito della campagna Rossopomodoro",
        kicker: "On air",
        title: "Dal forno al feed.",
        text: "Un sistema creativo per tutti i touchpoint, con media planning di Digital Angels.",
        cta: {
          label: "Leggi la news",
          href: "/insight/rossopomodoro-a-ognuno-la-sua",
        },
      },
    ],
  },
  {
    id: "poretcast",
    label: "PoretCast",
    category: "Media",
    date: "2026-09-18",
    cover: "/img/covers/poretcast-01.jpg",
    coverAlt: "Il salotto del PoretCast con Giacomo Poretti",
    slides: [
      {
        image: "/img/covers/poretcast-01.jpg",
        alt: "Il set del PoretCast",
        kicker: "Property · 30 MLN+",
        title: "Il salotto più grande d'Italia.",
        text: "Il PoretCast supera i 30 milioni di views su YouTube. La conversazione è il format.",
        cta: { label: "Apri PoretCast", href: "/media/poretcast" },
      },
      {
        image: "/img/covers/poretcast-02.jpg",
        alt: "Giacomo Poretti durante una puntata del PoretCast",
        kicker: "La formula",
        title: "Nessun copione. Solo ospiti giusti.",
        text: "Giacomo Poretti trasforma YouTube in un salotto aperto al mondo. Google Italia lo ha raccontato così.",
        cta: {
          label: "Leggi l'approfondimento",
          href: "/insight/poretcast-google-youtube",
        },
      },
    ],
  },
  {
    id: "la-vela",
    label: "La Vela",
    category: "Azienda",
    date: "2026-09-02",
    cover: "/img/covers/news-results.jpg",
    coverAlt: "La crescita di Corax raccontata nei numeri",
    coverMark: "850",
    coverTone: "acid",
    slides: [
      {
        image: "/img/covers/news-results.jpg",
        fit: "contain",
        alt: "I numeri della crescita Corax",
        kicker: "Azienda · Milano",
        title: "1.500 mq di sistema.",
        text: "La Vela cresce: 850 mq in più tra uffici e studi di produzione. Lo spazio è parte del racconto.",
        cta: { label: "Entra a La Vela", href: "/chi-siamo" },
      },
      {
        image: "/img/covers/news-leader.jpg",
        fit: "contain",
        alt: "Corax nei Leader della Crescita 2026",
        kicker: "2026",
        title: "20 nuovi format.",
        text: "Produzione, distribuzione e un organico che raddoppia. Il sistema si allarga, non si diluisce.",
        cta: { label: "Scopri il sistema", href: "/sistema" },
      },
    ],
  },
  {
    id: "tiffany",
    label: "Tiffany & Co.",
    category: "Campagne",
    date: "2026-06-18",
    cover: "/img/covers/tiffany-event.jpg",
    coverAlt: "Un evento Tiffany & Co. con allestimento luminoso",
    slides: [
      {
        image: "/img/covers/tiffany-event.jpg",
        alt: "L'evento Tiffany & Co. prodotto da Corax",
        kicker: "Campagna · OOH",
        title: "Tiffany & Co. va in strada.",
        text: "La maison incontra il pubblico negli spazi della città, non solo in vetrina.",
        cta: { label: "Guarda il caso", href: "/progetti/tiffany-ooh" },
      },
      {
        image: "/img/covers/tiffany-necklace.jpg",
        alt: "La collezione Tiffany & Co. in mostra",
        kicker: "Il dettaglio",
        title: "Lusso è attenzione.",
        text: "Un progetto out-of-home costruito per fermare lo sguardo e restare nella memoria.",
        cta: { label: "Tutti i progetti", href: "/progetti" },
      },
    ],
  },
  {
    id: "immedia",
    label: "Immedia",
    category: "Media",
    date: "2026-06-04",
    cover: "/img/covers/babaco-01.jpg",
    coverAlt: "Giovanni Storti con un cesto di ortaggi per Immedia",
    slides: [
      {
        image: "/img/covers/babaco-01.jpg",
        alt: "Giovanni Storti nel verde per Immedia",
        kicker: "Property · Media",
        title: "Immedia, seconda stagione.",
        text: "Giovanni Storti e Arianna Izzi portano il format oltre il confine tra contenuto e conversazione.",
        cta: { label: "Apri Immedia", href: "/media/immedia" },
      },
      {
        image: "/img/covers/cooking-hands.jpg",
        alt: "La cucina come racconto della sostenibilità",
        kicker: "Il metodo",
        title: "Un format, mille ritagli.",
        text: "Ogni puntata è un ecosistema: video, clip, podcast e contenuti per tutte le piattaforme.",
        cta: { label: "Scopri la media house", href: "/servizi/media-house" },
      },
    ],
  },
  {
    id: "a-tu-per-tu",
    label: "A tu per tu",
    category: "Media",
    date: "2026-05-01",
    cover: "/img/covers/atupertu-collage.jpg",
    coverAlt: "Una selezione dei programmi del canale A tu per tu",
    coverMark: "A2T",
    coverTone: "ink",
    slides: [
      {
        image: "/img/covers/atupertu-collage.jpg",
        fit: "contain",
        alt: "I programmi del canale A tu per tu",
        kicker: "Property · FAST",
        title: "Il primo canale FAST italiano di vodcast.",
        text: "Con The Channel Store e Samsung TV Plus, i format Corax arrivano sulla Connected TV.",
        cta: { label: "Apri A tu per tu", href: "/media/a-tu-per-tu" },
      },
      {
        image: "/img/covers/atupertu-tv.jpg",
        fit: "contain",
        alt: "L'interfaccia del canale A tu per tu su Samsung TV Plus",
        kicker: "Perché conta",
        title: "La TV non è finita. È cambiata.",
        text: "Un nuovo touchpoint per i brand, dentro un ambiente in crescita e senza rumore.",
        cta: {
          label: "Leggi la news",
          href: "/insight/a-tu-per-tu-samsung-tv-plus",
        },
      },
    ],
  },
  {
    id: "kick-off",
    label: "Kick off Talk",
    category: "Media",
    date: "2026-04-16",
    cover: "/img/covers/football-lineup.jpg",
    coverAlt: "La squadra schierata per il format Kick off Talk",
    slides: [
      {
        image: "/img/covers/football-lineup.jpg",
        alt: "Il campo e la squadra di Kick off Talk",
        kicker: "Format · Sport",
        title: "Il calcio fuori dal campo.",
        text: "Voci, storie e punti di vista che il novanta minuti non contiene.",
        cta: { label: "Guarda il format", href: "/progetti/kick-off-talk" },
      },
      {
        image: "/img/covers/football-duo.jpg",
        alt: "Due ospiti di Kick off Talk",
        kicker: "La domenica",
        title: "Non solo highlights.",
        text: "Un format che trasforma la partita in conversazione e la conversazione in community.",
        cta: { label: "Tutti i format", href: "/media" },
      },
    ],
  },
  {
    id: "theshow",
    label: "theShow",
    category: "Talent",
    date: "2026-03-01",
    cover: "/img/covers/news-theshow.jpg",
    coverAlt: "Copertina editoriale Corax: theShow entra nel sistema",
    coverMark: "tS",
    coverTone: "coral",
    slides: [
      {
        image: "/img/covers/news-theshow.jpg",
        fit: "contain",
        alt: "theShow entra nel sistema Corax",
        kicker: "Talent · Entertainment",
        title: "theShow entra nel sistema.",
        text: "Tredici anni di esperimenti social, candid camera e format. Ora con Corax: business, distribuzione, nuovi progetti.",
        cta: {
          label: "Leggi la news",
          href: "/insight/theshow-entra-in-corax",
        },
      },
      {
        image: "/img/covers/news-theshow.jpg",
        fit: "contain",
        alt: "Il dietro le quinte di theShow",
        kicker: "Cosa cambia",
        title: "La velocità del verticale. Il valore dell'orizzontale.",
        text: "Un ponte tra intrattenimento digitale e produzione. Senza perdere l'identità.",
        cta: { label: "Il roster", href: "/talent/theshow" },
      },
    ],
  },
  {
    id: "risparmio-casa",
    label: "Risparmio Casa",
    category: "Campagne",
    date: "2026-02-17",
    cover: "/img/covers/risparmio-01.jpg",
    coverAlt: "Un ritratto dal set della campagna Risparmio Casa",
    slides: [
      {
        image: "/img/covers/risparmio-01.jpg",
        alt: "Il set della campagna Risparmio Casa",
        kicker: "Campagna · Retail",
        title: "Risparmio Casa, tutto l'anno.",
        text: "Influencer marketing su Instagram e TikTok con un calendario che segue le stagionalità del retail.",
        cta: { label: "Guarda il caso", href: "/progetti/risparmio-casa" },
      },
      {
        image: "/img/covers/risparmio-02.jpg",
        alt: "Contenuti creator per Risparmio Casa",
        kicker: "La relazione",
        title: "Non una campagna. Una presenza.",
        text: "Creator, produzione e misurazione in un unico incarico annuale.",
        cta: {
          label: "Leggi la news",
          href: "/insight/risparmio-casa-influencer-marketing",
        },
      },
    ],
  },
  {
    id: "citroen",
    label: "Citroën × Frank",
    category: "Campagne",
    date: "2026-01-20",
    cover: "/img/covers/citroen-01.jpg",
    coverAlt: "Frank Gramuglia a bordo di una Citroën Ami in città",
    slides: [
      {
        image: "/img/covers/citroen-01.jpg",
        alt: "Frank Gramuglia alla guida di Citroën Ami",
        kicker: "Case · Mobility",
        title: "Frank × Citroën Ami.",
        text: "Un viaggio in città con Frank Gramuglia: ironia, mobilità e un brand dentro la storia.",
        cta: {
          label: "Guarda il caso",
          href: "/progetti/frank-gramuglia-citroen",
        },
      },
      {
        image: "/img/covers/citroen-02.jpg",
        alt: "Un momento del viaggio con Frank Gramuglia",
        kicker: "Il talento è il media",
        title: "Non interruzioni. Contenuti.",
        text: "Il format nasce dalla personalità del creator, non dal media plan.",
        cta: { label: "Scopri il roster", href: "/talent" },
      },
    ],
  },
  {
    id: "leader",
    label: "Leader 2026",
    category: "Premi",
    date: "2025-11-12",
    cover: "/img/covers/news-leader.jpg",
    coverAlt: "Corax nei Leader della Crescita 2026 del Sole 24 Ore",
    coverMark: "+45%",
    coverTone: "violet",
    slides: [
      {
        image: "/img/covers/news-leader.jpg",
        fit: "contain",
        alt: "Corax nei Leader della Crescita 2026",
        kicker: "Premio · Il Sole 24 Ore",
        title: "Leader della Crescita 2026.",
        text: "8 milioni di fatturato 2025, +45% sul 2024. Corax entra nella classifica delle aziende che crescono di più.",
        cta: {
          label: "Leggi il riconoscimento",
          href: "/insight/leader-della-crescita-2026",
        },
      },
      {
        image: "/img/covers/news-results.jpg",
        fit: "contain",
        alt: "I numeri della crescita Corax",
        kicker: "Il prossimo passo",
        title: "12 milioni. 20 format. 1.500 mq.",
        text: "Nel 2026 il sistema si espande. Il resto lo costruiamo insieme.",
        cta: { label: "Parliamone", href: "/contatti" },
      },
    ],
  },
];

export const editorialPosts: InstaPost[] = [
  {
    id: "corax-score",
    image: "/img/og-cover.jpg",
    fit: "contain",
    alt: "Corax Score: cinque domande per capire da dove partire",
    caption:
      "5 domande. 30 secondi. Un punteggio da 25 a 100 e la unit da cui partire. Il Corax Score è online. → corax.it/#growth-scan",
    date: "2026-10-21",
    type: "Post",
    category: "Azienda",
    href: "/#growth-scan",
    project: "corax-score",
  },
  {
    id: "rossopomodoro",
    image: "/img/covers/cooking-hands.jpg",
    alt: "La lavorazione dell'impasto per Rossopomodoro",
    caption:
      "A ognuno la sua. Napoletana, croccante o padellino: la pizza è una scelta personale. Nuova campagna per Rossopomodoro, on air dal 1° ottobre.",
    date: "2026-10-07",
    type: "Reel",
    category: "Campagne",
    href: "/progetti/rossopomodoro",
  },
  {
    id: "poretcast-30m",
    image: "/img/covers/poretcast-02.jpg",
    alt: "Il salotto del PoretCast con Giacomo Poretti",
    caption:
      "30 milioni di views e un salotto che continua a riempirsi. Il PoretCast è una delle properties più riconoscibili del sistema Corax.",
    date: "2026-09-18",
    type: "Reel",
    category: "Media",
    href: "/media/poretcast",
    project: "poretcast",
  },
  {
    id: "la-vela",
    image: "/img/covers/news-results.jpg",
    fit: "contain",
    alt: "La crescita di Corax raccontata nei numeri",
    caption:
      "1.500 mq a Milano, 850 in più per uffici e produzione. La Vela cresce insieme al sistema.",
    date: "2026-09-02",
    type: "Carosello",
    category: "Azienda",
    href: "/chi-siamo",
    project: "la-vela",
  },
  {
    id: "tiffany",
    image: "/img/covers/tiffany-event.jpg",
    alt: "Un evento Tiffany & Co. con allestimento luminoso",
    caption:
      "Tiffany & Co. incontra la città. Un progetto out-of-home che trasforma lo spazio urbano in un momento di marca.",
    date: "2026-06-18",
    type: "Post",
    category: "Campagne",
    href: "/progetti/tiffany-ooh",
  },
  {
    id: "immedia",
    image: "/img/covers/babaco-01.jpg",
    alt: "Giovanni Storti con un cesto di ortaggi per Immedia",
    caption:
      "Immedia, stagione due. Giovanni Storti e Arianna Izzi tornano con nuovi ospiti e nuovi formati.",
    date: "2026-06-04",
    type: "Reel",
    category: "Media",
    href: "/media/immedia",
    project: "immedia",
  },
  {
    id: "a-tu-per-tu",
    image: "/img/covers/atupertu-collage.jpg",
    fit: "contain",
    alt: "I programmi del canale A tu per tu",
    caption:
      "Il primo canale FAST italiano dedicato ai vodcast, su Samsung TV Plus. A tu per tu, con The Channel Store.",
    date: "2026-05-01",
    type: "Post",
    category: "Media",
    href: "/media/a-tu-per-tu",
    project: "a-tu-per-tu",
  },
  {
    id: "kick-off",
    image: "/img/covers/football-lineup.jpg",
    alt: "La squadra schierata per il format Kick off Talk",
    caption:
      "Il calcio che si racconta fuori dal campo. Kick off Talk, un format Corax.",
    date: "2026-04-16",
    type: "Reel",
    category: "Media",
    href: "/progetti/kick-off-talk",
  },
  {
    id: "theshow",
    image: "/img/covers/news-theshow.jpg",
    fit: "contain",
    alt: "Copertina editoriale: theShow entra nel sistema Corax",
    caption:
      "theShow entra nel sistema Corax. Business, distribuzione e nuovi format per uno dei nomi storici dell'intrattenimento digitale.",
    date: "2026-03-01",
    type: "Reel",
    category: "Talent",
    href: "/progetti/theshow",
  },
  {
    id: "risparmio-casa",
    image: "/img/covers/risparmio-02.jpg",
    alt: "Contenuti creator per Risparmio Casa",
    caption:
      "Influencer marketing su Instagram e TikTok, tutto l'anno. Risparmio Casa sceglie Corax.",
    date: "2026-02-17",
    type: "Post",
    category: "Campagne",
    href: "/progetti/risparmio-casa",
  },
  {
    id: "citroen",
    image: "/img/covers/citroen-02.jpg",
    alt: "Frank Gramuglia in viaggio con Citroën Ami",
    caption: "Frank Gramuglia × Citroën Ami. Quando il talento diventa il media.",
    date: "2026-01-20",
    type: "Reel",
    category: "Campagne",
    href: "/progetti/frank-gramuglia-citroen",
  },
  {
    id: "leader",
    image: "/img/covers/news-leader.jpg",
    fit: "contain",
    alt: "Corax nei Leader della Crescita 2026 del Sole 24 Ore",
    caption:
      "Leader della Crescita 2026. 8 milioni di fatturato, +45%. Il Sole 24 Ore racconta la nostra crescita.",
    date: "2025-11-12",
    type: "Carosello",
    category: "Premi",
    href: "/insight/leader-della-crescita-2026",
    project: "leader-crescita-2026",
  },
];

type GeneratedPost = {
  id: string;
  caption: string;
  mediaType: string;
  image: string;
  permalink: string;
  timestamp: string;
};

const generated = generatedRaw as {
  updatedAt: string | null;
  posts: GeneratedPost[];
};

const instagramPosts: InstaPost[] = generated.posts.map((post) => {
  const date = post.timestamp.slice(0, 10);
  return {
    id: post.id,
    image: post.image,
    alt: post.caption ? post.caption.slice(0, 140) : "Post Instagram di Corax",
    caption: post.caption || "Nuovo contenuto dal profilo Instagram di Corax.",
    date,
    type:
      post.mediaType === "VIDEO"
        ? "Reel"
        : post.mediaType === "CAROUSEL_ALBUM"
          ? "Carosello"
          : "Post",
    category: "Instagram",
    href: post.permalink,
    external: true,
  };
});

export const instagramIsLive = instagramPosts.length > 0;

export const instaFeed: InstaPost[] = instagramIsLive
  ? instagramPosts
  : editorialPosts;

const initiativeList: Initiative[] = [
  {
    date: "2026-10-28",
    title: "73 persone, e ancora spazio",
    category: "Azienda",
    summary: "Nuove posizioni aperte a Milano tra strategy, produzione e talent.",
    project: "persone-corax",
    href: "/progetti/persone-corax",
  },
  {
    date: "2026-10-21",
    title: "Nasce il Corax Score",
    category: "Azienda",
    summary: "Cinque domande per capire da dove partire. Risultato immediato, nessun impegno.",
    project: "corax-score",
    href: "/progetti/corax-score",
  },
  {
    date: "2026-10-07",
    title: "Rossopomodoro — A ognuno la sua",
    category: "Campagne",
    summary: "Tre stili di pizza, un unico concept. On air dal 1° ottobre con Digital Angels.",
    project: "rossopomodoro",
    href: "/progetti/rossopomodoro",
  },
  {
    date: "2026-09-18",
    title: "PoretCast supera i 30 milioni di views",
    category: "Media",
    summary: "Il salotto di Giacomo Poretti si conferma uno dei format più visti d'Italia.",
    project: "poretcast",
    href: "/progetti/poretcast",
  },
  {
    date: "2026-09-02",
    title: "La Vela cresce di 850 mq",
    category: "Azienda",
    summary: "Uffici e studi di produzione: il sistema supera i 1.500 mq a Milano.",
    project: "la-vela",
    href: "/progetti/la-vela",
  },
  {
    date: "2026-07-15",
    title: "Google Italia racconta il PoretCast",
    category: "Media",
    summary: "YouTube come un salotto aperto al mondo, nella voce di Giacomo Poretti e Chiara Brunelli.",
    project: "poretcast-google",
    href: "/progetti/poretcast-google",
  },
  {
    date: "2026-06-18",
    title: "Tiffany & Co. — Eventi OOH",
    category: "Campagne",
    summary: "Produzione video per gli eventi e le installazioni out-of-home della maison.",
    project: "tiffany-ooh",
    href: "/progetti/tiffany-ooh",
  },
  {
    date: "2026-06-04",
    title: "Immedia, seconda stagione",
    category: "Media",
    summary: "Nuovi ospiti e nuovi formati per la piattaforma editoriale sulla sostenibilità.",
    project: "immedia",
    href: "/progetti/immedia",
  },
  {
    date: "2026-05-01",
    title: "A tu per tu, il primo canale FAST italiano di vodcast",
    category: "Media",
    summary: "Con The Channel Store su Samsung TV Plus: i format Corax arrivano sulla Connected TV.",
    project: "a-tu-per-tu",
    href: "/progetti/a-tu-per-tu",
  },
  {
    date: "2026-04-16",
    title: "Kick off Talk",
    category: "Media",
    summary: "Il calcio raccontato fuori dal campo, tra storie e punti di vista.",
    project: "kick-off-talk",
    href: "/progetti/kick-off-talk",
  },
  {
    date: "2026-03-01",
    title: "theShow entra nel sistema Corax",
    category: "Talent",
    summary: "Business, distribuzione e nuovi format per uno dei nomi storici del digitale.",
    project: "theshow",
    href: "/progetti/theshow",
  },
  {
    date: "2026-02-17",
    title: "Risparmio Casa affida a Corax l'influencer marketing",
    category: "Campagne",
    summary: "Gestione annuale delle attività creator su Instagram e TikTok.",
    project: "risparmio-casa",
    href: "/progetti/risparmio-casa",
  },
  {
    date: "2026-01-20",
    title: "Frank Gramuglia × Citroën Ami",
    category: "Campagne",
    summary: "Un viaggio in città dove il talento diventa il media.",
    project: "frank-gramuglia-citroen",
    href: "/progetti/frank-gramuglia-citroen",
  },
  {
    date: "2025-12-01",
    title: "Giacomo Poretti Presidente Onorario",
    category: "Azienda",
    summary: "Un nuovo ruolo per accompagnare la crescita del sistema e delle sue properties.",
    project: "presidenza-poretti",
    href: "/progetti/presidenza-poretti",
  },
  {
    date: "2025-11-12",
    title: "Leader della Crescita 2026",
    category: "Premi",
    summary: "Il Sole 24 Ore inserisce Corax tra le aziende italiane che crescono di più.",
    project: "leader-crescita-2026",
    href: "/progetti/leader-crescita-2026",
  },
  {
    date: "2025-11-03",
    title: "Pierfrancesco Petrosillo Chief Agency Officer",
    category: "Azienda",
    summary: "La unit Agency si rafforza con una nuova guida.",
    project: "pierfrancesco-petrosillo",
    href: "/progetti/pierfrancesco-petrosillo",
  },
  {
    date: "2025-07-03",
    title: "Impresoft Engage, il CRM diventa motore",
    category: "Azienda",
    summary: "Vendite, progetti, talenti e clienti in un unico sistema operativo.",
    project: "impresoft-engage",
    href: "/progetti/impresoft-engage",
  },
];

export const initiatives = [...initiativeList].sort((a, b) => b.date.localeCompare(a.date));

const editorialUpdatedAt =
  [
    ...stories.map((story) => story.date),
    ...editorialPosts.map((post) => post.date),
    ...initiativeList.map((item) => item.date),
  ]
    .sort()
    .at(-1) ?? "2026-11-11";

/** Data dell'ultimo contenuto: API se disponibile, altrimenti la redazione. */
export const instagramUpdatedAt = generated.updatedAt?.slice(0, 10) ?? editorialUpdatedAt;

export const initiativeCategories = [
  "Tutte",
  "Campagne",
  "Media",
  "Talent",
  "Azienda",
  "Premi",
] as const;

export const getInitiativeForProject = (slug: string) =>
  initiatives.find((item) => item.project === slug);

export const getPostsForProject = (slug: string) =>
  instaFeed
    .filter((post) => post.project === slug || post.href === `/progetti/${slug}`)
    .slice(0, 3);

export const instagramStats = {
  stories: stories.length,
  posts: instaFeed.length,
  initiatives: initiatives.length,
  cases: new Set(initiatives.map((item) => item.project)).size,
};
