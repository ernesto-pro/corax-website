export type TalentCategory =
  | "Entertainment"
  | "Comedy"
  | "Food"
  | "Lifestyle"
  | "Green"
  | "Sport"
  | "Creator";

export type Talent = {
  slug: string;
  name: string;
  categories: TalentCategory[];
  note: string;
  property?: string;
  featured?: boolean;
};

export const talentCategories: TalentCategory[] = [
  "Entertainment",
  "Comedy",
  "Food",
  "Lifestyle",
  "Green",
  "Sport",
  "Creator",
];

export const talents: Talent[] = [
  {
    slug: "aldo-giovanni-giacomo",
    name: "Aldo, Giovanni e Giacomo",
    categories: ["Entertainment", "Comedy"],
    note: "Il trio che ha scritto la storia della comicità italiana, tra teatro, cinema e televisione.",
    featured: true,
  },
  {
    slug: "giacomo-poretti",
    name: "Giacomo Poretti",
    categories: ["Entertainment", "Comedy"],
    note: "Attore, autore e voce del PoretCast. Presidente Onorario di Corax dal 2025.",
    property: "PoretCast",
    featured: true,
  },
  {
    slug: "giovanni-storti",
    name: "Giovanni Storti",
    categories: ["Entertainment", "Green", "Comedy"],
    note: "Attore e autore. Con Corax dà voce a Immedia e ai progetti dedicati alla sostenibilità.",
    property: "Immedia",
    featured: true,
  },
  {
    slug: "frank-gramuglia",
    name: "Frank Gramuglia",
    categories: ["Entertainment", "Comedy", "Creator"],
    note: "Ironia e strada: un interprete capace di trasformare qualsiasi contesto in un format.",
    featured: true,
  },
  {
    slug: "enrico-papi",
    name: "Enrico Papi",
    categories: ["Entertainment"],
    note: "Volto televisivo e conduttore, una delle voci più riconoscibili dello spettacolo italiano.",
    featured: true,
  },
  {
    slug: "giulia-bellu",
    name: "Giulia Bellu",
    categories: ["Entertainment", "Lifestyle"],
    note: "Attrice e content creator, nuova energia del roster Corax.",
    featured: true,
  },
  {
    slug: "theshow",
    name: "theShow",
    categories: ["Creator", "Entertainment", "Comedy"],
    note: "Tredici anni di esperimenti social diventati uno dei progetti editoriali più riconoscibili del web.",
    featured: true,
  },
  {
    slug: "pirlasv",
    name: "PirlasV",
    categories: ["Sport", "Creator", "Entertainment"],
    note: "Calcio, gaming e community: un linguaggio diretto che parla a una generazione intera.",
  },
  {
    slug: "jules",
    name: "Jules",
    categories: ["Lifestyle", "Creator"],
    note: "Content creator e voce autentica del lifestyle digitale.",
  },
  {
    slug: "sara-gioira",
    name: "Sara Gioira",
    categories: ["Lifestyle", "Creator"],
    note: "Moda, bellezza e quotidianità raccontate con uno sguardo personale.",
  },
  {
    slug: "ginevra-giaccherini",
    name: "Ginevra Giaccherini",
    categories: ["Lifestyle", "Sport"],
    note: "Sport, movimento e stile di vita: una community che cresce intorno all'energia.",
  },
  {
    slug: "piovono-ricette",
    name: "Piovono Ricette",
    categories: ["Food", "Creator"],
    note: "La cucina che diverte: ricette, ironia e un pubblico che torna ogni giorno.",
  },
  {
    slug: "luca-mastrangelo",
    name: "Luca Mastrangelo",
    categories: ["Food", "Entertainment"],
    note: "Cucina, racconto e intrattenimento: il cibo come linguaggio popolare.",
  },
  {
    slug: "arianna-izzi",
    name: "Arianna Izzi",
    categories: ["Green", "Creator"],
    note: "Divulgatrice scientifica, co-autrice del racconto di Immedia.",
    property: "Immedia",
  },
];

export const featuredTalents = talents.filter((t) => t.featured);

export const getTalent = (slug: string) => talents.find((t) => t.slug === slug);
