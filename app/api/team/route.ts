import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { isDeleted: false, isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
    return NextResponse.json({ team });
  } catch (error) {
    console.warn('Public GET /api/team fallback:', error);
    return NextResponse.json({ team: [] });
  }
}
