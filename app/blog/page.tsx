import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getLivePosts } from '@/lib/markdown';

export const metadata = {
  title: 'Resources & Insights | Marketing Guides | Amplipath',
  description: 'Guides, strategy breakdowns and marketing insights from Amplipath, covering SEO, AI search, paid media, web development, Mobile app development, AI Automation and growth strategy',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Resources & Insights | Marketing Guides | Amplipath',
    description: 'Guides, strategy breakdowns and marketing insights from Amplipath, covering SEO, AI search, paid media, web development, Mobile app development, AI Automation and growth strategy',
    url: '/blog',
    siteName: 'AMPLIPATH',
    images: [
      {
        url: '/images/logo-horizontal.jpg',
        width: 1200,
        height: 630,
        alt: 'Amplipath Resources & Insights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources & Insights | Marketing Guides | Amplipath',
    description: 'Guides, strategy breakdowns and marketing insights from Amplipath, covering SEO, AI search, paid media, web development, Mobile app development, AI Automation and growth strategy',
    images: ['/images/logo-horizontal.jpg'],
  },
};

export default async function BlogPage() {
  const posts = await getLivePosts();

  return (
    <div>
      <div className="hero">
        <div className="hero-bar"></div>
        <div className="h-tag"><div className="h-dot"></div> PERSPECTIVES & TACTICAL GUIDES</div>
        <h1 className="h-h1">Insights on the frontier of marketing and technology.</h1>
        <p className="h-sub">
          Actionable frameworks, technical teardowns, and strategic analysis from the engineers and growth specialists at AMPLIPATH.
        </p>
      </div>

      <div className="s-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-600 hover:shadow-lg transition-all flex flex-col no-underline text-inherit group"
              >
                {post.featuredImage ? (
                  <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.imageAlt || post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-6 pb-0 text-3xl mb-1">{post.emoji}</div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                      {post.category}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-600 transition">
                      {post.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 mt-auto">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
