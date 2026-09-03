import Link from 'next/link';
import VideoPlaceholder from './VideoPlaceholder';
import type { UseCase } from '@/lib/content/useCases';

interface WorkCardProps {
  useCase: UseCase;
}

/**
 * Featured-work tile on the home page. Links through to the use cases page —
 * the interactive, filterable version of the same set lives there.
 */
export default function WorkCard({ useCase }: WorkCardProps) {
  return (
    <Link href="/use-cases" className="group flex h-full w-full flex-col">
      <VideoPlaceholder />
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ash">
        {useCase.category}
      </p>
      <h3 className="mt-2 flex-1 text-base font-bold tracking-tight text-ink transition-colors group-hover:text-deep-surf">
        {useCase.clientType}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-graphite">
        {useCase.headlineResult}
      </p>
    </Link>
  );
}
