'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
} from 'lucide-react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface JobData {
  id?: number;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  employmentType: string;
  location: string;
  compensation: string | null;
  compDetail: string | null;
  description: string;
  responsibilities: string[] | string | null;
  requirements: string[] | string | null;
  status: string;
}

interface CareerFormProps {
  initialData?: JobData;
  isEditing?: boolean;
}

export default function CareerForm({ initialData, isEditing = false }: CareerFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [category, setCategory] = useState(initialData?.category || 'Engineering');
  const [categoryLabel, setCategoryLabel] = useState(initialData?.categoryLabel || 'Technology & Engineering');
  const [employmentType, setEmploymentType] = useState(initialData?.employmentType || 'Full-time / Remote');
  const [location, setLocation] = useState(initialData?.location || 'Remote · Worldwide');
  const [compensation, setCompensation] = useState(initialData?.compensation || 'Competitive');
  const [compDetail, setCompDetail] = useState(initialData?.compDetail || 'DOE / Experience');
  const [description, setDescription] = useState(initialData?.description || '');

  // Convert array or string into newline-separated text for clean editing
  const formatList = (val: any): string => {
    if (!val) return '';
    if (Array.isArray(val)) return val.join('\n');
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed.join('\n');
    } catch {}
    return String(val);
  };

  const [responsibilitiesText, setResponsibilitiesText] = useState(
    formatList(initialData?.responsibilities)
  );
  const [requirementsText, setRequirementsText] = useState(
    formatList(initialData?.requirements)
  );
  const [status, setStatus] = useState(initialData?.status || 'active');

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanTitle = title.trim();
    const cleanDesc = description.trim();

    if (!cleanTitle || !cleanDesc) {
      setErrorMsg('Job Title and Description are required.');
      return;
    }

    const responsibilities = responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = requirementsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      setSaving(true);
      const payload = {
        title: cleanTitle,
        slug: slug.trim() || slugify(cleanTitle),
        category,
        categoryLabel,
        employmentType,
        location,
        compensation,
        compDetail,
        description: cleanDesc,
        responsibilities,
        requirements,
        status,
      };

      const url = isEditing && initialData?.id
        ? `/api/admin/careers/${initialData.id}`
        : '/api/admin/careers';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save job opening.');
      }

      setSuccessMsg(
        isEditing ? 'Job listing updated successfully!' : 'Job listing created successfully!'
      );

      setTimeout(() => {
        router.push('/admin/careers');
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
          href="/admin/careers"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Careers</span>
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
            {isEditing ? 'Edit Job Opening' : 'New Job Opening'}
          </h2>

          {/* Job Title & Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Job Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Senior Full-Stack Engineer"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                URL Slug <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="senior-full-stack-engineer"
                  className="w-full pl-20 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                <span className="text-slate-400 text-xs font-mono absolute left-3 top-3 pointer-events-none select-none">
                  /careers/
                </span>
              </div>
            </div>
          </div>

          {/* Category / Department & Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Department
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const cat = e.target.value;
                  setCategory(cat);
                  if (cat === 'Engineering') setCategoryLabel('Technology & Engineering');
                  else if (cat === 'Marketing') setCategoryLabel('Growth & Digital Marketing');
                  else if (cat === 'Design') setCategoryLabel('Brand, UI & Product Design');
                  else if (cat === 'Sales') setCategoryLabel('Business Development & Partnerships');
                  else if (cat === 'Operations') setCategoryLabel('Client Operations & Delivery');
                }}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Category Display Label
              </label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Technology & Engineering"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Employment Type & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Employment Type
              </label>
              <input
                type="text"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                placeholder="e.g. Full-time, Project-Based / Contract"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote · Worldwide, Hybrid (London, UK)"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* Compensation & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Compensation / Salary
              </label>
              <input
                type="text"
                value={compensation || ''}
                onChange={(e) => setCompensation(e.target.value)}
                placeholder="e.g. Competitive / Project-Based, $90k - $120k / yr"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Listing Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="active">Active (Visible on Careers page)</option>
                <option value="draft">Draft (Unpublished)</option>
                <option value="archived">Archived (Closed opening)</option>
              </select>
            </div>
          </div>

          {/* Job Overview / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Job Description / Overview <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a comprehensive summary of this role..."
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed transition"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Key Responsibilities (One item per line)
            </label>
            <textarea
              rows={4}
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder={"Architect high-performance web applications\nCollaborate directly with product and design\nConduct code reviews and optimize Core Web Vitals"}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed transition"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Requirements &amp; Qualifications (One item per line)
            </label>
            <textarea
              rows={4}
              value={requirementsText}
              onChange={(e) => setRequirementsText(e.target.value)}
              placeholder={"3+ years of professional React & TypeScript experience\nStrong understanding of Next.js App Router and SSR\nTrack record of shipping production web software"}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed transition"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Link
              href="/admin/careers"
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
                  <span>Saving Job Opening...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Create Job Opening'}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
