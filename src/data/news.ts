export type NewsItem = {
  slug: string;
  title: string;
  /** Title tag breve e ottimizzato (max ~55 caratteri). */
  metaTitle?: string;
  date: string;
  displayDate: string;
  source: string;
  sourceUrl: string;
  category: "Azienda" | "Campagne" | "Media" | "Talent" | "Premi";
  excerpt: string;
  body: string[];
  featured?: boolean;
};

export const news: NewsItem[] = [
  {
    slug: "leader-della-crescita-2026",
    title: "Corax entra nei Leader della Crescita 2026 de Il Sole 24 Ore",
    metaTitle: "Corax nei Leader della Crescita 2026",
    date: "2025-11-12",
    displayDate: "12 novembre 2025",
    source: "Media Key",
    sourceUrl:
      "https://mediakey.it/news/corax-entra-nei-leader-della-crescita-2026-de-il-sole-24-ore/",
    category: "Premi",
    excerpt:
      "Con 8 milioni di fatturato 2025 e una crescita del 45%, Corax entra nella classifica delle aziende italiane con la maggiore crescita di ricavi nel triennio 2021–2024. Nel 2026 l'obiettivo è 12 milioni.",
    body: [
      "Il Sole 24 Ore ha inserito Corax nella classifica annuale delle aziende italiane con la maggiore crescita di ricavi nel triennio 2021–2024. Un riconoscimento che arriva in un anno chiuso con 8 milioni di euro di fatturato, in crescita del 45% rispetto al 2024 e distribuita omogeneamente tra le diverse unit.",
      "«Il percorso di crescita dell'azienda proseguirà naturalmente anche nel 2026, anno in cui puntiamo al raggiungimento di 12 milioni di euro di fatturato», ha dichiarato Claudio Corini, Chief Operating Officer. «Per sostenere questo ritmo di sviluppo, stiamo portando avanti una serie di importanti investimenti».",
      "Gli spazi a disposizione del sistema Corax supereranno nel 2026 i 1.500 mq, con 850 mq aggiuntivi dedicati a uffici e studi di produzione. L'obiettivo è produrre e distribuire 20 nuovi format nel corso dell'anno, mentre l'organico crescerà del 100%.",
      "Nel 2025 sono arrivate anche due novità importanti: Pierfrancesco Petrosillo come Chief Agency Officer, dal 3 novembre, e Giacomo Poretti come Presidente Onorario dal 1° dicembre.",
    ],
    featured: true,
  },
  {
    slug: "corax-73-persone",
    title: "Corax cresce: 73 persone e nuove posizioni aperte a Milano",
    metaTitle: "Corax: 73 persone e nuove posizioni aperte",
    date: "2026-10-28",
    displayDate: "28 ottobre 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Azienda",
    excerpt:
      "Il sistema supera le 73 persone e apre nuove posizioni tra strategy, produzione, media e talent. La Vela si prepara a superare i 1.500 mq.",
    body: [
      "Corax supera le 73 persone e continua a crescere. Un numero che racconta un sistema sempre più integrato, dove strategia, creatività, produzione, media e talent management lavorano sullo stesso progetto.",
      "Le nuove posizioni aperte riguardano le unit Agency, Media House, Talent e Tech: profili senior e junior, con una particolare attenzione a chi sa tenere insieme contenuto, piattaforme e risultati.",
      "La crescita delle persone accompagna quella degli spazi. A La Vela, il campus di Viale Bodio 29/37, gli uffici e gli studi di produzione si preparano a superare i 1.500 mq complessivi.",
      "Chi vuole entrare nel sistema può candidarsi dalla pagina Lavora con noi o scrivere direttamente al team. Non cerchiamo profili perfetti: cerchiamo persone con una direzione.",
    ],
  },
  {
    slug: "corax-score-30-secondi",
    title: "Nasce Corax Score: cinque domande per capire da dove partire",
    metaTitle: "Corax Score: 5 domande, 30 secondi",
    date: "2026-10-21",
    displayDate: "21 ottobre 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Azienda",
    excerpt:
      "Un test da 25 a 100, cinque domande e una unit consigliata. Il nuovo strumento Corax trasforma un'obiettivo di crescita in un primo passo concreto.",
    body: [
      "Corax Score è il nuovo strumento che aiuta brand, aziende e progetti editoriali a capire da dove partire. Cinque domande, trenta secondi, un punteggio da 25 a 100.",
      "Le domande attraversano obiettivo, brand, contenuti, distribuzione e misurazione. Non un questionario generico: un modo per mettere a fuoco il punto di partenza e la unit più utile al progetto.",
      "Alla fine del test si ottiene un livello, una lettura del momento e la unit consigliata. Il risultato può essere portato direttamente nel form contatti: il brief viene compilato con punteggio, priorità e obiettivo.",
      "Nessuna email obbligatoria, nessun impegno. Il Corax Score è disponibile nella home del sito e nella pagina contatti.",
    ],
  },
  {
    slug: "rossopomodoro-a-ognuno-la-sua",
    title: "Rossopomodoro sceglie Corax per “A ognuno la sua”",
    metaTitle: "Rossopomodoro: la campagna A ognuno la sua",
    date: "2026-10-07",
    displayDate: "7 ottobre 2026",
    source: "Engage",
    sourceUrl:
      "https://www.engage.it/agenzie/rossopomodoro-con-corax-per-la-nuova-campagna-a-ognuno-la-sua.aspx",
    category: "Campagne",
    excerpt:
      "Napoletana, croccante e padellino diventano il cuore di un unico concept creativo. La campagna è on air dal 1° ottobre, con media planning di Digital Angels.",
    body: [
      "Rossopomodoro si è affidata a Corax per la nuova campagna “A ognuno la sua”, on air dal 1° ottobre. Il concept parte da un insight semplice: la pizza è cultura e condivisione, ma anche una scelta personale.",
      "La campagna porta in comunicazione i codici dell'esperienza Rossopomodoro — dai pizzaioli agli impasti, dal forno all'atmosfera della pizzeria — attraverso un sistema sviluppato da Corax per i diversi touchpoint.",
      "La pianificazione digital, curata da Digital Angels, comprende un formato Hero per YouTube, contenuti social-first per Instagram Reels, attività su Locala e Demand Gen, programmatic e presenza su Dailymotion.",
    ],
    featured: true,
  },
  {
    slug: "poretcast-30-milioni",
    title: "PoretCast supera i 30 milioni di visualizzazioni",
    metaTitle: "PoretCast supera 30 milioni di views",
    date: "2026-09-18",
    displayDate: "18 settembre 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Media",
    excerpt:
      "Il video podcast di Giacomo Poretti supera i 30 milioni di views su YouTube. Google Italia lo ha raccontato come il salotto più grande del web.",
    body: [
      "Il PoretCast ha superato i 30 milioni di visualizzazioni su YouTube. Un traguardo che consolida il format come una delle properties più riconoscibili del sistema Corax e uno dei video podcast più visti d'Italia.",
      "La formula è semplice e difficile da replicare: Giacomo Poretti accoglie gli ospiti in un salotto volutamente domestico, lasciando che la conversazione prenda il suo tempo. Nessun copione, nessuna rincorsa al momento virale.",
      "Google Italia ha dedicato al PoretCast un approfondimento, raccontando la capacità del format di trasformare YouTube in uno spazio di conversazione. Nel 2026 il progetto continua con nuovi episodi, clip e contenuti pensati per ogni piattaforma.",
    ],
  },
  {
    slug: "la-vela-850-mq",
    title: "La Vela cresce: 850 mq in più per uffici e produzione",
    metaTitle: "La Vela cresce: +850 mq a Milano",
    date: "2026-09-02",
    displayDate: "2 settembre 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Azienda",
    excerpt:
      "Il campus di Viale Bodio 29/37 supera i 1.500 mq. Nuovi uffici e studi di produzione per accompagnare i 20 format del 2026.",
    body: [
      "La Vela cresce. Il campus Corax di Viale Bodio 29/37, nella zona Bovisa di Milano, supera i 1.500 mq complessivi con 850 mq aggiuntivi dedicati a uffici e studi di produzione.",
      "Un investimento che risponde a una necessità concreta: produrre più format, ospitare più team e tenere nello stesso spazio le competenze che oggi lavorano insieme sui progetti. Agenzia, media house, talent e tech smettono di essere unit separate anche fisicamente.",
      "Nel 2026 il sistema punta a produrre e distribuire 20 nuovi format, con un organico in crescita. Lo spazio non è uno sfondo: è parte del modo in cui Corax costruisce contenuti.",
    ],
  },
  {
    slug: "poretcast-google-youtube",
    title: "Google racconta il PoretCast come caso di YouTube",
    metaTitle: "Google racconta il PoretCast",
    date: "2026-07-15",
    displayDate: "15 luglio 2026",
    source: "Google Italia",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Media",
    excerpt:
      "«C'è chi usa YouTube e lo trasforma in un salotto»: Google Italia e Chiara Brunelli raccontano la formula del PoretCast.",
    body: [
      "Google Italia ha dedicato un approfondimento al PoretCast, il video podcast di Giacomo Poretti prodotto da Corax, raccontando la formula che lo ha reso uno dei format più riconoscibili del panorama italiano.",
      "«C'è chi usa YouTube e lo trasforma in un salotto. Sì, come quello di casa, ma aperto al mondo», si legge nel post. Un'idea di autenticità, curiosità e rispetto per la piattaforma che funziona anche in un panorama mediatico sempre più frammentato.",
      "Nel racconto sono intervenuti Giacomo Poretti e Chiara Brunelli, Chief Media Officer di Corax.",
    ],
  },
  {
    slug: "tiffany-ooh-milano",
    title: "Tiffany & Co. porta la maison in città con un progetto OOH",
    metaTitle: "Tiffany & Co. porta la maison in città",
    date: "2026-06-18",
    displayDate: "18 giugno 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Campagne",
    excerpt:
      "Produzione video e contenuti per gli eventi e le installazioni out-of-home: la cura del dettaglio al servizio di un'icona del lusso.",
    body: [
      "Tiffany & Co. ha scelto Corax per la produzione video legata agli eventi e alle installazioni out-of-home. Un progetto che porta la maison fuori dalla vetrina e la mette in relazione con la città.",
      "Il lavoro è stato costruito sulla precisione: luce, materia, tempi di montaggio e restituzione visiva dovevano rispettare gli standard produttivi del brand. Ogni inquadratura è stata pensata per restituire la qualità dell'esperienza.",
      "Un presidio produttivo dedicato, dalla preparazione all'evento fino agli adattamenti per i canali digitali. Il risultato è un racconto che unisce l'immaginario del lusso alla presenza urbana.",
    ],
  },
  {
    slug: "immedia-seconda-stagione",
    title: "Immedia torna con una nuova stagione",
    metaTitle: "Immedia torna con la seconda stagione",
    date: "2026-06-04",
    displayDate: "4 giugno 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Media",
    excerpt:
      "Giovanni Storti e Arianna Izzi tornano con nuovi ospiti e nuovi formati. La sostenibilità diventa conversazione, non lezione.",
    body: [
      "Immedia torna con una nuova stagione. La piattaforma editoriale multicanale firmata Corax, con Giovanni Storti e la divulgatrice scientifica Arianna Izzi, amplia il suo racconto tra ambiente, cibo, città e scelte quotidiane.",
      "La nuova stagione aggiunge formati seriali e nuovi ospiti, mantenendo il principio del progetto: partire da un insight scientifico, tradurlo in racconto e distribuirlo con un piano nativo per ogni piattaforma.",
      "Instagram, TikTok e YouTube restano i canali principali, ma i contenuti vivono anche attraverso clip, podcast e collaborazioni con brand e istituzioni. Un ecosistema editoriale che cresce senza perdere il tono popolare.",
    ],
  },
  {
    slug: "a-tu-per-tu-samsung-tv-plus",
    title: "Nasce “A tu per tu”, il primo canale FAST vodcast italiano",
    metaTitle: "A tu per tu: il primo canale FAST vodcast",
    date: "2026-05-01",
    displayDate: "1 maggio 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Media",
    excerpt:
      "Con The Channel Store e Samsung TV Plus, Corax lancia il primo canale FAST italiano dedicato ai vodcast e ai format conversazionali.",
    body: [
      "Corax ha realizzato con The Channel Store “A tu per tu”, il primo canale FAST (Free Ad-Supported Streaming TV) italiano dedicato ai vodcast e ai format conversazionali, disponibile su Samsung TV Plus.",
      "Il canale propone una selezione di contenuti sviluppati e distribuiti da Corax, portando nell'ecosistema della Connected TV uno stile narrativo nato e cresciuto sulle piattaforme digitali.",
      "Un nuovo touchpoint per i brand e per le properties del sistema, che estende la vita dei contenuti e apre scenari pubblicitari in un ambiente in forte crescita.",
    ],
    featured: true,
  },
  {
    slug: "kick-off-talk-2026",
    title: "Kick off Talk: il calcio si racconta fuori dal campo",
    metaTitle: "Kick off Talk: il calcio fuori dal campo",
    date: "2026-04-16",
    displayDate: "16 aprile 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Media",
    excerpt:
      "Un format che trasforma la partita in conversazione: voci, storie e punti di vista che il novanta minuti non contiene.",
    body: [
      "Kick off Talk è il format Corax che porta il calcio fuori dal campo. Non solo highlights e risultati: al centro ci sono le storie, le personalità e i punti di vista che una partita lascia fuori.",
      "Il progetto nasce per parlare a chi vive il calcio tutto l'anno, non solo la domenica. Un linguaggio da conversazione, ospiti trasversali e una distribuzione pensata per i formati verticali e per YouTube.",
      "Kick off Talk entra nel catalogo dei format Corax e nelle opportunità di branded entertainment per brand e piattaforme che vogliono avvicinarsi al pubblico sportivo senza usare i codici della cronaca.",
    ],
  },
  {
    slug: "theshow-entra-in-corax",
    title: "theShow entra nel sistema Corax",
    metaTitle: "theShow entra nel sistema Corax",
    date: "2026-03-01",
    displayDate: "1 marzo 2026",
    source: "Corax",
    sourceUrl: "https://www.linkedin.com/company/corax-digital-media/",
    category: "Talent",
    excerpt:
      "Dopo oltre 13 anni di esperimenti social, theShow inizia una nuova collaborazione con Corax: business, distribuzione e nuovi format.",
    body: [
      "Dopo oltre tredici anni di esperimenti social, candid camera e format che hanno fatto discutere milioni di persone sul web, theShow entra nel sistema Corax.",
      "La collaborazione nasce per scalare il business legato alle collaborazioni commerciali, ampliare le possibilità distributive e sviluppare nuovi progetti editoriali, unendo la velocità dei contenuti verticali al valore del formato orizzontale.",
      "Un passo avanti per continuare a sperimentare e costruire l'evoluzione dell'intrattenimento digitale.",
    ],
  },
  {
    slug: "risparmio-casa-influencer-marketing",
    title: "Risparmio Casa affida a Corax l'influencer marketing su Instagram e TikTok",
    metaTitle: "Risparmio Casa: influencer marketing a Corax",
    date: "2026-02-17",
    displayDate: "17 febbraio 2026",
    source: "Engage",
    sourceUrl:
      "https://www.engage.it/agenzie/risparmio-casa-affida-a-corax-la-gestione-dellinfluencer-marketing-su-instagram-e-tiktok.aspx",
    category: "Campagne",
    excerpt:
      "Dopo una consultazione, il brand sceglie Corax per la gestione annuale delle attività di influencer marketing legate ai profili ufficiali.",
    body: [
      "Risparmio Casa ha scelto Corax come partner per la gestione annuale delle attività di influencer marketing legate ai profili ufficiali del brand su Instagram e TikTok.",
      "La collaborazione prevede lo sviluppo e l'implementazione di una strategia pensata per aumentare awareness, engagement e relazione con le community social, rendendo la presenza del brand più coerente e continuativa.",
      "Un incarico che unisce selezione dei creator, produzione e misurazione, con un calendario che accompagna le stagionalità del retail.",
    ],
    featured: true,
  },
  {
    slug: "impresoft-engage-crm",
    title: "Con Impresoft Engage il CRM diventa motore di una media company in crescita",
    metaTitle: "Impresoft Engage: il CRM di Corax",
    date: "2025-07-03",
    displayDate: "3 luglio 2025",
    source: "Media Key",
    sourceUrl: "https://mediakey.it/",
    category: "Azienda",
    excerpt:
      "Un sistema di gestione delle relazioni costruito per accompagnare la crescita del gruppo e la complessità delle unit.",
    body: [
      "La crescita di Corax ha richiesto un'infrastruttura capace di tenere insieme vendite, progetti, talenti e clienti. Con Impresoft Engage, il CRM diventa il motore operativo di una media company in espansione.",
      "Un investimento che rientra nella strategia del gruppo: tecnologia e creatività come due facce dello stesso sistema.",
    ],
  },
  {
    slug: "corax-2024-risultati",
    title: "Corax chiude il 2024 con ricavi a +130%",
    metaTitle: "Corax chiude il 2024 con ricavi a +130%",
    date: "2025-01-15",
    displayDate: "15 gennaio 2025",
    source: "Engage",
    sourceUrl:
      "https://www.engage.it/social-media/corax-chiude-il-2024-con-ricavi-a130-e-punta-a-un-2025-di-espansione-con-nuove-acquisizioni.aspx",
    category: "Azienda",
    excerpt:
      "5,5 milioni di fatturato, +130% sull'anno precedente. Nel 2024 Corax ha lavorato con Politecnico di Milano, Bennet, Helvetia, KFC e molti altri.",
    body: [
      "Corax chiude il 2024 con un fatturato di 5,5 milioni di euro, segnando una crescita del 130% rispetto all'anno precedente.",
      "Nel corso dell'anno l'azienda ha collaborato con clienti di rilievo come Politecnico di Milano, Bennet, Gruppo Helvetia Italia, Campus Bio-Medico, Old Wild West, Aroma Zone, Erion e KFC.",
      "Il cuore dell'attività è l'area Media, specializzata nella produzione di contenuti per piattaforme social e podcast originali, con Immedia e PoretCast come progetti di punta. All'interno dell'area opera anche la talent agency, con un roster che attraversa entertainment, food, lifestyle, green e sport.",
    ],
  },
  {
    slug: "climacus-influencer-italia",
    title: "Climacus raddoppia il fatturato e acquisisce Influencer Italia",
    metaTitle: "Climacus acquisisce Influencer Italia",
    date: "2022-04-05",
    displayDate: "5 aprile 2022",
    source: "Engage",
    sourceUrl:
      "https://www.engage.it/agenzie/climacus-corax-raddoppia-il-fatturato-rafforza-larea-commerciale-e-compra-il-100-di-influencer-italia_15971.aspx",
    category: "Azienda",
    excerpt:
      "La holding cui fa capo Corax cresce, rafforza l'area commerciale e acquisisce il 100% di Influencer Italia.",
    body: [
      "Climacus, la holding cui fanno capo la digital company Corax e il progetto editoriale Numero Diez, registra numeri in crescita, si rafforza con nuove figure senior e compra il 100% di Influencer Italia.",
      "«Corax si posiziona come un vero e proprio digital creative studio in grado di supportare le aziende lungo tutto il funnel di conversione», spiegava allora Enrico Bricchi.",
      "Un passaggio che anticipa il modello attuale: un sistema integrato di agenzia, media, talenti e tecnologia.",
    ],
  },
];

export const getNews = (slug: string) => news.find((n) => n.slug === slug);
export const featuredNews = news.filter((n) => n.featured);
