import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    username?: string | null;
    avatarColor?: string | null;
    accessToken?: string | null; // Ensure accessToken is available in the JWT
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    id: UserId;
    username?: string | null;
    avatarColor?: string | null;
  }
  interface Session {
    user: User & {
      accessToken?: string | null; // Include accessToken for sessions if needed
    };
  }
}
