// Module augmentation
// next-auth settings (object extension, override)

import { DefaultSession } from "next-auth";

// nextauth.d.ts
export enum Role {
  user = "user",
  admin = "admin",
}

interface User {
  role?: Role;
  subscribed?: boolean;
}
interface Account {}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: User;
    account?: Account;
  }
}

// declare module "next-auth" {
//   interface Session {
//     user: {
//       idx: number;
//       id: string;
//       name: string;
//       // ...
//     }
//   }
// }

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
    subscribed?: boolean;
  }
  // interface Session extends DefaultSession {
  //   account?: Account;
  // }
}
