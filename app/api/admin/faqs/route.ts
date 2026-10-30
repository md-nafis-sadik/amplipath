import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const pageFilter = searchParams.get('pageFilter');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };

    if (category && category !== 'all') {
      where.category = category;
    }

    if (pageFilter && pageFilter !== 'all') {
      where.pageAssignments = {
        some: {
          pagePath: pageFilter,
        },
      };
    }

    if (search && search.trim()) {
      where.OR = [
        { question: { contains: search.trim() } },
        { answer: { contains: search.trim() } },
      ];
    }

    const [total, faqs, allCategories, pages] = await Promise.all([
      prisma.faqItem.count({ where }),
      prisma.faqItem.findMany({
        where,
        include: {
          pageAssignments: true,
        },
        orderBy: [{ sortOrder: 'asc' }, { updatedAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.faqItem.findMany({
        where: { isDeleted: false },
        select: { category: true },
        distinct: ['category'],
      }),
      prisma.pageSeo.findMany({
        select: { pagePath: true, pageName: true, pageType: true },
        orderBy: [{ pageType: 'asc' }, { pageName: 'asc' }],
      }),
    ]);

    const categories = allCategories.map((c) => c.category).filter(Boolean).sort();

    return NextResponse.json({
      faqs,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      categories,
      pages,
    });
  } catch (error) {
    console.error('Failed to fetch FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { question, answer, category, assignedPages } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const faq = await prisma.faqItem.create({
      data: {
        question,
        answer,
        category: category || 'General',
      },
    });

    // Create page assignments if specified
    if (Array.isArray(assignedPages) && assignedPages.length > 0) {
      for (const pagePath of assignedPages) {
        await prisma.pageFaq.upsert({
          where: {
            pagePath_faqId: {
              pagePath,
              faqId: faq.id,
            },
          },
          update: {},
          create: {
            pagePath,
            faqId: faq.id,
          },
        });
      }
    }

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    console.error('Failed to create FAQ:', error);
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
