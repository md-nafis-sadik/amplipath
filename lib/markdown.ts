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
  category: string;
  excerpt: string;
  emoji: string;
  readTime: string;
  contentHtml?: string;
  featuredImage?: string | null;
  imageAlt?: string | null;
  authorName?: string;
  seoTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  noIndex?: boolean;
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
    const dbPosts = await prisma.blogPost.findMany({
      where: { isDeleted: false, status: 'published' },
      include: { category: true },
      orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    });

    if (dbPosts && dbPosts.length > 0) {
      return dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.publishedAt
          ? p.publishedAt.toISOString().split('T')[0]
          : p.createdAt.toISOString().split('T')[0],
        category: p.category?.name || 'General',
        excerpt: p.excerpt || '',
        emoji: '📝',
        readTime: '5 min read',
        featuredImage: p.featuredImage,
        imageAlt: p.imageAlt,
        authorName: p.authorName || 'AMPLIPATH Research',
        seoTitle: p.seoTitle,
        metaDescription: p.metaDescription,
        canonicalUrl: p.canonicalUrl,
        ogTitle: p.ogTitle,
        ogDescription: p.ogDescription,
        ogImage: p.ogImage,
        noIndex: p.noIndex,
      }));
    }
  } catch (err) {
    console.warn('DB getLivePosts fallback:', err);
  }

  return getAllPosts();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // 1. Try querying live MySQL database first
  try {
    const dbPost = await prisma.blogPost.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (dbPost && !dbPost.isDeleted && dbPost.status === 'published') {
      return {
        slug: dbPost.slug,
        title: dbPost.title,
        date: dbPost.publishedAt
          ? dbPost.publishedAt.toISOString().split('T')[0]
          : dbPost.createdAt.toISOString().split('T')[0],
        category: dbPost.category?.name || 'General',
        excerpt: dbPost.excerpt || '',
        emoji: '📝',
        readTime: '5 min read',
        contentHtml: dbPost.contentHtml,
        featuredImage: dbPost.featuredImage,
        imageAlt: dbPost.imageAlt,
        authorName: dbPost.authorName || 'AMPLIPATH Research',
        seoTitle: dbPost.seoTitle,
        metaDescription: dbPost.metaDescription,
        canonicalUrl: dbPost.canonicalUrl,
        ogTitle: dbPost.ogTitle,
        ogDescription: dbPost.ogDescription,
        ogImage: dbPost.ogImage,
        noIndex: dbPost.noIndex,
      };
    }
  } catch (dbErr) {
    console.warn(`DB getPostBySlug(${slug}) fallback:`, dbErr);
  }

  // 2. Fallback to local markdown file in posts/
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
