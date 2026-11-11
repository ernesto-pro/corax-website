export type TalentCategory =
  | "Entertainment"
  | "Comedy"
  | "Food"
  | "Lifestyle"
  | "Green"
  | "Sport"
  | "Creator";

export type TalentVideo = {
  id: string;
  title: string;
};

export type TalentYoutube = {
  name: string;
  url: string;
  videos: TalentVideo[];
};

export type Talent = {
  slug: string;
  name: string;
  categories: TalentCategory[];
  note: string;
  property?: string;
  featured?: boolean;
  /** Instagram handle, without the @. */
  instagram: string;
  /** Only for talent with a real, owned YouTube channel. */
  youtube?: TalentYoutube;
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

export const instagramUrl = (handle: string) => `https://www.instagram.com/${handle}/`;
export const youtubeVideoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

export const talents: Talent[] = [
  {
    slug: "aldo-giovanni-giacomo",
    name: "Aldo, Giovanni e Giacomo",
    categories: ["Entertainment", "Comedy"],
    note: "Il trio che ha scritto la storia della comicità italiana, tra teatro, cinema e televisione.",
    featured: true,
    instagram: "agg_ufficiale",
    youtube: {
      name: "Aldo Giovanni e Giacomo Ufficiale",
      url: "https://www.youtube.com/@aldogiovanniegiacomo",
      videos: [
        {
          id: "B1XDJO2EnxI",
          title:
            "Quattro e tre... otto! - La leggenda di Al, John e Jack | Aldo Giovanni Giacomo",
        },
        {
          id: "5TUGY2Yu_c0",
          title: "Acqua gassata a garganella - Chiedimi se sono felice | Aldo Giovanni Giacomo",
        },
      ],
    },
  },
  {
    slug: "giacomo-poretti",
    name: "Giacomo Poretti",
    categories: ["Entertainment", "Comedy"],
    note: "Attore, autore e voce del PoretCast. Presidente Onorario di Corax dal 2025.",
    property: "PoretCast",
    featured: true,
    instagram: "giacomoporetti_ufficiale",
    youtube: {
      name: "PoretCast di Giacomo Poretti",
      url: "https://www.youtube.com/@poretcast",
      videos: [
        {
          id: "UYPj1cGzWXI",
          title: "Ep.1 S5 | \"L'arte è davvero per tutti?\" con Giovanni Muciaccia | PORETCAST",
        },
        {
          id: "FkpdJD5NnQ4",
          title: "Ep.2 S5 | \"I social devono esplodere\" con Beatrice Arnera | PORETCAST",
        },
      ],
    },
  },
  {
    slug: "giovanni-storti",
    name: "Giovanni Storti",
    categories: ["Entertainment", "Green", "Comedy"],
    note: "Attore e autore. Con Corax dà voce a Immedia e ai progetti dedicati alla sostenibilità.",
    property: "Immedia",
    featured: true,
    instagram: "giovanni.storti.ufficiale",
    youtube: {
      name: "Giovanni Storti",
      url: "https://www.youtube.com/@giovannistortiufficiale",
      videos: [
        {
          id: "nvmjUl9lFYw",
          title: "Che pianta è? Un pino? No è una sequoia sempreverde!",
        },
        { id: "cNK1j9AYnrM", title: "Un brodo di giuggiole…" },
      ],
    },
  },
  {
    slug: "frank-gramuglia",
    name: "Frank Gramuglia",
    categories: ["Entertainment", "Comedy", "Creator"],
    note: "Ironia e strada: un interprete capace di trasformare qualsiasi contesto in un format.",
    featured: true,
    instagram: "frank_gramuglia",
    youtube: {
      name: "Frank Gramuglia",
      url: "https://www.youtube.com/@frank_gramuglia",
      videos: [
        { id: "yGq0jsvmQ9w", title: "POV: Hai una fidanzata" },
        { id: "fyXu4IeVTIc", title: "Cose che vorresti dire al tuo capo ep.12" },
      ],
    },
  },
  {
    slug: "enrico-papi",
    name: "Enrico Papi",
    categories: ["Entertainment"],
    note: "Volto televisivo e conduttore, una delle voci più riconoscibili dello spettacolo italiano.",
    featured: true,
    instagram: "enricopapiofficial",
  },
  {
    slug: "giulia-bellu",
    name: "Giulia Bellu",
    categories: ["Entertainment", "Lifestyle"],
    note: "Attrice e content creator, nuova energia del roster Corax.",
    featured: true,
    instagram: "giulia_bellu",
    youtube: {
      name: "Giulia Bellu",
      url: "https://www.youtube.com/@giuliabellu97",
      videos: [
        { id: "v_P7dFmZSBE", title: "I simpaticoni #parenti #natale #cena #comedy" },
        { id: "PAEbU0IX9VU", title: "Troverebbero quelle due arance" },
      ],
    },
  },
  {
    slug: "theshow",
    name: "theShow",
    categories: ["Creator", "Entertainment", "Comedy"],
    note: "Tredici anni di esperimenti social diventati uno dei progetti editoriali più riconoscibili del web.",
    featured: true,
    instagram: "theshowisyou",
    youtube: {
      name: "theShow",
      url: "https://www.youtube.com/@theshowisyou",
      videos: [
        {
          id: "NmFPdCaQ4p4",
          title:
            "Stealth Camping nel Quartiere ROM più Grande d’Europa - Stealth Camping 🇧🇬 Ep.2 - theShow",
        },
        {
          id: "h1rwdccwzWY",
          title:
            "72h di Stealth Camping nella Nazione Più Povera d'Europa - Stealth Camping 🇧🇬 Ep.1 - theShow",
        },
      ],
    },
  },
  {
    slug: "pirlasv",
    name: "PirlasV",
    categories: ["Sport", "Creator", "Entertainment"],
    note: "Calcio, gaming e community: un linguaggio diretto che parla a una generazione intera.",
    instagram: "pirlasv",
    youtube: {
      name: "PirlasV",
      url: "https://www.youtube.com/@PirlasV",
      videos: [
        {
          id: "-77HwN6GJTE",
          title: "MUNDIALITO con tutte le squadre di NATIONS LEAGUE!! *ASSURDO*",
        },
        {
          id: "zBztV2WdXq0",
          title: "Ad ogni GOL segnato, il pallone diventa più COSTOSO!! *3000€*",
        },
      ],
    },
  },
  {
    slug: "jules",
    name: "Jules",
    categories: ["Lifestyle", "Creator"],
    note: "Content creator e voce autentica del lifestyle digitale.",
    instagram: "iosonojules",
    youtube: {
      name: "Io sono Jules",
      url: "https://www.youtube.com/@iosonojules3031",
      videos: [
        { id: "jerHUSVuxHY", title: "Perché TIKTOK mi fa schifo?" },
        { id: "HciDSm0McF4", title: "CASA CAMERATA - TUTTA LA PRIMA STAGIONE" },
      ],
    },
  },
  {
    slug: "sara-gioira",
    name: "Sara Gioira",
    categories: ["Lifestyle", "Creator"],
    note: "Moda, bellezza e quotidianità raccontate con uno sguardo personale.",
    instagram: "sara_home_organizer",
    youtube: {
      name: "sara_home_organizer",
      url: "https://www.youtube.com/channel/UCJTMnmhQLeygNng-UDAu1sA",
      videos: [
        {
          id: "Lz80tDjcHbs",
          title: "L’alternativa all’organizer — secondo episodio",
        },
        {
          id: "7FDs9J1ZVu8",
          title: "Borsa spiaggia sempre pronta: l’essenziale per l’estate",
        },
      ],
    },
  },
  {
    slug: "ginevra-giaccherini",
    name: "Ginevra Giaccherini",
    categories: ["Lifestyle", "Sport"],
    note: "Sport, movimento e stile di vita: una community che cresce intorno all'energia.",
    instagram: "ginevragiaccherini",
    youtube: {
      name: "Ginevra Giaccherini",
      url: "https://www.youtube.com/@ginevragiaccherini",
      videos: [
        {
          id: "q-msDFmeTJU",
          title: "MY WEST COAST ROAD TRIP | California, Arizona, Utah, Nevada",
        },
        { id: "JAp6Wdmw2IE", title: "MY SIGNATURE MAKE-UP | STEP BY STEP" },
      ],
    },
  },
  {
    slug: "piovono-ricette",
    name: "Piovono Ricette",
    categories: ["Food", "Creator"],
    note: "La cucina che diverte: ricette, ironia e un pubblico che torna ogni giorno.",
    instagram: "piovono.ricette",
    youtube: {
      name: "Piovono Ricette",
      url: "https://www.youtube.com/@piovonoricette",
      videos: [
        {
          id: "0BqW3InaU7k",
          title: "Orecchiette gratinate alla boscaiola… pura goduria!",
        },
        {
          id: "aD46zLmJFeE",
          title: "3 contorni autunnali colorati, sfiziosi e ricchi di sapore",
        },
      ],
    },
  },
  {
    slug: "luca-mastrangelo",
    name: "Luca Mastrangelo",
    categories: ["Food", "Entertainment"],
    note: "Cucina, racconto e intrattenimento: il cibo come linguaggio popolare.",
    instagram: "lucabomber80",
    youtube: {
      name: "Luca Mastrangelo",
      url: "https://www.youtube.com/@LucaMastrangeloOfficial",
      videos: [
        {
          id: "g3XTOHpND5I",
          title: "Ausilio a ruota libera: “Non ho più sentito Marotta!”",
        },
        {
          id: "80tc8Rd6ydc",
          title: "La frase che ha dato fastidio ai milanisti: Frattesi è un rimpianto?",
        },
      ],
    },
  },
  {
    slug: "arianna-izzi",
    name: "Arianna Izzi",
    categories: ["Green", "Creator"],
    note: "Divulgatrice scientifica, co-autrice del racconto di Immedia.",
    property: "Immedia",
    instagram: "ariannaizzi",
  },
];

export const featuredTalents = talents.filter((t) => t.featured);

export const getTalent = (slug: string) => talents.find((t) => t.slug === slug);
