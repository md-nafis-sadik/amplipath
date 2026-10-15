import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Healthcare & Wellness Marketing Agency | Amplipath",
  description: "Amplipath helps clinics, practices and wellness brands attract patients with local SEO, content, paid ads and websites, with advertising rules in mind",
  alternates: {
    canonical: '/industries/healthcare',
  },
  openGraph: {
    title: "Healthcare & Wellness Marketing Agency | Amplipath",
    description: "Amplipath helps clinics, practices and wellness brands attract patients with local SEO, content, paid ads and websites, with advertising rules in mind",
    url: '/industries/healthcare',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Healthcare & Wellness Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Healthcare & Wellness Marketing Agency | Amplipath",
    description: "Amplipath helps clinics, practices and wellness brands attract patients with local SEO, content, paid ads and websites, with advertising rules in mind",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['healthcare'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="healthcare" />;
}
