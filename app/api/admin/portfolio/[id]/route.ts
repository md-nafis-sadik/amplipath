import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy || caseStudy.isDeleted) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    return NextResponse.json({ caseStudy });
  } catch (error) {
    console.error('Failed to get case study:', error);
    return NextResponse.json({ error: 'Failed to get case study' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    const {
      name,
      slug,
      industry,
      headline,
      metric,
      metricLabel,
      summary,
      image,
      clientWebsite,
      appStoreUrl,
      playStoreUrl,
      overview,
      solution,
      results,
      services,
      deliverables,
      screenshots,
      keyStats,
      status,
      isFeatured,
      seoTitle,
      metaDescription,
      canonicalUrl,
      noIndex,
      ogTitle,
      ogDescription,
      ogImage,
    } = body;

    if (slug && slug !== existing.slug) {
      const duplicate = await prisma.caseStudy.findUnique({ where: { slug } });
      if (duplicate && duplicate.id !== id) {
        return NextResponse.json(
          { error: 'A case study with this slug already exists.' },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.caseStudy.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        slug: slug !== undefined ? slug : existing.slug,
        industry: industry !== undefined ? industry : existing.industry,
        headline: headline !== undefined ? headline : existing.headline,
        metric: metric !== undefined ? metric : existing.metric,
        metricLabel: metricLabel !== undefined ? metricLabel : existing.metricLabel,
        summary: summary !== undefined ? summary : existing.summary,
        image: image !== undefined ? image : existing.image,
        clientWebsite: clientWebsite !== undefined ? clientWebsite : existing.clientWebsite,
        appStoreUrl: appStoreUrl !== undefined ? appStoreUrl : existing.appStoreUrl,
        playStoreUrl: playStoreUrl !== undefined ? playStoreUrl : existing.playStoreUrl,
        overview: overview !== undefined ? overview : existing.overview,
        solution: solution !== undefined ? solution : existing.solution,
        results: results !== undefined ? results : existing.results,
        services: typeof services === 'string' ? services : JSON.stringify(services || []),
        deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables || []),
        screenshots: typeof screenshots === 'string' ? screenshots : JSON.stringify(screenshots || []),
        keyStats: typeof keyStats === 'string' ? keyStats : JSON.stringify(keyStats || []),
        status: status !== undefined ? status : existing.status,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existing.isFeatured,
        seoTitle: seoTitle !== undefined ? seoTitle : existing.seoTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : existing.metaDescription,
        canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : existing.canonicalUrl,
        noIndex: noIndex !== undefined ? Boolean(noIndex) : existing.noIndex,
        ogTitle: ogTitle !== undefined ? ogTitle : existing.ogTitle,
        ogDescription: ogDescription !== undefined ? ogDescription : existing.ogDescription,
        ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
      },
    });

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error('Failed to update case study:', error);
    return NextResponse.json({ error: 'Failed to update case study' }, { status: 500 });
  }
}

// Soft delete
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.caseStudy.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Case study moved to Recycle Bin' });
  } catch (error) {
    console.error('Failed to delete case study:', error);
    return NextResponse.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}
