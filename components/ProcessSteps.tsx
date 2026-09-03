import ScrollReveal from './ScrollReveal';
import type { ProcessStep } from '@/lib/content/services';

interface ProcessStepsProps {
  steps: ProcessStep[];
  heading: string;
  intro?: string;
  /** Ground the section sits on, which sets the type colours. */
  tone?: 'light' | 'navy';
}

export default function ProcessSteps({
  steps,
  heading,
  intro,
  tone = 'light',
}: ProcessStepsProps) {
  const navy = tone === 'navy';

  return (
    <section
      className={
        navy ? 'on-navy bg-deep-sea py-32 md:py-40' : 'bg-shell py-20 md:py-28'
      }
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <h2
            id="process-heading"
            className={`max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl ${
              navy ? 'text-paper' : 'text-ink'
            }`}
          >
            {heading}
          </h2>
          {intro ? (
            <p
              className={`mt-5 max-w-xl text-base leading-relaxed ${
                navy ? 'text-navy-body' : 'text-graphite'
              }`}
            >
              {intro}
            </p>
          ) : null}
        </ScrollReveal>

        <ol className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <ScrollReveal
              key={step.number}
              as="li"
              delay={index * 80}
              className={`h-full border p-6 md:p-7 ${
                navy ? 'border-current bg-open-water' : 'border-line bg-paper'
              }`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                  navy ? 'text-glow' : 'text-deep-surf'
                }`}
              >
                {step.number}
              </span>
              <h3
                className={`mt-4 text-lg font-bold tracking-tight ${
                  navy ? 'text-paper' : 'text-ink'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  navy ? 'text-navy-body' : 'text-graphite'
                }`}
              >
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
