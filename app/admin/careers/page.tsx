'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  X,
} from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface JobListing {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  employmentType: string;
  location: string;
  compensation: string | null;
  compDetail: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchJobs = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/admin/careers?status=${statusFilter}&search=${encodeURIComponent(search)}&page=${targetPage}&limit=20`
      );
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load careers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [statusFilter, search]);

  useEffect(() => {
    fetchJobs(page);
  }, [page, statusFilter, search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Move this job opening to the Recycle Bin?')) return;
    try {
      const res = await fetch(`/api/admin/careers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Job opening moved to Recycle Bin.' });
        setTimeout(() => setFeedbackMsg(null), 3000);
        fetchJobs(page);
      } else {
        alert('Failed to delete job listing');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Careers &amp; Jobs</h1>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>New Job Opening</span>
        </Link>
      </div>

      {feedbackMsg && (
        <div
          className={`p-4 rounded-md text-sm flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 text-slate-400 hover:text-white rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'All Openings', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Drafts', value: 'draft' },
            { label: 'Archived', value: 'archived' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition ${
                statusFilter === tab.value
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
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
            placeholder="Search by job title or keywords..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Careers Table List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center gap-3">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Loading career listings...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No job openings found. Click &quot;New Job Opening&quot; to publish a role.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 uppercase font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Job Title &amp; Department</th>
                  <th className="py-3.5 px-4">Employment Type &amp; Location</th>
                  <th className="py-3.5 px-4">Compensation</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4">Posted Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition">
                    {/* Title & Department */}
                    <td className="py-3 px-4 max-w-sm">
                      <div className="flex items-start gap-2.5">
                        <Briefcase className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <Link
                            href={`/admin/careers/${job.id}`}
                            className="font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            {job.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 font-mono">
                            <span>/careers/{job.slug}</span>
                            <span>•</span>
                            <span className="font-sans text-slate-500">{job.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Type & Location */}
                    <td className="py-3 px-4">
                      <div className="space-y-0.5">
                        <div className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{job.employmentType}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </td>

                    {/* Compensation */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {job.compensation || 'Competitive'}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium capitalize ${
                          job.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : job.status === 'draft'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            job.status === 'active'
                              ? 'bg-emerald-500'
                              : job.status === 'draft'
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        {job.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(job.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/careers/${job.id}`}
                          title="Edit Job Opening"
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(job.id)}
                          title="Move to Recycle Bin"
                          className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Bar */}
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
