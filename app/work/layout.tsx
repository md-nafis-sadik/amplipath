import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/work', {
    title: 'Our Work | Client Case Studies & Results | Amplipath',
    description:
      'Explore Amplipath case studies across websites, search, paid media, growth strategy, AI automation and app development, with measurable client outcomes.',
  });
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
