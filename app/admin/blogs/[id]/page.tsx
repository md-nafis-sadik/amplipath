import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import BlogEditorForm from '@/components/admin/BlogEditorForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const [post, categories] = await Promise.all([
    prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    }),
  ]);

  if (!post || post.isDeleted) {
    notFound();
  }

  const initialData = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    contentHtml: post.contentHtml || '',
    featuredImage: post.featuredImage || '',
    imageAlt: post.imageAlt || '',
    authorName: post.authorName,
    status: post.status as 'draft' | 'published' | 'scheduled',
    scheduledAt: post.scheduledAt ? post.scheduledAt.toISOString() : '',
    isFeatured: post.isFeatured,
    categoryId: post.categoryId || '',
    tags: post.tags || '',
    seoTitle: post.seoTitle || '',
    metaDescription: post.metaDescription || '',
    canonicalUrl: post.canonicalUrl || '',
    ogTitle: post.ogTitle || '',
    ogDescription: post.ogDescription || '',
    ogImage: post.ogImage || '',
    noIndex: post.noIndex,
  };

  return <BlogEditorForm initialData={initialData} categories={categories} isEditing={true} />;
}
