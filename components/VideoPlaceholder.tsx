interface VideoPlaceholderProps {
  /** Ground the placeholder sits on, which sets its contrast. */
  tone?: 'light' | 'navy';
  className?: string;
}

/**
 * Stand-in for a 9:16 vertical clip. Fixed aspect ratio, so swapping in real
 * media later cannot shift the layout around it.
 */
export default function VideoPlaceholder({
  tone = 'light',
  className,
}: VideoPlaceholderProps) {
  const ground = tone === 'navy' ? 'bg-deep-sea' : 'bg-open-water';

  return (
    <div
      className={`relative aspect-[9/16] w-full overflow-hidden ${ground} ${className ?? ''}`}
      role="img"
      aria-label="Placeholder for a vertical video clip"
    >
      {/*
        Faint horizon line, echoing the waterline in the mark.
        `bg-current` here is the brand navy token named `current` (#1F3B5C),
        not CSS currentColor — the palette deliberately shadows Tailwind's
        built-in `current` keyword. See README.
      */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-current opacity-60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper/10 ring-1 ring-inset ring-paper/25">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            aria-hidden="true"
            className="ml-0.5 text-paper/80"
          >
            <path d="M8 5.5v13l11-6.5Z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  );
}
