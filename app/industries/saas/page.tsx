import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "SaaS & Tech Startup Marketing Agency | Amplipath",
  description: "Amplipath helps SaaS and tech startups generate demos and signups with SEO, content, paid acquisition and AI search visibility, from launch through growth.",
  alternates: {
    canonical: '/industries/saas',
  },
  openGraph: {
    title: "SaaS & Tech Startup Marketing Agency | Amplipath",
    description: "Amplipath helps SaaS and tech startups generate demos and signups with SEO, content, paid acquisition and AI search visibility, from launch through growth.",
    url: '/industries/saas',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - SaaS & Tech Startup Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SaaS & Tech Startup Marketing Agency | Amplipath",
    description: "Amplipath helps SaaS and tech startups generate demos and signups with SEO, content, paid acquisition and AI search visibility, from launch through growth.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['saas'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="saas" />;
}
