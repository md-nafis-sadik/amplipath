'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserPlus,
  Pencil,
  Trash2,
  Lock,
  Mail,
  User,
  Shield,
  CheckCircle2,
  X,
  AlertTriangle,
  Feather,
  FileText,
} from 'lucide-react';
import { ADMIN_ROLES, AdminRole, normalizeRole } from '@/lib/rbac';
import AdminPagination from '@/components/admin/AdminPagination';

interface AdminUserRecord {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<AdminUserRecord[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchCurrentSession();
    fetchAdmins(1);
  }, []);

  const fetchCurrentSession = async () => {
    try {
      const res = await fetch('/api/admin/auth/me');
      if (res.ok) {
        const data = await res.json();
        setCurrentUserId(data.user.id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAdmins = async (pageNum = page) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/admins?page=${pageNum}&limit=20`);
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setPage(data.page || pageNum);
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', text: err.error || 'Failed to load admins' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', text: err.message || 'Error loading admins' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (admin: AdminUserRecord) => {
    if (admin.id === currentUserId) {
      alert('You cannot delete your own account while logged in.');
      return;
    }

    if (
      !confirm(
        `Are you sure you want to permanently delete admin account "${admin.name}" (${admin.email})?`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', text: `Admin ${admin.name} deleted successfully.` });
        setTimeout(() => setFeedback(null), 4000);
        fetchAdmins(page);
      } else {
        alert(data.error || 'Failed to delete admin');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    }
  };

  const handleToggleStatus = async (admin: AdminUserRecord) => {
    if (admin.id === currentUserId) {
      alert('You cannot suspend your own account.');
      return;
    }

    const nextStatus = admin.status === 'active' ? 'suspended' : 'active';
    try {
      const res = await fetch(`/api/admin/admins/${admin.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) {
        setAdmins((prev) =>
          prev.map((a) => (a.id === admin.id ? { ...a, status: nextStatus } : a))
        );
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update status');
      }
    } catch (err: any) {
      alert(err.message || 'Network error');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Admin Management &amp; Roles</h1>
        </div>
        <Link
          href="/admin/admins/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm whitespace-nowrap shrink-0"
        >
          <UserPlus className="w-4 h-4 shrink-0" />
          <span>Add Admin</span>
        </Link>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-md text-sm flex items-center justify-between ${
            feedback.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admins Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading platform administrators...</span>
          </div>
        ) : admins.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No administrators found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Administrator</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {admins.map((admin) => {
                  const roleConfig = ADMIN_ROLES[normalizeRole(admin.role)];
                  const isCurrent = admin.id === currentUserId;

                  return (
                    <tr
                      key={admin.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition"
                    >
                      {/* Name & Email & Avatar */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-300 dark:border-slate-700">
                            {admin.avatar ? (
                              <Image
                                src={admin.avatar}
                                alt={admin.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              admin.name.slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>{admin.name}</span>
                              {isCurrent && (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="font-mono text-[11px] text-slate-500">
                              {admin.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          <Shield className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                          <span>{roleConfig.label}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(admin)}
                          disabled={isCurrent}
                          title={isCurrent ? 'Cannot suspend your own account' : 'Click to toggle status'}
                          className={`inline-flex items-center gap-1.5 text-xs font-medium transition ${
                            admin.status === 'active'
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          } ${isCurrent ? 'cursor-default' : 'hover:underline'}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              admin.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <span className="capitalize">{admin.status || 'Active'}</span>
                        </button>
                      </td>

                      {/* Date Joined */}
                      <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                        {new Date(admin.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/admins/${admin.id}`}
                            title="Edit Administrator"
                            className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(admin)}
                            disabled={isCurrent}
                            title={isCurrent ? 'Cannot delete your own account' : 'Delete Admin'}
                            className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-20 disabled:cursor-not-allowed rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* Pagination Controls outside white table card */}
      <AdminPagination
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        pageSize={20}
        onPageChange={(p) => {
          setPage(p);
          fetchAdmins(p);
        }}
        isLoading={loading}
      />
    </div>
  );
}
