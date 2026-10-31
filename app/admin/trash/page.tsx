'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Trash2, AlertTriangle, RotateCcw, X, Clock } from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface TrashItem {
  id: number;
  type: 'blog' | 'case_study' | 'faq' | 'team' | 'career';
  title: string;
  subtitle: string;
  deletedAt: string;
}

const TYPE_CONFIG = {
  blog: { label: 'Blog Post', color: 'text-blue-400' },
  case_study: { label: 'Case Study', color: 'text-emerald-400' },
  faq: { label: 'FAQ', color: 'text-purple-400' },
  team: { label: 'Team Member', color: 'text-amber-400' },
  career: { label: 'Career Opening', color: 'text-rose-400' },
};

export default function RecycleBinPage() {
  const [items, setItems] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('all');
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});

  const fetchTrash = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/trash?type=${typeFilter}&page=${targetPage}&limit=20`);
      const data = await res.json();
      if (data.items) setItems(data.items);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
      if (data.typeCounts) setTypeCounts(data.typeCounts);
    } catch (err) {
      console.error('Failed to load trash:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [typeFilter]);

  useEffect(() => {
    fetchTrash(page);
  }, [page, typeFilter]);

  const handleRestore = async (item: TrashItem) => {
    try {
      const res = await fetch('/api/admin/trash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore', type: item.type, id: item.id }),
      });
      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: `Restored "${item.title}" successfully!` });
        setTimeout(() => setFeedbackMsg(null), 3000);
        fetchTrash();
      } else {
        alert('Failed to restore item');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePermanentDelete = async (item: TrashItem) => {
    if (!confirm(`Are you completely sure? This will PERMANENTLY delete "${item.title}". It cannot be recovered.`)) {
      return;
    }
    try {
      const res = await fetch('/api/admin/trash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'permanent_delete', type: item.type, id: item.id }),
      });
      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: `Permanently deleted "${item.title}"` });
        setTimeout(() => setFeedbackMsg(null), 3000);
        fetchTrash();
      } else {
        alert('Failed to delete item permanently');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEmptyTrash = async () => {
    if (!confirm('Are you sure you want to PERMANENTLY empty the entire Recycle Bin? All deleted items will be lost forever.')) {
      return;
    }
    try {
      const res = await fetch('/api/admin/trash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'empty_trash' }),
      });
      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Recycle Bin emptied successfully!' });
        setTimeout(() => setFeedbackMsg(null), 3000);
        fetchTrash();
      } else {
        alert('Failed to empty trash');
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
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Recycle Bin</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Safely recover deleted articles, projects, FAQs, team members, and job openings.
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white font-medium rounded-md border border-rose-500/20 transition inline-flex items-center gap-1.5 text-xs font-semibold justify-center whitespace-nowrap shrink-0 cursor-pointer"
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Empty Bin</span>
          </button>
        )}
      </div>

      {/* 30-Day Retention Notice */}
      <div className="flex items-center gap-2.5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-700 dark:text-amber-300">
        <Clock className="w-4 h-4 shrink-0 text-amber-500" />
        <span>
          <strong>30-Day Retention Limit:</strong> Trashed items are automatically purged permanently after 30 days to keep your database lean, fast, and free of obsolete data.
        </span>
      </div>

      {feedbackMsg && (
        <div
          className={`p-4 rounded-md text-sm flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 text-slate-400 hover:text-white rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { key: 'all', label: 'All Items' },
          { key: 'blog', label: 'Blogs' },
          { key: 'case_study', label: 'Case Studies' },
          { key: 'faq', label: 'FAQs' },
          { key: 'team', label: 'Team' },
          { key: 'career', label: 'Careers' },
        ].map((tab) => {
          const count = typeCounts[tab.key] ?? (tab.key === 'all' ? total : 0);
          return (
            <button
              key={tab.key}
              onClick={() => setTypeFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-2 ${
                typeFilter === tab.key
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-xs font-normal opacity-75">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trashed Items List */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-sm">Loading recycle bin...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-md border border-slate-800 text-slate-400">
          <Trash2 className="w-10 h-10 text-slate-600 mx-auto mb-2 opacity-50" />
          <p className="text-base font-medium text-white">Recycle Bin is empty</p>
          <p className="text-xs text-slate-500 mt-1">
            Any deleted content from blogs, case studies, FAQs, team, or jobs will appear here for recovery.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const config = TYPE_CONFIG[item.type] || {
              label: item.type,
              color: 'bg-slate-800 text-slate-300',
            };
            const daysRemaining = Math.max(
              0,
              30 - Math.floor((Date.now() - new Date(item.deletedAt).getTime()) / (1000 * 60 * 60 * 24))
            );

            return (
              <div
                key={`${item.type}-${item.id}`}
                className="bg-slate-900 border border-slate-800 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-medium ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-slate-500">
                      • Deleted {new Date(item.deletedAt).toLocaleDateString()}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {daysRemaining === 0 ? 'Purges today' : `${daysRemaining}d left`}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{item.subtitle}</p>
                </div>

                <div className="flex items-center gap-1 self-end md:self-center">
                  <button
                    onClick={() => handleRestore(item)}
                    className="p-1.5 text-slate-400 hover:text-emerald-500 transition rounded"
                    title="Restore Item"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePermanentDelete(item)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded"
                    title="Delete Permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
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
