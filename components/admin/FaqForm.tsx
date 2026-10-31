'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Search,
  Check,
} from 'lucide-react';

interface PageItem {
  pagePath: string;
  pageName: string;
  pageType: string;
}

interface FaqFormData {
  id?: number;
  question: string;
  answer: string;
  category: string;
  sortOrder?: number;
  assignedPages: string[];
}

interface FaqFormProps {
  initialData?: FaqFormData;
  pages: PageItem[];
  isEditing?: boolean;
}

export default function FaqForm({ initialData, pages, isEditing = false }: FaqFormProps) {
  const router = useRouter();

  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [category, setCategory] = useState(initialData?.category || 'General');
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sortOrder ?? 0);
  const [assignedPages, setAssignedPages] = useState<string[]>(initialData?.assignedPages || []);
  const [pageSearch, setPageSearch] = useState('');

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const togglePageAssignment = (path: string) => {
    setAssignedPages((prev) =>
      prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
    );
  };

  const handleSelectAllServices = () => {
    const servicePaths = pages.filter((p) => p.pageType === 'service').map((p) => p.pagePath);
    setAssignedPages((prev) => Array.from(new Set([...prev, ...servicePaths])));
  };

  const handleSelectAllIndustries = () => {
    const industryPaths = pages.filter((p) => p.pageType === 'industry').map((p) => p.pagePath);
    setAssignedPages((prev) => Array.from(new Set([...prev, ...industryPaths])));
  };

  const handleClearAssignments = () => {
    setAssignedPages([]);
  };

  const filteredPages = pages.filter(
    (p) =>
      p.pageName.toLowerCase().includes(pageSearch.toLowerCase()) ||
      p.pagePath.toLowerCase().includes(pageSearch.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!question.trim() || !answer.trim()) {
      setErrorMsg('Question and Answer are required.');
      return;
    }

    try {
      setSaving(true);
      const payload = {
        question: question.trim(),
        answer: answer.trim(),
        category: category.trim() || 'General',
        sortOrder: parseInt(String(sortOrder), 10) || 0,
        assignedPages,
      };

      const url = isEditing && initialData?.id
        ? `/api/admin/faqs/${initialData.id}`
        : '/api/admin/faqs';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save FAQ.');
      }

      setSuccessMsg(
        isEditing ? 'FAQ item updated successfully!' : 'FAQ item created successfully!'
      );

      setTimeout(() => {
        router.push('/admin/faqs');
        router.refresh();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/admin/faqs"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to FAQs</span>
        </Link>
      </div>

      {/* Alerts */}
      {errorMsg && (
        <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {isEditing ? 'Edit FAQ Item' : 'New FAQ Item'}
          </h2>

          {/* Question */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Question <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How long does a typical SEO campaign take to show results?"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Answer */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Answer <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Provide an in-depth, clear response..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed transition"
            />
          </div>

          {/* Category & Serial Sort Order */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Category / Grouping
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. General, Web Development, SEO, Pricing"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] text-slate-400">Quick select:</span>
                {['General', 'Services', 'Pricing', 'Technical', 'Timeline'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setCategory(preset)}
                    className={`text-[11px] px-2 py-0.5 rounded border transition cursor-pointer ${
                      category === preset
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-700/50 font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Serial Order Number
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                placeholder="0"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <p className="text-[11px] text-slate-400 mt-2">
                Position sequence when displayed with other FAQs.
              </p>
            </div>
          </div>

          {/* Page Assignments */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Page Assignments ({assignedPages.length} selected)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select which pages display this FAQ. Automatically included in page FAQPage JSON-LD schema.
                </p>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleSelectAllServices}
                  className="text-[11px] px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition"
                >
                  + All Services
                </button>
                <button
                  type="button"
                  onClick={handleSelectAllIndustries}
                  className="text-[11px] px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 font-medium transition"
                >
                  + All Industries
                </button>
                {assignedPages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAssignments}
                    className="text-[11px] px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Search inside page assignments */}
            <div className="relative">
              <input
                type="text"
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                placeholder="Filter pages list..."
                className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Pages checkboxes list */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border border-slate-200 dark:border-slate-800 rounded-md p-2 bg-white dark:bg-slate-900">
              {filteredPages.length === 0 ? (
                <div className="p-3 text-center text-xs text-slate-400">No matching pages</div>
              ) : (
                filteredPages.map((p) => {
                  const isChecked = assignedPages.includes(p.pagePath);
                  return (
                    <label
                      key={p.pagePath}
                      className={`flex items-center justify-between p-1.5 rounded text-xs cursor-pointer transition ${
                        isChecked
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-slate-900 dark:text-white'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePageAssignment(p.pagePath)}
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 shrink-0"
                        />
                        <span className="font-medium truncate">{p.pageName}</span>
                        <span className="text-[11px] text-slate-400 font-mono truncate">{p.pagePath}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold shrink-0 ml-2">
                        {p.pageType}
                      </span>
                    </label>
                  );
                })
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/faqs"
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/30 disabled:opacity-50 inline-flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Saving FAQ...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Create FAQ Item'}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
