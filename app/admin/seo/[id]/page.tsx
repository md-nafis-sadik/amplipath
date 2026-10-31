import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import SeoForm from '@/components/admin/SeoForm';

export const dynamic = 'force-dynamic';

export default async function EditSeoPage({ params }: { params: { id: string } }) {
  const pageId = parseInt(params.id, 10);
  if (isNaN(pageId)) {
    notFound();
  }

  const page = await prisma.pageSeo.findUnique({
    where: { id: pageId },
  });

  if (!page) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <SeoForm
        initialData={{
          id: page.id,
          pagePath: page.pagePath,
          pageName: page.pageName,
          pageType: page.pageType,
          seoTitle: page.seoTitle,
          metaDescription: page.metaDescription,
          canonicalUrl: page.canonicalUrl,
          noIndex: page.noIndex,
          ogTitle: page.ogTitle,
          ogDescription: page.ogDescription,
          ogImage: page.ogImage,
          ctaText: page.ctaText,
          ctaLink: page.ctaLink,
          breadcrumbTitle: page.breadcrumbTitle,
          updatedAt: page.updatedAt.toISOString(),
        }}
      />
    </div>
  );
}
