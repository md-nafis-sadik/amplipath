import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Real Estate Marketing Agency | Lead Generation | Amplipath",
  description: "Amplipath helps real estate companies, developers and property firms generate property enquiries and qualified leads through SEO, paid ads, automation and conversion-focused websites.",
  alternates: {
    canonical: '/industries/real-estate',
  },
  openGraph: {
    title: "Real Estate Marketing Agency | Lead Generation | Amplipath",
    description: "Amplipath helps real estate companies, developers and property firms generate property enquiries and qualified leads through SEO, paid ads, automation and conversion-focused websites.",
    url: '/industries/real-estate',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Real Estate Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Real Estate Marketing Agency | Lead Generation | Amplipath",
    description: "Amplipath helps real estate companies, developers and property firms generate property enquiries and qualified leads through SEO, paid ads, automation and conversion-focused websites.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['realestate'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="realestate" />;
}
