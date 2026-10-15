import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Digital Marketing for Law Firms | Legal SEO | Amplipath",
  description: "Amplipath helps law firms attract qualified clients with legal SEO, Google Ads, local search and website development, built around your practice areas.",
  alternates: {
    canonical: '/industries/law-firms',
  },
  openGraph: {
    title: "Digital Marketing for Law Firms | Legal SEO | Amplipath",
    description: "Amplipath helps law firms attract qualified clients with legal SEO, Google Ads, local search and website development, built around your practice areas.",
    url: '/industries/law-firms',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Digital Marketing for Law Firms',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Digital Marketing for Law Firms | Legal SEO | Amplipath",
    description: "Amplipath helps law firms attract qualified clients with legal SEO, Google Ads, local search and website development, built around your practice areas.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['law'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="law" />;
}
