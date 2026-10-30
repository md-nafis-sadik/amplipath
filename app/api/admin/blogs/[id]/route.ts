import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!post || post.isDeleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
    });

    return NextResponse.json({ post, categories });
  } catch (error) {
    console.error('Failed to get blog post:', error);
    return NextResponse.json({ error: 'Failed to get blog post' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

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

    // Check slug uniqueness if changed
    if (slug && slug !== existing.slug) {
      const duplicate = await prisma.blogPost.findUnique({ where: { slug } });
      if (duplicate && duplicate.id !== id) {
        return NextResponse.json(
          { error: 'A post with this URL slug already exists.' },
          { status: 400 }
        );
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        slug: slug !== undefined ? slug : existing.slug,
        excerpt: excerpt !== undefined ? excerpt : existing.excerpt,
        contentHtml: contentHtml !== undefined ? contentHtml : existing.contentHtml,
        featuredImage: featuredImage !== undefined ? featuredImage : existing.featuredImage,
        imageAlt: imageAlt !== undefined ? imageAlt : existing.imageAlt,
        authorName: authorName !== undefined ? authorName : existing.authorName,
        status: status !== undefined ? status : existing.status,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        publishedAt:
          status === 'published' && !existing.publishedAt
            ? new Date()
            : existing.publishedAt,
        isFeatured: isFeatured !== undefined ? Boolean(isFeatured) : existing.isFeatured,
        categoryId: categoryId ? parseInt(String(categoryId), 10) : null,
        tags: tags !== undefined ? tags : existing.tags,
        relatedPostIds: relatedPostIds ? JSON.stringify(relatedPostIds) : existing.relatedPostIds,
        seoTitle: seoTitle !== undefined ? seoTitle : existing.seoTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : existing.metaDescription,
        canonicalUrl: canonicalUrl !== undefined ? canonicalUrl : existing.canonicalUrl,
        ogTitle: ogTitle !== undefined ? ogTitle : existing.ogTitle,
        ogDescription: ogDescription !== undefined ? ogDescription : existing.ogDescription,
        ogImage: ogImage !== undefined ? ogImage : existing.ogImage,
        noIndex: noIndex !== undefined ? Boolean(noIndex) : existing.noIndex,
      },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
  }
}

// Soft delete to Recycle Bin
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.blogPost.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Post moved to Recycle Bin' });
  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
  }
}
