import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/nonprofits', {
    title: "Nonprofit & Charity Marketing Agency | Amplipath",
    description: "Amplipath helps nonprofits and charities reach donors, volunteers and supporters with SEO, newsletter, PR, social media, Paid media and fundraising campaign strategy",
    canonicalUrl: '/industries/nonprofits',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['nonprofit'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="nonprofit" />;
}
