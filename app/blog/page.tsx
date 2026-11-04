import React from 'react';
import type { Metadata } from 'next';
import { getLivePosts } from '@/lib/markdown';
import { getPageMetadata } from '@/lib/seo';
import BlogListingClient from '@/components/blog/BlogListingClient';
import './blog.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/blog', {
    title: 'Blog & Insights: SEO, AI Search and Growth | Amplipath',
    description:
      'Practical guides on SEO, GEO and AEO, paid ads, websites and AI automation from Adebayo Ogungbemile and the Amplipath team.',
  });
}

export default async function BlogPage() {
  const posts = await getLivePosts();

  const formattedPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    dateTxt: p.dateTxt,
    category: p.category,
    categorySlug: p.categorySlug,
    excerpt: p.excerpt,
    readTime: p.readTime,
    featuredImage: p.featuredImage,
    imageAlt: p.imageAlt,
    authorName: p.authorName,
    authorRole: p.authorRole,
    authorImage: p.authorImage,
  }));

  return <BlogListingClient initialPosts={formattedPosts} />;
}
