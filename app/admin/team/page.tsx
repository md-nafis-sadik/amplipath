'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ImageUploadField from '@/components/admin/ImageUploadField';
import { Users, Plus, Pencil, Trash2, ChevronUp, ChevronDown, User, Link as LinkIcon, Globe, X, ArrowRight } from 'lucide-react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState<{
    name: string;
    role: string;
    photoUrl: string;
    bio: string;
    linkedinUrl: string;
    portfolioUrl: string;
    sortOrder: number;
    isActive: boolean;
  }>({
    name: '',
    role: '',
    photoUrl: '',
    bio: '',
    linkedinUrl: '',
    portfolioUrl: '',
    sortOrder: 0,
    isActive: true,
  });

  const [saving, setSaving] = useState(false);
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
      console.error('Failed to fetch team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam(page);
  }, [page]);

  const handleOpenAddModal = () => {
    setEditingMember(null);
    setFormData({
      name: '',
      role: '',
      photoUrl: '',
      bio: '',
      linkedinUrl: '',
      portfolioUrl: '',
      sortOrder: team.length + 1,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      photoUrl: member.photoUrl || '',
      bio: member.bio || '',
      linkedinUrl: member.linkedinUrl || '',
      portfolioUrl: member.portfolioUrl || '',
      sortOrder: member.sortOrder,
      isActive: member.isActive,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) {
      alert('Name and role are required.');
      return;
    }

    setSaving(true);
    try {
      const url = editingMember ? `/api/admin/team/${editingMember.id}` : '/api/admin/team';
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to save team member');
      }

      setFeedbackMsg({
        type: 'success',
        text: editingMember ? 'Team member updated!' : 'Team member added!',
      });
      setTimeout(() => setFeedbackMsg(null), 3000);
      setIsModalOpen(false);
      fetchTeam();
    } catch (err: any) {
      alert(err.message || 'Error saving team member');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (member: TeamMember) => {
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !member.isActive }),
      });
      if (res.ok) {
        setTeam((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, isActive: !m.isActive } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReorder = async (member: TeamMember, direction: 'up' | 'down') => {
    const currentIndex = team.findIndex((m) => m.id === member.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= team.length) return;

    const targetMember = team[targetIndex];
    const currentOrder = member.sortOrder;
    const targetOrder = targetMember.sortOrder;

    try {
      await Promise.all([
        fetch(`/api/admin/team/${member.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: targetOrder }),
        }),
        fetch(`/api/admin/team/${targetMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sortOrder: currentOrder }),
        }),
      ]);
      fetchTeam();
    } catch (err) {
      console.error('Reorder error:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Move this team member to the Recycle Bin?')) return;
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedbackMsg({ type: 'success', text: 'Team member moved to Recycle Bin' });
        setTimeout(() => setFeedbackMsg(null), 3000);
        fetchTeam();
      } else {
        alert('Failed to delete team member');
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Team Management</h1>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-sm transition inline-flex items-center gap-1.5 text-xs font-semibold justify-center whitespace-nowrap shrink-0"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span>Add Member</span>
        </button>
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

      {/* Team Member Cards Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-sm">Loading team members...</div>
      ) : team.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-md border border-slate-800 text-slate-400">
          <p className="text-lg">No team members currently found.</p>
          <button
            onClick={handleOpenAddModal}
            className="mt-3 text-sm text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1.5"
          >
            <span>Add your first team member</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, index) => (
            <div
              key={member.id}
              className={`bg-slate-900 border rounded-md p-4 flex flex-col justify-between transition ${
                member.isActive
                  ? 'border-slate-800 hover:border-slate-700'
                  : 'border-slate-800/50 opacity-60 bg-slate-950'
              }`}
            >
              <div>
                {/* Header with Photo, Name & Status */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                    {member.photoUrl ? (
                      <Image
                        src={member.photoUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <User className="w-7 h-7" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-mono text-slate-400">
                        #{member.sortOrder}
                      </span>
                      <button
                        onClick={() => handleToggleActive(member)}
                        className={`inline-flex items-center gap-1.5 text-xs font-medium transition ${
                          member.isActive ? 'text-emerald-500' : 'text-slate-500'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            member.isActive ? 'bg-emerald-500' : 'bg-slate-500'
                          }`}
                        />
                        {member.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </div>
                    <h3 className="text-sm font-semibold text-white truncate mt-0.5">{member.name}</h3>
                    <p className="text-xs text-slate-400 font-medium truncate">{member.role}</p>
                  </div>
                </div>

                {/* Bio / Links */}
                {member.bio && (
                  <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-slate-800/80">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
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
                      className="text-[11px] text-slate-400 hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Website / Portfolio</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800">
                {/* Reorder Up/Down */}
                <div className="flex items-center gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => handleReorder(member, 'up')}
                    className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={index === team.length - 1}
                    onClick={() => handleReorder(member, 'down')}
                    className="p-1.5 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Edit & Delete */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(member)}
                    className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded"
                    title="Edit Member"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded"
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

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {editingMember ? 'Edit Team Member' : 'Add Team Member'}
                </h2>
                <p className="text-xs text-slate-400">
                  Update profile information, headshot image, and social links.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role / Job Title <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. Senior Software Architect"
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Photo URL & Upload */}
              <div>
                <ImageUploadField
                  label="Member Headshot / Photo"
                  value={formData.photoUrl}
                  onChange={(url) => setFormData({ ...formData, photoUrl: url })}
                  placeholder="/images/team/member.png"
                  helpText="Upload a professional headshot photo. The image URL is saved automatically."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Website / Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Bio / Summary (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief summary of their background and achievements..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Sort Order Priority
                  </label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value, 10) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-0 w-4 h-4"
                    />
                    <span>Active on Public Website</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs font-medium transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold shadow-lg shadow-blue-500/20 transition disabled:opacity-50"
                >
                  {saving ? 'Saving...' : editingMember ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
