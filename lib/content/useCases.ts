export type UseCaseCategory = 'Clipping' | 'Paid Media' | 'Page Growth';

/** Filter chips on /use-cases. 'All' is a UI-only value, not a project category. */
export const useCaseFilters = ['All', 'Clipping', 'Paid Media', 'Page Growth'] as const;

export type UseCaseFilter = (typeof useCaseFilters)[number];

export interface ResultStat {
  label: string;
  value: string;
}

export interface UseCase {
  id: string;
  category: UseCaseCategory;
  /** Anonymised client descriptor, e.g. "Business podcast". */
  clientType: string;
  /** One line for the card. */
  summary: string;
  /** Single metric shown on the card face. */
  headlineResult: string;
  /** Two or three paragraphs' worth of context, shown in the modal. */
  brief: string;
  /** Two or three stats shown in the modal. */
  stats: ResultStat[];
}

export const useCases: UseCase[] = [
  {
    id: 'weekly-business-podcast',
    category: 'Clipping',
    clientType: 'Business podcast',
    summary: 'Two years of episodes, no vertical presence.',
    headlineResult: '18M views in 6 months',
    brief:
      'A weekly interview show with a healthy audio audience and nothing on short-form. We worked backwards through the catalogue, cutting eight clips per episode and testing four hook styles against the same moments to find what carried.',
    stats: [
      { label: 'Views, first 6 months', value: '18M' },
      { label: 'Clips delivered', value: '640' },
      { label: 'Follower growth', value: '+94K' },
    ],
  },
  {
    id: 'fitness-talent-reels',
    category: 'Clipping',
    clientType: 'Fitness talent',
    summary: 'Long-form YouTube, cut for Reels three times a week.',
    headlineResult: '4.2M views per month',
    brief:
      'The footage was already good. What was missing was cadence and a consistent frame. We built a fixed three-a-week schedule and a caption style that stayed the same across every post, so the feed started to read as one body of work.',
    stats: [
      { label: 'Monthly views', value: '4.2M' },
      { label: 'Avg. watch-through', value: '61%' },
      { label: 'Posting cadence', value: '3×/week' },
    ],
  },
  {
    id: 'dtc-supplement-brand',
    category: 'Paid Media',
    clientType: 'DTC supplement brand',
    summary: 'Creative testing on Meta against a flat account.',
    headlineResult: 'CPA down 41%',
    brief:
      'Spend was steady but the account had run the same three ads for a year. We rebuilt the creative from founder footage the brand already had, then tested five angles a cycle. The winning angle was the least polished one.',
    stats: [
      { label: 'Cost per acquisition', value: '−41%' },
      { label: 'ROAS', value: '3.8×' },
      { label: 'Creative angles tested', value: '32' },
    ],
  },
  {
    id: 'saas-tiktok-launch',
    category: 'Paid Media',
    clientType: 'B2B software',
    summary: 'First TikTok campaign, built from webinar recordings.',
    headlineResult: '2,100 qualified signups',
    brief:
      'No short-form history and a sales team sceptical that the channel would produce anything usable. We cut demo moments out of existing webinars and ran them as direct-response ads with a single landing page.',
    stats: [
      { label: 'Qualified signups', value: '2,100' },
      { label: 'Cost per signup', value: '$14' },
      { label: 'Time to first sale', value: '9 days' },
    ],
  },
  {
    id: 'restaurant-group-meta',
    category: 'Paid Media',
    clientType: 'Restaurant group',
    summary: 'Local campaigns across six locations.',
    headlineResult: '£6 cost per booking',
    brief:
      'Six sites competing with each other for the same impressions. We split the account by radius, shot nothing new, and used kitchen footage the group had been sitting on since a brand shoot two years earlier.',
    stats: [
      { label: 'Cost per booking', value: '£6' },
      { label: 'Bookings attributed', value: '11,400' },
      { label: 'Locations live', value: '6' },
    ],
  },
  {
    id: 'motorsport-page',
    category: 'Page Growth',
    clientType: 'Motorsport theme page',
    summary: 'Built from zero, operated daily for a year.',
    headlineResult: '310K followers',
    brief:
      'A brand wanted an audience adjacent to its product without putting the product in every post. We picked the theme, agreed the licensing approach up front, and posted twice a day for twelve months.',
    stats: [
      { label: 'Followers', value: '310K' },
      { label: 'Posts published', value: '730' },
      { label: 'Avg. reach per post', value: '240K' },
    ],
  },
  {
    id: 'film-commentary-page',
    category: 'Page Growth',
    clientType: 'Film commentary page',
    summary: 'A second audience for an existing media brand.',
    headlineResult: '1.9M monthly reach',
    brief:
      'The parent brand had one page doing everything. We split off the film coverage into its own account with a narrower remit, which made the format obvious and the posting schedule easier to hold.',
    stats: [
      { label: 'Monthly reach', value: '1.9M' },
      { label: 'Followers, year one', value: '156K' },
      { label: 'Saves per post', value: '3.4K' },
    ],
  },
  {
    id: 'gaming-streamer-shorts',
    category: 'Clipping',
    clientType: 'Gaming streamer',
    summary: 'Six-hour livestreams reduced to daily Shorts.',
    headlineResult: '12M views in 90 days',
    brief:
      'The hard part was volume: finding one good forty-second moment inside six hours, every day, without the clips all feeling the same. We built a tagging pass into the review so recurring bits could be tracked as series.',
    stats: [
      { label: 'Views, 90 days', value: '12M' },
      { label: 'Clips delivered', value: '270' },
      { label: 'Subscriber growth', value: '+41K' },
    ],
  },
  {
    id: 'interview-series-page',
    category: 'Page Growth',
    clientType: 'Interview series',
    summary: 'A standalone page for guest highlights.',
    headlineResult: '88K followers in 7 months',
    brief:
      'Guests were promoting their own episodes to their own audiences and nothing accumulated in one place. A dedicated page gave that traffic somewhere to land and made the back catalogue browsable.',
    stats: [
      { label: 'Followers', value: '88K' },
      { label: 'Episodes repackaged', value: '120' },
      { label: 'Referral traffic to show', value: '+27%' },
    ],
  },
];
