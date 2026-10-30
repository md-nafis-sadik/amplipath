'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export default function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 20,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const [jumpPage, setJumpPage] = useState('');

  if (totalItems <= 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate compact pagination page numbers (first 3, ellipsis, last)
  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPage.trim(), 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage('');
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-1 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-transparent w-full mt-4">
      {/* Items count summary */}
      <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
        <span>Showing</span>
        <span className="font-semibold text-slate-900 dark:text-white">{startItem}</span>
        <span>to</span>
        <span className="font-semibold text-slate-900 dark:text-white">{endItem}</span>
        <span>of</span>
        <span className="font-semibold text-slate-900 dark:text-white">{totalItems}</span>
        <span>items</span>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {/* Page numbers navigation */}
          <nav className="inline-flex items-center gap-1 rounded-md" aria-label="Pagination">
            {/* First Page */}
            <button
              type="button"
              onClick={() => onPageChange(1)}
              disabled={currentPage <= 1 || isLoading}
              title="First Page"
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 shadow-sm"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>

            {/* Previous Page */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1 || isLoading}
              title="Previous Page"
              className="px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shrink-0 font-medium shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Numbered page buttons */}
            <div className="flex items-center gap-1">
              {getPageNumbers().map((p, idx) => {
                if (p === '...') {
                  return (
                    <span key={`ellipsis-${idx}`} className="px-2 py-1 text-slate-400 dark:text-slate-500 font-bold select-none">
                      ...
                    </span>
                  );
                }
                const pageNum = p as number;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => onPageChange(pageNum)}
                    disabled={isLoading}
                    aria-current={isActive ? 'page' : undefined}
                    className={`min-w-[32px] h-8 px-2 rounded-md font-semibold text-xs transition shrink-0 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white shadow-sm'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Page */}
            <button
              type="button"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages || isLoading}
              title="Next Page"
              className="px-2.5 py-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shrink-0 font-medium shadow-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Last Page */}
            <button
              type="button"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages || isLoading}
              title="Last Page"
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0 shadow-sm"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </nav>

          {/* Jump to page form if > 3 pages */}
          {totalPages > 3 && (
            <form onSubmit={handleJumpSubmit} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="hidden md:inline">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPage}
                onChange={(e) => setJumpPage(e.target.value)}
                placeholder={String(currentPage)}
                className="w-12 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded text-center text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 text-xs shadow-sm"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-medium transition shadow-sm"
              >
                Go
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
