import Link from 'next/link';
import Logo from './Logo';

const footerNav = [
  { href: '/services', label: 'Services' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/about', label: 'About' },
] as const;

export default function Footer() {
  return (
    <footer className="on-navy bg-abyss">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-navy-body">
              A media agency turning long-form content into short-form
              performance. Clipping, paid media, and social pages.
            </p>
          </div>

          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper">
                Pages
              </h2>
              <ul className="mt-4 space-y-3">
                {footerNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-navy-body transition-colors hover:text-glow"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-paper">
                Contact
              </h2>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="mailto:contact@orcacast.com"
                    className="text-sm text-navy-body transition-colors hover:text-glow"
                  >
                    contact@orcacast.com
                  </a>
                </li>
                <li>
                  <Link
                    href="/about#contact"
                    className="text-sm text-navy-body transition-colors hover:text-glow"
                  >
                    Book a call
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-current pt-8">
          <p className="text-xs text-navy-body">
            &copy; {new Date().getFullYear()} Orcacast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
