import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { CaseStudy, CASE_STUDIES } from '@/data/caseStudiesData';
import CaseStudyDetailView from '@/components/CaseStudyDetailView';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  try {
    const dbCases = await prisma.caseStudy.findMany({
      where: { isDeleted: false, status: 'published' },
      select: { slug: true },
    });
    if (dbCases.length > 0) {
      return dbCases.map((c) => ({ slug: c.slug }));
    }
  } catch (err) {
    // DB offline fallback
  }
  return CASE_STUDIES.map((c) => ({ slug: c.id }));
}

async function getCaseStudyData(slug: string) {
  let dbCs: any = null;
  try {
    dbCs = await prisma.caseStudy.findFirst({
      where: { slug, isDeleted: false },
    });
  } catch (err) {
    console.error('Error fetching case study from database:', err);
  }

  const fallback = CASE_STUDIES.find((c) => c.id === slug);

  if (!dbCs && !fallback) {
    return null;
  }

  let keyStats = fallback?.keyStats || [];
  let servicesDelivered = fallback?.servicesDelivered || [];
  try {
    if (dbCs?.services) {
      servicesDelivered = typeof dbCs.services === 'string' ? JSON.parse(dbCs.services) : dbCs.services;
    }
  } catch {}
  try {
    if (dbCs?.keyStats) {
      keyStats = typeof dbCs.keyStats === 'string' ? JSON.parse(dbCs.keyStats) : dbCs.keyStats;
    }
  } catch {}

  const caseData: CaseStudy = {
    id: dbCs?.slug || fallback!.id,
    name: dbCs?.name || fallback!.name,
    category: (fallback?.category || 'Websites & Search') as any,
    categorySlug: (fallback?.categorySlug || 'websites-search') as any,
    industry: dbCs?.industry || fallback?.industry || '',
    headline: dbCs?.headline || fallback?.headline || '',
    metric: dbCs?.metric || fallback?.metric || '',
    metricLabel: dbCs?.metricLabel || fallback?.metricLabel || '',
    summary: dbCs?.summary || fallback?.summary || '',
    tags: fallback?.tags || ['Growth & Technology'],
    image: dbCs?.image || fallback?.image || '',
    gradient: fallback?.gradient || 'from-[#1e293b] to-[#0f172a]',
    bgGradient: fallback?.bgGradient || 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    accentColor: fallback?.accentColor || '#2563eb',
    watermark: fallback?.watermark || 'Case',
    websiteUrl: dbCs?.clientWebsite || fallback?.websiteUrl,
    websiteDisplay: fallback?.websiteDisplay,
    heroTitle: fallback?.heroTitle || dbCs?.headline || dbCs?.name || '',
    heroSub: fallback?.heroSub || dbCs?.summary || '',
    keyStats: Array.isArray(keyStats) && keyStats.length > 0 ? keyStats : (fallback?.keyStats || []),
    theCompany: fallback?.theCompany || dbCs?.summary || '',
    theOpportunity: dbCs?.overview || fallback?.theOpportunity || '',
    ourSolution: dbCs?.solution
      ? (Array.isArray(dbCs.solution) ? dbCs.solution : [dbCs.solution])
      : (fallback?.ourSolution || []),
    theResults: dbCs?.results
      ? (Array.isArray(dbCs.results) ? dbCs.results : [dbCs.results])
      : (fallback?.theResults || []),
    servicesDelivered: Array.isArray(servicesDelivered) && servicesDelivered.length > 0
      ? servicesDelivered
      : (fallback?.servicesDelivered || []),
  };

  return { dbCs, fallback, caseData };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const result = await getCaseStudyData(params.slug);
  if (!result) {
    return {
      title: 'Case Study Not Found | AMPLIPATH',
    };
  }

  const { dbCs, fallback, caseData } = result;

  const pageTitle = dbCs?.seoTitle || `${caseData.name} Case Study | Amplipath`;
  const pageDesc = dbCs?.metaDescription || caseData.summary || '';
  const canonicalUrl = dbCs?.canonicalUrl || `/work/${caseData.id}`;
  const ogImg = dbCs?.ogImage || dbCs?.image || fallback?.image || '/images/logo-horizontal.jpg';

  return {
    title: pageTitle,
    description: pageDesc,
    robots: dbCs?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: dbCs?.ogTitle || pageTitle,
      description: dbCs?.ogDescription || pageDesc,
      url: canonicalUrl,
      type: 'article',
      siteName: 'AMPLIPATH',
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: caseData.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dbCs?.ogTitle || pageTitle,
      description: dbCs?.ogDescription || pageDesc,
      images: [ogImg],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const result = await getCaseStudyData(params.slug);
  if (!result) {
    notFound();
  }

  const { dbCs, caseData } = result;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dbCs?.seoTitle || caseData.name,
    description: dbCs?.metaDescription || caseData.summary,
    image: caseData.image || 'https://amplipath.com/images/logo-horizontal.jpg',
    author: {
      '@type': 'Organization',
      name: 'AMPLIPATH',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AMPLIPATH',
      logo: {
        '@type': 'ImageObject',
        url: 'https://amplipath.com/images/logo-horizontal.jpg',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyDetailView caseStudy={caseData} />
    </>
  );
}
