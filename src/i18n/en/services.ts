import type { ServiceTr } from "./types";

/** English translations keyed by service slug. */
export const servicesTr: Record<string, ServiceTr> = {
  agency: {
    kicker: "Strategy, creativity, performance",
    title: "One direction for every touchpoint.",
    excerpt:
      "Social media strategy, influencer marketing, branded entertainment and performance: the unit that turns business goals into communication systems.",
    intro:
      "Corax's Agency unit exists to guide brands across the whole funnel, from the first idea to measurement. An integrated team of strategists, creatives, account leads and media specialists working on one simple principle: creativity without performance is entertainment, performance without creativity is noise.",
    capabilities: [
      {
        title: "Social media strategy",
        text: "Positioning, competitive analysis, editorial architecture and growth plans built on data and real communities.",
      },
      {
        title: "Influencer marketing",
        text: "Scouting, selection and management of creators, with a careful read of affinity, tone of voice and potential effectiveness.",
      },
      {
        title: "Branded entertainment",
        text: "Formats and content that entertain before they sell, built together with the talent and properties of the Corax system.",
      },
      {
        title: "Creative & content",
        text: "Concept, copy, art direction and social-first production for every platform, from vertical to long-form.",
      },
      {
        title: "Media & performance",
        text: "Media planning, advertising and continuous optimisation to turn visibility into measurable results.",
      },
      {
        title: "Brand partnership",
        text: "Connections between brands, talent and editorial properties, with special operations and tailor-made projects.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Listening",
        text: "We analyse the brand, the market, the audience and the goals. No strategy is born before we understand what we are solving.",
      },
      {
        step: "02",
        title: "Strategy",
        text: "We define positioning, editorial territory, channels and KPIs. One clear, shared, measurable direction.",
      },
      {
        step: "03",
        title: "Creation",
        text: "Concepts, content and productions are made in-house, with a creative team that never loses sight of performance.",
      },
      {
        step: "04",
        title: "Activation",
        text: "We distribute, amplify and optimise in real time. Media, creators and properties work together.",
      },
      {
        step: "05",
        title: "Measurement",
        text: "We read the results, learn and feed the next cycle. Growth is a process, not an output.",
      },
    ],
    faqs: [
      {
        q: "Does Corax only work with big brands?",
        a: "No. We work with companies of different sizes, from retail brands to large enterprises. What matters is clarity of goals and the possibility of building a path, not the number of zeros in the budget.",
      },
      {
        q: "Do you also handle media planning and advertising?",
        a: "Yes. The Agency unit integrates strategy, creativity and performance: media planning, advertising and optimisation are part of the same process, so creativity never sits apart from results.",
      },
      {
        q: "How long does a collaboration last?",
        a: "It depends on the goal. It ranges from one-off projects to ongoing management. Most relationships start with a project and continue over time, because the system learns to know the brand.",
      },
      {
        q: "How do you measure results?",
        a: "With KPIs defined before we start: awareness, engagement, traffic, conversions. Every project has a dashboard and a moment of shared review with the client.",
      },
    ],
    metrics: [
      { value: "+45%", label: "revenue growth 2025" },
      { value: "250+", label: "projects delivered" },
      { value: "96%", label: "client satisfaction" },
      { value: "12 MLN", label: "2026 target" },
    ],
    keywords: [
      "social media agency Milan",
      "influencer marketing",
      "branded entertainment",
      "social media strategy",
      "digital campaigns",
    ],
  },
  "media-house": {
    kicker: "Production and distribution",
    title: "From idea to schedule, with no middlemen.",
    excerpt:
      "Creation, production and distribution of formats, podcasts and content: the editorial factory that gives stories their shape.",
    intro:
      "Corax Media House is the department that creates and produces original content for the Corax system and for brands. A complete production unit — directing, cinematography, audio, post-production, graphics — working on formats designed for platforms and for the people who live on them.",
    capabilities: [
      {
        title: "Format & storytelling",
        text: "Creation of serial formats, editorial pillars and intellectual properties able to live beyond the single piece of content.",
      },
      {
        title: "Video production",
        text: "Multi-camera productions, sets, campaigns and content on location, with cinematic standards and digital timelines.",
      },
      {
        title: "Podcast & vodcast",
        text: "Design, production and distribution of audio and video podcasts, from concept to measurement.",
      },
      {
        title: "Distribution & promotion",
        text: "Launch and distribution plans across YouTube, social, audio and Connected TV, with native adaptations per platform.",
      },
      {
        title: "Post & sound",
        text: "Editing, colour, motion graphics and sound design to give identity and quality back to every project.",
      },
      {
        title: "FAST & Connected TV",
        text: "Building FAST channels, schedules and television operations to bring digital content to the big screen.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Concept",
        text: "We start from an idea and an assumption: if it isn't recognisable, it isn't worth producing.",
      },
      {
        step: "02",
        title: "Development",
        text: "Writing, casting, set design and production plan. Every detail builds the language of the format.",
      },
      {
        step: "03",
        title: "Production",
        text: "In-house sets and crews, directing and art direction. We produce to high standards with an eye on rhythm.",
      },
      {
        step: "04",
        title: "Post",
        text: "Editing, sound and graphics. This is where content truly becomes an editorial product.",
      },
      {
        step: "05",
        title: "Distribution",
        text: "We publish, promote and measure. Every format is designed for the context it lives in.",
      },
    ],
    faqs: [
      {
        q: "Do you also produce for brands outside the Corax system?",
        a: "Yes. The Media House produces formats and content for brands as well as for our own properties. Directing, cinematography, audio, post-production and graphics are all handled in-house.",
      },
      {
        q: "Do you handle distribution too?",
        a: "Yes. Every project is born with a distribution plan native to each platform: YouTube, social, audio and Connected TV. We don't just deliver the file: we bring it to the audience.",
      },
      {
        q: "What formats do you make?",
        a: "Video podcasts and vodcasts, serial formats, video campaigns, social-first content, documentaries and event productions. From vertical to long-form, with production standards suited to the context.",
      },
      {
        q: "How long does a production take?",
        a: "It depends on the format. A single piece of content can take days, a serial format is built over weeks. The production plan is shared before we start.",
      },
    ],
    metrics: [
      { value: "30 MLN+", label: "PoretCast views" },
      { value: "20", label: "new formats in 2026" },
      { value: "1.500 mq", label: "production spaces" },
      { value: "24/7", label: "FAST channel" },
    ],
    keywords: [
      "video production Milan",
      "podcast production",
      "television formats",
      "media house",
      "social content",
    ],
  },
  talent: {
    kicker: "People, not just profiles",
    title: "Talent is a relationship, not a number.",
    excerpt:
      "Management, development and promotion of a roster that spans entertainment, food, lifestyle, green and sport.",
    intro:
      "Corax's talent agency represents people before creators. We build careers with a long-term vision, selecting voices capable of lasting and supporting them at every stage: positioning, production, partnerships and day-to-day management.",
    capabilities: [
      {
        title: "Talent management",
        text: "Strategic and operational management of talent, with dedicated oversight of career, image and opportunities.",
      },
      {
        title: "Brand partnership",
        text: "Connections between talent and brands built on real affinity, not on follower counts alone.",
      },
      {
        title: "Personal branding",
        text: "Positioning, editorial identity and development of owned content to build a recognisable voice.",
      },
      {
        title: "Booking & operations",
        text: "Management of bookings, contracts, production and logistics, with transparency for talent and partners.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Scouting",
        text: "We look for talent, obsession and the ability to question yourself. Numbers only tell part of the story.",
      },
      {
        step: "02",
        title: "Positioning",
        text: "We define the voice, the territory and the goals. An artistic direction before a commercial one.",
      },
      {
        step: "03",
        title: "Development",
        text: "Formats, content and owned projects to grow the talent beyond the platform.",
      },
      {
        step: "04",
        title: "Partnership",
        text: "We select the right brands and build coherent collaborations, curated in every detail.",
      },
    ],
    faqs: [
      {
        q: "How do you select talent?",
        a: "We look at voice, obsession and staying power, not just followers. The roster comes from meetings and from projects made together, not from a ranking.",
      },
      {
        q: "Do you also manage commercial relationships?",
        a: "Yes. Booking, contracts, production and logistics are handled by the team, with transparency for talent and brands.",
      },
      {
        q: "Can a brand propose a collaboration with a talent?",
        a: "Yes. Tell us about the project and the context: we assess the affinity and propose the right person, or tell you if there isn't one.",
      },
      {
        q: "Can a talent apply?",
        a: "Yes. Write to us from the Work with us page: we read every application and reply when there is a concrete opportunity.",
      },
    ],
    metrics: [
      { value: "20+", label: "talent on the roster" },
      { value: "5", label: "verticals" },
      { value: "360°", label: "management" },
      { value: "#1", label: "podcast in Italy" },
    ],
    keywords: [
      "talent agency Milan",
      "creator management",
      "influencer",
      "brand partnership",
      "talent management",
    ],
  },
  tech: {
    kicker: "Infrastructure for storytelling",
    title: "The technology that makes creativity scalable.",
    excerpt:
      "Websites, platforms, e-commerce, dashboards and proprietary tools: the IT department that builds the infrastructure of the Corax system.",
    intro:
      "Corax Tech is the department that designs and develops the digital products of the system and of its clients: websites, platforms, e-commerce, dashboards and internal tools. A full-stack unit working closely with creativity and media, because a good digital product is first of all a good story.",
    capabilities: [
      {
        title: "Web design & development",
        text: "Highly customisable, fast and accessible websites, designed to last and to rank.",
      },
      {
        title: "Platforms & products",
        text: "Proprietary platforms such as Influenceritalia, CRMs and work environments built on teams' real needs.",
      },
      {
        title: "E-commerce",
        text: "Digital stores, integrations and purchase flows designed to convert without friction.",
      },
      {
        title: "Data & dashboards",
        text: "Dashboards, reports and measurement tools to read results and make better decisions.",
      },
      {
        title: "AI & automation",
        text: "Experimentation applied to publishing, marketing and internal processes, with a pragmatic approach.",
      },
      {
        title: "SEO & performance",
        text: "Information architecture, Core Web Vitals and technical optimisation for sustainable visibility.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        text: "Goals, users, content and constraints. A digital product is born from understanding, not from a template.",
      },
      {
        step: "02",
        title: "Design",
        text: "Information architecture, prototypes and design systems. Every choice is tested against real cases.",
      },
      {
        step: "03",
        title: "Build",
        text: "Full-stack development with attention to performance, accessibility and maintainability.",
      },
      {
        step: "04",
        title: "Measure",
        text: "Analytics, testing and iteration. A website isn't a project that ends, it's a product that grows.",
      },
    ],
    faqs: [
      {
        q: "What kind of digital products do you build?",
        a: "Websites, platforms, e-commerce, apps, dashboards and internal tools. From experience design to development and maintenance.",
      },
      {
        q: "Do you also handle SEO and performance?",
        a: "Yes. Information architecture, Core Web Vitals, accessibility and technical SEO are part of the project from the start, not a later intervention.",
      },
      {
        q: "Will the site be easy to update?",
        a: "Yes. We build editorial systems and CMSs designed for the people who use them every day, with initial training and documentation.",
      },
      {
        q: "Do you also work on existing projects?",
        a: "Yes. We analyse the current state, define priorities and work in phases, without stopping the product.",
      },
    ],
    metrics: [
      { value: "100/100", label: "Lighthouse target" },
      { value: "FULL STACK", label: "skills" },
      { value: "1", label: "proprietary platform" },
      { value: "SEO", label: "by design" },
    ],
    keywords: [
      "web development Milan",
      "digital platforms",
      "e-commerce",
      "technical SEO",
      "full stack development",
    ],
  },
};
