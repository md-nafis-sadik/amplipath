import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Amplipath | Integrated Marketing, Technology & AI',
  description: 'Meet Amplipath, a global digital marketing, web development and AI agency combining SEO, PPC, software, mobile apps and AI automation to help businesses grow.',
  openGraph: {
    title: 'About Amplipath | Integrated Marketing, Technology & AI',
    description: 'Meet Amplipath, a global digital marketing, web development and AI agency combining SEO, PPC, software, mobile apps and AI automation to help businesses grow.',
    url: '/about',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/amplipath-og.jpg',
        width: 1200,
        height: 630,
        alt: 'About Amplipath',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Amplipath | Integrated Marketing, Technology & AI',
    description: 'Meet Amplipath, a global digital marketing, web development and AI agency combining SEO, PPC, software, mobile apps and AI automation to help businesses grow.',
    images: ['/images/amplipath-og.jpg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
