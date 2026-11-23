import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/gaming', {
    title: "App & Game Marketing Agency | Launch & Grow | Amplipath",
    description: "Amplipath markets mobile apps and games through app store optimization, Steam wishlist campaigns, paid user acquisition and community building to increase app installs, game downloads and user retention.",
    canonicalUrl: '/industries/gaming',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['game'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="game" />;
}
