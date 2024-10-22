import { validateRequest } from '@/auth';
import { NextRequest, NextResponse } from "next/server";

// Protect all routes under /dashboard and /api (except auth endpoints)
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ]
}

export async function middleware(request: NextRequest) {
  // Skip auth for public API routes
  if (request.nextUrl.pathname.startsWith('/api/public')) {
    return NextResponse.next()
  }

  // Validate session
  const { session, user } = await validateRequest()
  
  // Handle API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'content-type': 'application/json' } }
      )
    }
    return NextResponse.next()
  }

  // Handle page routes
  if (!session) {
    const redirectUrl = new URL('/sign-in', request.url)
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}