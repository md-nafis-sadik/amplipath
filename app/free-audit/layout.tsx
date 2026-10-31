import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/free-audit', {
    title: 'Free Growth & Digital Marketing Audit | Amplipath',
    description:
      'Request a free, in-depth growth audit for your website, search ranking, paid media, and conversion performance from Amplipath.',
  });
}

export default function FreeAuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
