import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();
    const { altText } = body;

    const file = await prisma.mediaFile.update({
      where: { id },
      data: { altText },
    });

    return NextResponse.json({ success: true, file });
  } catch (error) {
    console.error('Failed to update media file:', error);
    return NextResponse.json({ error: 'Failed to update media file' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const file = await prisma.mediaFile.findUnique({ where: { id } });

    if (!file) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Try deleting physical file
    try {
      const filePath = path.join(process.cwd(), 'public', 'uploads', file.filename);
      await fs.unlink(filePath);
    } catch (fsErr) {
      console.warn('Physical file could not be deleted or already removed:', fsErr);
    }

    // Delete record from database
    await prisma.mediaFile.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    console.error('Failed to delete media file:', error);
    return NextResponse.json({ error: 'Failed to delete media file' }, { status: 500 });
  }
}
