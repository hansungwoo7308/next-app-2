// services/IUserService.ts
import { User } from "next-auth";

export interface InterfaceUserService {
  signInCredentials(email: string, password: string): Promise<User> | User;
}
