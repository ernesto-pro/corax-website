export type Client = {
  slug: string;
  name: string;
  sector: string;
  since: string;
  accent: string;
  monogram: string;
  summary: string;
  intro: string[];
  services: string[];
  projects: string[];
  facts: { label: string; value: string }[];
};

export const clientsProfiles: Client[] = [
  {
    slug: "rossopomodoro",
    name: "Rossopomodoro",
    sector: "Food & hospitality",
    since: "2026",
    accent: "#ff5a3c",
    monogram: "RP",
    summary:
      "“A ognuno la sua”: un unico concept creativo per raccontare napoletana, croccante e padellino.",
    intro: [
      "Rossopomodoro ha scelto Corax per la campagna “A ognuno la sua”, on air dal 1° ottobre 2026. Il punto di partenza è un insight semplice: la pizza è cultura e condivisione, ma anche una scelta personale.",
      "Corax ha costruito il concept e il sistema creativo per tutti i touchpoint: un formato Hero per YouTube, contenuti social-first per Instagram Reels, declinazioni per programmatic e display, con il media planning curato da Digital Angels.",
    ],
    services: [
      "Strategia e concept creativo",
      "Produzione video e fotografica",
      "Declinazioni social, YouTube e programmatic",
    ],
    projects: ["rossopomodoro"],
    facts: [
      { label: "Relazione", value: "dal 2026" },
      { label: "Unit", value: "Agency" },
      { label: "Ambito", value: "Campagna integrata" },
      { label: "Touchpoint", value: "YouTube · Reels · display" },
    ],
  },
  {
    slug: "risparmio-casa",
    name: "Risparmio Casa",
    sector: "Retail",
    since: "2026",
    accent: "#5b3df5",
    monogram: "RC",
    summary:
      "La gestione annuale dell'influencer marketing sui profili ufficiali Instagram e TikTok del brand.",
    intro: [
      "Dopo una consultazione, Risparmio Casa ha scelto Corax come partner per la gestione annuale delle attività di influencer marketing legate ai profili ufficiali del brand su Instagram e TikTok.",
      "Un incarico che unisce scouting dei creator, brief, produzione, pubblicazione e misurazione. La strategia lavora su awareness, engagement e relazione con le community, con un calendario che accompagna le stagionalità del retail.",
    ],
    services: [
      "Strategia influencer annuale",
      "Scouting e gestione creator",
      "Produzione, community e reporting",
    ],
    projects: ["risparmio-casa"],
    facts: [
      { label: "Relazione", value: "dal 2026" },
      { label: "Unit", value: "Agency" },
      { label: "Ambito", value: "Influencer marketing" },
      { label: "Piattaforme", value: "Instagram · TikTok" },
    ],
  },
  {
    slug: "citroen",
    name: "Citroën",
    sector: "Automotive",
    since: "2024",
    accent: "#2f5bd0",
    monogram: "C",
    summary:
      "Un viaggio a bordo di Ami con Frank Gramuglia: quando il talento diventa il media.",
    intro: [
      "Frank Gramuglia incontra Citroën Ami e la città diventa un set. Un format on the road in cui l'ironia del creator si fonde con i codici del brand, raccontando la mobilità urbana dal punto di vista di chi la vive ogni giorno.",
      "Corax ha seguito concept, produzione e gestione della partnership, lavorando in stretta sinergia con il team del brand. Un contenuto nativo, costruito sulla personalità del talent invece che su un format pubblicitario preconfezionato.",
    ],
    services: [
      "Concept e soggetto editoriale",
      "Produzione on location e post",
      "Gestione talent, brand e distribuzione",
    ],
    projects: ["frank-gramuglia-citroen"],
    facts: [
      { label: "Relazione", value: "dal 2024" },
      { label: "Unit", value: "Talent · Media House" },
      { label: "Ambito", value: "Branded entertainment" },
      { label: "Formato", value: "On the road" },
    ],
  },
  {
    slug: "babaco-market",
    name: "Babaco Market",
    sector: "Food & grocery",
    since: "2024",
    accent: "#9bc94a",
    monogram: "BM",
    summary:
      "Giovanni Storti racconta una spesa diversa: sostenibilità, stagionalità e ironia.",
    intro: [
      "Babaco Market ha scelto Giovanni Storti per raccontare una spesa fatta di prodotti buoni e scelte consapevoli. La comicità diventa lo strumento per parlare di spreco, stagionalità e accessibilità del cibo senza moralismo.",
      "Contenuti scritti su misura per la voce del talent, una produzione leggera e una distribuzione coordinata sui canali del talent e del brand. Il risultato è un racconto che intrattiene e, allo stesso tempo, spiega.",
    ],
    services: [
      "Concept e scrittura",
      "Produzione contenuti",
      "Coordinamento talent e brand",
    ],
    projects: ["giovanni-storti-babaco-market"],
    facts: [
      { label: "Relazione", value: "dal 2024" },
      { label: "Unit", value: "Talent" },
      { label: "Ambito", value: "Branded entertainment" },
      { label: "Tema", value: "Food & sostenibilità" },
    ],
  },
  {
    slug: "treedom",
    name: "Treedom",
    sector: "Green",
    since: "2023",
    accent: "#b07a4a",
    monogram: "TR",
    summary:
      "Un albero, una storia: la voce di Giovanni Storti nel racconto della riforestazione.",
    intro: [
      "Treedom pianta alberi e racconta storie. Con Giovanni Storti, Corax ha costruito un progetto che unisce il tema ambientale a un tono leggero e riconoscibile, trasformando un gesto semplice in un racconto condivisibile.",
      "Un concept basato sull'autenticità del talent, contenuti verticali e una distribuzione coordinata. Il racconto parte dalla persona e arriva al progetto, senza passare dal pulpito.",
    ],
    services: ["Concept editoriale", "Produzione contenuti", "Distribuzione social"],
    projects: ["giovanni-storti-treedom"],
    facts: [
      { label: "Relazione", value: "dal 2023" },
      { label: "Unit", value: "Talent" },
      { label: "Ambito", value: "Cause-related" },
      { label: "Tema", value: "Riforestazione" },
    ],
  },
  {
    slug: "playstation",
    name: "PlayStation",
    sector: "Gaming & entertainment",
    since: "2023",
    accent: "#5b3df5",
    monogram: "PS",
    summary:
      "Gaming, calcio e ironia: PirlasV porta PlayStation dentro la sua community.",
    intro: [
      "PlayStation e PirlasV insieme per un progetto in cui il gaming incontra il calcio e l'ironia del creator. Un contenuto costruito sulla community, rispettando il linguaggio della piattaforma e la personalità del talent.",
      "Corax ha gestito il rapporto tra brand e talent, dal brief condiviso alla delivery, con una produzione pensata per i formati social e la libertà creativa necessaria a restare credibile.",
    ],
    services: [
      "Concept e coordinamento",
      "Produzione contenuti",
      "Gestione talent e brand",
    ],
    projects: ["playstation-pirlasv"],
    facts: [
      { label: "Relazione", value: "dal 2023" },
      { label: "Unit", value: "Talent" },
      { label: "Ambito", value: "Influencer marketing" },
      { label: "Verticale", value: "Gaming · sport" },
    ],
  },
  {
    slug: "nivea",
    name: "Nivea",
    sector: "Beauty & personal care",
    since: "2023",
    accent: "#2f5bd0",
    monogram: "NI",
    summary:
      "“Vola a Madrid”: un concorso trasformato in un racconto a puntate, tra creator e community.",
    intro: [
      "Nivea ha scelto Corax per un progetto che unisce prodotto, esperienza e community: un viaggio a Madrid diventato il premio di un meccanismo di partecipazione capace di generare conversazione e contenuti.",
      "Un racconto a puntate, creator coinvolti e una produzione leggera che accompagna tutte le fasi dell'iniziativa, dalla call alla partenza, evitando che l'attivazione si esaurisse nella sola meccanica del concorso.",
    ],
    services: [
      "Concept e meccanica",
      "Coordinamento creator",
      "Produzione e gestione social",
    ],
    projects: ["vola-a-madrid-nivea"],
    facts: [
      { label: "Relazione", value: "dal 2023" },
      { label: "Unit", value: "Agency" },
      { label: "Ambito", value: "Attivazione social" },
      { label: "Formato", value: "Concorso editoriale" },
    ],
  },
  {
    slug: "tiffany",
    name: "Tiffany & Co.",
    sector: "Luxury",
    since: "2023",
    accent: "#b07a4a",
    monogram: "T",
    summary:
      "Produzione video per eventi e installazioni out-of-home: luce, materia e dettaglio.",
    intro: [
      "Per Tiffany & Co., Corax ha curato la produzione video legata agli eventi e alle installazioni out-of-home. Un lavoro di precisione, in cui ogni inquadratura deve restituire la qualità del materiale e l'emozione dell'esperienza.",
      "Un presidio produttivo dedicato, dalla preparazione all'evento alla restituzione finale, con un'attenzione maniacale al dettaglio e alla coerenza visiva.",
    ],
    services: [
      "Produzione video evento",
      "Riprese e fotografia",
      "Post-produzione e adattamenti digitali",
    ],
    projects: ["tiffany-ooh"],
    facts: [
      { label: "Relazione", value: "dal 2023" },
      { label: "Unit", value: "Media House" },
      { label: "Ambito", value: "Produzione eventi" },
      { label: "Contesto", value: "OOH · luxury" },
    ],
  },
  {
    slug: "brioschi",
    name: "Brioschi",
    sector: "Real estate",
    since: "2024",
    accent: "#ff5a3c",
    monogram: "B",
    summary:
      "Frank Gramuglia racconta lo spazio e la città con un tono inaspettato.",
    intro: [
      "Brioschi e Frank Gramuglia insieme per raccontare lo spazio e la città con un tono inaspettato. Un format che porta il talent dentro un settore tradizionalmente serio, trasformandolo in un racconto pop.",
      "Il concept lavora sul contrasto tra la personalità del talent e il rigore del settore, con una produzione veloce e una distribuzione nativa per i canali social.",
    ],
    services: ["Concept e scrittura", "Produzione contenuti", "Gestione partnership"],
    projects: ["frank-gramuglia-brioschi"],
    facts: [
      { label: "Relazione", value: "dal 2024" },
      { label: "Unit", value: "Talent" },
      { label: "Ambito", value: "Branded entertainment" },
      { label: "Settore", value: "Real estate" },
    ],
  },
  {
    slug: "samsung-tv-plus",
    name: "Samsung TV Plus",
    sector: "Connected TV",
    since: "2026",
    accent: "#5b3df5",
    monogram: "ST",
    summary:
      "Con “A tu per tu”, il primo canale FAST italiano dedicato ai vodcast, arriva sul grande schermo.",
    intro: [
      "Samsung TV Plus ospita “A tu per tu”, il primo canale FAST italiano dedicato ai vodcast e ai format conversazionali, realizzato da Corax con The Channel Store.",
      "Un progetto che porta la grammatica del digitale dentro l'ecosistema televisivo: selezione dei format, palinsesto, grafica televisiva e operations di distribuzione, con nuove opportunità pubblicitarie per i brand.",
    ],
    services: [
      "Disegno editoriale del canale",
      "Palinsesto e continuity",
      "Distribuzione e sviluppo commerciale",
    ],
    projects: ["a-tu-per-tu"],
    facts: [
      { label: "Relazione", value: "dal 2026" },
      { label: "Unit", value: "Media House · Tech" },
      { label: "Ambito", value: "Canale FAST" },
      { label: "Piattaforma", value: "Samsung TV Plus" },
    ],
  },
  {
    slug: "the-channel-store",
    name: "The Channel Store",
    sector: "Media & FAST",
    since: "2026",
    accent: "#2f5bd0",
    monogram: "TC",
    summary:
      "Il partner con cui Corax ha costruito il primo canale FAST vodcast italiano.",
    intro: [
      "The Channel Store è il partner con cui Corax ha realizzato “A tu per tu”, il primo canale FAST italiano dedicato ai vodcast e ai format conversazionali, distribuito su Samsung TV Plus.",
      "Un lavoro congiunto su disegno editoriale, palinsesto, operations televisive e sviluppo commerciale: due competenze diverse che diventano un unico prodotto editoriale.",
    ],
    services: [
      "Disegno editoriale del canale",
      "Operations e distribuzione FAST",
      "Sviluppo commerciale",
    ],
    projects: ["a-tu-per-tu"],
    facts: [
      { label: "Relazione", value: "dal 2026" },
      { label: "Unit", value: "Media House" },
      { label: "Ambito", value: "FAST & Connected TV" },
      { label: "Canale", value: "A tu per tu" },
    ],
  },
  {
    slug: "numero-diez",
    name: "Numero Diez",
    sector: "Editoria & sport",
    since: "2021",
    accent: "#9bc94a",
    monogram: "ND",
    summary:
      "Il progetto editoriale che racconta il calcio come cultura, con un'app proprietaria.",
    intro: [
      "Numero Diez è il progetto editoriale che racconta il calcio come fenomeno culturale. Corax ne ha accompagnato lo sviluppo digitale, inclusa un'app proprietaria per iOS e Android, costruendo un presidio editoriale e tecnologico insieme.",
      "Un impianto editoriale riconoscibile, un'app pensata per la fruizione quotidiana e un sistema di distribuzione social che alimenta la community. Il progetto fa parte del sistema Corax dal 2021.",
    ],
    services: [
      "Strategia editoriale",
      "App iOS e Android",
      "Distribuzione social e partnership",
    ],
    projects: ["numero-diez"],
    facts: [
      { label: "Relazione", value: "dal 2021" },
      { label: "Unit", value: "Tech · Media House" },
      { label: "Ambito", value: "Editoria digitale" },
      { label: "Prodotto", value: "App iOS e Android" },
    ],
  },
];

export type BrandLogo = {
  src: string;
  /** White marks need to become black on paper backgrounds. */
  invert?: boolean;
  /** Logos with a baked-in white background need multiply blending. */
  multiply?: boolean;
};

/**
 * Real brand marks stored in `public/img/clients`.
 * Keyed by the exact name used in the portfolio client list.
 */
export const brandLogos: Record<string, BrandLogo> = {
  "Politecnico di Milano": { src: "/img/clients/politecnico.svg" },
  Bennet: { src: "/img/clients/bennet.svg" },
  "Gruppo Helvetia Italia": { src: "/img/clients/helvetia.svg" },
  "Campus Bio-Medico": { src: "/img/clients/campus-bio-medico.svg" },
  "Old Wild West": { src: "/img/clients/old-wild-west.svg" },
  "Aroma Zone": { src: "/img/clients/aroma-zone.png" },
  Erion: { src: "/img/clients/erion.svg", invert: true },
  KFC: { src: "/img/clients/kfc.svg" },
  Rossopomodoro: { src: "/img/clients/rossopomodoro.png" },
  "Risparmio Casa": { src: "/img/clients/risparmio-casa.png", multiply: true },
  "Citroën": { src: "/img/clients/citroen.svg" },
  "Babaco Market": { src: "/img/clients/babaco-market.svg" },
  Treedom: { src: "/img/clients/treedom.png" },
  PlayStation: { src: "/img/clients/playstation.svg" },
  Nivea: { src: "/img/clients/nivea.svg" },
  "Tiffany & Co.": { src: "/img/clients/tiffany.png" },
  Brioschi: { src: "/img/clients/brioschi.jpg", multiply: true },
  "Samsung TV Plus": { src: "/img/clients/samsung.svg" },
  Spotify: { src: "/img/clients/spotify.svg" },
  "The Channel Store": { src: "/img/clients/the-channel-store.svg" },
  Impresoft: { src: "/img/clients/impresoft.svg" },
  "Numero Diez": { src: "/img/clients/numero-diez.png" },
};

export const getBrandLogo = (name: string) => brandLogos[name];

export const getClient = (slug: string) => clientsProfiles.find((c) => c.slug === slug);

export const getClientForProject = (projectSlug: string) =>
  clientsProfiles.find((c) => c.projects.includes(projectSlug));
