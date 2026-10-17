import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import ModalRoot from '@/components/ModalRoot';
import ScrollMotion from '@/components/ScrollMotion';
import { ModalProvider } from '@/components/ModalContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://amplipath.com'),
  title: 'Amplipath | Digital Marketing, SEO, PPC & AI Agency',
  description:
    'Amplipath is a digital marketing and AI agency offering SEO, PPC, web and mobile app development, AI automation and AI agents for businesses worldwide.',
  openGraph: {
    title: 'Amplipath | Digital Marketing, SEO, PPC & AI Agency',
    description:
      'Amplipath is a digital marketing and AI agency offering SEO, PPC, web and mobile app development, AI automation and AI agents for businesses worldwide.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Amplipath | Digital Marketing, SEO, PPC & AI Agency',
    description:
      'Amplipath is a digital marketing and AI agency offering SEO, PPC, web and mobile app development, AI automation and AI agents for businesses worldwide.',
    images: ['/images/logo-horizontal.jpg'],
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
          <ScrollMotion />
        </ModalProvider>
      </body>
    </html>
  );
}
