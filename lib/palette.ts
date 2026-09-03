/**
 * Brand palette, single source of truth.
 *
 * `tailwind.config.ts` spreads this into the theme, so components use the
 * semantic class names (`bg-shell`, `text-graphite`) and never raw hex.
 * It is imported directly only where a class cannot reach — canvas drawing
 * in the location globe, which needs real colour values.
 */
export const palette = {
  // Light ground
  paper: '#FDFCFA',
  shell: '#F2EFE9',
  line: '#E2DDD4',
  // Light-ground text
  ink: '#0A1628',
  graphite: '#4A5568',
  // Brief specified #8B95A3, but that is 2.96:1 on paper and 2.64:1 on shell —
  // below the WCAG AA 4.5:1 floor for the caption text it is used for.
  // Darkened to clear AA on both grounds (5.37:1 / 4.80:1).
  ash: '#5F6A77',
  // Navy ground
  abyss: '#061020',
  'deep-sea': '#0A1628',
  'open-water': '#132844',
  current: '#1F3B5C',
  // Accents
  surf: '#14B8A6',
  glow: '#2DD4BF',
  'deep-surf': '#0F766E',
  sand: '#C9A227',
  // Body copy on navy grounds
  'navy-body': '#94A3B8',
} as const;
