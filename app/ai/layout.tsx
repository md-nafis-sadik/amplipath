import type { Metadata } from 'next';
import { getPageMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/ai', {
    title: 'AI & Technology Solutions for Business | Amplipath',
    description:
      'Explore Amplipath’s AI and technology solutions, including intelligent automation, AI agents, chatbots, software integrations and application development.',
  });
}

export default function AiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
