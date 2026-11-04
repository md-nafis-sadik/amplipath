import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prisma from '@/lib/prisma';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  dateTxt?: string;
  category: string;
  categorySlug?: string;
  excerpt: string;
  emoji: string;
  readTime: string;
  contentHtml?: string;
  featuredImage?: string | null;
  imageAlt?: string | null;
  authorName?: string;
  authorRole?: string | null;
  authorImage?: string | null;
  authorBio?: string | null;
  authorLinkedin?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  noIndex?: boolean;
}

export function calculateReadTime(
  contentHtml?: string | null,
  fallbackText?: string | null,
  customReadTime?: string | null
): string {
  const text = (contentHtml || fallbackText || '').replace(/<[^>]+>/g, ' ').trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const calculatedMins = Math.max(1, Math.round(words / 200));

  if (customReadTime && customReadTime.trim()) {
    const trimmed = customReadTime.trim();
    // If it was the old default '20 min read' on a short post, use the actual calculated read time
    if (trimmed === '20 min read' && words > 0 && words < 2000) {
      return `${calculatedMins} min read`;
    }
    const match = trimmed.match(/^\d+/);
    if (match) {
      return `${match[0]} min read`;
    }
    return trimmed;
  }

  return `${calculatedMins} min read`;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || 'Untitled Post',
        date: matterResult.data.date || new Date().toISOString().split('T')[0],
        category: matterResult.data.category || 'General',
        excerpt: matterResult.data.excerpt || '',
        emoji: matterResult.data.emoji || '📝',
        readTime: matterResult.data.readTime || '5 min read',
        authorName: 'AMPLIPATH Research',
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getLivePosts(): Promise<BlogPost[]> {
  try {
    const now = new Date();

    // Auto-promote any scheduled posts whose release time has passed
    try {
      await prisma.blogPost.updateMany({
        where: {
          isDeleted: false,
          status: 'scheduled',
          scheduledAt: { lte: now },
        },
        data: {
          status: 'published',
          publishedAt: now,
        },
      });
    } catch (schedErr) {
      console.warn('Auto-publish check error:', schedErr);
    }

    const dbPosts = await prisma.blogPost.findMany({
      where: {
        isDeleted: false,
        OR: [
          { status: 'published' },
          {
            status: 'scheduled',
            scheduledAt: { lte: now },
          },
        ],
      },
      include: { category: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    // If database query succeeded, the DB is the source of truth (even if 0 posts)
    return dbPosts.map((p) => {
      const pubDate = p.publishedAt || p.createdAt;
      const dateTxt = pubDate ? pubDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) : '';

      return {
        slug: p.slug,
        title: p.title,
        date: pubDate ? pubDate.toISOString().split('T')[0] : '',
        dateTxt,
        category: p.category?.name || 'General',
        categorySlug: p.category?.slug || 'all',
        excerpt: p.excerpt || '',
        emoji: '📝',
        readTime: calculateReadTime(p.contentHtml, p.excerpt, p.readTime),
        featuredImage: p.featuredImage || '/images/blog/what-are-geo-and-aeo-cover-800.webp',
        imageAlt: p.imageAlt || p.title,
        authorName: p.authorName || 'Adebayo Ogungbemile',
        authorRole: p.authorRole || 'Founder & CEO of Amplipath & Owner of Boostfunders',
        authorImage: p.authorImage || '/images/team/adebayo-ogungbemile-320.jpg',
        authorBio: p.authorBio || 'Adebayo Ogungbemile is the founder and CEO of Amplipath, an integrated digital marketing, technology and AI agency.',
        authorLinkedin: p.authorLinkedin || 'https://www.linkedin.com/in/adebayo-ogungbemile/',
        seoTitle: p.seoTitle,
        metaDescription: p.metaDescription,
        canonicalUrl: p.canonicalUrl,
        ogTitle: p.ogTitle,
        ogDescription: p.ogDescription,
        ogImage: p.ogImage,
        noIndex: p.noIndex,
      };
    });
  } catch (err) {
    console.warn('DB getLivePosts fallback:', err);
    return getAllPosts();
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 1. Try querying live MySQL database first
  try {
    const now = new Date();
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });

    // If the record exists in the database, DB is the absolute source of truth
    if (dbPost) {
      // If deleted or not published yet, strictly return null (do NOT fall back to local disk files)
      if (
        dbPost.isDeleted ||
        (dbPost.status !== 'published' &&
          !(dbPost.status === 'scheduled' && dbPost.scheduledAt && dbPost.scheduledAt <= now))
      ) {
        return null;
      }

      if (dbPost.status === 'scheduled') {
        try {
          await prisma.blogPost.update({
            where: { id: dbPost.id },
            data: { status: 'published', publishedAt: dbPost.scheduledAt || now },
          });
        } catch (updErr) {
          console.warn('Error auto-updating scheduled post status:', updErr);
        }
      }

      const pubDate = dbPost.publishedAt || dbPost.scheduledAt || dbPost.createdAt;
      const dateTxt = pubDate ? pubDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) : '';

      return {
        slug: dbPost.slug,
        title: dbPost.title,
        date: pubDate ? pubDate.toISOString().split('T')[0] : '',
        dateTxt,
        category: dbPost.category?.name || 'AEO / GEO',
        categorySlug: dbPost.category?.slug || 'aeo-geo',
        excerpt: dbPost.excerpt || '',
        emoji: '📝',
        readTime: calculateReadTime(dbPost.contentHtml, dbPost.excerpt, dbPost.readTime),
        contentHtml: dbPost.contentHtml,
        featuredImage: dbPost.featuredImage || '/images/blog/what-are-geo-and-aeo-cover.webp',
        imageAlt: dbPost.imageAlt || dbPost.title,
        authorName: dbPost.authorName || 'Adebayo Ogungbemile',
        authorRole: dbPost.authorRole || 'Founder & CEO of Amplipath & Owner of Boostfunders',
        authorImage: dbPost.authorImage || '/images/team/adebayo-ogungbemile-320.jpg',
        authorBio: dbPost.authorBio || 'Adebayo Ogungbemile is the founder and CEO of Amplipath, an integrated digital marketing, technology and AI agency.',
        authorLinkedin: dbPost.authorLinkedin || 'https://www.linkedin.com/in/adebayo-ogungbemile/',
        seoTitle: dbPost.seoTitle,
        metaDescription: dbPost.metaDescription,
        canonicalUrl: dbPost.canonicalUrl,
        ogTitle: dbPost.ogTitle,
        ogDescription: dbPost.ogDescription,
        ogImage: dbPost.ogImage,
        noIndex: dbPost.noIndex,
      };
    }

    // If DB is healthy and record is not found in DB at all, return null
    return null;
  } catch (dbErr) {
    console.warn(`DB getPostBySlug(${slug}) fallback:`, dbErr);
  }

  // 2. Only fallback to local markdown file if database connection failed/offline
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: matterResult.data.title || 'Untitled Post',
      date: matterResult.data.date || new Date().toISOString().split('T')[0],
      category: matterResult.data.category || 'General',
      excerpt: matterResult.data.excerpt || '',
      emoji: matterResult.data.emoji || '📝',
      readTime: matterResult.data.readTime || '5 min read',
      contentHtml,
      authorName: 'AMPLIPATH Research',
    };
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}
