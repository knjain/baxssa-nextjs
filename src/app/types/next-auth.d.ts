import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    adminId?: string;
    fullName?: string;
    email?: string;
  }
  interface Session {
    user: {
      id?: string;
      fullName?: string;
      email?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    fullName?: string;
    email?: string;
  }
}
