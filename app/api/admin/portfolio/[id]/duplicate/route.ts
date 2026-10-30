import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const original = await prisma.caseStudy.findUnique({ where: { id } });

    if (!original) {
      return NextResponse.json({ error: 'Original case study not found' }, { status: 404 });
    }

    let duplicateSlug = `${original.slug}-copy`;
    let count = 1;
    while (await prisma.caseStudy.findUnique({ where: { slug: duplicateSlug } })) {
      duplicateSlug = `${original.slug}-copy-${count}`;
      count++;
    }

    const duplicated = await prisma.caseStudy.create({
      data: {
        name: `${original.name} (Copy)`,
        slug: duplicateSlug,
        industry: original.industry,
        headline: original.headline,
        metric: original.metric,
        metricLabel: original.metricLabel,
        summary: original.summary,
        image: original.image,
        clientWebsite: original.clientWebsite,
        appStoreUrl: original.appStoreUrl,
        playStoreUrl: original.playStoreUrl,
        overview: original.overview,
        solution: original.solution,
        results: original.results,
        services: original.services,
        deliverables: original.deliverables,
        screenshots: original.screenshots,
        keyStats: original.keyStats,
        status: 'draft',
        isFeatured: false,
        seoTitle: original.seoTitle ? `${original.seoTitle} (Copy)` : null,
        metaDescription: original.metaDescription,
        canonicalUrl: null,
        noIndex: false,
        ogTitle: original.ogTitle,
        ogDescription: original.ogDescription,
        ogImage: original.ogImage,
      },
    });

    return NextResponse.json({ success: true, caseStudy: duplicated });
  } catch (error) {
    console.error('Failed to duplicate case study:', error);
    return NextResponse.json({ error: 'Failed to duplicate case study' }, { status: 500 });
  }
}
