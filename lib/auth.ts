import { db } from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { nanoid } from "nanoid";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { LoginSchema } from "./validations/authSchemas";
import { getUserByEmail } from "./actions/user";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const validatedCredentials = LoginSchema.safeParse(credentials);

          if (!validatedCredentials.success) {
            throw new Error("Invalid input data");
          }

          const { email, password } = validatedCredentials.data;

          // Ensure credentials are provided
          if (!email || !password) {
            throw new Error("Missing email or password");
          }

          // Find the user in the database
          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new Error("No user found with the provided credentials");
          }

          // Verify the password
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return the user object upon successful validation
          return { id: user.id, name: user.name, email: user.email };
        } catch (error: any) {
          console.error("Error during user authorization:", error.message);
          throw new Error(error.message || "Authorization failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await getUserByEmail(token.email || "");

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: ` ${dbUser.email.split('@')[0]}-${nanoid(5)}`,
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.imageUrl,
        username: dbUser.username,
      };
    },
    redirect({ url }) {
      return url;
    },
  },
};

export const getCurrentUser = () => getServerSession(authOptions);
