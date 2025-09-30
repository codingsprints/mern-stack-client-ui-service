// export { auth as middleware } from "@/lib/auth";

// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // public pages list
  const publicPaths = ["/login", "/register"];
  const pathname = req.nextUrl.pathname;

  if (!session?.user && !publicPaths.includes(pathname)) {
    // not logged in and not on a public page
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session?.user && publicPaths.includes(pathname)) {
    // logged in but trying to go to login/register
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], // all pages except api/_next/static
};

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|login-video.mp4).*)",
//   ],
// };
