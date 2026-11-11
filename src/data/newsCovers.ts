export const newsCovers: Record<string, string> = {
  "leader-della-crescita-2026": "/img/covers/news-leader.jpg",
  "corax-73-persone": "/img/poster.jpg",
  "corax-score-30-secondi": "/img/og-cover.jpg",
  "rossopomodoro-a-ognuno-la-sua": "/img/covers/cooking-hands.jpg",
  "poretcast-30-milioni": "/img/covers/poretcast-02.jpg",
  "la-vela-850-mq": "/img/covers/news-results.jpg",
  "poretcast-google-youtube": "/img/covers/poretcast-01.jpg",
  "tiffany-ooh-milano": "/img/covers/tiffany-event.jpg",
  "immedia-seconda-stagione": "/img/covers/babaco-01.jpg",
  "a-tu-per-tu-samsung-tv-plus": "/img/covers/atupertu-tv.jpg",
  "kick-off-talk-2026": "/img/covers/football-lineup.jpg",
  "theshow-entra-in-corax": "/img/covers/news-theshow.jpg",
  "risparmio-casa-influencer-marketing": "/img/covers/risparmio-01.jpg",
  "impresoft-engage-crm": "/img/covers/news-impresoft.jpg",
  "corax-2024-risultati": "/img/covers/news-results.jpg",
  "climacus-influencer-italia": "/img/covers/news-climacus.jpg",
};

export const newsCover = (slug: string, fallback = "/img/covers/news-leader.jpg") =>
  newsCovers[slug] ?? fallback;

export const newsCoverAlt: Record<string, string> = {
  "leader-della-crescita-2026": "Copertina editoriale Corax: +45% di crescita, Leader della Crescita 2026",
  "corax-73-persone": "Il team Corax al lavoro negli spazi di La Vela a Milano",
  "corax-score-30-secondi": "Corax Score: cinque domande per capire da dove partire",
  "rossopomodoro-a-ognuno-la-sua": "La lavorazione dell'impasto per la campagna Rossopomodoro",
  "poretcast-30-milioni": "Giacomo Poretti durante una puntata del PoretCast",
  "la-vela-850-mq": "La crescita di Corax raccontata nei numeri: La Vela supera i 1.500 mq",
  "poretcast-google-youtube": "Il salotto del PoretCast con Giacomo Poretti",
  "tiffany-ooh-milano": "Un evento Tiffany & Co. con allestimento luminoso",
  "immedia-seconda-stagione": "Giovanni Storti con un cesto di ortaggi per Immedia",
  "a-tu-per-tu-samsung-tv-plus": "L'interfaccia del canale A tu per tu su Samsung TV Plus",
  "kick-off-talk-2026": "La squadra schierata per il format Kick off Talk",
  "theshow-entra-in-corax": "Copertina editoriale Corax: theShow entra nel sistema",
  "risparmio-casa-influencer-marketing": "Un ritratto dal set della campagna Risparmio Casa",
  "impresoft-engage-crm": "Copertina editoriale Corax: il CRM diventa motore",
  "corax-2024-risultati": "Copertina editoriale Corax: +130% di ricavi nel 2024",
  "climacus-influencer-italia": "Copertina editoriale Corax: la holding raddoppia con Influencer Italia",
};
