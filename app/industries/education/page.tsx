import type { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/industries/education', {
    title: "Course & Education Marketing Agency | Amplipath",
    description: "Grow course enrolments and student conversions with SEO, paid ads, sales funnels and marketing for Udemy, Kajabi and other learning platforms.",
    canonicalUrl: '/industries/education',
    ogImage: '/images/industries-og.jpg',
  });
}

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['course'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="course" />;
}
