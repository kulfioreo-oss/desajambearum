import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAdminAuthenticated } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect admin routes (except login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const isAuthenticated = await isAdminAuthenticated(request)

    if (!isAuthenticated) {
      // Redirect to admin login page
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (pathname === '/admin/login') {
    const isAuthenticated = await isAdminAuthenticated(request)
    
    if (isAuthenticated) {
      const dashboardUrl = new URL('/admin/dashboard', request.url)
      return NextResponse.redirect(dashboardUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
} 