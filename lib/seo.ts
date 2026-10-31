import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

export async function getPageMetadata(
  pagePath: string,
  fallback: {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
  }
): Promise<Metadata> {
  let dbSeo: any = null;
  try {
    dbSeo = await prisma.pageSeo.findUnique({
      where: { pagePath },
    });
  } catch (err) {
    // Database offline fallback
  }

  const title = dbSeo?.seoTitle || fallback.title;
  const description = dbSeo?.metaDescription || fallback.description;
  const canonical = dbSeo?.canonicalUrl || fallback.canonicalUrl || pagePath;
  const ogImg = dbSeo?.ogImage || fallback.ogImage || '/images/logo-horizontal.jpg';

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
