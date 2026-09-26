import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES_DATA, ServiceDetail } from '@/data/servicesData';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const CATEGORY_ALIAS_MAP: Record<string, string> = {
  'search-geo-aeo': 'seo',
  'search-seo': 'seo',
  'ai-marketing': 'aiprompt',
  'social-paid-ads': 'fbads',
  'paid-ads': 'fbads',
  'content-strategy': 'content',
  'niche-growth': 'game',
  'niche-services': 'game',
  'analytics-strategy': 'analytics',
  'web-tech': 'webdev',
  'web-development': 'webdev',
  'ai-development': 'aidev',
};

// Helper to normalize slugs to match SERVICES_DATA keys
function resolveServiceData(slug: string): { data: ServiceDetail; serviceId: string } | null {
  if (!slug) return null;
  const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

  // 0. Explicit category alias match
  if (CATEGORY_ALIAS_MAP[decodedSlug] && SERVICES_DATA[CATEGORY_ALIAS_MAP[decodedSlug]]) {
    const key = CATEGORY_ALIAS_MAP[decodedSlug];
    return { data: SERVICES_DATA[key], serviceId: key };
  }

  // 1. Direct match (e.g. "seo", "mobileapp", "crm", "aiconsult", "crowdfund", "affiliate", "guestpost")
  if (SERVICES_DATA[decodedSlug]) {
    return { data: SERVICES_DATA[decodedSlug], serviceId: decodedSlug };
  }

  // 2. Normalize: remove dashes and underscores
  const cleanSlug = decodedSlug.replace(/[-_\s]/g, '');
  for (const [key, val] of Object.entries(SERVICES_DATA)) {
    const cleanKey = key.toLowerCase().replace(/[-_\s]/g, '');
    if (cleanKey === cleanSlug) {
      return { data: val, serviceId: key };
    }
  }

  // 3. Match against shortTitle or eye
  for (const [key, val] of Object.entries(SERVICES_DATA)) {
    const eyeClean = (val.eye || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const shortClean = (val.shortTitle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if ((eyeClean && eyeClean === cleanSlug) || (shortClean && shortClean === cleanSlug)) {
      return { data: val, serviceId: key };
    }
  }

  // 4. Substring / partial match
  for (const [key, val] of Object.entries(SERVICES_DATA)) {
    const eyeClean = (val.eye || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (eyeClean && (eyeClean.includes(cleanSlug) || cleanSlug.includes(eyeClean))) {
      return { data: val, serviceId: key };
    }
  }

  return null;
}

export function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resolved = resolveServiceData(params.slug);
  if (!resolved) {
    return {
      title: 'Service | AMPLIPATH',
    };
  }

  const { data } = resolved;
  const pageTitle = data.metaTitle || `${data.shortTitle || data.eye} | AMPLIPATH`;
  const pageDesc = data.metaDescription || data.sub || 'Measurable growth delivered through specialized digital marketing and technology solutions from AMPLIPATH.';

  return {
    title: pageTitle,
    description: pageDesc,
    openGraph: {
      title: pageTitle,
      description: pageDesc,
    }
  };
}

export default function ServiceDynamicPage({ params }: { params: { slug: string } }) {
  const resolved = resolveServiceData(params.slug);
  if (!resolved) {
    notFound();
  }

  return <ServicePageTemplate data={resolved.data} serviceId={resolved.serviceId} />;
}
