import React from 'react';
import prisma from '@/lib/prisma';
import { CaseStudy, CASE_STUDIES } from '@/data/caseStudiesData';
import WorkClientView from './WorkClientView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function WorkPage() {
  let casesList: CaseStudy[] = [];

  try {
    const dbCases = await prisma.caseStudy.findMany({
      where: { isDeleted: false, status: 'published' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    casesList = dbCases.map((dbCs) => {
      const fallback = CASE_STUDIES.find((c) => c.id === dbCs.slug);
      let keyStats = fallback?.keyStats || [];
      let servicesDelivered = fallback?.servicesDelivered || [];
      try {
        if (dbCs.services) {
          servicesDelivered = typeof dbCs.services === 'string' ? JSON.parse(dbCs.services) : dbCs.services;
        }
      } catch {}
      try {
        if (dbCs.keyStats) {
          keyStats = typeof dbCs.keyStats === 'string' ? JSON.parse(dbCs.keyStats) : dbCs.keyStats;
        }
      } catch {}

      return {
        id: dbCs.slug,
        name: dbCs.name,
        category: (fallback?.category || 'Websites & Search') as any,
        categorySlug: (fallback?.categorySlug || 'websites-search') as any,
        industry: dbCs.industry || fallback?.industry || '',
        headline: dbCs.headline || fallback?.headline || '',
        metric: dbCs.metric || fallback?.metric || '',
        metricLabel: dbCs.metricLabel || fallback?.metricLabel || '',
        summary: dbCs.summary || fallback?.summary || '',
        tags: fallback?.tags || ['Growth & Technology'],
        image: dbCs.image || fallback?.image || '',
        gradient: fallback?.gradient || 'from-[#1e293b] to-[#0f172a]',
        bgGradient: fallback?.bgGradient || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        accentColor: fallback?.accentColor || '#2563eb',
        watermark: fallback?.watermark || 'Case',
        websiteUrl: dbCs.clientWebsite || fallback?.websiteUrl,
        websiteDisplay: fallback?.websiteDisplay,
        heroTitle: fallback?.heroTitle || dbCs.headline || dbCs.name,
        heroSub: fallback?.heroSub || dbCs.summary || '',
        keyStats: Array.isArray(keyStats) && keyStats.length > 0 ? keyStats : (fallback?.keyStats || []),
        theCompany: fallback?.theCompany || dbCs.summary || '',
        theOpportunity: dbCs.overview || fallback?.theOpportunity || '',
        ourSolution: dbCs.solution
          ? (Array.isArray(dbCs.solution) ? dbCs.solution : [dbCs.solution])
          : (fallback?.ourSolution || []),
        theResults: dbCs.results
          ? (Array.isArray(dbCs.results) ? dbCs.results : [dbCs.results])
          : (fallback?.theResults || []),
        servicesDelivered: Array.isArray(servicesDelivered) && servicesDelivered.length > 0
          ? servicesDelivered
          : (fallback?.servicesDelivered || []),
      };
    });
  } catch (error) {
    console.error('Failed to query case studies from database:', error);
  }

  return <WorkClientView initialCases={casesList} />;
}
