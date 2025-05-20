import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const isLoggedIn = !!token;

  if (
    !isLoggedIn &&
    (pathname.startsWith('/moims') || pathname.startsWith('/mypage'))
  ) {
    const loginUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/moims/:path*', '/mypage/:path*'],
};
