'use client';

import React, { useState, useEffect } from 'react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { Search, Pencil, X, Check } from 'lucide-react';
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
  const [editingPage, setEditingPage] = useState<PageSeoItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;
    setSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`/api/admin/seo/${editingPage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPage),
      });

      if (!res.ok) throw new Error('Failed to update page SEO');

      const data = await res.json();
      setPages((prev) =>
        prev.map((p) => (p.id === editingPage.id ? data.page : p))
      );
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setEditingPage(null);
      }, 1000);
    } catch (err) {
      console.error(err);
      alert('Error updating page SEO');
    } finally {
      setSaving(false);
    }
  };

  const getCharCountColor = (count: number, min: number, max: number) => {
    if (count === 0) return 'text-slate-500';
    if (count >= min && count <= max) return 'text-emerald-400 font-bold';
    return 'text-amber-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Universal SEO Manager</h1>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'All Pages', value: 'all' },
            { label: 'Services (73)', value: 'service' },
            { label: 'Industries (11)', value: 'industry' },
            { label: 'Core Pages', value: 'core' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setTypeFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                typeFilter === tab.value
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
            placeholder="Search by page title or slug (e.g. seo, fintech, /work)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading pages...</span>
          </div>
        ) : pages.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No pages found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Page / Path</th>
                  <th className="py-3.5 px-4">SEO Title</th>
                  <th className="py-3.5 px-4">Meta Description</th>
                  <th className="py-3.5 px-4 text-center">Robots</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {pages.map((p) => {
                  const titleLen = (p.seoTitle || '').length;
                  const descLen = (p.metaDescription || '').length;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{p.pageName}</div>
                        <div className="font-mono text-[11px] text-blue-600 dark:text-blue-400 mt-0.5">
                          {p.pagePath}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <p className="truncate text-slate-800 dark:text-slate-200">
                          {p.seoTitle || <span className="text-slate-400 dark:text-slate-600 italic">None set</span>}
                        </p>
                        <span className={`text-[10px] ${getCharCountColor(titleLen, 45, 65)}`}>
                          {titleLen} chars
                        </span>
                      </td>
                      <td className="py-3 px-4 max-w-md">
                        <p className="truncate text-slate-600 dark:text-slate-400">
                          {p.metaDescription || <span className="text-slate-400 dark:text-slate-600 italic">None set</span>}
                        </p>
                        <span className={`text-[10px] ${getCharCountColor(descLen, 120, 165)}`}>
                          {descLen} chars
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
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
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setEditingPage(p)}
                          title="Edit SEO"
                          className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
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

      {/* Edit SEO Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                  {editingPage.pageType} Page
                </span>
                <h2 className="text-xl font-bold text-white mt-1">Edit SEO: {editingPage.pageName}</h2>
                <p className="font-mono text-xs text-slate-400">{editingPage.pagePath}</p>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google SERP Preview Card */}
            <div className="p-4 rounded-md bg-slate-950 border border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Google Search Snippet Preview
              </p>
              <div className="space-y-1">
                <div className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400">
                  https://amplipath.com{editingPage.pagePath}
                </div>
                <div className="text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer line-clamp-1">
                  {editingPage.seoTitle || editingPage.pageName}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {editingPage.metaDescription || 'No meta description set. Search engines will generate a fallback snippet.'}
                </div>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* SEO Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    SEO Meta Title
                  </label>
                  <span className={`text-xs ${getCharCountColor((editingPage.seoTitle || '').length, 45, 65)}`}>
                    {(editingPage.seoTitle || '').length} / 60 characters
                  </span>
                </div>
                <input
                  type="text"
                  value={editingPage.seoTitle || ''}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, seoTitle: e.target.value })
                  }
                  placeholder="e.g. Search Engine Optimization (SEO) Services | Amplipath"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Meta Description
                  </label>
                  <span className={`text-xs ${getCharCountColor((editingPage.metaDescription || '').length, 120, 165)}`}>
                    {(editingPage.metaDescription || '').length} / 160 characters
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={editingPage.metaDescription || ''}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, metaDescription: e.target.value })
                  }
                  placeholder="Provide a compelling 150-160 character description of this page..."
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              {/* Canonical URL & Index Setting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Canonical URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={editingPage.canonicalUrl || ''}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, canonicalUrl: e.target.value })
                    }
                    placeholder={`https://amplipath.com${editingPage.pagePath}`}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Search Engine Indexing
                  </label>
                  <select
                    value={editingPage.noIndex ? 'noindex' : 'index'}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, noIndex: e.target.value === 'noindex' })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="index">Index (Recommended — Allow Google to Index)</option>
                    <option value="noindex">Noindex (Hide from Search Engines)</option>
                  </select>
                </div>
              </div>

              {/* Social Sharing (Open Graph) */}
              <div className="border-t border-slate-800 pt-4 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Social Sharing & Open Graph (Twitter / LinkedIn / Facebook)
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Social Title (OG Title)
                  </label>
                  <input
                    type="text"
                    value={editingPage.ogTitle || ''}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, ogTitle: e.target.value })
                    }
                    placeholder={editingPage.seoTitle || ''}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <ImageUploadField
                  label="Social Sharing Image (OG Image)"
                  value={editingPage.ogImage || ''}
                  onChange={(url) =>
                    setEditingPage({ ...editingPage, ogImage: url })
                  }
                  placeholder="/images/services-og.jpg"
                  helpText="Upload or choose an image to display when sharing this page on LinkedIn, Twitter, etc."
                />
              </div>

              {/* Editable Page Content / CTA */}
              <div className="border-t border-slate-800 pt-4 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Page CTA & Breadcrumb
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      CTA Button Text
                    </label>
                    <input
                      type="text"
                      value={editingPage.ctaText || ''}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, ctaText: e.target.value })
                      }
                      placeholder="e.g. Speak With Our Team"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      CTA Button Destination Link
                    </label>
                    <input
                      type="text"
                      value={editingPage.ctaLink || ''}
                      onChange={(e) =>
                        setEditingPage({ ...editingPage, ctaLink: e.target.value })
                      }
                      placeholder="/contact"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Save Footer */}
              <div className="border-t border-slate-800 pt-5 flex items-center justify-end gap-3">
                {saveSuccess && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 mr-auto">
                    <Check className="w-4 h-4" /> Saved successfully!
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-lg shadow-blue-600/30 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
