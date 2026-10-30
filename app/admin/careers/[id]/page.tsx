import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CareerForm from '@/components/admin/CareerForm';

export const dynamic = 'force-dynamic';

export default async function EditCareerPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const job = await prisma.jobListing.findUnique({
    where: { id },
  });

  if (!job || job.isDeleted) {
    notFound();
  }

  return (
    <CareerForm
      isEditing={true}
      initialData={{
        id: job.id,
        title: job.title,
        slug: job.slug,
        category: job.category,
        categoryLabel: job.categoryLabel,
        employmentType: job.employmentType,
        location: job.location,
        compensation: job.compensation,
        compDetail: job.compDetail,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        status: job.status,
      }}
    />
  );
}
