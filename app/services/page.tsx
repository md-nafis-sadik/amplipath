import type { Metadata } from 'next';
import ServicesClient from '@/components/ServicesClient';

export const metadata: Metadata = {
  title: 'Our Services | Marketing, Web & AI Solutions | Amplipath',
  description: "Explore Amplipath's full range of services: SEO, GEO/AEO, paid media, content strategy, analytics, web and app development, and AI automation.",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'Our Services | Marketing, Web & AI Solutions | Amplipath',
    description: "Explore Amplipath's full range of services: SEO, GEO/AEO, paid media, content strategy, analytics, web and app development, and AI automation.",
    url: '/services',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Services — Marketing, Web & AI Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Marketing, Web & AI Solutions | Amplipath',
    description: "Explore Amplipath's full range of services: SEO, GEO/AEO, paid media, content strategy, analytics, web and app development, and AI automation.",
    images: ['/images/services-og.jpg'],
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
