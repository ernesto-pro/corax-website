export type Service = {
  slug: string;
  index: string;
  name: string;
  kicker: string;
  title: string;
  excerpt: string;
  intro: string;
  accent: string;
  capabilities: { title: string; text: string }[];
  process: { step: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  metrics: { value: string; label: string }[];
  relatedProjects: string[];
  keywords: string[];
};

export const services: Service[] = [
  {
    slug: "agency",
    index: "01",
    name: "Agency",
    kicker: "Strategia, creatività, performance",
    title: "Un'unica regia per ogni punto di contatto.",
    excerpt:
      "Social media strategy, influencer marketing, branded entertainment e performance: la unit che trasforma gli obiettivi di business in sistemi di comunicazione.",
    intro:
      "La unit Agency di Corax nasce per accompagnare i brand lungo tutto il funnel, dalla prima idea alla misurazione. Un team integrato di strategist, creativi, account e media specialist che lavora su un principio semplice: la creatività senza performance è intrattenimento, la performance senza creatività è rumore.",
    accent: "#5b3df5",
    capabilities: [
      {
        title: "Social media strategy",
        text: "Posizionamento, analisi competitiva, architettura editoriale e piani di crescita costruiti sui dati e sulle community reali.",
      },
      {
        title: "Influencer marketing",
        text: "Scouting, selezione e gestione di creator, con una lettura attenta di affinità, tono di voce e potenziale di efficacia.",
      },
      {
        title: "Branded entertainment",
        text: "Format e contenuti che intrattenono prima di vendere, costruiti insieme ai talent e alle properties del sistema Corax.",
      },
      {
        title: "Creative & content",
        text: "Concept, copy, art direction e produzione social-first per tutte le piattaforme, dal verticale al formato lungo.",
      },
      {
        title: "Media & performance",
        text: "Pianificazione media, adv e ottimizzazione continua per trasformare la visibilità in risultati misurabili.",
      },
      {
        title: "Brand partnership",
        text: "Connessioni tra brand, talent e proprietà editoriali, con operazioni speciali e progetti su misura.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Ascolto",
        text: "Analizziamo brand, mercato, audience e obiettivi. Nessuna strategia nasce prima di aver capito cosa stiamo risolvendo.",
      },
      {
        step: "02",
        title: "Strategia",
        text: "Definiamo posizionamento, territorio editoriale, canali e KPI. Una direzione chiara, condivisa e misurabile.",
      },
      {
        step: "03",
        title: "Creazione",
        text: "Concept, contenuti e produzioni nascono in casa, con un presidio creativo che non perde mai di vista la performance.",
      },
      {
        step: "04",
        title: "Attivazione",
        text: "Distribuiamo, amplifichiamo e ottimizziamo in tempo reale. Media, creator e properties lavorano insieme.",
      },
      {
        step: "05",
        title: "Misurazione",
        text: "Leggiamo i risultati, impariamo e alimentiamo il ciclo successivo. La crescita è un processo, non un output.",
      },
    ],
    faqs: [
      {
        q: "Corax lavora solo con grandi brand?",
        a: "No. Lavoriamo con aziende di dimensioni diverse, dal brand retail alla grande impresa. Quello che conta è la chiarezza degli obiettivi e la possibilità di costruire un percorso, non il numero di zero nel budget.",
      },
      {
        q: "Vi occupate anche di media planning e ADV?",
        a: "Sì. La unit Agency integra strategia, creatività e performance: pianificazione media, adv e ottimizzazione fanno parte dello stesso processo, così la creatività non resta scollegata dai risultati.",
      },
      {
        q: "Quanto dura una collaborazione?",
        a: "Dipende dall'obiettivo. Si va dal progetto spot alla gestione continuativa. La maggior parte delle relazioni nasce da un progetto e continua nel tempo, perché il sistema impara a conoscere il brand.",
      },
      {
        q: "Come misurate i risultati?",
        a: "Con KPI definiti prima di iniziare: awareness, engagement, traffico, conversioni. Ogni progetto ha una dashboard e un momento di lettura condiviso con il cliente.",
      },
    ],
    metrics: [
      { value: "+45%", label: "crescita ricavi 2025" },
      { value: "250+", label: "progetti conclusi" },
      { value: "96%", label: "client satisfaction" },
      { value: "12 MLN", label: "target 2026" },
    ],
    relatedProjects: ["rossopomodoro", "risparmio-casa", "vola-a-madrid-nivea"],
    keywords: [
      "agenzia social media Milano",
      "influencer marketing",
      "branded entertainment",
      "social media strategy",
      "campagne digital",
    ],
  },
  {
    slug: "media-house",
    index: "02",
    name: "Media House",
    kicker: "Produzione e distribuzione",
    title: "Dall'idea al palinsesto, senza intermediari.",
    excerpt:
      "Ideazione, produzione e distribuzione di format, podcast e contenuti: la factory editoriale che dà forma alle storie.",
    intro:
      "Corax Media House è il dipartimento che idea e produce contenuti originali per il sistema Corax e per i brand. Un presidio produttivo completo — regia, fotografia, audio, post-produzione, grafica — che lavora su formati pensati per le piattaforme e per le persone che le abitano.",
    accent: "#ff5a3c",
    capabilities: [
      {
        title: "Format & storytelling",
        text: "Ideazione di format seriali, pilastri editoriali e proprietà intellettuali capaci di vivere oltre il singolo contenuto.",
      },
      {
        title: "Video production",
        text: "Produzioni multi-camera, set, campagne e contenuti on location, con standard cinematografici e tempi da digital.",
      },
      {
        title: "Podcast & vodcast",
        text: "Progettazione, produzione e distribuzione di podcast audio e video, dal concept alla misurazione.",
      },
      {
        title: "Distribution & promotion",
        text: "Piani di lancio e distribuzione su YouTube, social, audio e Connected TV, con adattamenti nativi per piattaforma.",
      },
      {
        title: "Post & sound",
        text: "Montaggio, color, motion graphics e sound design per restituire identità e qualità a ogni progetto.",
      },
      {
        title: "FAST & Connected TV",
        text: "Costruzione di canali FAST, palinsesti e operations televisive per portare i contenuti digitali sul grande schermo.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Concept",
        text: "Partiamo da un'idea e da un'assunzione: se non è riconoscibile, non vale la pena produrla.",
      },
      {
        step: "02",
        title: "Sviluppo",
        text: "Scrittura, casting, set design e piano di produzione. Ogni dettaglio costruisce il linguaggio del format.",
      },
      {
        step: "03",
        title: "Produzione",
        text: "Set e troupe interne, regia e direzione artistica. Produciamo con standard alti e un occhio al ritmo.",
      },
      {
        step: "04",
        title: "Post",
        text: "Montaggio, sound e grafica. È qui che il contenuto diventa davvero un prodotto editoriale.",
      },
      {
        step: "05",
        title: "Distribuzione",
        text: "Pubblichiamo, promuoviamo e misuriamo. Ogni format è pensato per il contesto in cui vive.",
      },
    ],
    faqs: [
      {
        q: "Producete anche per brand esterni al sistema Corax?",
        a: "Sì. La Media House produce format e contenuti per i brand, oltre che per le properties proprietarie. Regia, fotografia, audio, post-produzione e grafica sono gestiti internamente.",
      },
      {
        q: "Vi occupate anche della distribuzione?",
        a: "Sì. Ogni progetto nasce con un piano di distribuzione nativo per piattaforma: YouTube, social, audio e Connected TV. Non consegniamo solo il file: lo portiamo al pubblico.",
      },
      {
        q: "Che formati realizzate?",
        a: "Video podcast e vodcast, format seriali, campagne video, contenuti social-first, documentari e produzioni per eventi. Dal verticale al formato lungo, con standard produttivi adatti al contesto.",
      },
      {
        q: "Quanto dura una produzione?",
        a: "Dipende dal format. Un contenuto singolo può richiedere giorni, un format seriale si costruisce in settimane. Il piano di produzione viene condiviso prima di partire.",
      },
    ],
    metrics: [
      { value: "30 MLN+", label: "view PoretCast" },
      { value: "20", label: "nuovi format nel 2026" },
      { value: "1.500 mq", label: "spazi produttivi" },
      { value: "24/7", label: "canale FAST" },
    ],
    relatedProjects: ["poretcast", "immedia", "a-tu-per-tu"],
    keywords: [
      "produzione video Milano",
      "podcast production",
      "format televisivi",
      "media house",
      "contenuti social",
    ],
  },
  {
    slug: "talent",
    index: "03",
    name: "Talent",
    kicker: "Persone, non semplici profili",
    title: "Il talento è una relazione, non un numero.",
    excerpt:
      "Gestione, sviluppo e valorizzazione di un roster che attraversa entertainment, food, lifestyle, green e sport.",
    intro:
      "La talent agency di Corax rappresenta persone, prima che creator. Costruiamo carriere con una visione di lungo periodo, selezionando voci capaci di durare e affiancandole in ogni fase: posizionamento, produzione, partnership e gestione quotidiana.",
    accent: "#dedbf5",
    capabilities: [
      {
        title: "Talent management",
        text: "Gestione strategica e operativa del talento, con un presidio dedicato su carriera, immagine e opportunità.",
      },
      {
        title: "Brand partnership",
        text: "Connessioni tra talenti e brand costruite su affinità reali, non su semplici numeri di follower.",
      },
      {
        title: "Personal branding",
        text: "Posizionamento, identità editoriale e sviluppo di contenuti proprietari per costruire una voce riconoscibile.",
      },
      {
        title: "Booking & operations",
        text: "Gestione di ingaggi, contratti, produzione e logistica, con trasparenza per talenti e partner.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Scouting",
        text: "Cerchiamo talento, ossessione e capacità di mettersi in discussione. I numeri raccontano solo una parte.",
      },
      {
        step: "02",
        title: "Posizionamento",
        text: "Definiamo la voce, il territorio e gli obiettivi. Una direzione artistica prima ancora che commerciale.",
      },
      {
        step: "03",
        title: "Sviluppo",
        text: "Format, contenuti e progetti proprietari per far crescere il talento oltre la piattaforma.",
      },
      {
        step: "04",
        title: "Partnership",
        text: "Selezioniamo i brand giusti e costruiamo collaborazioni coerenti, curate in ogni dettaglio.",
      },
    ],
    faqs: [
      {
        q: "Come selezionate i talenti?",
        a: "Guardiamo voce, ossessione e capacità di durare, non solo i follower. Il roster nasce da incontri e da progetti fatti insieme, non da una classifica.",
      },
      {
        q: "Gestite anche i rapporti commerciali?",
        a: "Sì. Booking, contratti, produzione e logistica sono gestiti dal team, con trasparenza per talenti e brand.",
      },
      {
        q: "Un brand può proporre una collaborazione con un talento?",
        a: "Sì. Raccontaci il progetto e il contesto: valutiamo l'affinità e ti proponiamo la persona giusta, o ti diciamo se non c'è.",
      },
      {
        q: "Un talento può candidarsi?",
        a: "Sì. Scrivici dalla pagina Lavora con noi: leggiamo tutte le candidature e rispondiamo quando c'è un'opportunità concreta.",
      },
    ],
    metrics: [
      { value: "20+", label: "talenti nel roster" },
      { value: "5", label: "verticali" },
      { value: "360°", label: "gestione" },
      { value: "#1", label: "podcast in Italia" },
    ],
    relatedProjects: ["frank-gramuglia-citroen", "giovanni-storti-babaco-market", "theshow"],
    keywords: [
      "talent agency Milano",
      "creator management",
      "influencer",
      "brand partnership",
      "talent management",
    ],
  },
  {
    slug: "tech",
    index: "04",
    name: "Tech",
    kicker: "Infrastrutture per il racconto",
    title: "La tecnologia che rende scalabile la creatività.",
    excerpt:
      "Siti, piattaforme, e-commerce, dashboard e strumenti proprietari: il reparto IT che costruisce l'infrastruttura del sistema Corax.",
    intro:
      "Corax Tech è il dipartimento che progetta e sviluppa i prodotti digitali del sistema e dei clienti: siti web, piattaforme, e-commerce, dashboard e strumenti interni. Un presidio full stack che lavora a stretto contatto con creatività e media, perché un buon prodotto digitale è prima di tutto un buon racconto.",
    accent: "#c8ff4d",
    capabilities: [
      {
        title: "Web design & development",
        text: "Siti altamente personalizzabili, veloci e accessibili, progettati per durare e per posizionarsi.",
      },
      {
        title: "Piattaforme & prodotti",
        text: "Piattaforme proprietarie come Influenceritalia, CRM e ambienti di lavoro costruiti sulle esigenze reali dei team.",
      },
      {
        title: "E-commerce",
        text: "Negozi digitali, integrazioni e flussi di acquisto pensati per convertire senza attrito.",
      },
      {
        title: "Data & dashboard",
        text: "Dashboard, report e strumenti di misurazione per leggere i risultati e prendere decisioni migliori.",
      },
      {
        title: "AI & automazione",
        text: "Sperimentazione applicata all'editoria, al marketing e ai processi interni, con un approccio pragmatico.",
      },
      {
        title: "SEO & performance",
        text: "Architettura dell'informazione, Core Web Vitals e ottimizzazione tecnica per una visibilità sostenibile.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        text: "Obiettivi, utenti, contenuti e vincoli. Il prodotto digitale nasce da una comprensione, non da un template.",
      },
      {
        step: "02",
        title: "Design",
        text: "Information architecture, prototipi e design system. Ogni scelta è verificata su casi reali.",
      },
      {
        step: "03",
        title: "Build",
        text: "Sviluppo full stack con attenzione a performance, accessibilità e manutenibilità.",
      },
      {
        step: "04",
        title: "Misura",
        text: "Analytics, test e iterazioni. Un sito non è un progetto che finisce, è un prodotto che cresce.",
      },
    ],
    faqs: [
      {
        q: "Che tipo di prodotti digitali realizzate?",
        a: "Siti, piattaforme, e-commerce, app, dashboard e strumenti interni. Dalla progettazione dell'esperienza allo sviluppo e alla manutenzione.",
      },
      {
        q: "Vi occupate anche di SEO e performance?",
        a: "Sì. Architettura dell'informazione, Core Web Vitals, accessibilità e SEO tecnica fanno parte del progetto fin dall'inizio, non sono un intervento successivo.",
      },
      {
        q: "Il sito sarà facile da aggiornare?",
        a: "Sì. Costruiamo sistemi editoriali e CMS pensati per chi li usa ogni giorno, con una formazione iniziale e documentazione.",
      },
      {
        q: "Lavorate anche su progetti già esistenti?",
        a: "Sì. Analizziamo lo stato attuale, definiamo le priorità e interveniamo per fasi, senza fermare il prodotto.",
      },
    ],
    metrics: [
      { value: "100/100", label: "obiettivo Lighthouse" },
      { value: "FULL STACK", label: "competenze" },
      { value: "1", label: "piattaforma proprietaria" },
      { value: "SEO", label: "by design" },
    ],
    relatedProjects: ["influenceritalia", "numero-diez", "il-ristorante-serra"],
    keywords: [
      "sviluppo siti web Milano",
      "piattaforme digitali",
      "e-commerce",
      "SEO tecnica",
      "full stack development",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
