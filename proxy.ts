import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(_request: NextRequestWithAuth) {
    // This function runs only for authenticated users
    // Unauthenticated users are redirected to login automatically

    // You can add custom logic here if needed
    // For example: check roles, redirect based on conditions, etc.

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // If token exists, user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login", // Redirect here if not authenticated
    },
  },
);

// Protect these routes - add more routes as needed
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard
    "/settings/:path*", // Protect settings
    "/org/:path*", // Protect organization pages
    // Add other protected routes here
    // Public routes like /auth/login, /auth/signup will NOT be matched
  ],
};
