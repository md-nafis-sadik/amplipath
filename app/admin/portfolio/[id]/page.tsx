import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import CaseStudyForm from '@/components/admin/CaseStudyForm';

export const dynamic = 'force-dynamic';

export default async function EditCaseStudyPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  if (isNaN(id)) notFound();

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
  });

  if (!caseStudy || caseStudy.isDeleted) {
    notFound();
  }

  // Parse JSON fields
  let parsedKeyStats = [];
  try {
    parsedKeyStats = caseStudy.keyStats ? JSON.parse(caseStudy.keyStats) : [];
  } catch {
    parsedKeyStats = [];
  }
  if (!Array.isArray(parsedKeyStats) || parsedKeyStats.length === 0) {
    parsedKeyStats = [{ label: '', value: '' }];
  }

  let servicesStr = '';
  try {
    const arr = caseStudy.services ? JSON.parse(caseStudy.services) : [];
    servicesStr = Array.isArray(arr) ? arr.join(', ') : '';
  } catch {
    servicesStr = caseStudy.services || '';
  }

  let deliverablesStr = '';
  try {
    const arr = caseStudy.deliverables ? JSON.parse(caseStudy.deliverables) : [];
    deliverablesStr = Array.isArray(arr) ? arr.join(', ') : '';
  } catch {
    deliverablesStr = caseStudy.deliverables || '';
  }

  let screenshotsStr = '';
  try {
    const arr = caseStudy.screenshots ? JSON.parse(caseStudy.screenshots) : [];
    screenshotsStr = Array.isArray(arr) ? arr.join('\n') : '';
  } catch {
    screenshotsStr = caseStudy.screenshots || '';
  }

  const initialData = {
    id: caseStudy.id,
    name: caseStudy.name,
    slug: caseStudy.slug,
    industry: caseStudy.industry || '',
    headline: caseStudy.headline || '',
    metric: caseStudy.metric || '',
    metricLabel: caseStudy.metricLabel || '',
    summary: caseStudy.summary || '',
    image: caseStudy.image || '',
    clientWebsite: caseStudy.clientWebsite || '',
    appStoreUrl: caseStudy.appStoreUrl || '',
    playStoreUrl: caseStudy.playStoreUrl || '',
    overview: caseStudy.overview || '',
    solution: caseStudy.solution || '',
    results: caseStudy.results || '',
    services: servicesStr,
    deliverables: deliverablesStr,
    screenshots: screenshotsStr,
    keyStats: parsedKeyStats,
    status: caseStudy.status as 'draft' | 'published',
    isFeatured: caseStudy.isFeatured,
    seoTitle: caseStudy.seoTitle || '',
    metaDescription: caseStudy.metaDescription || '',
    canonicalUrl: caseStudy.canonicalUrl || '',
    noIndex: caseStudy.noIndex,
    ogTitle: caseStudy.ogTitle || '',
    ogDescription: caseStudy.ogDescription || '',
    ogImage: caseStudy.ogImage || '',
  };

  return <CaseStudyForm initialData={initialData} isEditing={true} />;
}
