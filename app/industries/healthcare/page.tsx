import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/healthcare', {
    title: "Healthcare & Wellness Marketing Agency | Amplipath",
    description: "Amplipath helps clinics, practices and wellness brands attract patients with local SEO, content, paid ads and websites, with advertising rules in mind",
    canonicalUrl: '/industries/healthcare',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['healthcare'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="healthcare" />;
}
