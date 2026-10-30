'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, Trash2, Check } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
}

export default function ImageUploadField({
  label,
  value,
  onChange,
  placeholder = '/images/... or https://...',
  helpText,
  required = false,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    // Check size (< 25MB)
    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds 25MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('files', file);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      if (data.files && data.files.length > 0) {
        const uploadedUrl = data.files[0].url;
        onChange(uploadedUrl);
      }
    } catch (err: any) {
      console.error('Upload failed:', err);
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] text-red-400 hover:text-red-300 font-medium transition flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            <span>Remove Image</span>
          </button>
        )}
      </div>

      {/* Upload Zone / Dropzone & URL Input */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleUpload(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-md p-3 transition ${
          dragOver
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Direct File Picker Button */}
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full sm:w-auto px-3.5 py-2 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition flex-shrink-0 disabled:opacity-50 shadow-md shadow-blue-600/20"
          >
            {uploading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 shrink-0" />
                <span>Upload Image</span>
              </>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />

          {/* Editable URL Input */}
          <div className="flex-1 w-full relative">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
            />
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-2 text-center sm:text-left">
          Click <strong>Upload Image</strong> or drag and drop a file (PNG, JPG, WEBP, SVG). The link saves automatically.
        </p>

        {error && <p className="text-xs text-red-400 mt-1.5">{error}</p>}
      </div>

      {/* Live Image Preview Card */}
      {value && (
        <div className="relative rounded-md overflow-hidden border border-slate-800 bg-slate-950 p-2 flex items-center gap-3">
          <div className="relative w-16 h-16 rounded overflow-hidden bg-slate-900 border border-slate-800 flex-shrink-0">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as any).src = '/images/logo-icon.jpg';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{value.split('/').pop() || 'image'}</p>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono truncate">{value}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
              <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Ready &amp; Saved</span>
            </span>
          </div>
        </div>
      )}

      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
}
