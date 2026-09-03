export interface Principle {
  number: string;
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    number: '01',
    title: 'Fewer clips, cut properly',
    description:
      'We would rather deliver twenty clips that hold attention than sixty that fill a folder. Every cut gets watched end to end before it goes out.',
  },
  {
    number: '02',
    title: 'The footage decides',
    description:
      'We do not arrive with a house style and apply it to everything. The material sets the pace, the framing, and the tone. A quiet interview should not be edited like a livestream.',
  },
  {
    number: '03',
    title: 'One team on creative and spend',
    description:
      'The people making the ads and the people buying the media sit together. When a campaign stalls, the answer is usually a new angle, and that is faster to find in one room.',
  },
  {
    number: '04',
    title: 'Plain reporting',
    description:
      'You get the numbers that matter and an honest read on them. If a month was flat, we will tell you it was flat and what we are changing.',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Portrait in /public, sized 800x800. */
  image: string;
}

export const team: TeamMember[] = [
  {
    name: 'Bisma Kho',
    role: 'Founder, Creative',
    image: '/team-1.png',
    bio: 'Ten years editing long-form for broadcast before moving to short. Runs the edit and sets the standard for what leaves the building.',
  },
  {
    name: 'Natasha Wynne',
    role: 'Head of Paid Media',
    image: '/team-2.png',
    bio: 'Buys across Meta and TikTok and has spent most of a career learning that the creative is the targeting.',
  },
];
