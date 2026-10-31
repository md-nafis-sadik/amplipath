'use client';

import React, { useState, useEffect } from 'react';
import {
  Database,
  Download,
  Server,
  Globe,
  FileText,
  Tag,
  Briefcase,
  HelpCircle,
  Link2,
  Users,
  UserCheck,
  ImageIcon,
  ShieldCheck,
  Rocket,
} from 'lucide-react';

interface BackupStats {
  adminUsers: number;
  blogCategories: number;
  blogPosts: number;
  caseStudies: number;
  seoPages: number;
  faqs: number;
  faqPageAssignments: number;
  teamMembers: number;
  jobListings: number;
  mediaFiles: number;
  totalRecords: number;
}

export default function BackupsPage() {
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/backups')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleDownloadJson = () => {
    setDownloading(true);
    window.location.href = '/api/admin/backups?download=1&format=json';
    setTimeout(() => setDownloading(false), 2000);
  };

  const handleDownloadSql = () => {
    setDownloading(true);
    window.location.href = '/api/admin/backups?download=1&format=sql';
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Database Backups &amp; Export</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Export production SQL dumps for cPanel phpMyAdmin migration or JSON snapshots for disaster recovery.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadSql}
            disabled={downloading}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md shadow-sm transition inline-flex items-center gap-1.5 text-xs justify-center whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer"
            title="Download ready-to-import MySQL .sql dump for cPanel phpMyAdmin"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>{downloading ? 'Exporting...' : 'Download SQL Dump (.sql)'}</span>
          </button>
          <button
            onClick={handleDownloadJson}
            disabled={downloading}
            className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-md shadow-xs transition inline-flex items-center gap-1.5 text-xs justify-center whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer"
            title="Download JSON snapshot"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>JSON Backup</span>
          </button>
        </div>
      </div>

      {/* Database Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2.5">
              <Server className="w-5 h-5 text-indigo-400" />
              <span>Live MySQL Database Health</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Current connection: <code className="bg-slate-950 px-2 py-0.5 rounded text-blue-400 font-mono">amplipath @ localhost:3306</code>
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Total System Records</span>
            <div className="text-2xl font-bold text-white font-mono">
              {loading ? '...' : stats?.totalRecords.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Table Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { label: 'Universal SEO Pages', value: stats?.seoPages, icon: Globe, color: 'text-cyan-400' },
            { label: 'Blog Posts', value: stats?.blogPosts, icon: FileText, color: 'text-blue-400' },
            { label: 'Blog Categories', value: stats?.blogCategories, icon: Tag, color: 'text-amber-400' },
            { label: 'Case Studies', value: stats?.caseStudies, icon: Briefcase, color: 'text-purple-400' },
            { label: 'FAQ Items', value: stats?.faqs, icon: HelpCircle, color: 'text-rose-400' },
            { label: 'FAQ Page Links', value: stats?.faqPageAssignments, icon: Link2, color: 'text-slate-400' },
            { label: 'Team Members', value: stats?.teamMembers, icon: Users, color: 'text-teal-400' },
            { label: 'Job Openings', value: stats?.jobListings, icon: UserCheck, color: 'text-emerald-400' },
            { label: 'Media Files', value: stats?.mediaFiles, icon: ImageIcon, color: 'text-orange-400' },
            { label: 'Admin Accounts', value: stats?.adminUsers, icon: ShieldCheck, color: 'text-blue-500' },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950/70 border border-slate-800 rounded-md p-3 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                  <span className="text-lg font-bold text-white font-mono">
                    {loading ? '-' : item.value ?? 0}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium mt-2 leading-tight">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Production Migration Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Rocket className="w-6 h-6 text-blue-400" />
          <div>
            <h3 className="text-base font-bold text-white">cPanel Production Migration Guide</h3>
            <p className="text-xs text-slate-400">
              How to migrate from your local MySQL environment to production without downtime.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-md border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Create cPanel Database</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Log into cPanel, open <strong>MySQL® Databases</strong>, create database (e.g. <code className="text-slate-300">amplipat_db</code>), and create a user with <strong>ALL PRIVILEGES</strong>.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-md border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Set Environment Variable</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In your production host, update <code className="text-slate-300">.env</code> or Node environment:
              <br />
              <code className="text-[11px] text-emerald-400 block mt-1 break-all bg-slate-900 p-1.5 rounded">
                DATABASE_URL="mysql://user:pass@localhost:3306/amplipat_db"
              </code>
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-md border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-blue-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Initialize Schema & Data</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Run <code className="text-slate-300">npx prisma db push</code> then <code className="text-slate-300">npx tsx scripts/seed.ts</code>, or import your downloaded backup JSON. Done!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
