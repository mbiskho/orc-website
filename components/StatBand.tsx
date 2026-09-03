import ScrollReveal from './ScrollReveal';

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: '120M+', label: 'Views generated' },
  { value: '14,000', label: 'Clips delivered' },
  { value: '60+', label: 'Clients served' },
];

export default function StatBand() {
  return (
    <section
      className="on-navy bg-deep-sea py-32 md:py-40"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <h2
          id="stats-heading"
          className="max-w-2xl text-2xl font-bold tracking-tight text-paper md:text-3xl"
        >
          Four years of work, in three numbers.
        </h2>
        {/*
          ScrollReveal renders the grouping <div> that <dl> allows around each
          name/value pair, so the term stays before its definition in the DOM
          while flex-col-reverse puts the number on top visually.
        */}
        <dl className="mt-14 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              delay={index * 90}
              className="flex flex-col-reverse"
            >
              <dt className="mt-3 text-sm uppercase tracking-[0.16em] text-navy-body">
                {stat.label}
              </dt>
              <dd className="text-6xl font-extrabold tracking-tight text-glow md:text-7xl lg:text-8xl">
                {stat.value}
              </dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
