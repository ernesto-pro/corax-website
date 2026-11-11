import type { ScanTr } from "./types";

export const scanTr: ScanTr = {
  questions: [
    {
      kicker: "The result",
      title: "What has to happen for this project to make sense?",
      options: [
        { label: "Make us known", detail: "Awareness and presence" },
        { label: "Sell more", detail: "Performance and conversions" },
        { label: "Build a community", detail: "Relationship and return" },
        { label: "Launch something", detail: "Novelty and impact" },
      ],
    },
    {
      kicker: "The starting point",
      title: "Where is your brand, really?",
      options: [
        { label: "We're starting from zero", detail: "Everything to build" },
        { label: "They know us, but they don't remember us", detail: "Awareness to activate" },
        { label: "We have a real community", detail: "A relationship already alive" },
        { label: "We are the category", detail: "Leadership to defend" },
      ],
    },
    {
      kicker: "The weapon",
      title: "What's the strongest thing you've got?",
      options: [
        { label: "A product that speaks for itself", detail: "Product and substance" },
        { label: "A person with a strong voice", detail: "Talent and personality" },
        { label: "A media budget", detail: "Investment and reach" },
        { label: "An idea, still to be built", detail: "A territory to define" },
      ],
    },
    {
      kicker: "The clock",
      title: "How long do you have to see a result?",
      options: [
        { label: "Yesterday", detail: "Maximum urgency" },
        { label: "Three months", detail: "One quarter to get going" },
        { label: "Six to twelve months", detail: "A progressive build" },
        { label: "We're building, no rush", detail: "A long-term project" },
      ],
    },
    {
      kicker: "The measure",
      title: "How do you decide if it worked?",
      options: [
        { label: "Sales and leads", detail: "Business numbers" },
        { label: "Awareness", detail: "Presence and recall" },
        { label: "Engagement and community", detail: "Conversation and relationship" },
        { label: "I don't know yet", detail: "Let's define it together" },
      ],
    },
  ],
  levels: [
    {
      name: "Raw potential",
      title: "You've got the material. You're missing the direction.",
      description:
        "The potential is there, but it isn't organised into a system yet. The good news: from here you can see the whole path.",
      move: "Start with a strategy, not a post.",
    },
    {
      name: "Good foundations",
      title: "You've got something to say. Now you need a system.",
      description:
        "The pieces are there, but they're travelling separately. The leap isn't making more content: it's putting it under one direction.",
      move: "Turn your content into an ecosystem.",
    },
    {
      name: "Ready to scale",
      title: "The engine is running. Now it needs the right fuel.",
      description:
        "You've got traction. To avoid burning it, you need production, talent and distribution pulling in the same direction.",
      move: "Put talent, production and media in the same room.",
    },
    {
      name: "Category mode",
      title: "You don't need noise. You need a signature.",
      description:
        "You already have presence and structure. The next step isn't doing more: it's owning a territory nobody else can copy.",
      move: "Build a property, not a campaign.",
    },
  ],
  focuses: {
    agency: {
      promise: "Strategy, creativity and performance under one direction.",
      moves: [
        "Put a single KPI ahead of everything else: the rest is decoration.",
        "Build a concept that holds up even without a media budget.",
        "Put production and performance in the same brief, not with two different suppliers.",
      ],
    },
    "media-house": {
      promise: "Formats, production and distribution that build an audience.",
      moves: [
        "Turn the content into a recurring format, not a disposable campaign.",
        "Design distribution before production: where it goes, for whom, how often.",
        "Give the audience a reason to come back, not just to watch once.",
      ],
    },
    talent: {
      promise: "People with a strong voice, inside a real partnership.",
      moves: [
        "Choose a voice, not just any face: personality is the medium.",
        "Build the partnership before the contract: duration, freedom, shared direction.",
        "Grow the talent with an editorial project, not a list of posts.",
      ],
    },
    tech: {
      promise: "Platforms and tools that make the story scalable.",
      moves: [
        "Ship an MVP that already tells the brand, not an anonymous prototype.",
        "Automate what repeats, not what creates: the direction stays human.",
        "Measure real use, not sign-ups: a product is judged by who comes back.",
      ],
    },
  },
};
