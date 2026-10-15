import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Finance & Fintech Marketing Agency | Amplipath",
  description: "Amplipath helps finance and fintech companies acquire customers and build trust through SEO, paid media, content, web development and analytics.",
  alternates: {
    canonical: '/industries/fintech',
  },
  openGraph: {
    title: "Finance & Fintech Marketing Agency | Amplipath",
    description: "Amplipath helps finance and fintech companies acquire customers and build trust through SEO, paid media, content, web development and analytics.",
    url: '/industries/fintech',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Finance & Fintech Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Finance & Fintech Marketing Agency | Amplipath",
    description: "Amplipath helps finance and fintech companies acquire customers and build trust through SEO, paid media, content, web development and analytics.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['fintech'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="fintech" />;
}
