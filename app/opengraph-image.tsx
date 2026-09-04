import { renderOgImage, ogSize, ogContentType } from '@/lib/ogImage';

export const alt = 'Orcacast — we turn long-form content into short-form performance';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    title: 'We turn long-form content into short-form performance.',
    subtitle: 'Clipping · UGC · Paid media · Content strategy',
  });
}
