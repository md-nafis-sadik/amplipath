import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';
import { SERVICES_DATA } from '@/data/servicesData';
import { getAllPosts } from '@/lib/markdown';
import { CASE_STUDIES } from '@/data/caseStudiesData';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://amplipath.com';
  const currentDate = new Date();

  // 1. Core static marketing pages fallback
  const staticRoutes: Array<{ path: string; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; priority: number }> = [
    { path: '', changeFrequency: 'daily', priority: 1.0 },
    { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/industries', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-audit', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/work', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/ai', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/careers', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Try querying live database for dynamic entities
  let dbPosts: Array<{ slug: string; updatedAt: Date; publishedAt: Date | null }> = [];
  let dbCaseStudies: Array<{ slug: string; updatedAt: Date }> = [];
  let dbSeoPages: Array<{ pagePath: string; updatedAt: Date }> = [];

  try {
    const [posts, cases, pages] = await Promise.all([
      prisma.blogPost.findMany({
        where: { isDeleted: false, status: 'published', noIndex: false },
        select: { slug: true, updatedAt: true, publishedAt: true },
      }),
      prisma.caseStudy.findMany({
        where: { isDeleted: false, status: 'published', noIndex: false },
        select: { slug: true, updatedAt: true },
      }),
      prisma.pageSeo.findMany({
        where: { noIndex: false },
        select: { pagePath: true, updatedAt: true },
      }),
    ]);

    dbPosts = posts;
    dbCaseStudies = cases;
    dbSeoPages = pages;
  } catch (dbErr) {
    console.warn('Sitemap using static fallback (DB offline or error):', dbErr);
  }

  // 2. Build core pages
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 3. Build Industry pages
  const industries = [
    'ecommerce', 'education', 'fintech', 'gaming', 'healthcare',
    'home-services', 'law-firms', 'nonprofits', 'real-estate',
    'restaurants', 'saas',
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 4. Build Service pages
  const dynamicServiceSlugs = Object.keys(SERVICES_DATA);
  const servicePages: MetadataRoute.Sitemap = dynamicServiceSlugs.map((slug) => {
    // If PageSeo has an updated timestamp in DB, use it
    const dbPage = dbSeoPages.find((p) => p.pagePath === `/services/${slug}`);
    return {
      url: `${baseUrl}/services/${slug}`,
      lastModified: dbPage ? new Date(dbPage.updatedAt) : currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    };
  });

  // 5. Build Blog pages (Live DB posts + markdown fallback)
  let blogPages: MetadataRoute.Sitemap = [];
  if (dbPosts.length > 0) {
    blogPages = dbPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.publishedAt || currentDate),
      changeFrequency: 'weekly',
      priority: 0.75,
    }));
  } else {
    const fallbackPosts = getAllPosts();
    blogPages = fallbackPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  }

  // 6. Build Case Study pages (from live DB + static fallback)
  let caseStudyPages: MetadataRoute.Sitemap = [];
  if (dbCaseStudies.length > 0) {
    caseStudyPages = dbCaseStudies.map((cs) => ({
      url: `${baseUrl}/work/${cs.slug}`,
      lastModified: new Date(cs.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } else {
    caseStudyPages = CASE_STUDIES.map((cs) => ({
      url: `${baseUrl}/work/${cs.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  }

  // Combine and deduplicate URLs
  const urlMap = new Map<string, MetadataRoute.Sitemap[number]>();
  const allEntries = [
    ...staticPages,
    ...industryPages,
    ...servicePages,
    ...blogPages,
    ...caseStudyPages,
  ];

  for (const entry of allEntries) {
    urlMap.set(entry.url, entry);
  }

  return Array.from(urlMap.values());
}
