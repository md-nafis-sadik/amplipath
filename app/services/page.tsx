import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/services', {
    title: 'Our Services | Marketing, Web & AI Solutions | Amplipath',
    description:
      "Explore Amplipath's full range of services: SEO, GEO/AEO, paid media, content strategy, analytics, web and app development, and AI automation.",
    ogImage: '/images/services-og.jpg',
  });
}

export default function ServicesPage() {
  return <ServicesClient />;
}
