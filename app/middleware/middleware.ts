import { clerkMiddleware, redirectToSignIn } from "@clerk/nextjs";

// Protect all routes except sign-in and sign-up
export default clerkMiddleware({
  // Redirect to sign-in if not authenticated
  afterAuth: (auth, req) => {
    if (!auth.userId) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

// Which routes the middleware applies to
export const config = {
  matcher: ["/chat/:path*", "/api/:path*"], // protect chat pages and API routes
};
