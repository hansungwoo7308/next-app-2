// services/UserService.ts
import { User } from "next-auth";
import { InterfaceUserService } from "./interface.user.service";
import users from "../../data/users.json";

export class InMemoryUserService implements InterfaceUserService {
  signInCredentials(email: string, password: string): User | Promise<User> {
    const user = users.find((user) => {
      const emailFound = email === user.email;
      const isPasswordCorrect = password === user.password;
      const userFound = emailFound && isPasswordCorrect;
      return userFound;
    }) as User;
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
}
export const userService = new InMemoryUserService();
