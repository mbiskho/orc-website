import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbGraph } from '@/lib/structuredData';
import UseCaseExplorer from '@/components/UseCaseExplorer';
import ScrollReveal from '@/components/ScrollReveal';
import { useCases } from '@/lib/content/useCases';

export const metadata: Metadata = pageMetadata({
  title: 'Case Studies and Client Results',
  description:
    'Nine client projects in clipping, paid media, and page growth, each with the brief and the numbers — from 18M views to a 41% drop in cost per acquisition.',
  path: '/use-cases',
});

const resultsBand = [
  { value: '120M+', label: 'Views across all client work' },
  { value: '41%', label: 'Average drop in cost per acquisition' },
  { value: '9', label: 'Projects shown here' },
];

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Use cases', path: '/use-cases' }])} />

      {/* paper — header, filters, and grid */}
      <section className="bg-paper" aria-labelledby="use-cases-title">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
          <ScrollReveal>
            {/* The one sand accent on this page. */}
            <span className="block h-px w-16 bg-sand" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-ash">
              Use cases
            </p>
            <h1
              id="use-cases-title"
              className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-6xl"
            >
              Work we have shipped.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
              Nine projects, filtered by service. Open any one for the brief and
              the numbers. Client names are withheld where they asked us to.
            </p>
          </ScrollReveal>

          <div className="mt-12 md:mt-16">
            <UseCaseExplorer useCases={useCases} />
          </div>
        </div>
      </section>

      {/* deep-sea — results band */}
      <section
        className="on-navy bg-deep-sea py-32 md:py-40"
        aria-labelledby="results-heading"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            <h2
              id="results-heading"
              className="max-w-2xl text-3xl font-extrabold tracking-tight text-paper md:text-4xl"
            >
              Across the whole book of work.
            </h2>
          </ScrollReveal>

          <dl className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            {resultsBand.map((stat, index) => (
              <ScrollReveal
                key={stat.label}
                delay={index * 90}
                className="flex flex-col-reverse"
              >
                <dt className="mt-3 text-sm uppercase tracking-[0.16em] text-navy-body">
                  {stat.label}
                </dt>
                <dd className="text-6xl font-extrabold tracking-tight text-glow md:text-7xl">
                  {stat.value}
                </dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
