import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');

    if (!page) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 });
    }

    const cleanPath = page.replace(/\/$/, '') || '/';

    const pageFaqs = await prisma.pageFaq.findMany({
      where: {
        pagePath: cleanPath,
        faq: { isDeleted: false },
      },
      include: {
        faq: true,
      },
      orderBy: [
        { sortOrder: 'asc' },
        { faq: { sortOrder: 'asc' } },
        { faq: { id: 'asc' } },
      ],
    });

    const faqs = pageFaqs.map((pf) => ({
      id: pf.faq.id,
      q: pf.faq.question,
      a: pf.faq.answer,
      sortOrder: pf.sortOrder,
    }));

    return NextResponse.json({
      pagePath: cleanPath,
      total: faqs.length,
      faqs,
    });
  } catch (error) {
    console.error('Failed to fetch public FAQs:', error);
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}
