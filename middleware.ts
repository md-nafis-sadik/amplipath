import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { canAccessPath } from '@/lib/rbac';

const JWT_SECRET = process.env.JWT_SECRET || 'amplipath_super_secure_jwt_secret_key_2026_xyz';
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = 'admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and login API without auth
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth/login')) {
    return NextResponse.next();
  }

  // Check for admin routes and admin API routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);

      // Check RBAC permission for page routes
      if (pathname.startsWith('/admin') && pathname !== '/admin' && pathname !== '/admin/profile') {
        const userRole = (payload.role as string) || 'editor';
        if (!canAccessPath(userRole, pathname)) {
          // If unauthorized for this route, redirect to admin home
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }

      return NextResponse.next();
    } catch {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(COOKIE_NAME);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
