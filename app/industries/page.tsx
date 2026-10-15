import type { Metadata } from 'next';
import IndustriesClient from '@/components/IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | Amplipath Marketing & AI Solutions',
  description:
    'Amplipath delivers tailored marketing and technology solutions across SaaS, ecommerce, course, game, healthcare, real estate and more, including Africa markets.',
  alternates: {
    canonical: '/industries',
  },
  openGraph: {
    title: 'Industries We Serve | Amplipath Marketing & AI Solutions',
    description:
      'Amplipath delivers tailored marketing and technology solutions across SaaS, ecommerce, course, game, healthcare, real estate and more, including Africa markets.',
    url: '/industries',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries We Serve',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industries We Serve | Amplipath Marketing & AI Solutions',
    description:
      'Amplipath delivers tailored marketing and technology solutions across SaaS, ecommerce, course, game, healthcare, real estate and more, including Africa markets.',
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
