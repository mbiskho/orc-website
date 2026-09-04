import { offices } from '@/lib/content/locations';
import { services } from '@/lib/content/services';
import {
  contactEmail,
  siteDescription,
  siteName,
  siteUrl,
  socialProfiles,
} from '@/lib/seo';

/**
 * JSON-LD graphs. Values are plain data structures — they are serialised into
 * a <script type="application/ld+json"> by the JsonLd component.
 */
export type JsonLdNode = Record<string, unknown>;

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

/** Postal address + geo for one office, reused by several node types. */
function officeNode(office: (typeof offices)[number]): JsonLdNode {
  return {
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/about#office-${office.id}`,
    name: `${siteName} ${office.city}`,
    parentOrganization: { '@id': organizationId },
    url: `${siteUrl}/about#locations`,
    email: contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress,
      addressLocality: office.locality,
      ...(office.addressRegion ? { addressRegion: office.addressRegion } : {}),
      ...(office.postalCode ? { postalCode: office.postalCode } : {}),
      addressCountry: office.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office.lat,
      longitude: office.lng,
    },
    areaServed: office.country,
  };
}

/** Organization + WebSite, emitted once from the root layout. */
export function organizationGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        email: contactEmail,
        // Derived from the "four years" claim in the site copy — set the real
        // incorporation date here if it differs.
        foundingDate: '2022',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon.svg`,
        },
        image: `${siteUrl}/opengraph-image`,
        sameAs: socialProfiles,
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: contactEmail,
            availableLanguage: ['en', 'id', 'ar'],
          },
        ],
        location: offices.map(officeNode),
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        publisher: { '@id': organizationId },
        inLanguage: 'en-GB',
      },
    ],
  };
}

/** Breadcrumbs for a sub-page. Home is always the first crumb. */
export function breadcrumbGraph(
  crumbs: { name: string; path: string }[],
): JsonLdNode {
  const items = [{ name: 'Home', path: '/' }, ...crumbs];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path === '/' ? '' : crumb.path}`,
    })),
  };
}

/** The four service lines, as an offer catalogue on the services page. */
export function servicesGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: `${siteName} services`,
    url: `${siteUrl}/services`,
    provider: { '@id': organizationId },
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { '@id': organizationId },
        areaServed: offices.map((office) => office.country),
      },
    })),
  };
}

/** Office list for the about page, so the addresses are machine-readable. */
export function officesGraph(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': offices.map(officeNode),
  };
}
