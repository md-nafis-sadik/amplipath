import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Roofing & Home Services Marketing | Get Leads | Amplipath",
  description: "Amplipath helps roofers and home service companies get more calls with local SEO, Google Local Services Ads, Google Business Profile and paid search.",
  alternates: {
    canonical: '/industries/home-services',
  },
  openGraph: {
    title: "Roofing & Home Services Marketing | Get Leads | Amplipath",
    description: "Amplipath helps roofers and home service companies get more calls with local SEO, Google Local Services Ads, Google Business Profile and paid search.",
    url: '/industries/home-services',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Roofing & Home Services Marketing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Roofing & Home Services Marketing | Get Leads | Amplipath",
    description: "Amplipath helps roofers and home service companies get more calls with local SEO, Google Local Services Ads, Google Business Profile and paid search.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['roofing'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="roofing" />;
}
