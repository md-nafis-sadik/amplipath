import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || searchParams.get('key');
    const expectedSecret = process.env.CRON_SECRET;

    // If CRON_SECRET is configured in .env, enforce token verification
    if (expectedSecret && token !== expectedSecret) {
      return NextResponse.json({ error: 'Unauthorized cron token' }, { status: 401 });
    }

    const now = new Date();

    // Find and promote scheduled posts that are due
    const result = await prisma.blogPost.updateMany({
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

    // Auto-purge any Recycle Bin items older than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const [delBlogs, delCases, delFaqs, delTeam, delCareers] = await Promise.all([
      prisma.blogPost.deleteMany({ where: { isDeleted: true, deletedAt: { lte: thirtyDaysAgo } } }),
      prisma.caseStudy.deleteMany({ where: { isDeleted: true, deletedAt: { lte: thirtyDaysAgo } } }),
      prisma.faqItem.deleteMany({ where: { isDeleted: true, deletedAt: { lte: thirtyDaysAgo } } }),
      prisma.teamMember.deleteMany({ where: { isDeleted: true, deletedAt: { lte: thirtyDaysAgo } } }),
      prisma.jobListing.deleteMany({ where: { isDeleted: true, deletedAt: { lte: thirtyDaysAgo } } }),
    ]);
    const purgedTrashCount = delBlogs.count + delCases.count + delFaqs.count + delTeam.count + delCareers.count;

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      publishedCount: result.count,
      purgedTrashCount,
      message: `Published ${result.count} scheduled post(s) and pruned ${purgedTrashCount} expired trash items (>30 days).`,
    });
  } catch (error: any) {
    console.error('Failed to run scheduled publish job:', error);
    return NextResponse.json(
      { error: 'Internal cron error', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
