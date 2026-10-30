import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: { pageType?: string; OR?: Array<{ pageName?: { contains: string }; pagePath?: { contains: string } }> } = {};

    if (type && type !== 'all') {
      where.pageType = type;
    }

    if (search && search.trim()) {
      where.OR = [
        { pageName: { contains: search.trim() } },
        { pagePath: { contains: search.trim() } },
      ];
    }

    const [total, pages] = await Promise.all([
      prisma.pageSeo.count({ where }),
      prisma.pageSeo.findMany({
        where,
        orderBy: [{ pageType: 'asc' }, { pageName: 'asc' }],
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      pages,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Failed to fetch page SEO:', error);
    return NextResponse.json({ error: 'Failed to fetch page SEO' }, { status: 500 });
  }
}
