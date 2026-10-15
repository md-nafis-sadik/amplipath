import { Metadata } from 'next';
import AfricaMarketTemplate from '@/components/AfricaMarketTemplate';

export const metadata: Metadata = {
  title: 'Africa Market Entry & Growth Services | Amplipath',
  description: 'Grow across African markets with locally informed strategy, digital marketing, WhatsApp campaigns, influencer outreach and market intelligence.',
  alternates: {
    canonical: '/services/africa-market',
  },
  openGraph: {
    title: 'Africa Market Entry & Growth Services | Amplipath',
    description: 'Grow across African markets with locally informed strategy, digital marketing, WhatsApp campaigns, influencer outreach and market intelligence.',
    url: '/services/africa-market',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Africa Market Entry & Growth Services | Amplipath',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Africa Market Entry & Growth Services | Amplipath',
    description: 'Grow across African markets with locally informed strategy, digital marketing, WhatsApp campaigns, influencer outreach and market intelligence.',
    images: ['/images/services-og.jpg'],
  },
};

export default function ServicePage() {
  return <AfricaMarketTemplate />;
}
