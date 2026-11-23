import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/home-services', {
    title: "Roofing & Home Services Marketing | Get Leads | Amplipath",
    description: "Amplipath helps roofers and home service companies get more calls with local SEO, Google Local Services Ads, Google Business Profile and paid search.",
    canonicalUrl: '/industries/home-services',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['roofing'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="roofing" />;
}
