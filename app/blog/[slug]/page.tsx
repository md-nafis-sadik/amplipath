import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';
import BlogPostClient from '@/components/blog/BlogPostClient';
import './article.css';

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
  const canonicalUrl = post.canonicalUrl
    ? (post.canonicalUrl.startsWith('http') ? post.canonicalUrl : `https://amplipath.com${post.canonicalUrl}`)
    : `https://amplipath.com/blog/${post.slug}`;
  const ogImg = post.ogImage || post.featuredImage || 'https://amplipath.com/images/blog/what-are-geo-and-aeo-og.jpg';

  return {
    title: pageTitle,
    description: pageDesc,
    robots: post.noIndex ? { index: false, follow: false } : { index: true, follow: true, 'max-image-preview': 'large' },
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: post.authorName || 'Adebayo Ogungbemile' }],
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
      authors: [post.authorName || 'Adebayo Ogungbemile'],
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.ogTitle || pageTitle,
      description: post.ogDescription || pageDesc,
      images: [ogImg],
      site: '@amplipath',
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const postUrl = post.canonicalUrl
    ? (post.canonicalUrl.startsWith('http') ? post.canonicalUrl : `https://amplipath.com${post.canonicalUrl}`)
    : `https://amplipath.com/blog/${post.slug}`;

  const featuredImgUrl = post.featuredImage
    ? (post.featuredImage.startsWith('http') ? post.featuredImage : `https://amplipath.com${post.featuredImage}`)
    : 'https://amplipath.com/images/blog/what-are-geo-and-aeo-cover.webp';

  // Extract FAQ items from HTML for FAQPage Schema if present
  const faqMatches = Array.from(
    (post.contentHtml || '').matchAll(
      /<details[^>]*class=["'][^"']*apb-faq[^"']*["'][^>]*>[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<div[^>]*class=["'][^"']*apb-faq-a[^"']*["'][^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/details>/gi
    )
  );

  const faqEntities = faqMatches.map((m) => ({
    '@type': 'Question',
    name: m[1].replace(/<[^>]+>/g, '').trim(),
    acceptedAnswer: {
      '@type': 'Answer',
      text: m[2].replace(/<[^>]+>/g, '').trim(),
    },
  }));

  // Schema.org Graph Data (BlogPosting, Breadcrumbs, FAQs)
  const schemaGraph: any[] = [
    {
      '@type': 'BlogPosting',
      '@id': `${postUrl}#article`,
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: [featuredImgUrl],
      datePublished: post.date,
      dateModified: post.date,
      articleSection: post.category,
      inLanguage: 'en',
      mainEntityOfPage: postUrl,
      author: {
        '@type': 'Person',
        name: post.authorName || 'Adebayo Ogungbemile',
        url: post.authorLinkedin || 'https://www.linkedin.com/in/adebayo-ogungbemile/',
        worksFor: {
          '@type': 'Organization',
          name: 'Amplipath',
          url: 'https://amplipath.com',
        },
      },
      publisher: {
        '@type': 'Organization',
        name: 'AMPLIPATH',
        logo: {
          '@type': 'ImageObject',
          url: 'https://amplipath.com/images/logo-horizontal.jpg',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://amplipath.com/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://amplipath.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.category,
          item: `https://amplipath.com/blog?category=${post.categorySlug || 'all'}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: postUrl,
        },
      ],
    },
  ];

  if (faqEntities.length > 0) {
    schemaGraph.push({
      '@type': 'FAQPage',
      mainEntity: faqEntities,
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };

  return (
    <>
      {/* Schema.org Article Graph JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogPostClient post={post} />
    </>
  );
}
