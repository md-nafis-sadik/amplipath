'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploadField from '@/components/admin/ImageUploadField';
import MultiImageUploadField from '@/components/admin/MultiImageUploadField';
import { Eye, AlertTriangle, ArrowLeft, X } from 'lucide-react';

// Convert title into URL slug: transforms spaces & underscores to hyphens, cleans special characters
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '');
}

interface KeyStat {
  label: string;
  value: string;
}

interface CaseStudyData {
  id?: number;
  name: string;
  slug: string;
  industry: string;
  headline: string;
  metric: string;
  metricLabel: string;
  summary: string;
  image: string;
  clientWebsite: string;
  appStoreUrl: string;
  playStoreUrl: string;
  overview: string;
  solution: string;
  results: string;
  services: string;
  deliverables: string;
  screenshots: string;
  keyStats: KeyStat[];
  status: 'draft' | 'published';
  isFeatured: boolean;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  noIndex: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

interface Props {
  initialData?: CaseStudyData;
  isEditing?: boolean;
}

export default function CaseStudyForm({ initialData, isEditing }: Props) {
  const router = useRouter();

  const [formData, setFormData] = useState<CaseStudyData>(
    initialData || {
      name: '',
      slug: '',
      industry: '',
      headline: '',
      metric: '',
      metricLabel: '',
      summary: '',
      image: '',
      clientWebsite: '',
      appStoreUrl: '',
      playStoreUrl: '',
      overview: '',
      solution: '',
      results: '',
      services: '',
      deliverables: '',
      screenshots: '',
      keyStats: [{ label: '', value: '' }],
      status: 'published',
      isFeatured: false,
      seoTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      noIndex: false,
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
    }
  );

  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isSlugCustomized = useRef(Boolean(isEditing && initialData?.slug));

  const handleNameChange = (val: string) => {
    if (!isSlugCustomized.current) {
      const autoSlug = slugify(val);
      setFormData((prev) => ({
        ...prev,
        name: val,
        slug: autoSlug,
        seoTitle: !prev.seoTitle || prev.seoTitle.includes('Case Study') ? `${val} Case Study | Amplipath` : prev.seoTitle,
      }));
    } else {
      setFormData((prev) => ({ ...prev, name: val }));
    }
  };

  const handleAddKeyStat = () => {
    setFormData((prev) => ({
      ...prev,
      keyStats: [...prev.keyStats, { label: '', value: '' }],
    }));
  };

  const handleUpdateKeyStat = (index: number, field: 'label' | 'value', val: string) => {
    setFormData((prev) => {
      const updated = [...prev.keyStats];
      updated[index][field] = val;
      return { ...prev, keyStats: updated };
    });
  };

  const handleRemoveKeyStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      keyStats: prev.keyStats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (overrideStatus?: 'draft' | 'published') => {
    setError(null);
    const cleanSlug = formData.slug
      .trim()
      .toLowerCase()
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    if (!cleanSlug) {
      setError('Please provide a valid URL slug');
      return;
    }

    setSaving(true);

    const payload = {
      ...formData,
      slug: cleanSlug,
      status: overrideStatus || formData.status,
      services: typeof formData.services === 'string'
        ? formData.services.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.services,
      deliverables: typeof formData.deliverables === 'string'
        ? formData.deliverables.split(',').map((s) => s.trim()).filter(Boolean)
        : formData.deliverables,
      screenshots: typeof formData.screenshots === 'string'
        ? formData.screenshots.split('\n').map((s) => s.trim()).filter(Boolean)
        : formData.screenshots,
    };

    try {
      const url = isEditing
        ? `/api/admin/portfolio/${initialData?.id}`
        : '/api/admin/portfolio';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save case study');
      }

      router.push('/admin/portfolio');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while saving.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolio"
            className="p-2 rounded-md bg-slate-800 text-slate-300 hover:text-white transition flex items-center justify-center"
            title="Back to Portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isEditing ? `Edit Case Study: ${formData.name || 'Untitled'}` : 'New Case Study Project'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Showcase verified client results, key metrics, screenshot deliverables, and CreativeWork schema.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="px-3.5 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Eye className="w-4 h-4 shrink-0" />
            <span>Preview</span>
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={saving}
            className="px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={saving}
            className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/30 disabled:opacity-50 whitespace-nowrap shrink-0"
          >
            {saving ? 'Saving...' : isEditing ? 'Update Case Study' : 'Publish Project'}
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Client Info, Metrics, Narrative & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Client & Metric Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Project &amp; Client Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Client / Project Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  onBlur={() => {
                    if (!isSlugCustomized.current) {
                      setFormData((prev) => ({
                        ...prev,
                        slug: prev.slug.replace(/-+$/, ''),
                      }));
                    }
                  }}
                  placeholder="e.g. Amber’s Eternal"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Industry / Niche
                </label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Health, Beauty & Ecommerce"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                URL Slug (Permalink) *
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs">
                <span className="text-slate-500 font-mono">https://amplipath.com/work/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (!raw) {
                      isSlugCustomized.current = false;
                      setFormData((prev) => ({ ...prev, slug: slugify(prev.name) }));
                    } else {
                      isSlugCustomized.current = true;
                      const formatted = raw
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, '')
                        .replace(/[\s_]+/g, '-')
                        .replace(/-+/g, '-')
                        .replace(/^-+/, '');
                      setFormData((prev) => ({ ...prev, slug: formatted }));
                    }
                  }}
                  onBlur={() => {
                    setFormData((prev) => ({
                      ...prev,
                      slug: prev.slug.replace(/-+$/, ''),
                    }));
                  }}
                  placeholder="project-slug"
                  className="bg-transparent text-blue-600 dark:text-blue-400 font-mono focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Headline / Result Subtitle
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                placeholder="e.g. Full ecommerce development and technical SEO created a search-ready path to checkout."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Standout Hero Metric */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-md bg-slate-950 border border-slate-800/80">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Metric (e.g. +140%, 12.4x, $2.4M)
                </label>
                <input
                  type="text"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  placeholder="+140%"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm font-bold text-blue-400 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  value={formData.metricLabel}
                  onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                  placeholder="Increase in organic website traffic"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-md text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Card Summary (Shown in portfolio grid &amp; social previews)
              </label>
              <textarea
                rows={2}
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Brief summary of the challenge and transformation..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Full Narrative Sections */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Case Study Narrative Sections
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                1. The Background &amp; Opportunity (The Problem)
              </label>
              <textarea
                rows={4}
                value={formData.overview}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                placeholder="Describe the client's original position, challenges, and what needed to be solved..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                2. Our Solution &amp; Strategy
              </label>
              <textarea
                rows={4}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Detail the technical architecture, marketing strategy, design iterations, or AI workflows delivered..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                3. The Results &amp; Business Impact
              </label>
              <textarea
                rows={4}
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                placeholder="Document the verified business results, revenue lifts, conversion rates, and client growth..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* Key Stats Builder (Repeater) */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Key Performance Indicators (Stats Grid)
              </h2>
              <button
                type="button"
                onClick={handleAddKeyStat}
                className="px-3 py-1 rounded-md bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 text-xs font-semibold"
              >
                + Add KPI
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.keyStats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleUpdateKeyStat(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. +90%)"
                    className="w-1/3 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs font-bold text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateKeyStat(idx, 'label', e.target.value)}
                    placeholder="Metric Label (e.g. Conversion Lift)"
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyStat(idx)}
                    className="p-2 text-slate-500 hover:text-red-400 rounded-md hover:bg-red-500/10 transition"
                    title="Remove Stat"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO & CreativeWork Schema */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Portfolio SEO &amp; Schema Settings
              </h2>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                CreativeWork Schema Active
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="e.g. Amber’s Eternal Case Study | Amplipath"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                placeholder="Google search description for this case study..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Canonical URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, canonicalUrl: e.target.value })
                  }
                  placeholder={`https://amplipath.com/work/${formData.slug || ''}`}
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Search Engine Indexing
                </label>
                <select
                  value={formData.noIndex ? 'noindex' : 'index'}
                  onChange={(e) =>
                    setFormData({ ...formData, noIndex: e.target.value === 'noindex' })
                  }
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="index">Index (Recommended — Permanently Visible)</option>
                  <option value="noindex">Noindex (Hide from Search Engines)</option>
                </select>
              </div>
            </div>

            {/* Open Graph Social Sharing */}
            <div className="border-t border-slate-800 pt-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Open Graph Social Sharing
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Social Card Title
                  </label>
                  <input
                    type="text"
                    value={formData.ogTitle}
                    onChange={(e) => setFormData({ ...formData, ogTitle: e.target.value })}
                    placeholder={formData.seoTitle || formData.name}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Social Card Description
                  </label>
                  <input
                    type="text"
                    value={formData.ogDescription}
                    onChange={(e) =>
                      setFormData({ ...formData, ogDescription: e.target.value })
                    }
                    placeholder={formData.metaDescription || formData.headline}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Social Sharing Image (OG Image)"
                value={formData.ogImage}
                onChange={(url) => setFormData({ ...formData, ogImage: url })}
                placeholder={formData.image || '/images/logo-horizontal.jpg'}
                helpText="Recommended: 1200x630px JPG or PNG for LinkedIn, Twitter and Facebook."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Status, Images, External Links & Tags */}
        <div className="space-y-6">
          {/* Status & Featured */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Publishing Options
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as 'draft' | 'published',
                  })
                }
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              >
                <option value="published">Published (Visible on /work &amp; Sitemap)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-300">
                Feature on Homepage
              </label>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <ImageUploadField
              label="Featured Hero Image"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              placeholder="/images/portfolio/amber.jpg"
              helpText="Primary hero image displayed in the portfolio directory & case study header."
            />
          </div>

          {/* Screenshots Gallery */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <MultiImageUploadField
              label="Project Screenshots Gallery"
              value={
                formData.screenshots
                  ? formData.screenshots
                      .split('\n')
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : []
              }
              onChange={(urls) =>
                setFormData({ ...formData, screenshots: urls.join('\n') })
              }
              helpText="Upload screenshots or device mockups in bulk. Links are saved automatically."
            />
          </div>

          {/* Client Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Client &amp; App Links
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Live Website URL</label>
              <input
                type="url"
                value={formData.clientWebsite}
                onChange={(e) =>
                  setFormData({ ...formData, clientWebsite: e.target.value })
                }
                placeholder="https://clientwebsite.com"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Apple App Store URL</label>
              <input
                type="url"
                value={formData.appStoreUrl}
                onChange={(e) => setFormData({ ...formData, appStoreUrl: e.target.value })}
                placeholder="https://apps.apple.com/..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Google Play Store URL</label>
              <input
                type="url"
                value={formData.playStoreUrl}
                onChange={(e) =>
                  setFormData({ ...formData, playStoreUrl: e.target.value })
                }
                placeholder="https://play.google.com/..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Services & Deliverables Tags */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Services &amp; Deliverables
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Services Provided (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Web Development, Technical SEO, CRO"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Deliverables &amp; Tags (Comma-separated)
              </label>
              <input
                type="text"
                value={formData.deliverables}
                onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                placeholder="Mobile-First, Next.js, Stripe Integration"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 text-white rounded-lg p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-400">
                Case Study Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {formData.industry || 'Industry'}
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight mt-2">
                {formData.name || 'Project Name'}
              </h1>
              <p className="text-sm text-slate-400 mt-1">{formData.headline}</p>

              {formData.metric && (
                <div className="my-6 p-4 rounded-md bg-blue-900/30 border border-blue-500/30 inline-block">
                  <div className="text-3xl font-bold text-blue-400">{formData.metric}</div>
                  <div className="text-xs text-slate-300 font-semibold">{formData.metricLabel}</div>
                </div>
              )}

              {formData.image && (
                <div className="rounded-md overflow-hidden aspect-video relative my-4 border border-slate-800">
                  <img
                    src={formData.image}
                    alt={formData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4 text-sm text-slate-300 mt-6 leading-relaxed">
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
                    The Opportunity
                  </h3>
                  <p>{formData.overview || 'Overview narrative...'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
                    The Solution
                  </h3>
                  <p>{formData.solution || 'Solution narrative...'}</p>
                </div>
                <div>
                  <h3 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
                    The Results
                  </h3>
                  <p>{formData.results || 'Results narrative...'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
