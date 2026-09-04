import Link from 'next/link';
import Hero from '@/components/Hero';
import StatBand from '@/components/StatBand';
import ServiceCard from '@/components/ServiceCard';
import WorkCard from '@/components/WorkCard';
import ProcessSteps from '@/components/ProcessSteps';
import CTABand from '@/components/CTABand';
import ScrollReveal from '@/components/ScrollReveal';
import { services, processStrip } from '@/lib/content/services';
import { useCases } from '@/lib/content/useCases';

const featured = useCases.slice(0, 4);

export default function HomePage() {
  return (
    <>
      {/* paper */}
      <Hero />

      {/* paper, with shell cards */}
      <section className="bg-paper pb-20 md:pb-28" aria-labelledby="services-heading">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            {/* The one sand accent on this page. */}
            <span className="block h-px w-16 bg-sand" />
            <h2
              id="services-heading"
              className="mt-8 max-w-2xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
            >
              Four things, done properly.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite">
              We keep the list short so the work stays good. Most clients start
              with one and add the others once the first is running.
            </p>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ScrollReveal key={service.slug} delay={index * 90} className="h-full">
                <ServiceCard service={service} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* deep-sea */}
      <StatBand />

      {/* paper */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="work-heading">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="work-heading"
                  className="max-w-2xl text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
                >
                  Recent work.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite">
                  A sample of what we have shipped. Names withheld where clients
                  prefer it.
                </p>
              </div>
              <Link
                href="/use-cases"
                className="shrink-0 text-sm font-semibold text-deep-surf transition-colors hover:text-ink"
              >
                See all use cases &rarr;
              </Link>
            </div>
          </ScrollReveal>

          <ul className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featured.map((useCase, index) => (
              <ScrollReveal key={useCase.id} as="li" delay={index * 70} className="flex">
                <WorkCard useCase={useCase} />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* shell */}
      <ProcessSteps
        heading="Send footage. We cut. You approve. You post."
        intro="Four steps, the same every week. You are never waiting on us to tell you where something is."
        steps={processStrip}
      />

      {/* abyss */}
      <CTABand
        heading="You already have the footage."
        body="Tell us what you are sitting on and what you want it to do. We will tell you honestly whether we can help."
      />
    </>
  );
}
