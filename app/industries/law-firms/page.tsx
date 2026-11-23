import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/law-firms', {
    title: "Digital Marketing for Law Firms | Legal SEO | Amplipath",
    description: "Amplipath helps law firms attract qualified clients with legal SEO, Google Ads, local search and website development, built around your practice areas.",
    canonicalUrl: '/industries/law-firms',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['law'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="law" />;
}
