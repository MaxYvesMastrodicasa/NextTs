import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
// import { NextResponse } from "next/server";
// import { auth } from "./auth"; 

// export async function middleware(req: { url: string | URL | undefined; nextUrl: { pathname: any; }; }) {
//   const session = await auth(); 

//   if (!session) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith("/admin") &&  !== "admin") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
// }

export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};