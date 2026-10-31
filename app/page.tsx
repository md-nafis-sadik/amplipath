import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';
import HomePageClient from '@/components/HomePageClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/', {
    title: 'Amplipath | Digital Marketing, SEO, PPC & AI Agency',
    description:
      'Amplipath is a digital marketing and AI agency offering SEO, PPC, web and mobile app development, AI automation and AI agents for businesses worldwide.',
  });
}

export default function HomePage() {
  return <HomePageClient />;
}
