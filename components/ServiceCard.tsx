import Link from 'next/link';
import type { Service } from '@/lib/content/services';

interface ServiceCardProps {
  service: Service;
  /** Displayed index, e.g. "01". */
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col border border-line bg-shell p-7 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ash">
        {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="mt-5 text-2xl font-bold tracking-tight text-ink">
        {service.name}
      </h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-graphite">
        {service.summary}
      </p>
      <Link
        href={`/services#${service.slug}`}
        className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-deep-surf transition-colors hover:text-ink"
      >
        Read more
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
        <span className="sr-only">about {service.name}</span>
      </Link>
    </article>
  );
}
