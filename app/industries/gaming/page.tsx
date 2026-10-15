import { Metadata } from 'next';
import { INDUSTRIES_DATA } from '@/data/industriesData';
import IndustryPageTemplate from '@/components/IndustryPageTemplate';

export const metadata: Metadata = {
  title: "App & Game Marketing Agency | Launch & Grow | Amplipath",
  description: "Amplipath markets mobile apps and games through app store optimization, Steam wishlist campaigns, paid user acquisition and community building to increase app installs, game downloads and user retention.",
  alternates: {
    canonical: '/industries/gaming',
  },
  openGraph: {
    title: "App & Game Marketing Agency | Launch & Grow | Amplipath",
    description: "Amplipath markets mobile apps and games through app store optimization, Steam wishlist campaigns, paid user acquisition and community building to increase app installs, game downloads and user retention.",
    url: '/industries/gaming',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries - App & Game Marketing Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "App & Game Marketing Agency | Launch & Grow | Amplipath",
    description: "Amplipath markets mobile apps and games through app store optimization, Steam wishlist campaigns, paid user acquisition and community building to increase app installs, game downloads and user retention.",
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustryPage() {
  const data = INDUSTRIES_DATA['game'] || Object.values(INDUSTRIES_DATA)[0];
  return <IndustryPageTemplate data={data} industryKey="game" />;
}
