'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Pencil, Copy, Trash2, Star } from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface PostItem {
  id: number;
  title: string;
  slug: string;
  authorName: string;
  status: 'draft' | 'published' | 'scheduled';
  isFeatured: boolean;
  publishedAt: string | null;
  updatedAt: string;
  category: { id: number; name: string } | null;
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/blogs?status=${statusFilter}&search=${encodeURIComponent(search)}&page=${targetPage}&limit=20`
      );
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  useEffect(() => {
    fetchPosts(page);
  }, [page, statusFilter, search]);

  const handleDuplicate = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}/duplicate`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to duplicate post');
      fetchPosts();
    } catch (err) {
      alert('Error duplicating post');
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Move "${title}" to the Recycle Bin? (You can restore it later).`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete post');
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert('Error deleting post');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Blog Management</h1>
        </div>
        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Article</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'All Posts', value: 'all' },
            { label: 'Published', value: 'published' },
            { label: 'Drafts', value: 'draft' },
            { label: 'Scheduled', value: 'scheduled' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                statusFilter === tab.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by article title or slug..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading articles...</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No blog posts found. Click &quot;New Blog Post&quot; to write your first article.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Title &amp; URL Slug</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-100/60 dark:hover:bg-white/[0.03] transition">
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex items-center gap-2">
                        {p.isFeatured && (
                          <span title="Featured Article">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 inline-block flex-shrink-0" />
                          </span>
                        )}
                        <Link
                          href={`/admin/blogs/${p.id}`}
                          className="font-semibold text-white hover:text-blue-400 transition"
                        >
                          {p.title}
                        </Link>
                      </div>
                      <div className="font-mono text-[11px] text-slate-500 mt-0.5 truncate">
                        /blog/{p.slug}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {p.category ? (
                        <span className="text-xs text-slate-400 font-medium">
                          {p.category.name}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-xs italic">Uncategorized</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400">{p.authorName}</td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium capitalize ${
                          p.status === 'published'
                            ? 'text-emerald-500 dark:text-emerald-400'
                            : p.status === 'scheduled'
                            ? 'text-blue-500 dark:text-blue-400'
                            : 'text-amber-500 dark:text-amber-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            p.status === 'published'
                              ? 'bg-emerald-500'
                              : p.status === 'scheduled'
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                        />
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {p.publishedAt
                        ? new Date(p.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/blogs/${p.id}`}
                          title="Edit Article"
                          className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(p.id)}
                          title="Duplicate Article"
                          className="p-1.5 text-slate-400 hover:text-slate-200 transition rounded"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          title="Move to Recycle Bin"
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls outside table card */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={20}
        onPageChange={(p) => setPage(p)}
        isLoading={loading}
      />
    </div>
  );
}
