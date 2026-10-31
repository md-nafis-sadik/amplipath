import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/about', {
    title: 'About Amplipath | Integrated Marketing, Technology & AI',
    description:
      'Meet Amplipath, a global digital marketing, web development and AI agency combining SEO, PPC, software, mobile apps and AI automation to help businesses grow.',
  });
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
