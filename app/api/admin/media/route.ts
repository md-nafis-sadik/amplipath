import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import path from 'path';
import fs from 'fs/promises';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(20, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search && search.trim()) {
      where.OR = [
        { originalName: { contains: search.trim() } },
        { altText: { contains: search.trim() } },
      ];
    }

    const [total, files] = await Promise.all([
      prisma.mediaFile.count({ where }),
      prisma.mediaFile.findMany({
        where,
        orderBy: { uploadedAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      files,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
    });
  } catch (error) {
    console.error('Failed to list media files:', error);
    return NextResponse.json({ error: 'Failed to list media files' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const savedFiles = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Clean filename
      const originalName = file.name;
      const ext = path.extname(originalName).toLowerCase();
      const baseName = path.basename(originalName, ext).replace(/[^\w-]/g, '_');
      const uniqueFilename = `${Date.now()}_${baseName}${ext}`;
      const filePath = path.join(uploadsDir, uniqueFilename);

      await fs.writeFile(filePath, buffer);

      const url = `/uploads/${uniqueFilename}`;

      const record = await prisma.mediaFile.create({
        data: {
          filename: uniqueFilename,
          originalName,
          mimeType: file.type || 'application/octet-stream',
          sizeBytes: buffer.length,
          url,
          altText: baseName.replace(/_/g, ' '),
        },
      });

      savedFiles.push(record);
    }

    return NextResponse.json({ success: true, files: savedFiles });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media files' }, { status: 500 });
  }
}
