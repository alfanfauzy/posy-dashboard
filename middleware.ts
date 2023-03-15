import { NextRequest, NextResponse } from 'next/server'

import { checkSubscription } from './pages/api/middleware'

export async function middleware(req: NextRequest) {
  const { props } = await checkSubscription()

  console.log(props.isSubscription, 'subs')

  if (!props.isSubscription) {
    const signinUrl = new URL('/settings/subscription', req.url)
    return NextResponse.redirect(signinUrl)
  }

  return NextResponse.next()
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
  matcher: [
    '/transaction/:path*',
    '/product/:path*',
    '/report/:path*',
    '/history/:path*',
    '/settings/tax-and-service/:path*',
  ],
}
