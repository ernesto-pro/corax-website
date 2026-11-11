export const newsCovers: Record<string, string> = {
  "leader-della-crescita-2026": "/img/covers/leader.jpg",
  "corax-73-persone": "/img/covers/persone.jpg",
  "corax-score-30-secondi": "/img/covers/corax-score.jpg",
  "rossopomodoro-a-ognuno-la-sua": "/img/covers/cooking-hands.jpg",
  "poretcast-30-milioni": "/img/covers/poretcast-02.jpg",
  "la-vela-850-mq": "/img/covers/la-vela.jpg",
  "poretcast-google-youtube": "/img/covers/poretcast-01.jpg",
  "tiffany-ooh-milano": "/img/covers/tiffany.jpg",
  "immedia-seconda-stagione": "/img/covers/immedia.jpg",
  "a-tu-per-tu-samsung-tv-plus": "/img/covers/atupertu-tv.jpg",
  "kick-off-talk-2026": "/img/covers/kickoff.jpg",
  "theshow-entra-in-corax": "/img/covers/news-theshow.jpg",
  "risparmio-casa-influencer-marketing": "/img/covers/risparmio-01.jpg",
  "impresoft-engage-crm": "/img/covers/news-impresoft.jpg",
  "corax-2024-risultati": "/img/covers/news-results.jpg",
  "climacus-influencer-italia": "/img/covers/news-climacus.jpg",
};

export const newsCover = (slug: string, fallback = "/img/covers/news-leader.jpg") =>
  newsCovers[slug] ?? fallback;

export const newsCoverAlt: Record<string, string> = {
  "leader-della-crescita-2026": "Quattro persone del team Corax in posa su fondo scuro",
  "corax-73-persone": "Sei ritratti delle persone che lavorano in Corax",
  "corax-score-30-secondi": "L'interfaccia di Corax Score con il test in cinque domande",
  "rossopomodoro-a-ognuno-la-sua": "La lavorazione dell'impasto per la campagna Rossopomodoro",
  "poretcast-30-milioni": "Il set del PoretCast con l'insegna al neon",
  "la-vela-850-mq": "Gli interni di La Vela, la casa Corax a Milano",
  "poretcast-google-youtube": "Il salotto del PoretCast con Giacomo Poretti",
  "tiffany-ooh-milano": "La tavola apparecchiata di un evento Tiffany & Co.",
  "immedia-seconda-stagione": "Giovanni Storti a braccia aperte tra gli alberi in fiore per Immedia",
  "a-tu-per-tu-samsung-tv-plus": "L'interfaccia del canale A tu per tu su Samsung TV Plus",
  "kick-off-talk-2026": "Due ospiti al tavolo di Kick off Talk",
  "theshow-entra-in-corax": "Copertina editoriale Corax: theShow entra nel sistema",
  "risparmio-casa-influencer-marketing": "Un ritratto dal set della campagna Risparmio Casa",
  "impresoft-engage-crm": "Copertina editoriale Corax: il CRM diventa motore",
  "corax-2024-risultati": "Copertina editoriale Corax: +130% di ricavi nel 2024",
  "climacus-influencer-italia": "Copertina editoriale Corax: la holding raddoppia con Influencer Italia",
};

export const newsCoverAltEn: Record<string, string> = {
  "leader-della-crescita-2026": "Four members of the Corax team posing against a dark background",
  "corax-73-persone": "Six portraits of the people working at Corax",
  "corax-score-30-secondi": "The Corax Score interface with the five-question test",
  "rossopomodoro-a-ognuno-la-sua": "Hands kneading dough for the Rossopomodoro campaign",
  "poretcast-30-milioni": "The PoretCast set with its neon sign",
  "la-vela-850-mq": "The interiors of La Vela, the Corax house in Milan",
  "poretcast-google-youtube": "The PoretCast living room with Giacomo Poretti",
  "tiffany-ooh-milano": "A set table at a Tiffany & Co. event",
  "immedia-seconda-stagione": "Giovanni Storti with open arms among blossoming trees for Immedia",
  "a-tu-per-tu-samsung-tv-plus": "The A tu per tu channel on Samsung TV Plus",
  "kick-off-talk-2026": "Two guests at the Kick off Talk table",
  "theshow-entra-in-corax": "Corax editorial cover: theShow joins the system",
  "risparmio-casa-influencer-marketing": "A portrait from the Risparmio Casa campaign set",
  "impresoft-engage-crm": "Corax editorial cover: the CRM becomes the engine",
  "corax-2024-risultati": "Corax editorial cover: +130% revenue in 2024",
  "climacus-influencer-italia": "Corax editorial cover: the holding doubles with Influencer Italia",
};

/** Alt text for a news cover in the active language, falling back to the title. */
export const newsCoverAltFor = (
  slug: string,
  lang: "it" | "en",
  fallback: string,
): string => (lang === "en" ? newsCoverAltEn[slug] : newsCoverAlt[slug]) ?? fallback;
