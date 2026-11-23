import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/real-estate', {
    title: "Real Estate Marketing Agency | Lead Generation | Amplipath",
    description: "Amplipath helps real estate companies, developers and property firms generate property enquiries and qualified leads through SEO, paid ads, automation and conversion-focused websites.",
    canonicalUrl: '/industries/real-estate',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['realestate'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="realestate" />;
}
