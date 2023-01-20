import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl
  const authData = 'ada'

  if (authData && pathname.startsWith('/')) {
    return NextResponse.redirect(`${origin}/transaction`)
  }
  return NextResponse.redirect(`${origin}/auth/login`)
}

export const config = {
  matcher: ['/'],
}
