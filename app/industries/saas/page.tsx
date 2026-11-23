import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/saas', {
    title: "SaaS & Tech Startup Marketing Agency | Amplipath",
    description: "Amplipath helps SaaS and tech startups generate demos and signups with SEO, content, paid acquisition and AI search visibility, from launch through growth.",
    canonicalUrl: '/industries/saas',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['saas'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="saas" />;
}
