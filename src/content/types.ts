import type { ServiceKey } from "@/lib/site";

export type Offering = {
  title: string;
  desc: string;
  price: string; // "Rp 5 jt" atau "Custom"
  unit?: string; // "/bulan", "/platform/bulan"
  features: string[];
  highlight?: boolean;
};

export type Service = {
  key: ServiceKey;
  name: string;
  short: string;
  eyebrow: string;
  title: string;
  intro: string;
  startingFrom: string;
  waMessage: string;
  offeringsTitle: string;
  offerings: Offering[];
  benefitsTitle: string;
  benefits: { title: string; desc: string }[];
  includedTitle: string;
  included: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDesc: string;
  lp: { title: string; sub: string; bullets: string[] };
};

export type SiteContent = {
  meta: { title: string; desc: string };
  nav: {
    services: string;
    about: string;
    pricing: string;
    faq: string;
    cta: string;
    wa: string;
    menu: string;
    close: string;
  };
  common: {
    startingFrom: string;
    learnMore: string;
    consult: string;
    chatWa: string;
    waGeneral: string;
    back: string;
    adSpendNote: string;
    placeholderNote: string;
  };
  hero: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    sub: string;
    primary: string;
    secondary: string;
    chips: string[];
    scroll: string;
  };
  marquee: string[];
  manifesto: { eyebrow: string; text: string; highlight: string; after: string };
  problem: {
    eyebrow: string;
    title: string;
    sub: string;
    beforeLabel: string;
    afterLabel: string;
    before: string[];
    after: string[];
  };
  servicesSection: { eyebrow: string; title: string; sub: string };
  funnel: {
    eyebrow: string;
    title: string;
    sub: string;
    stages: { tag: string; name: string; desc: string; tools: string[] }[];
  };
  process: { eyebrow: string; title: string; steps: { title: string; desc: string }[] };
  work: {
    eyebrow: string;
    title: string;
    sub: string;
    items: { name: string; category: string; tag: string; tone: "navy" | "amber" | "ink" | "sky" }[];
  };
  pricing: { eyebrow: string; title: string; sub: string };
  audit: { eyebrow: string; title: string; sub: string; points: string[]; cta: string };
  testimonials: {
    eyebrow: string;
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  finalCta: { title: string; sub: string };
  footer: {
    tagline: string;
    services: string;
    company: string;
    contact: string;
    rights: string;
    address: string;
  };
  about: {
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    title: string;
    intro: string;
    storyTitle: string;
    story: string[];
    valuesTitle: string;
    values: { title: string; desc: string }[];
    whyTitle: string;
    why: { title: string; desc: string }[];
  };
  form: {
    metaTitle: string;
    metaDesc: string;
    eyebrow: string;
    title: string;
    sub: string;
    auditTitle: string;
    auditSub: string;
    steps: string[];
    servicesLabel: string;
    serviceOptions: { value: string; label: string }[];
    companyLabel: string;
    companyPh: string;
    industryLabel: string;
    industryPh: string;
    websiteLabel: string;
    websitePh: string;
    sizeLabel: string;
    sizeOptions: string[];
    budgetLabel: string;
    budgetOptions: string[];
    timelineLabel: string;
    timelineOptions: string[];
    nameLabel: string;
    namePh: string;
    roleLabel: string;
    rolePh: string;
    emailLabel: string;
    emailPh: string;
    phoneLabel: string;
    phonePh: string;
    notesLabel: string;
    notesPh: string;
    next: string;
    prev: string;
    submit: string;
    sending: string;
    privacy: string;
    errors: {
      services: string;
      company: string;
      budget: string;
      timeline: string;
      name: string;
      email: string;
      phone: string;
      generic: string;
    };
    side: { title: string; points: string[]; waTitle: string; waSub: string };
  };
  thanks: {
    metaTitle: string;
    title: string;
    sub: string;
    next: string;
    steps: string[];
    wa: string;
    home: string;
  };
  notFound: { title: string; sub: string; home: string };
  services: Record<string, Service>;
};
