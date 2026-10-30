import { NextResponse } from 'next/server';
import { getAdminSession, signAdminToken, COOKIE_NAME } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, avatar } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check email uniqueness if email changed
    const existing = await prisma.adminUser.findFirst({
      where: {
        email: cleanEmail,
        id: { not: session.id },
      },
    });

    if (existing) {
      return NextResponse.json({ error: 'That email is already registered by another admin' }, { status: 409 });
    }

    const updated = await prisma.adminUser.update({
      where: { id: session.id },
      data: {
        name: name.trim(),
        email: cleanEmail,
        avatar: avatar !== undefined ? avatar : undefined,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        status: true,
        updatedAt: true,
      },
    });

    // Re-issue JWT session cookie with fresh information
    const newToken = await signAdminToken({
      id: updated.id,
      email: updated.email,
      name: updated.name,
      role: updated.role,
      avatar: updated.avatar,
    });

    const response = NextResponse.json({
      success: true,
      user: updated,
      message: 'Profile updated successfully',
    });

    response.cookies.set(COOKIE_NAME, newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
