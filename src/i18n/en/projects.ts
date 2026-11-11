import type { ProjectTr } from "./types";

/** English translations keyed by project slug. */
export const projectsTr: Record<string, ProjectTr> = {
  poretcast: {
    title: "PoretCast",
    year: "2022 — present",
    categories: ["Podcast & Format", "Produzione", "Branded Entertainment"],
    excerpt:
      "Giacomo Poretti's video podcast that turned YouTube into a living room: guests, music and conversations with no script.",
    coverAlt: "The PoretCast set with its neon sign",
    gallery: [
      { src: "/img/covers/poretcast-01.jpg", alt: "The PoretCast set" },
      { src: "/img/covers/poretcast-02.jpg", alt: "Giacomo Poretti and his guest on the PoretCast set" },
    ],
    tags: ["Podcast", "YouTube", "Format", "Production"],
    intro:
      "PoretCast is Giacomo Poretti's video podcast, produced by Corax: a long, slow, deeply human format that seats musicians, actors, writers and scientists on the same sofa. A proprietary editorial product that lives on YouTube, travels across audio platforms and keeps social conversation going for weeks.",
    challenge:
      "Building a recognisable proprietary format in a market saturated with podcasts, while preserving Giacomo Poretti's authenticity and turning every episode into an editorial event that can travel across platforms.",
    approach:
      "A physical set and a recognisable directorial style, light scripting that leaves room for improvisation, a sustainable release calendar and a vertical clip system designed to multiply the reach of every conversation. Corax handles ideation, production, post-production, distribution and commercial exploitation.",
    deliverables: [
      "Visual identity and title sequence",
      "End-to-end production and multi-camera direction",
      "Post-production and sound design",
      "YouTube and audio distribution strategy",
      "Vertical clips and social editorial plan",
      "Brand partnerships and special operations",
    ],
    results: [
      { value: "30M+", label: "views on YouTube" },
      { value: "3", label: "seasons produced" },
      { value: "+20%", label: "view growth in 2024" },
      { value: "TOP", label: "podcast in Italy" },
    ],
    quote: {
      text: "PoretCast is still the most listened-to podcast in Italy, and I owe that above all to all of you.",
      author: "Giacomo Poretti",
      role: "Honorary President, Corax",
    },
  },
  immedia: {
    title: "Immedia",
    year: "2024 — present",
    categories: ["Podcast & Format", "Produzione", "Social & Performance"],
    excerpt:
      "The multichannel editorial platform devoted to sustainability, born with Giovanni Storti and science communicator Arianna Izzi.",
    coverAlt: "Giovanni Storti with open arms among blossoming trees for Immedia",
    gallery: [
      { src: "/img/covers/immedia.jpg", alt: "Giovanni Storti in the greenery for Immedia" },
      { src: "/img/covers/giova-nature.jpg", alt: "Giovanni Storti in his garden" },
    ],
    tags: ["Sustainability", "Publishing", "Social", "Format"],
    intro:
      "Immedia is a multichannel editorial platform that talks about sustainability without rhetoric: environment, food, cities, work and everyday choices. A Corax project with Giovanni Storti and science communicator Arianna Izzi, built to live on Instagram, TikTok and YouTube, and to meet communities wherever they get their information.",
    challenge:
      "Making sustainability a popular, shareable topic without technical jargon or a lecturing tone, and without losing scientific rigour.",
    approach:
      "A hybrid language between entertainment and science communication, a recognisable visual style and a system of serial formats. Every piece starts from a scientific insight, is translated into a story and distributed with an editorial plan native to each platform.",
    deliverables: [
      "Positioning and editorial identity",
      "Serial formats for social and video",
      "Multi-platform content production",
      "Creative direction and art direction",
      "Distribution and community plan",
      "Partnerships with brands and institutions",
    ],
    results: [
      { value: "4+", label: "channels covered" },
      { value: "100%", label: "original content" },
      { value: "ONGOING", label: "editorial project" },
      { value: "1", label: "reference community" },
    ],
    quote: {
      text: "Sustainability is a conversation, not a lecture. Our job is to make it desirable.",
      author: "Corax Media House",
      role: "Editorial direction",
    },
  },
  "a-tu-per-tu": {
    title: "A tu per tu",
    year: "2026",
    categories: ["Podcast & Format", "Produzione"],
    excerpt:
      "The first Italian FAST channel dedicated to vodcasts and conversational formats, available on Samsung TV Plus.",
    coverAlt: "A selection of programmes from the A tu per tu channel",
    gallery: [
      { src: "/img/covers/atupertu-tv.jpg", alt: "A tu per tu on Samsung TV Plus" },
      { src: "/img/covers/poretcast-01.jpg", alt: "Content from the FAST channel" },
    ],
    tags: ["FAST", "Connected TV", "Vodcast", "Distribution"],
    intro:
      "A tu per tu is the first Italian FAST (Free Ad-Supported Streaming TV) channel dedicated to vodcasts, created by Corax with The Channel Store and distributed on Samsung TV Plus. A bridge between the grammar of digital and the living room of Connected TV: content born for the web that becomes a schedule.",
    challenge:
      "Bringing a language native to social platforms into a television ecosystem, while keeping recognisability, pace and viewing quality on a big screen.",
    approach:
      "Selecting and adapting Corax formats, building the schedule, TV graphics and distribution operations. An editorial model that reuses content intelligently, generating new audiences and new advertising opportunities.",
    deliverables: [
      "Editorial design of the channel",
      "Format selection and adaptation",
      "Scheduling and programming",
      "TV graphics and continuity",
      "Distribution on Samsung TV Plus",
      "Commercial development of the channel",
    ],
    results: [
      { value: "1st", label: "FAST vodcast channel in Italy" },
      { value: "24/7", label: "schedule" },
      { value: "CTV", label: "new touchpoint" },
      { value: "2026", label: "launch" },
    ],
  },
  rossopomodoro: {
    title: "A ognuno la sua",
    year: "2026",
    categories: ["Branded Entertainment", "Social & Performance", "Produzione"],
    excerpt:
      "Napoletana, croccante and padellino: three pizza styles become a single creative concept for Rossopomodoro's return to advertising.",
    coverAlt: "The hands of a pizzaiolo at work",
    gallery: [
      { src: "/img/covers/cooking-hands.jpg", alt: "Working the dough" },
      { src: "/img/covers/plate-pasta.jpg", alt: "The finished dish" },
    ],
    tags: ["Campaign", "Food", "YouTube", "Programmatic"],
    intro:
      "Pizza is culture and sharing, but also a personal choice. That insight is the starting point for “A ognuno la sua”, the campaign with which Rossopomodoro returns to advertising and tells the variety of its offer through the codes of the pizzeria experience: the pizzaioli, the doughs, the oven, the atmosphere.",
    challenge:
      "Moving beyond product storytelling to find an idea that highlights the differences between the three offers without flattening them into a single promise.",
    approach:
      "A multi-touchpoint creative system built by Corax, with a Hero format for YouTube, social-first content for Instagram Reels, activity on Locala and Demand Gen, programmatic and presence on Dailymotion. Media planning by Digital Angels.",
    deliverables: [
      "Concept and creative system",
      "Video and photo production",
      "Hero format for YouTube",
      "Social-first content for Reels",
      "Adaptations for programmatic and display",
      "Coordination with media planning",
    ],
    results: [
      { value: "3", label: "pizza styles, one concept" },
      { value: "360°", label: "communication system" },
      { value: "ON AIR", label: "from 1 October 2026" },
      { value: "1", label: "one idea, many touchpoints" },
    ],
  },
  "risparmio-casa": {
    title: "Risparmio Casa",
    year: "2026 — present",
    categories: ["Influencer Marketing", "Social & Performance"],
    excerpt:
      "The year-round management of influencer marketing on the brand's Instagram and TikTok profiles, building a continuous, recognisable presence.",
    coverAlt: "An interior portrait with a cinematic feel",
    gallery: [
      { src: "/img/covers/risparmio-01.jpg", alt: "Interior portrait" },
      { src: "/img/covers/risparmio-02.jpg", alt: "A moment from the story" },
    ],
    tags: ["Influencer Marketing", "Instagram", "TikTok", "Retail"],
    intro:
      "After a consultation, Risparmio Casa chose Corax as its partner for the year-round management of influencer marketing activities for the brand's official Instagram and TikTok profiles. A brief that combines creator selection, production and measurement, with the goal of making the social presence more coherent and consistent.",
    challenge:
      "Making influencer marketing an always-on flow rather than a series of isolated operations, and keeping coherence across different communities and a retail brand with strong recognition.",
    approach:
      "A continuous operating model: creator mapping, shared briefs, coordinated production, publication management and results analysis. The strategy works on awareness, engagement and community relationships, with a calendar that follows retail seasonality.",
    deliverables: [
      "Annual influencer strategy",
      "Creator scouting and selection",
      "Campaign management and coordination",
      "Instagram and TikTok content production",
      "Media and community management",
      "Reporting and optimisation",
    ],
    results: [
      { value: "2", label: "platforms covered" },
      { value: "ANNUAL", label: "working horizon" },
      { value: "1", label: "single direction" },
      { value: "ONGOING", label: "active programme" },
    ],
  },
  "frank-gramuglia-citroen": {
    title: "Frank Gramuglia × Citroën",
    year: "2024",
    categories: ["Influencer Marketing", "Branded Entertainment", "Produzione"],
    excerpt:
      "A journey aboard Ami with Frank Gramuglia: irony, the city and urban mobility in a format people talked about.",
    coverAlt: "Frank Gramuglia aboard Ami on the streets of Milan",
    gallery: [
      { src: "/img/covers/citroen-01.jpg", alt: "Frank Gramuglia on the streets of Milan" },
      { src: "/img/covers/citroen-02.jpg", alt: "The interior of Ami" },
    ],
    tags: ["Talent", "Automotive", "Format", "Social"],
    intro:
      "Frank Gramuglia meets Citroën Ami and the city becomes a set. An on-the-road format where the creator's irony merges with the brand's codes, telling urban mobility from the point of view of those who live it every day.",
    challenge:
      "Telling the story of a product with a very strong personality without turning the content into an ad, while keeping the talent's irreverent tone and the brand's recognisability.",
    approach:
      "An editorial idea built around the talent, lean production and native distribution. Corax handled concept, production and partnership management, working closely with the brand team.",
    deliverables: [
      "Creative concept and treatment",
      "On-location video production",
      "Post-production and adaptations",
      "Social distribution",
      "Partnership management",
    ],
    results: [
      { value: "1", label: "proprietary format" },
      { value: "CITY", label: "the city is the set" },
      { value: "NATIVE", label: "social language" },
      { value: "2024", label: "launch year" },
    ],
  },
  "giovanni-storti-babaco-market": {
    title: "Giovanni Storti × Babaco Market",
    year: "2024",
    categories: ["Branded Entertainment", "Influencer Marketing", "Social & Performance"],
    excerpt:
      "Sustainability and irony: Giovanni Storti talks about the shopping that saves the planet in the language that belongs to him.",
    coverAlt: "Giovanni Storti with the Babaco Market basket of produce",
    gallery: [
      { src: "/img/covers/babaco-02.jpg", alt: "Giovanni Storti with the Babaco basket" },
      { src: "/img/covers/cooking-hands.jpg", alt: "Food as an everyday gesture" },
    ],
    tags: ["Sustainability", "Food", "Talent", "Campaign"],
    intro:
      "Babaco Market chose Giovanni Storti to tell the story of a different kind of shopping, made of good produce and conscious choices. A project where comedy becomes a tool for talking about waste, seasonality and access to food.",
    challenge:
      "Communicating a complex topic like food sustainability to a broad audience without slipping into moralising and without losing the talent's tone.",
    approach:
      "Content written for Giovanni Storti's voice, light production and coordinated distribution across the talent's and the brand's channels. The result is a story that entertains and, at the same time, explains.",
    deliverables: [
      "Concept and writing",
      "Content production",
      "Talent and brand coordination",
      "Distribution plan",
      "Platform adaptations",
    ],
    results: [
      { value: "1", label: "recognisable voice" },
      { value: "FOOD", label: "core theme" },
      { value: "GREEN", label: "positioning" },
      { value: "2024", label: "year" },
    ],
  },
  "giovanni-storti-treedom": {
    title: "Giovanni Storti × Treedom",
    year: "2023",
    categories: ["Branded Entertainment", "Influencer Marketing"],
    excerpt:
      "One tree, one story: the campaign that brought Giovanni Storti's voice into the reforestation narrative.",
    coverAlt: "Giovanni Storti among the olive trees for the Treedom campaign",
    gallery: [
      { src: "/img/covers/treedom.jpg", alt: "Giovanni Storti among the olive trees" },
      { src: "/img/covers/giova-nature.jpg", alt: "The greenery of Giovanni Storti's garden" },
    ],
    tags: ["Green", "Talent", "Purpose", "Social"],
    intro:
      "Treedom plants trees and tells stories. With Giovanni Storti, Corax built a communication project that combines the environmental theme with a light, recognisable tone, turning a simple gesture into a shareable story.",
    challenge:
      "Giving new depth to a topic that has already been told many times, by finding a personal rather than generic point of view.",
    approach:
      "A concept based on the talent's authenticity, vertical content and coordinated distribution. The story starts with the person and arrives at the project, without preaching.",
    deliverables: [
      "Editorial concept",
      "Content production",
      "Social distribution",
      "Partnership management",
    ],
    results: [
      { value: "GREEN", label: "cause-related" },
      { value: "1", label: "authentic voice" },
      { value: "SOCIAL", label: "native format" },
      { value: "2023", label: "year" },
    ],
  },
  "giova-loves-nature": {
    title: "Giova loves nature",
    year: "2023 — present",
    categories: ["Podcast & Format", "Produzione", "Social & Performance"],
    excerpt:
      "Giovanni Storti's green format: nature, curiosity and science communication with the tone of someone who doesn't take himself too seriously.",
    coverAlt: "Giovanni Storti in the greenery for the Giova loves nature format",
    gallery: [
      { src: "/img/covers/giova-nature.jpg", alt: "Giovanni Storti in his garden" },
      { src: "/img/covers/immedia.jpg", alt: "Giovanni Storti with open arms among the trees" },
    ],
    tags: ["Green", "Format", "Science communication", "Talent"],
    intro:
      "Giova loves nature is the format in which Giovanni Storti explores the relationship between people and the environment, between scientific curiosities and small daily obsessions. An editorial project that makes nature accessible and surprising.",
    challenge:
      "Building a recognisable serial format that combines science communication and entertainment without losing the talent's expressive freedom.",
    approach:
      "Short episodes, an immediate visual language and writing that starts from curiosity. Corax handles ideation, production and distribution, leaving the talent room to be himself.",
    deliverables: [
      "Format ideation",
      "Production and post-production",
      "Social editorial plan",
      "Multi-platform distribution",
    ],
    results: [
      { value: "SERIAL", label: "format" },
      { value: "GREEN", label: "theme" },
      { value: "MULTI", label: "platform" },
      { value: "ONGOING", label: "project" },
    ],
  },
  "playstation-pirlasv": {
    title: "PlayStation × PirlasV",
    year: "2023",
    categories: ["Influencer Marketing", "Branded Entertainment", "Produzione"],
    excerpt:
      "Gaming, football and irony: PirlasV brings PlayStation into his community with a piece of content built to feel real.",
    coverAlt: "The two faces of PirlasV in a portrait",
    gallery: [
      { src: "/img/covers/pirlasv.jpg", alt: "PirlasV" },
      { src: "/img/covers/football-ball.jpg", alt: "A football at the centre of the story" },
    ],
    tags: ["Gaming", "Sport", "Talent", "Creator"],
    intro:
      "PlayStation and PirlasV together for a project where gaming meets football and the creator's irony. Content built around the community, respecting the platform's language and the talent's personality.",
    challenge:
      "Integrating a global brand into native content without betraying the creator's tone and without losing recognisability.",
    approach:
      "A shared brief, controlled creative freedom and production designed for social formats. Corax managed the relationship between brand and talent, from concept to delivery.",
    deliverables: [
      "Concept and coordination",
      "Content production",
      "Talent and brand management",
      "Social distribution",
    ],
    results: [
      { value: "GAMING", label: "vertical" },
      { value: "SPORT", label: "passion" },
      { value: "NATIVE", label: "content" },
      { value: "2023", label: "year" },
    ],
  },
  "tiffany-ooh": {
    title: "Tiffany & Co. — OOH Events",
    year: "2023",
    categories: ["Produzione", "Branded Entertainment"],
    excerpt:
      "Video production for Tiffany's events: light, material and detail in the service of a luxury icon.",
    coverAlt: "A set table at a Tiffany & Co. event",
    gallery: [
      { src: "/img/covers/tiffany.jpg", alt: "A Tiffany & Co. event" },
      { src: "/img/covers/tiffany-necklace.jpg", alt: "The collection on display" },
    ],
    tags: ["Luxury", "Events", "Production", "OOH"],
    intro:
      "For Tiffany & Co., Corax handled video production for events and out-of-home installations. Precision work, where every frame has to convey the quality of the materials and the emotion of the experience.",
    challenge:
      "Translating the care and the light of a luxury brand into video, meeting very high production standards and tight deadlines.",
    approach:
      "A dedicated production presence, from event preparation to final delivery, with obsessive attention to detail and visual consistency.",
    deliverables: [
      "Event video production",
      "Filming and photography",
      "Post-production",
      "Adaptations for digital channels",
    ],
    results: [
      { value: "LUXURY", label: "production standard" },
      { value: "OOH", label: "format" },
      { value: "EVENT", label: "context" },
      { value: "2023", label: "year" },
    ],
  },
  "kick-off-talk": {
    title: "Kick off Talk",
    year: "2024",
    categories: ["Podcast & Format", "Produzione", "Branded Entertainment"],
    excerpt:
      "The talk that takes football off the pitch: voices, stories and protagonists from Italy's best-loved game.",
    coverAlt: "Two guests at the Kick off Talk table",
    gallery: [
      { src: "/img/covers/kickoff.jpg", alt: "The Kick off Talk table" },
      { src: "/img/covers/football-team2.jpg", alt: "A Kick off Talk guest in the studio" },
    ],
    tags: ["Sport", "Talk", "Format", "Production"],
    intro:
      "Kick off Talk was created to tell football from a different angle: not just results, but people, stories and popular culture. A conversational format that puts its protagonists in front of the camera without filters.",
    challenge:
      "Standing out in the sports content landscape by building a format that wasn't just another studio talk.",
    approach:
      "A strong visual identity, a recognisable host and lean production able to adapt to different guests and locations. The format lives on YouTube and spins off into clips for social.",
    deliverables: [
      "Ideation and format identity",
      "Multi-camera production",
      "Post-production",
      "Vertical clips",
      "Distribution",
    ],
    results: [
      { value: "SPORT", label: "vertical" },
      { value: "TALK", label: "format" },
      { value: "SOCIAL", label: "distribution" },
      { value: "2024", label: "year" },
    ],
  },
  "vola-a-madrid-nivea": {
    title: "Fly to Madrid with Nivea",
    year: "2023",
    categories: ["Influencer Marketing", "Social & Performance"],
    excerpt:
      "A trip, a community, a prize: the project that turned a contest into a shared story.",
    coverAlt: "The Vola a Madrid with Nivea booklet and the official Real Madrid ball",
    gallery: [
      { src: "/img/covers/nivea.jpg", alt: "The Nivea contest prize" },
      { src: "/img/covers/citroen-01.jpg", alt: "Telling the journey" },
    ],
    tags: ["Beauty", "Contest", "Creator", "Social"],
    intro:
      "Nivea chose Corax for a project that combines product, experience and community: a trip to Madrid that became the prize in a participation mechanic capable of generating conversation and content.",
    challenge:
      "Turning a contest into an editorial experience, preventing the activation from running out of steam once the participation mechanic was over.",
    approach:
      "A story told in episodes, creators involved and light production accompanying every stage of the initiative, from the call to departure.",
    deliverables: [
      "Concept and mechanic",
      "Creator coordination",
      "Content production",
      "Social management",
    ],
    results: [
      { value: "1", label: "prize experience" },
      { value: "SOCIAL", label: "shared story" },
      { value: "BEAUTY", label: "sector" },
      { value: "2023", label: "year" },
    ],
  },
  "frank-gramuglia-brioschi": {
    title: "Frank Gramuglia × Brioschi",
    year: "2024",
    categories: ["Branded Entertainment", "Influencer Marketing", "Produzione"],
    excerpt:
      "A format that turns real estate storytelling into entertainment, through Frank Gramuglia's irreverent eye.",
    coverAlt: "Frank Gramuglia with a Brioschi bottle on the campaign set",
    gallery: [
      { src: "/img/covers/brioschi.jpg", alt: "Frank Gramuglia on the Brioschi set" },
      { src: "/img/covers/citroen-01.jpg", alt: "Frank Gramuglia behind the wheel of a Citroën Ami" },
    ],
    tags: ["Real Estate", "Talent", "Format", "Social"],
    intro:
      "Brioschi and Frank Gramuglia together to talk about space and the city with an unexpected tone. A format that takes the talent into a traditionally serious sector and turns it into pop storytelling.",
    challenge:
      "Making a technical topic like real estate interesting and shareable without distorting it.",
    approach:
      "A concept built on the contrast between the talent's personality and the rigour of the sector, with fast production and native distribution.",
    deliverables: [
      "Concept and writing",
      "Content production",
      "Social distribution",
      "Partnership management",
    ],
    results: [
      { value: "REAL ESTATE", label: "sector" },
      { value: "1", label: "original point of view" },
      { value: "SOCIAL", label: "format" },
      { value: "2024", label: "year" },
    ],
  },
  "il-ristorante-serra": {
    title: "The greenhouse restaurant",
    year: "2023",
    categories: ["Design & Tech", "Produzione", "Social & Performance"],
    excerpt:
      "Identity, website and digital storytelling for a restaurant that lives between nature and design.",
    coverAlt: "Wine being served in a restaurant",
    gallery: [
      { src: "/img/covers/wine-pour.jpg", alt: "Wine service" },
      { src: "/img/covers/cooking-hands.jpg", alt: "The restaurant's kitchen" },
    ],
    tags: ["Design", "Web", "Food", "Branding"],
    intro:
      "An identity and digital presence project for a restaurant whose greenhouse and natural setting are its signature. Corax handled branding, website, content and social strategy, building a coherent ecosystem from the menu to the communication.",
    challenge:
      "Translating the atmosphere of a physical place into digital without losing the sensuality of the experience or the clarity of the information.",
    approach:
      "An organic visual identity, a fast and accessible website, an editorial plan that alternates product and atmosphere. Every touchpoint points to the same imagery.",
    deliverables: [
      "Brand identity",
      "Web design and development",
      "SEO and performance",
      "Content strategy",
      "Video and photo production",
    ],
    results: [
      { value: "360°", label: "ecosystem" },
      { value: "SEO", label: "optimisation" },
      { value: "WEB", label: "design and development" },
      { value: "2023", label: "year" },
    ],
  },
  side: {
    title: "Side",
    year: "2023",
    categories: ["Produzione", "Podcast & Format"],
    excerpt:
      "A video project exploring the hidden side of stories: documentary language, contemporary pace.",
    coverAlt: "An interior portrait with a documentary feel",
    gallery: [
      { src: "/img/covers/side.jpg", alt: "A portrait with a documentary feel" },
      { src: "/img/covers/la-vela.jpg", alt: "An interior at La Vela" },
    ],
    tags: ["Documentary", "Video", "Production", "Storytelling"],
    intro:
      "Side is a documentary storytelling project that explores the less visible side of people and places. A work of direction and editing where the video form supports the depth of the story.",
    challenge:
      "Building an intimate story without rhetoric, with an essential and coherent visual approach.",
    approach:
      "Interviews, field shooting and editing that favours silences and details. A cinematic language applied to a digital project.",
    deliverables: [
      "Direction and cinematography",
      "Field production",
      "Editing and sound design",
      "Colour grading",
    ],
    results: [
      { value: "DOC", label: "language" },
      { value: "CINEMA", label: "aesthetic" },
      { value: "1", label: "one story at a time" },
      { value: "2023", label: "year" },
    ],
  },
  influenceritalia: {
    title: "Influenceritalia",
    year: "2022 — present",
    categories: ["Design & Tech", "Influencer Marketing"],
    excerpt:
      "The platform that connects brands and creators, built to make selection simple and transparent.",
    coverAlt: "The Influenceritalia logo on a pink background",
    gallery: [{ src: "/img/covers/influenceritalia.jpg", alt: "The Influenceritalia logo" }],
    tags: ["Platform", "Creator Economy", "Product", "Tech"],
    intro:
      "Influenceritalia is the proprietary platform at the heart of the Corax system, connecting brands with the creators best suited to their campaigns. A tech product born from the daily experience of the talent agency and the Agency unit.",
    challenge:
      "Reducing the complexity of creator selection without oversimplifying the variables that make a collaboration effective.",
    approach:
      "A product built with the teams who use it every day: structured profiles, smart filters and a simple contact flow. The platform is part of Corax's tech ecosystem, alongside CRM, dashboards and measurement tools.",
    deliverables: [
      "Product design",
      "Full-stack development",
      "Creator database",
      "Dashboard and analytics",
      "Ongoing maintenance",
    ],
    results: [
      { value: "1", label: "proprietary platform" },
      { value: "FULL STACK", label: "development" },
      { value: "MATCH", label: "brands and creators" },
      { value: "ONGOING", label: "product" },
    ],
  },
  "numero-diez": {
    title: "Numero Diez",
    year: "2021 — present",
    categories: ["Design & Tech", "Podcast & Format", "Social & Performance"],
    excerpt:
      "The digital editorial project devoted to football and popular culture, with a proprietary app.",
    coverAlt: "Four footballers in blue shirts at the stadium",
    gallery: [
      { src: "/img/covers/football-lineup.jpg", alt: "Four footballers in blue shirts" },
      { src: "/img/covers/football-ball.jpg", alt: "A signed Champions League ball" },
    ],
    tags: ["Publishing", "Sport", "App", "Community"],
    intro:
      "Numero Diez is the editorial project that tells football as a cultural phenomenon. Corax supported its digital development, including a proprietary iOS and Android app, building an editorial and technological presence at the same time.",
    challenge:
      "Making a strong editorial identity coexist with the needs of a scalable, measurable digital product.",
    approach:
      "A recognisable editorial approach, an app designed for daily use and a social distribution system that feeds the community.",
    deliverables: [
      "Editorial strategy",
      "iOS and Android app",
      "Development and maintenance",
      "Social distribution",
      "Media and partnerships",
    ],
    results: [
      { value: "APP", label: "iOS and Android" },
      { value: "SPORT", label: "vertical" },
      { value: "CULTURE", label: "positioning" },
      { value: "ONGOING", label: "project" },
    ],
  },
  theshow: {
    title: "theShow",
    year: "2025 — present",
    categories: ["Branded Entertainment", "Podcast & Format", "Social & Performance"],
    excerpt:
      "Thirteen years of social experiments become an editorial partner: new phase, new formats, new opportunities.",
    coverAlt: "The vintage television that symbolises the theShow format",
    gallery: [{ src: "/img/covers/theshow.jpg", alt: "theShow's vintage television" }],
    tags: ["Creator", "Entertainment", "Format", "Partnership"],
    intro:
      "After more than thirteen years of social experiments, candid camera stunts and formats that got millions of people talking online, theShow joins the Corax system. A partnership that combines the speed of vertical content with the depth of the horizontal format.",
    challenge:
      "Scaling the commercial collaboration business of a historic editorial project without losing the creative freedom that made it recognisable.",
    approach:
      "A dedicated team on commercial development, distribution and new formats. Corax supports theShow in building a sustainable model that integrates brand partnerships, proprietary content and new platforms.",
    deliverables: [
      "Commercial development",
      "Brand partnerships",
      "New editorial formats",
      "Multi-platform distribution",
      "Production",
    ],
    results: [
      { value: "13+", label: "years of history" },
      { value: "2025", label: "joined the system" },
      { value: "MULTI", label: "platform" },
      { value: "ONGOING", label: "partnership" },
    ],
  },
  "corax-score": {
    title: "Corax Score",
    year: "2026",
    categories: ["Design & Tech", "Social & Performance"],
    excerpt:
      "Five questions, thirty seconds, a score from 25 to 100. The tool that turns a first contact into a brief.",
    coverAlt: "The Corax Score interface with the five-question test",
    gallery: [
      { src: "/img/covers/corax-score.jpg", alt: "The Corax Score test" },
    ],
    results: [
      { value: "5", label: "questions" },
      { value: "25–100", label: "score" },
      { value: "30\"", label: "response time" },
      { value: "4", label: "recommended units" },
    ],
  },
  "la-vela": {
    title: "La Vela",
    year: "2020 — present",
    categories: ["Produzione", "Design & Tech"],
    excerpt:
      "1,500 sqm in Milan between offices and production studios. The space where the Corax system takes shape every day.",
    coverAlt: "The interiors of La Vela, the Corax house in Milan",
    gallery: [
      { src: "/img/covers/la-vela.jpg", alt: "The spaces of La Vela" },
      { src: "/img/covers/poretcast-01.jpg", alt: "One of La Vela's production studios" },
    ],
    tags: ["Headquarters", "Production", "Milan", "Community"],
    intro:
      "La Vela is Corax's home: 1,500 sqm at Viale Bodio 29/37 in Milan, between offices, rooms and production studios. A space designed to bring strategy, creativity, production and talent into the same room, because good ideas are born when people actually meet.",
    challenge:
      "Welcoming rapid growth without losing the identity of the place. In 2025 the system added 850 sqm: new studios and new spaces for a team that reached 73 people.",
    approach:
      "We treated the space as part of the story, not as an address on paper. La Vela is a set, an office and a meeting place: it hosts productions, events, recordings and the daily work of the four units.",
    deliverables: [
      "Space and studio design",
      "Set-ups for productions and events",
      "Visual identity of the environments",
      "Photo and video storytelling",
      "Instagram and LinkedIn content",
      "Open days and community meetups",
    ],
    results: [
      { value: "1,500+", label: "sqm in Milan" },
      { value: "850", label: "sqm added in 2025" },
      { value: "73", label: "people" },
      { value: "2020", label: "founding year" },
    ],
  },
  "poretcast-google": {
    title: "PoretCast × Google",
    year: "2026",
    categories: ["Podcast & Format", "Produzione"],
    excerpt:
      "Google Italy presents PoretCast as a YouTube case study: a living room that has passed 30 million views.",
    coverAlt: "Giacomo Poretti on the PoretCast set, as told by Google Italy",
    gallery: [
      { src: "/img/covers/poretcast-02.jpg", alt: "Giacomo Poretti during a PoretCast episode" },
      { src: "/img/covers/poretcast-01.jpg", alt: "The PoretCast set" },
    ],
    tags: ["YouTube", "Google", "Case study", "Format"],
    intro:
      "When Google Italy decided to present YouTube as a platform for conversation, it chose PoretCast. Giacomo Poretti's format became an editorial case study: a long, slow and human living room that brings musicians, actors, writers and scientists onto the sofa.",
    challenge:
      "Explaining a format built to last over time rather than chase the algorithm. The story had to show the method — the right guests, no script, freedom of conversation — without reducing it to a number.",
    approach:
      "Corax supported Google Italy in building the case study, providing materials, data and the voices of its protagonists. The result is a story that holds together platform, production and audience.",
    deliverables: [
      "Case study for Google Italy",
      "Video and photographic materials",
      "Format data and results",
      "Editorial coordination",
      "Distribution of the story",
      "Supporting social content",
    ],
    results: [
      { value: "30M+", label: "views on YouTube" },
      { value: "1", label: "Google case study" },
      { value: "TOP", label: "podcast in Italy" },
      { value: "ONGOING", label: "production" },
    ],
    quote: {
      text: "YouTube is a living room open to the world. PoretCast proved it before it became a format.",
      author: "Corax Media House",
      role: "Editorial direction",
    },
  },
  "persone-corax": {
    title: "73 people, and still room",
    year: "2020 — present",
    categories: ["Social & Performance", "Produzione"],
    excerpt:
      "The story of those who build the system: strategy, production, talent and tech in the same room.",
    coverAlt: "Six portraits of the people working at Corax",
    gallery: [
      { src: "/img/covers/persone.jpg", alt: "The people of the Corax team" },
      { src: "/img/covers/la-vela.jpg", alt: "The spaces of La Vela" },
    ],
    tags: ["Employer branding", "People", "Culture", "Milan"],
    intro:
      "Corax isn't a logo: it's 73 people working across strategy, production, talent and technology. This project tells the system from the inside — the roles, the paths, the skills and the way a person joins La Vela and grows within it.",
    challenge:
      "Telling a story of rapid growth without turning it into a job ad. The right people aren't looking for a perk: they're looking for a place where work has a name, a method and a direction.",
    approach:
      "An editorial story built on real voices, concrete roles and lived-in spaces. Instagram and LinkedIn content, a careers page that speaks like a person and a hiring process that explains what actually happens.",
    deliverables: [
      "Employer branding and positioning",
      "Careers page and job posts",
      "Social content for Instagram and LinkedIn",
      "Photographic story of the spaces",
      "Video formats for the team",
      "Hiring and onboarding process",
    ],
    results: [
      { value: "73", label: "people" },
      { value: "4", label: "units" },
      { value: "20", label: "new formats" },
      { value: "1", label: "home in Milan" },
    ],
  },
  "presidenza-poretti": {
    title: "Poretti Presidency",
    year: "2025 — present",
    categories: ["Branded Entertainment", "Podcast & Format"],
    excerpt:
      "Giacomo Poretti as Honorary President: a new role to support the growth of the system and its properties.",
    coverAlt: "Portrait of Giacomo Poretti",
    gallery: [
      { src: "/img/covers/presidenza.jpg", alt: "Giacomo Poretti" },
      { src: "/img/covers/poretcast-01.jpg", alt: "The PoretCast set" },
    ],
    tags: ["Governance", "Talent", "Publishing", "Partnership"],
    intro:
      "In December 2025 Giacomo Poretti became Honorary President of Corax. A role that combines his editorial history with the building of the system: not a symbolic title, but a voice that accompanies the growth of the properties and new formats.",
    challenge:
      "Giving continuity to a creative partnership without trapping it in an org chart. The role had to be recognisable inside and outside the company, and consistent with the freedom that made PoretCast what it is.",
    approach:
      "We built the story of the appointment as an editorial passage, not a press release. The presidency becomes a point of view on the system's choices: formats, talents, production and distribution.",
    deliverables: [
      "Positioning of the role",
      "Editorial story of the appointment",
      "Instagram and press content",
      "Coordination with the properties",
      "Oversight of new formats",
      "Relationships with talents and partners",
    ],
    results: [
      { value: "2025", label: "the appointment" },
      { value: "30M+", label: "PoretCast views" },
      { value: "3", label: "seasons produced" },
      { value: "1", label: "honorary presidency" },
    ],
  },
  "leader-crescita-2026": {
    title: "Leader della Crescita 2026",
    year: "2026",
    categories: ["Social & Performance", "Produzione"],
    excerpt:
      "€8 million in 2025 revenue, +45% on 2024. Corax joins the ranking of Italy's fastest-growing companies.",
    coverAlt: "Four members of the Corax team posing against a dark background",
    gallery: [
      { src: "/img/covers/news-leader.jpg", alt: "The Il Sole 24 Ore award" },
      { src: "/img/covers/news-results.jpg", alt: "The numbers of Corax's growth" },
    ],
    tags: ["Award", "Growth", "Business", "Il Sole 24 Ore"],
    intro:
      "Il Sole 24 Ore has included Corax among its Leader della Crescita 2026. An award based on real numbers: €8 million in revenue in 2025, +45% on 2024, with a target of €12 million for 2026. Behind the ranking is a system that has held together publishing, production, talent and technology.",
    challenge:
      "Telling a financial result without turning it into self-congratulation. The award had to say something useful: how an independent editorial system grows, and what it takes to keep going.",
    approach:
      "A story built on facts — revenue, growth, headcount, square metres, new formats — and distributed across every touchpoint: website, Instagram, LinkedIn, press and content for the team.",
    deliverables: [
      "Story of the award",
      "Social content and carousels",
      "Results page and timeline",
      "Internal communication",
      "Press materials",
      "Positioning update",
    ],
    results: [
      { value: "€8M", label: "2025 revenue" },
      { value: "+45%", label: "on 2024" },
      { value: "€12M", label: "2026 target" },
      { value: "TOP", label: "Leader della Crescita" },
    ],
  },
  "pierfrancesco-petrosillo": {
    title: "Pierfrancesco Petrosillo, CAO",
    year: "2025 — present",
    categories: ["Social & Performance", "Influencer Marketing"],
    excerpt:
      "A new leader for the Agency unit: social, influencer marketing and branded entertainment under one direction.",
    coverAlt: "Pierfrancesco Petrosillo during a television interview",
    gallery: [
      { src: "/img/covers/petrosillo.jpg", alt: "Pierfrancesco Petrosillo, Chief Agency Officer at Corax" },
    ],
    tags: ["Leadership", "Agency", "Influencer marketing", "Governance"],
    intro:
      "In November 2025 Pierfrancesco Petrosillo became Chief Agency Officer of Corax. The Agency unit — social, influencer marketing and branded entertainment — is strengthened by a dedicated leader, within a system that counts 12 clients and 22 brands.",
    challenge:
      "Holding together speed of execution and editorial quality in an area that works every day with creators, brands and different platforms. The unit needed direction, not another layer of approval.",
    approach:
      "A single point of oversight across strategy, production and performance. The appointment was told as a system passage: who leads, with what skills and with what mandate within Corax's four units.",
    deliverables: [
      "Positioning of the Agency unit",
      "Story of the appointment",
      "Instagram and LinkedIn content",
      "Team organisation",
      "Client and brand oversight",
      "Integration with Talent and Media House",
    ],
    results: [
      { value: "CAO", label: "Chief Agency Officer" },
      { value: "12", label: "clients in the system" },
      { value: "22", label: "brands" },
      { value: "2025", label: "the appointment" },
    ],
  },
  "impresoft-engage": {
    title: "Impresoft Engage",
    year: "2025 — present",
    categories: ["Design & Tech", "Social & Performance"],
    excerpt:
      "Sales, projects, talent and clients in a single operating system. The CRM becomes Corax's engine.",
    coverAlt: "Impresoft Engage: the CRM that holds the Corax system together",
    gallery: [
      { src: "/img/covers/news-impresoft.jpg", alt: "The editorial cover of the Impresoft Engage project" },
    ],
    tags: ["CRM", "Platform", "Data", "Operations"],
    intro:
      "With Impresoft Engage, Corax brought sales, projects, talent and clients into a single operating system. Not another management tool: a way to make information talk to each other that previously lived in separate rooms.",
    challenge:
      "A system growing across four units risks multiplying tools and blind spots. It needed a single source of truth, able to connect the client relationship to the work being produced.",
    approach:
      "We mapped the flows between units and built a CRM that follows the full cycle: contact, project, production, measurement. Every piece of information is connected to the person and the work that generates it.",
    deliverables: [
      "Analysis of flows between units",
      "CRM configuration",
      "Data migration and clean-up",
      "Dashboards and reporting",
      "Team training",
      "Ongoing maintenance",
    ],
    results: [
      { value: "1", label: "operating system" },
      { value: "4", label: "connected areas" },
      { value: "360°", label: "client view" },
      { value: "ONGOING", label: "project" },
    ],
  },
};
