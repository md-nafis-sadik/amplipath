import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | AMPLIPATH' };

  const pageTitle = post.seoTitle || `${post.title} | AMPLIPATH`;
  const pageDesc = post.metaDescription || post.excerpt || '';
  const canonicalUrl = post.canonicalUrl || `/blog/${post.slug}`;
  const ogImg = post.ogImage || post.featuredImage || '/images/logo-horizontal.jpg';

  return {
    title: pageTitle,
    description: pageDesc,
    robots: post.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.ogTitle || pageTitle,
      description: post.ogDescription || pageDesc,
      url: canonicalUrl,
      type: 'article',
      siteName: 'AMPLIPATH',
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.authorName || 'AMPLIPATH Research'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || pageTitle,
      description: post.ogDescription || pageDesc,
      images: [ogImg],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Schema.org Article Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || 'https://amplipath.com/images/logo-horizontal.jpg',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.authorName || 'AMPLIPATH Research',
      url: 'https://amplipath.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AMPLIPATH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://amplipath.com/images/logo-horizontal.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://amplipath.com/blog/${post.slug}`,
    },
  };

  return (
    <article className="py-12 px-6 md:px-12 bg-white">
      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/blog" className="text-xs text-blue-600 font-bold hover:underline">
            &larr; Back to all articles
          </Link>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{post.emoji}</span>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-slate-500 pb-6 mb-8 border-b border-slate-200">
          <span>Published on {post.date}</span>
          <span>&middot;</span>
          <span>{post.readTime}</span>
          <span>&middot;</span>
          <span>By {post.authorName || 'AMPLIPATH Research'}</span>
        </div>

        {post.featuredImage && (
          <div className="mb-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <img
              src={post.featuredImage}
              alt={post.imageAlt || post.title}
              className="w-full h-auto object-cover max-h-[460px]"
            />
          </div>
        )}

        <div
          className="prose prose-slate blog-article-prose max-w-none leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
        />

        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-center">
          <Link href="/blog" className="text-sm font-bold text-blue-600 hover:underline">
            &larr; Back to all insights
          </Link>
          <Link href="/contact" className="btn-fill no-underline text-xs">
            Discuss This Strategy &rarr;
          </Link>
        </div>
      </div>
    </article>
  );
}
