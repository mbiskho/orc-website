'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delay?: number;
  /**
   * Element to render. Defaults to a div; pass 'li' inside an <ol>/<ul> so the
   * wrapper does not break list markup.
   */
  as?: 'div' | 'li';
  className?: string;
}

/**
 * Fades content up once, the first time it enters the viewport.
 *
 * The hidden state lives in a `.reveal` class in globals.css rather than in
 * Tailwind utilities here, so it can be switched off wholesale by the
 * reduced-motion media query and by the <noscript> override in the root layout.
 * Content is therefore never permanently hidden when JavaScript does not run.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  as = 'div',
  className,
}: ScrollRevealProps) {
  const nodeRef = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  // Callback ref, so the same handler can attach to either element type.
  const setRef = (node: HTMLElement | null): void => {
    nodeRef.current = node;
  };

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -80px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const props = {
    ref: setRef,
    className: `reveal ${className ?? ''}`,
    'data-shown': shown ? 'true' : 'false',
    style: (delay ? { transitionDelay: `${delay}ms` } : undefined) as
      | CSSProperties
      | undefined,
  };

  return as === 'li' ? <li {...props}>{children}</li> : <div {...props}>{children}</div>;
}
