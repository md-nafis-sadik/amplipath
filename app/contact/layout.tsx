import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/contact', {
    title: 'Contact Amplipath | Request a Free Proposal Today',
    description:
      'Hire Amplipath for digital marketing, SEO, PPC, website and mobile app development, analytics, AI automation, and integrated growth solutions tailored to your business.',
  });
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
