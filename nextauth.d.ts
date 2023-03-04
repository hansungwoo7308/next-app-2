// Module augmentation
// next-auth settings (object extension, override)

// nextauth.d.ts
export enum Role {
  user = "user",
  admin = "admin",
}

declare module "next-auth" {
  interface User {
    role?: Role;
    subscribed?: boolean;
  }
  // interface Session {
  interface Session extends DefaultSession {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    subscribed?: boolean;
  }
}
