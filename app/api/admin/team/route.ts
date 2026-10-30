import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = { isDeleted: false };
    if (search && search.trim()) {
      where.OR = [
        { name: { contains: search.trim() } },
        { role: { contains: search.trim() } },
      ];
    }

    const [total, team] = await Promise.all([
      prisma.teamMember.count({ where }),
      prisma.teamMember.findMany({
        where,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      team,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, role, photoUrl, bio, linkedinUrl, portfolioUrl, sortOrder, isActive } = body;

    if (!name || !role) {
      return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        photoUrl: photoUrl || null,
        bio: bio || null,
        linkedinUrl: linkedinUrl || null,
        portfolioUrl: portfolioUrl || null,
        sortOrder: typeof sortOrder === 'number' ? sortOrder : 0,
        isActive: isActive !== undefined ? Boolean(isActive) : true,
      },
    });

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error('Failed to create team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}
