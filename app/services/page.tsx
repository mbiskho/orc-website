import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbGraph, servicesGraph } from '@/lib/structuredData';
import CTABand from '@/components/CTABand';
import ProcessSteps from '@/components/ProcessSteps';
import ScrollReveal from '@/components/ScrollReveal';
import { services, processDetailed } from '@/lib/content/services';

export const metadata: Metadata = pageMetadata({
  title: 'Clipping, UGC, Paid Media, and Content Strategy',
  description:
    'Clipping, UGC, paid media, and content strategy. What each service includes, who it is for, and how an engagement runs. Retainer-based, scoped per client.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'Services', path: '/services' }])} />
      <JsonLd data={servicesGraph()} />

      {/* paper */}
      <section className="bg-paper" aria-labelledby="services-title">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <ScrollReveal>
            {/* The one sand accent on this page. */}
            <span className="block h-px w-16 bg-sand" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-ash">
              Services
            </p>
            <h1
              id="services-title"
              className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-6xl"
            >
              Four service lines, built to run together.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
              Clipping makes assets out of the footage you have. UGC makes the
              footage you do not. Paid media puts weight behind whichever ones
              win. Content strategy gives them somewhere to live.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Alternating paper and shell, one block per service. */}
      {services.map((service, index) => {
        const shell = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            aria-labelledby={`${service.slug}-heading`}
            className={`scroll-mt-24 py-20 md:py-28 ${shell ? 'bg-shell' : 'bg-paper'}`}
          >
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                <ScrollReveal className="lg:col-span-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ash">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2
                    id={`${service.slug}-heading`}
                    className="mt-5 text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
                  >
                    {service.name}
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-graphite">
                    {service.description}
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={90} className="lg:col-span-7">
                  <div
                    className={`border border-line p-7 md:p-9 ${
                      shell ? 'bg-paper' : 'bg-shell'
                    }`}
                  >
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ash">
                      What&rsquo;s included
                    </h3>
                    <ul className="mt-5 space-y-3.5">
                      {service.included.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-surf"
                          />
                          <span className="text-[15px] leading-relaxed text-graphite">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-9 text-xs font-semibold uppercase tracking-[0.18em] text-ash">
                      Who it&rsquo;s for
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-graphite">
                      {service.forWho}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* deep-sea */}
      <ProcessSteps
        tone="navy"
        heading="How an engagement runs."
        intro="The same four stages whichever service you start with."
        steps={processDetailed}
      />

      {/* abyss */}
      <CTABand
        heading="Retainer-based, scoped per client."
        body="We do not publish prices, because the work is not the same twice. A weekly podcast needs a different shape from a six-location paid account. Tell us the volume and the goal and we will send a scoped number, usually within two working days."
        ctaLabel="Get a scoped quote"
      />
    </>
  );
}
