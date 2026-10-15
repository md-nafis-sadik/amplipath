import { MetadataRoute } from 'next';
import { SERVICES_DATA } from '@/data/servicesData';
import { getAllPosts } from '@/lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amplipath.com';
  const currentDate = new Date();

  // 1. Core static marketing & conversion pages
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

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Industry pages
  const industries = [
    'ecommerce',
    'education',
    'fintech',
    'gaming',
    'healthcare',
    'home-services',
    'law-firms',
    'nonprofits',
    'real-estate',
    'restaurants',
    'saas',
  ];

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/industries/${ind}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Explicit service landing pages
  const explicitServices = [
    'africa',
    'africa-market',
    'ai-brand-positioning',
    'ai-development',
    'ai-marketing',
    'analytics-strategy',
    'content-strategy',
    'google-local-services-ads',
    'mlm-network-marketing',
    'niche-growth',
    'niche-services',
    'paid-ads',
    'programmatic-advertising',
    'search-geo-aeo',
    'search-seo',
    'social-media',
    'social-paid-ads',
    'web-development',
    'web-tech',
    'website-copywriting',
    'website-security-analysis',
  ];

  // 4. Dynamic service slugs from SERVICES_DATA
  const dynamicServiceSlugs = Object.keys(SERVICES_DATA);

  // Combine and deduplicate all service paths
  const allServiceSlugs = Array.from(new Set([...explicitServices, ...dynamicServiceSlugs]));

  const servicePages: MetadataRoute.Sitemap = allServiceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 5. Dynamic blog articles from markdown files
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...industryPages, ...servicePages, ...blogPages];
}
