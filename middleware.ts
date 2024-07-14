import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(['/','/sign-in','/sign-up','/organization/(.*)/settings/(.*)','/api/webhook'])

export default clerkMiddleware((auth, req) => {

  if (auth().userId && isPublicRoute(req)) {
    let path = "/select-org";

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  if (!auth().userId && !isPublicRoute(req)) {
    return auth().redirectToSignIn();
  }

  if (auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org") {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection)
  }

});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', // Don't run middleware on static files
            '/', // Run middleware on index page
            '/(api|trpc)(.*)', // Run middleware on API routes
           ],
};