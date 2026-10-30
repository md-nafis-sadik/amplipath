import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import AdminForm from '@/components/admin/AdminForm';

export const dynamic = 'force-dynamic';

export default async function EditAdminPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const admin = await prisma.adminUser.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      avatar: true,
      status: true,
    },
  });

  if (!admin) {
    notFound();
  }

  return (
    <AdminForm
      isEditing={true}
      initialData={{
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status || 'active',
        avatar: admin.avatar,
      }}
    />
  );
}
