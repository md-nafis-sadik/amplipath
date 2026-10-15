import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://amplipath.com'),
  openGraph: {
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/industries-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Industries',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/industries-og.jpg'],
  },
};

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
