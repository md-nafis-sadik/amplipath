import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const faq = await prisma.faqItem.findUnique({
      where: { id },
      include: { pageAssignments: true },
    });

    if (!faq || faq.isDeleted) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ faq });
  } catch (error) {
    console.error('Failed to get FAQ:', error);
    return NextResponse.json({ error: 'Failed to get FAQ' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const { question, answer, category, assignedPages, sortOrder } = body;

    const existing = await prisma.faqItem.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    const newSortOrder = sortOrder !== undefined ? (parseInt(sortOrder, 10) || 0) : existing.sortOrder;

    const updated = await prisma.faqItem.update({
      where: { id },
      data: {
        question: question !== undefined ? question : existing.question,
        answer: answer !== undefined ? answer : existing.answer,
        category: category !== undefined ? category : existing.category,
        sortOrder: newSortOrder,
      },
    });

    // Update page assignments if provided
    if (Array.isArray(assignedPages)) {
      // Remove previous assignments
      await prisma.pageFaq.deleteMany({ where: { faqId: id } });

      // Add new assignments with duplicate prevention
      const uniquePages = Array.from(new Set(assignedPages));
      for (let i = 0; i < uniquePages.length; i++) {
        const pagePath = uniquePages[i];
        await prisma.pageFaq.create({
          data: {
            pagePath,
            faqId: id,
            sortOrder: newSortOrder,
          },
        });
      }
    }

    revalidatePath('/api/faqs');
    if (Array.isArray(assignedPages)) {
      assignedPages.forEach((p) => {
        if (p) revalidatePath(p);
      });
    }
    revalidatePath('/');

    return NextResponse.json({ success: true, faq: updated });
  } catch (error) {
    console.error('Failed to update FAQ:', error);
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
  }
}

// Soft delete
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const pageAssignments = await prisma.pageFaq.findMany({
      where: { faqId: id },
      select: { pagePath: true },
    });
    await prisma.faqItem.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    revalidatePath('/api/faqs');
    pageAssignments.forEach((pa) => {
      if (pa.pagePath) revalidatePath(pa.pagePath);
    });
    revalidatePath('/');

    return NextResponse.json({ success: true, message: 'FAQ moved to Recycle Bin' });
  } catch (error) {
    console.error('Failed to delete FAQ:', error);
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}
