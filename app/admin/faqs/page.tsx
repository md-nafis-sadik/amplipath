'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
  FileQuestion,
  Layers,
} from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface PageAssignment {
  pagePath: string;
}

interface PageItem {
  pagePath: string;
  pageName: string;
  pageType: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  updatedAt: string;
  pageAssignments: PageAssignment[];
}

export default function FaqManagerPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [pageFilter, setPageFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchFaqs = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/faqs?search=${encodeURIComponent(search)}&category=${categoryFilter}&pageFilter=${pageFilter}&page=${targetPage}&limit=20`
      );
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
      if (data.pages) setPages(data.pages);
      if (data.categories) setCategories(data.categories);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch FAQs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [categoryFilter, pageFilter, search]);

  useEffect(() => {
    fetchFaqs(page);
  }, [page, categoryFilter, pageFilter, search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ item?')) return;

    try {
      const res = await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');

      setFeedbackMsg({ type: 'success', text: 'FAQ moved to recycle bin.' });
      setTimeout(() => setFeedbackMsg(null), 3000);
      fetchFaqs(page);
    } catch (err) {
      alert('Error deleting FAQ');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">FAQ Management</h1>
        </div>
        <Link
          href="/admin/faqs/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New FAQ</span>
        </Link>
      </div>

      {feedbackMsg && (
        <div
          className={`p-4 rounded-md text-sm flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 text-slate-400 hover:text-white rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or answers..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Categories ({total})</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={pageFilter}
            onChange={(e) => setPageFilter(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">All Assigned Pages</option>
            {pages.map((p) => (
              <option key={p.pagePath} value={p.pagePath}>
                {p.pageName} ({p.pagePath})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* FAQs Table List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading FAQs...</span>
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No FAQs found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Question &amp; Answer</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Page Assignments</th>
                  <th className="py-3.5 px-4">Updated Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition">
                    {/* Question & Answer Excerpt */}
                    <td className="py-3 px-4 max-w-md">
                      <div className="flex items-start gap-2">
                        <FileQuestion className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/faqs/${faq.id}`}
                            className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition line-clamp-1"
                          >
                            {faq.question}
                          </Link>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {faq.category || 'General'}
                      </span>
                    </td>

                    {/* Assigned Pages */}
                    <td className="py-3 px-4">
                      {faq.pageAssignments.length > 0 ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{faq.pageAssignments.length} page{faq.pageAssignments.length !== 1 ? 's' : ''}</span>
                          </span>
                          <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">
                            {faq.pageAssignments[0]?.pagePath}
                            {faq.pageAssignments.length > 1 && ` +${faq.pageAssignments.length - 1}`}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-xs italic">Unassigned</span>
                      )}
                    </td>

                    {/* Updated Date */}
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(faq.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/faqs/${faq.id}`}
                          title="Edit FAQ"
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(faq.id)}
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

      {/* Pagination Bar */}
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
