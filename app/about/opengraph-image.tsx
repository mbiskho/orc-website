import { renderOgImage, ogSize, ogContentType } from '@/lib/ogImage';

export const alt = 'About Orcacast — a media agency built on craft, not volume';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'About',
    title: 'A media agency built on craft, not volume.',
    subtitle: 'Offices in Singapore, London, Jakarta, and Dubai.',
  });
}
