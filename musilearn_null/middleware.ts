import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req: { nextUrl: any; url: string | URL | undefined }) {
  const url = req.nextUrl;
  
  if (url.pathname === "/login" || url.pathname === "/") {
    return NextResponse.next();
  }

  const email = (await cookies()).get("user_email")?.value;
  if (!email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
