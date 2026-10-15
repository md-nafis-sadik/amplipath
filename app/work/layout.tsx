import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Client Case Studies & Results | Amplipath',
  description: 'Explore Amplipath case studies across websites, search, paid media, growth strategy, AI automation and app development, with measurable client outcomes.',
  openGraph: {
    title: 'Our Work | Client Case Studies & Results | Amplipath',
    description: 'Explore Amplipath case studies across websites, search, paid media, growth strategy, AI automation and app development, with measurable client outcomes.',
    url: '/work',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/amplipath-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Client Case Studies & Results',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Client Case Studies & Results | Amplipath',
    description: 'Explore Amplipath case studies across websites, search, paid media, growth strategy, AI automation and app development, with measurable client outcomes.',
    images: ['/images/amplipath-og.jpg'],
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
