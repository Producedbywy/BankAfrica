import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add custom middleware logic here if needed
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    // Protected routes that require authentication
    "/",
    "/mobile/:path*",
    "/convert/:path*",
    "/cards/:path*",
    "/api/account/:path*",
    "/api/transactions/:path*",
    "/api/mobile/:path*",
    "/api/currency/:path*",
    "/api/cards/:path*",
  ],
}
