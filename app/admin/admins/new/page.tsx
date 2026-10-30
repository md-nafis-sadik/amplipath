import React from 'react';
import AdminForm from '@/components/admin/AdminForm';

export const dynamic = 'force-dynamic';

export default function NewAdminPage() {
  return <AdminForm isEditing={false} />;
}
