export type ScanFocus = "agency" | "media-house" | "talent" | "tech";

export type ScanOption = {
  label: string;
  detail: string;
  points: number;
  focus: ScanFocus;
};

export type ScanQuestion = {
  id: string;
  kicker: string;
  title: string;
  options: ScanOption[];
};

export type ScanLevel = {
  id: string;
  min: number;
  name: string;
  title: string;
  description: string;
  move: string;
  focus: ScanFocus;
};

export const scanQuestions: ScanQuestion[] = [
  {
    id: "goal",
    kicker: "Il risultato",
    title: "Cosa deve succedere perché questo progetto abbia senso?",
    options: [
      {
        label: "Farci conoscere",
        detail: "Awareness e presenza",
        points: 10,
        focus: "media-house",
      },
      {
        label: "Vendere di più",
        detail: "Performance e conversioni",
        points: 20,
        focus: "agency",
      },
      {
        label: "Costruire community",
        detail: "Relazione e ritorno",
        points: 15,
        focus: "talent",
      },
      {
        label: "Lanciare qualcosa",
        detail: "Novità e impatto",
        points: 15,
        focus: "agency",
      },
    ],
  },
  {
    id: "brand",
    kicker: "Il punto di partenza",
    title: "A che punto è il tuo brand, davvero?",
    options: [
      {
        label: "Partiamo da zero",
        detail: "Tutto da costruire",
        points: 5,
        focus: "agency",
      },
      {
        label: "Ci conoscono, ma non ci ricordano",
        detail: "Notorietà da attivare",
        points: 10,
        focus: "media-house",
      },
      {
        label: "Abbiamo una community vera",
        detail: "Relazione già viva",
        points: 15,
        focus: "talent",
      },
      {
        label: "Siamo la categoria",
        detail: "Leadership da difendere",
        points: 20,
        focus: "media-house",
      },
    ],
  },
  {
    id: "asset",
    kicker: "L'arma",
    title: "Qual è la cosa più forte che hai in mano?",
    options: [
      {
        label: "Un prodotto che parla da solo",
        detail: "Prodotto e sostanza",
        points: 10,
        focus: "agency",
      },
      {
        label: "Una persona con una voce forte",
        detail: "Talento e personalità",
        points: 20,
        focus: "talent",
      },
      {
        label: "Un budget media",
        detail: "Investimento e reach",
        points: 15,
        focus: "agency",
      },
      {
        label: "Un'idea, ancora da costruire",
        detail: "Territorio da definire",
        points: 5,
        focus: "tech",
      },
    ],
  },
  {
    id: "speed",
    kicker: "Il tempo",
    title: "Quanto tempo hai per vedere il risultato?",
    options: [
      { label: "Ieri", detail: "Urgenza massima", points: 20, focus: "agency" },
      { label: "Tre mesi", detail: "Un trimestre per partire", points: 15, focus: "agency" },
      {
        label: "Sei-dodici mesi",
        detail: "Costruzione progressiva",
        points: 10,
        focus: "media-house",
      },
      {
        label: "Stiamo costruendo, senza fretta",
        detail: "Progetto di lungo periodo",
        points: 5,
        focus: "tech",
      },
    ],
  },
  {
    id: "measure",
    kicker: "La misura",
    title: "Come decidi se ha funzionato?",
    options: [
      { label: "Vendite e lead", detail: "Numeri di business", points: 20, focus: "agency" },
      { label: "Notorietà", detail: "Presenza e ricordo", points: 10, focus: "media-house" },
      {
        label: "Engagement e community",
        detail: "Conversazione e relazione",
        points: 15,
        focus: "talent",
      },
      { label: "Non lo so ancora", detail: "Definiamolo insieme", points: 5, focus: "tech" },
    ],
  },
];

export const scanLevels: ScanLevel[] = [
  {
    id: "01",
    min: 25,
    name: "Potenziale grezzo",
    title: "Hai la materia. Manca la regia.",
    description:
      "Il potenziale c'è, ma non è ancora organizzato in un sistema. La buona notizia: da qui si vede tutto il percorso.",
    move: "Parti da una strategia, non da un post.",
    focus: "agency",
  },
  {
    id: "02",
    min: 50,
    name: "Buone basi",
    title: "Hai qualcosa da dire. Ora serve un sistema.",
    description:
      "I pezzi ci sono, ma viaggiano separati. Il salto non è fare più contenuti: è metterli nella stessa regia.",
    move: "Trasforma i contenuti in un ecosistema.",
    focus: "media-house",
  },
  {
    id: "03",
    min: 70,
    name: "Pronto a scalare",
    title: "Il motore gira. Serve il carburante giusto.",
    description:
      "Hai trazione. Per non bruciarla, servono produzione, talento e distribuzione che lavorino nella stessa direzione.",
    move: "Metti talento, produzione e media nella stessa stanza.",
    focus: "talent",
  },
  {
    id: "04",
    min: 85,
    name: "Modalità categoria",
    title: "Non ti serve rumore. Ti serve una firma.",
    description:
      "Hai già presenza e struttura. Il prossimo passo non è fare di più: è possedere un territorio che nessun altro può copiare.",
    move: "Costruisci una property, non una campagna.",
    focus: "media-house",
  },
];

export type ScanFocusProfile = {
  name: string;
  promise: string;
  moves: string[];
};

export const scanFocuses: Record<ScanFocus, ScanFocusProfile> = {
  agency: {
    name: "Agency",
    promise: "Strategia, creatività e performance in un'unica regia.",
    moves: [
      "Metti un solo KPI davanti a tutto il resto: il resto è decorazione.",
      "Costruisci un concept che regge anche senza budget media.",
      "Porta produzione e performance nello stesso brief, non in due fornitori diversi.",
    ],
  },
  "media-house": {
    name: "Media House",
    promise: "Format, produzione e distribuzione che costruiscono pubblico.",
    moves: [
      "Trasforma il contenuto in un format ricorrente, non in una campagna usa e getta.",
      "Progetta la distribuzione prima della produzione: dove va, per chi, ogni quanto.",
      "Dai al pubblico un motivo per tornare, non solo per guardare una volta.",
    ],
  },
  talent: {
    name: "Talent",
    promise: "Persone con una voce forte, dentro una partnership vera.",
    moves: [
      "Scegli una voce, non un volto qualunque: la personalità è il media.",
      "Costruisci la partnership prima del contratto: durata, libertà, regia condivisa.",
      "Fai crescere il talento con un progetto editoriale, non con una lista di post.",
    ],
  },
  tech: {
    name: "Tech",
    promise: "Piattaforme e strumenti che rendono scalabile il racconto.",
    moves: [
      "Metti a terra un MVP che racconti già il brand, non un prototipo anonimo.",
      "Automatizza ciò che si ripete, non ciò che crea: la regia resta umana.",
      "Misura l'uso reale, non le iscrizioni: il prodotto si giudica da chi torna.",
    ],
  },
};

export const scanFocusOrder: ScanFocus[] = ["agency", "media-house", "talent", "tech"];

export const SCAN_MIN = 25;
export const SCAN_MAX = 100;

export const getScanLevel = (score: number) =>
  [...scanLevels].reverse().find((level) => score >= level.min) ?? scanLevels[0];

export const getNextScanLevel = (score: number) =>
  scanLevels.find((level) => level.min > score);

/** Posizione 0–100 sulla scala 25–100: usata da barre e livelli. */
export const getScanPosition = (score: number) =>
  Math.max(0, Math.min(100, ((score - SCAN_MIN) / (SCAN_MAX - SCAN_MIN)) * 100));

export const getScanFocus = (slug: string | null): ScanFocus =>
  slug && slug in scanFocuses ? (slug as ScanFocus) : "agency";

export const getScanLevelById = (id: string | null) =>
  scanLevels.find((level) => level.id === id);
