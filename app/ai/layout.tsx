import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI & Technology Solutions for Business | Amplipath',
  description: 'Explore Amplipath’s AI and technology solutions, including intelligent automation, AI agents, chatbots, software integrations and application development.',
  openGraph: {
    title: 'AI & Technology Solutions for Business | Amplipath',
    description: 'Explore Amplipath’s AI and technology solutions, including intelligent automation, AI agents, chatbots, software integrations and application development.',
    url: '/ai',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/logo-horizontal.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath AI & Technology Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI & Technology Solutions for Business | Amplipath',
    description: 'Explore Amplipath’s AI and technology solutions, including intelligent automation, AI agents, chatbots, software integrations and application development.',
    images: ['/images/logo-horizontal.jpg'],
  },
};

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
