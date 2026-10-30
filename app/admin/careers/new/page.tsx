import React from 'react';
import CareerForm from '@/components/admin/CareerForm';

export const dynamic = 'force-dynamic';

export default function NewCareerPage() {
  return <CareerForm isEditing={false} />;
}
