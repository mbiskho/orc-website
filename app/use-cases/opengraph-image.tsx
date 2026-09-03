import { renderOgImage, ogSize, ogContentType } from '@/lib/ogImage';

export const alt = 'Orcacast use cases — nine projects with briefs and results';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Use cases',
    title: 'Work we have shipped.',
    subtitle: 'Nine projects across clipping, paid media, and page growth.',
  });
}
