'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Check,
} from 'lucide-react';
import ImageUploadField from '@/components/admin/ImageUploadField';

export interface PageSeoItem {
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
  updatedAt?: string;
}

interface SeoFormProps {
  initialData: PageSeoItem;
}

export default function SeoForm({ initialData }: SeoFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<PageSeoItem>(initialData);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const getCharCountColor = (count: number, min: number, max: number) => {
    if (count === 0) return 'text-slate-400 dark:text-slate-500';
    if (count >= min && count <= max) return 'text-emerald-600 dark:text-emerald-400 font-semibold';
    return 'text-amber-500 font-semibold';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/seo/${formData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update page SEO');
      }

      setSuccessMsg('Page SEO updated successfully!');
      setTimeout(() => {
        router.push('/admin/seo');
        router.refresh();
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/admin/seo"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Universal SEO</span>
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

      {/* Page Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-2 py-0.5 rounded">
            {formData.pageType} Page
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
            Edit SEO: {formData.pageName}
          </h1>
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {formData.pagePath}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={formData.pagePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Visit Live Page</span>
          </a>
        </div>
      </div>

      {/* Google SERP Snippet Preview */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
          Google Search Snippet Preview
        </p>
        <div className="space-y-1">
          <div className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 truncate">
            https://amplipath.com{formData.pagePath}
          </div>
          <div className="text-base text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer line-clamp-1">
            {formData.seoTitle || formData.pageName}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {formData.metaDescription || 'No meta description set. Search engines will generate a fallback snippet.'}
          </div>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6">
        {/* Core Meta Fields */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Search Engine Metadata
          </h3>

          {/* SEO Meta Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                SEO Meta Title <span className="text-rose-500">*</span>
              </label>
              <span className={`text-xs ${getCharCountColor((formData.seoTitle || '').length, 45, 65)}`}>
                {(formData.seoTitle || '').length} / 60 characters
              </span>
            </div>
            <input
              type="text"
              value={formData.seoTitle || ''}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              placeholder="e.g. Search Engine Optimization (SEO) Services | Amplipath"
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Meta Description
              </label>
              <span className={`text-xs ${getCharCountColor((formData.metaDescription || '').length, 120, 165)}`}>
                {(formData.metaDescription || '').length} / 160 characters
              </span>
            </div>
            <textarea
              rows={3}
              value={formData.metaDescription || ''}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              placeholder="Provide a concise 150-160 character description of this page..."
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>

          {/* Canonical URL & Index Setting */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Canonical URL (Optional)
              </label>
              <input
                type="text"
                value={formData.canonicalUrl || ''}
                onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                placeholder={`https://amplipath.com${formData.pagePath}`}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Search Engine Indexing
              </label>
              <select
                value={formData.noIndex ? 'noindex' : 'index'}
                onChange={(e) => setFormData({ ...formData, noIndex: e.target.value === 'noindex' })}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="index">Index (Recommended — Allow Google to Index)</option>
                <option value="noindex">Noindex (Hide from Search Engines)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Social Sharing (Open Graph) */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Social Sharing & Open Graph (Twitter / LinkedIn / Facebook)
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Social Title (OG Title)
            </label>
            <input
              type="text"
              value={formData.ogTitle || ''}
              onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
              placeholder={formData.seoTitle || ''}
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <ImageUploadField
            label="Social Sharing Image (OG Image)"
            value={formData.ogImage || ''}
            onChange={(url) => setFormData({ ...formData, ogImage: url })}
            placeholder="/images/services-og.jpg"
            helpText="Upload or choose an image to display when sharing this page on LinkedIn, Twitter, Facebook, etc."
          />
        </div>

        {/* CTA Button Settings */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Page CTA & Navigation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaText || ''}
                onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                placeholder="e.g. Speak With Our Team"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                CTA Button Destination Link
              </label>
              <input
                type="text"
                value={formData.ctaLink || ''}
                onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                placeholder="/contact"
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-5 flex items-center justify-end gap-3">
          <Link
            href="/admin/seo"
            className="px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 disabled:opacity-50 transition cursor-pointer"
          >
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
