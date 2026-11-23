import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

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

    return NextResponse.json(
      {
        pagePath: cleanPath,
        total: faqs.length,
        faqs,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Failed to fetch public FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  }
}
