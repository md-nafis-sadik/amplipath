import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  let dbSeo: any = null;
  try {
    dbSeo = await prisma.pageSeo.findUnique({
      where: { pagePath: '/work' },
    });
  } catch (err) {
    // Database offline fallback
  }

  const title = dbSeo?.seoTitle || 'Our Work | Client Case Studies & Results | Amplipath';
  const description =
    dbSeo?.metaDescription ||
    'Explore Amplipath case studies across websites, search, paid media, growth strategy, AI automation and app development, with measurable client outcomes.';
  const canonical = dbSeo?.canonicalUrl || '/work';
  const ogImg = dbSeo?.ogImage || '/images/logo-horizontal.jpg';

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    robots: dbSeo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: dbSeo?.ogTitle || title,
      description: dbSeo?.ogDescription || description,
      url: canonical,
      siteName: 'AMPLIPATH',
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dbSeo?.ogTitle || title,
      description: dbSeo?.ogDescription || description,
      images: [ogImg],
    },
  };
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
