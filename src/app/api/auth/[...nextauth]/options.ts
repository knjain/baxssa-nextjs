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
          const { email, password } = credentials.identifier;

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
          if (rows.length > 0) {
            const admin = rows[0];
            // Use bcrypt to compare passwords
            const passwordMatch = await bcrypt.compare(
              password,
              admin.password
            );
            if (passwordMatch) {
              // Return the user object
              return admin;
            }
          } else {
            throw new Error("No user found with this Email Id.");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
};
