import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

// Extend session to include `id`
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // <-- our custom id
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string; // <-- our custom id
    name?: string;
  }
}
