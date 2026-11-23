import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { submitToIndexNow } from '@/lib/indexnow';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const page = await prisma.pageSeo.findUnique({
      where: { id },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ page });
  } catch (error) {
    console.error('Failed to get page SEO:', error);
    return NextResponse.json({ error: 'Failed to get page SEO' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const {
      pageName,
      seoTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      ogTitle,
      ogDescription,
      ogImage,
      ctaText,
      ctaLink,
      breadcrumbTitle,
    } = body;

    const updated = await prisma.pageSeo.update({
      where: { id },
      data: {
        pageName: pageName ? String(pageName) : undefined,
        seoTitle: seoTitle ? String(seoTitle) : null,
        metaDescription: metaDescription ? String(metaDescription) : null,
        canonicalUrl: canonicalUrl ? String(canonicalUrl) : null,
        noIndex: Boolean(noIndex),
        ogTitle: ogTitle ? String(ogTitle) : null,
        ogDescription: ogDescription ? String(ogDescription) : null,
        ogImage: ogImage ? String(ogImage) : null,
        ctaText: ctaText ? String(ctaText) : null,
        ctaLink: ctaLink ? String(ctaLink) : null,
        breadcrumbTitle: breadcrumbTitle ? String(breadcrumbTitle) : null,
      },
    });

    if (updated.pagePath) {
      revalidatePath(updated.pagePath);
      revalidatePath(updated.pagePath, 'layout');
      if (!updated.noIndex) {
        submitToIndexNow(updated.pagePath).catch((e) =>
          console.error('IndexNow SEO ping error:', e)
        );
      }
    }
    revalidatePath('/');
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ success: true, page: updated });
  } catch (error) {
    console.error('Failed to update page SEO:', error);
    return NextResponse.json({ error: 'Failed to update page SEO' }, { status: 500 });
  }
}
