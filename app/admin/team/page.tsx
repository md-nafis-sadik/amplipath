'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, User, Link as LinkIcon, Globe, X, ArrowRight } from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string | null;
  bio: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  updatedAt: string;
}

export default function TeamManagementPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchTeam = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/team?page=${targetPage}&limit=20`);
      const data = await res.json();
      if (data.team) setTeam(data.team);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam(page);
  }, [page]);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete member');
      setFeedbackMsg({ type: 'success', text: 'Team member deleted successfully.' });
      fetchTeam(page);
    } catch (err: any) {
      setFeedbackMsg({ type: 'error', text: err.message || 'Error deleting member' });
    }
  };

  const handleToggleActive = async (member: TeamMember) => {
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setTeam((prev) =>
        prev.map((m) => (m.id === member.id ? { ...m, isActive: !m.isActive } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleReorder = async (member: TeamMember, direction: 'up' | 'down') => {
    const idx = team.findIndex((m) => m.id === member.id);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= team.length) return;

    const swapWith = team[targetIdx];
    const newOrder = swapWith.sortOrder;
    const swapNewOrder = member.sortOrder;

    try {
      await Promise.all([
        fetch(`/api/admin/team/${member.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: newOrder }),
        }),
        fetch(`/api/admin/team/${swapWith.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: swapNewOrder }),
        }),
      ]);
      fetchTeam(page);
    } catch (err) {
      console.error('Failed to reorder:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage leadership and team profiles displayed across the website.
          </p>
        </div>
        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-sm whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add Member</span>
        </Link>
      </div>

      {feedbackMsg && (
        <div
          className={`p-3.5 rounded-lg text-xs flex items-center justify-between ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300'
          }`}
        >
          <span>{feedbackMsg.text}</span>
          <button onClick={() => setFeedbackMsg(null)} className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded" title="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Team Member Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400 text-xs">Loading team members...</div>
      ) : team.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400">
          <p className="text-sm">No team members currently found.</p>
          <Link
            href="/admin/team/new"
            className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold inline-flex items-center gap-1.5"
          >
            <span>Add your first team member</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white dark:bg-slate-900 border rounded-xl p-5 flex flex-col justify-between shadow-xs transition ${
                member.isActive
                  ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  : 'border-slate-200/50 dark:border-slate-800/50 opacity-60 bg-slate-50 dark:bg-slate-950'
              }`}
            >
              <div>
                {/* Header with Photo, Name & Status */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono text-slate-400">
                        #{member.sortOrder}
                      </span>
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-1 text-[11px] font-medium transition cursor-pointer ${
                          member.isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            member.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        {member.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate mt-0.5">{member.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{member.role}</p>
                  </div>
                </div>

                {/* Bio / Links */}
                {member.bio && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <LinkIcon className="w-3 h-3" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  {member.portfolioUrl && (
                    <a
                      href={member.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Website / Portfolio</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                {/* Reorder Up/Down */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleReorder(member, 'up')}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === team.length - 1}
                    onClick={() => handleReorder(member, 'down')}
                    className="p-1.5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/team/${member.id}`}
                    className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded inline-flex items-center justify-center cursor-pointer"
                    title="Edit Member"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded cursor-pointer"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
