import prisma from '@/lib/prisma';

export interface FaqEntry {
  q: string;
  a: string;
}

/**
 * Retrieves live FAQs mapped to a given page path in serial order.
 * Falls back to provided fallback FAQs if DB is empty or offline.
 */
export async function getLivePageFaqs(
  pagePath: string,
  fallbackFaqs: FaqEntry[] = []
): Promise<FaqEntry[]> {
  try {
    const cleanPath = pagePath.replace(/\/$/, '') || '/';

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

    if (pageFaqs.length > 0) {
      return pageFaqs.map((pf) => ({
        q: pf.faq.question,
        a: pf.faq.answer,
      }));
    }
  } catch (err) {
    console.error(`Error querying FAQs for ${pagePath}:`, err);
  }

  return fallbackFaqs;
}
