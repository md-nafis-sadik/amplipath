import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const job = await prisma.jobListing.findUnique({
      where: { id },
    });

    if (!job || job.isDeleted) {
      return NextResponse.json({ error: 'Job listing not found' }, { status: 404 });
    }

    return NextResponse.json({ job });
  } catch (error) {
    console.error('Failed to get job listing:', error);
    return NextResponse.json({ error: 'Failed to get job listing' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const {
      title,
      slug,
      category,
      categoryLabel,
      employmentType,
      location,
      compensation,
      compDetail,
      description,
      responsibilities,
      requirements,
      status,
    } = body;

    const existing = await prisma.jobListing.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Job listing not found' }, { status: 404 });
    }

    const updated = await prisma.jobListing.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        slug: slug !== undefined ? slug : existing.slug,
        category: category !== undefined ? category : existing.category,
        categoryLabel: categoryLabel !== undefined ? categoryLabel : existing.categoryLabel,
        employmentType: employmentType !== undefined ? employmentType : existing.employmentType,
        location: location !== undefined ? location : existing.location,
        compensation: compensation !== undefined ? compensation : existing.compensation,
        compDetail: compDetail !== undefined ? compDetail : existing.compDetail,
        description: description !== undefined ? description : existing.description,
        responsibilities: Array.isArray(responsibilities)
          ? JSON.stringify(responsibilities)
          : responsibilities !== undefined
          ? responsibilities
          : existing.responsibilities,
        requirements: Array.isArray(requirements)
          ? JSON.stringify(requirements)
          : requirements !== undefined
          ? requirements
          : existing.requirements,
        status: status !== undefined ? status : existing.status,
      },
    });

    return NextResponse.json({ success: true, job: updated });
  } catch (error) {
    console.error('Failed to update job listing:', error);
    return NextResponse.json({ error: 'Failed to update job listing' }, { status: 500 });
  }
}

// Soft delete
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.jobListing.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, message: 'Job listing moved to Recycle Bin' });
  } catch (error) {
    console.error('Failed to delete job listing:', error);
    return NextResponse.json({ error: 'Failed to delete job listing' }, { status: 500 });
  }
}
