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

    if (search && search.trim()) {
      where.OR = [
        { question: { contains: search.trim() } },
        { answer: { contains: search.trim() } },
      ];
    }

    let total = 0;
    let faqs: any[] = [];

    if (pageFilter && pageFilter !== 'all') {
      // Query page-specific FAQs in strict serial order
      const pageFaqWhere: any = {
        pagePath: pageFilter,
        faq: where,
      };

      const [count, pageFaqs] = await Promise.all([
        prisma.pageFaq.count({ where: pageFaqWhere }),
        prisma.pageFaq.findMany({
          where: pageFaqWhere,
          include: {
            faq: {
              include: {
                pageAssignments: true,
              },
            },
          },
          orderBy: [
            { sortOrder: 'asc' },
            { faq: { sortOrder: 'asc' } },
            { faq: { id: 'asc' } },
          ],
          skip,
          take: limit,
        }),
      ]);

      total = count;
      faqs = pageFaqs.map((pf, idx) => ({
        ...pf.faq,
        serialOrder: skip + idx + 1,
        pageSortOrder: pf.sortOrder,
      }));
    } else {
      // Global FAQ list in serial order by sortOrder ASC, id ASC
      const [count, faqItems] = await Promise.all([
        prisma.faqItem.count({ where }),
        prisma.faqItem.findMany({
          where,
          include: {
            pageAssignments: true,
          },
          orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
          skip,
          take: limit,
        }),
      ]);

      total = count;
      faqs = faqItems.map((item, idx) => ({
        ...item,
        serialOrder: skip + idx + 1,
      }));
    }

    const [allCategories, pages] = await Promise.all([
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
    const { question, answer, category, assignedPages, sortOrder } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const order = typeof sortOrder === 'number' ? sortOrder : 0;

    const faq = await prisma.faqItem.create({
      data: {
        question,
        answer,
        category: category || 'General',
        sortOrder: order,
      },
    });

    // Create page assignments if specified
    if (Array.isArray(assignedPages) && assignedPages.length > 0) {
      for (let i = 0; i < assignedPages.length; i++) {
        const pagePath = assignedPages[i];
        await prisma.pageFaq.upsert({
          where: {
            pagePath_faqId: {
              pagePath,
              faqId: faq.id,
            },
          },
          update: {
            sortOrder: order,
          },
          create: {
            pagePath,
            faqId: faq.id,
            sortOrder: order,
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
