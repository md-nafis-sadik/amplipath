import React from 'react';
import prisma from '@/lib/prisma';
import BlogEditorForm from '@/components/admin/BlogEditorForm';

export const dynamic = 'force-dynamic';

export default async function NewBlogPage() {
  const categories = await prisma.blogCategory.findMany({
    orderBy: { name: 'asc' },
  });

  return <BlogEditorForm categories={categories} isEditing={false} />;
}
