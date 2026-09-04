import type { Metadata } from 'next';

/**
 * Canonical origin. Override with NEXT_PUBLIC_SITE_URL per environment so
 * previews do not emit canonicals pointing at production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://orcacast.com'
).replace(/\/$/, '');

export const siteName = 'Orcacast';
export const siteTagline = 'Long-form content into short-form performance';
export const contactEmail = 'hello@orcacast.com';

export const siteDescription =
  'A media agency that cuts podcasts and livestreams into vertical clips, films UGC with real creators, runs Meta and TikTok campaigns, and grows themed pages.';

/** Profiles referenced by the Organization schema's sameAs. */
export const socialProfiles = [
  'https://www.linkedin.com/company/orcacast',
  'https://www.instagram.com/orcacast',
  'https://www.tiktok.com/@orcacast',
  'https://www.youtube.com/@orcacast',
];

export const twitterHandle = '@orcacast';

interface PageSeoInput {
  title: string;
  description: string;
  /** Route path with a leading slash, e.g. "/services". */
  path: string;
}

/**
 * Per-route metadata: title, description, canonical, and matching Open Graph
 * and Twitter blocks. Keeping this in one place stops the three copies of each
 * description drifting apart.
 *
 * Open Graph and Twitter images are supplied automatically by Next from the
 * opengraph-image files colocated with each route, so they are not set here.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageSeoInput): Metadata {
  const url = `${siteUrl}${path}`;
  const fullTitle = `${title} — ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName,
      locale: 'en_GB',
      url,
      title: fullTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title: fullTitle,
      description,
    },
  };
}
