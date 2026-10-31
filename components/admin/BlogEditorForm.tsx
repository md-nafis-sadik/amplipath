'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploadField from '@/components/admin/ImageUploadField';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Eye, Calendar, Clock, AlertTriangle, X } from 'lucide-react';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface BlogPostData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  featuredImage: string;
  imageAlt: string;
  authorName: string;
  status: 'draft' | 'published' | 'scheduled';
  scheduledAt: string;
  isFeatured: boolean;
  categoryId: number | string;
  tags: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  noIndex: boolean;
}

interface Props {
  initialData?: BlogPostData;
  categories: Category[];
  isEditing?: boolean;
}

// Convert legacy markdown into clean semantic HTML
function markdownToHtml(content: string): string {
  if (!content) return '';

  const hasHtml = /<\/?(p|h[1-6]|ul|ol|li|blockquote|div|span|strong|em)\b/i.test(content);
  if (hasHtml) return content;

  let html = content;

  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');

  // Lists
  html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*?<\/li>)/gm, (match) => `<ul>${match}</ul>`);
  html = html.replace(/<\/ul>\s*<ul>/gim, '');

  // Wrap double-newline separated blocks into <p>
  const blocks = html.split(/\n\s*\n/);
  const formatted = blocks.map((b) => {
    const trimmed = b.trim();
    if (!trimmed) return '';
    if (/^<(h[1-6]|ul|ol|blockquote|div|p)\b/i.test(trimmed)) {
      return trimmed;
    }
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  });

  return formatted.filter(Boolean).join('\n\n');
}

// Convert title into URL slug: transforms spaces & underscores to hyphens, cleans special characters
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+/, '');
}

function toLocalDatetimeString(isoOrUtc: string | null | undefined): string {
  if (!isoOrUtc) return '';
  const d = new Date(isoOrUtc);
  if (isNaN(d.getTime())) {
    if (typeof isoOrUtc === 'string' && isoOrUtc.length >= 16) {
      return isoOrUtc.slice(0, 16);
    }
    return '';
  }
  const pad = (n: number) => String(n).padStart(2, '0');
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function BlogEditorForm({ initialData, categories: initialCategories, isEditing }: Props) {
  const router = useRouter();
  const isSlugCustomized = useRef(Boolean(isEditing && initialData?.slug));

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCatName, setNewCatName] = useState('');
  const [showCatModal, setShowCatModal] = useState(false);

  const [formData, setFormData] = useState<BlogPostData>(() => {
    const data = initialData || {
      title: '',
      slug: '',
      excerpt: '',
      contentHtml: '',
      featuredImage: '',
      imageAlt: '',
      authorName: 'Amplipath Team',
      status: 'draft',
      scheduledAt: '',
      isFeatured: false,
      categoryId: '',
      tags: '',
      seoTitle: '',
      metaDescription: '',
      canonicalUrl: '',
      ogTitle: '',
      ogDescription: '',
      ogImage: '',
      noIndex: false,
    };
    return {
      ...data,
      scheduledAt: toLocalDatetimeString(data.scheduledAt),
      contentHtml: markdownToHtml(data.contentHtml || ''),
    };
  });

  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    if (!isSlugCustomized.current) {
      const autoSlug = slugify(val);
      setFormData((prev) => ({
        ...prev,
        title: val,
        slug: autoSlug,
        seoTitle: !prev.seoTitle || prev.seoTitle === prev.title ? val : prev.seoTitle,
      }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName.trim() }),
      });
      const data = await res.json();
      if (data.category) {
        setCategories((prev) => [...prev, data.category]);
        setFormData((prev) => ({ ...prev, categoryId: data.category.id }));
        setNewCatName('');
        setShowCatModal(false);
      }
    } catch (err) {
      console.error('Failed to create category:', err);
    }
  };

  const handleStatusChange = (newStatus: 'draft' | 'published' | 'scheduled') => {
    if (newStatus === 'scheduled' && !formData.scheduledAt) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);
      const pad = (n: number) => String(n).padStart(2, '0');
      const iso = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}T09:00`;
      setFormData((prev) => ({ ...prev, status: newStatus, scheduledAt: iso }));
    } else {
      setFormData((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const datePart = formData.scheduledAt ? formData.scheduledAt.slice(0, 10) : '';
  const timePart = formData.scheduledAt && formData.scheduledAt.length >= 16 ? formData.scheduledAt.slice(11, 16) : '09:00';

  const handleDateChange = (newDate: string) => {
    const currentScheduled = formData.scheduledAt || '';
    const currentTime = currentScheduled.length >= 16 ? currentScheduled.slice(11, 16) : '09:00';
    setFormData((prev) => ({ ...prev, scheduledAt: `${newDate}T${currentTime}` }));
  };

  const handleTimeChange = (newTime: string) => {
    const currentScheduled = formData.scheduledAt || '';
    let currentDate = currentScheduled ? currentScheduled.slice(0, 10) : '';
    if (!currentDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const pad = (n: number) => String(n).padStart(2, '0');
      currentDate = `${tomorrow.getFullYear()}-${pad(tomorrow.getMonth() + 1)}-${pad(tomorrow.getDate())}`;
    }
    setFormData((prev) => ({ ...prev, scheduledAt: `${currentDate}T${newTime}` }));
  };

  const setPreset = (daysAhead: number, hour = 9, minute = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    const pad = (n: number) => String(n).padStart(2, '0');
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hour)}:${pad(minute)}`;
    setFormData((prev) => ({ ...prev, scheduledAt: iso }));
  };

  const setNextMonday = () => {
    const d = new Date();
    const day = d.getDay();
    const daysUntilMonday = (8 - day) % 7 || 7;
    setPreset(daysUntilMonday, 9, 0);
  };

  const getScheduleSummary = (isoString: string): string => {
    if (!isoString) return 'Select date and time';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Invalid date';

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));

    const dateStr = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    let relativeStr = '';
    if (diffMs <= 0) {
      relativeStr = ' (Time passed — will publish immediately)';
    } else if (diffHours < 24) {
      relativeStr = ` (in ~${diffHours} hour${diffHours !== 1 ? 's' : ''})`;
    } else {
      relativeStr = ` (in ~${diffDays} day${diffDays !== 1 ? 's' : ''})`;
    }

    let tzName = '';
    try {
      tzName = ` · ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
    } catch {
      // fallback
    }

    return `${dateStr} at ${timeStr}${tzName}${relativeStr}`;
  };

  const handleSubmit = async (overrideStatus?: 'draft' | 'published' | 'scheduled') => {
    setError(null);
    if (!formData.title.trim()) {
      setError('Please provide an article title');
      return;
    }
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

    const targetStatus = overrideStatus || formData.status;

    let finalScheduledAt: string | null = null;
    if (targetStatus === 'scheduled') {
      if (!formData.scheduledAt) {
        setError('Please select a scheduled publication date and time');
        return;
      }
      const sched = new Date(formData.scheduledAt);
      if (isNaN(sched.getTime())) {
        setError('Please enter a valid scheduled date');
        return;
      }
      finalScheduledAt = sched.toISOString();
    } else if (targetStatus === 'draft') {
      finalScheduledAt = null;
    } else {
      finalScheduledAt = formData.scheduledAt ? new Date(formData.scheduledAt).toISOString() : null;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        slug: cleanSlug,
        status: targetStatus,
        scheduledAt: finalScheduledAt,
        publishedAt: targetStatus === 'published' ? new Date().toISOString() : undefined,
      };

      const url = isEditing && initialData?.id ? `/api/admin/blogs/${initialData.id}` : '/api/admin/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      router.push('/admin/blogs');
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
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Bar with Breadcrumbs & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin/blogs" className="hover:text-blue-400">
              Blog Posts
            </Link>
            <span>/</span>
            <span className="text-white">{isEditing ? 'Edit Post' : 'New Post'}</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {isEditing ? `Edit: ${formData.title || 'Untitled'}` : 'Create New Article'}
          </h1>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
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

          {formData.status === 'scheduled' ? (
            <>
              <button
                type="button"
                onClick={() => handleSubmit('scheduled')}
                disabled={saving}
                className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/30 disabled:opacity-50 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>{saving ? 'Scheduling...' : isEditing ? 'Update Schedule' : 'Schedule Post'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={saving}
                className="px-3.5 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition disabled:opacity-50 whitespace-nowrap shrink-0"
                title="Override schedule and publish article to live site right now"
              >
                Publish Now
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => handleSubmit('published')}
              disabled={saving}
              className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/30 disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              {saving ? 'Saving...' : isEditing ? 'Update Article' : 'Publish Now'}
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: Left Editor (2 cols) & Right Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Title, Slug, Content & SEO */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Title */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Article Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                onBlur={() => {
                  if (!isSlugCustomized.current) {
                    setFormData((prev) => ({
                      ...prev,
                      slug: prev.slug.replace(/-+$/, ''),
                    }));
                  }
                }}
                placeholder="e.g. How Generative Engine Optimization (GEO) Works in 2026"
                required
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-md text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                URL Slug (Permalink) *
              </label>
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs">
                <span className="text-slate-500 font-mono">https://amplipath.com/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (!raw) {
                      isSlugCustomized.current = false;
                      setFormData((prev) => ({ ...prev, slug: slugify(prev.title) }));
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
                  placeholder="post-slug"
                  className="bg-transparent text-blue-600 dark:text-blue-400 font-mono focus:outline-none flex-1 ml-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Short Excerpt / Summary
              </label>
              <textarea
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief 1-2 sentence teaser shown on blog archive cards and RSS feeds..."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>
          </div>

          {/* WordPress-Grade Article Rich Text Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Article Body Content (Visual WYSIWYG &amp; Raw HTML) *
              </label>
              <span className="text-[11px] text-slate-400">
                TipTap Rich Text Engine • Headings, Bold, Lists &amp; Direct Image Uploads
              </span>
            </div>

            <RichTextEditor
              content={formData.contentHtml}
              onChange={(html) =>
                setFormData((prev) => ({ ...prev, contentHtml: html }))
              }
              placeholder="Write your article here... Select Heading 2, Paragraph, Lists, or click 'Upload Image' to insert photos directly."
            />
          </div>

          {/* SEO & Article Schema Accordion */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                  SEO &amp; Structured Data (Article Schema)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Controls Google search rankings, Open Graph social sharing, and automated JSON-LD Article Schema.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                Article Schema Enabled
              </span>
            </div>

            {/* Google Snippet Live Preview */}
            <div className="p-4 rounded-md bg-slate-950 border border-slate-800">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Google Search Snippet Preview
              </p>
              <div className="space-y-1">
                <div className="text-xs font-mono font-medium text-emerald-700 dark:text-emerald-400 truncate">
                  https://amplipath.com/blog/{formData.slug || 'article-slug'}
                </div>
                <div className="text-base text-blue-600 dark:text-blue-400 font-semibold line-clamp-1">
                  {formData.seoTitle || formData.title || 'Article Title'}
                </div>
                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {formData.metaDescription ||
                    formData.excerpt ||
                    'Article excerpt will appear here in Google search engine result snippets...'}
                </div>
              </div>
            </div>

            {/* SEO Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">SEO Meta Title</label>
                <span className="text-xs text-slate-500">
                  {(formData.seoTitle || '').length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={formData.seoTitle}
                onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                placeholder="Title optimized for Google search (50-60 chars)..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300">Meta Description</label>
                <span className="text-xs text-slate-500">
                  {(formData.metaDescription || '').length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) =>
                  setFormData({ ...formData, metaDescription: e.target.value })
                }
                placeholder="Meta description for search engines (150-160 chars)..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            {/* Canonical URL & Noindex */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Canonical URL (Optional)
                </label>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, canonicalUrl: e.target.value })
                  }
                  placeholder={`https://amplipath.com/blog/${formData.slug || ''}`}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Search Indexing
                </label>
                <select
                  value={formData.noIndex ? 'noindex' : 'index'}
                  onChange={(e) =>
                    setFormData({ ...formData, noIndex: e.target.value === 'noindex' })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="index">Index (Recommended — Visible to Google)</option>
                  <option value="noindex">Noindex (Hide from Search Results)</option>
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
                    placeholder={formData.seoTitle || formData.title}
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
                    onChange={(e) => setFormData({ ...formData, ogDescription: e.target.value })}
                    placeholder={formData.metaDescription || formData.excerpt}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Social Card Image (OG Image)"
                value={formData.ogImage}
                onChange={(url) => setFormData({ ...formData, ogImage: url })}
                placeholder={formData.featuredImage || '/images/logo-horizontal.jpg'}
                helpText="Image displayed when this blog post is shared on social networks."
              />
            </div>
          </div>
        </div>

        {/* Right Column: Publishing Controls, Category, Featured Image, Author */}
        <div className="space-y-6">
          {/* Status & Publication Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Publishing Status
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1 font-medium">Article State</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as 'draft' | 'published' | 'scheduled')
                }
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              >
                <option value="draft">Draft (Private)</option>
                <option value="published">Published (Live &amp; in Sitemap)</option>
                <option value="scheduled">Scheduled for Future Date</option>
              </select>
            </div>

            {/* UP-TO-THE-MARK DATE TIME SCHEDULER */}
            {formData.status === 'scheduled' && (
              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Schedule Release</span>
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono font-medium">Automatic</span>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1.5 font-semibold">
                    Quick Presets
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPreset(1, 9, 0)}
                      className="px-2 py-1.5 text-[11px] font-medium rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-center"
                    >
                      Tomorrow 9 AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreset(2, 9, 0)}
                      className="px-2 py-1.5 text-[11px] font-medium rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-center"
                    >
                      In 2 Days
                    </button>
                    <button
                      type="button"
                      onClick={setNextMonday}
                      className="px-2 py-1.5 text-[11px] font-medium rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-center"
                    >
                      Next Mon 9 AM
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreset(7, 9, 0)}
                      className="px-2 py-1.5 text-[11px] font-medium rounded-md bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-center"
                    >
                      In 1 Week
                    </button>
                  </div>
                </div>

                {/* Date & Time Clean Separate Inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>Release Date</span>
                    </label>
                    <input
                      type="date"
                      value={datePart}
                      onChange={(e) => handleDateChange(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>Time (24h · Local)</span>
                    </label>
                    <input
                      type="time"
                      value={timePart}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>
                </div>

                {/* Schedule Summary Banner */}
                {formData.scheduledAt && (
                  <div className="p-2.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-blue-400 block tracking-wider">
                        Scheduled Release Time
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 font-medium leading-relaxed">
                        {getScheduleSummary(formData.scheduledAt)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Dedicated Inline Schedule Action Button */}
                <button
                  type="button"
                  onClick={() => handleSubmit('scheduled')}
                  disabled={saving}
                  className="w-full py-2.5 px-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-1"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{saving ? 'Scheduling Article...' : isEditing ? 'Update Schedule' : 'Schedule Article'}</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
              <input
                type="checkbox"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isFeatured" className="text-xs font-semibold text-slate-300">
                Mark as Featured Article
              </label>
            </div>
          </div>

          {/* Category Selector */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Blog Category
              </h3>
              <button
                type="button"
                onClick={() => setShowCatModal(true)}
                className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold"
              >
                + New Category
              </button>
            </div>

            <select
              value={formData.categoryId || ''}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-md text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-4">
            <ImageUploadField
              label="Featured Hero Image"
              value={formData.featuredImage}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
              placeholder="/images/blog/feature.jpg"
              helpText="Primary hero image displayed at the top of the article & blog listing."
            />

            <div>
              <label className="block text-xs text-slate-400 mb-1">Image Alt Text (SEO)</label>
              <input
                type="text"
                value={formData.imageAlt}
                onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                placeholder="Descriptive alt text for accessibility & image search"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Author & Tags */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Author &amp; Tags
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Author Name</label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                placeholder="Amplipath Team"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Tags (Comma-separated)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="SEO, Generative AI, LLMs, Perplexity"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* New Category Modal */}
      {showCatModal && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowCatModal(false)}
        >
          <div
            className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Create New Category</h3>
              <button
                type="button"
                onClick={() => setShowCatModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateCategory} className="space-y-3">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="Category Name (e.g. Paid Media)"
                required
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCatModal(false)}
                  className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="w-full max-w-3xl bg-white text-slate-900 rounded-lg p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600">
                Live Article Preview
              </span>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
                title="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <article className="space-y-4">
              <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {formData.title || 'Untitled Article'}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 pb-2 border-b">
                <span>By {formData.authorName}</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                {formData.tags && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600 font-semibold">{formData.tags}</span>
                  </>
                )}
              </div>

              {formData.featuredImage && (
                <div className="rounded-md overflow-hidden aspect-video relative my-4">
                  <img
                    src={formData.featuredImage}
                    alt={formData.imageAlt || 'Article banner'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formData.contentHtml || '<p>No content written yet.</p>' }}
              />
            </article>
          </div>
        </div>
      )}

      {/* Global CSS for Visual Editor rich typography */}
      <style jsx global>{`
        .visual-editor-content h1 {
          font-size: 1.85rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .visual-editor-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
          line-height: 1.25;
        }
        .visual-editor-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #93c5fd;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }
        .visual-editor-content p {
          margin-bottom: 0.85rem;
          line-height: 1.7;
          color: #cbd5e1;
        }
        .visual-editor-content strong {
          font-weight: 700;
          color: #ffffff;
        }
        .visual-editor-content em {
          font-style: italic;
          color: #94a3b8;
        }
        .visual-editor-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #cbd5e1;
        }
        .visual-editor-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
          color: #cbd5e1;
        }
        .visual-editor-content li {
          margin-bottom: 0.35rem;
          line-height: 1.6;
        }
        .visual-editor-content blockquote {
          border-left: 4px solid #3b82f6;
          padding: 0.5rem 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #94a3b8;
          background: rgba(15, 23, 42, 0.7);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .visual-editor-content a {
          color: #60a5fa;
          text-decoration: underline;
        }
        .visual-editor-content img {
          max-width: 100%;
          border-radius: 0.75rem;
          margin: 1rem 0;
          border: 1px solid #334155;
        }
      `}</style>
    </div>
  );
}
