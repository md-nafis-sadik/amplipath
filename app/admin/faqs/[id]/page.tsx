import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import FaqForm from '@/components/admin/FaqForm';

export const dynamic = 'force-dynamic';

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const [faq, pages] = await Promise.all([
    prisma.faqItem.findUnique({
      where: { id },
      include: { pageAssignments: true },
    }),
    prisma.pageSeo.findMany({
      select: { pagePath: true, pageName: true, pageType: true },
      orderBy: [{ pageType: 'asc' }, { pageName: 'asc' }],
    }),
  ]);

  if (!faq || faq.isDeleted) {
    notFound();
  }

  const assignedPages = faq.pageAssignments.map((p) => p.pagePath);

  return (
    <FaqForm
      isEditing={true}
      pages={pages}
      initialData={{
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        assignedPages,
      }}
    />
  );
}
