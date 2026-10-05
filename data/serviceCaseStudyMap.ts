import { CaseStudy, CASE_STUDIES } from './caseStudiesData';

// Map service slugs/IDs to their corresponding Case Study ID
const SERVICE_TO_CASE_STUDY_ID: Record<string, string> = {
  // SEO & Technical Search
  'seo': 'savajay',
  'search-seo': 'savajay',
  'search-geo-aeo': 'savajay',
  'techseo': 'forbidden',
  'ecoseo': 'amber',

  // Web & Ecommerce Development
  'ecomdev': 'amber',
  'webdev': 'zarea-web',
  'customweb': 'zarea-web',
  'web-development': 'zarea-web',
  'web-tech': 'zarea-web',
  'aiwebsoft': 'zarea-app',

  // CRO & Conversion Landing Pages
  'cro': 'furry',
  'landing': 'aceofcoins',

  // Mobile App Development & App Marketing
  'mobileapp': 'postpadel',
  'appmarketing': 'postpadel',
  'aimobile': 'thimin',

  // AI Development & Intelligent Automation
  'aidev': 'webprivacy',
  'ai-development': 'webprivacy',
  'aiagents': 'webprivacy',
  'aiintegrate': 'webprivacy',

  // Social Commerce & Dropshipping
  'dropship': 'print',
  'tiktok': 'print',
  'socialcommerce': 'print',

  // Niche Growth, Gaming & Video Ads
  'game': 'actorpass',
  'niche-growth': 'actorpass',
  'niche-services': 'actorpass',
  'steam': 'peony',
  'redditmarketing': 'actorpass',
  'redditads': 'actorpass',
  'ytads': 'actorpass',

  // Course Promotion & Video SEO
  'course': 'davinci',
  'videoseo': 'davinci',

  // Crowdfunding & Digital PR
  'crowdfund': 'novella',
  'pr': 'novella',
  'digitalpr': 'novella',

  // Africa Market Expansion
  'africa': 'ola',
  'africa-market': 'ola'
};

export function getCaseStudyForService(serviceId: string): CaseStudy | null {
  if (!serviceId) return null;
  const normalizedId = serviceId.toLowerCase().trim();
  const caseId = SERVICE_TO_CASE_STUDY_ID[normalizedId];
  if (!caseId) return null;
  return CASE_STUDIES.find(cs => cs.id === caseId) || null;
}
