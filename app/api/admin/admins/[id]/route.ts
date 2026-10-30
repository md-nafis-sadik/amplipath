import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getAdminSession } from '@/lib/auth';
import { normalizeRole } from '@/lib/rbac';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUserRole = normalizeRole(session.role);
  if (currentUserRole !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Super Admins can access admin details' },
      { status: 403 }
    );
  }

  const adminId = parseInt(params.id, 10);
  if (isNaN(adminId)) {
    return NextResponse.json({ error: 'Invalid admin ID' }, { status: 400 });
  }

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: adminId },
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

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ admin });
  } catch (error: any) {
    console.error('Fetch admin error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch admin' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUserRole = normalizeRole(session.role);
  if (currentUserRole !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Super Admins can update admin accounts' },
      { status: 403 }
    );
  }

  const adminId = parseInt(params.id, 10);
  if (isNaN(adminId)) {
    return NextResponse.json({ error: 'Invalid admin ID' }, { status: 400 });
  }

  try {
    const targetAdmin = await prisma.adminUser.findUnique({
      where: { id: adminId },
    });

    if (!targetAdmin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, role, status, newPassword } = body;

    const dataToUpdate: any = {};

    if (name?.trim()) dataToUpdate.name = name.trim();

    if (email?.trim()) {
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail !== targetAdmin.email) {
        const emailExists = await prisma.adminUser.findFirst({
          where: { email: cleanEmail, id: { not: adminId } },
        });
        if (emailExists) {
          return NextResponse.json(
            { error: 'That email is already assigned to another admin' },
            { status: 409 }
          );
        }
        dataToUpdate.email = cleanEmail;
      }
    }

    if (role) {
      const cleanRole = normalizeRole(role);
      // Safety check: Prevent demoting the last super_admin
      if (normalizeRole(targetAdmin.role) === 'super_admin' && cleanRole !== 'super_admin') {
        const superAdminCount = await prisma.adminUser.count({
          where: {
            OR: [
              { role: 'super_admin' },
              { role: 'superadmin' },
            ],
            status: 'active',
          },
        });
        if (superAdminCount <= 1) {
          return NextResponse.json(
            { error: 'Cannot demote the only remaining active Super Admin.' },
            { status: 400 }
          );
        }
      }
      dataToUpdate.role = cleanRole;
    }

    if (status) {
      // Safety check: Prevent suspending yourself or last super_admin
      if (adminId === session.id && status === 'suspended') {
        return NextResponse.json(
          { error: 'You cannot suspend your own active account.' },
          { status: 400 }
        );
      }
      dataToUpdate.status = status === 'suspended' ? 'suspended' : 'active';
    }

    if (newPassword && newPassword.trim()) {
      if (newPassword.length < 8) {
        return NextResponse.json(
          { error: 'Password must be at least 8 characters long' },
          { status: 400 }
        );
      }
      dataToUpdate.passwordHash = await bcrypt.hash(newPassword, 10);
    }

    const updated = await prisma.adminUser.update({
      where: { id: adminId },
      data: dataToUpdate,
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

    return NextResponse.json({
      success: true,
      admin: updated,
      message: 'Admin account updated successfully',
    });
  } catch (error: any) {
    console.error('Update admin error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update admin user' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const currentUserRole = normalizeRole(session.role);
  if (currentUserRole !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden: Only Super Admins can delete admin accounts' },
      { status: 403 }
    );
  }

  const adminId = parseInt(params.id, 10);
  if (isNaN(adminId)) {
    return NextResponse.json({ error: 'Invalid admin ID' }, { status: 400 });
  }

  // Safety: Cannot delete oneself
  if (adminId === session.id) {
    return NextResponse.json(
      { error: 'You cannot delete your own account while logged in.' },
      { status: 400 }
    );
  }

  try {
    const targetAdmin = await prisma.adminUser.findUnique({
      where: { id: adminId },
    });

    if (!targetAdmin) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Safety: Cannot delete last super admin
    if (normalizeRole(targetAdmin.role) === 'super_admin') {
      const superAdminCount = await prisma.adminUser.count({
        where: {
          OR: [
            { role: 'super_admin' },
            { role: 'superadmin' },
          ],
        },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the only remaining Super Admin on the platform.' },
          { status: 400 }
        );
      }
    }

    await prisma.adminUser.delete({
      where: { id: adminId },
    });

    return NextResponse.json({
      success: true,
      message: `Admin ${targetAdmin.name} removed successfully`,
    });
  } catch (error: any) {
    console.error('Delete admin error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete admin user' },
      { status: 500 }
    );
  }
}
