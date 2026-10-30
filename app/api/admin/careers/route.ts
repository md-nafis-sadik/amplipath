import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };
    if (status && status !== 'all') {
      where.status = status;
    }
    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { category: { contains: search.trim() } },
        { description: { contains: search.trim() } },
      ];
    }

    const [total, jobs] = await Promise.all([
      prisma.jobListing.count({ where }),
      prisma.jobListing.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      jobs,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Failed to fetch job listings:', error);
    return NextResponse.json({ error: 'Failed to fetch job listings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      category,
      categoryLabel,
      employmentType,
      location,
      compensation,
      compDetail,
      description,
      responsibilities,
      requirements,
      status,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const jobSlug = slug && slug.trim() ? generateSlug(slug) : generateSlug(title);

    // Check unique slug
    const existing = await prisma.jobListing.findUnique({ where: { slug: jobSlug } });
    const finalSlug = existing ? `${jobSlug}-${Date.now().toString().slice(-4)}` : jobSlug;

    const job = await prisma.jobListing.create({
      data: {
        title,
        slug: finalSlug,
        category: category || 'Engineering',
        categoryLabel: categoryLabel || category || 'Technology & Engineering',
        employmentType: employmentType || 'Project-Based / Contract',
        location: location || 'Remote · Worldwide',
        compensation: compensation || null,
        compDetail: compDetail || null,
        description,
        responsibilities: Array.isArray(responsibilities)
          ? JSON.stringify(responsibilities)
          : typeof responsibilities === 'string'
          ? responsibilities
          : null,
        requirements: Array.isArray(requirements)
          ? JSON.stringify(requirements)
          : typeof requirements === 'string'
          ? requirements
          : null,
        status: status || 'active',
      },
    });

    return NextResponse.json({ success: true, job });
  } catch (error) {
    console.error('Failed to create job listing:', error);
    return NextResponse.json({ error: 'Failed to create job listing' }, { status: 500 });
  }
}
