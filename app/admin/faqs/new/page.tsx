import React from 'react';
import prisma from '@/lib/prisma';
import FaqForm from '@/components/admin/FaqForm';

export const dynamic = 'force-dynamic';

export default async function NewFaqPage() {
  const pages = await prisma.pageSeo.findMany({
    select: { pagePath: true, pageName: true, pageType: true },
    orderBy: [{ pageType: 'asc' }, { pageName: 'asc' }],
  });

  return <FaqForm pages={pages} isEditing={false} />;
}
