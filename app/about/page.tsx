import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbGraph, officesGraph } from '@/lib/structuredData';
import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import LocationGlobe from '@/components/LocationGlobe';
import ScrollReveal from '@/components/ScrollReveal';
import { principles, team } from '@/lib/content/principles';

export const metadata: Metadata = pageMetadata({
  title: 'Who We Are and How We Work',
  description:
    'A media agency built on craft, not volume. Four years in, with offices in Singapore, London, Jakarta, and Dubai. Why we started and how we work.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbGraph([{ name: 'About', path: '/about' }])} />
      <JsonLd data={officesGraph()} />

      {/* paper — header */}
      <section className="bg-paper" aria-labelledby="about-title">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 md:px-8 md:pb-24 md:pt-24">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ash">
              About
            </p>
            <h1
              id="about-title"
              className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-6xl"
            >
              A media agency built on craft, not volume.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-graphite md:text-lg">
              Four years in, across four offices, we still take on a small
              number of clients and give their footage the attention it needs.
              That is the whole model.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* shell — story */}
      <section className="bg-shell py-20 md:py-28" aria-labelledby="story-heading">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-4">
              <h2
                id="story-heading"
                className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
              >
                Why we started.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={90} className="lg:col-span-8">
              <div className="max-w-2xl space-y-6 text-base leading-relaxed text-graphite">
                <p>
                  We kept meeting people with archives. Years of episodes, hours
                  of stream, whole shoots that ran once and were never touched
                  again. The content was good. There was just no system for
                  getting it in front of anyone.
                </p>
                <p>
                  The agencies they had tried worked on volume. Sixty clips a
                  month, delivered by someone who had not watched the episode,
                  cut to a template that looked the same for every client. It
                  filled a folder and it did not move.
                </p>
                <p>
                  So we built the opposite. A small team that watches the
                  footage, cuts fewer things properly, and sits close enough to
                  the paid side to know which angles are worth putting money
                  behind. That is a slower business to run. It is also the only
                  version we wanted to work at.
                </p>
                <p>
                  Four years and sixty-odd clients later, the model has held.
                  We have added offices in London, Jakarta, and Dubai, and not
                  much else has changed.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* deep-sea — principles */}
      <section
        className="on-navy bg-deep-sea py-32 md:py-40"
        aria-labelledby="principles-heading"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            <h2
              id="principles-heading"
              className="max-w-2xl text-3xl font-extrabold tracking-tight text-paper md:text-4xl"
            >
              How we work.
            </h2>
          </ScrollReveal>

          <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {principles.map((principle, index) => (
              <ScrollReveal
                key={principle.number}
                as="li"
                delay={index * 80}
                className="h-full border border-current bg-open-water p-7 md:p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-glow">
                  {principle.number}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-paper">
                  {principle.title}
                </h3>
                <p className="mt-3.5 text-[15px] leading-relaxed text-navy-body">
                  {principle.description}
                </p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      {/* paper — team */}
      <section className="bg-paper py-20 md:py-28" aria-labelledby="team-heading">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            {/* The one sand accent on this page. */}
            <span className="block h-px w-16 bg-sand" />
            <h2
              id="team-heading"
              className="mt-8 text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
            >
              Who you will work with.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-graphite">
              Small team, no account layer. The people on the call are the people
              doing the work.
            </p>
          </ScrollReveal>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {team.map((member, index) => (
              <ScrollReveal
                key={member.role}
                as="li"
                delay={index * 90}
                className="border border-line bg-shell p-6 md:p-7"
              >
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role} at Orcacast`}
                  width={800}
                  height={800}
                  sizes="(min-width: 640px) 20rem, 100vw"
                  className="aspect-square w-full object-cover"
                />
                <h3 className="mt-6 text-xl font-bold tracking-tight text-ink">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-ash">
                  {member.role}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-graphite">
                  {member.bio}
                </p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* deep-sea — locations */}
      <section
        id="locations"
        className="on-navy scroll-mt-20 bg-deep-sea py-32 md:py-40"
        aria-labelledby="locations-heading"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <ScrollReveal>
            <h2
              id="locations-heading"
              className="max-w-2xl text-3xl font-extrabold tracking-tight text-paper md:text-4xl"
            >
              Four offices, one team.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-body">
              Singapore, London, Jakarta, and Dubai. Between them we cover
              most working hours, so footage sent overnight is usually in the
              edit by morning.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={90} className="mt-14">
            <LocationGlobe />
          </ScrollReveal>
        </div>
      </section>

      {/* shell — contact */}
      <section
        id="contact"
        className="scroll-mt-20 bg-shell py-20 md:py-28"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              <h2
                id="contact-heading"
                className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl"
              >
                Book a call.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">
                Tell us what you are working with and what you want from it. We
                read everything ourselves and reply within one working day.
              </p>
              <p className="mt-8 text-sm text-graphite">
                Prefer email?{' '}
                <a
                  href="mailto:contact@orcacast.com"
                  className="font-semibold text-deep-surf underline underline-offset-4 transition-colors hover:text-ink"
                >
                  contact@orcacast.com
                </a>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={90} className="lg:col-span-7">
              <ContactForm />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
