import React from 'react';
import prisma from '@/lib/prisma';
import CareersClientView, { JobRole } from './CareersClientView';

// Enforce dynamic server-side rendering with ZERO caching on every request
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function CareersPage() {
  const dbJobs = await prisma.jobListing.findMany({
    where: { isDeleted: false, status: 'active' },
    orderBy: { createdAt: 'desc' },
  });

  const roles: JobRole[] = dbJobs.map((j) => {
    let resp: string[] = [];
    let req: string[] = [];
    try {
      resp = typeof j.responsibilities === 'string' ? JSON.parse(j.responsibilities) : j.responsibilities || [];
    } catch {
      resp = j.responsibilities ? [j.responsibilities] : [];
    }
    try {
      req = typeof j.requirements === 'string' ? JSON.parse(j.requirements) : j.requirements || [];
    } catch {
      req = j.requirements ? [j.requirements] : [];
    }
    return {
      id: j.slug || String(j.id),
      title: j.title,
      category: j.category || 'General',
      categoryLabel: j.categoryLabel || j.category || 'General',
      type: j.employmentType || 'Project-Based / Contract',
      location: j.location || 'Remote · Worldwide',
      compensation: j.compensation || 'Project-Based',
      compDetail: j.compDetail || '',
      description: j.description || '',
      responsibilities: Array.isArray(resp) ? resp : [],
      requirements: Array.isArray(req) ? req : [],
    };
  });

  return <CareersClientView initialRoles={roles} />;
}
