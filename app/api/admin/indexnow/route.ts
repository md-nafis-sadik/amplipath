import { NextResponse } from 'next/server';
import {
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  SITE_DOMAIN,
  submitToIndexNow,
  getAllIndexableUrls,
} from '@/lib/indexnow';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const urls = await getAllIndexableUrls();
    return NextResponse.json(
      {
        enabled: true,
        host: SITE_DOMAIN,
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        totalIndexableUrls: urls.length,
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to get IndexNow info' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { all, urls, url } = body;

    let targetUrls: string[] = [];

    if (all) {
      targetUrls = await getAllIndexableUrls();
    } else if (Array.isArray(urls)) {
      targetUrls = urls;
    } else if (typeof url === 'string') {
      targetUrls = [url];
    } else {
      return NextResponse.json(
        { error: 'Provide "all": true or "urls": string[] or "url": string.' },
        { status: 400 }
      );
    }

    const result = await submitToIndexNow(targetUrls);

    return NextResponse.json(result, {
      status: result.success ? 200 : result.status >= 400 ? result.status : 500,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('IndexNow POST error:', error);
    return NextResponse.json(
      {
        success: false,
        status: 500,
        message: error?.message || 'Internal IndexNow submission error',
        submittedCount: 0,
        urls: [],
      },
      { status: 500 }
    );
  }
}
