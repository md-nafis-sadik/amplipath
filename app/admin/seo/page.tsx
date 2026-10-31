'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Pencil } from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface PageSeoItem {
  id: number;
  pagePath: string;
  pageName: string;
  pageType: string;
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  breadcrumbTitle: string | null;
  updatedAt: string;
}

export default function UniversalSeoPage() {
  const [pages, setPages] = useState<PageSeoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPages = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/seo?type=${typeFilter}&search=${encodeURIComponent(search)}&page=${targetPage}&limit=20`
      );
      const data = await res.json();
      if (data.pages) setPages(data.pages);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load SEO pages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [typeFilter, search]);

  useEffect(() => {
    fetchPages(page);
  }, [page, typeFilter, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Universal SEO Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure metadata, OpenGraph tags, and indexing settings across all platform routes.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by page name or path (e.g. /work, /services)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { label: 'All Pages', value: 'all' },
            { label: 'Core', value: 'core' },
            { label: 'Services', value: 'service' },
            { label: 'Industries', value: 'industry' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTypeFilter(tab.value)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                typeFilter === tab.value
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading SEO catalog...</div>
        ) : pages.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No pages match your filter criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3 px-4">Page Details</th>
                  <th className="py-3 px-4">Meta Title Preview</th>
                  <th className="py-3 px-4 text-center">Type</th>
                  <th className="py-3 px-4 text-center">Indexing</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {pages.map((p) => {
                  const hasCustomTitle = Boolean(p.seoTitle);
                  const hasCustomDesc = Boolean(p.metaDescription);

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {p.pageName}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                          {p.pagePath}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs truncate">
                        {p.seoTitle ? (
                          <span className="text-slate-800 dark:text-slate-200 font-medium">
                            {p.seoTitle}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">Default system title</span>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`text-[10px] ${
                              hasCustomTitle
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                : 'text-slate-400'
                            }`}
                          >
                            {hasCustomTitle ? 'Custom Title' : 'System Title'}
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <span
                            className={`text-[10px] ${
                              hasCustomDesc
                                ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                : 'text-slate-400'
                            }`}
                          >
                            {hasCustomDesc ? 'Custom Desc' : 'Default Desc'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {p.pageType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                            p.noIndex ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-500 dark:text-emerald-400'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${p.noIndex ? 'bg-rose-500' : 'bg-emerald-500'}`}
                          />
                          {p.noIndex ? 'Noindex' : 'Index'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/seo/${p.id}`}
                          title="Edit SEO"
                          className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded inline-flex items-center justify-center cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
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
