'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white text-slate-800">
      <div className="max-w-md text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
          Server Error
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          An unexpected error occurred. You can try reloading the page or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1A56DB] hover:bg-[#1243B0] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
