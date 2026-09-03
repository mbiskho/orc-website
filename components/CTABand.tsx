import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

interface CTABandProps {
  heading: string;
  body: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTABand({
  heading,
  body,
  ctaLabel = 'Book a call',
  ctaHref = '/about#contact',
}: CTABandProps) {
  return (
    <section
      className="on-navy bg-abyss py-32 md:py-40"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2
            id="cta-heading"
            className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-paper md:text-5xl"
          >
            {heading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-body md:text-lg">
            {body}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-glow px-7 py-4 text-base font-semibold text-abyss transition-colors hover:bg-deep-surf hover:text-paper sm:py-3.5"
            >
              {ctaLabel}
            </Link>
            <a
              href="mailto:contact@orcacast.com"
              className="inline-flex items-center justify-center rounded-full border border-current px-7 py-4 text-base font-semibold text-paper transition-colors hover:border-glow hover:text-glow sm:py-3.5"
            >
              contact@orcacast.com
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
