import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function proxy() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({token, req}) => {
                const {pathname} = req.nextUrl;

                // allow auth related routes
                if( pathname.startsWith("/api/auth") || pathname === "/SignIn" || pathname === "/SignUp" || pathname === "/forgot" || pathname.startsWith("/api/donar") || pathname.startsWith("/change-pass") || pathname.startsWith("/api/ngo") || pathname.startsWith("/api/create-checkout-session")){
                  return true;
                }

                //public
                if(pathname === "/" || pathname.startsWith("/api/check-uni-uName") || pathname.startsWith("/dashboard") || pathname.startsWith("/register") || pathname.startsWith("/payment-success")){
                  return true
                }

                return !!token
            }
        }
    }
)

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}