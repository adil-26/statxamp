import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Direct redirect to latest compiled Android APK release or manifest
  const apkReleaseUrl = 'https://github.com/adil-26/statxamp/releases/latest/download/StatXam-v1.0.0.apk';
  
  return NextResponse.redirect(apkReleaseUrl, {
    status: 307,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Disposition': 'attachment; filename="StatXam-v1.0.0.apk"'
    }
  });
}
