'use client';

import React, { useState, useRef } from 'react';
import { Plus, Image as ImageIcon } from 'lucide-react';

interface MultiImageUploadFieldProps {
  label: string;
  value: string[]; // array of image URLs
  onChange: (urls: string[]) => void;
  helpText?: string;
}

export default function MultiImageUploadField({
  label,
  value = [],
  onChange,
  helpText,
}: MultiImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload images');
      }

      if (data.files && data.files.length > 0) {
        const newUrls = data.files.map((f: any) => f.url);
        onChange([...value, ...newUrls]);
      }
    } catch (err: any) {
      console.error('Multi upload failed:', err);
      setError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(value.filter((_, idx) => idx !== indexToRemove));
  };

  const handleTextareaChange = (text: string) => {
    const urls = text
      .split('\n')
      .map((u) => u.trim())
      .filter(Boolean);
    onChange(urls);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-300">
          {label} ({value.length} image{value.length !== 1 ? 's' : ''})
        </label>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-md shadow-blue-600/20 whitespace-nowrap shrink-0"
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          <span>{uploading ? 'Uploading...' : 'Upload Screenshots'}</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
      </div>

      {/* Grid of uploaded screenshots */}
      {value.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {value.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="group relative rounded-md overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center"
            >
              <img
                src={url}
                alt={`Screenshot ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as any).src = '/images/logo-icon.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold"
                >
                  Delete
                </button>
              </div>
              <span className="absolute bottom-1 left-1 bg-black/70 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono">
                #{idx + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/60 rounded-md p-6 text-center cursor-pointer transition"
        >
          <ImageIcon className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-60" />
          <p className="text-xs text-slate-400 font-medium">
            Click here or the button above to upload project screenshots.
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Select multiple files to upload in bulk. URLs are saved automatically.
          </p>
        </div>
      )}

      {/* Direct line-by-line editor fallback */}
      <div>
        <label className="block text-[11px] text-slate-500 mb-1">
          Or paste screenshot URLs (one per line):
        </label>
        <textarea
          rows={2}
          value={value.join('\n')}
          onChange={(e) => handleTextareaChange(e.target.value)}
          placeholder="/images/portfolio/shot-1.jpg&#10;/images/portfolio/shot-2.jpg"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-md text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
      {helpText && <p className="text-[11px] text-slate-500">{helpText}</p>}
    </div>
  );
}
