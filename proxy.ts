// export default withAuth(
//     function proxy() {
//         return NextResponse.next();
//     },
//     {
//         callbacks: {
//             authorized: ({token, req}) => {
//                 const {pathname} = req.nextUrl;

//                 // allow auth related routes
//                 if( pathname.startsWith("/api/auth") || pathname === "/SignIn" || pathname === "/SignUp" || pathname === "/forgot" || pathname.startsWith("/api/donar") || pathname.startsWith("/change-pass") || pathname.startsWith("/api/ngo") || pathname.startsWith("/api/create-checkout-session")){
//                   return true;
//                 }

//                 //public
//                 if(pathname === "/" || pathname.startsWith("/api/check-uni-uName") || pathname.startsWith("/dashboard") || pathname.startsWith("/register") || pathname.startsWith("/payment-success")){
//                   return true
//                 }

//                 return !!token
//             }
//         }
//     }
// )

// export const config = {
//     matcher: [
//     // Protect all routes EXCEPT Next.js internals and static files
//     "/((?!_next|static|favicon.ico|icon.png|badge.png|manifest.webmanifest|sw.js|assets).*)",
//   ],
// }



import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

/**
 * PUBLIC ROUTES
 * Anyone can access (no token required)
 */
const PUBLIC_ROUTES = [
  "/",
  "/SignIn",
  "/SignUp",
  "/forgot",
  "/change-pass",
  "/payment-success",
];

/**
 * PUBLIC API ROUTES
 */
const PUBLIC_API_PREFIXES = [
  "/api/auth",
  "/api/donar",
  "/api/ngo",
  "/api/create-checkout-session",
  "/api/check-uni-uName",
];

/**
 * PROTECTED ROUTES
 * Require authentication
 */
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/register",
];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname);
}

function isPublicApi(pathname: string) {
  return PUBLIC_API_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );
}

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );
}

export default withAuth(
  function proxy() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow public pages
        if (isPublicRoute(pathname)) return true;

        // Allow public APIs
        if (isPublicApi(pathname)) return true;

        // Require auth for protected routes
        if (isProtectedRoute(pathname)) {
          return !!token;
        }

        // Default: require auth
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!_next|static|favicon.ico|icon.png|icon-192x192.png|icon-512x512.png|badge.png|manifest.webmanifest|sw.js|assets).*)",
  ],
};
