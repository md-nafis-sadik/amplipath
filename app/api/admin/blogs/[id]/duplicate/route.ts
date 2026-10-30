import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const original = await prisma.blogPost.findUnique({ where: { id } });

    if (!original) {
      return NextResponse.json({ error: 'Original post not found' }, { status: 404 });
    }

    let duplicateSlug = `${original.slug}-copy`;
    let count = 1;
    while (await prisma.blogPost.findUnique({ where: { slug: duplicateSlug } })) {
      duplicateSlug = `${original.slug}-copy-${count}`;
      count++;
    }

    const duplicated = await prisma.blogPost.create({
      data: {
        title: `${original.title} (Copy)`,
        slug: duplicateSlug,
        excerpt: original.excerpt,
        contentHtml: original.contentHtml,
        featuredImage: original.featuredImage,
        imageAlt: original.imageAlt,
        authorName: original.authorName,
        status: 'draft', // Always draft by default
        categoryId: original.categoryId,
        tags: original.tags,
        relatedPostIds: original.relatedPostIds,
        seoTitle: original.seoTitle ? `${original.seoTitle} (Copy)` : null,
        metaDescription: original.metaDescription,
        canonicalUrl: null,
        ogTitle: original.ogTitle,
        ogDescription: original.ogDescription,
        ogImage: original.ogImage,
        noIndex: false,
      },
    });

    return NextResponse.json({ success: true, post: duplicated });
  } catch (error) {
    console.error('Failed to duplicate post:', error);
    return NextResponse.json({ error: 'Failed to duplicate post' }, { status: 500 });
  }
}
