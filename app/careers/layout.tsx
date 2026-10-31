import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/careers', {
    title: 'Careers at Amplipath | Work with Global Growth Specialists',
    description:
      'Join the Amplipath team of digital marketing, web development, SEO, and AI specialists. Explore our remote and contract career opportunities.',
  });
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
