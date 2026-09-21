import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';

export const metadata = {
  title: 'Blog & Insights | AMPLIPATH',
  description: 'In-depth perspectives on digital marketing, generative engine optimization, artificial intelligence, and global market expansion.',
};

export default function BlogPage() {
  const posts = getAllPosts();

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
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-600 hover:shadow-lg transition-all flex flex-col no-underline text-inherit"
              >
                <div className="text-3xl mb-3">{post.emoji}</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  {post.category}
                </div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug mb-3">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
