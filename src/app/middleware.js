import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  
  // Set a cookie with the viewport value
  const response = NextResponse.next();
  response.cookies.set('viewport', viewport, { path: '/user-agent' });
  
  return response;
}
