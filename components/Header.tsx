'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/about', label: 'About' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) panelRef.current?.querySelector('a')?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link
          href="/"
          className="rounded-sm"
          aria-label="Orcacast, home"
        >
          <Logo variant="dark" />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors hover:text-ink ${
                      active ? 'text-ink' : 'text-graphite'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/about#contact"
                className="rounded-full bg-surf px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-deep-surf hover:text-paper"
              >
                Book a call
              </Link>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink md:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </>
            ) : (
              <>
                <line x1="3.5" y1="8" x2="20.5" y2="8" />
                <line x1="3.5" y1="16" x2="20.5" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-line bg-paper md:hidden"
        >
          <nav aria-label="Primary, mobile">
            <ul className="mx-auto max-w-6xl px-5 py-3">
              {navLinks.map((link) => (
                <li key={link.href} className="border-b border-line last:border-0">
                  <Link
                    href={link.href}
                    aria-current={pathname.startsWith(link.href) ? 'page' : undefined}
                    className="block py-4 text-lg font-medium text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-5 pb-2">
                <Link
                  href="/about#contact"
                  className="block rounded-full bg-surf px-5 py-3.5 text-center text-base font-semibold text-ink"
                >
                  Book a call
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
