import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/markdown';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | AMPLIPATH' };

  return {
    title: `${post.title} | AMPLIPATH`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 px-6 md:px-12 bg-white">
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
          <span>By AMPLIPATH Research</span>
        </div>

        <div
          className="prose prose-slate max-w-none leading-relaxed"
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
