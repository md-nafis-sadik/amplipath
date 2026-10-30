import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim() } },
        { slug: { contains: search.trim() } },
        { industry: { contains: search.trim() } },
      ];
    }

    const [total, caseStudies] = await Promise.all([
      prisma.caseStudy.count({ where }),
      prisma.caseStudy.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      caseStudies,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return NextResponse.json({ error: 'Failed to fetch case studies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    let cleanSlug = (slug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    let uniqueSlug = cleanSlug;
    let count = 1;
    while (await prisma.caseStudy.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${cleanSlug}-${count}`;
      count++;
    }

    const created = await prisma.caseStudy.create({
      data: {
        name,
        slug: uniqueSlug,
        industry: industry || null,
        headline: headline || null,
        metric: metric || null,
        metricLabel: metricLabel || null,
        summary: summary || null,
        image: image || null,
        clientWebsite: clientWebsite || null,
        appStoreUrl: appStoreUrl || null,
        playStoreUrl: playStoreUrl || null,
        overview: overview || null,
        solution: solution || null,
        results: results || null,
        services: typeof services === 'string' ? services : JSON.stringify(services || []),
        deliverables: typeof deliverables === 'string' ? deliverables : JSON.stringify(deliverables || []),
        screenshots: typeof screenshots === 'string' ? screenshots : JSON.stringify(screenshots || []),
        keyStats: typeof keyStats === 'string' ? keyStats : JSON.stringify(keyStats || []),
        status: status || 'published',
        isFeatured: Boolean(isFeatured),
        seoTitle: seoTitle || `${name} Case Study | Amplipath`,
        metaDescription: metaDescription || summary || headline || '',
        canonicalUrl: canonicalUrl || null,
        noIndex: Boolean(noIndex),
        ogTitle: ogTitle || seoTitle || `${name} Case Study | Amplipath`,
        ogDescription: ogDescription || metaDescription || summary || '',
        ogImage: ogImage || image || '/images/logo-horizontal.jpg',
      },
    });

    return NextResponse.json({ success: true, caseStudy: created });
  } catch (error) {
    console.error('Failed to create case study:', error);
    return NextResponse.json({ error: 'Failed to create case study' }, { status: 500 });
  }
}
