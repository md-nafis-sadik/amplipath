import type { Metadata } from 'next';
import IndustriesClient from '@/components/IndustriesClient';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries', {
    title: 'Industries We Serve | Amplipath Marketing & AI Solutions',
    description:
      'Amplipath delivers tailored marketing and technology solutions across SaaS, ecommerce, course, game, healthcare, real estate and more, including Africa markets.',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustriesPage() {
  return <IndustriesClient />;
}
