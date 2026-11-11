import type { InitiativeTr, PostTr, StoryTr } from "./types";

/** English translations keyed by story id. Slide arrays follow the Italian order. */
export const storiesTr: Record<string, StoryTr> = {
  "corax-score": {
    label: "Corax Score",
    coverAlt: "Corax Score: the growth test in thirty seconds",
    slides: [
      {
        alt: "Corax Score: the growth test in thirty seconds",
        kicker: "New tool",
        title: "How ready is your growth?",
        text: "Five questions. Thirty seconds. A score from 25 to 100 and the unit to start from.",
        cta: { label: "Take the test" },
      },
      {
        alt: "The Corax Score result with the recommended unit",
        kicker: "Why take it",
        title: "Not a grade. A direction.",
        text: "No email required. At the end you have a brief ready to bring to us.",
        cta: { label: "Discover the Corax Score" },
      },
    ],
  },
  rossopomodoro: {
    label: "Rossopomodoro",
    coverAlt: "A pizzaiolo's hands at work for the Rossopomodoro campaign",
    slides: [
      {
        alt: "Working the dough for the Rossopomodoro campaign",
        kicker: "Campaign · Food",
        title: "To each their own.",
        text: "Neapolitan, crispy or pan: pizza as a personal choice, not a category.",
        cta: { label: "See the case" },
      },
      {
        alt: "The finished dish from the Rossopomodoro campaign",
        kicker: "On air",
        title: "From the oven to the feed.",
        text: "A creative system for every touchpoint, with media planning by Digital Angels.",
        cta: { label: "Read the news" },
      },
    ],
  },
  poretcast: {
    label: "PoretCast",
    coverAlt: "The PoretCast living room with Giacomo Poretti",
    slides: [
      {
        alt: "The PoretCast set",
        kicker: "Property · 30M+",
        title: "Italy's biggest living room.",
        text: "PoretCast passes 30 million views on YouTube. The conversation is the format.",
        cta: { label: "Open PoretCast" },
      },
      {
        alt: "Giacomo Poretti during an episode of PoretCast",
        kicker: "The formula",
        title: "No script. Just the right guests.",
        text: "Giacomo Poretti turns YouTube into a living room open to the world. Google Italy told it like this.",
        cta: { label: "Read the feature" },
      },
    ],
  },
  "la-vela": {
    label: "La Vela",
    coverAlt: "Corax's growth told in numbers",
    slides: [
      {
        alt: "The numbers behind Corax's growth",
        kicker: "Company · Milan",
        title: "1,500 sqm of system.",
        text: "La Vela grows: 850 more sqm across offices and production studios. Space is part of the story.",
        cta: { label: "Step into La Vela" },
      },
      {
        alt: "Corax in the 2026 Growth Leaders",
        kicker: "2026",
        title: "20 new formats.",
        text: "Production, distribution and a headcount that doubles. The system expands, it doesn't dilute.",
        cta: { label: "Discover the system" },
      },
    ],
  },
  tiffany: {
    label: "Tiffany & Co.",
    coverAlt: "A Tiffany & Co. event with luminous staging",
    slides: [
      {
        alt: "The Tiffany & Co. event produced by Corax",
        kicker: "Campaign · OOH",
        title: "Tiffany & Co. takes the street.",
        text: "The maison meets the public in the city's spaces, not just in the window.",
        cta: { label: "See the case" },
      },
      {
        alt: "The Tiffany & Co. collection on display",
        kicker: "The detail",
        title: "Luxury is attention.",
        text: "An out-of-home project built to stop the gaze and stay in memory.",
        cta: { label: "All projects" },
      },
    ],
  },
  immedia: {
    label: "Immedia",
    coverAlt: "Giovanni Storti with a basket of vegetables for Immedia",
    slides: [
      {
        alt: "Giovanni Storti in the green for Immedia",
        kicker: "Property · Media",
        title: "Immedia, season two.",
        text: "Giovanni Storti and Arianna Izzi take the format beyond the line between content and conversation.",
        cta: { label: "Open Immedia" },
      },
      {
        alt: "The kitchen as a story about sustainability",
        kicker: "The method",
        title: "One format, a thousand cuts.",
        text: "Every episode is an ecosystem: video, clips, podcast and content for every platform.",
        cta: { label: "Discover the media house" },
      },
    ],
  },
  "a-tu-per-tu": {
    label: "A tu per tu",
    coverAlt: "A selection of programmes from the A tu per tu channel",
    slides: [
      {
        alt: "The programmes on the A tu per tu channel",
        kicker: "Property · FAST",
        title: "Italy's first FAST vodcast channel.",
        text: "With The Channel Store and Samsung TV Plus, Corax formats land on Connected TV.",
        cta: { label: "Open A tu per tu" },
      },
      {
        alt: "The A tu per tu channel interface on Samsung TV Plus",
        kicker: "Why it matters",
        title: "TV isn't over. It changed.",
        text: "A new touchpoint for brands, inside a growing environment and without noise.",
        cta: { label: "Read the news" },
      },
    ],
  },
  "kick-off": {
    label: "Kick off Talk",
    coverAlt: "The line-up for the Kick off Talk format",
    slides: [
      {
        alt: "The pitch and the Kick off Talk team",
        kicker: "Format · Sport",
        title: "Football off the pitch.",
        text: "Voices, stories and points of view the ninety minutes can't hold.",
        cta: { label: "Watch the format" },
      },
      {
        alt: "Two guests on Kick off Talk",
        kicker: "Sunday",
        title: "Not just highlights.",
        text: "A format that turns the match into conversation and the conversation into community.",
        cta: { label: "All formats" },
      },
    ],
  },
  theshow: {
    label: "theShow",
    coverAlt: "Corax editorial cover: theShow joins the system",
    slides: [
      {
        alt: "theShow joins the Corax system",
        kicker: "Talent · Entertainment",
        title: "theShow joins the system.",
        text: "Thirteen years of social experiments, candid camera and formats. Now with Corax: business, distribution, new projects.",
        cta: { label: "Read the news" },
      },
      {
        alt: "Behind the scenes at theShow",
        kicker: "What changes",
        title: "The speed of vertical. The value of horizontal.",
        text: "A bridge between digital entertainment and production. Without losing identity.",
        cta: { label: "The roster" },
      },
    ],
  },
  "risparmio-casa": {
    label: "Risparmio Casa",
    coverAlt: "A portrait from the set of the Risparmio Casa campaign",
    slides: [
      {
        alt: "The set of the Risparmio Casa campaign",
        kicker: "Campaign · Retail",
        title: "Risparmio Casa, all year round.",
        text: "Influencer marketing on Instagram and TikTok with a calendar that follows retail seasonality.",
        cta: { label: "See the case" },
      },
      {
        alt: "Creator content for Risparmio Casa",
        kicker: "The relationship",
        title: "Not a campaign. A presence.",
        text: "Creators, production and measurement in a single annual brief.",
        cta: { label: "Read the news" },
      },
    ],
  },
  citroen: {
    label: "Citroën × Frank",
    coverAlt: "Frank Gramuglia in a Citroën Ami around the city",
    slides: [
      {
        alt: "Frank Gramuglia driving the Citroën Ami",
        kicker: "Case · Mobility",
        title: "Frank × Citroën Ami.",
        text: "A trip through the city with Frank Gramuglia: irony, mobility and a brand inside the story.",
        cta: { label: "See the case" },
      },
      {
        alt: "A moment from the trip with Frank Gramuglia",
        kicker: "Talent is the media",
        title: "Not interruptions. Content.",
        text: "The format comes from the creator's personality, not from the media plan.",
        cta: { label: "Discover the roster" },
      },
    ],
  },
  leader: {
    label: "Leader 2026",
    coverAlt: "Corax in Il Sole 24 Ore's 2026 Growth Leaders",
    slides: [
      {
        alt: "Corax in the 2026 Growth Leaders",
        kicker: "Award · Il Sole 24 Ore",
        title: "Growth Leaders 2026.",
        text: "8 million in revenue for 2025, +45% on 2024. Corax joins the ranking of Italy's fastest-growing companies.",
        cta: { label: "Read the recognition" },
      },
      {
        alt: "The numbers behind Corax's growth",
        kicker: "The next step",
        title: "12 million. 20 formats. 1,500 sqm.",
        text: "In 2026 the system expands. The rest we build together.",
        cta: { label: "Let's talk" },
      },
    ],
  },
};

/** English translations keyed by post id (editorial posts and any generated feed posts). */
export const postsTr: Record<string, PostTr> = {
  "corax-score": {
    alt: "Corax Score: five questions to see where to start",
    caption:
      "5 questions. 30 seconds. A score from 25 to 100 and the unit to start from. Corax Score is live. → corax.it/#growth-scan",
  },
  rossopomodoro: {
    alt: "Working the dough for Rossopomodoro",
    caption:
      "To each their own. Neapolitan, crispy or pan: pizza is a personal choice. New campaign for Rossopomodoro, on air from 1 October.",
  },
  "poretcast-30m": {
    alt: "The PoretCast living room with Giacomo Poretti",
    caption:
      "30 million views and a living room that keeps filling up. PoretCast is one of the most recognisable properties in the Corax system.",
  },
  "la-vela": {
    alt: "Corax's growth told in numbers",
    caption:
      "1,500 sqm in Milan, 850 more for offices and production. La Vela grows with the system.",
  },
  tiffany: {
    alt: "A Tiffany & Co. event with luminous staging",
    caption:
      "Tiffany & Co. meets the city. An out-of-home project that turns urban space into a brand moment.",
  },
  immedia: {
    alt: "Giovanni Storti with a basket of vegetables for Immedia",
    caption:
      "Immedia, season two. Giovanni Storti and Arianna Izzi are back with new guests and new formats.",
  },
  "a-tu-per-tu": {
    alt: "The programmes on the A tu per tu channel",
    caption:
      "The first Italian FAST channel dedicated to vodcasts, on Samsung TV Plus. A tu per tu, with The Channel Store.",
  },
  "kick-off": {
    alt: "The line-up for the Kick off Talk format",
    caption:
      "Football that tells its story off the pitch. Kick off Talk, a Corax format.",
  },
  theshow: {
    alt: "Editorial cover: theShow joins the Corax system",
    caption:
      "theShow joins the Corax system. Business, distribution and new formats for one of the historic names of digital entertainment.",
  },
  "risparmio-casa": {
    alt: "Creator content for Risparmio Casa",
    caption:
      "Influencer marketing on Instagram and TikTok, all year round. Risparmio Casa chooses Corax.",
  },
  citroen: {
    alt: "Frank Gramuglia on the road with Citroën Ami",
    caption: "Frank Gramuglia × Citroën Ami. When talent becomes the media.",
  },
  leader: {
    alt: "Corax in Il Sole 24 Ore's 2026 Growth Leaders",
    caption:
      "Growth Leaders 2026. 8 million in revenue, +45%. Il Sole 24 Ore tells our growth.",
  },
};

/** Same order as the sorted `initiatives` array (date desc). */
export const initiativesTr: InitiativeTr[] = [
  {
    title: "73 people, and still room",
    summary: "New positions open in Milan across strategy, production and talent.",
  },
  {
    title: "Corax Score is born",
    summary: "Five questions to see where to start. Instant result, no commitment.",
  },
  {
    title: "Rossopomodoro — To each their own",
    summary: "Three styles of pizza, one concept. On air from 1 October with Digital Angels.",
  },
  {
    title: "PoretCast passes 30 million views",
    summary: "Giacomo Poretti's living room confirms itself as one of Italy's most-watched formats.",
  },
  {
    title: "La Vela grows by 850 sqm",
    summary: "Offices and production studios: the system passes 1,500 sqm in Milan.",
  },
  {
    title: "Google Italy tells the PoretCast story",
    summary: "YouTube as a living room open to the world, in the words of Giacomo Poretti and Chiara Brunelli.",
  },
  {
    title: "Tiffany & Co. — OOH events",
    summary: "Video production for the maison's events and out-of-home installations.",
  },
  {
    title: "Immedia, season two",
    summary: "New guests and new formats for the editorial platform on sustainability.",
  },
  {
    title: "A tu per tu, Italy's first FAST vodcast channel",
    summary: "With The Channel Store on Samsung TV Plus: Corax formats land on Connected TV.",
  },
  {
    title: "Kick off Talk",
    summary: "Football told off the pitch, through stories and points of view.",
  },
  {
    title: "theShow joins the Corax system",
    summary: "Business, distribution and new formats for one of the historic names of digital.",
  },
  {
    title: "Risparmio Casa hands influencer marketing to Corax",
    summary: "Year-round management of creator activity on Instagram and TikTok.",
  },
  {
    title: "Frank Gramuglia × Citroën Ami",
    summary: "A trip through the city where talent becomes the media.",
  },
  {
    title: "Giacomo Poretti Honorary President",
    summary: "A new role to support the growth of the system and its properties.",
  },
  {
    title: "Growth Leaders 2026",
    summary: "Il Sole 24 Ore ranks Corax among Italy's fastest-growing companies.",
  },
  {
    title: "Pierfrancesco Petrosillo Chief Agency Officer",
    summary: "The Agency unit strengthens with new leadership.",
  },
  {
    title: "Impresoft Engage, the CRM becomes the engine",
    summary: "Sales, projects, talents and clients in a single operating system.",
  },
];
