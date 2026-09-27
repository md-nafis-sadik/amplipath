import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-white text-slate-800">
      <div className="max-w-md text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-[#1A56DB] bg-blue-50 px-3 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 mb-3 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The page you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#1A56DB] hover:bg-[#1243B0] text-white text-xs font-bold transition-all shadow-sm"
          >
            Back to Homepage
          </Link>
          <Link
            href="/work"
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
          >
            Explore Our Work
          </Link>
        </div>
      </div>
    </div>
  );
}
