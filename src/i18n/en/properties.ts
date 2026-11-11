import type { PropertyTr } from "./types";

/** English translations keyed by property slug. */
export const propertiesTr: Record<string, PropertyTr> = {
  poretcast: {
    type: "Video podcast",
    claim: "Italy's living room, with no script.",
    partners: "With Giacomo Poretti",
    excerpt:
      "Giacomo Poretti's video podcast: long conversations, unexpected guests and 30 million views on YouTube.",
    intro:
      "There's a sofa, a plant, a neon sign and two pink armchairs. Musicians, actors, writers, scientists and champions pass through. PoretCast is the format that put conversation back at the centre, turning YouTube into an intimate, domestic place.",
    body: [
      "Produced by Corax Media House, PoretCast is a proprietary editorial format that combines Giacomo Poretti's theatrical experience with the grammar of digital. Every episode is an event, every guest is a story, every clip is a fragment that keeps circulating.",
      "The project lives on YouTube and is distributed across audio platforms, with a system of vertical content that multiplies the reach of every conversation. Production is entirely in-house: set, directing, post-production, sound and distribution.",
    ],
    coverAlt: "Giacomo Poretti and a guest on the PoretCast set",
    stats: [
      { value: "30 MLN+", label: "YouTube views" },
      { value: "3", label: "seasons" },
      { value: "+20%", label: "2024 growth" },
      { value: "#1", label: "podcast in Italy" },
    ],
    highlights: [
      "Cesare Cremonini",
      "Alessandro Cattelan",
      "Fabio Fazio",
      "Rose Villain",
      "Lazza",
      "Mauro Biglino",
      "Stefano Nazzi",
      "and many others",
    ],
    tags: ["Podcast", "YouTube", "Entertainment", "Proprietary format"],
  },
  immedia: {
    type: "Editorial platform",
    claim: "Sustainability, without the rhetoric.",
    partners: "With Giovanni Storti and Arianna Izzi",
    excerpt:
      "The multichannel editorial platform that covers environment, food, cities and everyday choices in a pop language.",
    intro:
      "Immedia is a multichannel editorial platform dedicated to sustainability, created by Corax with Giovanni Storti and science communicator Arianna Izzi. A project born from the idea that the environmental issue doesn't need alarmism, it needs storytelling.",
    body: [
      "Environment, food, mobility, work, diversity: Immedia treats sustainability as a cultural, everyday matter, translating data and research into accessible content, with the tone of someone who knows how to entertain.",
      "The platform lives on Instagram, TikTok and YouTube, with serial formats, collaborations and special operations. It's an editorial outpost that lets brands and institutions approach the topic without trivialising it.",
    ],
    coverAlt: "Giovanni Storti with a basket of fresh vegetables, symbol of the Immedia story",
    stats: [
      { value: "4+", label: "channels" },
      { value: "100%", label: "original" },
      { value: "ONGOING", label: "editorial" },
      { value: "1", label: "community" },
    ],
    highlights: [
      "Serial formats",
      "Science communication",
      "Brand partnership",
      "Events and live shows",
      "Multi-platform content",
    ],
    tags: ["Sustainability", "Publishing", "Social", "Purpose"],
  },
  "a-tu-per-tu": {
    type: "FAST channel",
    claim: "The vodcast meets television.",
    partners: "With Samsung TV Plus and The Channel Store",
    excerpt:
      "The first Italian FAST channel dedicated to vodcasts and conversational formats, available on Samsung TV Plus.",
    intro:
      "A tu per tu is the first Italian FAST (Free Ad-Supported Streaming TV) channel dedicated to vodcasts, created by Corax with The Channel Store and distributed on Samsung TV Plus. A project that brings digital conversation into the living room without losing its soul.",
    body: [
      "The channel offers a selection of vodcasts and conversational formats developed and distributed by Corax, bringing into the Connected TV ecosystem a narrative style born and raised on digital platforms.",
      "A new touchpoint for brands and for the system's properties, extending the life of content and opening up advertising scenarios in a fast-growing environment.",
    ],
    coverAlt: "A selection of programmes from the A tu per tu channel",
    stats: [
      { value: "1°", label: "in Italy" },
      { value: "24/7", label: "schedule" },
      { value: "CTV", label: "connected TV" },
      { value: "2026", label: "launch" },
    ],
    highlights: [
      "Continuous schedule",
      "Vodcasts and conversational formats",
      "Samsung TV Plus distribution",
      "New advertising opportunities",
    ],
    tags: ["FAST", "Connected TV", "Vodcast", "Distribution"],
  },
  ttp: {
    type: "Program",
    claim: "Tech Talent Factory.",
    excerpt:
      "The programme that connects tech talent with media storytelling: training, content and new voices.",
    intro:
      "TTP — Tech Talent Factory is the programme through which Corax invests in technology talent and in innovation applied to media. A project that brings together training, experimentation and content production.",
    body: [
      "TTP was created to build a bridge between technical skills and the ability to tell their story. A programme designed to surface new voices, experiment with new formats and feed the Corax ecosystem.",
      "The project is part of the group's growth strategy, which in 2026 targets 20 new formats and a significant expansion of production spaces.",
    ],
    coverAlt: "TTP — Tech Talent Factory, the Corax programme",
    stats: [
      { value: "2025", label: "launch" },
      { value: "TECH", label: "vertical" },
      { value: "20", label: "formats in 2026" },
      { value: "100%", label: "innovation" },
    ],
    highlights: ["New talent", "Training", "Experimentation", "Tech content"],
    tags: ["Tech", "Talent", "Program", "Innovation"],
  },
  influenceritalia: {
    type: "Platform",
    claim: "The match between brands and creators.",
    excerpt:
      "The proprietary platform that connects brands and creators, born from the daily experience of the talent agency.",
    intro:
      "Influenceritalia is the Corax system's platform that connects brands and creators, making selection simpler and more transparent. A tech product built by listening to the people who use it every day.",
    body: [
      "Structured profiles, smart filters and a direct contact flow: Influenceritalia shortens the distance between a brief and the right person to tell it.",
      "The platform is part of Corax's technology ecosystem, alongside CRMs, dashboards and measurement tools developed in-house.",
    ],
    coverAlt: "Influenceritalia, a Corax platform",
    stats: [
      { value: "FULL STACK", label: "development" },
      { value: "MATCH", label: "brands and creators" },
      { value: "1", label: "platform" },
      { value: "ONGOING", label: "product" },
    ],
    highlights: ["Creator database", "Smart filters", "Direct contact", "Dashboard"],
    tags: ["Platform", "Creator economy", "Tech", "Product"],
  },
};
