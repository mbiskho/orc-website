interface LogoProps {
  /**
   * The colour of the logo itself, not of the surface behind it.
   * 'light' renders a paper-white fin and wordmark, for navy grounds.
   * 'dark'  renders an ink fin and wordmark, for paper and shell grounds.
   */
  variant?: 'light' | 'dark';
  /** Hides the ORCACAST wordmark, leaving the fin alone. */
  markOnly?: boolean;
  className?: string;
}

export default function Logo({
  variant = 'dark',
  markOnly = false,
  className,
}: LogoProps) {
  const tone = variant === 'light' ? 'text-paper' : 'text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${tone} ${className ?? ''}`}
    >
      <svg
        viewBox="0 0 32 32"
        width="26"
        height="26"
        aria-hidden="true"
        focusable="false"
        className="shrink-0"
      >
        {/* Abstract orca dorsal fin: falcate leading edge, swept trailing edge. */}
        <path
          d="M4.2 27.4C5.6 17.8 10.2 8.6 21.4 3.6c-2.6 7.4-2.2 15.6 4.4 23.8Z"
          fill="currentColor"
        />
        {/* Waterline the fin breaks through. */}
        <rect x="2" y="28.4" width="28" height="1.9" rx="0.95" fill="currentColor" opacity="0.35" />
      </svg>
      {!markOnly && (
        <span className="text-base font-bold uppercase tracking-[0.22em]">
          Orcacast
        </span>
      )}
    </span>
  );
}
