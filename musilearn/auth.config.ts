import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user.role;
      const allowedPath = '/'+userRole;
      console.log(allowedPath);
      const isOnDashboard = nextUrl.pathname.startsWith(allowedPath);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL(allowedPath, nextUrl));
      }
      return true;
    },
    session: async ({session, user}) => {
      if (session.user) {
        session.user.role = "Professor";
      }
      console.log("Session: ", session)
      console.log("User: ", user)
      return session;
    },

  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/admin');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/admin', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;