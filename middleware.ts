import { clerkMiddleware, redirectToSignIn } from "@clerk/nextjs";

// Global Clerk middleware
// - Allows public access to `/` and `/api/health`
// - Protects `/chat/*` and `/api/*` (except `/api/health`)
export default clerkMiddleware((auth, req) => {
  const { userId } = auth;
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Public routes that don't require auth
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up");

  if (!userId && !isPublicRoute) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    // Run middleware on all routes so Clerk can detect it for `currentUser` on `/`
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};

