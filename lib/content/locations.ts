export interface Office {
  id: string;
  /** Display name for the city, used in the UI. */
  city: string;
  /** Display name for the country, used in the UI. */
  country: string;
  /** Address lines as rendered on the page, in order. */
  lines: string[];
  /**
   * Structured equivalents of the same address, used for the schema.org
   * PostalAddress. Kept explicit rather than parsed out of `lines`, so postal
   * codes and localities stay correct for local search.
   */
  streetAddress: string;
  /** schema.org addressLocality — may be more specific than `city`. */
  locality: string;
  addressRegion?: string;
  /** Omitted where the country has no postal code system, e.g. the UAE. */
  postalCode?: string;
  /** ISO 3166-1 alpha-2, which is what schema.org expects. */
  countryCode: string;
  /** Decimal degrees, north positive. */
  lat: number;
  /** Decimal degrees, east positive. */
  lng: number;
}

/**
 * Addresses are lightly normalised from the source copy: "II 048619" reads as
 * the Singapore postcode, "Britania Raya" and "Uni Emirat Arab" are Indonesian
 * for the United Kingdom and the United Arab Emirates, and the Jakarta address
 * repeated its sub-district several times. Edit here if the originals should be
 * restored verbatim.
 *
 * Order follows the order the offices were opened, and drives both the address
 * list and the globe markers.
 */
export const offices: Office[] = [
  {
    id: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    lines: ['9 Raffles Place', '#16-20 Republic Plaza', 'Singapore 048619'],
    streetAddress: '9 Raffles Place, #16-20 Republic Plaza',
    locality: 'Singapore',
    postalCode: '048619',
    countryCode: 'SG',
    lat: 1.2839,
    lng: 103.8515,
  },
  {
    id: 'london',
    city: 'London',
    country: 'United Kingdom',
    lines: ['1 Ebury Bridge Road', 'London SW1W 8PX', 'United Kingdom'],
    streetAddress: '1 Ebury Bridge Road',
    locality: 'London',
    postalCode: 'SW1W 8PX',
    countryCode: 'GB',
    lat: 51.4886,
    lng: -0.1478,
  },
  {
    id: 'jakarta',
    city: 'Jakarta',
    country: 'Indonesia',
    lines: [
      'Floor 11, Menara Prima',
      'Jl. Lingkar Mega Kuningan No. 2, Blok 6',
      'Kuningan Timur, Setiabudi',
      'South Jakarta 12950, Indonesia',
    ],
    streetAddress:
      'Floor 11, Menara Prima, Jl. Lingkar Mega Kuningan No. 2, Blok 6, Kuningan Timur, Setiabudi',
    locality: 'South Jakarta',
    addressRegion: 'Jakarta',
    postalCode: '12950',
    countryCode: 'ID',
    lat: -6.2265,
    lng: 106.8275,
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'United Arab Emirates',
    lines: [
      '124 22D Street',
      'Al Safa First, Al Safa',
      'Dubai, United Arab Emirates',
    ],
    streetAddress: '124 22D Street, Al Safa First, Al Safa',
    locality: 'Dubai',
    // The UAE does not operate a postal code system, so postalCode is omitted.
    countryCode: 'AE',
    lat: 25.1772,
    lng: 55.2436,
  },
];
