import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "Nonprofit & Charity Marketing Agency | Amplipath",
  description: "Amplipath helps nonprofits and charities reach donors, volunteers and supporters with SEO, newsletter, PR, social media, Paid media and fundraising campaign strategy",
  alternates: {
    canonical: '/industries/nonprofits',
  },
  openGraph: {
    title: "Nonprofit & Charity Marketing Agency | Amplipath",
    description: "Amplipath helps nonprofits and charities reach donors, volunteers and supporters with SEO, newsletter, PR, social media, Paid media and fundraising campaign strategy",
    url: '/industries/nonprofits',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - Nonprofit & Charity Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nonprofit & Charity Marketing Agency | Amplipath",
    description: "Amplipath helps nonprofits and charities reach donors, volunteers and supporters with SEO, newsletter, PR, social media, Paid media and fundraising campaign strategy",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['nonprofit'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="nonprofit" />;
}
