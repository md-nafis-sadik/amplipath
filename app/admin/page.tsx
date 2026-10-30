import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  FileText,
  Briefcase,
  Globe,
  HelpCircle,
  Users,
  UserCheck,
  ImageIcon,
  Share2,
  ArrowRight,
  ExternalLink,
  LucideIcon,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface StatCard {
  title: string;
  count: number | string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
  color?: string;
  external?: boolean;
}

export default async function AdminDashboardPage() {
  // Fetch real-time metrics from MySQL
  const [
    totalBlogs,
    publishedBlogs,
    draftBlogs,
    totalCaseStudies,
    totalSeoPages,
    totalFaqs,
    totalTeam,
    totalJobs,
    totalMedia,
  ] = await Promise.all([
    prisma.blogPost.count({ where: { isDeleted: false } }).catch(() => 0),
    prisma.blogPost.count({ where: { status: 'published', isDeleted: false } }).catch(() => 0),
    prisma.blogPost.count({ where: { status: 'draft', isDeleted: false } }).catch(() => 0),
    prisma.caseStudy.count({ where: { isDeleted: false } }).catch(() => 0),
    prisma.pageSeo.count().catch(() => 0),
    prisma.faqItem.count({ where: { isDeleted: false } }).catch(() => 0),
    prisma.teamMember.count({ where: { isDeleted: false } }).catch(() => 0),
    prisma.jobListing.count({ where: { isDeleted: false } }).catch(() => 0),
    prisma.mediaFile.count().catch(() => 0),
  ]);

  const recentPosts = await prisma.blogPost
    .findMany({
      where: { isDeleted: false },
      orderBy: { updatedAt: 'desc' },
      take: 4,
    })
    .catch(() => []);

  const stats: StatCard[] = [
    {
      title: 'Blog Posts',
      count: totalBlogs,
      subtitle: `${publishedBlogs} Published · ${draftBlogs} Drafts`,
      href: '/admin/blogs',
      icon: FileText,
    },
    {
      title: 'Case Studies',
      count: totalCaseStudies,
      subtitle: 'Portfolio projects & metrics',
      href: '/admin/portfolio',
      icon: Briefcase,
    },
    {
      title: 'Managed Pages SEO',
      count: totalSeoPages,
      subtitle: '73 Services · 11 Industries · Core',
      href: '/admin/seo',
      icon: Globe,
    },
    {
      title: 'FAQ Repository',
      count: totalFaqs,
      subtitle: 'Mapped with FAQPage Schema',
      href: '/admin/faqs',
      icon: HelpCircle,
    },
    {
      title: 'Team Members',
      count: totalTeam,
      subtitle: 'Leadership on /about',
      href: '/admin/team',
      icon: Users,
    },
    {
      title: 'Active Job Listings',
      count: totalJobs,
      subtitle: 'Open roles on /careers',
      href: '/admin/careers',
      icon: UserCheck,
    },
    {
      title: 'Media Files',
      count: totalMedia,
      subtitle: 'Uploaded assets in /public',
      href: '/admin/media',
      icon: ImageIcon,
    },
    {
      title: 'Live XML Sitemap',
      count: 'Active',
      subtitle: 'Auto-updating Google index',
      href: '/sitemap.xml',
      icon: Share2,
      external: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg bg-slate-900 border border-slate-800 p-5 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">{s.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white mt-1.5 tracking-tight">
                    {s.count}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">{s.subtitle}</p>
                </div>
                <Icon className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors shrink-0" strokeWidth={1.8} />
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                {s.external ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition flex items-center gap-1.5"
                  >
                    <span>Open Feed</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <Link
                    href={s.href}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition flex items-center gap-1.5"
                  >
                    <span>Manage Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Section: Recent Posts & Database Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Blog Activity */}
        <div className="lg:col-span-2 rounded-lg bg-slate-900 border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Recent Blog Posts</h2>
            <Link
              href="/admin/blogs"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({totalBlogs})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-sm text-slate-500 py-4">No blog posts found.</p>
            ) : (
              recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3.5 rounded-md bg-slate-950/60 border border-slate-800/60 hover:border-slate-700 transition"
                >
                  <div className="truncate mr-4">
                    <p className="text-sm font-semibold text-white truncate">{post.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Slug: <span className="text-slate-400 font-mono">/blog/{post.slug}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                        post.status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : post.status === 'scheduled'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {post.status}
                    </span>
                    <Link
                      href={`/admin/blogs/${post.id}`}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Database & Environment Info */}
        <div className="rounded-lg bg-slate-900 border border-slate-800 p-6 space-y-4">
          <h2 className="text-base font-bold text-white">Environment & Infrastructure</h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-500 block">Database Engine</span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono">
                MySQL (Prisma ORM)
              </span>
            </div>

            <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-500 block">Database Target</span>
              <span className="font-semibold text-slate-200 mt-0.5 block font-mono">
                localhost:3306 / amplipath
              </span>
            </div>

            <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-500 block">Framework & Routing</span>
              <span className="font-semibold text-slate-200 mt-0.5 block">
                Next.js 14 (App Router)
              </span>
            </div>

            <div className="p-3 rounded-md bg-slate-950/60 border border-slate-800/60">
              <span className="text-slate-500 block">Deployment Compatibility</span>
              <span className="font-semibold text-emerald-400 mt-0.5 block">
                cPanel MySQL & Node.js Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
