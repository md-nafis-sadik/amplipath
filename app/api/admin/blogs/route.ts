import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const categoryId = searchParams.get('categoryId');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };

    if (status && status !== 'all') {
      where.status = status;
    }

    if (categoryId && categoryId !== 'all') {
      where.categoryId = parseInt(categoryId, 10);
    }

    if (search && search.trim()) {
      where.OR = [
        { title: { contains: search.trim() } },
        { slug: { contains: search.trim() } },
      ];
    }

    const [total, posts, categories] = await Promise.all([
      prisma.blogPost.count({ where }),
      prisma.blogPost.findMany({
        where,
        include: {
          category: true,
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogCategory.findMany({
        orderBy: { name: 'asc' },
      }),
    ]);

    return NextResponse.json({
      posts,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      categories,
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      contentHtml,
      featuredImage,
      imageAlt,
      authorName,
      status,
      scheduledAt,
      isFeatured,
      categoryId,
      tags,
      relatedPostIds,
      seoTitle,
      metaDescription,
      canonicalUrl,
      ogTitle,
      ogDescription,
      ogImage,
      noIndex,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Auto-generate clean slug if not specified
    let generatedSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Ensure unique slug
    let uniqueSlug = generatedSlug;
    let counter = 1;
    while (await prisma.blogPost.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${generatedSlug}-${counter}`;
      counter++;
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        slug: uniqueSlug,
        excerpt: excerpt || null,
        contentHtml: contentHtml || '',
        featuredImage: featuredImage || null,
        imageAlt: imageAlt || null,
        authorName: authorName || 'Amplipath Team',
        status: status || 'draft',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        publishedAt: status === 'published' ? new Date() : null,
        isFeatured: Boolean(isFeatured),
        categoryId: categoryId ? parseInt(String(categoryId), 10) : null,
        tags: tags || null,
        relatedPostIds: relatedPostIds ? JSON.stringify(relatedPostIds) : null,
        seoTitle: seoTitle || title,
        metaDescription: metaDescription || excerpt || null,
        canonicalUrl: canonicalUrl || null,
        ogTitle: ogTitle || seoTitle || title,
        ogDescription: ogDescription || metaDescription || excerpt || null,
        ogImage: ogImage || featuredImage || '/images/logo-horizontal.jpg',
        noIndex: Boolean(noIndex),
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
