/**
 * Static page metadata in English, keyed by the canonical Italian path.
 * Detail pages derive their metadata from the translated content itself.
 */
export const metaEn: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Corax — Social Media Company | Media, Talent & Branded Entertainment",
    description:
      "Corax brings media, talent, production and technology together: podcasts, formats, influencer marketing and branded entertainment. €8M revenue in 2025, Leader della Crescita 2026.",
  },
  "/sistema": {
    title: "The Corax system — Agency, Media House, Talent, Tech",
    description:
      "Four units, one single system: social agency, media house, talent agency and technology. Discover how Corax builds entertainment ecosystems.",
  },
  "/progetti": {
    title: "Projects and campaigns — Corax portfolio",
    description:
      "Podcasts, formats, campaigns and digital projects: the Corax portfolio across branded entertainment, influencer marketing, production and technology.",
  },
  "/media": {
    title: "Properties — PoretCast, Immedia, A tu per tu, TTP",
    description:
      "Corax's editorial properties: Giacomo Poretti's PoretCast, Immedia, the FAST channel A tu per tu, TTP and the Influenceritalia platform.",
  },
  "/talent": {
    title: "Talent — The Corax roster",
    description:
      "Entertainment, comedy, food, lifestyle, green and sport: the roster of talents and creators managed by Corax.",
  },
  "/clienti": {
    title: "Clients and brand partners — Corax",
    description:
      "The brands and partners who chose Corax: campaigns, formats, influencer marketing and properties. Profiles, projects and collaborations told one by one.",
  },
  "/chi-siamo": {
    title: "About — Corax, a social media company since 2020",
    description:
      "The Corax story: from a Milanese startup to an integrated system with €8M in revenue, 73 people and a €12M target for 2026. Leadership, numbers, vision.",
  },
  "/insight": {
    title: "Insights — News, campaigns and awards | Corax",
    description:
      "Corax news: growth, campaigns, properties and awards covered by the press and told by the team.",
  },
  "/instagram": {
    title: "Corax on Instagram — The system's headquarters",
    description:
      "Stories, feed and initiatives: every Corax post opens a portfolio case. Campaigns, properties, talents and awards, told as they happen.",
  },
  "/esperienza": {
    title: "3D Experience — Enter La Vela | Corax",
    description:
      "Corax's digital atrium: four units, the whole roster and every case in a navigable 3D scene. Enter La Vela and see the system from the inside.",
  },
  "/contatti": {
    title: "Contact — Let's talk about your next project | Corax",
    description:
      "Write to us about campaigns, productions, talent and partnerships. Corax is in Milan, Viale Bodio 29/37 — La Vela.",
  },
  "/lavora-con-noi": {
    title: "Careers — People before profiles | Corax",
    description:
      "Join the Corax system: open positions, speculative applications and collaborations with talents and creators.",
  },
  "/privacy": {
    title: "Privacy Policy | Corax",
    description:
      "Information on the processing of personal data under EU Regulation 2016/679 (GDPR) — Corax S.r.l.",
  },
  "/cookie": {
    title: "Cookie Policy | Corax",
    description: "Information on the use of cookies and tracking technologies — Corax S.r.l.",
  },
  "/404": {
    title: "Page not found | Corax",
    description: "The page you are looking for does not exist or has moved. Back to the Corax home.",
  },
};

/** Localized breadcrumb labels, keyed by the canonical Italian path. */
export const crumbEn: Record<string, string> = {
  "/": "Home",
  "/sistema": "System",
  "/progetti": "Projects",
  "/media": "Properties",
  "/talent": "Talent",
  "/clienti": "Clients",
  "/chi-siamo": "About",
  "/insight": "Insights",
  "/instagram": "Live",
  "/esperienza": "3D Experience",
  "/contatti": "Contact",
  "/lavora-con-noi": "Careers",
  "/privacy": "Privacy",
  "/cookie": "Cookies",
};
