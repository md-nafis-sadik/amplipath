import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';
import { normalizeRole } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = normalizeRole(session.role);
  if (userRole !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Super Admins can access Admin Management' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const search = searchParams.get('search')?.trim();

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
      ];
    }

    const [total, admins] = await Promise.all([
      prisma.adminUser.count({ where }),
      prisma.adminUser.findMany({
        where,
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
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      admins,
      total,
      page,
      totalPages,
      limit,
    });
  } catch (error) {
    console.error('Fetch admins error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin users' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = normalizeRole(session.role);
  if (userRole !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Super Admins can create admin accounts' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, role, password, status = 'active' } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = normalizeRole(role);

    // Check if email already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An admin with this email address already exists' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newAdmin = await prisma.adminUser.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        role: cleanRole,
        passwordHash,
        status: status === 'suspended' ? 'suspended' : 'active',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      admin: newAdmin,
      message: `Admin user ${newAdmin.name} created successfully`,
    });
  } catch (error: any) {
    console.error('Create admin error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
