import type { JsonLdNode } from '@/lib/structuredData';

interface JsonLdProps {
  data: JsonLdNode;
}

/**
 * Emits a JSON-LD block. The payload is built from typed data in lib/, never
 * from user input, and `<` is escaped so the serialised JSON cannot terminate
 * the surrounding <script> element early.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
