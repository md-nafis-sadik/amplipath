import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Amplipath | Request a Free Proposal Today',
  description: 'Hire Amplipath for digital marketing, SEO, PPC, website and mobile app development, analytics, AI automation, and integrated growth solutions tailored to your business.',
  openGraph: {
    title: 'Contact Amplipath | Request a Free Proposal Today',
    description: 'Hire Amplipath for digital marketing, SEO, PPC, website and mobile app development, analytics, AI automation, and integrated growth solutions tailored to your business.',
    url: '/contact',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/amplipath-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Amplipath',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Amplipath | Request a Free Proposal Today',
    description: 'Hire Amplipath for digital marketing, SEO, PPC, website and mobile app development, analytics, AI automation, and integrated growth solutions tailored to your business.',
    images: ['/images/amplipath-og.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
