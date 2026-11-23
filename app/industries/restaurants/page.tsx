import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/restaurants', {
    title: "Restaurant & Food Service Marketing Agency | Amplipath",
    description: "Amplipath helps restaurants and food businesses fill tables and grow orders with local SEO, Google Business Profile, social media and online ordering websites.",
    canonicalUrl: '/industries/restaurants',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['restaurant'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="restaurant" />;
}
