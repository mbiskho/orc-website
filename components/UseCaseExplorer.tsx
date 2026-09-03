'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import VideoPlaceholder from './VideoPlaceholder';
import {
  useCaseFilters,
  type UseCase,
  type UseCaseFilter,
} from '@/lib/content/useCases';

interface UseCaseExplorerProps {
  useCases: UseCase[];
}

/** Elements inside the dialog that can receive focus, in DOM order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function UseCaseExplorer({ useCases }: UseCaseExplorerProps) {
  const [filter, setFilter] = useState<UseCaseFilter>('All');
  const [active, setActive] = useState<UseCase | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // The card that opened the dialog, so focus can be handed back on close.
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const visible = useMemo(
    () =>
      filter === 'All'
        ? useCases
        : useCases.filter((useCase) => useCase.category === filter),
    [filter, useCases],
  );

  // Escape to close, Tab cycles within the dialog, scroll locked behind it.
  useEffect(() => {
    if (!active) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setActive(null);
        // Hand focus back to the card that opened the dialog, so keyboard
        // users resume where they left off rather than at the top of the page.
        openerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const nodes = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  function close(): void {
    setActive(null);
    openerRef.current?.focus();
  }

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter use cases">
        {useCaseFilters.map((option) => {
          const selected = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={selected}
              className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                selected
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-paper text-graphite hover:border-ink hover:text-ink'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ash" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'project' : 'projects'}
      </p>

      {/* Grid */}
      <ul className="mt-8 grid grid-cols-2 gap-5 md:mt-10 lg:grid-cols-3 lg:gap-6">
        {visible.map((useCase) => (
          <li key={useCase.id} className="flex">
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setActive(useCase);
              }}
              aria-haspopup="dialog"
              className="group flex w-full flex-col border border-line bg-shell p-3 text-left transition-colors hover:border-ash md:p-4"
            >
              <VideoPlaceholder />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ash">
                {useCase.category}
              </p>
              <h3 className="mt-2 text-base font-bold tracking-tight text-ink">
                {useCase.clientType}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-graphite">
                {useCase.summary}
              </p>
              <p className="mt-4 text-sm font-bold text-deep-surf">
                {useCase.headlineResult}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {active ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div
            className="absolute inset-0 bg-abyss/70"
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="use-case-title"
            className="relative max-h-[92vh] w-full overflow-y-auto border border-line bg-paper p-6 sm:max-w-3xl sm:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ash">
                  {active.category}
                </p>
                <h2
                  id="use-case-title"
                  className="mt-3 text-2xl font-extrabold tracking-tight text-ink md:text-3xl"
                >
                  {active.clientType}
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 -mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-graphite transition-colors hover:text-ink"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-7 sm:grid-cols-5 sm:gap-9">
              <div className="mx-auto w-2/3 sm:col-span-2 sm:mx-0 sm:w-full">
                <VideoPlaceholder />
              </div>

              <div className="sm:col-span-3">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ash">
                  The brief
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-graphite">
                  {active.brief}
                </p>

                <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ash">
                  Results
                </h3>
                <dl className="mt-4 space-y-4">
                  {active.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col-reverse border-t border-line pt-3"
                    >
                      <dt className="mt-1 text-sm text-graphite">{stat.label}</dt>
                      <dd className="text-3xl font-extrabold tracking-tight text-ink">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
