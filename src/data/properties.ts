export type Property = {
  slug: string;
  name: string;
  type: string;
  claim: string;
  since: string;
  partners?: string;
  excerpt: string;
  intro: string;
  body: string[];
  cover: string | null;
  coverAlt: string;
  accent: string;
  stats: { value: string; label: string }[];
  highlights: string[];
  links?: { label: string; href: string }[];
  tags: string[];
};

export const properties: Property[] = [
  {
    slug: "poretcast",
    name: "PoretCast",
    type: "Video podcast",
    claim: "Il salotto d'Italia, senza copione.",
    since: "2022",
    partners: "Con Giacomo Poretti",
    excerpt:
      "Il video podcast di Giacomo Poretti: conversazioni lunghe, ospiti inattesi e 30 milioni di views su YouTube.",
    intro:
      "C'è un divano, una pianta, un'insegna al neon e due poltrone rosa. Da lì passano musicisti, attori, scrittori, scienziati e campioni. PoretCast è il format che ha riportato la conversazione al centro, trasformando YouTube in un luogo intimo e domestico.",
    body: [
      "Prodotto da Corax Media House, PoretCast è un format editoriale proprietario che unisce l'esperienza teatrale di Giacomo Poretti alla grammatica del digitale. Ogni episodio è un evento, ogni ospite è una storia, ogni clip è un frammento che continua a circolare.",
      "Il progetto vive su YouTube e si distribuisce sulle piattaforme audio, con un sistema di contenuti verticali che moltiplica la portata di ogni conversazione. La produzione è interamente interna: set, regia, post-produzione, sound e distribuzione.",
    ],
    cover: "/img/covers/poretcast-01.jpg",
    coverAlt: "Giacomo Poretti e un ospite sul set del PoretCast",
    accent: "#ff5a3c",
    stats: [
      { value: "30 MLN+", label: "view YouTube" },
      { value: "3", label: "stagioni" },
      { value: "+20%", label: "crescita 2024" },
      { value: "#1", label: "podcast in Italia" },
    ],
    highlights: [
      "Cesare Cremonini",
      "Alessandro Cattelan",
      "Fabio Fazio",
      "Rose Villain",
      "Lazza",
      "Mauro Biglino",
      "Stefano Nazzi",
      "e molti altri",
    ],
    links: [
      { label: "YouTube", href: "https://www.youtube.com/@PoretCast" },
      { label: "Spotify", href: "https://open.spotify.com/" },
    ],
    tags: ["Podcast", "YouTube", "Entertainment", "Format proprietario"],
  },
  {
    slug: "immedia",
    name: "Immedia",
    type: "Editorial platform",
    claim: "La sostenibilità, senza retorica.",
    since: "2024",
    partners: "Con Giovanni Storti e Arianna Izzi",
    excerpt:
      "La piattaforma editoriale multicanale che racconta ambiente, cibo, città e scelte quotidiane con un linguaggio pop.",
    intro:
      "Immedia è una piattaforma editoriale multicanale dedicata alla sostenibilità, realizzata da Corax con Giovanni Storti e la divulgatrice scientifica Arianna Izzi. Un progetto che nasce dall'idea che il tema ambientale non abbia bisogno di allarmismo, ma di racconto.",
    body: [
      "Ambiente, cibo, mobilità, lavoro, diversità: Immedia affronta la sostenibilità come una questione culturale e quotidiana, traducendo dati e ricerche in contenuti accessibili, con il tono di chi sa intrattenere.",
      "La piattaforma vive su Instagram, TikTok e YouTube, con format seriali, collaborazioni e operazioni speciali. È un presidio editoriale che permette a brand e istituzioni di avvicinare il tema senza banalizzarlo.",
    ],
    cover: "/img/covers/babaco-01.jpg",
    coverAlt: "Giovanni Storti con un cesto di verdure fresche, simbolo del racconto Immedia",
    accent: "#c8ff4d",
    stats: [
      { value: "4+", label: "canali" },
      { value: "100%", label: "originale" },
      { value: "ONGOING", label: "editoriale" },
      { value: "1", label: "community" },
    ],
    highlights: [
      "Format seriali",
      "Divulgazione scientifica",
      "Brand partnership",
      "Eventi e live",
      "Contenuti multi-piattaforma",
    ],
    links: [{ label: "Instagram", href: "https://www.instagram.com/immediaofficial/" }],
    tags: ["Sostenibilità", "Editoria", "Social", "Purpose"],
  },
  {
    slug: "a-tu-per-tu",
    name: "A tu per tu",
    type: "FAST channel",
    claim: "Il vodcast incontra la televisione.",
    since: "2026",
    partners: "Con Samsung TV Plus e The Channel Store",
    excerpt:
      "Il primo canale FAST italiano dedicato ai vodcast e ai format conversazionali, disponibile su Samsung TV Plus.",
    intro:
      "A tu per tu è il primo canale FAST (Free Ad-Supported Streaming TV) italiano dedicato ai vodcast, realizzato da Corax con The Channel Store e distribuito su Samsung TV Plus. Un progetto che porta la conversazione digitale dentro il salotto, senza perdere la sua anima.",
    body: [
      "Il canale propone una selezione di vodcast e format conversazionali sviluppati e distribuiti da Corax, portando nell'ecosistema della Connected TV uno stile narrativo nato e cresciuto sulle piattaforme digitali.",
      "Un nuovo touchpoint per i brand e per le properties del sistema, che estende la vita dei contenuti e apre scenari pubblicitari in un ambiente in forte crescita.",
    ],
    cover: "/img/covers/atupertu-collage.jpg",
    coverAlt: "Una selezione dei programmi del canale A tu per tu",
    accent: "#5b3df5",
    stats: [
      { value: "1°", label: "in Italia" },
      { value: "24/7", label: "palinsesto" },
      { value: "CTV", label: "connected TV" },
      { value: "2026", label: "lancio" },
    ],
    highlights: [
      "Palinsesto continuativo",
      "Vodcast e format conversazionali",
      "Distribuzione Samsung TV Plus",
      "Nuove opportunità pubblicitarie",
    ],
    tags: ["FAST", "Connected TV", "Vodcast", "Distribuzione"],
  },
  {
    slug: "ttp",
    name: "TTP",
    type: "Program",
    claim: "Tech Talent Factory.",
    since: "2025",
    excerpt:
      "Il programma che connette i talenti del tech al racconto dei media: formazione, contenuti e nuove voci.",
    intro:
      "TTP — Tech Talent Factory è il programma con cui Corax investe nei talenti della tecnologia e nell'innovazione applicata ai media. Un progetto che unisce formazione, sperimentazione e produzione di contenuti.",
    body: [
      "TTP nasce per costruire un ponte tra le competenze tecniche e la capacità di raccontarle. Un programma pensato per far emergere nuove voci, sperimentare nuovi formati e alimentare l'ecosistema di Corax.",
      "Il progetto si inserisce nella strategia di crescita del gruppo, che nel 2026 punta a 20 nuovi format e a un ampliamento significativo degli spazi produttivi.",
    ],
    cover: null,
    coverAlt: "TTP — Tech Talent Factory, il programma Corax",
    accent: "#c8ff4d",
    stats: [
      { value: "2025", label: "lancio" },
      { value: "TECH", label: "verticale" },
      { value: "20", label: "format nel 2026" },
      { value: "100%", label: "innovazione" },
    ],
    highlights: ["Nuovi talenti", "Formazione", "Sperimentazione", "Contenuti tech"],
    tags: ["Tech", "Talent", "Program", "Innovazione"],
  },
  {
    slug: "influenceritalia",
    name: "Influenceritalia",
    type: "Platform",
    claim: "Il matching tra brand e creator.",
    since: "2022",
    excerpt:
      "La piattaforma proprietaria che mette in contatto brand e creator, nata dall'esperienza quotidiana della talent agency.",
    intro:
      "Influenceritalia è la piattaforma del sistema Corax che mette in contatto brand e creator, rendendo la selezione più semplice e trasparente. Un prodotto tech costruito ascoltando chi lo usa ogni giorno.",
    body: [
      "Profili strutturati, filtri intelligenti e un flusso di contatto diretto: Influenceritalia riduce la distanza tra un brief e la persona giusta per raccontarlo.",
      "La piattaforma è parte dell'ecosistema tecnologico di Corax, insieme a CRM, dashboard e strumenti di misurazione sviluppati internamente.",
    ],
    cover: null,
    coverAlt: "Influenceritalia, piattaforma Corax",
    accent: "#5b3df5",
    stats: [
      { value: "FULL STACK", label: "sviluppo" },
      { value: "MATCH", label: "brand e creator" },
      { value: "1", label: "piattaforma" },
      { value: "ONGOING", label: "prodotto" },
    ],
    highlights: ["Database creator", "Filtri intelligenti", "Contatto diretto", "Dashboard"],
    tags: ["Piattaforma", "Creator economy", "Tech", "Prodotto"],
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
