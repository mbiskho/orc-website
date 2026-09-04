export type ServiceSlug =
  | 'clipping'
  | 'ugc'
  | 'paid-media'
  | 'content-strategy';

export interface Service {
  slug: ServiceSlug;
  /** Short label used in nav and preview cards. */
  name: string;
  /** One line, used on the home page preview card. */
  summary: string;
  /** Two or three sentences, used on the services page. */
  description: string;
  /** Concrete deliverables. */
  included: string[];
  /** Who the service is a fit for. */
  forWho: string;
}

export const services: Service[] = [
  {
    slug: 'clipping',
    name: 'Clipping',
    summary:
      'Podcasts, livestreams, and interviews cut into vertical clips that hold attention.',
    description:
      'You send the full recording. We find the moments that stand on their own and cut them for a vertical feed. Every clip is captioned, colour-matched, and framed for the platform it is going to — not one export resized three ways.',
    included: [
      'Full-episode review and moment selection',
      'Vertical reframing for TikTok, Reels, and Shorts',
      'Burned-in captions, styled to your brand',
      'Hooks written and tested per clip',
      'Thumbnails and cover frames',
      'Delivery to a shared drive on a fixed weekly cadence',
    ],
    forWho:
      'Podcasters, streamers, and interview shows sitting on a back catalogue that nobody is watching.',
  },
  {
    slug: 'ugc',
    name: 'UGC',
    summary:
      'Ads filmed by real creators, briefed as angles and delivered with the rights signed over.',
    description:
      'When there is nothing to cut, we make it. Creators film to a brief we write — their room, their phone, your product — because the format stops working the moment it looks bought. Every batch comes back as five or six angles rather than one polished film, since a single video gives a paid account nothing to test.',
    included: [
      'Creator sourcing, vetting, and rates negotiated on your behalf',
      'Scripts and shot briefs, one per angle',
      'Shoots run end to end, reshot when a take misses',
      'Editing, captions, and a cut sized for each platform',
      'Usage rights and whitelisting agreed in writing, before filming',
      'A fixed number of videos a month, delivered on a set date',
    ],
    forWho:
      'Brands with a product worth showing and no footage of anyone using it.',
  },
  {
    slug: 'paid-media',
    name: 'Paid Media',
    summary:
      'Meta and TikTok campaigns, with the creative built in the same room as the buying.',
    description:
      'We run the accounts and we make the ads. That matters, because the fix for a campaign that stalls is usually a new angle, not a new bid strategy. Budgets are yours and stay in your account. You see the spend, the tests, and what we learned every week.',
    included: [
      'Account setup, tracking, and audience structure',
      'Ad creative produced from your existing footage',
      'Structured creative testing, three to five angles per cycle',
      'Weekly reporting in plain language',
      'Landing page and funnel notes where they affect results',
      'Monthly review call',
    ],
    forWho:
      'Brands and talent ready to put spend behind content that already works organically.',
  },
  {
    slug: 'content-strategy',
    name: 'Content Strategy',
    summary:
      'Themed social pages, built from scratch and operated week to week.',
    description:
      'A page with a clear subject and a consistent hand behind it grows. We pick the theme, build the format, and run the account — posting, sourcing, captioning, and reading the numbers. You own the page and the audience from day one.',
    included: [
      'Theme, positioning, and format definition',
      'Page setup and visual identity',
      'Daily posting and scheduling',
      'Sourcing and licensing where footage is not yours',
      'Community replies and comment moderation',
      'Monthly growth report against agreed targets',
    ],
    forWho:
      'Creators and brands who want an audience in a category next to the one they already serve.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

/** Short version — used on the home page process strip. */
export const processStrip: ProcessStep[] = [
  {
    number: '01',
    title: 'Send footage',
    description: 'Drop the raw file in a shared folder. No formatting needed.',
  },
  {
    number: '02',
    title: 'We cut',
    description: 'We pull the moments that work and build them for vertical.',
  },
  {
    number: '03',
    title: 'You approve',
    description: 'Review in one place. Ask for changes, or sign off.',
  },
  {
    number: '04',
    title: 'You post',
    description: 'Files land ready to publish, named and sorted by platform.',
  },
];

/** Long version — used on the services page. */
export const processDetailed: ProcessStep[] = [
  {
    number: '01',
    title: 'Scope',
    description:
      'A call to work out what you have, what you want from it, and whether we are the right shop for the job. If we are not, we will say so.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'We set the formats, caption styles, and hooks on a first batch. This is where the look gets decided, so we move slowly and take notes.',
  },
  {
    number: '03',
    title: 'Run',
    description:
      'Weekly delivery on a fixed cadence. Same folder, same day, same naming. Paid campaigns go live against the creative as it lands.',
  },
  {
    number: '04',
    title: 'Review',
    description:
      'Monthly, we look at what performed and what did not, and change the plan accordingly. Nothing carries forward just because it is already in the schedule.',
  },
];
