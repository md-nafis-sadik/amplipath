import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'amplipath_super_secure_jwt_secret_key_2026_xyz';
const SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
export const COOKIE_NAME = 'admin_session';

export interface AdminSessionPayload {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar?: string | null;
  [key: string]: unknown;
}

/**
 * Sign an admin session token (valid for 7 days)
 */
export async function signAdminToken(payload: AdminSessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

/**
 * Verify an admin session token
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

/**
 * Get current admin session from server component or route handler
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}

/**
 * Verify session from NextRequest (for middleware)
 */
export async function verifyRequestSession(request: NextRequest): Promise<AdminSessionPayload | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifyAdminToken(token);
}
