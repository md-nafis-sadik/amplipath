import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { isDeleted: false, status: 'published' },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return NextResponse.json({ caseStudies });
  } catch (error) {
    console.warn('Public GET /api/portfolio fallback:', error);
    return NextResponse.json({ caseStudies: [] });
  }
}
