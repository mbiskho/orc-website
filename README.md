# Orcacast

Marketing site for Orcacast, a media agency turning long-form content into
short-form performance.

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS 3.4

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
```

## Structure

```
app/
  layout.tsx            Shared <Header>/<Footer>, Inter via next/font, default metadata
  page.tsx              Home
  services/page.tsx     Services
  use-cases/page.tsx    Use cases
  about/page.tsx        About
  api/contact/route.ts  Contact Route Handler (stub — see "Email provider")
  globals.css           Tailwind layers, focus rings, scroll-reveal CSS
  icon.svg              Favicon
  opengraph-image.tsx   Generated OG card (one per route)
  sitemap.ts            sitemap.xml
  robots.ts             robots.txt
components/             Header, Footer, Hero, StatBand, ServiceCard, WorkCard,
                        ProcessSteps, CTABand, ContactForm, Logo, ScrollReveal,
                        VideoPlaceholder, UseCaseExplorer, LocationGlobe
lib/palette.ts          Brand hex values — single source for Tailwind and canvas
lib/seo.ts              Site constants, per-route metadata builder
lib/structuredData.ts   JSON-LD graph builders
lib/ogImage.tsx         Shared Open Graph card renderer
lib/content/            Typed content: services.ts, useCases.ts, principles.ts,
                        locations.ts, contact.ts
```

Pages are Server Components and map over the typed arrays in `lib/content/` —
copy changes happen there, not in markup.

### Client Components

Only five, each because it genuinely needs interactivity:

| Component | Why |
|---|---|
| `Header` | Mobile nav toggle, active-route highlighting |
| `UseCaseExplorer` | Filter chips (`useState`) and the project modal |
| `ContactForm` | Submission state and inline validation |
| `ScrollReveal` | `IntersectionObserver` fade-in |
| `LocationGlobe` | Canvas globe animation and marker hover state |

`VideoPlaceholder`, `Logo`, and the rest render on the server.

## Design system

The palette lives in `lib/palette.ts` and is spread into the theme by
`tailwind.config.ts`. Use the semantic names (`bg-shell`, `text-graphite`,
`border-line`) — never raw hex in components. `LocationGlobe` imports
`palette` directly because canvas drawing cannot use classes; that shared
module is why the two never drift.

Section rhythm is white-page/navy-water: most content sits on `paper`, with two
to three navy sections per page for weight. Navy sections use `py-32 md:py-40`.
Transitions between sections are hard edges, never gradients.

### Two things worth knowing

**1. `ash` was darkened from the original spec.** The brief specified
`ash: '#8B95A3'`, but that measures **2.96:1** on `paper` and **2.64:1** on
`shell` — well under the WCAG AA 4.5:1 minimum for the caption text it is used
for. It is set to `#5F6A77` (5.37:1 / 4.80:1). The original value and reasoning
are in a comment in `lib/palette.ts`. If brand guidelines require the
lighter tone, revert it there and restrict `ash` to non-text decoration.

**2. The `current` token shadows a Tailwind built-in.** Tailwind ships
`current` as an alias for CSS `currentColor`. The brand palette defines
`current: '#1F3B5C'`, so `border-current` / `bg-current` resolve to that navy,
**not** to `currentColor`. This is intentional and used for borders on navy
grounds, but keep it in mind — `text-current` will not do what you expect.

Buttons on light grounds use `bg-surf` with `text-ink` (7.28:1); on navy they
use `bg-glow` with `text-abyss` (10.23:1). Both hover to `deep-surf` with light
text. White-on-`surf` fails contrast at 2.49:1 — don't reintroduce it.

`sand` appears at most once per page, as a hairline divider. Never a button.

## Logo

`components/Logo.tsx` is a self-contained inline SVG — an abstract orca dorsal
fin plus the ORCACAST wordmark. The `variant` prop describes **the logo's own
colour**, not the surface behind it:

- `variant="light"` — paper-white, for navy grounds
- `variant="dark"` — ink, for paper and shell grounds

`markOnly` drops the wordmark. To swap in final artwork, replace the `<path>`
elements in that one file; the fill is `currentColor`, so both variants keep
working. `app/icon.svg` carries the same mark for the favicon and should be
updated to match.

## Locations and the globe

Office addresses are typed data in `lib/content/locations.ts` (city, country,
address lines, latitude, longitude). The About page renders them in a
`deep-sea` section as semantic `<address>` elements.

`components/LocationGlobe.tsx` draws the accompanying globe on a `<canvas>`
using an orthographic projection — no 3D library, nothing added to
`package.json`. It renders the sphere with a lit radial gradient, a 30 degree
graticule, great-circle arcs between every pair of offices (lifted off the surface
so they bow outward), and a marker per office. Markers behind the horizon fade
rather than disappear. Hovering an address highlights its marker and both of
its arcs.

The canvas is `aria-hidden` — it is decorative, and every office it plots is
listed as real text beside it. Rotation is ~6 degrees per second, freezes
entirely under `prefers-reduced-motion: reduce` at an angle that keeps all
every office visible, and pauses via `IntersectionObserver` when the section
is off screen. Rendering is `devicePixelRatio`-aware and re-fits on resize.

**Addresses were lightly normalised** from the supplied copy: `II 048619` was
read as the Singapore postcode, `Britania Raya` and `Uni Emirat Arab`
(Indonesian for Great Britain and the United Arab Emirates) became
`United Kingdom` and `United Arab Emirates` since the site is in English, and
the Jakarta address repeated its sub-district several times. Restore the
originals in `lib/content/locations.ts` if the verbatim forms are wanted.

`postalCode` is optional on the `Office` type: the UAE does not operate a
postal code system, so the Dubai entry omits it and the schema leaves the
field out rather than emitting an empty string.

## Email provider

`app/api/contact/route.ts` validates the payload and returns a stub success
response. The clearly marked block near the end of the file is where a
transactional provider (Resend, Postmark, SendGrid, SES) plugs in. Validation
in `lib/content/contact.ts` is shared by the form and the handler, so the server
always re-checks what the client sent.

## SEO

Configured in `lib/seo.ts` (constants and the per-route metadata builder) and
`lib/structuredData.ts` (JSON-LD). Set `NEXT_PUBLIC_SITE_URL` per environment
so preview deploys do not emit canonicals pointing at production.

**Per page:** unique title and description, canonical URL, Open Graph and
Twitter blocks. Titles are kept under 60 characters and descriptions between
130 and 160, so neither is truncated in results.

**Open Graph images** are generated at build time by `next/og` — one card per
route, colocated as `opengraph-image.tsx` and rendered through the shared
`lib/ogImage.tsx`. Next emits `og:image` and `twitter:image` (plus dimensions
and alt text) automatically. Satori supports only a flexbox subset of CSS, so
that renderer avoids grid and sets `display: flex` explicitly.

**Structured data** (JSON-LD, validated as well-formed on every page):

| Page | Schema |
|---|---|
| All | `Organization` (with all four offices, `foundingDate`, `sameAs`, `contactPoint`) + `WebSite` |
| Services | `BreadcrumbList` + `OfferCatalog` of the four `Service` entries |
| Use cases | `BreadcrumbList` |
| About | `BreadcrumbList` + four `ProfessionalService` nodes with `PostalAddress` and `GeoCoordinates` |

Office addresses carry structured `streetAddress`, `locality`,
`addressRegion`, optional `postalCode`, and an ISO 3166-1 alpha-2
`countryCode` —
stored as explicit fields in `lib/content/locations.ts` rather than parsed out
of the display lines, so postal codes stay correct for local search.

**Also:** `sitemap.xml` and `robots.txt` as Next route handlers, `themeColor`
and `colorScheme` via the `viewport` export, `lang="en-GB"` matching
`og:locale`, and `max-image-preview: large` for Google.

`foundingDate` in the Organization schema is set to `2022`, derived from the
"four years" claim in the copy. Correct it in `lib/structuredData.ts` if the
real incorporation date differs.

## Accessibility

Verified with axe-core (WCAG 2.1 A/AA) across all four pages at 1280px and
390px, plus the open-modal state: **0 violations**.

- Semantic landmarks, one `<h1>` per page, ordered headings
- Skip-to-content link
- Modal: focus moves to close, `Tab` is trapped, `Escape` closes and returns
  focus to the card that opened it, backdrop click closes, body scroll locked
- Mobile nav: `aria-expanded`, `Escape` closes and restores focus to the toggle
- Form errors linked via `aria-describedby`, status announced via `role="status"`
- Scroll-reveal respects `prefers-reduced-motion` and is neutralised by a
  `<noscript>` override, so content is never hidden behind JavaScript
- The location globe is decorative (`aria-hidden`), duplicated as text, and
  holds still under reduced motion

## Placeholder assets

`public/team-1.png` and `public/team-2.png` are generated 800×800 silhouettes
standing in for team portraits. Replace with real photos at the same dimensions
(or update `width`/`height` in `app/about/page.tsx`). Video placeholders are
`aspect-[9/16]` divs, not images — swapping in real media will not shift layout.
# orc-website
