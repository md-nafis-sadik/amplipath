import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'all';
    const search = searchParams.get('search') || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const [blogs, caseStudies, faqs, team, careers] = await Promise.all([
      type === 'all' || type === 'blog'
        ? prisma.blogPost.findMany({
            where: { isDeleted: true },
            select: { id: true, title: true, slug: true, deletedAt: true },
            orderBy: { deletedAt: 'desc' },
          })
        : [],
      type === 'all' || type === 'case_study'
        ? prisma.caseStudy.findMany({
            where: { isDeleted: true },
            select: { id: true, name: true, slug: true, deletedAt: true },
            orderBy: { deletedAt: 'desc' },
          })
        : [],
      type === 'all' || type === 'faq'
        ? prisma.faqItem.findMany({
            where: { isDeleted: true },
            select: { id: true, question: true, deletedAt: true },
            orderBy: { deletedAt: 'desc' },
          })
        : [],
      type === 'all' || type === 'team'
        ? prisma.teamMember.findMany({
            where: { isDeleted: true },
            select: { id: true, name: true, role: true, deletedAt: true },
            orderBy: { deletedAt: 'desc' },
          })
        : [],
      type === 'all' || type === 'career'
        ? prisma.jobListing.findMany({
            where: { isDeleted: true },
            select: { id: true, title: true, category: true, deletedAt: true },
            orderBy: { deletedAt: 'desc' },
          })
        : [],
    ]);

    let allItems = [
      ...blogs.map((b) => ({
        id: b.id,
        type: 'blog',
        title: b.title,
        subtitle: `Slug: /blog/${b.slug}`,
        deletedAt: b.deletedAt,
      })),
      ...caseStudies.map((c) => ({
        id: c.id,
        type: 'case_study',
        title: c.name,
        subtitle: `Slug: /case-studies/${c.slug}`,
        deletedAt: c.deletedAt,
      })),
      ...faqs.map((f) => ({
        id: f.id,
        type: 'faq',
        title: f.question,
        subtitle: 'FAQ Item',
        deletedAt: f.deletedAt,
      })),
      ...team.map((t) => ({
        id: t.id,
        type: 'team',
        title: t.name,
        subtitle: t.role,
        deletedAt: t.deletedAt,
      })),
      ...careers.map((j) => ({
        id: j.id,
        type: 'career',
        title: j.title,
        subtitle: `Category: ${j.category}`,
        deletedAt: j.deletedAt,
      })),
    ].sort(
      (a, b) =>
        new Date(b.deletedAt || 0).getTime() - new Date(a.deletedAt || 0).getTime()
    );

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      allItems = allItems.filter(
        (item) => item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q)
      );
    }

    const total = allItems.length;
    const items = allItems.slice(skip, skip + limit);

    const typeCounts = {
      all: blogs.length + caseStudies.length + faqs.length + team.length + careers.length,
      blog: blogs.length,
      case_study: caseStudies.length,
      faq: faqs.length,
      team: team.length,
      career: careers.length,
    };

    return NextResponse.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      typeCounts,
    });
  } catch (error) {
    console.error('Failed to fetch trash items:', error);
    return NextResponse.json({ error: 'Failed to fetch trash items' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, type, id } = body;

    if (action === 'restore') {
      const numId = parseInt(id, 10);
      if (type === 'blog') {
        await prisma.blogPost.update({ where: { id: numId }, data: { isDeleted: false, deletedAt: null } });
      } else if (type === 'case_study') {
        await prisma.caseStudy.update({ where: { id: numId }, data: { isDeleted: false, deletedAt: null } });
      } else if (type === 'faq') {
        await prisma.faqItem.update({ where: { id: numId }, data: { isDeleted: false, deletedAt: null } });
      } else if (type === 'team') {
        await prisma.teamMember.update({ where: { id: numId }, data: { isDeleted: false, deletedAt: null } });
      } else if (type === 'career') {
        await prisma.jobListing.update({ where: { id: numId }, data: { isDeleted: false, deletedAt: null } });
      }
      return NextResponse.json({ success: true, message: 'Item restored successfully' });
    }

    if (action === 'permanent_delete') {
      const numId = parseInt(id, 10);
      if (type === 'blog') {
        await prisma.blogPost.delete({ where: { id: numId } });
      } else if (type === 'case_study') {
        await prisma.caseStudy.delete({ where: { id: numId } });
      } else if (type === 'faq') {
        await prisma.faqItem.delete({ where: { id: numId } });
      } else if (type === 'team') {
        await prisma.teamMember.delete({ where: { id: numId } });
      } else if (type === 'career') {
        await prisma.jobListing.delete({ where: { id: numId } });
      }
      return NextResponse.json({ success: true, message: 'Item permanently deleted' });
    }

    if (action === 'empty_trash') {
      await Promise.all([
        prisma.blogPost.deleteMany({ where: { isDeleted: true } }),
        prisma.caseStudy.deleteMany({ where: { isDeleted: true } }),
        prisma.faqItem.deleteMany({ where: { isDeleted: true } }),
        prisma.teamMember.deleteMany({ where: { isDeleted: true } }),
        prisma.jobListing.deleteMany({ where: { isDeleted: true } }),
      ]);
      return NextResponse.json({ success: true, message: 'Recycle bin emptied' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Trash action error:', error);
    return NextResponse.json({ error: 'Failed to execute trash action' }, { status: 500 });
  }
}
