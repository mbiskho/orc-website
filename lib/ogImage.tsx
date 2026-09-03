import { ImageResponse } from 'next/og';
import { palette } from '@/lib/palette';
import { siteName } from '@/lib/seo';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

interface OgImageInput {
  /** Headline, kept short enough to breathe at 1200x630. */
  title: string;
  /** One supporting line under the rule. */
  subtitle: string;
  /** Small label above the headline, e.g. "Services". */
  eyebrow?: string;
}

/**
 * Shared Open Graph card. Satori supports a flexbox subset of CSS, so every
 * container here is explicitly display:flex and layout uses no grid.
 */
export function renderOgImage({ title, subtitle, eyebrow }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: palette.abyss,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <svg width="44" height="44" viewBox="0 0 32 32">
            <path
              d="M4.2 27.4C5.6 17.8 10.2 8.6 21.4 3.6c-2.6 7.4-2.2 15.6 4.4 23.8Z"
              fill={palette.paper}
            />
            <rect
              x="2"
              y="28.4"
              width="28"
              height="1.9"
              rx="0.95"
              fill={palette.glow}
            />
          </svg>
          <div
            style={{
              marginLeft: 18,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: 8,
              color: palette.paper,
            }}
          >
            {siteName.toUpperCase()}
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? (
            <div
              style={{
                display: 'flex',
                fontSize: 22,
                letterSpacing: 5,
                textTransform: 'uppercase',
                color: palette.glow,
                marginBottom: 22,
              }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: palette.paper,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
        </div>

        {/* Rule + supporting line */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              width: 96,
              height: 4,
              backgroundColor: palette.glow,
              marginBottom: 26,
            }}
          />
          <div
            style={{
              display: 'flex',
              fontSize: 27,
              color: palette['navy-body'],
              maxWidth: 900,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
