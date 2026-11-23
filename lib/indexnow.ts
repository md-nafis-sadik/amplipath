import prisma from '@/lib/prisma';
import { SERVICES_DATA } from '@/data/servicesData';

export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || 'c83e71d4b65942f2a91f5319e78a6340';
export const SITE_DOMAIN = 'amplipath.com';
export const SITE_ORIGIN = `https://${SITE_DOMAIN}`;
export const INDEXNOW_KEY_LOCATION = `${SITE_ORIGIN}/${INDEXNOW_KEY}.txt`;
export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
  submittedCount: number;
  urls: string[];
}

/**
 * Normalizes input into canonical full URLs on amplipath.com
 */
function normalizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  let pathWithQuery = trimmed;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      pathWithQuery = parsed.pathname + parsed.search;
    } catch {
      return null;
    }
  }

  // Ensure leading slash
  if (!pathWithQuery.startsWith('/')) {
    pathWithQuery = `/${pathWithQuery}`;
  }

  // Filter out admin, API, auth, or internal system paths
  if (
    pathWithQuery.startsWith('/admin') ||
    pathWithQuery.startsWith('/api') ||
    pathWithQuery.startsWith('/_next') ||
    pathWithQuery.includes('.json') ||
    pathWithQuery.includes('.txt') ||
    pathWithQuery.includes('.xml')
  ) {
    return null;
  }

  // Remove trailing slash unless root
  if (pathWithQuery.length > 1 && pathWithQuery.endsWith('/')) {
    pathWithQuery = pathWithQuery.slice(0, -1);
  }

  return `${SITE_ORIGIN}${pathWithQuery}`;
}

/**
 * Submits one or multiple URLs to the IndexNow protocol (Bing, Yandex, Naver, Seznam, etc.)
 */
export async function submitToIndexNow(
  urls: string | string[]
): Promise<IndexNowResult> {
  const rawList = Array.isArray(urls) ? urls : [urls];
  const normalized = Array.from(
    new Set(rawList.map(normalizeUrl).filter((u): u is string => Boolean(u)))
  );

  if (normalized.length === 0) {
    return {
      success: true,
      status: 200,
      message: 'No indexable URLs provided.',
      submittedCount: 0,
      urls: [],
    };
  }

  // IndexNow allows up to 10,000 URLs per request
  const batch = normalized.slice(0, 10000);

  const payload = {
    host: SITE_DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: batch,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'Amplipath-IndexNow/1.0',
      },
      body: JSON.stringify(payload),
    });

    const isOk = res.status === 200 || res.status === 202;
    const resText = await res.text().catch(() => '');

    let message = '';
    if (res.status === 200) {
      message = `IndexNow: Successfully submitted ${batch.length} URL(s). Search engines notified.`;
    } else if (res.status === 202) {
      message = `IndexNow: Accepted ${batch.length} URL(s). Key will be validated by search engine.`;
    } else if (res.status === 400) {
      message = `IndexNow 400: Invalid format or payload: ${resText}`;
    } else if (res.status === 403) {
      message = `IndexNow 403: Forbidden - Key not verified or invalid location: ${resText}`;
    } else if (res.status === 422) {
      message = `IndexNow 422: URLs do not belong to host: ${resText}`;
    } else if (res.status === 429) {
      message = `IndexNow 429: Too Many Requests (rate-limited).`;
    } else {
      message = `IndexNow returned status ${res.status}: ${resText}`;
    }

    console.log(`[IndexNow] ${message}`);

    return {
      success: isOk,
      status: res.status,
      message,
      submittedCount: isOk ? batch.length : 0,
      urls: batch,
    };
  } catch (err: any) {
    const errMsg = `IndexNow submission failed: ${err.message || String(err)}`;
    console.error(`[IndexNow Error]`, errMsg);
    return {
      success: false,
      status: 500,
      message: errMsg,
      submittedCount: 0,
      urls: batch,
    };
  }
}

/**
 * Gathers all public live URLs on Amplipath for bulk IndexNow submission
 */
export async function getAllIndexableUrls(): Promise<string[]> {
  const urls: string[] = [
    '/',
    '/about',
    '/services',
    '/industries',
    '/work',
    '/blog',
    '/ai',
    '/contact',
    '/careers',
    '/free-audit',
    '/privacy-policy',
  ];

  // 11 Industry pages
  const industries = [
    '/industries/ecommerce',
    '/industries/education',
    '/industries/fintech',
    '/industries/gaming',
    '/industries/healthcare',
    '/industries/home-services',
    '/industries/law-firms',
    '/industries/nonprofits',
    '/industries/real-estate',
    '/industries/restaurants',
    '/industries/saas',
  ];
  urls.push(...industries);

  // 73 Services
  const serviceSlugs = Object.keys(SERVICES_DATA);
  for (const s of serviceSlugs) {
    urls.push(`/services/${s}`);
  }

  // Published blog posts
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        isDeleted: false,
        status: 'published',
        noIndex: false,
      },
      select: { slug: true },
    });
    for (const p of posts) {
      urls.push(`/blog/${p.slug}`);
    }
  } catch (e) {
    console.error('Failed to query blog posts for IndexNow:', e);
  }

  // Published case studies
  try {
    const cases = await prisma.caseStudy.findMany({
      where: {
        isDeleted: false,
        status: 'published',
        noIndex: false,
      },
      select: { slug: true },
    });
    for (const c of cases) {
      urls.push(`/work/${c.slug}`);
    }
  } catch (e) {
    console.error('Failed to query case studies for IndexNow:', e);
  }

  // Normalize all
  const normalized = Array.from(
    new Set(urls.map(normalizeUrl).filter((u): u is string => Boolean(u)))
  );

  return normalized;
}
