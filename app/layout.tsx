import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import ModalRoot from '@/components/ModalRoot';
import { ModalProvider } from '@/components/ModalContext';

export const metadata: Metadata = {
  title: 'AMPLIPATH — Digital Marketing, Technology & AI Agency',
  description:
    'AMPLIPATH is an integrated growth company combining digital marketing, technology and AI into one unified system — grow faster, operate smarter, scale with confidence.',
  openGraph: {
    title: 'AMPLIPATH — Digital Marketing, Technology & AI Agency',
    description:
      'AMPLIPATH is an integrated growth company combining digital marketing, technology and AI into one unified system.',
    url: 'https://amplipath.com',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/logo-horizontal.jpg',
        width: 1200,
        height: 630,
        alt: 'AMPLIPATH',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/logo-icon.jpg',
    shortcut: '/images/logo-icon.jpg',
    apple: '/images/logo-icon.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo-icon.jpg" />
      </head>
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <ModalProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ModalRoot />
          <ChatWidget />
        </ModalProvider>
      </body>
    </html>
  );
}
