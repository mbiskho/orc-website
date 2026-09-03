import { renderOgImage, ogSize, ogContentType } from '@/lib/ogImage';

export const alt = 'Orcacast services — clipping, paid media, and content strategy';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Services',
    title: 'Three service lines, built to run together.',
    subtitle: 'Retainer-based, scoped per client.',
  });
}
