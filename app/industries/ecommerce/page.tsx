import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/ecommerce', {
    title: "Ecommerce Marketing Agency | Grow Online Sales | Amplipath",
    description: "Amplipath helps ecommerce brands grow with SEO, paid ads, social commerce, conversion optimization and store development, from Shopify to TikTok Shop.",
    canonicalUrl: '/industries/ecommerce',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['ecommerce'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="ecommerce" />;
}
