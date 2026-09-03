import Link from 'next/link';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-32 md:pt-28">
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ash">
            Media agency
          </p>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl lg:text-7xl">
            We turn long-form content into short-form performance.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
            You have the footage. We build the system that turns it into reach —
            clipped for vertical, put behind paid spend, and posted on a schedule
            that holds.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/about#contact"
              className="inline-flex items-center justify-center rounded-full bg-surf px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-deep-surf hover:text-paper sm:py-3.5"
            >
              Book a call
            </Link>
            <Link
              href="/use-cases"
              className="inline-flex items-center justify-center rounded-full border border-line px-7 py-4 text-base font-semibold text-ink transition-colors hover:border-ink sm:py-3.5"
            >
              See our work
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
