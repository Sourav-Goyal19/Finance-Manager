import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { db } from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as any,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }
        if (!credentials?.password) {
          throw new Error("Password is required");
        }

        const users = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials.email));

        if (users.length === 0) {
          throw new Error("Invalid email");
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password!
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        console.log("User", user);
        console.log("Account", account);
        const existingUsers = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email!))
          .limit(1);

        if (existingUsers.length === 0) {
          await db.insert(usersTable).values({
            name: user.name!,
            email: user.email!,
            image: user.image!,
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
