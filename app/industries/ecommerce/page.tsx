import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Ecommerce Marketing Agency | Grow Online Sales | Amplipath",
  description: "Amplipath helps ecommerce brands grow with SEO, paid ads, social commerce, conversion optimization and store development, from Shopify to TikTok Shop.",
  alternates: {
    canonical: '/industries/ecommerce',
  },
  openGraph: {
    title: "Ecommerce Marketing Agency | Grow Online Sales | Amplipath",
    description: "Amplipath helps ecommerce brands grow with SEO, paid ads, social commerce, conversion optimization and store development, from Shopify to TikTok Shop.",
    url: '/industries/ecommerce',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Ecommerce Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Ecommerce Marketing Agency | Grow Online Sales | Amplipath",
    description: "Amplipath helps ecommerce brands grow with SEO, paid ads, social commerce, conversion optimization and store development, from Shopify to TikTok Shop.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['ecommerce'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="ecommerce" />;
}
