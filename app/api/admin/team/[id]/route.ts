import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member || member.isDeleted) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Failed to get team member:', error);
    return NextResponse.json({ error: 'Failed to get team member' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const { name, role, photoUrl, bio, linkedinUrl, portfolioUrl, sortOrder, isActive } = body;

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    const updated = await prisma.teamMember.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existing.name,
        role: role !== undefined ? role : existing.role,
        photoUrl: photoUrl !== undefined ? photoUrl : existing.photoUrl,
        bio: bio !== undefined ? bio : existing.bio,
        linkedinUrl: linkedinUrl !== undefined ? linkedinUrl : existing.linkedinUrl,
        portfolioUrl: portfolioUrl !== undefined ? portfolioUrl : existing.portfolioUrl,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : existing.sortOrder,
        isActive: isActive !== undefined ? Boolean(isActive) : existing.isActive,
      },
    });

    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    console.error('Failed to update team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

// Soft delete to Recycle Bin
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.teamMember.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Team member moved to Recycle Bin' });
  } catch (error) {
    console.error('Failed to delete team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
