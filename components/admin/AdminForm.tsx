'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Shield,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Feather,
  Check,
  ChevronDown,
} from 'lucide-react';
import { ADMIN_ROLES, AdminRole, normalizeRole } from '@/lib/rbac';

interface AdminRecord {
  id?: number;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string | null;
}

interface AdminFormProps {
  initialData?: AdminRecord;
  isEditing?: boolean;
}

export default function AdminForm({ initialData, isEditing = false }: AdminFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [role, setRole] = useState<AdminRole>(
    initialData?.role ? normalizeRole(initialData.role) : 'editor'
  );
  const [status, setStatus] = useState<'active' | 'suspended'>(
    initialData?.status === 'suspended' ? 'suspended' : 'active'
  );
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || !cleanEmail) {
      setErrorMsg('Full Name and Email Address are required.');
      return;
    }

    if (!isEditing && (!password || password.length < 8)) {
      setErrorMsg('Password must be at least 8 characters long for new administrators.');
      return;
    }

    if (password && password.length > 0 && password.length < 8) {
      setErrorMsg('New password must be at least 8 characters long.');
      return;
    }

    try {
      setSaving(true);
      const payload: any = {
        name: cleanName,
        email: cleanEmail,
        role,
        status,
      };

      if (password) {
        payload.newPassword = password;
        payload.password = password;
      }

      const url = isEditing && initialData?.id
        ? `/api/admin/admins/${initialData.id}`
        : '/api/admin/admins';

      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save administrator.');
      }

      setSuccessMsg(
        isEditing
          ? 'Administrator account updated successfully!'
          : 'New administrator created successfully!'
      );

      // Trigger global event so current user info syncs if editing self
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('amplipath_admin_updated'));
      }

      setTimeout(() => {
        router.push('/admin/admins');
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
          href="/admin/admins"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Administrators</span>
        </Link>
      </div>

      {/* Feedback alerts */}
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

      {/* Main Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Account Details (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Account Credentials &amp; Identity
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jane@amplipath.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Role Selection Dropdown (in the form) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Platform Role <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as AdminRole)}
                    className="w-full pl-9 pr-8 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none transition cursor-pointer"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="editor">Editor</option>
                    <option value="author">Author / Contributor</option>
                  </select>
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {isEditing ? 'New Password (Optional)' : 'Password'} {!isEditing && <span className="text-rose-500">*</span>}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isEditing ? 'Leave blank to preserve existing password' : 'Minimum 8 characters'}
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {isEditing
                    ? 'Only fill this out if you wish to reset or change the administrator password.'
                    : 'Requires at least 8 characters. Securely hashed with bcrypt.'}
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Account Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('active')}
                    className={`p-3 rounded-lg border text-left transition flex items-center justify-between ${
                      status === 'active'
                        ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">Active</div>
                      <div className="text-[10px] opacity-75">Able to sign in and work</div>
                    </div>
                    {status === 'active' && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('suspended')}
                    className={`p-3 rounded-lg border text-left transition flex items-center justify-between ${
                      status === 'suspended'
                        ? 'border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">Suspended</div>
                      <div className="text-[10px] opacity-75">Login access blocked</div>
                    </div>
                    {status === 'suspended' && <Check className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                </div>
              </div>

              {/* Action Buttons in Red Marked Area (inside the card at bottom) */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
                <Link
                  href="/admin/admins"
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
                      <span>Saving Administrator...</span>
                    </>
                  ) : (
                    <span>{isEditing ? 'Save Changes' : 'Create Administrator'}</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Role Information (Static Info, Not Selectable) */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role Reference &amp; Info
                </h2>
              </div>

              <div className="space-y-2.5">
                {/* 1. Super Admin */}
                <div
                  className={`p-3.5 rounded-lg border transition ${
                    role === 'super_admin'
                      ? 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Super Admin</span>
                    </div>
                    {role === 'super_admin' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Full platform authority: user management, disaster backups, security settings, and all 11 modules.
                  </p>
                </div>

                {/* 2. Editor */}
                <div
                  className={`p-3.5 rounded-lg border transition ${
                    role === 'editor'
                      ? 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Editor</span>
                    </div>
                    {role === 'editor' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Publishing lead: Blogs, Case Studies, SEO, FAQs, Team, Careers, and Media Library.
                  </p>
                </div>

                {/* 3. Author / Contributor */}
                <div
                  className={`p-3.5 rounded-lg border transition ${
                    role === 'author'
                      ? 'border-slate-400 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/80'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Feather className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Author / Contributor</span>
                    </div>
                    {role === 'author' && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Selected
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    Content creator: drafts blog articles, FAQs, and uploads assets in Media Library.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
