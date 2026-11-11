export type ProjectCategory =
  | "Branded Entertainment"
  | "Influencer Marketing"
  | "Podcast & Format"
  | "Produzione"
  | "Social & Performance"
  | "Design & Tech";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  categories: ProjectCategory[];
  unit: "Agency" | "Media House" | "Talent" | "Tech";
  excerpt: string;
  cover: string | null;
  coverAlt: string;
  accent?: string;
  monogram?: string;
  gallery: { src: string; alt: string }[];
  featured?: boolean;
  tags: string[];
  intro: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  results: { value: string; label: string }[];
  quote?: { text: string; author: string; role: string };
  related?: string[];
};

export const projects: Project[] = [
  {
    slug: "poretcast",
    title: "PoretCast",
    client: "Giacomo Poretti",
    year: "2022 — oggi",
    categories: ["Podcast & Format", "Produzione", "Branded Entertainment"],
    unit: "Media House",
    excerpt:
      "Il video podcast di Giacomo Poretti che ha trasformato YouTube in un salotto: ospiti, musica e conversazioni senza copione.",
    cover: "/img/covers/poretcast-01.jpg",
    coverAlt: "Il set del PoretCast con l'insegna al neon",
    gallery: [
      { src: "/img/covers/poretcast-01.jpg", alt: "Il set del PoretCast" },
      { src: "/img/covers/poretcast-02.jpg", alt: "Giacomo Poretti e l'ospite sul set del PoretCast" },
    ],
    featured: true,
    tags: ["Podcast", "YouTube", "Format", "Produzione"],
    intro:
      "PoretCast è il video podcast di Giacomo Poretti prodotto da Corax: un format lungo, lento, profondamente umano, capace di far sedere sullo stesso divano musicisti, attori, scrittori e scienziati. Un prodotto editoriale proprietario che vive su YouTube, si distribuisce sulle piattaforme audio e genera conversazione social per settimane.",
    challenge:
      "Costruire un format proprietario riconoscibile in un mercato saturo di podcast, mantenendo l'autenticità di Giacomo Poretti e trasformando ogni episodio in un evento editoriale distribuibile su più piattaforme.",
    approach:
      "Un set fisico e una regia riconoscibile, una scrittura leggera che lascia spazio all'improvvisazione, un calendario di uscite sostenibile e un sistema di clip verticali pensato per moltiplicare la portata di ogni conversazione. Corax segue ideazione, produzione, post-produzione, distribuzione e valorizzazione commerciale.",
    deliverables: [
      "Identità visiva e sigla del format",
      "Produzione integrale e regia multi-camera",
      "Post-produzione e sound design",
      "Strategia di distribuzione YouTube e audio",
      "Clip verticali e piano editoriale social",
      "Brand partnership e operazioni speciali",
    ],
    results: [
      { value: "30 MLN+", label: "view su YouTube" },
      { value: "3", label: "stagioni prodotte" },
      { value: "+20%", label: "crescita view nel 2024" },
      { value: "TOP", label: "podcast in Italia" },
    ],
    quote: {
      text: "Il PoretCast è ancora il podcast più ascoltato d'Italia e questo lo devo soprattutto a tutti voi.",
      author: "Giacomo Poretti",
      role: "Presidente Onorario Corax",
    },
    related: ["immedia", "a-tu-per-tu", "theshow"],
  },
  {
    slug: "immedia",
    title: "Immedia",
    client: "Corax · Giovanni Storti · Arianna Izzi",
    year: "2024 — oggi",
    categories: ["Podcast & Format", "Produzione", "Social & Performance"],
    unit: "Media House",
    excerpt:
      "La piattaforma editoriale multicanale dedicata alla sostenibilità, nata con Giovanni Storti e la divulgatrice scientifica Arianna Izzi.",
    cover: "/img/covers/immedia.jpg",
    coverAlt: "Giovanni Storti a braccia aperte tra gli alberi in fiore per Immedia",
    gallery: [
      { src: "/img/covers/immedia.jpg", alt: "Giovanni Storti nel verde per Immedia" },
      { src: "/img/covers/giova-nature.jpg", alt: "Giovanni Storti nel suo giardino" },
    ],
    featured: true,
    tags: ["Sostenibilità", "Editoria", "Social", "Format"],
    intro:
      "Immedia è una piattaforma editoriale multicanale che racconta la sostenibilità senza retorica: ambiente, cibo, città, lavoro e scelte quotidiane. Un progetto firmato Corax con Giovanni Storti e la divulgatrice scientifica Arianna Izzi, costruito per vivere su Instagram, TikTok, YouTube e per incontrare le community nei luoghi in cui si informano.",
    challenge:
      "Rendere la sostenibilità un tema popolare e condivisibile, evitando il linguaggio tecnico e il tono pedagogico, senza perdere rigore scientifico.",
    approach:
      "Un linguaggio ibrido tra intrattenimento e divulgazione, una regia riconoscibile e un sistema di format seriali. Ogni contenuto nasce da un insight scientifico, viene tradotto in racconto e distribuito con un piano editoriale nativo per piattaforma.",
    deliverables: [
      "Posizionamento e identità editoriale",
      "Format seriali per social e video",
      "Produzione contenuti multi-piattaforma",
      "Direzione creativa e art direction",
      "Piano di distribuzione e community",
      "Partnership con brand e istituzioni",
    ],
    results: [
      { value: "4+", label: "canali presidiati" },
      { value: "100%", label: "contenuti originali" },
      { value: "ONGOING", label: "progetto editoriale" },
      { value: "1", label: "community di riferimento" },
    ],
    quote: {
      text: "La sostenibilità è una conversazione, non una lezione. Il nostro lavoro è renderla desiderabile.",
      author: "Corax Media House",
      role: "Direzione editoriale",
    },
    related: ["poretcast", "giovanni-storti-babaco-market", "giova-loves-nature"],
  },
  {
    slug: "a-tu-per-tu",
    title: "A tu per tu",
    client: "Samsung TV Plus · The Channel Store",
    year: "2026",
    categories: ["Podcast & Format", "Produzione"],
    unit: "Media House",
    excerpt:
      "Il primo canale FAST italiano dedicato ai vodcast e ai format conversazionali, disponibile su Samsung TV Plus.",
    cover: "/img/covers/atupertu-collage.jpg",
    coverAlt: "Una selezione dei programmi del canale A tu per tu",
    gallery: [
      { src: "/img/covers/atupertu-tv.jpg", alt: "A tu per tu su Samsung TV Plus" },
      { src: "/img/covers/poretcast-01.jpg", alt: "I contenuti del canale FAST" },
    ],
    featured: true,
    tags: ["FAST", "Connected TV", "Vodcast", "Distribuzione"],
    intro:
      "A tu per tu è il primo canale FAST (Free Ad-Supported Streaming TV) italiano dedicato ai vodcast, realizzato da Corax con The Channel Store e distribuito su Samsung TV Plus. Un ponte tra la grammatica del digitale e il salotto della Connected TV: contenuti nati per il web che diventano palinsesto.",
    challenge:
      "Portare un linguaggio nativo delle piattaforme social dentro un ecosistema televisivo, mantenendo riconoscibilità, ritmo e qualità di visione su uno schermo grande.",
    approach:
      "Selezione e adattamento dei format Corax, costruzione del palinsesto, grafica televisiva e operations di distribuzione. Un modello editoriale che riusa in modo intelligente i contenuti, generando nuova audience e nuove opportunità pubblicitarie.",
    deliverables: [
      "Disegno editoriale del canale",
      "Selezione e adattamento dei format",
      "Palinsesto e programmazione",
      "Grafica e continuity televisiva",
      "Distribuzione su Samsung TV Plus",
      "Sviluppo commerciale del canale",
    ],
    results: [
      { value: "1°", label: "canale FAST vodcast in Italia" },
      { value: "24/7", label: "palinsesto" },
      { value: "CTV", label: "nuovo touchpoint" },
      { value: "2026", label: "lancio" },
    ],
    related: ["poretcast", "immedia", "theshow"],
  },
  {
    slug: "rossopomodoro",
    title: "A ognuno la sua",
    client: "Rossopomodoro",
    year: "2026",
    categories: ["Branded Entertainment", "Social & Performance", "Produzione"],
    unit: "Agency",
    excerpt:
      "Napoletana, croccante e padellino: tre stili di pizza diventano un unico concept creativo per il ritorno in comunicazione di Rossopomodoro.",
    cover: "/img/covers/cooking-hands.jpg",
    coverAlt: "Le mani di un pizzaiolo al lavoro",
    gallery: [
      { src: "/img/covers/cooking-hands.jpg", alt: "La lavorazione dell'impasto" },
      { src: "/img/covers/plate-pasta.jpg", alt: "Il piatto finito" },
    ],
    featured: true,
    tags: ["Campaign", "Food", "YouTube", "Programmatic"],
    intro:
      "La pizza è cultura e condivisione, ma anche una scelta personale. Da questo insight nasce “A ognuno la sua”, la campagna con cui Rossopomodoro torna in comunicazione e racconta la varietà della propria proposta attraverso i codici dell'esperienza in pizzeria: i pizzaioli, gli impasti, il forno, l'atmosfera.",
    challenge:
      "Andare oltre il racconto di prodotto e trovare un'idea capace di valorizzare le differenze tra le tre proposte, senza banalizzarle in un'unica promessa.",
    approach:
      "Un sistema creativo multi-touchpoint costruito da Corax, con un formato Hero per YouTube, contenuti social-first per Instagram Reels, attività su Locala e Demand Gen, programmatic e presenza su Dailymotion. Media planning di Digital Angels.",
    deliverables: [
      "Concept e sistema creativo",
      "Produzione video e fotografica",
      "Formato Hero per YouTube",
      "Contenuti social-first per Reels",
      "Declinazioni per programmatic e display",
      "Coordinamento con il media planning",
    ],
    results: [
      { value: "3", label: "stili di pizza, un concept" },
      { value: "360°", label: "sistema di comunicazione" },
      { value: "ON AIR", label: "dal 1° ottobre 2026" },
      { value: "1", label: "idea, molti touchpoint" },
    ],
    related: ["frank-gramuglia-citroen", "giovanni-storti-babaco-market", "risparmio-casa"],
  },
  {
    slug: "risparmio-casa",
    title: "Risparmio Casa",
    client: "Risparmio Casa",
    year: "2026 — oggi",
    categories: ["Influencer Marketing", "Social & Performance"],
    unit: "Agency",
    excerpt:
      "La gestione annuale dell'influencer marketing sui profili Instagram e TikTok del brand, per costruire una presenza continua e riconoscibile.",
    cover: "/img/covers/risparmio-01.jpg",
    coverAlt: "Un ritratto in interni dal tono cinematografico",
    gallery: [
      { src: "/img/covers/risparmio-01.jpg", alt: "Ritratto in interni" },
      { src: "/img/covers/risparmio-02.jpg", alt: "Un momento del racconto" },
    ],
    featured: true,
    tags: ["Influencer Marketing", "Instagram", "TikTok", "Retail"],
    intro:
      "Dopo una consultazione, Risparmio Casa ha scelto Corax come partner per la gestione annuale delle attività di influencer marketing legate ai profili ufficiali del brand su Instagram e TikTok. Un incarico che unisce selezione dei creator, produzione e misurazione, con l'obiettivo di rendere la presenza social più coerente e continuativa.",
    challenge:
      "Rendere l'influencer marketing un flusso sempre attivo, non una serie di operazioni isolate, e mantenere coerenza tra community diverse e un brand retail con forte riconoscibilità.",
    approach:
      "Un modello operativo continuo: mappatura dei creator, brief condivisi, produzione coordinata, gestione delle pubblicazioni e lettura dei risultati. La strategia lavora su awareness, engagement e relazione con le community, con un calendario che accompagna le stagionalità del retail.",
    deliverables: [
      "Strategia influencer annuale",
      "Scouting e selezione creator",
      "Gestione e coordinamento campagne",
      "Produzione contenuti Instagram e TikTok",
      "Media e community management",
      "Reporting e ottimizzazione",
    ],
    results: [
      { value: "2", label: "piattaforme presidiate" },
      { value: "ANNUALE", label: "orizzonte di lavoro" },
      { value: "1", label: "regia unica" },
      { value: "ONGOING", label: "programma attivo" },
    ],
    related: ["rossopomodoro", "playstation-pirlasv", "giovanni-storti-babaco-market"],
  },
  {
    slug: "frank-gramuglia-citroen",
    title: "Frank Gramuglia × Citroën",
    client: "Citroën",
    year: "2024",
    categories: ["Influencer Marketing", "Branded Entertainment", "Produzione"],
    unit: "Talent",
    excerpt:
      "Un viaggio a bordo di Ami con Frank Gramuglia: ironia, città e mobilità urbana in un format che ha fatto parlare.",
    cover: "/img/covers/citroen-01.jpg",
    coverAlt: "Frank Gramuglia a bordo di Ami per le strade di Milano",
    gallery: [
      { src: "/img/covers/citroen-01.jpg", alt: "Frank Gramuglia per le strade di Milano" },
      { src: "/img/covers/citroen-02.jpg", alt: "L'interno di Ami" },
    ],
    featured: true,
    tags: ["Talent", "Automotive", "Format", "Social"],
    intro:
      "Frank Gramuglia incontra Citroën Ami e la città diventa un set. Un format on the road in cui l'ironia del creator si fonde con i codici del brand, raccontando la mobilità urbana dal punto di vista di chi la vive ogni giorno.",
    challenge:
      "Raccontare un prodotto dalla personalità fortissima senza trasformare il contenuto in un spot, mantenendo il tono irriverente del talent e la riconoscibilità del brand.",
    approach:
      "Un'idea editoriale costruita sul talent, una produzione snella e una distribuzione nativa. Corax ha seguito concept, produzione e gestione della partnership, lavorando in stretta sinergia con il team del brand.",
    deliverables: [
      "Concept creativo e soggetto",
      "Produzione video on location",
      "Post-produzione e adattamenti",
      "Distribuzione social",
      "Gestione della partnership",
    ],
    results: [
      { value: "1", label: "format proprietario" },
      { value: "CITY", label: "il set è la città" },
      { value: "NATIVE", label: "linguaggio social" },
      { value: "2024", label: "anno di lancio" },
    ],
    related: ["frank-gramuglia-brioschi", "rossopomodoro", "theshow"],
  },
  {
    slug: "giovanni-storti-babaco-market",
    title: "Giovanni Storti × Babaco Market",
    client: "Babaco Market",
    year: "2024",
    categories: ["Branded Entertainment", "Influencer Marketing", "Social & Performance"],
    unit: "Talent",
    excerpt:
      "Sostenibilità e ironia: Giovanni Storti racconta la spesa che salva il pianeta con il linguaggio che gli appartiene.",
    cover: "/img/covers/babaco-02.jpg",
    coverAlt: "Giovanni Storti con il cesto di prodotti Babaco Market",
    gallery: [
      { src: "/img/covers/babaco-02.jpg", alt: "Giovanni Storti con il cesto Babaco" },
      { src: "/img/covers/cooking-hands.jpg", alt: "Il cibo come gesto quotidiano" },
    ],
    tags: ["Sostenibilità", "Food", "Talent", "Campaign"],
    intro:
      "Babaco Market ha scelto Giovanni Storti per raccontare una spesa diversa, fatta di prodotti buoni e di scelte consapevoli. Un progetto in cui la comicità diventa uno strumento per parlare di spreco, stagionalità e accessibilità del cibo.",
    challenge:
      "Comunicare un tema complesso come la sostenibilità alimentare a un pubblico ampio, senza scivolare nel moralismo e senza perdere il tono del talent.",
    approach:
      "Contenuti scritti su misura per la voce di Giovanni Storti, una produzione leggera e una distribuzione coordinata sui canali del talent e del brand. Il risultato è un racconto che intrattiene e, allo stesso tempo, spiega.",
    deliverables: [
      "Concept e scrittura",
      "Produzione contenuti",
      "Coordinamento talent e brand",
      "Piano di distribuzione",
      "Adattamenti per piattaforma",
    ],
    results: [
      { value: "1", label: "voce riconoscibile" },
      { value: "FOOD", label: "tema centrale" },
      { value: "GREEN", label: "posizionamento" },
      { value: "2024", label: "anno" },
    ],
    related: ["giovanni-storti-treedom", "immedia", "giova-loves-nature"],
  },
  {
    slug: "giovanni-storti-treedom",
    title: "Giovanni Storti × Treedom",
    client: "Treedom",
    year: "2023",
    categories: ["Branded Entertainment", "Influencer Marketing"],
    unit: "Talent",
    excerpt:
      "Un albero, una storia: la campagna che ha portato la voce di Giovanni Storti nel racconto della riforestazione.",
    cover: "/img/covers/treedom.jpg",
    coverAlt: "Giovanni Storti tra gli ulivi per la campagna Treedom",
    gallery: [
      { src: "/img/covers/treedom.jpg", alt: "Giovanni Storti tra gli ulivi" },
      { src: "/img/covers/giova-nature.jpg", alt: "Il verde del giardino di Giovanni Storti" },
    ],
    accent: "#b07a4a",
    monogram: "TR",
    tags: ["Green", "Talent", "Purpose", "Social"],
    intro:
      "Treedom pianta alberi e racconta storie. Con Giovanni Storti, Corax ha costruito un progetto di comunicazione che unisce il tema ambientale a un tono leggero e riconoscibile, trasformando un gesto semplice in un racconto condivisibile.",
    challenge:
      "Dare nuova profondità a un tema già molto raccontato, trovando un punto di vista personale e non generico.",
    approach:
      "Un concept basato sull'autenticità del talent, contenuti verticali e una distribuzione coordinata. Il racconto parte dalla persona e arriva al progetto, senza passare dal pulpito.",
    deliverables: [
      "Concept editoriale",
      "Produzione contenuti",
      "Distribuzione social",
      "Gestione della partnership",
    ],
    results: [
      { value: "GREEN", label: "cause-related" },
      { value: "1", label: "voce autentica" },
      { value: "SOCIAL", label: "formato nativo" },
      { value: "2023", label: "anno" },
    ],
    related: ["giovanni-storti-babaco-market", "immedia", "giova-loves-nature"],
  },
  {
    slug: "giova-loves-nature",
    title: "Giova loves nature",
    client: "Giovanni Storti",
    year: "2023 — oggi",
    categories: ["Podcast & Format", "Produzione", "Social & Performance"],
    unit: "Media House",
    excerpt:
      "Il format green di Giovanni Storti: natura, curiosità e divulgazione con il tono di chi non si prende troppo sul serio.",
    cover: "/img/covers/giova-nature.jpg",
    coverAlt: "Giovanni Storti nel verde per il format Giova loves nature",
    gallery: [
      { src: "/img/covers/giova-nature.jpg", alt: "Giovanni Storti nel suo giardino" },
      { src: "/img/covers/immedia.jpg", alt: "Giovanni Storti a braccia aperte tra gli alberi" },
    ],
    accent: "#9bc94a",
    monogram: "GL",
    tags: ["Green", "Format", "Divulgazione", "Talent"],
    intro:
      "Giova loves nature è il format in cui Giovanni Storti esplora il rapporto tra l'uomo e l'ambiente, tra curiosità scientifiche e piccole ossessioni quotidiane. Un progetto editoriale che rende la natura accessibile e sorprendente.",
    challenge:
      "Costruire un format seriale riconoscibile che unisca divulgazione e intrattenimento, senza perdere la libertà espressiva del talent.",
    approach:
      "Episodi brevi, un linguaggio visivo immediato e una scrittura che parte dalla curiosità. Corax cura ideazione, produzione e distribuzione, lasciando al talent lo spazio per essere sé stesso.",
    deliverables: [
      "Ideazione del format",
      "Produzione e post-produzione",
      "Piano editoriale social",
      "Distribuzione multipiattaforma",
    ],
    results: [
      { value: "SERIALE", label: "formato" },
      { value: "GREEN", label: "tema" },
      { value: "MULTI", label: "piattaforma" },
      { value: "ONGOING", label: "progetto" },
    ],
    related: ["immedia", "giovanni-storti-treedom", "giovanni-storti-babaco-market"],
  },
  {
    slug: "playstation-pirlasv",
    title: "PlayStation × PirlasV",
    client: "PlayStation",
    year: "2023",
    categories: ["Influencer Marketing", "Branded Entertainment", "Produzione"],
    unit: "Talent",
    excerpt:
      "Gaming, calcio e ironia: PirlasV porta PlayStation dentro la sua community con un contenuto pensato per essere vero.",
    cover: "/img/covers/pirlasv.jpg",
    coverAlt: "I due volti di PirlasV in posa",
    gallery: [
      { src: "/img/covers/pirlasv.jpg", alt: "PirlasV" },
      { src: "/img/covers/football-ball.jpg", alt: "Il pallone al centro del racconto" },
    ],
    tags: ["Gaming", "Sport", "Talent", "Creator"],
    intro:
      "PlayStation e PirlasV insieme per un progetto in cui il gaming incontra il calcio e l'ironia del creator. Un contenuto costruito sulla community, rispettando il linguaggio della piattaforma e la personalità del talent.",
    challenge:
      "Integrare un brand globale in un contenuto nativo senza tradire il tono del creator e senza perdere riconoscibilità.",
    approach:
      "Brief condiviso, libertà creativa controllata e una produzione pensata per i formati social. Corax ha gestito il rapporto tra brand e talent, dalla concept al delivery.",
    deliverables: [
      "Concept e coordinamento",
      "Produzione contenuti",
      "Gestione talent e brand",
      "Distribuzione social",
    ],
    results: [
      { value: "GAMING", label: "verticale" },
      { value: "SPORT", label: "passione" },
      { value: "NATIVE", label: "contenuto" },
      { value: "2023", label: "anno" },
    ],
    related: ["frank-gramuglia-citroen", "kick-off-talk", "theshow"],
  },
  {
    slug: "tiffany-ooh",
    title: "Tiffany & Co. — Eventi OOH",
    client: "Tiffany & Co.",
    year: "2023",
    categories: ["Produzione", "Branded Entertainment"],
    unit: "Media House",
    excerpt:
      "La produzione video per gli eventi Tiffany: luce, materia e dettaglio al servizio di un'icona del lusso.",
    cover: "/img/covers/tiffany.jpg",
    coverAlt: "La tavola apparecchiata di un evento Tiffany & Co.",
    gallery: [
      { src: "/img/covers/tiffany.jpg", alt: "Un evento Tiffany & Co." },
      { src: "/img/covers/tiffany-necklace.jpg", alt: "La collezione in mostra" },
    ],
    tags: ["Luxury", "Eventi", "Produzione", "OOH"],
    intro:
      "Per Tiffany & Co., Corax ha curato la produzione video legata agli eventi e alle installazioni out-of-home. Un lavoro di precisione, in cui ogni inquadratura deve restituire la qualità del materiale e l'emozione dell'esperienza.",
    challenge:
      "Tradurre in video la cura e la luce di un brand di lusso, rispettando standard produttivi altissimi e tempi serrati.",
    approach:
      "Un presidio produttivo dedicato, dalla preparazione all'evento alla restituzione finale, con un'attenzione maniacale al dettaglio e alla coerenza visiva.",
    deliverables: [
      "Produzione video evento",
      "Riprese e fotografia",
      "Post-produzione",
      "Adattamenti per canali digitali",
    ],
    results: [
      { value: "LUXURY", label: "standard produttivo" },
      { value: "OOH", label: "formato" },
      { value: "EVENT", label: "contesto" },
      { value: "2023", label: "anno" },
    ],
    related: ["side", "il-ristorante-serra", "rossopomodoro"],
  },
  {
    slug: "kick-off-talk",
    title: "Kick off Talk",
    client: "Corax · Serie A",
    year: "2024",
    categories: ["Podcast & Format", "Produzione", "Branded Entertainment"],
    unit: "Media House",
    excerpt:
      "Il talk che porta il calcio fuori dal campo: voci, storie e protagonisti del gioco più amato d'Italia.",
    cover: "/img/covers/kickoff.jpg",
    coverAlt: "Due ospiti al tavolo di Kick off Talk",
    gallery: [
      { src: "/img/covers/kickoff.jpg", alt: "Il tavolo di Kick off Talk" },
      { src: "/img/covers/football-team2.jpg", alt: "Un ospite di Kick off Talk in studio" },
    ],
    tags: ["Sport", "Talk", "Format", "Produzione"],
    intro:
      "Kick off Talk nasce per raccontare il calcio da un punto di vista diverso: non solo risultati, ma persone, storie e cultura popolare. Un format conversazionale che porta i protagonisti davanti alla telecamera senza filtri.",
    challenge:
      "Differenziarsi nel panorama dei contenuti sportivi, costruendo un format che non fosse l'ennesimo talk da studio.",
    approach:
      "Un'identità visiva forte, una conduzione riconoscibile e una produzione snella capace di adattarsi a ospiti e location diverse. Il format vive su YouTube e si declina in clip per i social.",
    deliverables: [
      "Ideazione e identità del format",
      "Produzione multi-camera",
      "Post-produzione",
      "Clip verticali",
      "Distribuzione",
    ],
    results: [
      { value: "SPORT", label: "verticale" },
      { value: "TALK", label: "formato" },
      { value: "SOCIAL", label: "distribuzione" },
      { value: "2024", label: "anno" },
    ],
    related: ["playstation-pirlasv", "poretcast", "a-tu-per-tu"],
  },
  {
    slug: "vola-a-madrid-nivea",
    title: "Vola a Madrid con Nivea",
    client: "Nivea",
    year: "2023",
    categories: ["Influencer Marketing", "Social & Performance"],
    unit: "Agency",
    excerpt:
      "Un viaggio, una community, un premio: il progetto che ha trasformato un concorso in un racconto condiviso.",
    cover: "/img/covers/nivea.jpg",
    coverAlt: "Il booklet Vola a Madrid con Nivea con il pallone ufficiale del Real Madrid",
    gallery: [
      { src: "/img/covers/nivea.jpg", alt: "Il premio del concorso Nivea" },
      { src: "/img/covers/citroen-01.jpg", alt: "Il racconto del viaggio" },
    ],
    accent: "#2f5bd0",
    monogram: "NI",
    tags: ["Beauty", "Concorso", "Creator", "Social"],
    intro:
      "Nivea ha scelto Corax per un progetto che unisce prodotto, esperienza e community: un viaggio a Madrid diventato il premio di un meccanismo di partecipazione capace di generare conversazione e contenuti.",
    challenge:
      "Trasformare un concorso in un'esperienza editoriale, evitando che l'attivazione si esaurisse nella meccanica di partecipazione.",
    approach:
      "Un racconto a puntate, creator coinvolti e una produzione leggera che accompagna tutte le fasi dell'iniziativa, dalla call alla partenza.",
    deliverables: [
      "Concept e meccanica",
      "Coordinamento creator",
      "Produzione contenuti",
      "Gestione social",
    ],
    results: [
      { value: "1", label: "esperienza premio" },
      { value: "SOCIAL", label: "racconto condiviso" },
      { value: "BEAUTY", label: "settore" },
      { value: "2023", label: "anno" },
    ],
    related: ["risparmio-casa", "playstation-pirlasv", "frank-gramuglia-citroen"],
  },
  {
    slug: "frank-gramuglia-brioschi",
    title: "Frank Gramuglia × Brioschi",
    client: "Brioschi",
    year: "2024",
    categories: ["Branded Entertainment", "Influencer Marketing", "Produzione"],
    unit: "Talent",
    excerpt:
      "Un formato che trasforma il racconto immobiliare in intrattenimento, con lo sguardo irriverente di Frank Gramuglia.",
    cover: "/img/covers/brioschi.jpg",
    coverAlt: "Frank Gramuglia con una bottiglia Brioschi sul set della campagna",
    gallery: [
      { src: "/img/covers/brioschi.jpg", alt: "Frank Gramuglia sul set Brioschi" },
      { src: "/img/covers/citroen-01.jpg", alt: "Frank Gramuglia a bordo di una Citroën Ami" },
    ],
    tags: ["Real Estate", "Talent", "Format", "Social"],
    intro:
      "Brioschi e Frank Gramuglia insieme per raccontare lo spazio e la città con un tono inaspettato. Un format che porta il talent dentro un settore tradizionalmente serio, trasformandolo in un racconto pop.",
    challenge:
      "Rendere interessante e condivisibile un tema tecnico come l'immobiliare, senza snaturarlo.",
    approach:
      "Un concept costruito sul contrasto tra la personalità del talent e il rigore del settore, con una produzione veloce e una distribuzione nativa.",
    deliverables: [
      "Concept e scrittura",
      "Produzione contenuti",
      "Distribuzione social",
      "Gestione partnership",
    ],
    results: [
      { value: "REAL ESTATE", label: "settore" },
      { value: "1", label: "sguardo originale" },
      { value: "SOCIAL", label: "formato" },
      { value: "2024", label: "anno" },
    ],
    related: ["frank-gramuglia-citroen", "il-ristorante-serra", "rossopomodoro"],
  },
  {
    slug: "il-ristorante-serra",
    title: "Il ristorante serra",
    client: "Progetto Corax",
    year: "2023",
    categories: ["Design & Tech", "Produzione", "Social & Performance"],
    unit: "Tech",
    excerpt:
      "Identità, sito e racconto digitale per un ristorante che vive tra natura e design.",
    cover: "/img/covers/wine-pour.jpg",
    coverAlt: "Il servizio del vino in un ristorante",
    gallery: [
      { src: "/img/covers/wine-pour.jpg", alt: "Il servizio del vino" },
      { src: "/img/covers/cooking-hands.jpg", alt: "La cucina del ristorante" },
    ],
    tags: ["Design", "Web", "Food", "Branding"],
    intro:
      "Un progetto di identità e presenza digitale per un ristorante che fa della serra e della natura il proprio segno distintivo. Corax ha curato branding, sito web, contenuti e strategia social, costruendo un ecosistema coerente dal menu alla comunicazione.",
    challenge:
      "Tradurre in digitale l'atmosfera di un luogo fisico, senza perdere la sensualità dell'esperienza e la chiarezza delle informazioni.",
    approach:
      "Un'identità visiva organica, un sito veloce e accessibile, un piano editoriale che alterna prodotto e atmosfera. Ogni touchpoint rimanda allo stesso immaginario.",
    deliverables: [
      "Brand identity",
      "Web design e sviluppo",
      "SEO e performance",
      "Content strategy",
      "Produzione video e foto",
    ],
    results: [
      { value: "360°", label: "ecosistema" },
      { value: "SEO", label: "ottimizzazione" },
      { value: "WEB", label: "design e sviluppo" },
      { value: "2023", label: "anno" },
    ],
    related: ["tiffany-ooh", "influenceritalia", "side"],
  },
  {
    slug: "side",
    title: "Side",
    client: "Side",
    year: "2023",
    categories: ["Produzione", "Podcast & Format"],
    unit: "Media House",
    excerpt:
      "Un progetto video che esplora il lato nascosto delle storie: linguaggio documentario, ritmo contemporaneo.",
    cover: "/img/covers/side.jpg",
    coverAlt: "Un ritratto in interni dal tono documentario",
    gallery: [
      { src: "/img/covers/side.jpg", alt: "Ritratto dal tono documentario" },
      { src: "/img/covers/la-vela.jpg", alt: "Un interno di La Vela" },
    ],
    tags: ["Documentario", "Video", "Produzione", "Storytelling"],
    intro:
      "Side è un progetto di racconto documentario che indaga il lato meno visibile delle persone e dei luoghi. Un lavoro di regia e montaggio in cui la forma video sostiene la profondità della storia.",
    challenge:
      "Costruire un racconto intimo senza retorica, con un impianto visivo essenziale e coerente.",
    approach:
      "Interviste, riprese sul campo e un montaggio che privilegia i silenzi e i dettagli. Un linguaggio cinematografico applicato a un progetto digitale.",
    deliverables: [
      "Regia e direzione della fotografia",
      "Produzione sul campo",
      "Montaggio e sound design",
      "Color grading",
    ],
    results: [
      { value: "DOC", label: "linguaggio" },
      { value: "CINEMA", label: "estetica" },
      { value: "1", label: "storia alla volta" },
      { value: "2023", label: "anno" },
    ],
    related: ["tiffany-ooh", "kick-off-talk", "a-tu-per-tu"],
  },
  {
    slug: "influenceritalia",
    title: "Influenceritalia",
    client: "Corax Tech",
    year: "2022 — oggi",
    categories: ["Design & Tech", "Influencer Marketing"],
    unit: "Tech",
    excerpt:
      "La piattaforma che mette in contatto brand e creator, costruita per rendere la selezione semplice e trasparente.",
    cover: "/img/covers/influenceritalia.jpg",
    coverAlt: "Il logo Influenceritalia su fondo rosa",
    gallery: [{ src: "/img/covers/influenceritalia.jpg", alt: "Il logo Influenceritalia" }],
    accent: "#5b3df5",
    monogram: "IN",
    tags: ["Piattaforma", "Creator Economy", "Prodotto", "Tech"],
    intro:
      "Influenceritalia è la piattaforma proprietaria del sistema Corax che mette in contatto i brand con i creator più adatti alle proprie campagne. Un prodotto tech che nasce dall'esperienza quotidiana della talent agency e della unit Agency.",
    challenge:
      "Ridurre la complessità della selezione dei creator, senza banalizzare le variabili che rendono efficace una collaborazione.",
    approach:
      "Un prodotto costruito con i team che lo usano ogni giorno: profili strutturati, filtri intelligenti e un flusso di contatto semplice. La piattaforma è parte dell'ecosistema tech di Corax, insieme a CRM, dashboard e strumenti di misurazione.",
    deliverables: [
      "Product design",
      "Sviluppo full stack",
      "Database creator",
      "Dashboard e analytics",
      "Manutenzione evolutiva",
    ],
    results: [
      { value: "1", label: "piattaforma proprietaria" },
      { value: "FULL STACK", label: "sviluppo" },
      { value: "MATCH", label: "brand e creator" },
      { value: "ONGOING", label: "prodotto" },
    ],
    related: ["il-ristorante-serra", "risparmio-casa", "a-tu-per-tu"],
  },
  {
    slug: "numero-diez",
    title: "Numero Diez",
    client: "Corax · Numero Diez",
    year: "2021 — oggi",
    categories: ["Design & Tech", "Podcast & Format", "Social & Performance"],
    unit: "Tech",
    excerpt:
      "Il progetto editoriale digitale dedicato al calcio e alla cultura popolare, con un'app proprietaria.",
    cover: "/img/covers/football-lineup.jpg",
    coverAlt: "Quattro calciatori in maglia blu allo stadio",
    gallery: [
      { src: "/img/covers/football-lineup.jpg", alt: "Quattro calciatori in maglia blu" },
      { src: "/img/covers/football-ball.jpg", alt: "Un pallone da Champions League firmato" },
    ],
    tags: ["Editoria", "Sport", "App", "Community"],
    intro:
      "Numero Diez è il progetto editoriale che racconta il calcio come fenomeno culturale. Corax ne ha accompagnato lo sviluppo digitale, inclusa un'app proprietaria per iOS e Android, costruendo un presidio editoriale e tecnologico insieme.",
    challenge:
      "Far convivere un'identità editoriale forte con le esigenze di un prodotto digitale scalabile e misurabile.",
    approach:
      "Un impianto editoriale riconoscibile, un'app pensata per la fruizione quotidiana e un sistema di distribuzione social che alimenta la community.",
    deliverables: [
      "Strategia editoriale",
      "App iOS e Android",
      "Sviluppo e manutenzione",
      "Distribuzione social",
      "Media e partnership",
    ],
    results: [
      { value: "APP", label: "iOS e Android" },
      { value: "SPORT", label: "verticale" },
      { value: "CULTURA", label: "posizionamento" },
      { value: "ONGOING", label: "progetto" },
    ],
    related: ["kick-off-talk", "playstation-pirlasv", "influenceritalia"],
  },
  {
    slug: "theshow",
    title: "theShow",
    client: "theShow",
    year: "2025 — oggi",
    categories: ["Branded Entertainment", "Podcast & Format", "Social & Performance"],
    unit: "Talent",
    excerpt:
      "Tredici anni di esperimenti social diventano un partner editoriale: nuova fase, nuovi format, nuove opportunità.",
    cover: "/img/covers/theshow.jpg",
    coverAlt: "La televisione vintage simbolo del format theShow",
    gallery: [
      { src: "/img/covers/theshow.jpg", alt: "La televisione vintage di theShow" },
    ],
    accent: "#ff5a3c",
    monogram: "SH",
    tags: ["Creator", "Entertainment", "Format", "Partnership"],
    intro:
      "Dopo oltre tredici anni di esperimenti social, candid camera e format che hanno fatto discutere milioni di persone sul web, theShow entra nel sistema Corax. Una partnership che unisce la velocità dei contenuti verticali alla profondità del formato orizzontale.",
    challenge:
      "Scalare il business delle collaborazioni commerciali di un progetto editoriale storico, senza perdere la libertà creativa che lo ha reso riconoscibile.",
    approach:
      "Un presidio dedicato su sviluppo commerciale, distribuzione e nuovi format. Corax affianca theShow nella costruzione di un modello sostenibile che integra brand partnership, contenuti proprietari e nuove piattaforme.",
    deliverables: [
      "Sviluppo commerciale",
      "Brand partnership",
      "Nuovi format editoriali",
      "Distribuzione multipiattaforma",
      "Produzione",
    ],
    results: [
      { value: "13+", label: "anni di storia" },
      { value: "2025", label: "ingresso nel sistema" },
      { value: "MULTI", label: "piattaforma" },
      { value: "ONGOING", label: "partnership" },
    ],
    related: ["poretcast", "frank-gramuglia-citroen", "playstation-pirlasv"],
  },
  {
    slug: "corax-score",
    title: "Corax Score",
    client: "Corax",
    year: "2026",
    categories: ["Design & Tech", "Social & Performance"],
    unit: "Tech",
    excerpt:
      "Cinque domande, trenta secondi, un punteggio da 25 a 100. Lo strumento che trasforma un primo contatto in un brief.",
    cover: "/img/covers/corax-score.jpg",
    coverAlt: "L'interfaccia di Corax Score con il test in cinque domande",
    gallery: [{ src: "/img/covers/corax-score.jpg", alt: "Il test Corax Score" }],
    accent: "#c8ff4d",
    monogram: "CS",
    tags: ["Prodotto", "Diagnostica", "Lead generation", "UX"],
    intro:
      "Corax Score è lo strumento proprietario che apre la conversazione con un numero invece che con un form. Cinque domande costruite sui segnali che contano — obiettivo, punto di partenza, asset, tempi e misura — e un risultato immediato: punteggio, livello, unit consigliata e tre mosse concrete.",
    challenge:
      "Aprire una conversazione commerciale senza la retorica del contatto generico. La maggior parte dei test online chiede un'email prima di dire qualcosa di utile: noi volevamo fare l'opposto.",
    approach:
      "Abbiamo ridotto la diagnosi a cinque domande, ognuna con quattro risposte possibili, e costruito un sistema di punteggio da 25 a 100 con quattro livelli. Il risultato genera un profilo del bisogno, un mix tra le quattro unit e un brief già compilato che accompagna la persona verso il contatto.",
    deliverables: [
      "Product design e flusso del test",
      "Modello di punteggio e quattro livelli",
      "Radar del profilo e mix per unit",
      "Brief precompilato via URL",
      "Interfaccia accessibile da tastiera",
      "Copy e microcopy in italiano",
    ],
    results: [
      { value: "5", label: "domande" },
      { value: "25–100", label: "punteggio" },
      { value: "30\"", label: "tempo di risposta" },
      { value: "4", label: "unit consigliate" },
    ],
    related: ["la-vela", "persone-corax", "impresoft-engage"],
  },
  {
    slug: "la-vela",
    title: "La Vela",
    client: "Corax",
    year: "2020 — oggi",
    categories: ["Produzione", "Design & Tech"],
    unit: "Media House",
    excerpt:
      "1.500 mq a Milano tra uffici e studi di produzione. Lo spazio dove il sistema Corax prende forma ogni giorno.",
    cover: "/img/covers/la-vela.jpg",
    coverAlt: "Gli interni di La Vela, la casa Corax a Milano",
    gallery: [
      { src: "/img/covers/la-vela.jpg", alt: "Gli spazi di La Vela" },
      { src: "/img/covers/poretcast-01.jpg", alt: "Uno degli studi di produzione de La Vela" },
    ],
    tags: ["Headquarters", "Produzione", "Milano", "Community"],
    intro:
      "La Vela è la casa di Corax: 1.500 mq in Viale Bodio 29/37 a Milano, tra uffici, sale e studi di produzione. Uno spazio progettato per far stare nella stessa stanza strategy, creatività, produzione e talenti, perché le idee buone nascono quando le persone si incontrano davvero.",
    challenge:
      "Accogliere una crescita rapida senza perdere l'identità del luogo. Nel 2025 il sistema ha aggiunto 850 mq: nuovi studi e nuovi spazi per un organico arrivato a 73 persone.",
    approach:
      "Abbiamo trattato lo spazio come parte del racconto, non come un indirizzo sulla carta. La Vela è un set, un ufficio e un luogo di incontro: ospita produzioni, eventi, registrazioni e il lavoro quotidiano delle quattro unit.",
    deliverables: [
      "Progettazione degli spazi e degli studi",
      "Allestimenti per produzioni ed eventi",
      "Identità visiva degli ambienti",
      "Racconto fotografico e video",
      "Contenuti per Instagram e LinkedIn",
      "Open day e incontri con la community",
    ],
    results: [
      { value: "1.500+", label: "mq a Milano" },
      { value: "850", label: "mq aggiunti nel 2025" },
      { value: "73", label: "persone" },
      { value: "2020", label: "anno di fondazione" },
    ],
    related: ["persone-corax", "poretcast", "a-tu-per-tu"],
  },
  {
    slug: "poretcast-google",
    title: "PoretCast × Google",
    client: "Google Italia · YouTube",
    year: "2026",
    categories: ["Podcast & Format", "Produzione"],
    unit: "Media House",
    excerpt:
      "Google Italia racconta il PoretCast come caso di YouTube: un salotto che ha superato i 30 milioni di views.",
    cover: "/img/covers/poretcast-02.jpg",
    coverAlt: "Giacomo Poretti sul set del PoretCast, raccontato da Google Italia",
    gallery: [
      { src: "/img/covers/poretcast-02.jpg", alt: "Giacomo Poretti durante una puntata del PoretCast" },
      { src: "/img/covers/poretcast-01.jpg", alt: "Il set del PoretCast" },
    ],
    tags: ["YouTube", "Google", "Case study", "Format"],
    intro:
      "Quando Google Italia ha deciso di raccontare YouTube come piattaforma di conversazione, ha scelto il PoretCast. Il format di Giacomo Poretti è diventato un caso editoriale: un salotto lungo, lento e umano che porta sul divano musicisti, attori, scrittori e scienziati.",
    challenge:
      "Spiegare un format nato per durare nel tempo, non per inseguire l'algoritmo. Il racconto doveva mostrare il metodo — ospiti giusti, nessun copione, libertà di conversazione — senza ridurlo a un numero.",
    approach:
      "Corax ha accompagnato Google Italia nella costruzione del caso, mettendo a disposizione materiali, dati e la voce dei protagonisti. Il risultato è un racconto che tiene insieme piattaforma, produzione e pubblico.",
    deliverables: [
      "Case study per Google Italia",
      "Materiali video e fotografici",
      "Dati e risultati del format",
      "Coordinamento editoriale",
      "Distribuzione del racconto",
      "Contenuti social di supporto",
    ],
    results: [
      { value: "30 MLN+", label: "views su YouTube" },
      { value: "1", label: "case study Google" },
      { value: "TOP", label: "podcast in Italia" },
      { value: "ONGOING", label: "produzione" },
    ],
    quote: {
      text: "YouTube è un salotto aperto al mondo. Il PoretCast lo ha dimostrato prima che diventasse un format.",
      author: "Corax Media House",
      role: "Direzione editoriale",
    },
    related: ["poretcast", "presidenza-poretti", "immedia"],
  },
  {
    slug: "persone-corax",
    title: "73 persone, e ancora spazio",
    client: "Corax",
    year: "2020 — oggi",
    categories: ["Social & Performance", "Produzione"],
    unit: "Agency",
    excerpt:
      "Il racconto di chi costruisce il sistema: strategy, produzione, talent e tech nella stessa stanza.",
    cover: "/img/covers/persone.jpg",
    coverAlt: "Sei ritratti delle persone che lavorano in Corax",
    gallery: [
      { src: "/img/covers/persone.jpg", alt: "Le persone del team Corax" },
      { src: "/img/covers/la-vela.jpg", alt: "Gli spazi di La Vela" },
    ],
    accent: "#ff5a3c",
    monogram: "73",
    tags: ["Employer branding", "Persone", "Cultura", "Milano"],
    intro:
      "Corax non è un logo: sono 73 persone che lavorano tra strategy, produzione, talent e tecnologia. Questo progetto racconta il sistema dall'interno — i ruoli, i percorsi, le competenze e il modo in cui una persona entra e cresce dentro La Vela.",
    challenge:
      "Raccontare una crescita rapida senza trasformarla in un annuncio. Le persone giuste non cercano un benefit: cercano un posto dove il lavoro ha un nome, un metodo e una direzione.",
    approach:
      "Un racconto editoriale costruito su voci reali, ruoli concreti e spazi vissuti. Contenuti per Instagram e LinkedIn, una pagina carriere che parla come una persona e un processo di selezione che spiega cosa succede davvero.",
    deliverables: [
      "Employer branding e posizionamento",
      "Pagina carriere e job post",
      "Contenuti social per Instagram e LinkedIn",
      "Racconto fotografico degli spazi",
      "Format video per le persone del team",
      "Processo di selezione e onboarding",
    ],
    results: [
      { value: "73", label: "persone" },
      { value: "4", label: "unit" },
      { value: "20", label: "nuovi format" },
      { value: "1", label: "casa a Milano" },
    ],
    related: ["la-vela", "pierfrancesco-petrosillo", "corax-score"],
  },
  {
    slug: "presidenza-poretti",
    title: "Presidenza Poretti",
    client: "Giacomo Poretti",
    year: "2025 — oggi",
    categories: ["Branded Entertainment", "Podcast & Format"],
    unit: "Talent",
    excerpt:
      "Giacomo Poretti Presidente Onorario: un ruolo nuovo per accompagnare la crescita del sistema e delle sue properties.",
    cover: "/img/covers/presidenza.jpg",
    coverAlt: "Ritratto di Giacomo Poretti",
    gallery: [
      { src: "/img/covers/presidenza.jpg", alt: "Giacomo Poretti" },
      { src: "/img/covers/poretcast-01.jpg", alt: "Il set del PoretCast" },
    ],
    tags: ["Governance", "Talento", "Editoria", "Partnership"],
    intro:
      "Nel dicembre 2025 Giacomo Poretti è diventato Presidente Onorario di Corax. Un ruolo che unisce la sua storia editoriale alla costruzione del sistema: non un titolo simbolico, ma una voce che accompagna la crescita delle properties e dei nuovi format.",
    challenge:
      "Dare continuità a una partnership creativa senza imprigionarla in un organigramma. Il ruolo doveva essere riconoscibile dentro e fuori l'azienda, e coerente con la libertà che ha reso il PoretCast quello che è.",
    approach:
      "Abbiamo costruito il racconto della nomina come un passaggio editoriale, non come un comunicato. La presidenza diventa un punto di vista sulle scelte del sistema: format, talenti, produzione e distribuzione.",
    deliverables: [
      "Posizionamento del ruolo",
      "Racconto editoriale della nomina",
      "Contenuti per Instagram e stampa",
      "Coordinamento con le properties",
      "Presidio dei nuovi format",
      "Relazione con talenti e partner",
    ],
    results: [
      { value: "2025", label: "la nomina" },
      { value: "30 MLN+", label: "views del PoretCast" },
      { value: "3", label: "stagioni prodotte" },
      { value: "1", label: "presidenza onoraria" },
    ],
    related: ["poretcast", "poretcast-google", "theshow"],
  },
  {
    slug: "leader-crescita-2026",
    title: "Leader della Crescita 2026",
    client: "Il Sole 24 Ore · Corax",
    year: "2026",
    categories: ["Social & Performance", "Produzione"],
    unit: "Agency",
    excerpt:
      "8 milioni di fatturato 2025, +45% sul 2024. Corax entra nella classifica delle aziende italiane che crescono di più.",
    cover: "/img/covers/leader.jpg",
    coverAlt: "Quattro persone del team Corax in posa su fondo scuro",
    gallery: [
      { src: "/img/covers/news-leader.jpg", alt: "Il riconoscimento del Sole 24 Ore" },
      { src: "/img/covers/news-results.jpg", alt: "I numeri della crescita Corax" },
    ],
    tags: ["Premio", "Crescita", "Business", "Sole 24 Ore"],
    intro:
      "Il Sole 24 Ore ha inserito Corax tra i Leader della Crescita 2026. Un riconoscimento che arriva da numeri veri: 8 milioni di euro di fatturato nel 2025, +45% sul 2024, con un obiettivo di 12 milioni per il 2026. Dietro la classifica c'è un sistema che ha tenuto insieme editoria, produzione, talenti e tecnologia.",
    challenge:
      "Raccontare un risultato economico senza trasformarlo in autocompiacimento. Il premio doveva dire qualcosa di utile: come cresce un sistema editoriale indipendente, e cosa serve per continuare.",
    approach:
      "Un racconto costruito sui fatti — fatturato, crescita, organico, metri quadri, nuovi format — e distribuito su tutti i touchpoint: sito, Instagram, LinkedIn, stampa e contenuti per il team.",
    deliverables: [
      "Racconto del riconoscimento",
      "Contenuti social e caroselli",
      "Pagina risultati e timeline",
      "Comunicazione interna",
      "Materiali per la stampa",
      "Aggiornamento del posizionamento",
    ],
    results: [
      { value: "8 MLN", label: "fatturato 2025" },
      { value: "+45%", label: "sul 2024" },
      { value: "12 MLN", label: "target 2026" },
      { value: "TOP", label: "Leader della Crescita" },
    ],
    related: ["la-vela", "impresoft-engage", "persone-corax"],
  },
  {
    slug: "pierfrancesco-petrosillo",
    title: "Pierfrancesco Petrosillo, CAO",
    client: "Corax",
    year: "2025 — oggi",
    categories: ["Social & Performance", "Influencer Marketing"],
    unit: "Agency",
    excerpt:
      "Una nuova guida per la unit Agency: social, influencer marketing e branded entertainment sotto la stessa regia.",
    cover: "/img/covers/petrosillo.jpg",
    coverAlt: "Pierfrancesco Petrosillo durante un'intervista televisiva",
    gallery: [{ src: "/img/covers/petrosillo.jpg", alt: "Pierfrancesco Petrosillo, Chief Agency Officer di Corax" }],
    accent: "#5b3df5",
    monogram: "PP",
    tags: ["Leadership", "Agency", "Influencer marketing", "Governance"],
    intro:
      "Nel novembre 2025 Pierfrancesco Petrosillo è diventato Chief Agency Officer di Corax. La unit Agency — social, influencer marketing e branded entertainment — si rafforza con una guida dedicata, dentro un sistema che conta 12 clienti e 22 brand.",
    challenge:
      "Tenere insieme velocità di esecuzione e qualità editoriale in un'area che lavora ogni giorno con creator, brand e piattaforme diverse. La unit aveva bisogno di una regia, non di un altro livello di approvazione.",
    approach:
      "Un presidio unico su strategia, produzione e performance. La nomina è stata raccontata come un passaggio di sistema: chi guida, con quali competenze e con quale mandato dentro le quattro unit di Corax.",
    deliverables: [
      "Posizionamento della unit Agency",
      "Racconto della nomina",
      "Contenuti per Instagram e LinkedIn",
      "Organizzazione dei team",
      "Presidio clienti e brand",
      "Integrazione con Talent e Media House",
    ],
    results: [
      { value: "CAO", label: "Chief Agency Officer" },
      { value: "12", label: "clienti nel sistema" },
      { value: "22", label: "brand" },
      { value: "2025", label: "la nomina" },
    ],
    related: ["impresoft-engage", "leader-crescita-2026", "persone-corax"],
  },
  {
    slug: "impresoft-engage",
    title: "Impresoft Engage",
    client: "Impresoft",
    year: "2025 — oggi",
    categories: ["Design & Tech", "Social & Performance"],
    unit: "Tech",
    excerpt:
      "Vendite, progetti, talenti e clienti in un unico sistema operativo. Il CRM diventa il motore di Corax.",
    cover: "/img/covers/news-impresoft.jpg",
    coverAlt: "Impresoft Engage: il CRM che tiene insieme il sistema Corax",
    gallery: [{ src: "/img/covers/news-impresoft.jpg", alt: "La copertina editoriale del progetto Impresoft Engage" }],
    tags: ["CRM", "Piattaforma", "Dati", "Operations"],
    intro:
      "Con Impresoft Engage, Corax ha portato vendite, progetti, talenti e clienti dentro un unico sistema operativo. Non un gestionale in più: un modo per far parlare tra loro le informazioni che prima vivevano in stanze separate.",
    challenge:
      "Un sistema che cresce su quattro unit rischia di moltiplicare strumenti e punti ciechi. Serviva un'unica fonte di verità, capace di collegare la relazione con il cliente al lavoro che viene prodotto.",
    approach:
      "Abbiamo mappato i flussi tra unit e costruito un CRM che segue il ciclo completo: contatto, progetto, produzione, misurazione. Ogni informazione è collegata alla persona e al lavoro che la genera.",
    deliverables: [
      "Analisi dei flussi tra le unit",
      "Configurazione del CRM",
      "Migrazione e pulizia dei dati",
      "Dashboard e reportistica",
      "Formazione dei team",
      "Manutenzione evolutiva",
    ],
    results: [
      { value: "1", label: "sistema operativo" },
      { value: "4", label: "aree collegate" },
      { value: "360°", label: "visione sul cliente" },
      { value: "ONGOING", label: "progetto" },
    ],
    related: ["corax-score", "influenceritalia", "pierfrancesco-petrosillo"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectCategories: ProjectCategory[] = [
  "Branded Entertainment",
  "Influencer Marketing",
  "Podcast & Format",
  "Produzione",
  "Social & Performance",
  "Design & Tech",
];

export const clients = [
  "Politecnico di Milano",
  "Bennet",
  "Gruppo Helvetia Italia",
  "Campus Bio-Medico",
  "Old Wild West",
  "Aroma Zone",
  "Erion",
  "KFC",
  "Rossopomodoro",
  "Risparmio Casa",
  "Citroën",
  "Babaco Market",
  "Treedom",
  "PlayStation",
  "Nivea",
  "Tiffany & Co.",
  "Brioschi",
  "Samsung TV Plus",
  "Spotify",
  "The Channel Store",
  "Impresoft",
  "Numero Diez",
];

export const partners = ["Samsung TV Plus", "The Channel Store", "Spotify", "Impresoft", "Google", "YouTube"];
