'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Pencil,
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
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
  const [indexNowLoading, setIndexNowLoading] = useState(false);
  const [pingingPath, setPingingPath] = useState<string | null>(null);
  const [indexNowStatus, setIndexNowStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleIndexNowSubmitAll = async () => {
    setIndexNowLoading(true);
    setIndexNowStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/admin/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ all: true }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIndexNowStatus({
          type: 'success',
          message: `Successfully notified IndexNow for ${data.submittedCount} live site URLs!`,
        });
      } else {
        setIndexNowStatus({
          type: 'error',
          message: data.message || data.error || 'Failed to submit URLs to IndexNow.',
        });
      }
    } catch (err: any) {
      setIndexNowStatus({
        type: 'error',
        message: err.message || 'Network error pinging IndexNow.',
      });
    } finally {
      setIndexNowLoading(false);
    }
  };

  const handlePingSingleUrl = async (path: string) => {
    setPingingPath(path);
    setIndexNowStatus({ type: null, message: '' });
    try {
      const res = await fetch('/api/admin/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: path }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIndexNowStatus({
          type: 'success',
          message: `IndexNow pinged for ${path}! Search engines notified.`,
        });
      } else {
        setIndexNowStatus({
          type: 'error',
          message: data.message || data.error || `Failed to ping IndexNow for ${path}.`,
        });
      }
    } catch (err: any) {
      setIndexNowStatus({
        type: 'error',
        message: err.message || `Network error pinging IndexNow for ${path}.`,
      });
    } finally {
      setPingingPath(null);
    }
  };

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

      {/* IndexNow Protocol Integration Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-blue-900/10 via-slate-900 to-indigo-950/20 border border-blue-500/20 dark:border-blue-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                IndexNow Protocol Active
              </span>
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Instant Search Engine Indexing (Bing, Yandex, Naver & Seznam)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              When content is published or updated, Amplipath pings IndexNow automatically. You can also trigger an immediate full-site re-crawl across participating search engines below.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
              <span>Host: <strong className="text-slate-700 dark:text-slate-300">amplipath.com</strong></span>
              <span>•</span>
              <a
                href="/c83e71d4b65942f2a91f5319e78a6340.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                title="Verify IndexNow key file"
              >
                <span>Key File (c83e...6340.txt)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleIndexNowSubmitAll}
              disabled={indexNowLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              {indexNowLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting to IndexNow...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Ping All Search Engines</span>
                </>
              )}
            </button>
          </div>
        </div>

        {indexNowStatus.type && (
          <div
            className={`mt-3 p-3 rounded-lg text-xs flex items-center gap-2 border ${
              indexNowStatus.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
            }`}
          >
            {indexNowStatus.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            )}
            <span>{indexNowStatus.message}</span>
          </div>
        )}
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
                        <div className="flex items-center justify-end gap-1.5">
                          {p.pagePath && (
                            <button
                              onClick={() => handlePingSingleUrl(p.pagePath)}
                              disabled={pingingPath === p.pagePath}
                              title="Instant Index with IndexNow"
                              className="p-1.5 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition rounded inline-flex items-center justify-center cursor-pointer disabled:opacity-40"
                            >
                              {pingingPath === p.pagePath ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
                              ) : (
                                <Zap className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                          {p.pagePath && (
                            <a
                              href={p.pagePath.startsWith('/') ? p.pagePath : `/${p.pagePath}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit Live Page"
                              className="p-1.5 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition rounded inline-flex items-center justify-center"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/admin/seo/${p.id}`}
                            title="Edit SEO"
                            className="p-1.5 text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition rounded inline-flex items-center justify-center cursor-pointer"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </div>
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
