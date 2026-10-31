'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Globe,
  HelpCircle,
  Users,
  UserCheck,
  ImageIcon,
  Trash2,
  Database,
  ExternalLink,
  Sun,
  Moon,
  LogOut,
  Menu,
  X,
  LucideIcon,
  ShieldCheck,
  User,
} from 'lucide-react';
import { canAccessPath } from '@/lib/rbac';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Blog Management', href: '/admin/blogs', icon: FileText },
  { name: 'Portfolio & Work', href: '/admin/portfolio', icon: Briefcase },
  { name: 'Universal SEO', href: '/admin/seo', icon: Globe },
  { name: 'FAQ Manager', href: '/admin/faqs', icon: HelpCircle },
  { name: 'Careers & Jobs', href: '/admin/careers', icon: UserCheck },
  { name: 'Team Members', href: '/admin/team', icon: Users },
  { name: 'Admins & Roles', href: '/admin/admins', icon: ShieldCheck },
  { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { name: 'Recycle Bin', href: '/admin/trash', icon: Trash2 },
  { name: 'Backups & Export', href: '/admin/backups', icon: Database },
];

interface AdminUserInfo {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string | null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUserInfo | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const activeNavItem = NAV_ITEMS.find((item) =>
    item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
  );

  const ActiveIcon = activeNavItem?.icon || (pathname.startsWith('/admin/profile') ? User : LayoutDashboard);

  // If on login page, render clean standalone view without sidebar
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    const saved = localStorage.getItem('amplipath_admin_theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('amplipath_admin_theme', nextTheme);
    window.dispatchEvent(new Event('amplipath_theme_changed'));
  };

  const fetchCurrentUser = () => {
    if (!isLoginPage) {
      fetch('/api/admin/auth/me')
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Not authenticated');
        })
        .then((data) => setAdminUser(data.user))
        .catch(() => {
          // Handled by middleware
        });
    }
  };

  useEffect(() => {
    fetchCurrentUser();

    const handleAdminUpdated = () => {
      fetchCurrentUser();
    };

    window.addEventListener('amplipath_admin_updated', handleAdminUpdated);
    return () => {
      window.removeEventListener('amplipath_admin_updated', handleAdminUpdated);
    };
  }, [isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  // Filter navigation items by role access
  const visibleNavItems = NAV_ITEMS.filter((item) =>
    canAccessPath(adminUser?.role, item.href)
  );

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row antialiased transition-colors ${
        theme === 'light'
          ? 'admin-theme-light bg-slate-50 text-slate-900'
          : 'admin-theme-dark dark bg-slate-950 text-slate-100'
      }`}
    >
      {/* Mobile Top Header */}
      <div className="admin-header md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <Link href="/admin" className="inline-flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo-icon-light.png"
                alt="Amplipath"
                width={28}
                height={28}
                className="w-7 h-7 object-contain admin-logo-img-light"
              />
              <Image
                src="/images/logo-icon-dark.png"
                alt="Amplipath"
                width={28}
                height={28}
                className="w-7 h-7 object-contain admin-logo-img-dark"
              />
            </div>
            <span className="admin-logo-text text-base font-extrabold tracking-tight font-sans transition-colors">
              AMPLIPATH
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Profile Icon */}
          <Link
            href="/admin/profile"
            className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center justify-center transition"
            title="Profile & Settings"
          >
            {adminUser?.avatar ? (
              <Image
                src={adminUser.avatar}
                alt="Profile"
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4" />
            )}
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-slate-300" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition"
            title="Live Site"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/35 text-xs font-semibold transition"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-md bg-slate-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Desktop Sidebar (Tighter Width: md:w-56) */}
      <aside
        className={`${
          mobileMenuOpen ? 'block' : 'hidden'
        } md:flex md:w-56 bg-slate-900 border-r border-slate-800 flex-shrink-0 flex-col z-40 fixed md:sticky top-0 h-screen max-h-screen h-[100dvh] max-h-[100dvh] overflow-y-auto admin-scroll w-full`}
      >
        {/* Sidebar Brand Header */}
        <div className="px-3.5 py-3.5 border-b border-slate-800 hidden md:flex items-center flex-shrink-0">
          <Link href="/admin" className="inline-flex items-center gap-2 group">
            <div className="relative w-6 h-6 flex-shrink-0 flex items-center justify-center">
              <Image
                src="/images/logo-icon-light.png"
                alt="Amplipath"
                width={24}
                height={24}
                className="w-6 h-6 object-contain admin-logo-img-light"
                priority
              />
              <Image
                src="/images/logo-icon-dark.png"
                alt="Amplipath"
                width={24}
                height={24}
                className="w-6 h-6 object-contain admin-logo-img-dark"
                priority
              />
            </div>
            <span className="admin-logo-text text-sm font-extrabold tracking-tight font-sans transition-colors">
              AMPLIPATH
            </span>
          </Link>
        </div>

        {/* Navigation List with Professional Lucide Icons */}
        <nav className="flex-1 p-2 space-y-0.5">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Content Modules
          </div>
          {visibleNavItems.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`group flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] font-semibold px-1 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer: Just Clean Logout Button */}
        <div className="p-2.5 border-t border-slate-800 flex-shrink-0 bg-slate-900 mt-auto">
          <button
            onClick={handleLogout}
            title="Sign Out of Admin"
            className="w-full px-3 py-2 text-xs font-semibold text-rose-500 dark:text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/35 rounded-md transition flex items-center justify-center gap-2 shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area with Desktop Top Bar */}
      <div className={`flex-1 flex flex-col min-w-0 min-h-screen ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950'}`}>
        {/* Desktop Sticky Header Bar */}
        <header className="admin-header hidden md:flex h-14 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md px-6 items-center justify-between sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Amplipath Admin</span>
            <span className="text-slate-600">/</span>
            <span className="font-bold text-white flex items-center gap-1.5">
              <ActiveIcon className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
              <span>
                {pathname.startsWith('/admin/profile') ? 'Profile & Security' : activeNavItem?.name || 'Dashboard'}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition border shadow-xs ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
            >
              {theme === 'light' ? (
                <Moon className="w-3.5 h-3.5 text-slate-700" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
            </button>

            {/* Live Website Link */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition shadow-md shadow-blue-600/20"
              title="Open public website in new tab"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* Top Right Profile Avatar Button (No Name, Just Circular Avatar) */}
            <Link
              href="/admin/profile"
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition border shadow-xs overflow-hidden ${
                pathname.startsWith('/admin/profile')
                  ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-sm shadow-blue-500/30'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-slate-500 bg-slate-200 dark:bg-slate-800'
              }`}
              title="Admin Profile & Settings"
            >
              {adminUser?.avatar ? (
                <Image
                  src={adminUser.avatar}
                  alt="Profile Avatar"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              )}
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-x-hidden p-4 sm:p-6 md:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
