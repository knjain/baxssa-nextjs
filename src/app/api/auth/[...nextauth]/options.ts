import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectionPool from "../../../config/db";
import { RowDataPacket, FieldPacket } from "mysql2";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req): Promise<any> {
        try {
          // Extract credentials from the request
          const email = credentials.identifier;
          const password = credentials.password;

          // Query the admin table to find the user
          const query = `
                        SELECT * FROM admin
                        WHERE email = ?;
                    `;

          // Use the connection pool to execute the query
          const [rows, fields] = (await connectionPool.query(query, [
            email,
          ])) as [RowDataPacket[], FieldPacket[]];
          // Check if user found and password matches
          if ([rows].length > 0) {
            const user = rows[0];

            // Use bcrypt to compare passwords
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
              // Return the user object
              return user;
            }
          } else {
            console.log("first")
            throw new Error("No user found with this Email Id.");
          }
        } catch (error: any) {
          console.log(error)
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.fullName = token.fullName;
        session.user.email = token.email;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.adminId?.toString();
        token.fullName = user.fullName;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
};

export default authOptions;
