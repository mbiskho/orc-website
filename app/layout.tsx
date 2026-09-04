import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { organizationGraph } from '@/lib/structuredData';
import { palette } from '@/lib/palette';
import {
  siteDescription,
  siteName,
  siteTagline,
  siteUrl,
  twitterHandle,
} from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  // Wide weight range: body through to the very large stat numerals.
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — ${siteTagline}`,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: 'Marketing and Advertising',
  keywords: [
    'podcast clipping',
    'short-form video agency',
    'vertical video editing',
    'TikTok ads agency',
    'UGC creative agency',
    'user generated content ads',
    'Meta ads creative',
    'social media page growth',
    'content repurposing',
    'media agency Singapore',
    'media agency London',
    'media agency Jakarta',
    'media agency Dubai',
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    siteName,
    locale: 'en_GB',
    url: siteUrl,
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    site: twitterHandle,
    creator: twitterHandle,
    title: `${siteName} — ${siteTagline}`,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: palette.paper },
    { media: '(prefers-color-scheme: dark)', color: palette.abyss },
  ],
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={inter.variable}>
      <head>
        {/*
          Without JavaScript the IntersectionObserver never fires, so the
          scroll-reveal wrapper would leave content permanently transparent.
          Neutralise it up front rather than hiding content behind a script.
        */}
        <noscript>
          {/* eslint-disable-next-line react/no-danger */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-paper font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationGraph()} />
      </body>
    </html>
  );
}
