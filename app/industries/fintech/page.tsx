import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/fintech', {
    title: "Finance & Fintech Marketing Agency | Amplipath",
    description: "Amplipath helps finance and fintech companies acquire customers and build trust through SEO, paid media, content, web development and analytics.",
    canonicalUrl: '/industries/fintech',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['fintech'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="fintech" />;
}
