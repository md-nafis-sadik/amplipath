import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { normalizeRole } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session || normalizeRole(session.role) !== 'super_admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only Super Admins can access and export database backups' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const download = searchParams.get('download') === '1';

    const [
      users,
      categories,
      posts,
      caseStudies,
      seoPages,
      faqs,
      pageFaqs,
      team,
      jobs,
      media,
    ] = await Promise.all([
      prisma.adminUser.findMany({ select: { id: true, email: true, name: true, role: true, createdAt: true } }),
      prisma.blogCategory.findMany(),
      prisma.blogPost.findMany(),
      prisma.caseStudy.findMany(),
      prisma.pageSeo.findMany(),
      prisma.faqItem.findMany(),
      prisma.pageFaq.findMany(),
      prisma.teamMember.findMany(),
      prisma.jobListing.findMany(),
      prisma.mediaFile.findMany(),
    ]);

    const backupPayload = {
      app: 'Amplipath CMS',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      stats: {
        adminUsers: users.length,
        blogCategories: categories.length,
        blogPosts: posts.length,
        caseStudies: caseStudies.length,
        seoPages: seoPages.length,
        faqs: faqs.length,
        faqPageAssignments: pageFaqs.length,
        teamMembers: team.length,
        jobListings: jobs.length,
        mediaFiles: media.length,
        totalRecords:
          users.length +
          categories.length +
          posts.length +
          caseStudies.length +
          seoPages.length +
          faqs.length +
          pageFaqs.length +
          team.length +
          jobs.length +
          media.length,
      },
      data: {
        adminUsers: users,
        blogCategories: categories,
        blogPosts: posts,
        caseStudies,
        pageSeo: seoPages,
        faqItems: faqs,
        pageFaqs,
        teamMembers: team,
        jobListings: jobs,
        mediaFiles: media,
      },
    };

    if (download) {
      const filename = `amplipath_backup_${new Date().toISOString().slice(0, 10)}.json`;
      return new NextResponse(JSON.stringify(backupPayload, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${filename}"`,
        },
      });
    }

    return NextResponse.json(backupPayload);
  } catch (error) {
    console.error('Backup generation error:', error);
    return NextResponse.json({ error: 'Failed to generate backup' }, { status: 500 });
  }
}
