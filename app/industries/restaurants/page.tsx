import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Restaurant & Food Service Marketing Agency | Amplipath",
  description: "Amplipath helps restaurants and food businesses fill tables and grow orders with local SEO, Google Business Profile, social media and online ordering websites.",
  alternates: {
    canonical: '/industries/restaurants',
  },
  openGraph: {
    title: "Restaurant & Food Service Marketing Agency | Amplipath",
    description: "Amplipath helps restaurants and food businesses fill tables and grow orders with local SEO, Google Business Profile, social media and online ordering websites.",
    url: '/industries/restaurants',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Restaurant & Food Service Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Restaurant & Food Service Marketing Agency | Amplipath",
    description: "Amplipath helps restaurants and food businesses fill tables and grow orders with local SEO, Google Business Profile, social media and online ordering websites.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['restaurant'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="restaurant" />;
}
