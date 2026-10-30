/**
 * Role-Based Access Control (RBAC) definitions and helpers for Amplipath CMS
 */

export type AdminRole = 'super_admin' | 'editor' | 'author';

export interface RoleConfig {
  id: AdminRole;
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  capabilities: string[];
  allowedPaths: string[];
}

export const ADMIN_ROLES: Record<AdminRole, RoleConfig> = {
  super_admin: {
    id: 'super_admin',
    label: 'Super Admin',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    badgeBorder: 'border-slate-200 dark:border-slate-700',
    description: 'Full unrestricted platform access, user administration, database backups, and security settings.',
    capabilities: [
      'Manage Admins & Assign Roles',
      'Full Database Backup & Disaster Recovery',
      'Publish & Delete Content Across All Modules',
      'Manage Universal SEO & Redirects',
      'Access Recycle Bin & Permanently Purge Items',
    ],
    allowedPaths: [
      '/admin',
      '/admin/blogs',
      '/admin/portfolio',
      '/admin/seo',
      '/admin/faqs',
      '/admin/team',
      '/admin/careers',
      '/admin/media',
      '/admin/trash',
      '/admin/backups',
      '/admin/admins',
      '/admin/profile',
    ],
  },
  editor: {
    id: 'editor',
    label: 'Editor',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    badgeBorder: 'border-slate-200 dark:border-slate-700',
    description: 'Publishing and content management across blogs, portfolio case studies, SEO, FAQs, team, and careers.',
    capabilities: [
      'Create, Edit & Publish Blog Posts',
      'Manage Portfolio Case Studies & Work',
      'Edit Universal SEO & Schema Markup',
      'Manage Team Roster, FAQs & Careers',
      'Upload & Manage Media Library Assets',
      'Cannot Access Admins or Database Backups',
    ],
    allowedPaths: [
      '/admin',
      '/admin/blogs',
      '/admin/portfolio',
      '/admin/seo',
      '/admin/faqs',
      '/admin/team',
      '/admin/careers',
      '/admin/media',
      '/admin/trash',
      '/admin/profile',
    ],
  },
  author: {
    id: 'author',
    label: 'Author / Contributor',
    badgeBg: 'bg-slate-100 dark:bg-slate-800',
    badgeText: 'text-slate-700 dark:text-slate-300',
    badgeBorder: 'border-slate-200 dark:border-slate-700',
    description: 'Content authoring and drafting for articles, FAQs, and asset uploading in the media library.',
    capabilities: [
      'Write & Draft Blog Posts',
      'Submit & Edit FAQ Questions',
      'Upload Images to Media Library',
      'Cannot Edit Universal SEO or Site Schemas',
      'Cannot Access Team, Careers, Trash, or Admins',
    ],
    allowedPaths: [
      '/admin',
      '/admin/blogs',
      '/admin/faqs',
      '/admin/media',
      '/admin/profile',
    ],
  },
};

/**
 * Normalizes any legacy or custom role string into one of the 3 supported roles
 */
export function normalizeRole(role?: string | null): AdminRole {
  if (!role) return 'editor';
  const clean = role.toLowerCase().trim();
  if (clean === 'superadmin' || clean === 'super_admin' || clean === 'admin') {
    return 'super_admin';
  }
  if (clean === 'author' || clean === 'contributor' || clean === 'writer') {
    return 'author';
  }
  return 'editor';
}

/**
 * Checks if a given role can access a specific route
 */
export function canAccessPath(role: string | null | undefined, pathname: string): boolean {
  const normRole = normalizeRole(role);
  if (normRole === 'super_admin') return true;

  const config = ADMIN_ROLES[normRole];
  if (!config) return false;

  // Check exact match or subpath (e.g. /admin/blogs/new -> matches /admin/blogs)
  return config.allowedPaths.some(
    (allowed) => pathname === allowed || pathname.startsWith(allowed + '/')
  );
}
