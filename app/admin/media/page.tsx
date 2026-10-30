'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ImageIcon, Upload, FolderUp, Copy, Pencil, Trash2, Check, X } from 'lucide-react';
import AdminPagination from '@/components/admin/AdminPagination';

interface MediaItem {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  url: string;
  altText: string | null;
  uploadedAt: string;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function MediaLibraryPage() {
  const [files, setFiles] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Edit Alt Modal
  const [editingFile, setEditingFile] = useState<MediaItem | null>(null);
  const [altText, setAltText] = useState('');
  const [savingAlt, setSavingAlt] = useState(false);

  // Large Preview Modal
  const [previewFile, setPreviewFile] = useState<MediaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async (targetPage = page) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/media?search=${encodeURIComponent(search)}&page=${targetPage}&limit=20`);
      const data = await res.json();
      if (data.files) setFiles(data.files);
      if (typeof data.total === 'number') setTotal(data.total);
      if (typeof data.totalPages === 'number') setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to load media files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchFiles(page);
  }, [page, search]);

  const handleFileUpload = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    try {
      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        fetchFiles();
      } else {
        alert(data.error || 'Failed to upload files');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (file: MediaItem) => {
    navigator.clipboard.writeText(file.url);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveAltText = async () => {
    if (!editingFile) return;
    setSavingAlt(true);
    try {
      const res = await fetch(`/api/admin/media/${editingFile.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ altText }),
      });
      if (res.ok) {
        setFiles((prev) =>
          prev.map((f) => (f.id === editingFile.id ? { ...f, altText } : f))
        );
        setEditingFile(null);
      } else {
        alert('Failed to update alt text');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSavingAlt(false);
    }
  };

  const handleDelete = async (file: MediaItem) => {
    if (!confirm(`Permanently delete "${file.originalName}"?`)) return;
    try {
      const res = await fetch(`/api/admin/media/${file.id}`, { method: 'DELETE' });
      if (res.ok) {
        setFiles((prev) => prev.filter((f) => f.id !== file.id));
      } else {
        alert('Failed to delete file');
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Media Library</h1>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-sm transition inline-flex items-center gap-1.5 text-xs font-semibold justify-center whitespace-nowrap shrink-0 disabled:opacity-50"
        >
          <Upload className="w-4 h-4 shrink-0" />
          <span>{uploading ? 'Uploading...' : 'Upload'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(e.target.files)}
        />
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileUpload(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-slate-800 hover:border-blue-500/60 bg-slate-900/60 hover:bg-slate-900 rounded-lg p-8 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2"
      >
        <FolderUp className="w-10 h-10 text-slate-500" />
        <div className="text-sm font-semibold text-white">
          {uploading ? 'Uploading files, please wait...' : 'Click or drag files here to upload'}
        </div>
        <p className="text-xs text-slate-500">
          Supports PNG, JPG, WEBP, SVG, and GIF up to 20MB each.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900 p-4 rounded-md border border-slate-800 flex items-center justify-between gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search media by filename or alt text..."
          className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <span className="text-xs text-slate-400 flex-shrink-0">
          {files.length} file{files.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-500 text-sm">Loading media library...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-md border border-slate-800 text-slate-400">
          <p className="text-lg">No media files found.</p>
          <p className="text-xs text-slate-500 mt-1">
            Upload your first image above to get a public URL for your blogs, case studies, or SEO pages.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file) => (
            <div
              key={file.id}
              className="group bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md overflow-hidden flex flex-col transition"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setPreviewFile(file)}
                className="relative aspect-square bg-slate-950 cursor-pointer overflow-hidden"
              >
                <Image
                  src={file.url}
                  alt={file.altText || file.originalName}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-medium">
                  Click to Zoom
                </div>
              </div>

              {/* Info & Actions */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <p className="text-xs font-semibold text-white truncate" title={file.originalName}>
                    {file.originalName}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {formatBytes(file.sizeBytes)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-1 pt-1">
                  <button
                    onClick={() => handleCopyUrl(file)}
                    className="flex-1 py-1 text-slate-400 hover:text-white hover:bg-slate-800 transition rounded flex items-center justify-center gap-1.5 text-xs"
                    title="Copy Image URL"
                  >
                    {copiedId === file.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 text-[11px]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Copy URL</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setEditingFile(file);
                      setAltText(file.altText || '');
                    }}
                    className="p-1.5 text-slate-400 hover:text-blue-500 transition rounded"
                    title="Edit Alt Text"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(file)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition rounded"
                    title="Delete File"
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

      {/* ALT TEXT MODAL */}
      {editingFile && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg w-full max-w-md p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Edit Image Alt Text</h3>
            <p className="text-xs text-slate-400">
              Descriptive alt text improves accessibility and image SEO rankings in Google Search.
            </p>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Alt Text</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. Amplipath dashboard analytics chart"
                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingFile(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAltText}
                disabled={savingAlt}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium"
              >
                {savingAlt ? 'Saving...' : 'Save Alt Text'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW MODAL */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="truncate mr-4">
                <h3 className="text-sm font-bold text-white truncate">{previewFile.originalName}</h3>
                <p className="text-xs text-slate-400">{previewFile.url}</p>
              </div>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-slate-400 hover:text-white p-1 rounded transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video max-h-[60vh] bg-slate-950 flex items-center justify-center">
              <Image
                src={previewFile.url}
                alt={previewFile.altText || previewFile.originalName}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4 bg-slate-900 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Alt: <span className="text-white">{previewFile.altText || 'None'}</span>
              </div>
              <button
                onClick={() => handleCopyUrl(previewFile)}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-medium"
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
